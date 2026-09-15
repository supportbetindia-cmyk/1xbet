import React from 'react';

/* ---------------------------------------------------------------------------
   Cricket-specific graphics.

   The repository has no cricket photography — only casino artwork — so these
   are drawn rather than photographed. They are on-subject, weigh nothing, and
   stay sharp at any size.
   ------------------------------------------------------------------------- */

type Ball = '.' | '1' | '2' | '4' | '6' | 'W' | 'wd';

const BALL_STYLE: Record<Ball, string> = {
  '.': 'bg-surface-3 text-fg-dim',
  '1': 'bg-surface-4 text-fg',
  '2': 'bg-surface-4 text-fg',
  // Boundary, wicket and wide were brand blue / red / brass. On a single-hue
  // palette they separate by weight instead: 4 and 6 climb the blue ramp, a
  // wicket takes the darkest navy, a wide the lightest tint.
  '4': 'bg-brand-500 text-white',
  '6': 'bg-brand-700 text-white',
  W: 'bg-navy-900 text-white',
  wd: 'bg-brand-200 text-brand-900',
};

/**
 * Over strip — six deliveries rendered as the circles a scorecard uses.
 * Illustrative: a visual device for the live-cricket sections, not a feed.
 */
export const BallStrip: React.FC<{ balls: Ball[]; label?: string }> = ({
  balls,
  label,
}) => (
  <div className="flex flex-wrap items-center gap-2">
    {label && (
      <span className="mr-1 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-fg-dim">
        {label}
      </span>
    )}
    {balls.map((b, i) => (
      <span
        key={i}
        className={`flex h-8 w-8 items-center justify-center rounded-full font-mono text-[12px] font-bold ${BALL_STYLE[b]}`}
      >
        {b === 'wd' ? 'wd' : b}
      </span>
    ))}
  </div>
);

/**
 * Cricket field diagram. An oval boundary, the 30-yard circle, and the strip
 * in the middle — the shape anyone who watches cricket recognises instantly.
 */
export const PitchDiagram: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 320 320"
    className={className}
    role="img"
    aria-label="Diagram of a cricket field showing the boundary, the thirty-yard circle and the pitch"
  >
    <defs>
      <radialGradient id="turf" cx="50%" cy="45%" r="62%">
        <stop offset="0%" stopColor="#2e9ae0" />
        <stop offset="100%" stopColor="#0068b0" />
      </radialGradient>
    </defs>

    {/* Boundary */}
    <ellipse cx="160" cy="160" rx="150" ry="150" fill="url(#turf)" />
    <ellipse
      cx="160"
      cy="160"
      rx="150"
      ry="150"
      fill="none"
      stroke="#ffffff"
      strokeWidth="2.5"
      opacity="0.85"
    />

    {/* Mown outfield rings */}
    {[132, 108, 84].map((r) => (
      <circle
        key={r}
        cx="160"
        cy="160"
        r={r}
        fill="none"
        stroke="#ffffff"
        strokeWidth="1"
        opacity="0.12"
      />
    ))}

    {/* Thirty-yard circle */}
    <ellipse
      cx="160"
      cy="160"
      rx="96"
      ry="88"
      fill="none"
      stroke="#ffffff"
      strokeWidth="2"
      strokeDasharray="7 6"
      opacity="0.75"
    />

    {/* Pitch */}
    <rect x="146" y="102" width="28" height="116" rx="2" fill="#dce8f4" />
    <rect x="146" y="102" width="28" height="116" rx="2" fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.7" />

    {/* Creases */}
    {[112, 208].map((y) => (
      <line key={y} x1="140" y1={y} x2="180" y2={y} stroke="#7593b7" strokeWidth="1.6" />
    ))}

    {/* Stumps */}
    {[108, 212].map((y) =>
      [155, 160, 165].map((x) => (
        <line key={`${y}-${x}`} x1={x} y1={y - 5} x2={x} y2={y + 5} stroke="#00335a" strokeWidth="1.4" />
      ))
    )}

    {/* Fielding positions */}
    {[
      [160, 68], [96, 108], [224, 108], [64, 172], [256, 172],
      [104, 246], [216, 246], [160, 276], [132, 150], [188, 196],
    ].map(([cx, cy], i) => (
      <circle key={i} cx={cx} cy={cy} r="5.5" fill="#ffffff" opacity="0.9" />
    ))}
  </svg>
);

export interface FormatSpec {
  name: string;
  overs: string;
  note: string;
  colour: string;
}

/** Format comparison — Test / ODI / T20 side by side. */
export const FormatCards: React.FC<{ formats: FormatSpec[] }> = ({ formats }) => (
  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
    {formats.map((f) => (
      <div key={f.name} className="g-card overflow-hidden">
        <div className="h-1.5 w-full" style={{ background: f.colour }} aria-hidden />
        <div className="p-4">
          <span className="block text-[15px] font-extrabold tracking-[-0.01em] text-fg">
            {f.name}
          </span>
          <span className="mt-1 block font-mono text-[22px] font-extrabold leading-none" style={{ color: f.colour }}>
            {f.overs}
          </span>
          <span className="mt-2 block text-[13px] leading-snug text-fg-muted">{f.note}</span>
        </div>
      </div>
    ))}
  </div>
);
