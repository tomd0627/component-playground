# Scroll Reveal — Accessibility Notes

## WCAG Criteria
- **2.3.3 Animation from Interactions (AAA)** — All animations are gated behind a `prefers-reduced-motion` media query check. When the user has requested reduced motion at the OS level, content is shown immediately at full opacity with no transform, effectively disabling all scroll-triggered animations.
- **1.3.1 Info and Structure** — Content is always present in the DOM regardless of scroll position or animation state. The animation only affects visibility (`opacity`), not display/visibility properties that would hide content from assistive technology.

## How It Works
GSAP's `ScrollTrigger` fires once (`once: true`) when the element enters the viewport. The initial hidden state is applied via `gsap.set()` only after the `prefers-reduced-motion` check — meaning users with reduced motion preferences never see a flash of invisible content.

## Important: Content Availability
Content inside `<ScrollReveal>` starts visually hidden (opacity 0, transformed) but is always in the accessibility tree. Screen readers do not wait for visual animations — they read content in DOM order, regardless of opacity or transform state.

If you do NOT want screen readers to announce content before it's visually revealed (e.g. for a dramatic reveal), wrap with `aria-hidden="true"` initially and remove it via JavaScript when the animation fires. However, this is rarely the right choice — prefer letting screen readers access content freely.

## Usage Notes
- Use `once: true` (the default here) for typical content reveals. Reversing animations on scroll-up can cause motion sickness.
- Keep `duration` under 0.8s. Longer animations feel sluggish and can delay content access for screen magnification users who rely on the spatial position of content.
- Stagger multiple `<ScrollReveal>` elements using the `delay` prop for a pleasing cascade effect.
