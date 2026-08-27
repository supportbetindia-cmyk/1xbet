'use client';

import React, { useEffect, useState } from 'react';

export interface RailItem {
  id: string;
  label: string;
  /** Small figure shown beside the label, e.g. a count. */
  meta?: string;
}

interface SportsRailProps {
  items: RailItem[];
}

/**
 * Section navigation.
 *
 * Horizontal, not a left column. A narrow sidebar left a 232px void down the
 * whole page whenever it scrolled out of view, and it depended on
 * position:sticky surviving every ancestor's overflow rules. A full-width strip
 * pinned under the header has neither problem and reads like the sport nav a
 * sportsbook actually carries.
 *
 * Scroll-spy runs on IntersectionObserver, so it costs nothing per frame.
 */
export const SportsRail: React.FC<SportsRailProps> = ({ items }) => {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-160px 0px -62% 0px', threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav
      aria-label="Sections on this page"
      className="sticky top-[104px] z-30 -mx-4 border-y border-line bg-canvas/95 backdrop-blur-md sm:-mx-6 lg:-mx-10"
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <ul className="rail gap-0 py-0">
          {items.map((item) => {
            const on = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={on ? 'true' : undefined}
                  className={`group relative flex min-h-[52px] items-center gap-2 whitespace-nowrap px-4
                              text-[14px] font-bold transition-colors
                              focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-600
                              ${on ? 'text-brand-600' : 'text-fg-muted hover:text-fg'}`}
                >
                  {item.label}
                  {item.meta && (
                    <span
                      className={`rounded-[3px] px-1.5 py-0.5 font-mono text-[11px] font-bold ${
                        on ? 'bg-brand-500 text-white' : 'bg-surface-3 text-fg-dim'
                      }`}
                    >
                      {item.meta}
                    </span>
                  )}

                  {/* Active marker sits flush with the strip's bottom border */}
                  <span
                    aria-hidden
                    className={`absolute inset-x-2 -bottom-px h-[3px] origin-left rounded-full bg-brand-500
                                transition-transform duration-300 ease-out ${on ? 'scale-x-100' : 'scale-x-0'}`}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
