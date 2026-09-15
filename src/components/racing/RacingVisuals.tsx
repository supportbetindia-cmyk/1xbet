'use client';

import React from 'react';

export type SilkPattern =
  | 'stripes' | 'hoops' | 'chevron' | 'sash' | 'quarters' | 'spots';

/**
 * A jockey's silks.
 *
 * Racing identifies its runners by pattern, not by number — stripes, hoops, a
 * sash, quarters. It is the sport's own graphic language and reads instantly
 * as racing, which is why it carries this page rather than another numeral
 * treatment. Purely decorative: no silk here belongs to a real owner.
 */
export function Silks({
  pattern = 'stripes',
  base = '#8e1f38',
  mark = '#f2e3c8',
  className = '',
}: {
  pattern?: SilkPattern;
  base?: string;
  mark?: string;
  className?: string;
}) {
  const id = React.useId().replace(/:/g, '');

  return (
    <svg viewBox="0 0 40 44" className={className} aria-hidden focusable="false">
      <defs>
        <clipPath id={`${id}-body`}>
          {/* Shoulders, sleeves and a straight hem — a silk, not a square */}
          <path d="M8 6 L14 2 H26 L32 6 L38 12 L33 18 L32 42 H8 L7 18 L2 12 Z" />
        </clipPath>
      </defs>

      <g clipPath={`url(#${id}-body)`}>
        <rect width="40" height="44" fill={base} />

        {pattern === 'stripes' && [0, 1, 2].map((i) => (
          <rect key={i} x={7 + i * 10} y="0" width="5" height="44" fill={mark} />
        ))}

        {pattern === 'hoops' && [0, 1, 2, 3].map((i) => (
          <rect key={i} x="0" y={5 + i * 11} width="40" height="5" fill={mark} />
        ))}

        {pattern === 'chevron' && [0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M0 ${10 + i * 12} L20 ${2 + i * 12} L40 ${10 + i * 12} L40 ${16 + i * 12} L20 ${8 + i * 12} L0 ${16 + i * 12} Z`}
            fill={mark}
          />
        ))}

        {pattern === 'sash' && (
          <path d="M0 30 L30 0 L40 0 L0 40 Z" fill={mark} />
        )}

        {pattern === 'quarters' && (
          <>
            <rect x="0" y="0" width="20" height="22" fill={mark} />
            <rect x="20" y="22" width="20" height="22" fill={mark} />
          </>
        )}

        {pattern === 'spots' && [0, 1, 2, 3, 4, 5].map((i) => (
          <circle
            key={i}
            cx={9 + (i % 3) * 11}
            cy={11 + Math.floor(i / 3) * 15}
            r="3.6"
            fill={mark}
          />
        ))}
      </g>

      {/* Outline last so it sits over the pattern */}
      <path
        d="M8 6 L14 2 H26 L32 6 L38 12 L33 18 L32 42 H8 L7 18 L2 12 Z"
        fill="none"
        stroke="rgba(0,0,0,0.35)"
        strokeWidth="1.2"
      />
    </svg>
  );
}

/**
 * The home straight: running rail, furlong poles and the winning post.
 * Drawn geometry only — no distances or names are asserted.
 */
export function TrackStraight({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 150" className={className} role="img" aria-label="Diagram of a racecourse home straight with running rail and furlong poles">
      {/* Turf */}
      <rect x="0" y="34" width="320" height="82" className="fill-hr-turf/15" />

      {/* Running rails */}
      <line x1="0" y1="34" x2="320" y2="34" className="stroke-line-strong" strokeWidth="1.5" />
      <line x1="0" y1="116" x2="320" y2="116" className="stroke-line-strong" strokeWidth="1.5" />

      {/* Rail posts along the near side */}
      {Array.from({ length: 17 }, (_, i) => (
        <line
          key={i}
          x1={i * 20}
          y1="116"
          x2={i * 20}
          y2="123"
          className="stroke-line-strong"
          strokeWidth="1.2"
        />
      ))}

      {/* Furlong poles */}
      {[60, 140, 220].map((x) => (
        <g key={x}>
          <line x1={x} y1="20" x2={x} y2="34" className="stroke-hr-brass" strokeWidth="2.5" />
          <circle cx={x} cy="17" r="3.5" className="fill-hr-brass" />
        </g>
      ))}

      {/* Winning post */}
      <line x1="290" y1="10" x2="290" y2="34" className="stroke-hr-claret" strokeWidth="3.5" />
      <rect x="283" y="6" width="14" height="7" rx="1" className="fill-hr-claret" />

      {/* Ground line under the rail */}
      <line x1="0" y1="123" x2="320" y2="123" className="stroke-line" strokeWidth="1" />
    </svg>
  );
}

/**
 * A strip of silks — the field, as it appears in a parade ring. Gives the page
 * a burst of colour that no amount of type could.
 */
export function SilkField({ className = '' }: { className?: string }) {
  const FIELD: { p: SilkPattern; base: string; mark: string }[] = [
    { p: 'stripes',  base: '#8e1f38', mark: '#f2e3c8' },
    { p: 'hoops',    base: '#1f4d33', mark: '#e9d79a' },
    { p: 'chevron',  base: '#24446e', mark: '#ffffff' },
    { p: 'sash',     base: '#94701f', mark: '#12241c' },
    { p: 'quarters', base: '#5c2050', mark: '#f0e6d2' },
    { p: 'spots',    base: '#0f3b52', mark: '#ffd9a0' },
  ];

  return (
    <div className={`flex items-end gap-2 ${className}`} aria-hidden>
      {FIELD.map((s, i) => (
        <Silks
          key={i}
          pattern={s.p}
          base={s.base}
          mark={s.mark}
          className="h-11 w-10 shrink-0 drop-shadow-sm"
        />
      ))}
    </div>
  );
}
