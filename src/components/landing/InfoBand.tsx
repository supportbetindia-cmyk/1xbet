'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useReveal } from '@/hooks/useReveal';
import { ReadMore } from '@/components/ui/ReadMore';

interface InfoBandProps {
  label: string;
  title: React.ReactNode;
  children: React.ReactNode;
  /** Rendered in the right column on wide screens. */
  aside?: React.ReactNode;
  id?: string;
  tone?: 'canvas' | 'raised';
  /** Optional link rendered under the copy. */
  action?: { label: string; href: string };
}

/**
 * Informational band.
 *
 * Two columns with the heading anchored left and the copy running right, so a
 * short paragraph never floats alone in a wide empty field — the specific
 * failure of the rejected build.
 */
export const InfoBand: React.FC<InfoBandProps> = ({
  label,
  title,
  children,
  aside,
  id,
  tone = 'canvas',
  action,
}) => {
  const ref = useReveal<HTMLDivElement>({ selector: '[data-ib]', stagger: 0.07, y: 18 });

  return (
    <section
      id={id}
      className={`border-t border-line py-8 sm:py-9 lg:py-10 ${
        tone === 'raised' ? 'bg-surface-1' : 'bg-canvas'
      }`}
    >
      <div ref={ref} className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">

          <div className="lg:col-span-4">
            <div data-ib>
              <span className="label label-volt">{label}</span>
              <h2 className="mt-3 text-[clamp(1.55rem,3vw,2.25rem)] uppercase">{title}</h2>
              <div className="score-rule mt-5 max-w-[180px]" aria-hidden />
            </div>

            {action && (
              <div data-ib className="mt-6">
                <Link
                  href={action.href}
                  className="group inline-flex min-h-[44px] items-center gap-2 text-[15px] font-medium text-fg
                             transition-colors hover:text-brand-600
                             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                >
                  {action.label}
                  <ArrowRight className="h-4 w-4 text-brand-600 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                </Link>
              </div>
            )}
          </div>

          <div className={aside ? 'lg:col-span-5' : 'lg:col-span-8'}>
            <ReadMore label="Read more">
              <div data-ib className="space-y-4 text-[16px] leading-relaxed text-fg-muted">
                {children}
              </div>
            </ReadMore>
          </div>

          {aside && (
            <div data-ib className="lg:col-span-3">
              {aside}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
