import { cloneElement, type ReactElement, useId, useRef, useState } from 'react';
import { cn } from '../../../lib/cn';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  content: string;
  placement?: TooltipPlacement;
  children: ReactElement<React.HTMLAttributes<HTMLElement>>;
}

const placementClasses: Record<TooltipPlacement, string> = {
  top:    'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left:   'right-full top-1/2 -translate-y-1/2 mr-2',
  right:  'left-full top-1/2 -translate-y-1/2 ml-2',
};

const arrowClasses: Record<TooltipPlacement, string> = {
  top:    'top-full left-1/2 -translate-x-1/2 border-t-surface-overlay border-x-transparent border-b-transparent',
  bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-surface-overlay border-x-transparent border-t-transparent',
  left:   'left-full top-1/2 -translate-y-1/2 border-l-surface-overlay border-y-transparent border-r-transparent',
  right:  'right-full top-1/2 -translate-y-1/2 border-r-surface-overlay border-y-transparent border-l-transparent',
};

export function Tooltip({ content, placement = 'top', children }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const id = useId();
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function show() {
    clearTimeout(hideTimeout.current ?? undefined);
    setVisible(true);
  }

  function hide() {
    hideTimeout.current = setTimeout(() => setVisible(false), 100);
  }

  // aria-describedby and show/hide handlers must live on the focusable child so
  // that screen readers and pointer events both target the correct element.
  // The react-hooks/refs rule fires a false-positive here: no ref is read during
  // render — the callbacks only close over stable state-setter functions.
  const { onMouseEnter, onMouseLeave, onFocus, onBlur } = children.props;
  // eslint-disable-next-line react-hooks/refs
  const trigger = cloneElement(children, {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => { show(); onMouseEnter?.(e); },
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => { hide(); onMouseLeave?.(e); },
    onFocus:      (e: React.FocusEvent<HTMLElement>)  => { show(); onFocus?.(e); },
    onBlur:       (e: React.FocusEvent<HTMLElement>)  => { hide(); onBlur?.(e); },
    'aria-describedby': visible ? id : undefined,
  });

  return (
    <span className="relative inline-flex">
      {trigger}
      <span
        id={id}
        role="tooltip"
        aria-hidden={!visible}
        className={cn(
          'pointer-events-none absolute z-50 w-max max-w-xs',
          'px-2.5 py-1.5 rounded-md text-xs font-medium',
          'bg-surface-overlay text-text-primary',
          'border border-border shadow-lg',
          'transition-opacity duration-150',
          placementClasses[placement],
          visible ? 'opacity-100' : 'opacity-0'
        )}
      >
        {content}
        <span
          aria-hidden="true"
          className={cn('absolute border-4', arrowClasses[placement])}
        />
      </span>
    </span>
  );
}
