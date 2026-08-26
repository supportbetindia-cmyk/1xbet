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
      className="border-t border-ink-200"
    >
      {items.map((item, i) => (
        <RadixAccordion.Item
          key={item.id}
          value={item.id}
          className="group border-b border-ink-200 data-[state=open]:border-brand-500/40"
        >
          <RadixAccordion.Header>
            <RadixAccordion.Trigger
              className="flex w-full cursor-pointer items-start gap-5 py-5 text-left
                         focus-visible:outline-2 focus-visible:outline-offset-2
                         focus-visible:outline-brand-500 sm:gap-7"
            >
              <span className="numeral mt-1.5 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>

              <span className="min-w-0 flex-1">
                {item.category && (
                  <span className="block text-[10px] font-medium uppercase tracking-[0.12em] text-ink-500">
                    {item.category}
                  </span>
                )}
                <span
                  className="mt-1 block text-[16px] font-medium leading-snug text-ink-900
                             transition-colors group-hover:text-brand-700
                             group-data-[state=open]:text-brand-700 sm:text-[17px]"
                >
                  {item.question}
                </span>
              </span>

              <span
                className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center
                           text-ink-400 transition-transform duration-300
                           group-data-[state=open]:rotate-45 group-data-[state=open]:text-brand-600"
              >
                <Plus className="h-4 w-4" strokeWidth={2} />
              </span>
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>

          {/* Radix exposes the panel height as a CSS var, so the open/close can
              be a real height transition rather than a display toggle. */}
          <RadixAccordion.Content
            className="overflow-hidden
                       data-[state=open]:animate-acc-open
                       data-[state=closed]:animate-acc-close"
          >
            <div className="prose-1x pb-6 pl-[3.25rem] pr-8 text-[14px] sm:pl-[4.4rem]">
              {item.answer}
            </div>
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
};
