import { createContext, useContext, useEffect, useId, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../../lib/cn';

// ── Context ────────────────────────────────────────────────────────────────

interface DropdownContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerId: string;
  menuId: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdown() {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error('DropdownMenu sub-components must be inside <DropdownMenu>');
  return ctx;
}

// ── Root ────────────────────────────────────────────────────────────────────

export interface DropdownMenuProps {
  children: ReactNode;
  className?: string;
}

export function DropdownMenu({ children, className }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const baseId = useId();
  const triggerId = `${baseId}-trigger`;
  const menuId = `${baseId}-menu`;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return;

    function onPointerDown(e: PointerEvent) {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <DropdownContext.Provider value={{ open, setOpen, triggerId, menuId, triggerRef }}>
      <div ref={containerRef} className={cn('relative inline-block', className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

// ── Trigger ──────────────────────────────────────────────────────────────────

export interface DropdownTriggerProps {
  children: ReactNode;
  className?: string;
}

export function DropdownTrigger({ children, className }: DropdownTriggerProps) {
  const { open, setOpen, triggerId, menuId, triggerRef } = useDropdown();

  return (
    <button
      ref={triggerRef}
      id={triggerId}
      type="button"
      aria-haspopup="menu"
      aria-expanded={open}
      aria-controls={menuId}
      onClick={() => setOpen(!open)}
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium',
        'bg-surface-raised border border-border',
        'text-text-primary hover:bg-surface-overlay',
        'transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2',
        className
      )}
    >
      {children}
      <svg
        aria-hidden="true"
        width="12" height="12" viewBox="0 0 12 12"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        className={cn('transition-transform duration-200', open && 'rotate-180')}
      >
        <path d="M2 4l4 4 4-4" />
      </svg>
    </button>
  );
}

// ── Menu ────────────────────────────────────────────────────────────────────

export interface DropdownMenuListProps {
  children: ReactNode;
  className?: string;
}

export function DropdownMenuList({ children, className }: DropdownMenuListProps) {
  const { open, menuId, triggerId, setOpen } = useDropdown();
  const menuRef = useRef<HTMLUListElement>(null);

  // Focus first item when menu opens
  useEffect(() => {
    if (open) {
      const first = menuRef.current?.querySelector<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])');
      first?.focus();
    }
  }, [open]);

  function handleKeyDown(e: React.KeyboardEvent) {
    const items = Array.from(
      menuRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]:not([aria-disabled="true"])') ?? []
    );
    const idx = items.indexOf(document.activeElement as HTMLElement);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      items[(idx + 1) % items.length]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      items[(idx - 1 + items.length) % items.length]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      items[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      items[items.length - 1]?.focus();
    } else if (e.key === 'Tab') {
      setOpen(false);
    }
  }

  if (!open) return null;

  return (
    <ul
      ref={menuRef}
      id={menuId}
      role="menu"
      aria-labelledby={triggerId}
      onKeyDown={handleKeyDown}
      className={cn(
        'absolute left-0 top-full mt-1 z-50 min-w-[160px]',
        'rounded-lg border border-border bg-surface-raised',
        'shadow-xl py-1',
        className
      )}
    >
      {children}
    </ul>
  );
}

// ── Item ────────────────────────────────────────────────────────────────────

export interface DropdownItemProps {
  children: ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  className?: string;
}

export function DropdownItem({ children, onSelect, disabled = false, destructive = false, className }: DropdownItemProps) {
  const { setOpen, triggerRef } = useDropdown();

  function handleSelect() {
    if (disabled) return;
    onSelect?.();
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <li role="none">
      <button
        type="button"
        role="menuitem"
        aria-disabled={disabled}
        tabIndex={-1}
        onClick={handleSelect}
        className={cn(
          'flex w-full items-center gap-2 px-3 py-2 text-sm text-left',
          'transition-colors focus-visible:outline-none',
          destructive
            ? 'text-danger focus:bg-danger-subtle hover:bg-danger-subtle'
            : 'text-text-primary focus:bg-surface-overlay hover:bg-surface-overlay',
          disabled && 'opacity-40 cursor-not-allowed',
          className
        )}
      >
        {children}
      </button>
    </li>
  );
}

// ── Separator ────────────────────────────────────────────────────────────────

export function DropdownSeparator() {
  return (
    <li role="none">
      <hr className="my-1 border-t border-border" />
    </li>
  );
}
