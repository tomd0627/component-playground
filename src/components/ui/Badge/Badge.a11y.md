# Badge — Accessibility Notes

## WCAG Criteria
- **1.4.3 Contrast (Minimum)** — Each colour variant is built with oklch values tuned to maintain at least 4.5:1 contrast between the text and its background.
- **1.4.1 Use of Color** — Variants pair colour with a meaningful text label, so status is never communicated by colour alone.

## Removable Badges
When `removable={true}`, the × button:
- Is a native `<button>` so it receives keyboard focus and is announced as a button.
- Has an `aria-label` that includes the badge text (e.g. "Remove TypeScript") so screen reader users know exactly what will be removed.
- The × SVG icon carries `aria-hidden="true"` to prevent it being announced redundantly.

## Usage Notes
- Badges are presentational `<span>` elements by default — they carry no implicit ARIA role.
- If a badge communicates live status changes (e.g. a count updating), wrap it in a `role="status"` container so screen readers announce the update.
- Avoid using badges as interactive controls. For clickable tags/filters, use a `<button>` or `<a>` instead.
