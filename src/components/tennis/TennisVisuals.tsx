'use client';

import React from 'react';

/**
 * Tennis court from directly above.
 *
 * Pure geometry, no text and no data — the page's identity comes from the
 * court's proportions (tramlines, service boxes, the net across the middle),
 * so it reads as tennis without asserting anything the copy doesn't say.
 */
export function CourtDiagram({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 500"
      className={className}
      role="img"
      aria-label="Diagram of a tennis court viewed from above"
    >
      {/* Playing surface */}
      <rect x="10" y="10" width="220" height="480" rx="2" className="fill-surface-1 stroke-line-strong" strokeWidth="1.5" />

      {/* Doubles sidelines are the outer rect; singles sidelines inset */}
      <line x1="37" y1="10" x2="37" y2="490" className="stroke-line-strong" strokeWidth="1.5" />
      <line x1="203" y1="10" x2="203" y2="490" className="stroke-line-strong" strokeWidth="1.5" />

      {/* Service boxes */}
      <line x1="37" y1="140" x2="203" y2="140" className="stroke-line-strong" strokeWidth="1.5" />
      <line x1="37" y1="360" x2="203" y2="360" className="stroke-line-strong" strokeWidth="1.5" />
      <line x1="120" y1="140" x2="120" y2="360" className="stroke-line-strong" strokeWidth="1.5" />

      {/* Centre marks on the baselines */}
      <line x1="120" y1="10" x2="120" y2="22" className="stroke-line-strong" strokeWidth="1.5" />
      <line x1="120" y1="478" x2="120" y2="490" className="stroke-line-strong" strokeWidth="1.5" />

      {/* The net: mesh drawn as a hatch, with the cord across the top */}
      <defs>
        <pattern id="tn-net-mesh" width="7" height="7" patternUnits="userSpaceOnUse">
          <path d="M0 0 L7 7 M7 0 L0 7" className="stroke-brand-500" strokeWidth="0.6" opacity="0.5" />
        </pattern>
      </defs>
      <rect x="2" y="238" width="236" height="24" fill="url(#tn-net-mesh)" />
      <line x1="2" y1="238" x2="238" y2="238" className="stroke-fg" strokeWidth="2.5" />
      <line x1="2" y1="262" x2="238" y2="262" className="stroke-line-strong" strokeWidth="1.5" />
    </svg>
  );
}

/**
 * The scoring ladder — 0, 15, 30, 40, AD.
 *
 * Standard tennis notation used as a decorative progression indicator. `upTo`
 * lights the pips to that index; nothing here claims a real score.
 */
export function PointLadder({ upTo = 2, className = '' }: { upTo?: number; className?: string }) {
  const POINTS = ['0', '15', '30', '40', 'AD'];
  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`} aria-hidden>
      {POINTS.map((p, i) => (
        <React.Fragment key={p}>
          <span className="tn-pip" data-on={i <= upTo}>{p}</span>
          {i < POINTS.length - 1 && (
            <span className="h-px w-2 bg-line-strong" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/**
 * Momentum bar. An abstract two-sided meter for the sections about odds
 * shifting mid-match — no players, no numbers, just the swing.
 */
export function MomentumBar({ left = 58, className = '' }: { left?: number; className?: string }) {
  return (
    <div className={className} aria-hidden>
      <div className="flex h-2.5 w-full overflow-hidden rounded-full border border-line-strong">
        <span className="bg-tn-hard transition-[width] duration-700" style={{ width: `${left}%` }} />
        <span className="flex-1 bg-tn-clay/70" />
      </div>
      <div className="mt-2 flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-fg-dim">
        <span>Serve</span>
        <span>Return</span>
      </div>
    </div>
  );
}
