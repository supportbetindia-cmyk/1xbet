'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Silks } from '@/components/racing/RacingVisuals';

/** Furlong markers counting down to the post. Standard racing notation. */
const MARKS = ['6f', '5f', '4f', '3f', '2f', '1f', 'Post'];

/**
 * Draggable run down the home straight.
 *
 * The page states repeatedly that markets move as a race approaches and again
 * once it is under way. Rather than asserting that in another paragraph, this
 * lets the reader scrub the field along the straight and watch the poles fall
 * behind — the point is made by handling it.
 *
 * Pointer, click and keyboard all drive the same `setStop`, so it is operable
 * without a mouse. No odds, runners or results are represented.
 */
export function FurlongScrubber({ className = '' }: { className?: string }) {
  const [stop, setStop] = useState(0);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const pct = (stop / (MARKS.length - 1)) * 100;

  const stopFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.width <= 0) return;
    const ratio = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    setStop(Math.round(ratio * (MARKS.length - 1)));
  }, []);

  // Listeners go on window: a pointer that leaves the track mid-drag should
  // keep scrubbing, and the release must be caught wherever it happens.
  useEffect(() => {
    if (!dragging) return;
    const move = (e: PointerEvent) => stopFromClientX(e.clientX);
    const up = () => setDragging(false);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
    };
  }, [dragging, stopFromClientX]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault(); setStop((s) => Math.min(MARKS.length - 1, s + 1));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault(); setStop((s) => Math.max(0, s - 1));
    } else if (e.key === 'Home') {
      e.preventDefault(); setStop(0);
    } else if (e.key === 'End') {
      e.preventDefault(); setStop(MARKS.length - 1);
    }
  };

  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-hr-claret">
          Down the straight
        </span>
        <span className="font-mono text-[13px] font-bold text-fg" aria-hidden>
          {MARKS[stop]}
        </span>
      </div>

      <div
        ref={trackRef}
        role="slider"
        tabIndex={0}
        aria-label="Scrub the field down the home straight"
        aria-valuemin={0}
        aria-valuemax={MARKS.length - 1}
        aria-valuenow={stop}
        aria-valuetext={MARKS[stop]}
        onKeyDown={onKey}
        onPointerDown={(e) => {
          // preventDefault stops the drag selecting text, but it also suppresses
          // the default focus — without this the control can be clicked and then
          // ignores every arrow key.
          e.preventDefault();
          e.currentTarget.focus();
          setDragging(true);
          stopFromClientX(e.clientX);
        }}
        className="relative mt-6 h-16 cursor-grab touch-none select-none rounded-[3px] active:cursor-grabbing
                   focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-hr-claret"
      >
        {/* Rail */}
        <span className="absolute inset-x-0 bottom-4 h-px bg-line-strong" aria-hidden />

        {/* Ground already covered */}
        <span
          className="absolute bottom-4 left-0 h-[3px] rounded-full bg-hr-claret transition-[width] duration-200 ease-out"
          style={{ width: `${pct}%` }}
          aria-hidden
        />

        {/* Furlong poles — brass once passed */}
        {MARKS.map((m, i) => {
          const left = (i / (MARKS.length - 1)) * 100;
          const passed = i <= stop;
          const last = i === MARKS.length - 1;
          return (
            <span
              key={m}
              className="absolute bottom-4 flex -translate-x-1/2 flex-col items-center"
              style={{ left: `${left}%` }}
              aria-hidden
            >
              <span
                className={`mb-1 w-[2px] transition-all duration-200 ${
                  last ? 'h-5' : 'h-3'
                } ${passed ? (last ? 'bg-hr-claret' : 'bg-hr-brass') : 'bg-line-strong'}`}
              />
            </span>
          );
        })}

        {/* The field */}
        <span
          className="absolute bottom-[10px] -translate-x-1/2 transition-[left] duration-200 ease-out"
          style={{ left: `${pct}%` }}
          aria-hidden
        >
          <Silks
            pattern="stripes"
            base="#8e1f38"
            mark="#f2e3c8"
            className="h-9 w-8 drop-shadow-[0_3px_6px_rgba(0,0,0,0.28)]"
          />
        </span>
      </div>

      <div className="mt-1 flex justify-between font-mono text-[10px] font-bold text-fg-dim" aria-hidden>
        {MARKS.map((m, i) => (
          <span key={m} className={i <= stop ? 'text-hr-brass' : ''}>{m}</span>
        ))}
      </div>

      <p className="mt-4 text-[13px] leading-relaxed text-fg-dim">
        Markets may change, suspend or close as the race progresses. Drag to move down the
        straight — illustration only, not a live race or price feed.
      </p>
    </div>
  );
}
