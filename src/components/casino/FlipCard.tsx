'use client';

import React, { useState } from 'react';
import { SuitGlyph, Suit } from '@/components/casino/CasinoVisuals';

interface FlipCardProps {
  suit: Suit;
  /** Card index shown on the corner pip, e.g. 'A', '2', 'K'. */
  value: string;
  title: string;
  body: string;
}

/**
 * A card that turns over to show its detail.
 *
 * The interaction is the page's own subject matter — turning a card — rather
 * than a generic accordion. Both faces are always rendered and neither is
 * `display:none`, so the body text stays selectable, findable with in-page
 * search and visible to crawlers whichever way the card is facing.
 *
 * It is a real <button>, so keyboard and screen-reader users get the same
 * behaviour, with `aria-pressed` reporting which way up it is.
 */
export function FlipCard({ suit, value, title, body }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="cs-flip h-full" data-flipped={flipped}>
      <button
        type="button"
        onClick={() => setFlipped((v) => !v)}
        aria-pressed={flipped}
        aria-label={`${title}. Turn the card to read more.`}
        /* Rotation is driven from here rather than a `[data-flipped]` CSS rule:
           an inline transform can't be lost to selector or build-order issues,
           and the transition still comes from the stylesheet. */
        style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
        className="cs-flip-inner block h-full min-h-[188px] w-full cursor-pointer text-left
                   focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cs-gold"
      >
        {/* Face */}
        <span className="cs-flip-face cs-card flex h-full flex-col justify-between p-5">
          <span className="flex items-start justify-between">
            <span className="font-mono text-[13px] font-bold text-cs-gold">{value}</span>
            <SuitGlyph suit={suit} className="text-[20px] leading-none" />
          </span>

          <span className="block text-[17px] font-extrabold leading-tight tracking-[-0.015em] text-fg">
            {title}
          </span>

          <span className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-fg-dim">
              Turn over
            </span>
            <SuitGlyph suit={suit} className="rotate-180 text-[20px] leading-none" />
          </span>
        </span>

        {/* Back */}
        <span className="cs-flip-face cs-flip-back cs-card flex h-full flex-col justify-between p-5">
          <span className="block text-[13px] font-bold uppercase tracking-[0.14em] text-cs-gold">
            {title}
          </span>
          <span className="block text-[14px] leading-relaxed text-fg-muted">{body}</span>
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-fg-dim">
            Turn back
          </span>
        </span>
      </button>
    </div>
  );
}
