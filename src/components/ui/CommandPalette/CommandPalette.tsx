import { useEffect, useId, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from '../../../lib/gsap';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { cn } from '../../../lib/cn';

// ── Fuzzy match ─────────────────────────────────────────────────────────────

function fuzzyMatch(query: string, text: string): { score: number; ranges: [number, number][] } {
  if (!query) return { score: 1, ranges: [] };
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  let qi = 0;
  const ranges: [number, number][] = [];
  let start = -1;

  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      if (start === -1) start = ti;
      qi++;
      if (qi === q.length || t[ti + 1] !== q[qi]) {
        ranges.push([start, ti]);
        start = -1;
      }
    } else if (start !== -1) {
      ranges.push([start, ti - 1]);
      start = -1;
    }
  }

  if (qi < q.length) return { score: 0, ranges: [] };
  // Prefer consecutive matches (fewer ranges = higher score)
  return { score: 1 / ranges.length, ranges };
}

function highlightText(text: string, ranges: [number, number][]): ReactNode {
  if (ranges.length === 0) return text;
  const parts: ReactNode[] = [];
  let pos = 0;

  ranges.forEach(([start, end], i) => {
    if (pos < start) parts.push(text.slice(pos, start));
    parts.push(
      <mark key={i} className="bg-accent-subtle text-accent rounded-sm not-italic font-semibold">
        {text.slice(start, end + 1)}
      </mark>
    );
    pos = end + 1;
  });
  if (pos < text.length) parts.push(text.slice(pos));
  return <>{parts}</>;
}

// ── Types ───────────────────────────────────────────────────────────────────

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  group?: string;
  keywords?: string[];
  onSelect: () => void;
  icon?: ReactNode;
}

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  items: CommandItem[];
  placeholder?: string;
}

// ── Component ────────────────────────────────────────────────────────────────

export function CommandPalette({ open, onClose, items, placeholder = 'Search commands…' }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputId = useId();
  const listboxId = useId();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useFocusTrap(panelRef, open);

  // Reset query + active index when the palette opens (derived-state pattern avoids
  // calling setState inside an effect, which can cause cascading renders).
  const [prevOpen, setPrevOpen] = useState(open);
  if (open && !prevOpen) { setPrevOpen(true); setQuery(''); setActiveIdx(0); }
  if (!open && prevOpen) { setPrevOpen(false); }

  // Defer focus so the portal has painted before we move focus
  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => inputRef.current?.focus(), 10);
    return () => clearTimeout(id);
  }, [open]);

  // Escape to close
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  // Entrance animation
  useGSAP(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;

    if (open) {
      if (prefersReduced) { gsap.set([overlay, panel], { opacity: 1, y: 0 }); return; }
      const tl = gsap.timeline();
      tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.15 });
      tl.fromTo(panel, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.2, ease: 'power3.out' }, '-=0.05');
    } else {
      if (prefersReduced) { gsap.set([overlay, panel], { opacity: 0 }); return; }
      gsap.to([overlay, panel], { opacity: 0, duration: 0.15 });
    }
  }, { dependencies: [open] });

  // Filtered + scored results
  const results = items
    .map((item) => {
      const searchText = [item.label, item.description, ...(item.keywords ?? [])].join(' ');
      const { score } = fuzzyMatch(query, searchText);
      // Get ranges scoped to just the label for highlighting
      const { ranges: labelRanges } = fuzzyMatch(query, item.label);
      return { item, score, labelRanges };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);

  // Group results
  const grouped = results.reduce<{ group: string; items: typeof results }[]>((acc, r) => {
    const group = r.item.group ?? 'Commands';
    const existing = acc.find((g) => g.group === group);
    if (existing) { existing.items.push(r); } else { acc.push({ group, items: [r] }); }
    return acc;
  }, []);

  const flatResults = grouped.flatMap((g) => g.items);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => Math.min(i + 1, flatResults.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      flatResults[activeIdx]?.item.onSelect();
      onClose();
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiveIdx(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setActiveIdx(flatResults.length - 1);
    }
  }

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${activeIdx}"]`) as HTMLElement | null;
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIdx]);

  // activeIdx resets to 0 in the onChange handler below whenever query changes

  if (!open) return null;

  return createPortal(
    <div
      ref={overlayRef}
      style={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />

      <div
        ref={panelRef}
        style={{ opacity: 0 }}
        role="dialog"
        aria-label="Command palette"
        aria-modal="true"
        className="relative z-10 w-full max-w-lg rounded-xl border border-border bg-surface-raised shadow-2xl overflow-hidden"
        onKeyDown={handleKeyDown}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 border-b border-border">
          <svg aria-hidden="true" className="shrink-0 text-text-muted" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="6.5" cy="6.5" r="4.5" />
            <path d="M10 10l3 3" />
          </svg>
          <input
            ref={inputRef}
            id={inputId}
            type="text"
            role="combobox"
            aria-expanded={flatResults.length > 0}
            aria-controls={listboxId}
            aria-activedescendant={flatResults[activeIdx] ? `cmd-item-${flatResults[activeIdx].item.id}` : undefined}
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck={false}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActiveIdx(0); }}
            placeholder={placeholder}
            className="flex-1 py-4 bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs bg-surface-overlay text-text-muted border border-border">
            esc
          </kbd>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close command palette"
            className="sm:hidden p-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-surface-overlay transition-colors"
          >
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
        </div>

        {/* Results */}
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-label="Results"
          className="max-h-80 overflow-y-auto py-2"
        >
          {grouped.length === 0 && (
            <li className="px-4 py-8 text-center text-sm text-text-muted" role="option" aria-selected="false">
              No results for "{query}"
            </li>
          )}
          {grouped.map(({ group, items: groupItems }) => {
            return (
              <li key={group} role="none">
                <div
                  className="px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-text-muted"
                  aria-hidden="true"
                >
                  {group}
                </div>
                <ul role="group" aria-label={group}>
                  {groupItems.map((r) => {
                    const globalIdx = flatResults.indexOf(r);
                    const isActive = globalIdx === activeIdx;
                    return (
                      <li key={r.item.id} role="none">
                        <div
                          id={`cmd-item-${r.item.id}`}
                          role="option"
                          aria-selected={isActive}
                          tabIndex={-1}
                          data-idx={globalIdx}
                          onPointerMove={() => setActiveIdx(globalIdx)}
                          onClick={() => { r.item.onSelect(); onClose(); }}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); r.item.onSelect(); onClose(); } }}
                          className={cn(
                            'flex items-center gap-3 px-4 py-2.5 cursor-pointer',
                            isActive ? 'bg-accent-subtle' : 'hover:bg-surface-overlay'
                          )}
                        >
                          {r.item.icon && (
                            <span aria-hidden="true" className="shrink-0 text-text-muted">
                              {r.item.icon}
                            </span>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className={cn('text-sm', isActive ? 'text-text-primary' : 'text-text-secondary')}>
                              {highlightText(r.item.label, r.labelRanges)}
                            </div>
                            {r.item.description && (
                              <div className="text-xs text-text-muted truncate mt-0.5">
                                {r.item.description}
                              </div>
                            )}
                          </div>
                          {isActive && (
                            <kbd className="shrink-0 text-xs px-1.5 py-0.5 rounded bg-surface-overlay text-text-muted border border-border">
                              ↵
                            </kbd>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>

        {/* Footer */}
        <div className="flex items-center gap-4 px-4 py-2 border-t border-border text-xs text-text-muted">
          <span><kbd>↑↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </div>
    </div>,
    document.body
  );
}
