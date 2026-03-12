import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { gsap } from '../../lib/gsap';
import { byCategory, bySlug, CATEGORY_ORDER, registry } from '../registry/registry';

const STATS = [
  { value: `${registry.length}`, label: 'Components' },
  { value: 'WCAG 2.1', label: 'AA compliant' },
  { value: 'GSAP', label: 'Animations' },
  { value: 'Zero', label: 'UI Libraries' },
];

const FEATURED_SLUGS = ['accordion', 'modal', 'command-palette', 'scroll-reveal'];

export function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useGSAP(() => {
    if (prefersReduced) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Eyebrow badge
    tl.from('.hero-badge', { opacity: 0, y: -12, duration: 0.4 });

    // Headline — each word staggers in
    tl.from('.hero-word', { opacity: 0, y: 32, stagger: 0.07, duration: 0.5 }, '-=0.1');

    // Subtext + stats + CTAs
    tl.from('.hero-sub', { opacity: 0, y: 16, stagger: 0.08, duration: 0.45 }, '-=0.15');

    // Featured cards slide up with stagger
    tl.from('.hero-card', { opacity: 0, y: 24, stagger: 0.06, duration: 0.4 }, '-=0.2');
  }, { scope: heroRef });

  return (
    <div className="max-w-3xl mx-auto">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div ref={heroRef} className="pt-6 pb-16">
        <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-5 tracking-tight" aria-label="Component Playground">
          {'Component Playground'.split(' ').map((word, i) => (
            <span key={i} className="hero-word inline-block mr-[0.3em]">
              {i === 1
                ? <span className="text-accent">{word}</span>
                : <span className="text-text-primary">{word}</span>
              }
            </span>
          ))}
        </h1>

        <p className="hero-sub text-lg text-text-secondary mb-8 leading-relaxed max-w-xl">
          {registry.length} hand-crafted components — animated, accessible, and production-ready.
          Every component includes live previews, source code, and full accessibility documentation.
        </p>

        {/* Stats */}
        <div className="hero-sub grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {STATS.map(({ value, label }) => (
            <div
              key={label}
              className="rounded-lg border border-border bg-surface-raised px-4 py-3 text-center"
            >
              <div className="text-lg font-bold text-accent">{value}</div>
              <div className="text-xs text-text-muted mt-0.5">{label}</div>
            </div>
          ))}
        </div>

        {/* Featured components */}
        <div className="mt-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">
            Featured
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {FEATURED_SLUGS.map((slug) => {
              const entry = bySlug[slug];
              if (!entry) return null;
              return (
                <Link
                  key={slug}
                  to={`/components/${slug}`}
                  className="hero-card group p-4 rounded-lg border border-border bg-surface-raised hover:border-accent hover:bg-accent-subtle transition-colors"
                >
                  <div className="text-sm font-medium text-text-primary group-hover:text-accent transition-colors">
                    {entry.name}
                  </div>
                  <div className="text-xs text-text-muted mt-1 leading-relaxed line-clamp-2">
                    {entry.description}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Component Grid ──────────────────────────────────────── */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-8 pb-4 border-b border-border">
          All Components
        </h2>
        <div className="space-y-10">
          {CATEGORY_ORDER.map((category) => {
            const entries = byCategory[category];
            if (!entries?.length) return null;
            return (
              <div key={category}>
                <h3 className="text-sm font-semibold text-text-secondary mb-3 flex items-center gap-2">
                  {category}
                  <span className="text-xs text-text-muted font-normal">
                    {entries.length}
                  </span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {entries.map((entry) => (
                    <Link
                      key={entry.slug}
                      to={`/components/${entry.slug}`}
                      className="group block p-4 rounded-lg border border-border bg-surface-raised hover:border-accent hover:bg-accent-subtle transition-colors"
                    >
                      <div className="font-medium text-sm text-text-primary mb-1 group-hover:text-accent transition-colors">
                        {entry.name}
                      </div>
                      <div className="text-xs text-text-muted leading-relaxed">
                        {entry.description}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
