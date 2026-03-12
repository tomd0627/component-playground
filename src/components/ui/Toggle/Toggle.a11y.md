# Toggle / Switch — Accessibility Notes

## WCAG Criteria
- **4.1.2 Name, Role, Value** — Uses `role="switch"` and `aria-checked` to correctly communicate binary on/off state. A native `<input type="checkbox">` is an alternative, but `role="switch"` better conveys the toggle metaphor.
- **2.4.7 Focus Visible** — A 2px accent-colour outline appears on keyboard focus.
- **1.4.3 Contrast** — The thumb (white circle) against both the on (accent) and off (surface-overlay) track meets the 3:1 UI component contrast requirement.

## Label Association
- The `<button>` has `aria-label` for screen readers AND a visible `<label>` with `htmlFor` so clicking the text toggles the switch.
- When a `description` prop is provided, `aria-describedby` links the button to that descriptive text.

## State Announcement
Screen readers announce: "Dark mode, switch, on" or "Dark mode, switch, off" when focus lands on the control, and announce the new state after toggling.

## Keyboard Interaction
- `Space` or `Enter` toggles the switch (native button behaviour).
- `Tab` / `Shift+Tab` moves focus in and out of the control.

## Usage Notes
- Always provide a meaningful `label`. "Toggle" alone is not descriptive enough.
- If the toggle controls something that takes time to apply, add `aria-busy="true"` during the async operation.
