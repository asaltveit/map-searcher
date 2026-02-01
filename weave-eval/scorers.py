"""
Scorers for research and map agent traces.
Each scorer takes the trace output (Letta sendMessage response) and returns a dict of scores.
Used by run_scorers.py to attach scores to traces for automated improvement.
"""
import re
import weave


def _get_output_text(output: dict) -> str:
    """Extract all text content from a Letta-style response (messages, tool_calls, etc.)."""
    if not isinstance(output, dict):
        return str(output)
    text_parts = []
    for msg in output.get("messages", []) or []:
        if isinstance(msg, dict):
            content = msg.get("content") or msg.get("text")
            if content:
                text_parts.append(content if isinstance(content, str) else str(content))
            # Tool calls
            for tc in msg.get("tool_calls", []) or []:
                if isinstance(tc, dict):
                    args = tc.get("arguments") or tc.get("input") or {}
                    if isinstance(args, dict):
                        text_parts.append(str(args))
                    else:
                        text_parts.append(str(args))
    return " ".join(text_parts)


@weave.op
def research_has_place_or_coords(output: dict) -> dict:
    """
    Score research agent output: does it include place/location info useful for the map?
    Looks for coordinates [lng, lat], latitude/longitude, or address-like patterns.
    """
    text = _get_output_text(output)
    has_coords = bool(
        re.search(r"\[?\s*-?\d+\.?\d*\s*,\s*-?\d+\.?\d*\s*\]?", text)
        or re.search(r"latitude|longitude|lng|lat", text, re.I)
    )
    has_place = bool(re.search(r"\b(street|ave|blvd|city|portland|address)\b", text, re.I))
    return {
        "has_coordinates_or_place": has_coords or has_place,
        "has_coordinates": has_coords,
        "has_place_mention": has_place,
    }


@weave.op
def map_has_action(output: dict) -> dict:
    """
    Score map agent output: did it call map tools (set_map_view, add_*_layer)?
    Looks for tool names or their string representation in the output.
    """
    text = _get_output_text(output)
    has_set_view = "set_map_view" in text
    has_layer = bool(
        re.search(
            r"add_(fill|line|circle|symbol)_layer|add_fill_layer|add_line_layer|add_circle_layer|add_symbol_layer",
            text,
            re.I,
        )
    )
    return {
        "has_map_action": has_set_view or has_layer,
        "has_set_map_view": has_set_view,
        "has_layer": has_layer,
    }
