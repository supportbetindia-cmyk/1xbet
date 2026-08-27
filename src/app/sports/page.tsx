'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Radio, TrendingUp, AlertTriangle } from 'lucide-react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { useSite } from '@/components/SiteChrome';
import { SportBrowser } from '@/components/sports/SportBrowser';
import { SportsRail, RailItem } from '@/components/sports/SportsRail';
import { Accordion, AccordionEntry } from '@/components/ui/Accordion';

const SPORT_LIST = [
  'Cricket',
  'Football',
  'Tennis',
  'Basketball',
  'Esports',
  'Other supported sports and competitions',
];

/* Each sport carries its own solid colour so the rail reads as a set of
   distinct categories rather than six identical grey pills. All five are drawn
   from the existing palette. */
const SPORT_COLOURS: [string, string, string][] = [
  ['Cricket', '#0a7d54', 'Formats vary'],
  ['Football', '#007acc', 'Match markets'],
  ['Tennis', '#a8873c', 'By tournament'],
  ['Basketball', '#b8391f', 'Fast live play'],
  ['Esports', '#0b82e0', 'Titles & formats'],
];

const RAIL: RailItem[] = [
  { id: 'markets', label: 'Markets', meta: '6' },
  { id: 'by-sport', label: 'By sport', meta: '5' },
  { id: 'live', label: 'Live betting' },
  { id: 'odds', label: 'Odds' },
  { id: 'india', label: 'India' },
  { id: 'mobile', label: 'Mobile app' },
  { id: 'events', label: 'Upcoming events' },
  { id: 'why', label: 'Why 1xBet' },
  { id: 'responsible', label: 'Responsible use' },
  { id: 'faq', label: 'FAQ', meta: '11' },
];

const REVIEW_CHECKLIST = [
  'Sport and competition',
  'Teams or participants',
  'Event date and status',
  'Available betting markets',
  'Current sports betting odds',
  'Live betting availability',
  'Applicable terms and restrictions',
];

const WHY: [string, string][] = [
  ['Multiple sports', 'Explore available cricket, football, tennis, basketball, esports and other supported sports.'],
  ['Pre-match markets', 'Browse upcoming events and review the markets available before an event begins.'],
  ['Live sports betting', 'Where supported, follow selected events through available live markets.'],
  ['Current odds', 'Review the latest sports betting odds displayed for available markets.'],
  ['Mobile access', 'Use supported mobile options to browse events and manage your account.'],
  ['One account', 'Registered users can access supported sports and account features through their existing account.'],
];

const RESPONSIBLE: string[] = [
  'Sports betting involves financial risk. Sporting outcomes are uncertain, and losses can occur.',
  'Only participate if you are legally permitted to use the service and meet the applicable age and eligibility requirements in your location.',
  'Set a personal budget before participating and avoid using money needed for everyday expenses. Do not chase losses or increase your spending because of a previous result.',
  'Live betting can move particularly quickly, so take time to consider your decisions rather than reacting to every change during an event.',
  'If betting begins affecting your finances, work, relationships or everyday responsibilities, consider taking a break and seeking appropriate support.',
];

const FAQS: [string, string][] = [
  ['What is online sports betting?', 'Online sports betting refers to placing bets on available sporting events through an online platform. Available sports, markets and services can vary by location.'],
  ['Is sports betting available in India?', "Sports betting India availability depends on the user's location, applicable laws, platform coverage and eligibility requirements. Users should confirm that the service is permitted in their jurisdiction before participating."],
  ['What is live sports betting?', 'Live sports betting refers to markets that are available while a sporting event is in progress. Live markets and odds can change as the event develops.'],
  ['What is live betting online?', 'Live betting online allows users to view selected markets during an ongoing sporting event. Availability depends on the event and location.'],
  ['What are sports betting odds?', 'Sports betting odds are the prices displayed for available betting markets. They can change before an event and during live betting.'],
  ['Can live betting odds change?', 'Yes. Live betting odds can change as an event develops and new information becomes available. Users should always check the current information displayed on the platform.'],
  ['What sports are available for betting?', 'The available selection can include sports such as football betting, cricket betting, tennis betting, basketball betting and esports betting, depending on current platform coverage and location.'],
  ['Is there a sports betting app?', 'Where supported, users can access available sports markets through the sports betting app or mobile website options. Application availability can depend on device and location.'],
  ['What is online betting India?', 'Online betting India is a search term used for online betting services available to users in India. Availability depends on applicable laws, location, platform coverage and eligibility.'],
  ['Are sports betting outcomes guaranteed?', 'No. Sporting events have uncertain outcomes. Odds and markets do not guarantee a particular result.'],
  ['Can sports betting markets change?', 'Yes. Markets can change depending on the event, timing, match conditions and platform availability. Live markets can change particularly quickly.'],
];

