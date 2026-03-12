import { useState } from 'react';
import { CommandPalette } from '../../components/ui/CommandPalette';
import { Button } from '../../components/ui/Button';

const ITEMS = [
  {
    id: 'new-doc',
    label: 'New document',
    description: 'Create a blank document',
    group: 'Create',
    keywords: ['add', 'file'],
    onSelect: () => {},
    icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="1" width="10" height="12" rx="1.5"/><path d="M5 5h4M5 7.5h4M5 10h2"/></svg>,
  },
  {
    id: 'new-folder',
    label: 'New folder',
    description: 'Organise files into a new folder',
    group: 'Create',
    keywords: ['add', 'directory'],
    onSelect: () => {},
    icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 4a1.5 1.5 0 0 1 1.5-1.5H5l1.5 2H12A1.5 1.5 0 0 1 13 6v5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 11V4Z"/></svg>,
  },
  {
    id: 'settings',
    label: 'Open settings',
    description: 'Configure your preferences',
    group: 'Navigate',
    keywords: ['preferences', 'config'],
    onSelect: () => {},
    icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="7" cy="7" r="2"/><path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13M3 3l1 1M10 10l1 1M10 4l1-1M3 11l1-1"/></svg>,
  },
  {
    id: 'profile',
    label: 'View profile',
    description: 'See your account details',
    group: 'Navigate',
    keywords: ['account', 'user'],
    onSelect: () => {},
    icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="7" cy="5" r="2.5"/><path d="M1 13c0-3.3 2.7-5 6-5s6 1.7 6 5"/></svg>,
  },
  {
    id: 'theme-dark',
    label: 'Switch to dark theme',
    group: 'Appearance',
    keywords: ['colour', 'mode'],
    onSelect: () => {},
  },
  {
    id: 'theme-light',
    label: 'Switch to light theme',
    group: 'Appearance',
    keywords: ['colour', 'mode'],
    onSelect: () => {},
  },
  {
    id: 'logout',
    label: 'Sign out',
    description: 'End your current session',
    group: 'Account',
    keywords: ['exit', 'leave'],
    onSelect: () => {},
  },
];

export function CommandPaletteDemo() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <Button variant="outline" onClick={() => setOpen(true)}>
        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="mr-1">
          <circle cx="6" cy="6" r="4"/>
          <path d="M9.5 9.5l2.5 2.5"/>
        </svg>
        Open palette
        <kbd className="ml-2 text-xs opacity-60">⌘K</kbd>
      </Button>
      <p className="text-xs text-[var(--color-text-muted)]">
        Full keyboard nav · fuzzy search · grouped results
      </p>
      <CommandPalette
        open={open}
        onClose={() => setOpen(false)}
        items={ITEMS}
      />
    </div>
  );
}
