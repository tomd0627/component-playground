# Modal / Dialog — Accessibility Notes

## WCAG Criteria
- **4.1.2 Name, Role, Value** — Uses `role="dialog"` and `aria-modal="true"`. The dialog is named via `aria-labelledby` pointing to the heading, and optionally described via `aria-describedby`.
- **2.1.2 No Keyboard Trap** — The focus trap is intentional per ARIA dialog pattern, but Escape always closes the dialog and returns focus to the trigger. This satisfies the "means of escape" requirement.
- **2.4.3 Focus Order** — When the dialog opens, focus moves to the first focusable element inside. When it closes, focus returns to the element that triggered it.
- **2.3.3 Animation from Interactions** — The GSAP scale + fade entrance is skipped when `prefers-reduced-motion: reduce` is set.

## Focus Trap
The `useFocusTrap` hook intercepts `Tab` and `Shift+Tab` keystrokes to cycle focus within the dialog. On unmount it restores focus to the previously focused element (the trigger).

## Scroll Lock
Opening the modal sets `document.body.overflow: hidden` and adds `padding-right` equal to the scrollbar width. This prevents the layout from shifting when the scrollbar disappears.

## `aria-modal="true"` + `inert`
`aria-modal="true"` tells screen readers to treat content outside the dialog as inert. Because not all screen readers implement this fully (notably NVDA + Firefox historically), the Modal also applies the native `inert` attribute to every sibling of the portal root while open. This removes all background content from the accessibility tree and prevents focus from escaping into it, regardless of screen reader behaviour.

## Backdrop Click
Clicking outside the panel closes the dialog. This is a convenience affordance for mouse users; keyboard users always have Escape.

## Usage Notes
- Always give the dialog a concise, descriptive `title`.
- Do not place autofocused form inputs in modals without careful thought — screen readers may miss introductory context if focus jumps past it.
- For destructive confirmations (delete, irreversible actions), consider using `aria-describedby` to summarise the consequences in the description.
