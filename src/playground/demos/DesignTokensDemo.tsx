import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';

// ---------------------------------------------------------------------------
// Data — mirrors globals.css @theme exactly
// ---------------------------------------------------------------------------

const COLOR_GROUPS = [
  {
    label: 'Surface',
    tokens: [
      { var: '--color-surface',         tw: 'bg-surface',         label: 'surface' },
      { var: '--color-surface-raised',  tw: 'bg-surface-raised',  label: 'surface-raised' },
      { var: '--color-surface-overlay', tw: 'bg-surface-overlay', label: 'surface-overlay' },
    ],
  },
  {
    label: 'Border',
    tokens: [
      { var: '--color-border',        tw: 'bg-border',        label: 'border' },
      { var: '--color-border-subtle', tw: 'bg-border-subtle', label: 'border-subtle' },
    ],
  },
  {
    label: 'Text',
    tokens: [
      { var: '--color-text-primary',   tw: 'bg-text-primary',   label: 'text-primary' },
      { var: '--color-text-secondary', tw: 'bg-text-secondary', label: 'text-secondary' },
      { var: '--color-text-muted',     tw: 'bg-text-muted',     label: 'text-muted' },
    ],
  },
  {
    label: 'Accent',
    tokens: [
      { var: '--color-accent',        tw: 'bg-accent',        label: 'accent' },
      { var: '--color-accent-hover',  tw: 'bg-accent-hover',  label: 'accent-hover' },
      { var: '--color-accent-subtle', tw: 'bg-accent-subtle', label: 'accent-subtle' },
      { var: '--color-accent-border', tw: 'bg-accent-border', label: 'accent-border' },
    ],
  },
  {
    label: 'Success',
    tokens: [
      { var: '--color-success',        tw: 'bg-success',        label: 'success' },
      { var: '--color-success-subtle', tw: 'bg-success-subtle', label: 'success-subtle' },
      { var: '--color-success-border', tw: 'bg-success-border', label: 'success-border' },
    ],
  },
  {
    label: 'Warning',
    tokens: [
      { var: '--color-warning',        tw: 'bg-warning',        label: 'warning' },
      { var: '--color-warning-subtle', tw: 'bg-warning-subtle', label: 'warning-subtle' },
      { var: '--color-warning-border', tw: 'bg-warning-border', label: 'warning-border' },
    ],
  },
  {
    label: 'Danger',
    tokens: [
      { var: '--color-danger',        tw: 'bg-danger',        label: 'danger' },
      { var: '--color-danger-subtle', tw: 'bg-danger-subtle', label: 'danger-subtle' },
      { var: '--color-danger-border', tw: 'bg-danger-border', label: 'danger-border' },
    ],
  },
] as const;

const RADIUS_TOKENS = [
  { var: '--radius-sm',   tw: 'rounded-sm',   label: 'sm',   value: '0.25rem' },
  { var: '--radius-md',   tw: 'rounded-md',   label: 'md',   value: '0.5rem' },
  { var: '--radius-lg',   tw: 'rounded-lg',   label: 'lg',   value: '0.75rem' },
  { var: '--radius-xl',   tw: 'rounded-xl',   label: 'xl',   value: '1rem' },
  { var: '--radius-full', tw: 'rounded-full', label: 'full', value: '9999px' },
] as const;

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">
      {children}
    </h2>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy ${text}`}
      className={cn(
        'text-[10px] px-1.5 py-0.5 rounded font-mono transition-colors',
        'border border-border-subtle',
        copied
          ? 'text-success bg-success-subtle border-success-border'
          : 'text-text-muted hover:text-text-secondary bg-surface hover:border-border',
      )}
    >
      {copied ? 'copied' : 'copy'}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Color Swatch
// ---------------------------------------------------------------------------

function ColorSwatch({
  cssVar,
  twClass,
}: {
  cssVar: string;
  twClass: string;
}) {
  return (
    <div className="flex flex-col gap-1.5 min-w-0">
      {/* Color preview */}
      <div
        className="h-10 w-full rounded-md border border-border-subtle"
        style={{ backgroundColor: `var(${cssVar})` }}
        aria-hidden="true"
      />
      {/* Labels */}
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-[11px] font-mono text-text-primary leading-tight truncate">
          {cssVar}
        </span>
        <div className="flex items-center gap-1 flex-wrap">
          <span className="text-[10px] font-mono text-text-muted truncate">
            {twClass}
          </span>
          <CopyButton text={cssVar} />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Colors section
// ---------------------------------------------------------------------------

function ColorsSection() {
  return (
    <section aria-labelledby="colors-heading">
      <SectionHeading>
        <span id="colors-heading">Colors</span>
      </SectionHeading>
      <p className="text-sm text-text-secondary mb-6 max-w-prose">
        All colors use the{' '}
        <a
          href="https://oklch.com"
          target="_blank"
          rel="noreferrer"
          className="text-accent hover:underline"
        >
          oklch
        </a>{' '}
        color space for perceptually uniform lightness steps — contrast ratios stay
        consistent when you swap themes. Semantic names (
        <code className="text-xs font-mono text-text-secondary">accent</code>,{' '}
        <code className="text-xs font-mono text-text-secondary">danger</code>) prevent
        accidental low-contrast combinations.
      </p>

      <div className="flex flex-col gap-8">
        {COLOR_GROUPS.map((group) => (
          <div key={group.label}>
            <p className="text-xs font-medium text-text-secondary mb-3">{group.label}</p>
            <div
              className="grid gap-4"
              style={{
                gridTemplateColumns: `repeat(auto-fill, minmax(140px, 1fr))`,
              }}
            >
              {group.tokens.map((t) => (
                <ColorSwatch
                  key={t.var}
                  cssVar={t.var}
                  twClass={t.tw}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Border Radius section
// ---------------------------------------------------------------------------

function RadiusSection() {
  return (
    <section aria-labelledby="radius-heading">
      <SectionHeading>
        <span id="radius-heading">Border Radius</span>
      </SectionHeading>

      <div className="flex flex-wrap gap-5 items-end">
        {RADIUS_TOKENS.map((r) => (
          <div key={r.var} className="flex flex-col items-center gap-2">
            <div
              className="w-14 h-14 bg-accent-subtle border border-accent-border"
              style={{ borderRadius: `var(${r.var})` }}
              aria-hidden="true"
            />
            <div className="text-center">
              <p className="text-xs font-mono text-text-primary">{r.tw}</p>
              <p className="text-[10px] font-mono text-text-muted">{r.value}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Typography section
// ---------------------------------------------------------------------------

function TypographySection() {
  return (
    <section aria-labelledby="typography-heading">
      <SectionHeading>
        <span id="typography-heading">Typography</span>
      </SectionHeading>

      <div className="flex flex-col gap-8">
        {/* Sans */}
        <div>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <p className="text-xs font-medium text-text-secondary">Sans — Inter</p>
            <code className="text-[10px] font-mono text-text-muted bg-surface-raised px-1.5 py-0.5 rounded border border-border-subtle">
              --font-sans / font-sans
            </code>
            <CopyButton text="--font-sans" />
          </div>
          <div className="flex flex-col gap-2 p-4 bg-surface-raised rounded-lg border border-border-subtle">
            {[
              { weight: '400', cls: 'font-normal', label: 'Regular 400' },
              { weight: '500', cls: 'font-medium', label: 'Medium 500' },
              { weight: '600', cls: 'font-semibold', label: 'Semibold 600' },
              { weight: '700', cls: 'font-bold',    label: 'Bold 700' },
            ].map(({ weight, cls, label }) => (
              <div key={weight} className="flex items-baseline gap-4 flex-wrap">
                <span className="text-[10px] font-mono text-text-muted w-20 shrink-0">{label}</span>
                <span className={cn('font-sans text-base text-text-primary', cls)}>
                  The quick brown fox jumps over the lazy dog
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mono */}
        <div>
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <p className="text-xs font-medium text-text-secondary">Mono — Geist Mono</p>
            <code className="text-[10px] font-mono text-text-muted bg-surface-raised px-1.5 py-0.5 rounded border border-border-subtle">
              --font-mono / font-mono
            </code>
            <CopyButton text="--font-mono" />
          </div>
          <div className="p-4 bg-surface-raised rounded-lg border border-border-subtle">
            <pre className="font-mono text-sm text-text-secondary leading-relaxed overflow-x-auto">
              <code>{`const token = 'var(--color-accent)';
