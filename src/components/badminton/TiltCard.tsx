'use client';

import React, { useCallback, useRef, useState } from 'react';
import { isCoarsePointer, prefersReducedMotion } from '@/lib/gsap';

/**
 * A card that tilts in 3D toward the pointer, with its content lifted off the
 * face so it parallaxes as the card turns.
 *
 * Disabled on touch and for reduced-motion users: a tilt driven by pointer
 * position has no meaning without a hovering cursor, and it would otherwise
 * fire on every tap.
 */
export function TiltCard({
  children,
  className = '',
  max = 9,
}: { children: React.ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState({ x: 0, y: 0 });
  const enabled = useRef<boolean | null>(null);

  const canTilt = () => {
    if (enabled.current === null) {
      enabled.current = !isCoarsePointer() && !prefersReducedMotion();
    }
    return enabled.current;
  };

  const onMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!canTilt()) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    // -1..1 from the centre, then scaled to the max tilt.
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setT({ x: -py * 2 * max, y: px * 2 * max });
  }, [max]);

  const reset = useCallback(() => setT({ x: 0, y: 0 }), []);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      /* A dropped or cancelled pointer (drag off, touch interrupted) would
         otherwise leave the card stuck at its last angle. */
      onPointerCancel={reset}
      onBlur={reset}
      className={`bd-tilt h-full ${className}`}
    >
      <div
        className="bd-tilt-inner h-full"
        style={{ transform: `rotateX(${t.x}deg) rotateY(${t.y}deg)` }}
      >
        {children}
      </div>
    </div>
  );
}
