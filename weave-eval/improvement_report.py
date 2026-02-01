#!/usr/bin/env python3
"""
Generate an improvement report from low-scoring traces.
Run after run_scorers.py (or once scores exist in Weave) to get suggested persona edits.

Usage:
  export WANDB_API_KEY=...
  export WANDB_ENTITY=your-username   # optional
  python weave-eval/improvement_report.py [--limit N]

Output: summary of low-scoring Research/Map traces and suggested persona changes.
"""
import argparse
import os
import sys

# Thresholds below which we suggest improvement
RESEARCH_LOW_SCORE_KEYS = ("has_coordinates_or_place", "has_coordinates", "has_place_mention")
MAP_LOW_SCORE_KEYS = ("has_map_action", "has_set_map_view", "has_layer")


def main() -> int:
    parser = argparse.ArgumentParser(description="Report low-scoring traces and suggest persona edits")
    parser.add_argument("--limit", type=int, default=100, help="Max calls to fetch (default 100)")
    args = parser.parse_args()

    if not os.environ.get("WANDB_API_KEY"):
        print("WANDB_API_KEY is not set.", file=sys.stderr)
        return 1

    entity = os.environ.get("WANDB_ENTITY", "").strip()
    project_id = f"{entity}/map-searcher" if entity else "map-searcher"

    try:
        import weave
    except ImportError:
        print("weave package not found. pip install -r weave-eval/requirements.txt", file=sys.stderr)
        return 1

    client = weave.init(project_id)
    if not client:
        print("weave.init failed.", file=sys.stderr)
        return 1

    try:
        calls = list(client.get_calls(limit=args.limit, include_feedback=True))
    except Exception as e:
        print(f"get_calls failed: {e}. Ensure run_scorers.py has been run so traces have scores.", file=sys.stderr)
        return 1

    if not calls:
        print("No calls found. Send agent messages and run run_scorers.py first.")
        return 0

    research_low = 0
    map_low = 0
    for call in calls:
        op_name = getattr(call, "op_name", None) or getattr(call, "name", None) or ""
        feedback = list(getattr(call, "feedback", []) or [])
        scores = {f.name: getattr(f, "value", f) for f in feedback if hasattr(f, "name")}
        if not scores:
            continue
        if "Research" in op_name or "research" in op_name.lower():
            if not scores.get("has_coordinates_or_place", True) or not scores.get("has_place_mention", True):
                research_low += 1
        elif "Map" in op_name or "map" in op_name.lower():
            if not scores.get("has_map_action", True):
                map_low += 1

    print("=== Improvement report (from trace scores) ===\n")
    if research_low > 0:
        print(f"Research agent: {research_low} low-scoring trace(s) (missing place/coordinates).")
        print("  Suggested: Strengthen RESEARCH_PERSONA to always include place names and [lng, lat]")
        print("  when available. See server-nest config (e.g. workflow.config.ts or letta.config.ts).\n")
    else:
        print("Research agent: no low-scoring traces in this batch.\n")
    if map_low > 0:
        print(f"Map agent: {map_low} low-scoring trace(s) (missing set_map_view or layers).")
        print("  Suggested: Strengthen MAP_PERSONA to always call set_map_view and add at least one")
        print("  layer (add_circle_layer, add_line_layer, etc.). See server-nest config (e.g. workflow.config.ts or letta.config.ts).\n")
    else:
        print("Map agent: no low-scoring traces in this batch.\n")
    print("Update personas, deploy, then run run_scorers.py again to track improvement.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
