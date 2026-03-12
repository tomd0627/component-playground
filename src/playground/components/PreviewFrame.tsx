import type { ReactNode } from 'react';

interface PreviewFrameProps {
  children: ReactNode;
}

export function PreviewFrame({ children }: PreviewFrameProps) {
  return (
    <section
      aria-label="Component preview"
      className="
        min-h-64 rounded-lg border border-border
        bg-surface-raised
        flex items-center justify-center p-8
        bg-[radial-gradient(var(--color-border-subtle)_1px,transparent_1px)]
        bg-size-[20px_20px]
      "
    >
      {children}
    </section>
  );
}
