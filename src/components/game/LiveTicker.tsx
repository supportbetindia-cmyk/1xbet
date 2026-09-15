'use client';

import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { prefersReducedMotion } from '@/lib/gsap';

interface Round {
  id: number;
  value: number;
}

/**
 * Live multiplier board for the hero.
 *
 * A presentation piece, not a game: it runs a climbing counter, busts at a
 * random point, records the result and starts again. No wagering, no balance,
 * nothing to interact with beyond watching it — it exists to make the hero feel
 * alive rather than static.
 *
 * Driven by rAF rather than setInterval so it stays on the compositor's clock
 * and pauses automatically when the tab is hidden.
 */
export const LiveTicker: React.FC = () => {
  const [multiplier, setMultiplier] = useState(2.14);
  const [busted, setBusted] = useState(false);
  const [history, setHistory] = useState<Round[]>([
    { id: 0, value: 2.14 },
    { id: 1, value: 1.08 },
    { id: 2, value: 5.62 },
    { id: 3, value: 1.91 },
    { id: 4, value: 12.4 },
  ]);

  const raf = useRef<number | null>(null);
  const state = useRef({ start: 0, target: 0, phase: 'run' as 'run' | 'hold', nextId: 5 });

  useEffect(() => {
    // Reduced motion: leave the seeded static value in place and never start
    // the loop. Setting state here instead would cascade a render.
    if (prefersReducedMotion()) return;

    const pickTarget = () => {
      const r = Math.random();
      if (r < 0.12) return 1 + Math.random() * 0.2;      // early bust
      if (r < 0.6) return 1.3 + Math.random() * 1.8;
      if (r < 0.9) return 3 + Math.random() * 5;
      return 8 + Math.random() * 20;                     // occasional run
    };

    state.current.target = pickTarget();
    state.current.start = performance.now();

    const tick = (now: number) => {
      const s = state.current;

      if (s.phase === 'run') {
        const elapsed = (now - s.start) / 1000;
        const value = Math.pow(Math.E, 0.09 * Math.pow(elapsed * 1.6, 1.22));

        if (value >= s.target) {
          setMultiplier(s.target);
          setBusted(true);
          setHistory((h) => [{ id: s.nextId++, value: s.target }, ...h].slice(0, 6));
          s.phase = 'hold';
          s.start = now;
        } else {
          setMultiplier(value);
        }
      } else if (now - s.start > 1800) {
        // reset for the next round
        setBusted(false);
        setMultiplier(1);
        s.target = pickTarget();
        s.phase = 'run';
        s.start = now;
      }

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div className="panel panel-2 relative overflow-hidden p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="label label-volt flex items-center gap-2">
          <span className="live-dot" />
          Live multiplier
        </span>
        <TrendingUp
          className={`h-4 w-4 transition-colors duration-300 ${
            busted ? 'text-loss-600' : 'text-win-600'
          }`}
          aria-hidden
        />
      </div>

      {/* The figure is the focal point — tabular so it never reflows mid-climb */}
      <div
        className={`figure-xl mt-3 text-[clamp(2.2rem,5vw,3.2rem)] transition-colors duration-200 ${
          busted ? 'text-loss-600' : 'text-fg'
        }`}
        aria-live="off"
      >
        {multiplier.toFixed(2)}
        <span className="text-[0.55em] text-fg-dim">×</span>
      </div>

      <p className="mt-1 text-[12px] text-fg-dim">
        {busted ? 'Round ended' : 'Round in progress'}
      </p>

      {/* Recent results board */}
      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-line pt-3">
        {history.map((h) => (
          <span
            key={h.id}
            className={`rounded-[3px] px-1.5 py-1 font-mono text-[11px] font-semibold ${
              h.value >= 10
                ? 'bg-win-600/10 text-win-600'
                : h.value >= 2
                ? 'bg-brand-500/10 text-brand-600'
                : 'bg-surface-3 text-fg-dim'
            }`}
          >
            {h.value.toFixed(2)}×
          </span>
        ))}
      </div>

      <p className="mt-3 text-[11px] leading-snug text-fg-dim">
        Illustrative display only. Not a live market or a wagering interface.
      </p>
    </div>
  );
};
