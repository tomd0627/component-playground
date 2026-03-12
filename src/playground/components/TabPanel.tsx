import { useId, useRef, useState } from 'react';
import { cn } from '../../lib/cn';
import { PreviewFrame } from './PreviewFrame';
import { CodeBlock } from './CodeBlock';
import type { ComponentEntry } from '../registry/types';

const TABS = ['Preview', 'Code', 'A11y'] as const;
type Tab = typeof TABS[number];

interface TabPanelProps {
  entry: ComponentEntry;
}

export function TabPanel({ entry }: TabPanelProps) {
  const [activeTab, setActiveTab] = useState<Tab>('Preview');
  const tablistRef = useRef<HTMLDivElement>(null);
  const id = useId();

  function handleKeyDown(e: React.KeyboardEvent) {
    const tabs = TABS;
    const currentIdx = tabs.indexOf(activeTab);
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const next = tabs[(currentIdx + 1) % tabs.length];
      setActiveTab(next);
      (tablistRef.current?.querySelector(`[data-tab="${next}"]`) as HTMLElement)?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prev = tabs[(currentIdx - 1 + tabs.length) % tabs.length];
      setActiveTab(prev);
      (tablistRef.current?.querySelector(`[data-tab="${prev}"]`) as HTMLElement)?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActiveTab(tabs[0]);
      (tablistRef.current?.querySelector(`[data-tab="${tabs[0]}"]`) as HTMLElement)?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      setActiveTab(tabs[tabs.length - 1]);
      (tablistRef.current?.querySelector(`[data-tab="${tabs[tabs.length - 1]}"]`) as HTMLElement)?.focus();
    }
  }

  return (
    <div>
      <div
        ref={tablistRef}
        role="tablist"
        aria-label="Component view options"
        className="flex gap-1 mb-4 border-b border-border"
        onKeyDown={handleKeyDown}
      >
        {TABS.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              role="tab"
              data-tab={tab}
              id={`${id}-tab-${tab}`}
              aria-selected={isActive}
              aria-controls={`${id}-panel-${tab}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-t-md transition-colors',
                'focus-visible:outline-2 focus-visible:outline-accent',
                isActive
                  ? 'text-text-primary border-b-2 border-accent -mb-px'
                  : 'text-text-muted hover:text-text-secondary'
              )}
            >
              {tab}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel-Preview`}
        aria-labelledby={`${id}-tab-Preview`}
        hidden={activeTab !== 'Preview'}
      >
        <PreviewFrame>
          <entry.component />
        </PreviewFrame>
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel-Code`}
        aria-labelledby={`${id}-tab-Code`}
        hidden={activeTab !== 'Code'}
      >
        <CodeBlock code={entry.code} />
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel-A11y`}
        aria-labelledby={`${id}-tab-A11y`}
        hidden={activeTab !== 'A11y'}
        className="prose prose-invert max-w-none text-text-secondary"
      >
        <div className="p-4 rounded-lg bg-surface-raised border border-border text-sm leading-relaxed whitespace-pre-wrap font-sans">
          {entry.a11yNotes}
        </div>
      </div>
    </div>
  );
}
