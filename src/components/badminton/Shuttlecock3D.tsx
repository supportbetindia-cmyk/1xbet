'use client';

import React from 'react';

/**
 * A shuttlecock built in real 3D.
 *
 * Sixteen feather planes are placed around the Y axis and flared outward, then
 * the whole assembly spins — so the skirt has genuine depth and the feathers
 * pass in front of and behind the cork as it turns. A drawn cone would only
 * ever fake that.
 *
 * The transforms are inline because they're computed per feather; the spin and
 * the reduced-motion opt-out live in the stylesheet.
 */
export function Shuttlecock3D({
  feathers = 16,
  className = '',
}: { feathers?: number; className?: string }) {
  return (
    <div className={`bd-shuttle ${className}`} role="img" aria-label="A shuttlecock, rotating">
      <div className="bd-float">
        <div className="bd-shuttle-spin mx-auto h-[220px] w-[220px]">
          {Array.from({ length: feathers }, (_, i) => {
            const angle = (i / feathers) * 360;
            return (
              <span
                key={i}
                className="bd-feather"
                style={{
                  // Rotate into place, flare out from the axis, then stand the
                  // feather up along the skirt.
                  transform: `translateX(-50%) rotateY(${angle}deg) translateZ(34px) rotateX(24deg)`,
                  height: 108,
                  width: 22,
                }}
              >
                <svg viewBox="0 0 22 108" className="h-full w-full">
                  {/* Vane */}
                  <path
                    d="M11 2 C 19 26, 20 66, 17 104 L 5 104 C 2 66, 3 26, 11 2 Z"
                    fill="rgba(255,255,255,0.92)"
                    stroke="rgba(46,47,122,0.35)"
                    strokeWidth="0.8"
                  />
                  {/* Quill */}
                  <line x1="11" y1="6" x2="11" y2="103" stroke="rgba(46,47,122,0.28)" strokeWidth="1.1" />
                  {/* Barb hints */}
                  {[22, 40, 58, 76].map((y) => (
                    <g key={y} stroke="rgba(46,47,122,0.14)" strokeWidth="0.7">
                      <line x1="11" y1={y} x2="5" y2={y + 7} />
                      <line x1="11" y1={y} x2="17" y2={y + 7} />
                    </g>
                  ))}
                </svg>
              </span>
            );
          })}

          {/* Cork base, sat at the axis */}
          <span
            className="absolute left-1/2 bottom-1/2 block"
            style={{ transform: 'translate(-50%, 46%)' }}
          >
            <span className="block h-[52px] w-[52px] rounded-full bg-[radial-gradient(circle_at_32%_28%,#a9d5f5,#0068b0_58%,#00335a)] shadow-[0_10px_24px_rgba(0,0,0,0.4)]" />
            <span className="mx-auto -mt-[10px] block h-[10px] w-[46px] rounded-b-full bg-[#00335a]" />
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * The shuttle's flight path. Badminton's arc is distinctive — it climbs, then
 * drops almost vertically as the skirt brakes it. Drawn geometry only.
 */
export function FlightArc({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 130" className={className} role="img" aria-label="Diagram of a shuttlecock flight path over the net">
      {/* Court line and net */}
      <line x1="4" y1="118" x2="296" y2="118" className="stroke-line-strong" strokeWidth="1.5" />
      <line x1="150" y1="64" x2="150" y2="118" className="stroke-line-strong" strokeWidth="1.5" />
      {Array.from({ length: 11 }, (_, i) => (
        <line
          key={i}
          x1={150}
          y1={66 + i * 5}
          x2={150}
          y2={66 + i * 5}
          className="stroke-line"
          strokeWidth="1"
        />
      ))}

      {/* Steep climb, sharp drop — the shape that makes badminton badminton */}
      <path
        d="M 20 116 C 70 18, 120 6, 152 22 C 184 38, 214 96, 270 116"
        className="fill-none stroke-bd-cyan"
        strokeWidth="2"
        strokeDasharray="5 5"
      />

      {/* Shuttle at the apex */}
      <circle cx="152" cy="22" r="5" className="fill-bd-cork" />
      <path d="M 152 17 L 146 4 M 152 17 L 152 3 M 152 17 L 158 4" className="stroke-bd-cyan" strokeWidth="1.5" />
    </svg>
  );
}
