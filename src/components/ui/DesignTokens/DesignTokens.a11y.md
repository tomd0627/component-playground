# Design Tokens — Accessibility Notes

## WCAG Criteria

### 1.4.3 Contrast (Minimum) — Level AA
All text token pairings are designed to meet or exceed 4.5:1 contrast against their intended surface:

| Text token           | Surface token          | Approx. ratio |
|----------------------|------------------------|---------------|
| `--color-text-primary`   | `--color-surface`      | ≥ 12:1        |
| `--color-text-secondary` | `--color-surface`      | ≥ 5:1         |
| `--color-text-muted`     | `--color-surface`      | ≥ 4.5:1       |
| `--color-accent`         | `--color-surface`      | ≥ 4.5:1       |

The oklch color space ensures that lightness values (the `L%` argument) map predictably
to perceived contrast — unlike sRGB hex values, where two colors at the same lightness
percentage can appear very different to the eye. This makes it feasible to calculate
contrast ratios during token definition rather than auditing after the fact.

### 1.4.1 Use of Color — Level A
Semantic tokens (`success`, `warning`, `danger`) are always paired with a text label
or icon in components — color is never the sole differentiator.

### 1.4.11 Non-text Contrast — Level AA
Border tokens (`--color-border`, `--color-border-subtle`) maintain at least 3:1 contrast
against the adjacent surface, meeting the non-text contrast requirement for UI components.

## Design Decisions

### Why oklch?
oklch (Oklch Lightness Chroma Hue) places colors in a perceptually uniform space.
A 10-point lightness step in oklch produces the same perceived contrast jump regardless
of hue — red and teal at `oklch(65% …)` look equally bright. This makes the token scale
predictable without manual per-hue adjustments.

### Why semantic naming?
Naming tokens by role (`text-primary` vs `gray-950`) prevents usage errors. A developer
reaching for "a muted color" cannot accidentally pick a value with insufficient contrast
for its actual rendering surface. The constraint is built into the naming convention.

### Light mode
Light mode overrides are applied via the `html.light` class (set by the theme toggle in
AppShell). Every token is re-declared in that scope, so all components adapt
automatically without conditional class logic at the component level.

## Color Swatch Component
The swatch preview boxes use `aria-hidden="true"` since they are purely decorative —
the CSS variable name and Tailwind class label adjacent to each swatch convey all
necessary information to screen readers.

## Easing Animation
The easing demo respects `prefers-reduced-motion: reduce` — when this preference is
active, the animation ball and Play button are hidden and replaced with an explanatory
note. This matches WCAG 2.1 SC 2.3.3 (Animation from Interactions, Level AAA) best
practice and aligns with the motion gating strategy used throughout this component library.
