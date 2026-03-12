import type { HTMLAttributes } from 'react';
import { cn } from '../../../lib/cn';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'accent';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  removable?: boolean;
  onRemove?: () => void;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-surface-overlay text-text-secondary border-border',
  success: 'bg-success-subtle text-success border-success-border',
  warning: 'bg-warning-subtle text-warning border-warning-border',
  danger:  'bg-danger-subtle text-danger border-danger-border',
  accent:  'bg-accent-subtle text-accent border-accent-border',
};

export function Badge({ variant = 'default', removable = false, onRemove, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border',
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
      {removable && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${typeof children === 'string' ? children : 'item'}`}
          className="ml-0.5 rounded-full hover:opacity-70 focus-visible:outline-2 focus-visible:outline-current focus-visible:outline-offset-1 leading-none"
        >
          <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
            <path d="M1.41 1.41a1 1 0 0 1 1.42 0L5 3.59l2.17-2.18a1 1 0 1 1 1.42 1.42L6.41 5l2.18 2.17a1 1 0 0 1-1.42 1.42L5 6.41 2.83 8.59a1 1 0 0 1-1.42-1.42L3.59 5 1.41 2.83a1 1 0 0 1 0-1.42Z" />
          </svg>
        </button>
      )}
    </span>
  );
}
