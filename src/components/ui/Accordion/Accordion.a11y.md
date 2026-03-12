# Accordion — Accessibility Notes

## WCAG Criteria
- **4.1.2 Name, Role, Value** — Each trigger is a `<button>` inside an `<h3>`. `aria-expanded` communicates open/closed state. `aria-controls` links the button to its panel. The panel uses `role="region"` with `aria-labelledby` pointing back to the trigger.
- **2.1.1 Keyboard** — All accordion triggers are reachable by `Tab` and activatable with `Space` or `Enter`.
- **2.3.3 Animation from Interactions** — The GSAP height animation is gated behind a `prefers-reduced-motion` check. When reduced motion is preferred, content shows or hides instantly with no transition.

## ARIA Pattern
Uses the "Accordion" pattern from the ARIA Authoring Practices Guide:
- Trigger: `<button aria-expanded aria-controls>`
- Panel: `role="region" aria-labelledby`

The `<h3>` wrapper ensures the trigger participates in the page heading hierarchy, which helps screen reader users navigate by heading.

## Animation Detail
GSAP animates `height` from `0` to the content's natural height on open, and back to `0` on close. After the open animation completes, `height` is set to `auto` so the panel adapts if its content changes (e.g. dynamic text). `overflow: hidden` is maintained throughout to clip the animating content.

## Multiple vs Single
The `multiple` prop allows multiple panels to be open simultaneously. When `multiple={false}` (default), opening one panel closes all others — this is appropriate for FAQ-style accordions.

## Usage Notes
- Use meaningful trigger labels — avoid "Click here" or "Read more".
- Keep panel content concise; very long panels can disorient keyboard users who must navigate through them.
