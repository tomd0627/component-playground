import { useState } from 'react';
import { DropdownMenu, DropdownTrigger, DropdownMenuList, DropdownItem, DropdownSeparator } from '../../components/ui/DropdownMenu';

export function DropdownMenuDemo() {
  const [lastAction, setLastAction] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center gap-6">
      <DropdownMenu>
        <DropdownTrigger>Options</DropdownTrigger>
        <DropdownMenuList>
          <DropdownItem onSelect={() => setLastAction('Edit')}>
            Edit
          </DropdownItem>
          <DropdownItem onSelect={() => setLastAction('Duplicate')}>
            Duplicate
          </DropdownItem>
          <DropdownItem disabled onSelect={() => setLastAction('Archive')}>
            Archive
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem destructive onSelect={() => setLastAction('Delete')}>
            Delete
          </DropdownItem>
        </DropdownMenuList>
      </DropdownMenu>
      {lastAction && (
        <p className="text-xs text-[var(--color-text-muted)]" aria-live="polite">
          Selected: <span className="text-[var(--color-accent)]">{lastAction}</span>
        </p>
      )}
    </div>
  );
}
