# Improvement backlog

Candidate improvements for the improvement PR agent. Each entry can be read by the agent to pick work; **requesters/count** are not stored here—the agent gets them by **searching the storage API for similar improvements** when prioritizing and when writing the PR body.

## Format (per entry)

- **title**: Short label (e.g. "Keyboard-accessible map zoom")
- **problem**: What gap or issue exists
- **solution**: Brief outline of how to address it
- **area**: `client` | `server` | `both` | `agents` — use `agents` for persona/prompt/tool improvements (handled by the [separate improvement cycle](./IMPROVEMENT_CYCLE.md), not the PR agent)
- **id**: Optional unique id (for dedupe or API reference)

---

## Example entries

### Keyboard-accessible map zoom

- **problem**: Map has no keyboard-accessible way to zoom; keyboard users cannot zoom without mouse.
- **solution**: Add +/- buttons with focus management and aria-labels; map already supports keyboard (+/- keys), expose controls in the UI and ensure focus is announced.
- **area**: client

### Calendar integration for saving research

- **problem**: No way to add research findings or routes to the user's calendar.
- **solution**: Add integration (e.g. export as .ics or link to calendar provider) so users can save events from research/map results. Start with client-side export or documented API for calendar providers.
- **area**: both

### High-contrast map layer option

- **problem**: Map style may be hard to read for users who need higher contrast.
- **solution**: Add an optional high-contrast layer or style toggle (e.g. layer with stronger outlines and labels) and expose via accessibility settings or map controls.
- **area**: client
