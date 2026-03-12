import { useRef } from 'react';
import type { ReactNode } from 'react';
import { usePrefersReducedMotion } from '../../../hooks/usePrefersReducedMotion';
import { gsap, ScrollTrigger, useGSAP } from '../../../lib/gsap';
import { cn } from '../../../lib/cn';

export type ScrollRevealAnimation = 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-up';

export interface ScrollRevealProps {
  children: ReactNode;
  animation?: ScrollRevealAnimation;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

const fromVars: Record<ScrollRevealAnimation, gsap.TweenVars> = {
  'fade-up':    { opacity: 0, y: 40 },
  'fade-in':    { opacity: 0 },
  'slide-left': { opacity: 0, x: -40 },
  'slide-right':{ opacity: 0, x: 40 },
  'scale-up':   { opacity: 0, scale: 0.9 },
};

export function ScrollReveal({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 0.6,
  threshold = 0.15,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  useGSAP(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReduced) {
      gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1 });
      return;
    }

    gsap.set(el, fromVars[animation]);

    ScrollTrigger.create({
      trigger: el,
      start: `top ${(1 - threshold) * 100}%`,
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration,
          delay,
          ease: 'power3.out',
        });
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
