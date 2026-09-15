'use client';

import React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { Plus } from 'lucide-react';

export interface AccordionEntry {
  id: string;
  question: string;
  answer: React.ReactNode;
  /** Optional small label shown above the question. */
  category?: string;
}

interface AccordionProps {
  items: AccordionEntry[];
  defaultValue?: string;
}

/**
 * Radix Accordion for the behaviour — roving focus, arrow-key navigation,
 * correct aria-expanded/aria-controls wiring, Home/End support — with the
 * default look entirely replaced.
 *
 * Visually these are ruled rows rather than cards: a hairline, a hanging
 * numeral, and a hairline that turns brand blue while open.
 */
export const Accordion: React.FC<AccordionProps> = ({ items, defaultValue }) => {
  return (
    <RadixAccordion.Root
      type="single"
      collapsible
      defaultValue={defaultValue ?? items[0]?.id}
      className="border-t border-line"
    >
      {items.map((item, i) => (
        <RadixAccordion.Item
          key={item.id}
          value={item.id}
          className="group border-b border-line data-[state=open]:border-accent-ink/40"
        >
          <RadixAccordion.Header>
            <RadixAccordion.Trigger
              className="flex w-full cursor-pointer items-start gap-4 py-4 text-left
                         focus-visible:outline-2 focus-visible:outline-offset-2
                         focus-visible:outline-accent-ink sm:gap-7 sm:py-5"
            >
              {/* Fixed width, not intrinsic: the answer below is indented by a
                  hard value, so a numeral that changes width leaves the two
                  out of alignment. w-7 + gap = 48px / 56px, matched on Content. */}
              <span className="numeral mt-1.5 w-7 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>

              <span className="min-w-0 flex-1">
                {item.category && (
                  <span className="block text-[10px] font-medium uppercase tracking-[0.12em] text-fg-dim">
                    {item.category}
                  </span>
                )}
                <span
                  className="mt-0.5 block text-[15px] font-medium leading-snug text-fg sm:mt-1
                             transition-colors group-hover:text-accent-ink
                             group-data-[state=open]:text-accent-ink sm:text-[17px]"
                >
                  {item.question}
                </span>
              </span>

              <span
                className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center
                           text-fg-dim transition-transform duration-300
                           group-data-[state=open]:rotate-45 group-data-[state=open]:text-accent-ink"
              >
                <Plus className="h-4 w-4" strokeWidth={2} />
              </span>
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>

          {/* Radix exposes the panel height as a CSS var, so the open/close can
              be a real height transition rather than a display toggle. */}
          {/* forceMount keeps every answer in the server HTML. Without it Radix
              unmounts closed panels, so only the first FAQ answer on a page was
              crawlable — 11 of 12 were missing from /tennis. The keyframes have
              no fill-mode, so `h-0` is what holds the panel shut once the close
              animation ends. */}
          <RadixAccordion.Content
            forceMount
            className="overflow-hidden
                       data-[state=open]:animate-acc-open
                       data-[state=closed]:h-0 data-[state=closed]:animate-acc-close"
          >
            <div className="pb-5 pl-11 pr-6 text-[14px] leading-relaxed text-fg-muted sm:pl-14 sm:pr-8 sm:text-[15px]">
              {item.answer}
            </div>
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
};
