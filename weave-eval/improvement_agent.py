#!/usr/bin/env python3
"""
Improvement PR Agent: pick an improvement from backlog (or CLI), generate failing tests
and implementation via LLM, run tests, and open a GitHub PR with structured description.

Usage:
  python improvement_agent.py [--backlog path] [--index N] [--improvement "title"] [--dry-run]
  Requires: GITHUB_TOKEN, OPENAI_API_KEY (or ANTHROPIC_API_KEY). Optional: IMPROVEMENT_STORAGE_URL for search-similar.
"""

import argparse
import os
import re
import subprocess
import sys
from pathlib import Path

# Optional: OpenAI for LLM
try:
    import openai
except ImportError:
    openai = None

REPO_ROOT = Path(__file__).resolve().parent.parent


def parse_backlog(path: Path) -> list[dict]:
    """Parse docs/improvement-backlog.md into list of entries with title, problem, solution, area."""
    text = path.read_text()
    entries = []
    current = None
    for line in text.splitlines():
        if line.startswith("### ") and not line.startswith("#### "):
            if current and (current.get("problem") or current.get("title")):
                entries.append(current)
            title = line[4:].strip()
            current = {"title": title, "problem": "", "solution": "", "area": "client"}
        elif current is not None:
            s = line.strip()
            if s.startswith("- **problem**"):
                current["problem"] = (line.split(":", 1)[-1].strip() or "").strip()
            elif s.startswith("- **solution**"):
                current["solution"] = (line.split(":", 1)[-1].strip() or "").strip()
            elif s.startswith("- **area**"):
                current["area"] = (line.split(":", 1)[-1].strip() or "client").strip()
    if current and (current.get("problem") or current.get("title")):
        entries.append(current)
    return entries


def slugify(title: str) -> str:
    """Turn title into branch slug: lowercase, alphanumeric and hyphens."""
    return re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-") or "improvement"


def search_similar_improvements(improvement_text: str) -> str:
    """
    Call storage API to search for similar improvements (optional).
    Expects IMPROVEMENT_STORAGE_URL or IMPROVEMENT_SEARCH_URL; response used for 'Users affected/asking'.
    """
    url = os.environ.get("IMPROVEMENT_SEARCH_URL") or os.environ.get("IMPROVEMENT_STORAGE_URL")
    if not url:
        return "Backlog item (requesters/count from storage API when configured)."
    try:
        import urllib.request
        import urllib.parse
        import json
        req = urllib.request.Request(
            f"{url.rstrip('/')}/search?q={urllib.parse.quote(improvement_text)}",
            headers={"Accept": "application/json"},
        )
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.load(resp)
        count = data.get("count", len(data) if isinstance(data, list) else 0)
        requesters = data.get("requesters", [])
        if isinstance(data, list):
            count = len(data)
        return f"{count} similar request(s) from storage API. Requesters: {requesters or 'N/A'}"
    except Exception as e:
        return f"Backlog item (search API unavailable: {e})"


def run(cmd: list[str], cwd: Path = REPO_ROOT, capture: bool = True) -> subprocess.CompletedProcess:
    """Run command; if not capture, stream output."""
    return subprocess.run(
        cmd,
        cwd=cwd,
        capture_output=capture,
        text=True,
    )


def git_branch_create(slug: str) -> bool:
    """Create and checkout branch improvement/<slug>. Return True on success."""
    branch = f"improvement/{slug}"
    r = run(["git", "checkout", "-b", branch])
    return r.returncode == 0


def call_llm_for_code(entry: dict, repo_root: Path) -> str:
    """Use OpenAI to generate failing test + implementation for the improvement entry."""
    if openai is None:
        raise RuntimeError("openai package required: pip install openai")
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY not set")
    client = openai.OpenAI(api_key=api_key)
    area = entry.get("area", "client")
    test_dir = "client/src/test" if area in ("client", "both") else "server/test"
    impl_dirs = "client/src (components, app, hooks, lib) and/or server/"
    prompt = f"""You are implementing an improvement for a codebase. Use TDD: write a FAILING test first, then minimal implementation.

Improvement:
- Title: {entry.get('title', '')}
- Problem: {entry.get('problem', '')}
- Solution: {entry.get('solution', '')}
- Area: {area}

Codebase: Next.js + Vite React TS in client/, Express in server/. Client tests: Vitest + React Testing Library + jest-axe in {test_dir}. Server tests: Node test runner in server/test/.

Output exactly two blocks in this format (no extra text):
---FILE---
path/relative/to/repo/root
---CONTENT---
full file content
---END---

First block: a new or modified test file that encodes the expected behavior and currently FAILS (test path: {test_dir}/...).
Second block: the minimal implementation so the test passes (path under client/src or server/).

Use existing patterns: client tests import from @/ and use describe/it/expect; server tests use node:test and assert. Keep changes minimal and focused."""

    response = client.chat.completions.create(
        model=os.environ.get("OPENAI_MODEL", "gpt-4o-mini"),
        messages=[{"role": "user", "content": prompt}],
    )
    return response.choices[0].message.content or ""


