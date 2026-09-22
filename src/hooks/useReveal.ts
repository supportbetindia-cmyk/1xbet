'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger, EASE, prefersReducedMotion, isCoarsePointer } from '@/lib/gsap';

interface RevealOptions {
  /** Selector for children to stagger. Omit to animate the container itself. */
  selector?: string;
  /** Seconds between each child. */
  stagger?: number;
  /** Travel distance in px. */
  y?: number;
  duration?: number;
  delay?: number;
  /** Play immediately on mount instead of waiting for scroll. */
  immediate?: boolean;
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {}
) {
  const {
    selector,
    stagger = 0.05,
    y = 16,
    duration = 0.5,
    delay = 0,
    immediate = false,
  } = options;

  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reduced motion: leave the DOM untouched and animate nothing.
    if (prefersReducedMotion()) return;

    if (document.visibilityState === 'hidden') return;

    const ctx = gsap.context(() => {
      const all = selector ? Array.from(el.querySelectorAll(selector)) : [el];
      if (!all.length) return;

      // Only animate what starts below the fold. Hiding content that is
      // already on screen risks a blank first paint if the engine stalls, and
      // the entrance is invisible to the user anyway.
      const targets = immediate
        ? all
        : all.filter((t) => t.getBoundingClientRect().top > window.innerHeight * 0.9);
      if (!targets.length) return;

      const common = {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: EASE,
        stagger: selector ? stagger : 0,
        clearProps: 'transform',
      };

      gsap.set(targets, { opacity: 0, y });

      if (immediate) {
        gsap.to(targets, common);
      } else {
        gsap.to(targets, {
          ...common,
          scrollTrigger: {
            trigger: el,
            // Fire before the section is fully on screen: at 82% the
            // content was still fading in after the reader reached it.
            start: isCoarsePointer() ? 'top 97%' : 'top 90%',
            once: true,
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [selector, stagger, y, duration, delay, immediate]);

  return ref;
}

/**
 * Counts a figure up when it scrolls into view. Formats through Intl so
 * thousands separators stay correct mid-tween.
 */
export function useCountUp(
  value: number,
  options: { decimals?: number; duration?: number } = {}
) {
  const { decimals = 0, duration = 1.6 } = options;
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const fmt = (n: number) =>
      n.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });

    if (prefersReducedMotion()) {
      el.textContent = fmt(value);
      return;
    }

    const ctx = gsap.context(() => {
      const counter = { n: 0 };
      gsap.to(counter, {
        n: value,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = fmt(counter.n);
        },
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      });
    }, el);

    return () => ctx.revert();
  }, [value, decimals, duration]);

  return ref;
}

export { ScrollTrigger };
