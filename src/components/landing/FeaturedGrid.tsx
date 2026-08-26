'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { AUTHENTIC_GAMES, AuthenticGame } from '@/lib/authenticGames';
import { GameTile } from '@/components/game/GameTile';
import { useReveal } from '@/hooks/useReveal';

interface FeaturedGridProps {
  onSelectGame: (game: AuthenticGame) => void;
}

/**
 * Featured content directly under the hero.
 *
 * Deliberately asymmetric: one wide title anchors the left column while a
 * denser stack runs the right. An even grid of identical tiles is the thing
 * that makes a games page look templated, so the sizes are mixed on purpose.
 */
export const FeaturedGrid: React.FC<FeaturedGridProps> = ({ onSelectGame }) => {
  const ref = useReveal<HTMLDivElement>({ selector: '[data-fx]', stagger: 0.07, y: 22 });

  const art = AUTHENTIC_GAMES.filter((g) => g.imageUrl);
  const lead = art[3] ?? art[0];
  const stack = AUTHENTIC_GAMES.filter((g) => g.id !== lead.id).slice(0, 6);

  return (
    <section className="relative border-t border-line bg-canvas py-14 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="label label-volt">Popular right now</span>
            <h2 className="mt-3 text-[clamp(1.7rem,3.4vw,2.6rem)] uppercase">
              Explore 1xBet games
            </h2>
            <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-fg-muted">
              The 1xBet games section gives users access to the online gaming options
              currently offered through the platform. Game availability can change over
              time, so users should check the platform for the latest available selection.
            </p>
          </div>

          <Link
            href="/casino"
            className="group inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-[6px]
                       border border-line-strong px-4 text-[14px] font-medium text-fg
                       transition-colors hover:border-brand-500/60 hover:bg-surface-3
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            View all games
            <ArrowUpRight className="h-4 w-4 text-brand-600 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>

        <div className="score-rule mt-7" aria-hidden />

        <div ref={ref} className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-12 lg:gap-4">
          {/* Anchor title */}
          <div data-fx className="col-span-2 lg:col-span-5">
            <GameTile game={lead} onSelect={onSelectGame} size="lg" />
          </div>

          {/* Denser stack */}
          {stack.map((g) => (
            <div key={g.id} data-fx className="lg:col-span-[2.333] lg:col-span-2">
              <GameTile game={g} onSelect={onSelectGame} size="sm" />
            </div>
          ))}

          <div data-fx className="col-span-2 lg:col-span-3">
            {/* Editorial slot inside the grid rather than another tile — breaks
                the repetition and carries real copy from the page. */}
            <div className="panel cut-corner flex h-full flex-col justify-between p-5">
              <div>
                <span className="label label-volt">Availability</span>
                <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">
                  Different games and features may be subject to regional restrictions and
                  applicable terms. If you are looking for a specific type of game, the
                  relevant category can be accessed directly through the platform.
                </p>
              </div>

              <dl className="mt-6 space-y-2.5 border-t border-line pt-4">
                {[
                  ['Titles', String(AUTHENTIC_GAMES.length)],
                  ['Studios', '8'],
                  ['Categories', '7'],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-3">
                    <dt className="text-[13px] text-fg-dim">{k}</dt>
                    <dd className="font-mono text-[15px] font-semibold text-brand-600">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
