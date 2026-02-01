#!/usr/bin/env python3
"""
Self-improvement demo: run scorers on recent traces and print one summary.
Use this for live demos so you only run one command.

Prerequisites:
  - WANDB_API_KEY and WANDB_ENTITY (same as server-nest) set in env
  - Nest app running with tracing; send a few research + map messages first

Usage:
  cd weave-eval && python demo_mode.py [--limit 20]
"""
import argparse
import os
import sys

# Reuse scorer attachment logic
try:
    from scorers import research_has_place_or_coords, map_has_action
except ImportError:
    print("Run from weave-eval: cd weave-eval && python demo_mode.py", file=sys.stderr)
    sys.exit(1)


def _attach_score(call, scorer_name: str, score_result: dict, scorer_fn) -> None:
    try:
        if hasattr(call, "apply_scorer"):
            call.apply_scorer(scorer_fn)
        elif hasattr(call, "add_feedback"):
            for k, v in score_result.items():
                call.add_feedback(k, v)
    except Exception:
        pass


def _is_research_low(score_result: dict) -> bool:
    return not score_result.get("has_coordinates_or_place", True) or not score_result.get(
        "has_place_mention", True
    )


def _is_map_low(score_result: dict) -> bool:
    return not score_result.get("has_map_action", True)


def main() -> int:
    parser = argparse.ArgumentParser(
        description="Self-improvement demo: score traces and print one summary"
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=20,
        help="Max recent calls to fetch and score (default 20)",
    )
    args = parser.parse_args()

    api_key = os.environ.get("WANDB_API_KEY")
    if not api_key:
        print("WANDB_API_KEY is not set. Set it (and WANDB_ENTITY) for the demo.", file=sys.stderr)
        return 1

    entity = os.environ.get("WANDB_ENTITY", "").strip()
    project_id = f"{entity}/map-searcher" if entity else "map-searcher"

    try:
        import weave
    except ImportError as e:
        print(f"weave not found: {e}. pip install -r requirements.txt", file=sys.stderr)
        return 1

    client = weave.init(project_id)
    if not client:
        print("weave.init failed.", file=sys.stderr)
        return 1

    try:
        calls = list(client.get_calls(limit=args.limit))
    except Exception as e:
        print(f"get_calls failed: {e}", file=sys.stderr)
        return 1

    if not calls:
        print(
            "No traces yet. Start the app, send a few research + map messages, then run this again."
        )
        return 0

    scored = 0
    research_low = 0
    map_low = 0
    for call in calls:
        op_name = getattr(call, "op_name", None) or getattr(call, "name", None) or ""
        result = getattr(call, "result", None) or getattr(call, "output", None)
        if result is None:
            continue
        try:
            if "Research" in op_name or "research" in op_name.lower():
                score_result = research_has_place_or_coords(result)
                _attach_score(call, "research_has_place_or_coords", score_result, research_has_place_or_coords)
                scored += 1
                if _is_research_low(score_result):
                    research_low += 1
            elif "Map" in op_name or "map" in op_name.lower():
                score_result = map_has_action(result)
                _attach_score(call, "map_has_action", score_result, map_has_action)
                scored += 1
                if _is_map_low(score_result):
                    map_low += 1
        except Exception:
            pass

    # Single summary for the demo
    print("\n=== Self-improvement demo ===\n")
    print(f"Traces: {len(calls)}  |  Scored: {scored}\n")
    if research_low > 0:
        print(f"Research: {research_low} low-scoring (missing place/coordinates)")
        print("  → Strengthen RESEARCH_PERSONA to include place names and [lng, lat]. See server-nest config (e.g. workflow.config.ts or letta.config.ts).\n")
    else:
        print("Research: no low-scoring traces in this batch.\n")
    if map_low > 0:
        print(f"Map: {map_low} low-scoring (missing set_map_view or layers)")
        print("  → Strengthen MAP_PERSONA to call set_map_view and add at least one layer. See server-nest config (e.g. workflow.config.ts or letta.config.ts).\n")
    else:
        print("Map: no low-scoring traces in this batch.\n")
    print("Update personas, deploy, then run this again to track improvement.\n")
    return 0


if __name__ == "__main__":
    sys.exit(main())
