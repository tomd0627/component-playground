import { createContext, useContext, useId, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../../lib/cn';

// ── Context ────────────────────────────────────────────────────────────────

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (id: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error('Tabs sub-components must be used inside <Tabs>');
  return ctx;
}

// ── Root ────────────────────────────────────────────────────────────────────

export interface TabsProps {
  defaultTab: string;
  children: ReactNode;
  className?: string;
}

export function Tabs({ defaultTab, children, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const baseId = useId();

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, baseId }}>
      <div className={cn('w-full', className)}>{children}</div>
    </TabsContext.Provider>
  );
}

// ── Tab List ────────────────────────────────────────────────────────────────

export interface TabListProps {
  children: ReactNode;
  label?: string;
  className?: string;
}

export function TabList({ children, label = 'Tabs', className }: TabListProps) {
  const { setActiveTab } = useTabsContext();
  const listRef = useRef<HTMLDivElement>(null);

  function handleKeyDown(e: React.KeyboardEvent) {
    const tabs = listRef.current?.querySelectorAll<HTMLElement>('[role="tab"]');
    if (!tabs) return;
    const arr = Array.from(tabs);
    const currentIdx = arr.findIndex((t) => t.getAttribute('aria-selected') === 'true');

    let nextIdx: number | null = null;
    if (e.key === 'ArrowRight') nextIdx = (currentIdx + 1) % arr.length;
    else if (e.key === 'ArrowLeft') nextIdx = (currentIdx - 1 + arr.length) % arr.length;
    else if (e.key === 'Home') nextIdx = 0;
    else if (e.key === 'End') nextIdx = arr.length - 1;

    if (nextIdx !== null) {
      e.preventDefault();
      const nextTab = arr[nextIdx];
      const slug = nextTab.dataset.tabId!;
      setActiveTab(slug);
      nextTab.focus();
    }
  }

  return (
    <div
      ref={listRef}
      role="tablist"
      aria-label={label}
      onKeyDown={handleKeyDown}
      className={cn(
        'flex border-b border-border gap-1',
        className
      )}
    >
      {children}
    </div>
  );
}

// ── Tab Trigger ──────────────────────────────────────────────────────────────

export interface TabProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function Tab({ id, children, className }: TabProps) {
  const { activeTab, setActiveTab, baseId } = useTabsContext();
  const isActive = activeTab === id;

  return (
    <button
      role="tab"
      id={`${baseId}-tab-${id}`}
      aria-selected={isActive}
      aria-controls={`${baseId}-panel-${id}`}
      tabIndex={isActive ? 0 : -1}
      data-tab-id={id}
      onClick={() => setActiveTab(id)}
      className={cn(
        'px-4 py-2.5 text-sm font-medium rounded-t-md transition-colors',
        'focus-visible:outline-2 focus-visible:outline-accent focus-visible:-outline-offset-2',
        isActive
          ? 'text-text-primary border-b-2 border-accent -mb-px'
          : 'text-text-muted hover:text-text-secondary',
        className
      )}
    >
      {children}
    </button>
  );
}

// ── Tab Panel ────────────────────────────────────────────────────────────────

export interface TabPanelProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function TabPanel({ id, children, className }: TabPanelProps) {
  const { activeTab, baseId } = useTabsContext();
  const isActive = activeTab === id;

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${id}`}
      aria-labelledby={`${baseId}-tab-${id}`}
      hidden={!isActive}
      tabIndex={0}
      className={cn(
        'pt-4 focus-visible:outline-2 focus-visible:outline-accent',
        className
      )}
    >
      {children}
    </div>
  );
}
