import { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { CommandPalette } from '../../components/ui/CommandPalette';
import { registry } from '../registry/registry';
import { Sidebar } from './Sidebar';

type Theme = 'dark' | 'light';

export function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();
  const mainRef = useRef<HTMLElement>(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) ?? 'dark';
  });

  // Apply theme class to <html> and persist
  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Close mobile sidebar on navigation (derived-state pattern — avoids setState in effect)
  const [prevPathname, setPrevPathname] = useState(location.pathname);
  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname);
    setSidebarOpen(false);
  }

  // Move focus to main heading on route change
  useEffect(() => {
    mainRef.current?.querySelector<HTMLElement>('h1')?.focus();
  }, [location.pathname]);

  // Global Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const paletteItems = registry.map((entry) => ({
    id: entry.slug,
    label: entry.name,
    description: entry.description,
    group: entry.category,
    keywords: entry.tags,
    onSelect: () => navigate(`/components/${entry.slug}`),
  }));

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <a href="#main-content" className="skip-nav">
        Skip to main content
      </a>

      <header className="border-b border-border px-4 md:px-6 h-14 flex items-center justify-between shrink-0 bg-surface">
        <div className="flex items-center gap-3">
          {/* Hamburger — mobile only */}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
            aria-expanded={sidebarOpen}
            className="md:hidden p-1.5 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-raised transition-colors"
          >
            <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M2 4.5h14M2 9h14M2 13.5h14" />
            </svg>
          </button>

          <a
            href="/"
            className="text-sm font-semibold text-text-primary tracking-tight hover:text-accent transition-colors"
          >
            Component<span className="text-accent">.</span>Playground
          </a>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            aria-label="Open command palette"
            aria-keyshortcuts="Meta+k Control+k"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs text-text-muted border border-border bg-surface-raised hover:border-accent hover:text-text-secondary transition-colors"
          >
            <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="5" cy="5" r="3.5" />
              <path d="M8 8l2 2" />
            </svg>
            Search components…
            <kbd className="ml-1 font-sans">⌘K</kbd>
          </button>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-1.5 rounded-md text-text-secondary hover:text-text-primary hover:bg-surface-raised transition-colors"
          >
            {theme === 'dark' ? (
              /* Sun icon */
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="8" cy="8" r="3" />
                <path d="M8 1.5V3M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1.06 1.06M11.54 11.54l1.06 1.06M3.4 12.6l1.06-1.06M11.54 4.46l1.06-1.06" />
              </svg>
            ) : (
              /* Moon icon */
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 9.5A5.5 5.5 0 0 1 5.5 2.5a5.5 5.5 0 1 0 7.5 7z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main
          id="main-content"
          ref={mainRef}
          className="flex-1 overflow-y-auto p-4 md:p-8"
          tabIndex={-1}
        >
          <Outlet />
        </main>
      </div>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        items={paletteItems}
        placeholder="Search components…"
      />
    </div>
  );
}
