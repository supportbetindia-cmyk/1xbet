'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export interface FaqItem {
  q: string;
  /** Answer body. Kept as nodes so entries can carry lists, links, figures. */
  a: React.ReactNode;
}

interface FaqAccordionProps {
  items: FaqItem[];
  /** Index left open on load, or null for all closed. */
  defaultOpen?: number | null;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({
  items,
  defaultOpen = 0,
}) => {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="divide-y divide-ink-200 border-y border-ink-200">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <h3>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="group flex w-full cursor-pointer items-start justify-between gap-6 py-4 text-left"
              >
                <span
                  className={`text-[15px] font-medium leading-snug transition-colors ${
                    isOpen ? 'text-ink-900' : 'text-ink-800 group-hover:text-brand-700'
                  }`}
                >
                  {item.q}
                </span>
                <Plus
                  className={`mt-0.5 h-4 w-4 shrink-0 text-ink-400 transition-transform duration-300 ${
                    isOpen ? 'rotate-45 text-brand-600' : 'group-hover:text-ink-600'
                  }`}
                  strokeWidth={2}
                />
              </button>
            </h3>

            {isOpen && (
              <div className="animate-rise-in pb-5 pr-10">
                <div className="prose-1x text-[14px]">{item.a}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