def write_llm_output_to_files(content: str, repo_root: Path) -> list[Path]:
    """Parse LLM output for ---FILE--- path ---CONTENT--- ... ---END--- and write files. Return list of paths written."""
    written = []
    pattern = re.compile(r"---FILE---\s*\n([^\n]+)\s*\n---CONTENT---\s*\n(.*?)---END---", re.DOTALL)
    for m in pattern.finditer(content):
        rel_path = m.group(1).strip()
        body = m.group(2).rstrip()
        if not rel_path or ".." in rel_path:
            continue
        full = repo_root / rel_path
        full.parent.mkdir(parents=True, exist_ok=True)
        full.write_text(body, encoding="utf-8")
        written.append(full)
    return written


def run_tests(area: str) -> tuple[bool, str]:
    """Run server and/or client tests. Return (success, combined_output)."""
    out = []
    if area in ("server", "both"):
        r = run(["npm", "run", "test:server"], cwd=REPO_ROOT)
        out.append(r.stdout or "")
        out.append(r.stderr or "")
        if r.returncode != 0:
            return False, "\n".join(out)
    if area in ("client", "both"):
        r = run(["npm", "run", "test"], cwd=REPO_ROOT / "client")
        out.append(r.stdout or "")
        out.append(r.stderr or "")
        if r.returncode != 0:
            return False, "\n".join(out)
    return True, "\n".join(out)


def fill_pr_body(entry: dict, users_affected: str, template_path: Path) -> str:
    """Fill docs/pr-template-improvement.md placeholders."""
    text = template_path.read_text()
    text = text.replace("PLACEHOLDER_PROBLEM", entry.get("problem", ""))
    text = text.replace("PLACEHOLDER_SOLUTION", entry.get("solution", ""))
    text = text.replace("PLACEHOLDER_USERS_AFFECTED", users_affected)
    return text


def main() -> int:
    parser = argparse.ArgumentParser(description="Improvement PR Agent: TDD + PR from backlog")
    parser.add_argument("--backlog", type=Path, default=REPO_ROOT / "docs" / "improvement-backlog.md")
    parser.add_argument("--index", type=int, default=0, help="Index of backlog entry (0-based)")
    parser.add_argument("--improvement", type=str, help="Title of improvement (overrides --index)")
    parser.add_argument("--dry-run", action="store_true", help="Do not push or create PR")
    parser.add_argument("--skip-llm", action="store_true", help="Skip LLM and tests (branch + PR body only)")
    args = parser.parse_args()

    backlog_path = args.backlog if args.backlog.is_absolute() else REPO_ROOT / args.backlog
    if not backlog_path.exists():
        print(f"Backlog not found: {backlog_path}", file=sys.stderr)
        return 1
    entries = parse_backlog(backlog_path)
    if not entries:
        print("No entries in backlog.", file=sys.stderr)
        return 1
    if args.improvement:
        entry = next((e for e in entries if e.get("title") == args.improvement), None)
        if not entry:
            print(f"Improvement not found: {args.improvement}", file=sys.stderr)
            return 1
    else:
        idx = min(args.index, len(entries) - 1)
        entry = entries[idx]
    title = entry.get("title", "Improvement")
    slug = slugify(title)
    print(f"Improvement: {title} (area={entry.get('area', 'client')})")

    # Optional: call API to search similar and prioritize (here we just use for PR body)
    users_affected = search_similar_improvements(entry.get("problem", "") or title)

    if not args.skip_llm:
        if not git_branch_create(slug):
            print("Failed to create branch (already exists or dirty?).", file=sys.stderr)
            return 1
        try:
            content = call_llm_for_code(entry, REPO_ROOT)
        except Exception as e:
            print(f"LLM call failed: {e}", file=sys.stderr)
            return 1
        written = write_llm_output_to_files(content, REPO_ROOT)
        if not written:
            print("LLM did not output valid FILE/CONTENT blocks; skipping file write.", file=sys.stderr)
        else:
            print(f"Wrote {len(written)} file(s): {[str(p.relative_to(REPO_ROOT)) for p in written]}")
        ok, test_out = run_tests(entry.get("area", "client"))
        if not ok:
            print("Tests failed (TDD: fix implementation or tests):", file=sys.stderr)
            print(test_out[-2000:], file=sys.stderr)
            return 1
    else:
        if not git_branch_create(slug):
            print("Failed to create branch.", file=sys.stderr)
            return 1

    template_path = REPO_ROOT / "docs" / "pr-template-improvement.md"
    if not template_path.exists():
        body = f"## Problem\n\n{entry.get('problem', '')}\n\n## Solution\n\n{entry.get('solution', '')}\n\n## Users affected / asking\n\n{users_affected}\n"
    else:
        body = fill_pr_body(entry, users_affected, template_path)

    if args.dry_run:
        print("Dry run: would create PR with body:")
        print(body[:500])
        return 0
    run(["git", "add", "-A"], cwd=REPO_ROOT)
    run(["git", "commit", "-m", f"Improvement: {title}"], cwd=REPO_ROOT)
    run(["git", "push", "-u", "origin", f"improvement/{slug}"], cwd=REPO_ROOT)
    body_file = REPO_ROOT / ".pr_body_temp.md"
    body_file.write_text(body, encoding="utf-8")
    try:
        r = run(
            ["gh", "pr", "create", "--title", f"Improvement: {title}", "--body-file", str(body_file)],
            cwd=REPO_ROOT,
        )
        if r.returncode != 0:
            print(r.stderr or r.stdout, file=sys.stderr)
            return 1
        print("PR created.")
    finally:
        if body_file.exists():
            body_file.unlink()
    return 0


if __name__ == "__main__":
    sys.exit(main())