/* ---------------------------------------------------------------------------
   Block: the page's one repeating unit. A rule across the top with the section
   name sitting on it, then content. Deliberately not the homepage pattern of
   label + oversized uppercase heading + underline.
   ------------------------------------------------------------------------- */
function Block({
  id,
  n,
  kicker,
  title,
  children,
}: {
  id: string;
  n: string;
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      {/* Filled header bar. Replaces the hairline heading — this is where the
          section gets its colour and hard edge. */}
      <div className="g-head">
        <span className="g-num">{n}</span>
        <span className="min-w-0">
          <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-brand-200">
            {kicker}
          </span>
          <h2 className="truncate text-[clamp(1.05rem,2vw,1.4rem)] font-extrabold tracking-[-0.02em] text-white">
            {title}
          </h2>
        </span>
      </div>

      <div className="g-card rounded-t-none border-t-0 p-5 sm:p-7">{children}</div>
    </section>
  );
}

/** List row with a filled numeral chip — weightier than a hairline list item. */
function Row({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3.5 rounded-[7px] border-2 border-line bg-canvas px-4 py-3
                   transition-colors hover:border-brand-500/50 hover:bg-brand-50/60">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[5px] bg-navy-700
                       font-mono text-[12px] font-bold text-white">
        {String(n).padStart(2, '0')}
      </span>
      <span className="text-[15px] font-medium leading-snug text-fg">{children}</span>
    </li>
  );
}

