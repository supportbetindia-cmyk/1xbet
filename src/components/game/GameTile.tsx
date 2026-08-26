'use client';

import React from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { AuthenticGame } from '@/lib/authenticGames';

type TileSize = 'sm' | 'md' | 'lg' | 'wide';

interface GameTileProps {
  game: AuthenticGame;
  onSelect: (game: AuthenticGame) => void;
  size?: TileSize;
  /** Above-the-fold tiles opt out of lazy-loading. */
  eager?: boolean;
}

const ASPECT: Record<TileSize, string> = {
  sm: 'aspect-[3/4]',
  md: 'aspect-[4/5]',
  lg: 'aspect-[4/3]',
  wide: 'aspect-[16/9]',
};

const SIZES: Record<TileSize, string> = {
  sm: '(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 200px',
  md: '(max-width: 640px) 60vw, (max-width: 1024px) 30vw, 260px',
  lg: '(max-width: 768px) 90vw, 45vw',
  wide: '(max-width: 768px) 92vw, 60vw',
};

/**
 * The storefront tile.
 *
 * Where artwork exists it leads; the six catalogue images are the only real
 * imagery on the site, so they carry the browsing experience. Titles without
 * artwork fall back to their own gradient plus the emoji glyph, and both
 * variants share the same scrim, chip and hover language so a mixed grid still
 * reads as one set.
 */
export const GameTile: React.FC<GameTileProps> = ({
  game,
  onSelect,
  size = 'sm',
  eager = false,
}) => {
  const big = size === 'lg' || size === 'wide';

  return (
    <button
      type="button"
      onClick={() => onSelect(game)}
      aria-label={`${game.title} by ${game.provider}`}
      className={`tile scrim group block w-full text-left ${ASPECT[size]}`}
    >
      {/* Artwork */}
      {game.imageUrl ? (
        <Image
          src={game.imageUrl}
          alt=""
          fill
          sizes={SIZES[size]}
          loading={eager ? 'eager' : 'lazy'}
          className="object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.07]"
        />
      ) : (
        <>
          <div
            className="absolute inset-0 saturate-[0.85] transition-transform duration-[600ms] ease-out group-hover:scale-[1.05]"
            style={{ background: game.posterBg }}
          />
          <span
            aria-hidden
            className="absolute inset-0 z-[2] flex items-center justify-center text-[42px] opacity-90 drop-shadow-[0_6px_18px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:scale-110"
          >
            {game.iconSymbol}
          </span>
        </>
      )}

      {/* Top metadata */}
      <div className="absolute inset-x-0 top-0 z-[3] flex items-start justify-between gap-2 p-2.5">
        {game.badge ? (
          <span className="chip chip-volt !text-[10px]">{game.badge}</span>
        ) : (
          <span />
        )}
        <span className="chip !bg-black/45 !text-[10px] font-mono">{game.rtp}</span>
      </div>

      {/* Bottom block */}
      <div className="absolute inset-x-0 bottom-0 z-[3] p-3">
        <h3
          className={`truncate font-display font-bold tracking-[-0.02em] text-white ${
            big ? 'text-[19px]' : 'text-[14px]'
          }`}
        >
          {game.title}
        </h3>

        <div className="mt-1 flex items-center justify-between gap-2">
          <span className="truncate text-[11px] text-white/60">{game.provider}</span>
          <span className="shrink-0 font-mono text-[11px] font-semibold text-brand-600">
            {game.maxWin}
          </span>
        </div>

        {big && (
          <p className="mt-2 line-clamp-2 max-w-md text-[14px] leading-snug text-white/70">
            {game.description}
          </p>
        )}
      </div>

      {/* Hover affordance — a play control, not a full-surface overlay that
          hides the artwork the tile exists to show. */}
      <span
        aria-hidden
        className="absolute left-1/2 top-1/2 z-[3] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2
                   scale-75 items-center justify-center rounded-full bg-brand-500 text-white
                   opacity-0 shadow-[0_8px_22px_rgba(0,122,204,0.42)] transition-all duration-300
                   group-hover:scale-100 group-hover:opacity-100"
      >
        <Play className="ml-0.5 h-5 w-5 fill-current" />
      </span>
    </button>
  );
};
