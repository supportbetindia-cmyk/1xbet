'use client';

import React from 'react';

export type Suit = 'spade' | 'heart' | 'diamond' | 'club';

const GLYPH: Record<Suit, string> = {
  spade: '♠',
  heart: '♥',
  diamond: '♦',
  club: '♣',
};

/** Red suits stay red even on the dark ground — that is the convention. */
export function SuitGlyph({ suit, className = '' }: { suit: Suit; className?: string }) {
  const red = suit === 'heart' || suit === 'diamond';
  return (
    <span
      className={`${className} ${red ? 'text-[#e05a6b]' : 'text-cs-gold'}`}
      aria-hidden
    >
      {GLYPH[suit]}
    </span>
  );
}

/**
 * The roulette number ring.
 *
 * Alternating red and black pockets around a rim, which is the single most
 * recognisable object in a casino. Drawn geometry — the wheel does not spin
 * and no outcome is produced or implied.
 */
export function RouletteRing({ className = '' }: { className?: string }) {
  const POCKETS = 37;
  // European single-zero wheel order, used purely so the red/black alternation
  // around the rim looks right rather than arbitrary.
  const ORDER = [
    0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10,
    5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26,
  ];
  const REDS = new Set([
    1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36,
  ]);

  const cx = 130, cy = 130, rOuter = 122, rInner = 88;

  return (
    <svg viewBox="0 0 260 260" className={className} role="img" aria-label="Diagram of a roulette wheel number ring">
      {/* Rim */}
      <circle cx={cx} cy={cy} r={rOuter + 4} className="fill-none stroke-cs-gold/70" strokeWidth="2" />
      <circle cx={cx} cy={cy} r={rInner - 6} className="fill-none stroke-cs-gold/40" strokeWidth="1.5" />

      {ORDER.map((n, i) => {
        const a0 = (i / POCKETS) * Math.PI * 2 - Math.PI / 2;
        const a1 = ((i + 1) / POCKETS) * Math.PI * 2 - Math.PI / 2;
        const p = (r: number, a: number) => `${cx + r * Math.cos(a)} ${cy + r * Math.sin(a)}`;
        const fill = n === 0 ? '#1a7a4f' : REDS.has(n) ? '#a51d2d' : '#141118';
        return (
          <path
            key={n}
            d={`M ${p(rInner, a0)} L ${p(rOuter, a0)} A ${rOuter} ${rOuter} 0 0 1 ${p(rOuter, a1)} L ${p(rInner, a1)} A ${rInner} ${rInner} 0 0 0 ${p(rInner, a0)} Z`}
            fill={fill}
            stroke="rgba(232,198,87,0.28)"
            strokeWidth="0.6"
          />
        );
      })}

      {/* Hub and spokes */}
      <circle cx={cx} cy={cy} r="30" className="fill-none stroke-cs-gold/50" strokeWidth="1.5" />
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
        return (
          <line
            key={i}
            x1={cx + 30 * Math.cos(a)}
            y1={cy + 30 * Math.sin(a)}
            x2={cx + (rInner - 8) * Math.cos(a)}
            y2={cy + (rInner - 8) * Math.sin(a)}
            className="stroke-cs-gold/35"
            strokeWidth="1.2"
          />
        );
      })}
      <circle cx={cx} cy={cy} r="9" className="fill-cs-gold/80" />
    </svg>
  );
}

/**
 * A stack of chips. Denominations are decorative — no currency, value or
 * balance is represented.
 */
export function ChipStack({ className = '' }: { className?: string }) {
  const CHIPS = ['#a51d2d', '#1a7a4f', '#2b3a8f', '#5a2a86', '#b8912f'];
  return (
    <div className={`flex items-end gap-3 ${className}`} aria-hidden>
      {CHIPS.map((c, i) => (
        <svg key={c} viewBox="0 0 44 44" className="h-10 w-10 shrink-0" style={{ marginBottom: i % 2 ? 6 : 0 }}>
          <circle cx="22" cy="22" r="20" fill={c} stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
          {/* Edge spots */}
          {[0, 1, 2, 3, 4, 5].map((k) => {
            const a = (k / 6) * Math.PI * 2;
            return (
              <rect
                key={k}
                x={22 + 15 * Math.cos(a) - 3}
                y={22 + 15 * Math.sin(a) - 2}
                width="6"
                height="4"
                rx="1"
                fill="rgba(255,255,255,0.82)"
                transform={`rotate(${(k / 6) * 360} ${22 + 15 * Math.cos(a)} ${22 + 15 * Math.sin(a)})`}
              />
            );
          })}
          <circle cx="22" cy="22" r="11" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
        </svg>
      ))}
    </div>
  );
}