const style = { color: token, borderRadius: 'var(--radius-md)' };
export default function Component() { return <div style={style} />; }`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Easing section
// ---------------------------------------------------------------------------

function EasingSection() {
  const ballRef = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);
  const prefersReduced = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  );

  const animate = () => {
    if (running || prefersReduced.current || !ballRef.current) return;
    setRunning(true);
    const el = ballRef.current;
    el.style.transition = 'none';
    el.style.transform = 'translateX(0)';

    // Kick off on next frame so the reset takes effect
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.transition =
          'transform 0.7s var(--ease-out-quart)';
        el.style.transform = 'translateX(180px)';
      });
    });
  };

  useEffect(() => {
    const el = ballRef.current;
    if (!el) return;
    const onEnd = () => setRunning(false);
    el.addEventListener('transitionend', onEnd);
    return () => el.removeEventListener('transitionend', onEnd);
  }, []);

  return (
    <section aria-labelledby="easing-heading">
      <SectionHeading>
        <span id="easing-heading">Easing</span>
      </SectionHeading>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <p className="text-xs font-medium text-text-secondary">ease-out-quart</p>
          <code className="text-[10px] font-mono text-text-muted bg-surface-raised px-1.5 py-0.5 rounded border border-border-subtle">
            cubic-bezier(0.25, 1, 0.5, 1)
          </code>
          <CopyButton text="var(--ease-out-quart)" />
        </div>

        <div className="p-5 bg-surface-raised rounded-lg border border-border-subtle">
          {prefersReduced.current ? (
            <p className="text-sm text-text-muted">
              Animation paused — prefers-reduced-motion is enabled.
            </p>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="relative h-7 w-52">
                <div
                  ref={ballRef}
                  className="absolute top-0 left-0 w-7 h-7 rounded-full bg-accent"
                  aria-hidden="true"
                />
              </div>
              <button
                type="button"
                onClick={animate}
                disabled={running}
                className={cn(
                  'self-start text-xs px-3 py-1.5 rounded-md border font-medium transition-colors',
                  running
                    ? 'text-text-muted border-border-subtle cursor-not-allowed'
                    : 'text-accent border-accent-border bg-accent-subtle hover:bg-accent hover:text-surface',
                )}
              >
                {running ? 'Playing…' : 'Play animation'}
              </button>
            </div>
          )}
        </div>
        <p className="text-xs text-text-muted">
          Used on all GSAP animations via <code className="font-mono">ease: 'power4.out'</code> and
          on CSS transitions via <code className="font-mono">var(--ease-out-quart)</code>. Fast
          start, smooth deceleration — feels responsive without being abrupt.
        </p>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Root demo
// ---------------------------------------------------------------------------

export function DesignTokensDemo() {
  return (
    <div className="flex flex-col gap-12 w-full max-w-3xl mx-auto pb-6">
      <ColorsSection />
      <RadiusSection />
      <TypographySection />
      <EasingSection />
    </div>
  );
}
