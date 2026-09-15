'use client';

import React, { useCallback, useRef, useState } from 'react';

interface RailProps {
  /** Grid classes applied from `sm` up, e.g. "sm:grid-cols-2 lg:grid-cols-4". */
  grid: string;
  /** Accessible name for the scrollable region. */
  label: string;
  /**
   * Card width on phones. Deliberately under 100% so the next card peeks over
   * the right edge — without that cue nothing signals the row is swipeable.
   */
  card?: string;
  gap?: string;
  className?: string;
  /** Exposes the scroll container, for callers that animate its children. */
  scrollRef?: React.MutableRefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}

/**
 * A card collection that is a swipe rail on phones and a grid from `sm` up.
 *
 * Stacking six cards into one column is what turned these sections into three
 * screens of scrolling each. Laying them along x instead keeps the section a
 * fixed height no matter how many cards it holds.
 *
 * The width lives in a CSS custom property rather than an inline `width` so the
 * `sm:` grid can take it back — an inline style would beat every class and the
 * cards would stay pinned at 78% on desktop.
 */
export const Rail: React.FC<RailProps> = ({
  grid,
  label,
  card = '78%',
  gap = 'gap-3 sm:gap-5',
  className = '',
  scrollRef,
  children,
}) => {
  const items = React.Children.toArray(children).filter(Boolean);
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  // Rail needs the node for scroll maths and the caller may want it too, so the
  // callback ref feeds both rather than one winning.
  const setRefs = useCallback(
    (node: HTMLDivElement | null) => {
      ref.current = node;
      if (scrollRef) scrollRef.current = node;
    },
    [scrollRef]
  );

  const onScroll = useCallback(() => {
    const el = ref.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    // Derive the pitch from the DOM so it keeps tracking the CSS if the card
    // width or gap changes, rather than hard-coding the arithmetic here.
    const gapPx = parseFloat(getComputedStyle(el).columnGap) || 0;
    const pitch = first.getBoundingClientRect().width + gapPx;
    if (pitch <= 0) return;
    const i = Math.round(el.scrollLeft / pitch);
    setActive(Math.min(items.length - 1, Math.max(0, i)));
  }, [items.length]);

  return (
    <div className={className}>
      <div
        ref={setRefs}
        onScroll={onScroll}
        role="group"
        aria-label={label}
        tabIndex={0}
        style={{ ['--rail-card' as string]: card }}
        className={`rail rail-cards -mx-4 flex snap-x snap-mandatory overflow-x-auto px-4 pb-1
                    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500
                    sm:mx-0 sm:grid sm:snap-none sm:overflow-visible sm:px-0 ${gap} ${grid}`}
      >
        {items.map((child, i) => (
          <div
            key={i}
            className="shrink-0 snap-start sm:w-auto sm:shrink-[1] [&>*]:h-full"
          >
            {child}
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5 sm:hidden" aria-hidden>
          {items.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? 'w-5 bg-brand-500' : 'w-1.5 bg-line-strong'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
