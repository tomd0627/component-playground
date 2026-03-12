import { useRef } from 'react';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { cn } from '../../../lib/cn';
import { gsap, useGSAP } from '../../../lib/gsap';

export type ProgressBarVariant = 'default' | 'success' | 'warning' | 'danger';

export interface ProgressBarProps {
  value: number;
  max?: number;
  label: string;
  showValue?: boolean;
  variant?: ProgressBarVariant;
  className?: string;
}

const variantFill: Record<ProgressBarVariant, string> = {
  default: 'bg-accent',
  success: 'bg-success',
  warning: 'bg-warning',
  danger:  'bg-danger',
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showValue = true,
  variant = 'default',
  className,
}: ProgressBarProps) {
  const fillRef = useRef<HTMLDivElement>(null);
  const pct = Math.min(Math.max(value / max, 0), 1) * 100;
  const prefersReduced = usePrefersReducedMotion();

  useGSAP(() => {
    if (!fillRef.current) return;
    if (prefersReduced) {
      fillRef.current.style.width = `${pct}%`;
      return;
    }
    gsap.to(fillRef.current, { width: `${pct}%`, duration: 0.5, ease: 'power2.out' });
  }, { dependencies: [pct, prefersReduced] });

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-text-secondary">{label}</span>
        {showValue && (
          <span
            aria-hidden="true"
            className="text-xs tabular-nums text-text-muted"
          >
            {Math.round(pct)}%
          </span>
        )}
      </div>
      <div
        role="progressbar"
        aria-label={label}
        aria-valuenow={Math.round(value)}
        aria-valuemin={0}
        aria-valuemax={max}
        className="h-2 w-full rounded-full bg-surface-overlay overflow-hidden"
      >
        <div
          ref={fillRef}
          style={{ width: 0 }}
          className={cn('h-full rounded-full', variantFill[variant])}
        />
      </div>
    </div>
  );
}
