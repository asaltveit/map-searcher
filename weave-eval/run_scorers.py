#!/usr/bin/env python3
"""
Run scorers on recent agent traces and write scores back to Weave.
Use the same W&B project as server-nest (entity/map-searcher) so traces and scores live together.

Usage:
  export WANDB_API_KEY=...
  export WANDB_ENTITY=your-username   # optional, same as server-nest
  python weave-eval/run_scorers.py [--limit N]

Run on a schedule (e.g. cron) or after workflows to keep scores up to date.
"""
import argparse
import os
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent


def _attach_score(call, scorer_name: str, score_result: dict, scorer_fn) -> None:
    """Attach score to call via apply_scorer (SDK runs scorer with call output) or add_feedback."""
    try:
        if hasattr(call, "apply_scorer"):
            call.apply_scorer(scorer_fn)
        elif hasattr(call, "add_feedback"):
            for k, v in score_result.items():
                call.add_feedback(k, v)
    except Exception:
        pass


def main() -> int:
    parser = argparse.ArgumentParser(description="Score recent agent traces in Weave")
    parser.add_argument(
        "--limit",
        type=int,
        default=50,
        help="Max number of recent calls to fetch and score (default 50)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Fetch and print calls only; do not apply scorers",
    )
    args = parser.parse_args()

    api_key = os.environ.get("WANDB_API_KEY")
    if not api_key:
        print("WANDB_API_KEY is not set. Set it to run scorers.", file=sys.stderr)
        return 1

    entity = os.environ.get("WANDB_ENTITY", "").strip()
    project_id = f"{entity}/map-searcher" if entity else "map-searcher"

    try:
        import weave
    except ImportError as e:
        print(f"weave package not found: {e}. Install with: pip install -r weave-eval/requirements.txt", file=sys.stderr)
        return 1

    from scorers import research_has_place_or_coords, map_has_action

    # Init same project as server-nest so we see the same traces
    client = weave.init(project_id)
    if not client:
        print("weave.init failed.", file=sys.stderr)
        return 1

    # Fetch recent calls (agent message traces)
    try:
        calls = list(client.get_calls(limit=args.limit))
    except Exception as e:
        print(f"get_calls failed: {e}", file=sys.stderr)
        return 1

    if not calls:
        print("No recent calls found. Send some agent messages first.")
        return 0

    print(f"Found {len(calls)} call(s).")

    if args.dry_run:
        for i, call in enumerate(calls[:10]):
            op_name = getattr(call, "op_name", None) or getattr(call, "name", None) or "?"
            print(f"  {i+1}. op={op_name}")
        if len(calls) > 10:
            print(f"  ... and {len(calls) - 10} more")
        return 0

    scored = 0
    errors = 0
    for call in calls:
        op_name = getattr(call, "op_name", None) or getattr(call, "name", None) or ""
        try:
            result = getattr(call, "result", None) or getattr(call, "output", None)
            if result is None:
                continue
            if "Research" in op_name or "research" in op_name.lower():
                score_result = research_has_place_or_coords(result)
                _attach_score(call, "research_has_place_or_coords", score_result, research_has_place_or_coords)
                scored += 1
                print(f"  Scored Research: {score_result}")
            elif "Map" in op_name or "map" in op_name.lower():
                score_result = map_has_action(result)
                _attach_score(call, "map_has_action", score_result, map_has_action)
                scored += 1
                print(f"  Scored Map: {score_result}")
        except Exception as e:
            errors += 1
            print(f"  Error scoring call op={op_name}: {e}", file=sys.stderr)

    print(f"Done. Scored {scored} call(s), {errors} error(s).")
    return 0 if errors == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
