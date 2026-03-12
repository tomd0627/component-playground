import { useEffect, useState } from 'react';

function getPrefers(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(getPrefers);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    function handleChange(e: MediaQueryListEvent) {
      setPrefersReduced(e.matches);
    }
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  return prefersReduced;
}
