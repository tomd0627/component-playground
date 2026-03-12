# Tabs — Accessibility Notes

## WCAG Criteria
- **4.1.2 Name, Role, Value** — Tab triggers use `role="tab"`, the container uses `role="tablist"`, and panels use `role="tabpanel"`. Each tab is linked to its panel via `aria-controls` and the panel is labelled by its tab via `aria-labelledby`.
- **2.1.1 Keyboard** — Full keyboard support following the ARIA Authoring Practices Guide tabs pattern.
- **2.4.7 Focus Visible** — Focus outlines are visible on both tab triggers and the panel itself.

## Keyboard Interaction (ARIA APG pattern)
| Key | Action |
|-----|--------|
| `Tab` | Moves focus to the active tab trigger; `Shift+Tab` reverses |
| `ArrowRight` | Activates and focuses the next tab (wraps) |
| `ArrowLeft` | Activates and focuses the previous tab (wraps) |
| `Home` | Activates and focuses the first tab |
| `End` | Activates and focuses the last tab |
| `Tab` (on panel) | Moves focus into the panel content |

## Roving tabindex
Only the active tab trigger has `tabIndex={0}`; all others have `tabIndex={-1}`. This means `Tab` from outside the tablist focuses the active tab, not every tab in sequence.

## Panel focus
Tab panels have `tabIndex={0}` so keyboard users can reach panel content by pressing `Tab` after the tablist. If a panel contains focusable elements, this outer `tabIndex` can be removed.

## Usage Notes
- Provide an `aria-label` on `<TabList>` that describes the group of tabs in context (e.g. "Project settings").
- Avoid nesting interactive elements inside tab triggers.
- Do not use tabs for sequential steps — use a stepper pattern instead.
