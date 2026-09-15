'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap, EASE, prefersReducedMotion } from '@/lib/gsap';

interface RevealProps {
  children: React.ReactNode;
  /** Stagger offset in seconds. */
  delay?: number;
  className?: string;
  /** Travel distance in px. Under ~20 the motion registers without shouting. */
  y?: number;
  /** Render as something other than a div. */
  as?: 'div' | 'li' | 'section' | 'span';
}

function useRevealTween(
  delay: number,
  y: number,
  immediate: boolean
) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    // Backgrounded tab: rAF is suspended, so GSAP would hide and never reveal.
    if (document.visibilityState === 'hidden') return;

    // Already on screen and not a mount animation? Leave it alone.
    if (!immediate && el.getBoundingClientRect().top < window.innerHeight * 0.9) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 0, y });

      const tween = {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: EASE,
        clearProps: 'transform',
      };

      if (immediate) {
        gsap.to(el, tween);
      } else {
        gsap.to(el, {
          ...tween,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      }
    }, el);

    // Kills tweens, disposes ScrollTriggers and restores inline styles.
    return () => ctx.revert();
  }, [delay, y, immediate]);

  return ref;
}

/**
 * Scroll reveal.
 *
 * Renders visible. GSAP applies the hidden state after mount, so the server
 * HTML is never shipped at opacity:0 — no-JS and suspended-rAF cases both show
 * the content rather than a blank page.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  className,
  y = 18,
  as: Tag = 'div',
}) => {
  const ref = useRevealTween(delay, y, false);
  return React.createElement(
    Tag,
    { ref: ref as React.Ref<HTMLDivElement>, className },
    children
  );
};

/** Mount-triggered variant for above-the-fold content. */
export const RevealOnLoad: React.FC<RevealProps> = ({
  children,
  delay = 0,
  className,
  y = 22,
  as: Tag = 'div',
}) => {
  const ref = useRevealTween(delay, y, true);
  return React.createElement(
    Tag,
    { ref: ref as React.Ref<HTMLDivElement>, className },
    children
  );
};