export default function SportsPage() {
  const { openAuth } = useSite();
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = heroRef.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('[data-s="k"]', { opacity: 0, x: -12, duration: 0.45 })
        .from('[data-s="h"]', { opacity: 0, y: 22, duration: 0.65 }, '-=0.2')
        .from('[data-s="p"]', { opacity: 0, y: 14, duration: 0.55, stagger: 0.07 }, '-=0.35')
        .from('[data-s="c"] > *', { opacity: 0, y: 12, duration: 0.45, stagger: 0.06 }, '-=0.3')
        .from('[data-s="pill"]', { opacity: 0, y: 8, duration: 0.35, stagger: 0.03 }, '-=0.25');
    }, el);
    return () => ctx.revert();
  }, []);

  const faqEntries: AccordionEntry[] = FAQS.map(([q, a], i) => ({
    id: `sfaq-${i}`,
    question: q,
    answer: <p>{a}</p>,
  }));

  return (
    <main className="flex-1 overflow-x-clip">

      {/* ===================== Masthead =====================
          Short by design. A sportsbook puts the coupon near the top; a
          viewport-filling hero would push all the content below the fold. */}
      <section
        ref={heroRef}
        className="relative overflow-hidden border-b border-line bg-canvas"
        aria-labelledby="sports-title"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-45deg, rgba(0,122,204,0.06) 0 12px, transparent 12px 24px)',
            maskImage: 'linear-gradient(to bottom, #000 0%, transparent 78%)',
          }}
        />

        <div className="relative mx-auto w-full max-w-[1600px] px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-14">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <div data-s="k" className="flex items-center gap-2.5">
                <span className="badge-live">Live</span>
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-600">
                  Online Sports Betting
                </span>
              </div>

              <h1
                id="sports-title"
                data-s="h"
                className="mt-4 max-w-[18ch] text-[clamp(2.1rem,5vw,3.6rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-fg"
              >
                Online sports betting on <span className="text-brand-600">1xBet</span>
              </h1>

              <p data-s="p" className="mt-5 max-w-2xl text-[17px] leading-relaxed text-fg-muted">
                Explore online sports betting on 1xBet and browse available sporting events,
                markets and betting options from one platform. From cricket and football to
                tennis, basketball and esports, the sports section brings different
                competitions together so users can find available events and review the
                markets offered for each match.
              </p>

              <p data-s="p" className="mt-3 max-w-2xl text-[16px] leading-relaxed text-fg-muted">
                Users looking for sports betting India can check the sports and markets
                available for their location, while those who prefer mobile access can explore
                the supported sports betting app and other mobile options.
              </p>

              <div data-s="c" className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href="#markets"
                  className="group inline-flex min-h-[54px] items-center gap-2.5 rounded-[7px] bg-brand-500 px-8
                             text-[16px] font-extrabold text-white shadow-[0_10px_26px_rgba(0,122,204,0.34)]
                             transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-[0_14px_32px_rgba(0,122,204,0.42)]
                             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                >
                  Explore Sports
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                </Link>
                <Link
                  href="#live"
                  className="inline-flex min-h-[54px] items-center gap-2.5 rounded-[7px] border-2 border-navy-700 bg-canvas px-8
                             text-[16px] font-extrabold text-navy-700 transition-all hover:-translate-y-0.5
                             hover:bg-navy-700 hover:text-white
                             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                >
                  Live Betting
                </Link>
              </div>
            </div>

            {/* Availability sits as a stamped notice, not a card */}
            <aside className="lg:col-span-4">
              <div className="g-card border-l-[5px] border-l-brand-500 p-5">
                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-fg-dim">
                  Before you start
                </span>
                <p className="mt-3 text-[15px] leading-relaxed text-fg">
                  Sports, events, markets and services can vary depending on location and
                  platform availability. Always review the information shown for an event and
                  check the applicable terms before participating.
                </p>
              </div>
            </aside>
          </div>

          {/* Sport tiles — solid colour blocks, the loudest element on a white hero */}
          <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {SPORT_COLOURS.map(([name, colour, note]) => (
              <a
                key={name}
                href="#by-sport"
                data-s="pill"
                className="g-card g-card-hover group flex items-center gap-3 p-3"
              >
                <span className="sport-chip shrink-0" style={{ background: colour }}>
                  <span className="font-display text-[17px] font-extrabold">{name[0]}</span>
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[15px] font-extrabold tracking-[-0.01em] text-fg">
                    {name}
                  </span>
                  <span className="block truncate text-[12px] font-medium text-fg-dim">{note}</span>
                </span>
              </a>
            ))}
          </div>

          <p className="mt-4 text-[13px] font-medium text-fg-dim">
            Also available: other supported sports and competitions.
          </p>
        </div>
      </section>

      {/* ===================== Section nav + content =====================
           Single full-width column. The previous two-column shell left an empty
           232px strip down the left of the whole page. */}
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <SportsRail items={RAIL} />

        <div className="py-12 lg:py-16">
          <div className="min-w-0 space-y-14 lg:space-y-16">

            {/* ---------- Markets ---------- */}
            <Block id="markets" n="01" kicker="Explore markets" title="Different Sports, One Platform">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                <div className="space-y-4 text-[16px] leading-relaxed text-fg-muted">
                  <p className="text-[17px] font-medium text-fg">
                    Sports betting covers a wide range of competitions and events. On 1xBet,
                    users can browse available sports and explore the markets offered for
                    individual events.
                  </p>
                  <p>
                    Each sport can have different markets depending on the event, competition
                    and match format.
                  </p>
                  <p>
                    For example, the markets available for a cricket match may differ from
                    those offered for a football or tennis event. Always check the individual
                    event page for the current options.
                  </p>
                  <Link
                    href="/lobby"
                    className="group inline-flex min-h-[44px] items-center gap-2 text-[15px] font-bold text-fg
                               transition-colors hover:text-brand-600
                               focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                  >
                    View All Sports
                    <ArrowRight className="h-4 w-4 text-brand-600 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                  </Link>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-fg-dim">
                    The available selection may include
                  </span>
                  <ul className="mt-3 space-y-2">
                    {SPORT_LIST.map((s, i) => (
                      <Row key={s} n={i + 1}>{s}</Row>
                    ))}
                  </ul>
                </div>
              </div>
            </Block>

            {/* ---------- By sport ---------- */}
            <Block id="by-sport" n="02" kicker="By competition" title="Browse by sport">
              <SportBrowser />
            </Block>

            {/* ---------- Live ---------- */}
            <Block id="live" n="03" kicker="Live sports betting" title="Follow Events as They Happen">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
                <div className="space-y-4 text-[16px] leading-relaxed text-fg-muted lg:col-span-2">
                  <p className="text-[17px] font-medium text-fg">
                    Live sports betting allows users to explore selected markets while an event
                    is already in progress.
                  </p>
                  <p>
                    Live events can change quickly. A goal in football, a wicket in cricket, a
                    change in momentum during a tennis match or a scoring run in basketball can
                    affect the markets and odds displayed on the platform.
                  </p>
                  <p>
                    For this reason, live betting online requires users to pay attention to the
                    current event information. Markets and prices can change while an event is
                    taking place, and an option that was previously available may no longer be
                    offered.
                  </p>
                  <p>
                    Live sports betting is not available for every event or location. The
                    platform displays live markets where they are supported.
                  </p>
                  <Link
                    href="/lobby"
                    className="group inline-flex min-h-[44px] items-center gap-2 text-[15px] font-bold text-fg
                               transition-colors hover:text-brand-600
                               focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                  >
                    Explore Live Betting
                    <ArrowRight className="h-4 w-4 text-brand-600 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                  </Link>
                </div>

                <div className="border-l-2 border-brand-500 pl-4">
                  <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-fg-dim">
                    <Radio className="h-3.5 w-3.5 text-brand-600" aria-hidden />
                    What moves a market
                  </span>
                  <ul className="mt-3">
                    {['A goal', 'A wicket', 'A point or set', 'An injury', 'A scoring run'].map((t) => (
                      <li key={t} className="border-b border-line py-2 text-[15px] text-fg last:border-b-0">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-[13px] text-fg-dim">
                    Markets may close or change without notice.
                  </p>
                </div>
              </div>
            </Block>

            {/* ---------- Odds ---------- */}
            <Block id="odds" n="04" kicker="Sports betting odds" title="Check the Current Odds">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
                <div className="space-y-4 text-[16px] leading-relaxed text-fg-muted lg:col-span-2">
                  <p className="text-[17px] font-medium text-fg">
                    Sports betting odds show the prices displayed for available betting markets.
                  </p>
                  <p>
                    Odds can change before an event and may move more frequently during live
                    betting as new information becomes available.
                  </p>
                  <p>
                    For example, an injury, goal, wicket, set result or other event can affect
                    the markets and live betting odds shown during a match.
                  </p>
                  <p>
                    Users should always check the current odds displayed on the platform rather
                    than relying on information from an earlier time or another source.
                  </p>
                  <p className="border-l-2 border-fg pl-4 font-medium text-fg">
                    Odds do not guarantee a particular result. Sporting events are uncertain,
                    and users should understand the financial risks involved before
                    participating.
                  </p>
                </div>

                <div className="border-l-2 border-brand-500 pl-4">
                  <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-fg-dim">
                    <TrendingUp className="h-3.5 w-3.5 text-brand-600" aria-hidden />
                    When a price can move
                  </span>
                  <dl className="mt-3">
                    {[
                      ['Opening', 'Set before the event'],
                      ['Updated', 'Team or player news'],
                      ['In-play', 'After a goal or wicket'],
                    ].map(([stage, cause]) => (
                      <div key={stage} className="border-b border-line py-2.5 last:border-b-0">
                        <dt className="text-[15px] font-bold text-fg">{stage}</dt>
                        <dd className="text-[13px] text-fg-dim">{cause}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-3 text-[13px] leading-snug text-fg-dim">
                    Illustration of when prices move. Not a live market and not a price feed.
                  </p>
                </div>
              </div>
            </Block>

            {/* ---------- India ---------- */}
            <Block id="india" n="05" kicker="Availability" title="Sports Betting for Users in India">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
                <div>
                  <h3 className="text-[15px] font-bold uppercase tracking-[0.06em] text-fg">
                    Sports Betting India
                  </h3>
                  <div className="mt-3 space-y-3 text-[16px] leading-relaxed text-fg-muted">
                    <p>
                      Sports betting India availability depends on location, applicable
                      regulations, platform coverage and user eligibility.
                    </p>
                    <p>
                      Users in India should confirm that using the service is permitted in their
                      location and that they meet all relevant age and eligibility requirements
                      before participating.
                    </p>
                    <p>
                      Where services are available, users can browse supported sports and
                      competitions and review the markets offered for individual events.
                    </p>
                    <p>
                      The available sports and markets may change, so users should always refer
                      to the current information shown on the platform.
                    </p>
                  </div>
                </div>

                <div className="md:border-l md:border-line md:pl-12">
                  <h3 className="text-[15px] font-bold uppercase tracking-[0.06em] text-fg">
                    Online Betting India
                  </h3>
                  <div className="mt-3 space-y-3 text-[16px] leading-relaxed text-fg-muted">
                    <p>
                      Users searching for online betting India options should first check
                      whether the relevant service is available and permitted in their location.
                    </p>
                    <p>
                      The sports section can provide access to available events across supported
                      categories, with the exact selection depending on platform coverage and
                      regional requirements.
                    </p>
                    <p>
                      Before participating, review the applicable terms and confirm that you are
                      eligible to use the service.
                    </p>
                  </div>
                </div>
              </div>
            </Block>

            {/* ---------- Mobile ---------- */}
            <Block id="mobile" n="06" kicker="Sports betting app" title="Sports Betting on Mobile">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
                <div className="space-y-4 text-[16px] leading-relaxed text-fg-muted lg:col-span-2">
                  <p className="text-[17px] font-medium text-fg">
                    The sports betting app provides a mobile-focused way to access supported
                    sports markets from compatible devices.
                  </p>
                  <p>
                    Registered users may be able to browse available events, review markets and
                    access their account through supported mobile options.
                  </p>
                  <p>
                    The available application and its features can depend on your device,
                    operating system and location.
                  </p>
                  <p>
                    If you&rsquo;re looking for mobile access, use the official 1xBet platform
                    to check the current app availability and installation requirements.
                  </p>
                </div>

                <div className="flex items-start">
                  <Link
                    href="/app"
                    className="group inline-flex min-h-[48px] w-full items-center justify-between gap-2 rounded-[4px]
                               border-2 border-fg px-5 text-[15px] font-bold text-fg transition-colors
                               hover:bg-fg hover:text-canvas
                               focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                  >
                    Explore the Sports Betting App
                    <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                  </Link>
                </div>
              </div>
            </Block>

            {/* ---------- Upcoming events ---------- */}
            <Block id="events" n="07" kicker="Find upcoming events" title="Browse Available Matches and Competitions">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                <div className="space-y-4 text-[16px] leading-relaxed text-fg-muted">
                  <p className="text-[17px] font-medium text-fg">
                    The sports section helps users find available upcoming events and review the
                    markets offered for each one.
                  </p>
                  <p>
                    Depending on current platform coverage, users may find events from different
                    sports and competitions.
                  </p>
                  <p>
                    Event information, markets and odds can change, so always use the current
                    details displayed on the platform.
                  </p>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-fg-dim">
                    Before participating, review
                  </span>
                  <ul className="mt-3 space-y-2">
                    {REVIEW_CHECKLIST.map((item, i) => (
                      <Row key={item} n={i + 1}>{item}</Row>
                    ))}
                  </ul>
                </div>
              </div>
            </Block>

            {/* ---------- Live betting online ---------- */}
            <Block id="live-online" n="08" kicker="Live betting online" title="Markets That Can Change During an Event">
              <div className="max-w-3xl space-y-4 text-[16px] leading-relaxed text-fg-muted">
                <p className="text-[17px] font-medium text-fg">
                  Live betting online provides access to selected markets while sporting events
                  are taking place.
                </p>
                <p>
                  Because live events develop continuously, markets can change quickly. A goal,
                  wicket, point, set, injury or other event may affect the options available.
                </p>
                <p>
                  The live betting odds displayed on the platform can also change as the event
                  progresses.
                </p>
                <p>
                  Users should review the latest information before participating and understand
                  that markets may close or change without notice.
                </p>
                <p>Live betting availability depends on the event and location.</p>
              </div>
            </Block>

            {/* ---------- Why ---------- */}
            <Block id="why" n="09" kicker="Why use 1xBet" title="A Dedicated Sports Experience">
              <p className="max-w-2xl text-[17px] font-medium text-fg">
                1xBet brings available sports, events and markets together within one platform.
              </p>

              {/* Definition list, not a card grid — term left, description right */}
              <dl className="mt-6 border-t border-line">
                {WHY.map(([term, desc]) => (
                  <div
                    key={term}
                    className="grid grid-cols-1 gap-1 border-b border-line py-4 sm:grid-cols-[220px_1fr] sm:gap-8"
                  >
                    <dt className="text-[15px] font-bold tracking-[-0.01em] text-fg">{term}</dt>
                    <dd className="text-[15px] leading-relaxed text-fg-muted">{desc}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-5 text-[15px] leading-relaxed text-fg-muted">
                The exact sports, competitions, markets and features available can vary by
                location and platform coverage.
              </p>
            </Block>

            {/* ---------- Responsible ---------- */}
            <Block id="responsible" n="10" kicker="Responsible use" title="Keep Your Betting Within Your Limits">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
                <ul className="space-y-2 lg:col-span-2">
                  {RESPONSIBLE.map((text, i) => (
                    <Row key={i} n={i + 1}>{text}</Row>
                  ))}
                </ul>

                <div className="border-l-2 border-fg pl-4">
                  <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-fg-dim">
                    <AlertTriangle className="h-3.5 w-3.5 text-brand-600" aria-hidden />
                    Before you use the service
                  </span>
                  <p className="mt-3 text-[15px] font-medium leading-relaxed text-fg">
                    Always review the applicable terms and local requirements before using the
                    service.
                  </p>
                  <Link
                    href="/responsible-gaming"
                    className="group mt-4 inline-flex min-h-[44px] items-center gap-2 text-[15px] font-bold text-fg
                               transition-colors hover:text-brand-600
                               focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                  >
                    Player safety tools
                    <ArrowRight className="h-4 w-4 text-brand-600 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                  </Link>
                </div>
              </div>
            </Block>

            {/* ---------- FAQ ---------- */}
            <Block id="faq" n="11" kicker="Frequently asked" title="Sports betting, answered">
              <Accordion items={faqEntries} />
            </Block>

            {/* ---------- Closing ---------- */}
            <section className="border-t-2 border-fg pt-8">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                <div>
                  <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-fg">
                    Explore Online Sports Betting on 1xBet
                  </h2>
                  <p className="mt-4 text-[16px] leading-relaxed text-fg-muted">
                    From online sports betting and sports betting India to live sports betting,
                    1xBet provides access to available sports and markets through one platform.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={openAuth}
                      className="inline-flex min-h-[48px] cursor-pointer items-center rounded-[4px] bg-brand-500 px-7
                                 text-[15px] font-bold text-white transition-colors hover:bg-brand-600
                                 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                    >
                      Register
                    </button>
                    <Link
                      href="/lobby"
                      className="inline-flex min-h-[48px] items-center rounded-[4px] border-2 border-fg px-7
                                 text-[15px] font-bold text-fg transition-colors hover:bg-fg hover:text-canvas
                                 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                    >
                      Explore Sports
                    </Link>
                  </div>
                </div>

                <div className="space-y-4 text-[15px] leading-relaxed text-fg-muted">
                  <p>
                    Browse football betting, cricket betting, tennis betting, basketball betting
                    and esports betting where supported. Review available sports betting odds,
                    explore selected live events and check live betting odds as matches progress.
                  </p>
                  <p>
                    Mobile users can also check the availability of the sports betting app and
                    other supported mobile options.
                  </p>
                  <p className="border-t border-line pt-4 text-[13px] text-fg-dim">
                    Sports, competitions, markets and services can vary according to location and
                    applicable regulations. Always check the latest information provided on the
                    platform, review the relevant terms and participate responsibly.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
