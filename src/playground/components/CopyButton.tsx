import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => () => clearTimeout(timerRef.current ?? undefined), []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      clearTimeout(timerRef.current ?? undefined);
      timerRef.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable or permission denied — fail silently
    }
  }

  return (
    <button
      onClick={handleCopy}
      aria-label={copied ? 'Copied!' : 'Copy code'}
      className={cn(
        'px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
        'bg-surface-overlay text-text-secondary',
        'hover:text-text-primary hover:bg-border',
        copied && 'text-success',
        className
      )}
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}
