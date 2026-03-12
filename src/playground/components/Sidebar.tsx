import { NavLink, useParams } from 'react-router-dom';
import { cn } from '../../lib/cn';
import { byCategory, CATEGORY_ORDER } from '../registry/registry';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { slug } = useParams<{ slug: string }>();

  return (
    <>
      {/* Backdrop — mobile only, closes sidebar on click */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          aria-hidden="true"
          onClick={onClose}
        />
      )}

      <nav
        aria-label="Component library navigation"
        className={cn(
          'w-56 shrink-0 border-r border-border overflow-y-auto py-6 bg-surface',
          // Mobile: fixed drawer sliding in from left
          'fixed left-0 top-0 h-full z-40 transition-transform duration-300',
          // Desktop: static sidebar, always visible
          'md:static md:z-auto md:transition-none md:translate-x-0',
          // Mobile open/closed state
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="px-4 mb-6 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-widest">
            Components
          </span>
          {/* Close button — mobile only */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="md:hidden p-1 rounded text-text-muted hover:text-text-primary transition-colors"
          >
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
        </div>

        {CATEGORY_ORDER.map((category) => {
          const entries = byCategory[category];
          if (!entries?.length) return null;
          return (
            <div key={category} className="mb-6">
              <div className="px-4 mb-2">
                <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                  {category}
                </span>
              </div>
              <ul>
                {entries.map((entry) => (
                  <li key={entry.slug}>
                    <NavLink
                      to={`/components/${entry.slug}`}
                      className={cn(
                        'block px-4 py-1.5 text-sm transition-colors rounded-r-md mr-2',
                        entry.slug === slug
                          ? 'text-text-primary bg-accent-subtle font-medium border-l-2 border-accent'
                          : 'text-text-secondary hover:text-text-primary hover:bg-surface-raised'
                      )}
                      aria-current={entry.slug === slug ? 'page' : undefined}
                    >
                      {entry.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </nav>
    </>
  );
}
