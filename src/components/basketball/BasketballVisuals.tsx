'use client';

import React from 'react';

/**
 * Half court, viewed from above.
 *
 * Pure geometry — the key, the restricted arc, the three-point line and the
 * free-throw circle. Basketball's court markings are distinctive enough on
 * their own that no labelling is needed, and none is invented here.
 */
export function HalfCourt({
  className = '',
  glow = false,
}: { className?: string; glow?: boolean }) {
  // On the dark bands the court is drawn in rim orange and lit, rather than as
  // grey hairlines that disappear against the navy.
  const line = glow ? 'stroke-bb-leather' : 'stroke-line-strong';
  const faint = glow ? 'stroke-bb-leather/45' : 'stroke-line';
  const fill = glow ? 'fill-white/[0.03]' : 'fill-surface-1';
  const paint = glow ? 'fill-bb-leather/10' : 'fill-canvas';
  const board = glow ? 'stroke-white' : 'stroke-fg';
  return (
    <svg
      viewBox="0 0 300 280"
      className={`${className} ${glow ? "bb-glow" : ""}`}
      role="img"
      aria-label="Diagram of a basketball half court viewed from above"
    >
      <rect x="4" y="4" width="292" height="272" rx="2" className={`${fill} ${line}`} strokeWidth="1.5" />

      {/* Three-point line: corners run straight off the baseline, then arc */}
      <path
        d="M 32 4 L 32 84 A 118 118 0 0 0 268 84 L 268 4"
        className={`fill-none ${line}`}
        strokeWidth="1.5"
      />

      {/* The key / paint */}
      <rect x="110" y="4" width="80" height="112" className={`${paint} ${line}`} strokeWidth="1.5" />

      {/* Free-throw circle — solid to the paint, dashed behind it */}
      <path d="M 110 116 A 40 40 0 0 0 190 116" className={`fill-none ${line}`} strokeWidth="1.5" />
      <path
        d="M 190 116 A 40 40 0 0 0 110 116"
        className={`fill-none ${line}`}
        strokeWidth="1.5"
        strokeDasharray="5 5"
      />

      {/* Restricted area under the basket */}
      <path d="M 132 30 A 18 18 0 0 0 168 30" className={`fill-none ${line}`} strokeWidth="1.5" />

      {/* Backboard and hoop */}
      <line x1="128" y1="18" x2="172" y2="18" className={board} strokeWidth="2.5" />
      <circle cx="150" cy="30" r="9" className="fill-none stroke-bb-leather" strokeWidth="3" />

      {/* Half-court arc at the far edge */}
      <path d="M 88 276 A 62 62 0 0 1 212 276" className={`fill-none ${faint}`} strokeWidth="1.5" />
    </svg>
  );
}

/**
 * Quarter progression. The copy leans on quarters — "making every quarter
 * important" — so the page marks its rhythm with them.
 */
export function QuarterBar({ upTo = 1, className = '' }: { upTo?: number; className?: string }) {
  const QS = ['Q1', 'Q2', 'Q3', 'Q4'];
  return (
    <div className={`flex flex-wrap items-center gap-1.5 ${className}`} aria-hidden>
      {QS.map((q, i) => (
        <React.Fragment key={q}>
          <span className="bb-q" data-on={i <= upTo}>{q}</span>
          {i < QS.length - 1 && <span className="h-px w-3 bg-line-strong" />}
        </React.Fragment>
      ))}
    </div>
  );
}

/**
 * Scoring run. An abstract strip of possession marks for the sections about
 * momentum shifting — no teams, no numbers, just the swing of a run.
 */
export function ScoringRun({
  pattern = [1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1],
  className = '',
}: { pattern?: number[]; className?: string }) {
  return (
    <div className={className} aria-hidden>
      <div className="bb-run flex items-end gap-1">
        {pattern.map((v, i) => (
          <span
            key={i}
            style={{ animationDelay: `${i * 45}ms` }}
            className={`flex-1 rounded-[1px] ${v ? 'h-9 bg-bb-leather' : 'h-3.5 bg-line-strong'}`}
          />
        ))}
      </div>
      <div className="mt-2.5 flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-fg-dim">
        <span>Tip-off</span>
        <span>Final</span>
      </div>
    </div>
  );
}
