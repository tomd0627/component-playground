import { useEffect, useId, useRef } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../../lib/gsap';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { cn } from '../../../lib/cn';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function Modal({ open, onClose, title, description, children, className }: ModalProps) {
  const titleId = useId();
  const descId = useId();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  // Focus trap
  useFocusTrap(panelRef, open);

  // Scroll lock
  useEffect(() => {
    if (!open) return;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [open]);

  // Inert all body siblings so screen readers that don't fully honour
  // aria-modal="true" also see only the dialog content.
  useEffect(() => {
    if (!open) return;
    const overlay = overlayRef.current;
    const siblings = Array.from(document.body.children).filter((el) => el !== overlay);
    siblings.forEach((el) => { el.setAttribute('inert', ''); });
    return () => {
      siblings.forEach((el) => { el.removeAttribute('inert'); });
    };
  }, [open]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  // GSAP entrance / exit
  useGSAP(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;

    if (open) {
      if (prefersReduced) {
        gsap.set([overlay, panel], { opacity: 1, scale: 1, y: 0 });
      } else {
        const tl = gsap.timeline();
        tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power2.out' });
        tl.fromTo(panel, { opacity: 0, scale: 0.95, y: 12 }, { opacity: 1, scale: 1, y: 0, duration: 0.25, ease: 'power3.out' }, '-=0.1');
      }
    } else {
      if (prefersReduced) {
        gsap.set([overlay, panel], { opacity: 0 });
      } else {
        gsap.to([overlay, panel], { opacity: 0, duration: 0.15, ease: 'power2.in' });
      }
    }
  }, { dependencies: [open] });

  if (!open) return null;

  return createPortal(
    <div
      ref={overlayRef}
      style={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        style={{ opacity: 0 }}
        className={cn(
          'relative z-10 w-full max-w-md rounded-xl shadow-2xl',
          'bg-surface-raised border border-border',
          'p-6',
          className
        )}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2
              id={titleId}
              className="text-base font-semibold text-text-primary"
            >
              {title}
            </h2>
            {description && (
              <p id={descId} className="text-sm text-text-secondary mt-1">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className={cn(
              'ml-4 p-1.5 rounded-md -mt-1 -mr-1',
              'text-text-muted hover:text-text-primary',
              'hover:bg-surface-overlay transition-colors',
              'focus-visible:outline-2 focus-visible:outline-accent'
            )}
          >
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
}
