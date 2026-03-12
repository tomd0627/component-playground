# Progress Bar — Accessibility Notes

## WCAG Criteria
- **4.1.2 Name, Role, Value** — Uses `role="progressbar"` with `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` to expose current progress to assistive technology. `aria-label` provides the accessible name.
- **1.4.3 Contrast** — The fill colour against the track background meets the 3:1 UI component contrast requirement for all variants.
- **2.3.3 Animation from Interactions** — The GSAP width tween is skipped when `prefers-reduced-motion: reduce` is set; the bar jumps directly to its target value.

## Value Announcement
The visible percentage label uses `aria-hidden="true"` to avoid double-announcement. The `aria-valuenow` attribute on the progressbar element carries the numeric value that screen readers announce.

## Indeterminate State
For operations where progress is unknown, set `aria-valuenow` to `undefined` and add `aria-valuetext="Loading…"`. The GSAP animation can be replaced with a looping shimmer in this case.

## Usage Notes
- Always provide a meaningful `label` prop — "Progress" is too generic. Use "Upload progress", "Profile completion", etc.
- For very short operations (< 1s), consider skipping the progress bar entirely to avoid flicker.
- Do not rely on colour alone to communicate status. Pair the `variant` colour with the `label` text.
