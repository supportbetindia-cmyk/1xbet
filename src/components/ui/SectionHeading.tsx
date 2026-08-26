import React from 'react';
import { Reveal } from '@/components/editorial/Reveal';

interface SectionHeadingProps {
  index?: string;
  kicker?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** Rendered on the right of the heading row — a link, filter, or count. */
  aside?: React.ReactNode;
  onDark?: boolean;
  /** Constrains the intro measure. */
  narrow?: boolean;
  as?: 'h2' | 'h3';
}

/**
 * The one heading pattern used across every section, so the page rhythm stays
 * consistent even where the layouts underneath differ.
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  index,
  kicker,
  title,
  intro,
  aside,
  onDark = false,
  narrow = true,
  as: Tag = 'h2',
}) => {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className={narrow ? 'max-w-2xl' : undefined}>
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="accent-bar" aria-hidden />
            {index && <span className="numeral">{index}</span>}
            {kicker && (
              <span
                className={`text-[10px] font-medium uppercase tracking-[0.13em] ${
                  onDark ? 'text-navy-100' : 'text-ink-500'
                }`}
              >
                {kicker}
              </span>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <Tag
            className={`display mt-4 text-[clamp(1.65rem,4.2vw,2.75rem)] ${
              onDark ? 'text-white' : 'text-ink-900'
            }`}
          >
            {title}
          </Tag>
        </Reveal>

        {intro && (
          <Reveal delay={0.12}>
            <p
              className={`mt-4 text-[clamp(0.95rem,1.4vw,1.05rem)] leading-relaxed ${
                onDark ? 'text-navy-100' : 'text-ink-600'
              }`}
            >
              {intro}
            </p>
          </Reveal>
        )}
      </div>

      {aside && (
        <Reveal delay={0.16} className="shrink-0">
          {aside}
        </Reveal>
      )}
    </div>
  );
};
