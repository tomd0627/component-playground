# Dropdown Menu — Accessibility Notes

## WCAG Criteria
- **4.1.2 Name, Role, Value** — The trigger uses `aria-haspopup="menu"` and `aria-expanded` to signal that it opens a menu. The menu uses `role="menu"` and `aria-labelledby` pointing to the trigger. Each item uses `role="menuitem"`.
- **2.1.1 Keyboard** — Full keyboard navigation following the ARIA APG menu pattern.
- **2.4.7 Focus Visible** — Focus returns to the trigger when the menu closes via Escape, selection, or Tab.

## Keyboard Interaction (ARIA APG pattern)
| Key | Action |
|-----|--------|
| `Enter` / `Space` / `Click` | Opens the menu; focus moves to first item |
| `ArrowDown` | Moves focus to next item (wraps) |
| `ArrowUp` | Moves focus to previous item (wraps) |
| `Home` | Moves focus to first item |
| `End` | Moves focus to last item |
| `Escape` | Closes menu, returns focus to trigger |
| `Tab` | Closes menu (focus leaves component naturally) |
| `Enter` / `Space` (on item) | Selects item, closes menu, returns focus to trigger |

## Focus Management
- When the menu opens, focus moves to the first non-disabled item automatically.
- When the menu closes for any reason (selection, Escape, outside click), focus returns to the trigger button.
- Menu items use `tabIndex={-1}` — they are only reachable via arrow keys, not Tab.

## Disabled Items
Disabled items have `aria-disabled="true"` and do not respond to click/keyboard selection, but they remain visible in the DOM (not `display:none`) so screen reader users are aware they exist but are unavailable.

## Usage Notes
- Use a `<DropdownSeparator>` to group related items. Screen readers announce these as separators.
- Keep menu items short and action-oriented: "Edit", "Delete", "Duplicate" — not "Click here to edit the item".
- For destructive actions (delete, remove), use the `destructive` prop and consider adding a confirmation dialog before executing.
