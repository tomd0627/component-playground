import { ScrollReveal } from '../../components/ui/ScrollReveal';

const ANIMATIONS = ['fade-up', 'fade-in', 'slide-left', 'slide-right', 'scale-up'] as const;

export function ScrollRevealDemo() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      <p className="text-xs text-[var(--color-text-muted)] text-center mb-2">
        Scroll down to trigger — or resize the preview to replay
      </p>
      {ANIMATIONS.map((anim, i) => (
        <ScrollReveal key={anim} animation={anim} delay={i * 0.08}>
          <div className="px-4 py-3 rounded-lg bg-[var(--color-surface-overlay)] border border-[var(--color-border)]">
            <span className="text-xs font-mono text-[var(--color-accent)]">{anim}</span>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}
