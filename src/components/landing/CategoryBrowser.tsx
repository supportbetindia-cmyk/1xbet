'use client';

import React, { useState, useLayoutEffect, useRef } from 'react';
import { AUTHENTIC_GAMES, AuthenticGame } from '@/lib/authenticGames';
import { GameTile } from '@/components/game/GameTile';
import { gsap, prefersReducedMotion } from '@/lib/gsap';

interface CategoryBrowserProps {
  onSelectGame: (game: AuthenticGame) => void;
}

const CATEGORIES: { id: string; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'originals', label: '1xOriginals' },
  { id: 'slots', label: 'Slots' },
  { id: 'live', label: 'Live' },
  { id: 'game-shows', label: 'Game shows' },
  { id: 'megaways', label: 'Megaways' },
  { id: 'table', label: 'Table' },
];

/**
 * Tabbed category browser.
 *
 * The tab strip is a horizontal rail on narrow viewports rather than a wrapped
 * block, so the filter stays one line and thumb-reachable. Switching category
 * plays a short stagger on the incoming tiles — enough to signal the change
 * without making the user wait for it.
 */
export const CategoryBrowser: React.FC<CategoryBrowserProps> = ({ onSelectGame }) => {
  const [active, setActive] = useState('all');
  const gridRef = useRef<HTMLDivElement>(null);

  const games = (
    active === 'all'
      ? AUTHENTIC_GAMES
      : AUTHENTIC_GAMES.filter((g) => g.category === active)
  ).slice(0, 12);

  useLayoutEffect(() => {
    const el = gridRef.current;
    if (!el || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.children,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.035, clearProps: 'transform' }
      );
    }, el);

    return () => ctx.revert();
  }, [active]);

  return (
    <section className="relative border-t border-line bg-surface-1 py-14 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">

        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <span className="label label-volt">Browse by category</span>
            <h2 className="mt-3 text-[clamp(1.7rem,3.4vw,2.6rem)] uppercase">
              Find what you&rsquo;re looking for
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-fg-muted">
            Rather than filling the homepage with every available category, 1xBet keeps the
            main experience focused on helping users reach the section they&rsquo;re looking
            for.
          </p>
        </div>

        {/* Tab strip */}
        <div
          role="tablist"
          aria-label="Game categories"
          className="rail mt-8 border-b border-line"
        >
          {CATEGORIES.map((c) => {
            const on = active === c.id;
            return (
              <button
                key={c.id}
                role="tab"
                aria-selected={on}
                onClick={() => setActive(c.id)}
                className={`relative min-h-[46px] cursor-pointer whitespace-nowrap px-4 text-[14px]
                            font-medium transition-colors duration-200
                            focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-600
                            ${on ? 'text-fg' : 'text-fg-dim hover:text-fg'}`}
              >
                {c.label}
                <span
                  aria-hidden
                  className={`absolute inset-x-2 -bottom-px h-[2px] origin-left rounded-full bg-brand-500
                              transition-transform duration-300 ease-out ${on ? 'scale-x-100' : 'scale-x-0'}`}
                />
              </button>
            );
          })}
        </div>

        {games.length === 0 ? (
          <p className="mt-10 text-[15px] text-fg-dim">
            No titles in this category right now.
          </p>
        ) : (
          <div
            ref={gridRef}
            className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 lg:gap-4"
          >
            {games.map((g) => (
              <GameTile key={g.id} game={g} onSelect={onSelectGame} size="sm" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
