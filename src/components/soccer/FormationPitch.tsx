'use client';

import React, { useState } from 'react';

/**
 * Standard formation notation. Each entry is the outfield shape from the back,
 * with the keeper implied — universal football notation, not a claim about any
 * team, match or lineup.
 */
const FORMATIONS: { name: string; lines: number[] }[] = [
  { name: '4-4-2', lines: [4, 4, 2] },
  { name: '4-3-3', lines: [4, 3, 3] },
  { name: '3-5-2', lines: [3, 5, 2] },
  { name: '5-3-2', lines: [5, 3, 2] },
];

/**
 * Interactive formation board.
 *
 * The page says repeatedly that a tactical change alters how a match develops.
 * Rather than restate that, this lets the reader switch shape and watch the
 * players move — the point is made by handling it.
 *
 * Buttons are real radio-style controls with `aria-pressed`, so it works from
 * the keyboard and reports state to assistive tech.
 */
export function FormationPitch({ className = '' }: { className?: string }) {
  const [active, setActive] = useState(0);
  const { lines } = FORMATIONS[active];

  // Rows run from the goal line up: keeper, then each outfield line.
  const rows: number[] = [1, ...lines];
  const rowY = (i: number) => 12 + (i / (rows.length - 1)) * 76;

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Choose a formation">
        {FORMATIONS.map((f, i) => (
          <button
            key={f.name}
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            className={`min-h-[44px] cursor-pointer rounded-[3px] border px-4 font-mono text-[13px] font-bold transition-colors
                        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sc-pitch ${
              i === active
                ? 'border-transparent bg-sc-pitch text-white'
                : 'border-line-strong text-fg-muted hover:border-sc-pitch hover:text-fg'
            }`}
          >
            {f.name}
          </button>
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-[4px] border border-line">
        <svg viewBox="0 0 100 100" className="block h-auto w-full" role="img" aria-label={`Pitch showing a ${FORMATIONS[active].name} formation`}>
          {/* Pitch and mown stripes */}
          <rect width="100" height="100" className="fill-sc-pitch/10" />
          {[0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={i * 20} y="0" width="10" height="100" className="fill-sc-pitch/[0.06]" />
          ))}

          {/* Markings */}
          <rect x="3" y="3" width="94" height="94" className="fill-none stroke-line-strong" strokeWidth="0.5" />
          <line x1="3" y1="50" x2="97" y2="50" className="stroke-line-strong" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="11" className="fill-none stroke-line-strong" strokeWidth="0.5" />
          <rect x="30" y="3" width="40" height="14" className="fill-none stroke-line-strong" strokeWidth="0.5" />
          <rect x="30" y="83" width="40" height="14" className="fill-none stroke-line-strong" strokeWidth="0.5" />

          {/* Players. Keyed by row+slot so React moves them rather than
              replacing them, which is what makes the change animate. */}
          {rows.map((count, ri) =>
            Array.from({ length: count }, (_, pi) => {
              const x = ((pi + 1) / (count + 1)) * 100;
              const y = rowY(ri);
              return (
                <circle
                  key={`${ri}-${pi}`}
                  cx={x}
                  cy={y}
                  r="3.2"
                  className={`${ri === 0 ? 'fill-sc-lime' : 'fill-sc-pitch'} [transition:cx_450ms_cubic-bezier(0.22,1,0.36,1),cy_450ms_cubic-bezier(0.22,1,0.36,1)]`}
                />
              );
            })
          )}
        </svg>
      </div>

      <p className="mt-4 text-[13px] leading-relaxed text-fg-dim">
        Formation shapes only — no team, lineup or fixture is represented.
      </p>
    </div>
  );
}
