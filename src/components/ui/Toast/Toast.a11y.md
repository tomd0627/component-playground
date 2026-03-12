# Toast / Notification — Accessibility Notes

## WCAG Criteria
- **4.1.3 Status Messages** — Toast notifications use `role="status"` (polite) or `role="alert"` (assertive) with `aria-live` and `aria-atomic="true"` so screen readers announce them without requiring focus.
- **2.2.1 Timing Adjustable** — Auto-dismiss is set to 4 seconds by default. This is long enough for most users to read short messages, but critical or error messages should have a longer duration or not auto-dismiss.
- **2.3.3 Animation from Interactions** — The GSAP slide-in and slide-out are suppressed when `prefers-reduced-motion: reduce` is set.

## Live Region Strategy
- `role="status"` + `aria-live="polite"` — used for default and success toasts. Screen reader waits for a pause before announcing.
- `role="alert"` + `aria-live="assertive"` — used for danger and warning toasts. Screen reader announces immediately, interrupting current speech.

The `aria-atomic="true"` attribute ensures the full message is announced as a unit rather than just changed text nodes.

## Dismiss Button
The × button has `aria-label="Dismiss notification"` so screen reader users know what the button does without needing to hear the notification text again.

## Queue Limit
The provider caps visible toasts at 5 to avoid overwhelming both visual users and screen reader users with simultaneous announcements.

## Usage Notes
- Keep toast messages brief — one sentence maximum.
- Do not put critical instructions, form errors, or required actions in toasts. Use inline error messages or dialogs for those.
- If a toast action is time-sensitive (e.g. "Undo"), ensure the action is also available elsewhere.
