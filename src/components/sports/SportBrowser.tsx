'use client';

import React from 'react';
import Link from 'next/link';
import * as RadixTabs from '@radix-ui/react-tabs';
import { ArrowRight } from 'lucide-react';

interface Sport {
  id: string;
  tab: string;
  label: string;
  heading: string;
  body: string[];
  cta?: { label: string; href: string };
  /** Short factual line shown in the panel's side rail. */
  note: string;
  /** Strapline under the sport name in the selector. */
  marketsNote: string;
  /** Solid accent colour identifying the sport. */
  colour: string;
}

const SPORTS: Sport[] = [
  {
    id: 'football',
    colour: '#007acc',
    marketsNote: 'Match & competition markets',
    tab: 'Football',
    label: 'Football Betting',
    heading: 'Follow Available Football Events',
    body: [
      'Football betting gives users access to available football matches and markets through the sports section.',
      'Depending on the competition and fixture, users may be able to browse upcoming matches, review event information and check the markets offered for a particular game.',
      'Football markets can change as match conditions develop, particularly where live betting is available.',
      'The availability of leagues, matches and markets can vary according to location and platform coverage.',
    ],
    cta: { label: 'Explore Football Betting', href: '/lobby' },
    note: 'Markets shift with match conditions where live betting is offered.',
  },
  {
    id: 'cricket',
    colour: '#0a7d54',
    marketsNote: 'Formats vary by competition',
    tab: 'Cricket',
    label: 'Cricket Betting',
    heading: 'Explore Cricket Markets',
    body: [
      'Cricket betting is available for selected cricket events and competitions, subject to platform and regional availability.',
      'Users can browse available matches, review cricket markets and check the odds displayed for individual events.',
      'Different cricket formats and competitions can have different markets. Live cricket markets may also be available for selected matches, with options changing as the game progresses.',
      'For detailed cricket-related information, users can explore the dedicated cricket section.',
    ],
    cta: { label: 'Explore Cricket Betting', href: '/cricket' },
    note: 'Formats differ — the markets for a T20 need not match a Test.',
  },
  {
    id: 'tennis',
    colour: '#a8873c',
    marketsNote: 'Tournament & match stage',
    tab: 'Tennis',
    label: 'Tennis Betting',
    heading: 'Follow Tennis Matches',
    body: [
      'Tennis betting allows users to browse available tennis events and markets.',
      'Available options can vary depending on the tournament, match and stage of competition. Users can review the event information and current markets displayed for each match.',
      'Where live markets are supported, changes in the match can affect the available options and live betting odds.',
      'Always check the current event page before participating.',
    ],
    cta: { label: 'Explore Tennis Betting', href: '/lobby' },
    note: 'Options vary by tournament, match and stage of competition.',
  },
  {
    id: 'basketball',
    colour: '#b8391f',
    marketsNote: 'Fast-moving live play',
    tab: 'Basketball',
    label: 'Basketball Betting',
    heading: 'Browse Basketball Events',
    body: [
      'Basketball betting provides access to available basketball matches and markets through the sports section.',
      'Users can browse selected competitions, check upcoming events and review the markets available for each game.',
      'Basketball matches can change quickly, particularly during live play. Where live markets are offered, the available options and odds may change as the game develops.',
      'Availability depends on the event, location and current platform coverage.',
    ],
    note: 'Play moves quickly; live options can change through a game.',
  },
  {
    id: 'esports',
    colour: '#0b82e0',
    marketsNote: 'Titles, tournaments, formats',
    tab: 'Esports',
    label: 'Esports Betting',
    heading: 'Explore Competitive Gaming',
    body: [
      'Esports betting covers available markets for selected competitive gaming events.',
      'Esports competitions can include different games, tournaments and formats, so the markets available can vary significantly from one event to another.',
      'Users can browse available esports events, review the information provided and check the current markets and odds displayed for each competition.',
      'Availability can depend on the event, region and platform coverage.',
    ],
    note: 'Titles and formats differ widely, so markets differ with them.',
  },
];

/**
 * Sport browser.
 *
 * The source copy carries five near-identical passages, one per sport. Stacked
 * as five sections they read as padding; as one tabbed panel the differences
 * between them are actually visible, and the page keeps its shape. Radix
 * supplies roving focus and the tab/panel ARIA wiring.
 */
export const SportBrowser: React.FC = () => {
  return (
    <RadixTabs.Root defaultValue="football">
      <RadixTabs.List
        aria-label="Sports"
        className="rail gap-0 border-y border-line md:grid md:grid-cols-5 md:gap-px md:border md:bg-line"
      >
        {SPORTS.map((s) => (
          <RadixTabs.Trigger
            key={s.id}
            value={s.id}
            className="group relative flex min-h-[76px] flex-1 cursor-pointer items-center gap-3
                       bg-canvas px-4 text-left transition-all
                       hover:bg-surface-1 focus-visible:outline-2 focus-visible:-outline-offset-2
                       focus-visible:outline-brand-600 data-[state=active]:bg-navy-700"
          >
            <span
              className="sport-chip h-9 w-9 shrink-0 transition-transform duration-300 group-hover:scale-105"
              style={{ background: s.colour }}
              aria-hidden
            >
              <span className="font-display text-[15px] font-extrabold">{s.tab[0]}</span>
            </span>

            <span className="flex min-w-0 flex-col">
              <span className="truncate text-[15px] font-extrabold tracking-[-0.01em] text-fg transition-colors group-data-[state=active]:text-white">
                {s.tab}
              </span>
              <span className="truncate text-[11px] font-medium text-fg-dim transition-colors group-data-[state=active]:text-brand-200">
                {s.marketsNote}
              </span>
            </span>
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>

      {/* forceMount keeps every panel in the server HTML. Without it Radix
          unmounts inactive tabs, so four of the five sports would never be
          crawlable on a page whose whole purpose is search. */}
      {SPORTS.map((s) => (
        <RadixTabs.Content
          key={s.id}
          value={s.id}
          forceMount
          className="pt-8 data-[state=inactive]:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <span
                className="mb-4 block h-1.5 w-14 rounded-full"
                style={{ background: s.colour }}
                aria-hidden
              />
              <h3 className="text-[clamp(1.3rem,2.3vw,1.75rem)] font-extrabold tracking-[-0.03em] text-fg">
                {s.heading}
              </h3>
              <p className="mt-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-brand-600">
                {s.label}
              </p>

              {s.cta && (
                <Link
                  href={s.cta.href}
                  className="group mt-6 inline-flex min-h-[46px] items-center gap-2 text-[15px] font-semibold text-fg
                             transition-colors hover:text-brand-600
                             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                >
                  {s.cta.label}
                  <ArrowRight
                    className="h-4 w-4 text-brand-600 transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  />
                </Link>
              )}
            </div>

            <div className="space-y-4 text-[16px] leading-relaxed text-fg-muted lg:col-span-5">
              {s.body.map((para) => (
                <p key={para.slice(0, 28)}>{para}</p>
              ))}
            </div>

            <div className="lg:col-span-3">
              <div className="border-l-[5px] pl-4" style={{ borderColor: s.colour }}>
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-fg-dim">
                  Worth knowing
                </span>
                <p className="mt-2 text-[15px] leading-relaxed text-fg">{s.note}</p>
              </div>
            </div>
          </div>
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  );
};
