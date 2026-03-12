# Component Playground

A public-facing interactive component library built as a portfolio project. 12 hand-crafted React components — animated, accessible, and production-ready. Every component includes a live preview, copyable source code, and detailed accessibility documentation.

---

## Tech stack

| Tool                                                       | Purpose                                               |
| ---------------------------------------------------------- | ----------------------------------------------------- |
| [Vite 7](https://vite.dev) + [React 19](https://react.dev) | Build tooling and UI framework                        |
| [TypeScript](https://typescriptlang.org)                   | Type safety throughout                                |
| [Tailwind CSS v4](https://tailwindcss.com)                 | Utility-first styling with CSS-first `@theme` config  |
| [GSAP 3](https://gsap.com) + `@gsap/react`                 | Animation (height tweens, scroll triggers, timelines) |
| [React Router v7](https://reactrouter.com)                 | Client-side routing                                   |
| [shiki](https://shiki.style)                               | Syntax-highlighted code blocks                        |

---

## Components

### Primitives

| Component     | Key technique                                                                    |
| ------------- | -------------------------------------------------------------------------------- |
| **Button**    | 4 variants, loading state, `aria-busy`, accessible disabled                      |
| **Badge**     | 5 colour variants, removable with labelled dismiss button                        |
| **Toggle**    | `role="switch"`, `aria-checked`, label + description association                 |
| **Accordion** | GSAP height animation, `aria-expanded`/`aria-controls`, `prefers-reduced-motion` |
| **Tooltip**   | 4 placements, hover + focus trigger, `role="tooltip"`, `aria-describedby`        |

### Feedback

| Component        | Key technique                                                                 |
| ---------------- | ----------------------------------------------------------------------------- |
| **Progress Bar** | GSAP width tween, `role="progressbar"`, `aria-valuenow`                       |
| **Modal**        | GSAP backdrop + panel timeline, `useFocusTrap`, scroll-lock, `aria-modal`     |
| **Toast**        | `ToastProvider` + `useToast` hook, `role="alert"/"status"`, GSAP slide, queue |

### Navigation

| Component           | Key technique                                                                 |
| ------------------- | ----------------------------------------------------------------------------- |
| **Tabs**            | Roving `tabindex`, arrow-key nav, full ARIA tabs pattern                      |
| **Dropdown Menu**   | `role="menu"`, `aria-haspopup`, focus-returns-to-trigger                      |
| **Command Palette** | ARIA combobox, `aria-activedescendant`, fuzzy search with `<mark>` highlights |

### Animation

| Component         | Key technique                                                        |
| ----------------- | -------------------------------------------------------------------- |
| **Scroll Reveal** | GSAP `ScrollTrigger`, 5 animation variants, `prefers-reduced-motion` |

---

## Accessibility approach

Every component targets **WCAG 2.1 AA** compliance:

- **Keyboard navigation** — all components are fully operable without a mouse
- **Screen reader support** — correct ARIA roles, states, and properties throughout
- **Focus management** — focus moves intentionally on open/close of overlays, and returns to triggers on dismiss
- **Reduced motion** — all GSAP animations check `prefers-reduced-motion` and skip or simplify when set
- **Colour contrast** — design tokens use `oklch` for perceptually uniform contrast; all text meets 4.5:1, UI components meet 3:1
- **Per-component docs** — each component includes an A11y tab explaining the specific WCAG criteria, ARIA pattern, and keyboard interaction

---

## Running locally

```bash
git clone https://github.com/tomd0627/component-playground
cd component-playground
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

Press `⌘K` (or `Ctrl+K`) to open the command palette and search components.

---

## Project structure

```
src/
├── components/ui/      # The actual components — no playground awareness
│   ├── Accordion/
│   │   ├── Accordion.tsx
│   │   ├── Accordion.a11y.md   ← accessibility rationale
│   │   └── index.ts
│   └── ...
├── playground/
│   ├── components/     # App shell (AppShell, Sidebar, TabPanel, CodeBlock…)
│   ├── demos/          # Demo wrappers rendered in the Preview tab
│   ├── pages/          # HomePage, ComponentPage
│   └── registry/       # Central component registry — the source of truth
├── hooks/              # useFocusTrap, useKeyboard
├── lib/                # cn(), gsap plugin registration
└── styles/
    └── globals.css     # Tailwind @import + @theme design tokens
```

The components in `src/components/ui/` are intentionally isolated from the playground shell — they have no imports from `src/playground/`. They can be copied directly into any project.

---

## Design decisions

**Why a custom app instead of Storybook?**
Storybook is excellent tooling for teams, but a custom-built playground is a better portfolio artifact — it demonstrates design sensibility, routing architecture, and the ability to build documentation UX from scratch.

**Why GSAP instead of CSS transitions?**
GSAP gives precise control over sequenced timelines (e.g. backdrop fades in, then panel scales up), spring-like easing without extra dependencies, and first-class `prefers-reduced-motion` support via `gsap.matchMedia()`.

**Why Tailwind v4?**
Tailwind v4's CSS-first `@theme {}` config keeps design tokens co-located with the cascade, eliminates the JavaScript config file, and generates utility classes automatically from custom properties — e.g. `--color-accent` becomes `text-accent`, `bg-accent`, `border-accent`.

**Why `oklch` for colours?**
oklch has perceptually uniform lightness, which makes it far easier to reason about contrast ratios when building a dark-theme palette. Adjusting the `L` channel predictably changes perceived brightness without hue shift.

---

## License

MIT
