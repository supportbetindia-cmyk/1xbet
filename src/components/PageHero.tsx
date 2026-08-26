'use client';

import React from 'react';

export interface PageHeroStat {
  label: string;
  value: string;
}

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  stats?: PageHeroStat[];
  icon?: React.ElementType;
}

/**
 * Shared masthead for the sub-pages. Every route previously hand-rolled its own
 * navy banner with slightly different padding, type sizes and accent colours;
 * consolidating them here is what makes the section pages feel like one product.
 */
export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  description,
  stats,
  icon: Icon,
}) => {
  return (
    <section className="panel-navy panel-navy-hairline overflow-hidden rounded-2xl shadow-xl">
      <div className="flex flex-col justify-between gap-8 p-6 sm:p-10 lg:flex-row lg:items-center">

        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 backdrop-blur-md">
            {Icon ? (
              <Icon className="h-3.5 w-3.5 text-brand-300" strokeWidth={2} />
            ) : (
              <span className="live-dot" />
            )}
            <span className="text-[10px] font-medium uppercase tracking-[0.11em] text-navy-100">
              {eyebrow}
            </span>
          </span>

          <h1 className="mt-5 text-[30px] leading-[1.1] sm:text-[40px] font-semibold tracking-[-0.032em] text-white">
            {title}
          </h1>

          <p className="mt-4 text-[15px] leading-relaxed text-navy-100">
            {description}
          </p>
        </div>

        {stats && stats.length > 0 && (
          <div className="flex shrink-0 items-center gap-6 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            {stats.map((s, i) => (
              <React.Fragment key={s.label}>
                {i > 0 && <span className="h-10 w-px bg-white/12" />}
                <div>
                  <span className="block text-[10px] font-medium uppercase tracking-[0.1em] text-navy-300">
                    {s.label}
                  </span>
                  <span className="mt-1.5 block font-mono text-2xl font-semibold tracking-tight text-white">
                    {s.value}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
