'use client';

import React, { useEffect, useId, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ReadMoreProps {
  children: React.ReactNode;
  /** Collapsed height on phones, in rem. */
  clamp?: number;
  label?: string;
  className?: string;
}

/** Matches the `md` breakpoint, above which this renders as a plain wrapper. */
const PHONE = '(width < 48rem)';

/**
 * Collapses a long prose block on phones only.
 *
 * Everything stays in the DOM and is never `display:none` — the block is
 * height-limited and masked, so the text stays selectable, findable with
 * in-page search and fully visible to crawlers.
 *
 * The toggle only appears once the content is measured as actually overflowing.
 * This wraps shared components (InfoBand renders it on every usage), so a
 * "Read more" under a two-line paragraph would otherwise be common.
 */
export const ReadMore: React.FC<ReadMoreProps> = ({
  children,
  clamp = 13,
  label = 'Read more',
  className = '',
}) => {
  const [open, setOpen] = useState(false);
  const [overflows, setOverflows] = useState(false);
  const inner = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const el = inner.current;
    if (!el) return;

    const clampPx = clamp * parseFloat(getComputedStyle(document.documentElement).fontSize);
    const mq = window.matchMedia(PHONE);

    const measure = () => {
      // scrollHeight of the unclamped inner element is the true content height.
      setOverflows(mq.matches && el.scrollHeight > clampPx + 24);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    mq.addEventListener('change', measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener('change', measure);
    };
  }, [clamp]);

  const collapsed = overflows && !open;

  return (
    <div className={className}>
      <div
        id={id}
        className="relative overflow-hidden transition-[max-height] duration-500 ease-out"
        style={{ maxHeight: collapsed ? `${clamp}rem` : undefined }}
      >
        <div ref={inner}>{children}</div>

        {collapsed && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-canvas to-transparent"
          />
        )}
      </div>

      {overflows && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={id}
          className="mt-2 inline-flex min-h-[44px] cursor-pointer items-center gap-1.5 text-[14px]
                     font-extrabold text-brand-600 transition-colors hover:text-brand-700
                     focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
        >
          {open ? 'Show less' : label}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            aria-hidden
          />
        </button>
      )}
    </div>
  );
};
