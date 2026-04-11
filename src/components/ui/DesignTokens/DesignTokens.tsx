/**
 * Design token reference — typed exports of every CSS custom property
 * defined in globals.css `@theme {}`. Import these in JS/TS contexts
 * where you need to reference tokens programmatically (animations,
 * canvas drawing, test assertions, etc.).
 *
 * For standard styling, use the generated Tailwind utilities directly:
 *   bg-surface, text-accent, border-border, rounded-lg, font-sans …
 */

export const tokens = {
  colors: {
    // Surfaces
    surface:        'var(--color-surface)',
    surfaceRaised:  'var(--color-surface-raised)',
    surfaceOverlay: 'var(--color-surface-overlay)',

    // Borders
    border:       'var(--color-border)',
    borderSubtle: 'var(--color-border-subtle)',

    // Text
    textPrimary:   'var(--color-text-primary)',
    textSecondary: 'var(--color-text-secondary)',
    textMuted:     'var(--color-text-muted)',

    // Accent
    accent:       'var(--color-accent)',
    accentHover:  'var(--color-accent-hover)',
    accentSubtle: 'var(--color-accent-subtle)',
    accentBorder: 'var(--color-accent-border)',

    // Semantic — success
    success:       'var(--color-success)',
    successSubtle: 'var(--color-success-subtle)',
    successBorder: 'var(--color-success-border)',

    // Semantic — warning
    warning:       'var(--color-warning)',
    warningSubtle: 'var(--color-warning-subtle)',
    warningBorder: 'var(--color-warning-border)',

    // Semantic — danger
    danger:       'var(--color-danger)',
    dangerSubtle: 'var(--color-danger-subtle)',
    dangerBorder: 'var(--color-danger-border)',
  },

  radius: {
    sm:   'var(--radius-sm)',   // 0.25rem
    md:   'var(--radius-md)',   // 0.5rem
    lg:   'var(--radius-lg)',   // 0.75rem
    xl:   'var(--radius-xl)',   // 1rem
    full: 'var(--radius-full)', // 9999px
  },

  fonts: {
    sans: 'var(--font-sans)', // Inter, ui-sans-serif, system-ui
    mono: 'var(--font-mono)', // Geist Mono, ui-monospace, Cascadia Code
  },

  easing: {
    outQuart: 'var(--ease-out-quart)', // cubic-bezier(0.25, 1, 0.5, 1)
  },
} as const;

export type ColorToken  = keyof typeof tokens.colors;
export type RadiusToken = keyof typeof tokens.radius;
export type FontToken   = keyof typeof tokens.fonts;
export type EasingToken = keyof typeof tokens.easing;
