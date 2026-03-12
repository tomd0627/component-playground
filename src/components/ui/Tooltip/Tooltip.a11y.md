# Tooltip — Accessibility Notes

## WCAG Criteria
- **4.1.3 Status Messages** — The tooltip uses `role="tooltip"` and is linked to its trigger via `aria-describedby`. The trigger exposes `aria-describedby` only when the tooltip is visible, so screen readers announce the tooltip content as supplemental description.
- **1.4.3 Contrast** — Tooltip text meets 4.5:1 contrast against its background.
- **2.1.1 Keyboard** — Tooltips appear on `focus` and dismiss on `blur`, so keyboard-only users receive the same information as mouse users.

## Show / Hide Timing
A 100ms hide delay is intentional — it prevents the tooltip from flickering when the user moves the mouse between the trigger and the tooltip itself. The `aria-describedby` is removed when the tooltip is hidden, so screen readers only announce the content when it is actually visible.

## What `role="tooltip"` communicates
Screen readers announce tooltip content after the trigger's accessible name and role. For example: "More options, button, Additional formatting tools available". It supplements, not replaces, the trigger's accessible name.

## Usage Notes
- **Do not put essential information only in a tooltip.** Tooltips are supplemental — critical instructions must also be available in persistent visible text.
- **Keep tooltip content brief** — one short sentence or label. Long content should use a popover or dialog instead.
- **Do not put interactive elements inside a tooltip.** If you need links or buttons, use a popover with `role="dialog"` instead.
- **Touch devices:** Tooltips triggered by hover only are inaccessible on touch. This implementation also triggers on focus, which works with touch + keyboard navigation.
