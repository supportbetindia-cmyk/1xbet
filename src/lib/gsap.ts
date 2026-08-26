'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Single registration point for GSAP plugins.
 *
 * ScrollTrigger touches `document` on register, so this module is client-only
 * and guarded — importing it from a server component would otherwise throw
 * during prerender.
 */
if (typeof window !== 'undefined') {
  // registerPlugin is idempotent, so a repeat call on fast-refresh is harmless.
  gsap.registerPlugin(ScrollTrigger);
}

/** Shared easing so every timeline on the site decelerates identically. */
export const EASE = 'power3.out';

/** Honour the OS setting. Checked at call time, not module load. */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Coarse pointers get the cheaper treatment — fewer triggers, no parallax. */
export function isCoarsePointer(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches;
}

export { gsap, ScrollTrigger };
