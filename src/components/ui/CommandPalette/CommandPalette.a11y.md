# Command Palette — Accessibility Notes

## WCAG Criteria
- **4.1.2 Name, Role, Value** — The search input uses `role="combobox"` with `aria-expanded`, `aria-controls`, `aria-autocomplete="list"`, and `aria-activedescendant` pointing to the currently highlighted result. The results use `role="listbox"` with `role="option"` and `aria-selected`.
- **2.1.1 Keyboard** — Fully operable by keyboard alone. No mouse required.
- **2.4.3 Focus Order** — When the palette opens, focus is moved to the search input. When it closes, focus returns to the triggering element.
- **2.3.3 Animation from Interactions** — The GSAP entrance animation is suppressed when `prefers-reduced-motion: reduce` is set.

## ARIA Combobox Pattern
This implements the ARIA 1.2 "combobox with listbox popup" pattern:
- The `<input>` has `role="combobox"` (not `role="searchbox"`)
- `aria-controls` links the input to the results list
- `aria-activedescendant` updates as the user arrows through results, allowing screen readers to announce the focused option without moving DOM focus away from the input

## Keyboard Interaction
| Key | Action |
|-----|--------|
| Type | Filters results |
| `ArrowDown` | Moves to next result |
| `ArrowUp` | Moves to previous result |
| `Home` | Jumps to first result |
| `End` | Jumps to last result |
| `Enter` | Executes selected command |
| `Escape` | Closes the palette |

## Focus Trap
A focus trap is applied while the palette is open so `Tab` cycles within the dialog. However, since the input captures all characters, Tab is rarely needed — arrow keys navigate the list.

## Highlighted Matches
The fuzzy match highlights use `<mark>` elements, which have semantic meaning ("highlighted text") and are announced by some screen readers. The visual highlight is reinforced with colour and weight.

## Usage Notes
- Provide `group` labels for items — they create navigational landmarks within the listbox.
- Keep item `label` text concise. Screen readers announce label + description per item.
- For global command palettes triggered by `Cmd+K`, ensure the keyboard shortcut is discoverable (tooltip on the trigger, or documented in a Help menu).
