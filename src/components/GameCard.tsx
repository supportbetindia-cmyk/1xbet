'use client';

import React from 'react';
import Image from 'next/image';
import { Play, ShieldCheck } from 'lucide-react';
import { AuthenticGame } from '@/lib/authenticGames';

interface GameCardProps {
  game: AuthenticGame;
  onSelect: (game: AuthenticGame) => void;
  /** Wider layout used on /1xgames, where only six titles are shown. */
  showDescription?: boolean;
}

/**
 * The single source of truth for a game poster.
 *
 * The catalogue ships ~40 very different `posterBg` gradients (rose, amber,
 * emerald, cyan…). Rendering those raw makes the lobby look like a sticker
 * sheet, so every poster gets the same house treatment: a slight desaturation
 * plus a shared navy scrim. Games stay individually recognisable, but the grid
 * reads as one set tied back to the logo palette.
 */
export const GameCard: React.FC<GameCardProps> = ({
  game,
  onSelect,
  showDescription = false,
}) => {
  return (
    <article
      onClick={() => onSelect(game)}
      className="gaming-card gaming-card-glow group flex cursor-pointer flex-col overflow-hidden rounded-xl"
    >
      <div
        className={`relative overflow-hidden ${
          showDescription ? 'aspect-[16/10]' : 'aspect-[3/4]'
        }`}
      >
        {game.imageUrl ? (
          /* next/image handles the responsive srcset, AVIF/WebP negotiation and
             lazy-loading. `sizes` matters here — without it the browser fetches
             a full-width source for a card that is at most a sixth of the grid. */
          <Image
            src={game.imageUrl}
            alt={`${game.title} by ${game.provider}`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, (max-width: 1440px) 20vw, 220px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <div
            className="absolute inset-0 saturate-[0.8] transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            style={{ background: game.posterBg }}
          />
        )}

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: game.imageUrl
              ? 'linear-gradient(180deg, rgba(0,17,36,0.55) 0%, rgba(0,26,53,0.05) 30%, rgba(0,26,53,0.15) 60%, rgba(0,17,36,0.9) 100%)'
              : 'radial-gradient(90% 65% at 50% 12%, rgba(255,255,255,0.18) 0%, transparent 62%), linear-gradient(180deg, rgba(0,26,53,0.12) 0%, rgba(0,26,53,0.34) 55%, rgba(0,17,36,0.86) 100%)',
          }}
        />

        <div className="relative flex h-full flex-col justify-between p-2.5 z-10">
          <div className="flex items-start justify-between gap-1.5">
            {game.badge ? (
              <span className="rounded border border-white/20 bg-black/40 px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.06em] text-white backdrop-blur-md shadow-xs">
                {game.badge}
              </span>
            ) : (
              <span />
            )}
            <span className="shrink-0 rounded bg-black/40 px-1.5 py-0.5 font-mono text-[9px] font-medium text-fg backdrop-blur-md border border-white/10">
              {game.rtp}
            </span>
          </div>

          {!game.imageUrl && (
            <span
              className="my-auto select-none text-center text-[44px] leading-none transition-transform duration-500 ease-out group-hover:scale-110"
              style={{ filter: 'drop-shadow(0 6px 14px rgba(0,17,36,0.5))' }}
            >
              {game.iconSymbol}
            </span>
          )}

          <div className="flex items-end justify-between gap-1.5 text-[10px] mt-auto">
            <span className="min-w-0 truncate text-white/85 font-medium drop-shadow-sm">{game.provider}</span>
            <span className="shrink-0 font-mono font-bold text-white drop-shadow-sm">{game.maxWin}</span>
          </div>
        </div>

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2.5 bg-navy-950/75 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-500 text-white shadow-lg shadow-brand-500/30 transition-transform duration-300 group-hover:scale-110">
            <Play className="ml-0.5 h-[18px] w-[18px] fill-current" />
          </span>
          <span className="text-[11px] font-bold text-white uppercase tracking-wider">Play for real</span>
          <span className="text-[10px] text-white/70 underline underline-offset-2 hover:text-white">Try demo</span>
        </div>
      </div>

      <div
        className={`flex flex-1 flex-col gap-1 bg-white ${showDescription ? 'p-4' : 'p-2.5'}`}
      >
        <h3
          className={`truncate font-semibold tracking-[-0.01em] text-ink-900 transition-colors group-hover:text-brand-600 ${
            showDescription ? 'text-[15px]' : 'text-[13px]'
          }`}
        >
          {game.title}
        </h3>

        {showDescription && (
          <p className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-ink-500">
            {game.description}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-1.5 text-[11px]">
          <span className="text-ink-500">
            Min <span className="font-mono">${game.minBet.toFixed(2)}</span>
          </span>
          <span className="flex items-center gap-1 text-win-600" title="Provably fair">
            <ShieldCheck className="h-3 w-3" strokeWidth={2.4} />
          </span>
        </div>
      </div>
    </article>
  );
};
