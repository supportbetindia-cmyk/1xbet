import React from 'react';

/* ---------------------------------------------------------------------------
   Football graphics. Drawn, not photographed — the project has no football
   imagery, and borrowing casino artwork for a football page would misrepresent
   the section.
   ------------------------------------------------------------------------- */

type EventKind = 'goal' | 'yellow' | 'red' | 'sub' | 'pen';

export interface MatchEvent {
  minute: number;
  kind: EventKind;
  label: string;
}

const KIND_DOT: Record<EventKind, string> = {
  goal: 'bg-fg',
  yellow: 'bg-[#e8b02a]',
  red: 'bg-[#d4342c]',
  sub: 'bg-brand-500',
  pen: 'bg-brand-700',
};

/**
 * Ninety-minute timeline with event markers.
 *
 * The copy repeatedly makes the point that a goal, card, substitution or
 * penalty can move a market within seconds. This shows that shape rather than
 * restating it. Illustrative: not a live feed.
 */
export const MatchTimeline: React.FC<{ events: MatchEvent[] }> = ({ events }) => (
  <div>
    <div className="flex items-center justify-between text-[11px] font-bold text-fg-dim">
      <span className="font-mono">0&rsquo;</span>
      <span className="font-mono">45&rsquo;</span>
      <span className="font-mono">90&rsquo;</span>
    </div>

    <div className="relative mt-2 h-2 rounded-full bg-surface-3">
      {/* Half-time marker */}
      <span className="absolute left-1/2 top-[-4px] h-4 w-px bg-line-strong" aria-hidden />

      {events.map((e) => (
        <span
          key={`${e.minute}-${e.kind}`}
          className={`absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-2 ring-canvas ${KIND_DOT[e.kind]}`}
          style={{ left: `${Math.min(100, (e.minute / 90) * 100)}%` }}
          title={`${e.minute}' ${e.label}`}
        />
      ))}
    </div>

    <ul className="mt-4 space-y-1.5">
      {events.map((e) => (
        <li key={`${e.minute}-${e.label}`} className="flex items-center gap-3">
          <span className="fb-min">{e.minute}&rsquo;</span>
          <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${KIND_DOT[e.kind]}`} aria-hidden />
          <span className="text-[14px] font-semibold text-fg">{e.label}</span>
        </li>
      ))}
    </ul>
  </div>
);

/** Yellow and red booking cards, angled as they are when shown. */
export const CardPair: React.FC<{ className?: string }> = ({ className }) => (
  <span className={`inline-flex items-center gap-1.5 ${className ?? ''}`} aria-hidden>
    <span className="fb-card fb-card-y" />
    <span className="fb-card fb-card-r" />
  </span>
);

/**
 * Pitch markings. Half a pitch — centre circle, penalty area, six-yard box,
 * penalty spot and arc — drawn as white lines on the page's own surface rather
 * than on a green field, so it reads as a diagram, not a photograph.
 */
export const PitchMarkings: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 340 220"
    className={className}
    role="img"
    aria-label="Diagram of half a football pitch showing the centre circle, penalty area and six-yard box"
  >
    <rect x="1" y="1" width="338" height="218" rx="4" fill="#f5f8fc" stroke="#0d1b2a" strokeWidth="2" />

    {/* Halfway line + centre circle */}
    <line x1="1" y1="110" x2="339" y2="110" stroke="#0d1b2a" strokeWidth="1.5" opacity="0.28" />
    <circle cx="170" cy="110" r="42" fill="none" stroke="#0d1b2a" strokeWidth="2" opacity="0.55" />
    <circle cx="170" cy="110" r="3.5" fill="#0d1b2a" opacity="0.7" />

    {/* Penalty area */}
    <rect x="78" y="1" width="184" height="66" fill="none" stroke="#0d1b2a" strokeWidth="2" opacity="0.55" />
    {/* Six-yard box */}
    <rect x="126" y="1" width="88" height="26" fill="none" stroke="#0d1b2a" strokeWidth="2" opacity="0.55" />
    {/* Penalty spot + arc */}
    <circle cx="170" cy="46" r="3" fill="#0d1b2a" opacity="0.7" />
    <path d="M136 67 A 40 40 0 0 0 204 67" fill="none" stroke="#0d1b2a" strokeWidth="2" opacity="0.55" />

    {/* Goal */}
    <rect x="148" y="-5" width="44" height="8" fill="#007acc" />

    {/* Corner arcs */}
    <path d="M1 11 A 10 10 0 0 0 11 1" fill="none" stroke="#0d1b2a" strokeWidth="1.5" opacity="0.45" />
    <path d="M329 1 A 10 10 0 0 0 339 11" fill="none" stroke="#0d1b2a" strokeWidth="1.5" opacity="0.45" />
  </svg>
);
