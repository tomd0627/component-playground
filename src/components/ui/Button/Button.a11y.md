# Button — Accessibility Notes

## WCAG Criteria
- **1.4.3 Contrast (Minimum)** — All variants meet 4.5:1 contrast ratio for text against their backgrounds.
- **2.4.7 Focus Visible** — A 2px solid accent-color outline appears on `:focus-visible`, distinguishing keyboard focus from mouse clicks.
- **4.1.2 Name, Role, Value** — Uses a native `<button>` element so role, name, and state are communicated automatically.

## Loading State
When `loading={true}`:
- `aria-busy="true"` is set so screen readers announce the busy state.
- `disabled` and `aria-disabled="true"` prevent interaction.
- The spinner SVG carries `aria-hidden="true"` so it is not announced — the surrounding text label still communicates context.

## Disabled State
- `disabled` prevents all pointer and keyboard interaction natively.
- `aria-disabled="true"` is also set for contexts where CSS `pointer-events: none` might be bypassed.
- Disabled buttons are intentionally not focusable (native browser behaviour). If a disabled button needs a tooltip explaining why it's disabled, use `aria-disabled` without the `disabled` attribute and handle click suppression manually.

## Usage Notes
- Always provide a visible text label or an `aria-label` when using an icon-only button.
- Avoid relying on colour alone to communicate variant meaning (e.g. destructive). Pair colour with a clear label or icon.
