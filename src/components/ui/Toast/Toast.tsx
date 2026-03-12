import { useCallback, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../../lib/gsap';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { cn } from '../../../lib/cn';
import { ToastContext } from './ToastContext';
import type { ToastVariant } from './ToastContext';

// ── Types ───────────────────────────────────────────────────────────────────

export type { ToastVariant } from './ToastContext';

export interface ToastItem {
  id: string;
  message: string;
  variant: ToastVariant;
  duration: number;
}

// ── Individual Toast ─────────────────────────────────────────────────────────

const variantStyles: Record<ToastVariant, string> = {
  default: 'border-border bg-surface-raised',
  success: 'border-success-border bg-success-subtle',
  warning: 'border-warning-border bg-warning-subtle',
  danger:  'border-danger-border bg-danger-subtle',
};

const variantIconColor: Record<ToastVariant, string> = {
  default: 'text-accent',
  success: 'text-success',
  warning: 'text-warning',
  danger:  'text-danger',
};

const variantIcons: Record<ToastVariant, ReactNode> = {
  default: (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      <path d="M8 5v4M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  success: (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 8l3.5 3.5L13 5" />
    </svg>
  ),
  warning: (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 1L15 14H1L8 1z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
      <path d="M8 6v3M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  danger: (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M3 3l10 10M13 3L3 13" />
    </svg>
  ),
};

interface SingleToastProps {
  item: ToastItem;
  onDismiss: (id: string) => void;
}

function SingleToast({ item, onDismiss }: SingleToastProps) {
  const ref = useRef<HTMLLIElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  // Entrance animation
  useGSAP(() => {
    if (!ref.current) return;
    if (prefersReduced) return;
    gsap.fromTo(ref.current,
      { x: 48, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.3, ease: 'power3.out' }
    );
  }, { scope: ref });

  // Auto-dismiss
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(item.id), item.duration);
    return () => clearTimeout(timer);
  }, [item.id, item.duration, onDismiss]);

  function handleDismiss() {
    if (!ref.current || prefersReduced) { onDismiss(item.id); return; }
    gsap.to(ref.current, {
      x: 48, opacity: 0, duration: 0.2, ease: 'power2.in',
      onComplete: () => onDismiss(item.id),
    });
  }

  return (
    <li
      ref={ref}
      role={item.variant === 'danger' || item.variant === 'warning' ? 'alert' : 'status'}
      aria-live={item.variant === 'danger' ? 'assertive' : 'polite'}
      aria-atomic="true"
      className={cn(
        'flex items-start gap-3 px-4 py-3 rounded-lg border shadow-lg max-w-sm',
        variantStyles[item.variant]
      )}
    >
      <span className={cn('mt-0.5 shrink-0', variantIconColor[item.variant])}>
        {variantIcons[item.variant]}
      </span>
      <p className="flex-1 text-sm text-text-primary">{item.message}</p>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss notification"
        className="shrink-0 text-text-muted hover:text-text-primary transition-colors focus-visible:outline-2 focus-visible:outline-accent rounded"
      >
        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M2 2l10 10M12 2L2 12" />
        </svg>
      </button>
    </li>
  );
}

// ── Provider + Portal ────────────────────────────────────────────────────────

export interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idCounter = useRef(0);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((message: string, variant: ToastVariant = 'default', duration = 4000) => {
    const id = `toast-${++idCounter.current}`;
    setToasts((prev) => [...prev.slice(-4), { id, message, variant, duration }]);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {createPortal(
        <section
          aria-label="Notifications"
          className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 items-end pointer-events-none"
        >
          <ul className="flex flex-col gap-2 list-none m-0 p-0 pointer-events-auto">
            {toasts.map((item) => (
              <SingleToast key={item.id} item={item} onDismiss={dismiss} />
            ))}
          </ul>
        </section>,
        document.body
      )}
    </ToastContext.Provider>
  );
}
