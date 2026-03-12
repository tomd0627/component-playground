import { createContext, useContext, useId, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../../lib/gsap';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { cn } from '../../../lib/cn';

// ── Context ────────────────────────────────────────────────────────────────

interface AccordionContextValue {
  openItems: Set<string>;
  toggle: (id: string) => void;
  multiple: boolean;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('AccordionItem must be used inside <Accordion>');
  return ctx;
}

// ── Root ────────────────────────────────────────────────────────────────────

export interface AccordionProps {
  children: ReactNode;
  multiple?: boolean;
  className?: string;
}

export function Accordion({ children, multiple = false, className }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!multiple) next.clear();
        next.add(id);
      }
      return next;
    });
  }

  return (
    <AccordionContext.Provider value={{ openItems, toggle, multiple }}>
      <div className={cn('divide-y divide-border border border-border rounded-lg overflow-hidden', className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

// ── Item ────────────────────────────────────────────────────────────────────

export interface AccordionItemProps {
  id: string;
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
}

export function AccordionItem({ id, trigger, children, className }: AccordionItemProps) {
  const { openItems, toggle } = useAccordionContext();
  const isOpen = openItems.has(id);
  const headerId = useId();
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useGSAP(() => {
    const panel = panelRef.current;
    const inner = innerRef.current;
    if (!panel || !inner) return;

    if (prefersReduced) {
      panel.style.height = isOpen ? 'auto' : '0px';
      panel.style.opacity = isOpen ? '1' : '0';
      return;
    }

    if (isOpen) {
      const height = inner.offsetHeight;
      gsap.fromTo(
        panel,
        { height: 0, opacity: 0 },
        { height, opacity: 1, duration: 0.3, ease: 'power2.out',
          onComplete: () => { panel.style.height = 'auto'; } }
      );
    } else {
      gsap.to(panel, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
      });
    }
  }, { dependencies: [isOpen, prefersReduced] });

  return (
    <div className={cn('bg-surface-raised', className)}>
      <h3 className="m-0">
        <button
          id={headerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => toggle(id)}
          className={cn(
            'flex w-full items-center justify-between px-5 py-4',
            'text-sm font-medium text-left text-text-primary',
            'hover:bg-surface-overlay transition-colors',
            'focus-visible:outline-2 focus-visible:outline-accent focus-visible:-outline-offset-2'
          )}
        >
          {trigger}
          <svg
            aria-hidden="true"
            width="16" height="16" viewBox="0 0 16 16"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
            className={cn(
              'shrink-0 text-text-muted transition-transform duration-300',
              isOpen && 'rotate-180'
            )}
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </button>
      </h3>
      <div
        ref={panelRef}
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        style={{ height: 0, opacity: 0, overflow: 'hidden' }}
      >
        <div ref={innerRef} className="px-5 pb-4 pt-1">
          {children}
        </div>
      </div>
    </div>
  );
}
