'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Radio, Smartphone, Globe2, Trophy, LineChart,
  UserRound, ClipboardList, Activity, CalendarDays,
} from 'lucide-react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { Accordion, AccordionEntry } from '@/components/ui/Accordion';
import { useReveal } from '@/hooks/useReveal';
import { Rail } from '@/components/ui/Rail';
import { FormationPitch } from '@/components/soccer/FormationPitch';

const MATCH_CHECKS = [
  'Teams and competition',
  'Match date and time',
  'Event status',
  'Available soccer betting markets',
  'Current soccer betting odds',
  'Live market availability',
  'Applicable terms and restrictions',
];

const APPROACH: { t: string; b: string; icon: React.ElementType }[] = [
  { t: 'Competition', icon: Trophy,
    b: 'Identify the league, tournament or competition associated with the fixture.' },
  { t: 'Teams', icon: UserRound,
    b: 'Confirm the teams involved and the match details displayed.' },
  { t: 'Event status', icon: Activity,
    b: 'Check whether the match is upcoming, live or otherwise unavailable.' },
  { t: 'Available markets', icon: ClipboardList,
    b: 'Review the specific soccer betting markets offered for that fixture.' },
  { t: 'Current odds', icon: LineChart,
    b: 'Use the latest soccer odds displayed on the platform.' },
  { t: 'Live availability', icon: Radio,
    b: 'If the match is underway, check whether live markets are currently supported.' },
];

const WHY: { t: string; b: string; icon: React.ElementType }[] = [
  { t: 'Soccer-focused markets', icon: Trophy,
    b: 'Browse available markets directly from individual soccer events.' },
  { t: 'Pre-match access', icon: CalendarDays,
    b: 'Review upcoming fixtures and available markets before a match begins.' },
  { t: 'Live soccer', icon: Radio,
    b: 'Where supported, follow selected matches through available live markets.' },
  { t: 'Current odds', icon: LineChart,
    b: 'Check the latest soccer betting odds displayed for available markets.' },
  { t: 'Mobile access', icon: Smartphone,
    b: 'Use supported mobile options to browse soccer events and access your account.' },
  { t: 'Multiple competitions', icon: Globe2,
    b: 'Explore available fixtures from different supported soccer competitions.' },
];

const RESPONSIBLE = [
  'Soccer betting involves financial risk. No market or result guarantees a particular outcome, and losses can occur.',
  'Only participate where you are legally permitted to do so and where you meet the applicable age and eligibility requirements.',
  'Set a personal budget before participating and avoid using money required for everyday expenses.',
  'Do not chase losses or increase spending because a previous match did not produce the expected result.',
  'Live soccer can move particularly quickly, so avoid making decisions simply because the odds have changed during a match.',
  'If betting begins affecting your finances, relationships, work or everyday responsibilities, consider taking a break and seeking appropriate support.',
  'Always review the applicable terms, restrictions and local requirements before using the service.',
];

const FAQS: [string, string][] = [
  ['What is soccer betting?', 'Soccer betting refers to available betting markets associated with soccer matches and competitions. The markets offered can vary depending on the fixture, competition and location.'],
  ['Is soccer betting available in India?', 'Soccer betting India availability depends on the user’s location, applicable regulations, platform coverage and eligibility. Users should confirm that the relevant service is permitted in their jurisdiction before participating.'],
  ['What is online soccer betting?', 'Online soccer betting refers to accessing available soccer markets through an online platform. Available matches, markets and services can vary by location.'],
  ['What is live soccer betting?', 'Live soccer betting refers to selected markets available while a soccer match is in progress. Live markets and odds can change as the match develops.'],
  ['What are soccer betting odds?', 'Soccer betting odds are the prices displayed for available soccer markets. They can change before a match and during live betting.'],
  ['Can live soccer odds change?', 'Yes. Live soccer odds can change as a match develops and new information becomes available. Users should always check the current information displayed for the event.'],
  ['What are soccer betting markets?', 'Soccer betting markets are the different options available for a particular soccer match. The markets can differ depending on the competition, fixture and event status.'],
  ['What is soccer match betting?', 'Soccer match betting refers to available markets associated with an individual soccer fixture.'],
  ['Is there a soccer betting app?', 'Where supported, users can access available soccer markets through the soccer betting app or compatible mobile website options.'],
  ['Can I access soccer betting online?', 'Where available and permitted in your location, users can browse online soccer betting markets through supported desktop and mobile platforms.'],
  ['Can soccer betting markets change?', 'Yes. Markets can change depending on the event, timing, match conditions and platform availability. Live markets can change particularly quickly.'],
  ['Are soccer betting outcomes guaranteed?', 'No. Soccer matches have uncertain outcomes. Odds and markets do not guarantee a particular result.'],
];

/* ---------------------------------------------------------------- shells -- */

/**
 * Section shell.
 *
 * The head alternates sides down the page — every other page on this site
 * anchors its head top-left, so the mirrored rhythm is what makes soccer read
 * differently from football at a glance. On phones it always stacks left.
 */
function Sec({
  id, n, kicker, title, side = 'left', tone = 'plain', children,
}: {
  id?: string; n: number; kicker: string; title: string;
  side?: 'left' | 'right'; tone?: 'plain' | 'pitch' | 'night';
  children: React.ReactNode;
}) {
  const ref = useReveal<HTMLElement>({ selector: '[data-rv]', stagger: 0.05, y: 16 });

  const ground =
    tone === 'night' ? 'sc-night sc-on-dark border-transparent'
    : tone === 'pitch' ? 'sc-stripes bg-surface-1 border-line'
    : 'bg-canvas border-line';

  const right = side === 'right';

  return (
    <section
      id={id}
      ref={ref}
      className={`relative scroll-mt-[68px] md:scroll-mt-[118px] overflow-hidden border-t py-10 sm:py-12 lg:py-15 ${ground}`}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <div
          data-rv
          className={`flex items-center gap-4 sm:gap-5 ${right ? 'lg:flex-row-reverse lg:text-right' : ''}`}
        >
          <span className={`sc-hex ${right ? 'sc-hex-fill' : ''}`}>{String(n).padStart(2, '0')}</span>
          <span className="min-w-0">
            <span className="block text-[11px] font-extrabold uppercase tracking-[0.2em] text-sc-pitch">
              {kicker}
            </span>
            <h2 className="mt-2 text-[clamp(1.7rem,4.2vw,2.9rem)] font-extrabold leading-[1.05] tracking-[-0.042em] text-fg">
              {title}
            </h2>
          </span>
        </div>

        <div data-rv className="mt-7">{children}</div>
      </div>
    </section>
  );
}

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">{children}</p>
);

const Lead = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[17px] font-semibold leading-relaxed text-fg sm:text-[18px]">{children}</p>
);

function Cta({
  href, children, solid = false,
}: { href: string; children: React.ReactNode; solid?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-[3px] px-4 text-[14px] font-extrabold
                  transition-all hover:-translate-y-0.5 sm:px-6 sm:text-[15px]
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sc-pitch ${
        solid
          ? 'sc-cta-solid bg-sc-pitch shadow-[0_10px_26px_rgba(26,107,60,0.28)] hover:brightness-110'
          : 'border-2 border-line-strong bg-canvas text-fg hover:border-sc-pitch hover:bg-surface-1'
      }`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}

/* ------------------------------------------------------------------ page -- */

export default function SoccerPage() {
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = heroRef.current;
    if (!el || prefersReducedMotion()) return;
    if (document.visibilityState === 'hidden') return;

    // `gsap.from` writes opacity:0 inline the moment the tween exists, so a
    // timeline that never finishes leaves these invisible for good. Clearing on
    // every exit path makes that state unreachable.
    const HIDDEN = '[data-o="k"],[data-o="h"],[data-o="p"],[data-o="cta"] > *,[data-o="pitch"]';
    const reveal = () => {
      el.querySelectorAll<HTMLElement>(HIDDEN).forEach((n) => {
        n.style.opacity = '';
        n.style.transform = '';
      });
    };

    const ctx = gsap.context(() => {
      gsap.timeline({
        defaults: { ease: 'power3.out' },
        onComplete: reveal,
        onInterrupt: reveal,
      })
        .from('[data-o="k"]', { opacity: 0, x: -12, duration: 0.45 })
        .from('[data-o="h"]', { opacity: 0, y: 24, duration: 0.7 }, '-=0.2')
        .from('[data-o="p"]', { opacity: 0, y: 14, duration: 0.5, stagger: 0.07 }, '-=0.35')
        .from('[data-o="cta"] > *', { opacity: 0, y: 12, duration: 0.45, stagger: 0.06 }, '-=0.3')
        .from('[data-o="pitch"]', { opacity: 0, scale: 0.95, duration: 0.7 }, '-=0.45');
    }, el);

    const watchdog = window.setTimeout(reveal, 4000);
    return () => {
      window.clearTimeout(watchdog);
      ctx.revert();
      reveal();
    };
  }, []);

  const faqEntries: AccordionEntry[] = FAQS.map(([q, a], i) => ({
    id: `sc-${i}`, question: q, answer: <p>{a}</p>,
  }));

  return (
    <main className="flex-1 overflow-x-clip">

      {/* ========================= Hero ========================= */}
      <section
        ref={heroRef}
        data-hero
        className="sc-night sc-on-dark relative overflow-hidden"
        aria-labelledby="soccer-title"
      >
        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 pt-9 pb-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
          <div className="grid grid-cols-1 items-center gap-9 lg:grid-cols-12 lg:gap-12">

            <div className="flex flex-col lg:col-span-7">
              <div data-o="k" className="flex items-center gap-3">
                <span className="sc-hex sc-hex-fill h-11 w-10 text-[13px]">90</span>
                <span className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-sc-lime">
                  Soccer Betting
                </span>
              </div>

              <h1
                id="soccer-title"
                data-o="h"
                className="mt-5 text-[clamp(2.2rem,5.6vw,4.2rem)] font-extrabold leading-[1] tracking-[-0.048em] text-fg"
              >
                Soccer Betting on{' '}
                <span className="text-sc-lime [text-shadow:0_0_26px_rgba(182,227,75,0.35)]">1xBet</span>
              </h1>

              <p data-o="p" className="mt-5 max-w-[62ch] text-[16px] leading-relaxed text-fg sm:text-[18px]">
                Soccer brings together changing tactics, momentum and match situations that can
                develop from one minute to the next. The soccer betting section on 1xBet gives users
                a dedicated place to browse available soccer matches, review event information and
                explore the markets offered for individual fixtures.
              </p>

              <div className="hero-spill">
                <p data-o="p" className="mt-4 max-w-[66ch] text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">
                  Users can check upcoming matches, explore soccer betting markets, review current
                  soccer betting odds and access selected live events where supported.
                </p>

                <p data-o="p" className="mt-4 max-w-[66ch] text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">
                  For users searching for soccer betting India, online soccer betting or mobile
                  access, availability can depend on the event, location, platform coverage and
                  applicable regulations.
                </p>

                <p data-o="p" className="mt-4 max-w-[66ch] text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">
                  Always check the current match information, available markets and relevant terms
                  before participating.
                </p>
              </div>

              <div data-o="cta" className="mt-7 grid grid-cols-2 gap-2.5 sm:mt-8 sm:flex sm:flex-wrap sm:gap-3">
                <Cta href="#markets" solid>Explore Soccer Betting</Cta>
                <Cta href="#live">View Available Matches</Cta>
              </div>
            </div>

            <div data-o="pitch" className="lg:col-span-5">
              <div className="mx-auto w-full max-w-[340px] lg:max-w-none">
                <FormationPitch />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================== Markets ======================= */}
      <Sec id="markets" n={2} kicker="Explore Soccer Betting Markets" title="Markets Built Around the Match" tone="pitch">
        <div className="max-w-4xl space-y-4">
          <Lead>
            Different soccer matches can have different betting markets depending on the
            competition, teams, event stage and match status.
          </Lead>
          <P>
            The soccer betting markets available for one fixture may not be the same as those
            offered for another. Users can open an individual match to review the available options
            and current soccer odds.
          </P>
          <P>
            Markets can also change as a match approaches and, where live markets are supported,
            while the game is underway.
          </P>
          <P>
            The individual event page should always be used to check the latest available markets
            rather than relying on previously viewed information.
          </P>
          <div className="pt-1">
            <Cta href="#odds">Explore Soccer Markets</Cta>
          </div>
        </div>
      </Sec>

      {/* ========================= Odds ========================= */}
      <Sec id="odds" n={3} kicker="Soccer Betting Odds" title="Check the Current Soccer Odds" side="right">
        <div className="max-w-4xl space-y-4 lg:ml-auto lg:text-right">
          <Lead>Soccer betting odds show the prices displayed for available soccer markets.</Lead>
          <P>
            Odds can change before a match as new information becomes available. During live play,
            events such as goals, penalties, cards, substitutions or changes in match momentum can
            also affect the markets and live soccer odds.
          </P>
          <P>
            Previously viewed odds may no longer be available, so users should always check the
            current event page before making a decision.
          </P>
          <P>
            Soccer odds do not guarantee an outcome. Every match has an uncertain result, and users
            should understand the financial risks involved before participating.
          </P>
        </div>
      </Sec>

      {/* ======================= Live soccer ==================== */}
      <Sec id="live" n={4} kicker="Live Soccer Betting" title="Follow the Match as It Happens" tone="night">
        <div className="max-w-4xl space-y-4">
          <Lead>
            Live soccer betting allows users to explore selected markets while a soccer match is
            already in progress.
          </Lead>
          <P>
            Soccer can change quickly. A goal, red card, penalty or tactical change can alter the
            direction of a match and affect the markets displayed during live play.
          </P>
          <P>
            Where supported, users can follow the event and review the live soccer odds currently
            shown on the platform.
          </P>
          <P>
            Live markets can change, suspend or close as the match develops. Always check the latest
            information displayed for the event.
          </P>
          <P>Live soccer betting may not be available for every match or in every location.</P>
          <div className="pt-1">
            <Cta href="#app" solid>Explore Live Soccer Betting</Cta>
          </div>
        </div>
      </Sec>

      {/* ===================== Match betting ==================== */}
      <Sec n={5} kicker="Soccer Match Betting" title="Review the Fixture Before You Decide" side="right">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <ul className="sc-card divide-y divide-line">
              {MATCH_CHECKS.map((item, i) => (
                <li key={item} className="flex items-center gap-4 px-4 py-3">
                  <span className="font-mono text-[11px] font-bold text-sc-pitch">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[14px] font-semibold text-fg sm:text-[15px]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4 lg:col-span-5">
            <Lead>
              Soccer match betting gives users access to available markets associated with individual
              soccer fixtures.
            </Lead>
            <P>Before participating, review:</P>
            <P>
              Different fixtures can have different markets. An option available for one match should
              not automatically be assumed to be available for another.
            </P>
            <P>
              The individual match page provides the most relevant information about the event and
              its current markets.
            </P>
          </div>
        </div>
      </Sec>

      {/* ========================= India ======================== */}
      <Sec n={6} kicker="Soccer Betting India" title="Check Availability for Your Location" tone="pitch">
        <div className="max-w-4xl space-y-4">
          <Lead>
            Soccer has a large following in India, alongside interest in international leagues and
            competitions.
          </Lead>
          <P>
            For users searching for soccer betting India, availability depends on the user&rsquo;s
            location, applicable regulations, platform coverage and eligibility requirements.
          </P>
          <P>
            Users should confirm that the relevant service is permitted in their jurisdiction before
            participating and meet all applicable age and eligibility requirements.
          </P>
          <P>
            Where soccer markets are available, users can browse supported fixtures, review available
            markets and check the current odds displayed for individual events.
          </P>
          <P>
            Competition and market availability can change, so always refer to the latest information
            provided on the platform.
          </P>
          <div className="pt-1">
            <Cta href="#markets">Check Available Soccer Markets</Cta>
          </div>
        </div>
      </Sec>

      {/* ========================= Online ======================= */}
      <Sec n={7} kicker="Online Soccer Betting" title="Browse Soccer Markets Online" side="right">
        <div className="max-w-4xl space-y-4 lg:ml-auto lg:text-right">
          <Lead>
            Online soccer betting provides access to available soccer events through an online
            platform.
          </Lead>
          <P>
            Users can browse upcoming fixtures, review event information, explore soccer betting
            markets and check the current odds displayed for individual matches.
          </P>
          <P>The available selection can vary according to competition, platform coverage and location.</P>
          <P>
            If you&rsquo;re looking for soccer betting online, use the official platform and check
            whether the match or competition you&rsquo;re interested in is currently available.
          </P>
          <div className="pt-1 lg:flex lg:justify-end">
            <Cta href="#app">Explore Soccer Online</Cta>
          </div>
        </div>
      </Sec>

      {/* ========================== App ========================= */}
      <Sec id="app" n={8} kicker="Soccer Betting App" title="Access Soccer on Mobile">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 lg:col-span-7">
            <Lead>
              The soccer betting app provides a mobile-focused way to access supported soccer markets
              from a compatible device.
            </Lead>
            <P>
              Registered users may be able to browse available matches, review event information and
              access their account through supported mobile options.
            </P>
            <P>App availability and functionality can depend on your device, operating system and location.</P>
            <P>
              If you&rsquo;re searching for a soccer betting app, check the official 1xBet platform
              for current mobile availability and installation requirements.
            </P>
            <P>Avoid downloading account-related applications from unknown third-party sources.</P>
            <div className="pt-1">
              <Cta href="/#app" solid>Explore the Soccer Betting App</Cta>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="sc-card flex items-center justify-center p-10">
              <Smartphone className="h-20 w-20 text-sc-pitch" strokeWidth={1.1} aria-hidden />
            </div>
          </div>
        </div>
      </Sec>

      {/* ======================= Live odds ====================== */}
      <Sec n={9} kicker="Live Soccer Odds" title="Markets Can Change During the Match" tone="night" side="right">
        <div className="max-w-4xl space-y-4 lg:ml-auto lg:text-right">
          <Lead>Live soccer odds can change as a match progresses.</Lead>
          <P>
            A goal, penalty, red card, substitution or other match event can affect the available
            markets and odds within a short period.
          </P>
          <P>
            Users following live markets should check the latest information displayed for the match
            rather than relying on odds viewed earlier.
          </P>
          <P>Live markets may change, suspend or become unavailable while the match is in progress.</P>
          <P>Availability of live soccer markets depends on the individual event and location.</P>
        </div>
      </Sec>

      {/* ==================== Competitions ====================== */}
      <Sec n={10} kicker="Soccer Competitions" title="Find Available Soccer Events" tone="pitch">
        <div className="max-w-4xl space-y-4">
          <Lead>
            Soccer is played across leagues, tournaments and international competitions throughout
            the year.
          </Lead>
          <P>
            Depending on current platform coverage, users may find available fixtures from different
            competitions.
          </P>
          <P>
            The exact selection can change according to the competition calendar, scheduled fixtures
            and regional availability.
          </P>
          <P>
            When browsing a competition, select an available match to see the markets and odds
            currently offered for that event.
          </P>
          <P>Always check the individual fixture page for the latest information.</P>
        </div>
      </Sec>

      {/* ========================== Why ========================= */}
      <Sec n={11} kicker="Why Explore Soccer Betting on 1xBet?" title="A Dedicated Soccer Experience" side="right">
        <Lead>1xBet brings available soccer fixtures and markets together in one dedicated section.</Lead>

        <Rail
          className="mt-8"
          grid="sm:grid-cols-2 lg:grid-cols-3"
          gap="gap-3 sm:gap-4"
          card="82%"
          label="Why explore soccer betting on 1xBet"
        >
          {WHY.map(({ t, b, icon: Icon }) => (
            <div key={t} className="sc-card p-6">
              <Icon className="h-7 w-7 text-sc-pitch" strokeWidth={1.6} aria-hidden />
              <h3 className="mt-4 text-[16px] font-extrabold tracking-[-0.01em] text-fg">{t}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">{b}</p>
            </div>
          ))}
        </Rail>

        <p className="mt-7 max-w-4xl text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">
          The exact competitions, matches, markets and features available can vary according to
          location and current platform coverage.
        </p>
      </Sec>

      {/* ======================== Approach ====================== */}
      <Sec n={12} kicker="How to Approach Soccer Betting" title="Start With the Match Information">
        <div className="max-w-4xl space-y-4">
          <Lead>Before exploring a soccer market, take time to understand the event you&rsquo;re viewing.</Lead>
          <P>Check the:</P>
        </div>

        {/* Numbered board rather than another card grid */}
        <div className="mt-7 grid grid-cols-1 gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {APPROACH.map(({ t, b, icon: Icon }, i) => (
            <div key={t} className="group bg-canvas p-5 transition-colors hover:bg-surface-1">
              <div className="flex items-center gap-3">
                <span className="sc-hex h-9 w-8 text-[12px] group-hover:sc-hex-fill">{i + 1}</span>
                <Icon className="h-5 w-5 text-sc-pitch" strokeWidth={1.8} aria-hidden />
              </div>
              <h3 className="mt-3.5 text-[16px] font-extrabold tracking-[-0.01em] text-fg">{t}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">{b}</p>
            </div>
          ))}
        </div>

        <p className="mt-7 max-w-4xl text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">
          This helps you make decisions based on current event information rather than assumptions
          about a different match.
        </p>
      </Sec>

      {/* ====================== Responsible ===================== */}
      <Sec n={13} kicker="Responsible Soccer Betting" title="Keep Your Betting Within Your Limits" tone="pitch" side="right">
        <ul className="divide-y divide-line border-y border-line">
          {RESPONSIBLE.map((text, i) => (
            <li key={i} className="flex items-start gap-4 py-4 sm:gap-6">
              <span className="mt-0.5 font-mono text-[12px] font-bold text-sc-pitch">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-[14px] leading-relaxed text-fg-muted sm:text-[15px]">{text}</p>
            </li>
          ))}
        </ul>
      </Sec>

      {/* ========================== FAQ ========================= */}
      <section id="faq" className="scroll-mt-[68px] md:scroll-mt-[118px] border-t border-line bg-canvas py-10 sm:py-12 lg:py-15">
        <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-10">
          <div className="flex items-center gap-4 sm:gap-5">
            <span className="sc-hex sc-hex-fill">14</span>
            <span className="min-w-0">
              <span className="block text-[11px] font-extrabold uppercase tracking-[0.2em] text-sc-pitch">
                Frequently Asked Questions
              </span>
              <h2 className="mt-2 text-[clamp(1.7rem,4.2vw,2.9rem)] font-extrabold leading-[1.05] tracking-[-0.042em] text-fg">
                Soccer betting, answered
              </h2>
            </span>
          </div>

          <div className="mt-8 max-w-4xl">
            <Accordion items={faqEntries} />
          </div>
        </div>
      </section>

      {/* ======================== Closing ======================= */}
      <Sec n={15} kicker="Explore Soccer Betting on 1xBet" title="Explore Soccer Betting on 1xBet" tone="night">
        <div className="max-w-4xl space-y-4">
          <Lead>
            From soccer betting India and online soccer betting to selected live matches, 1xBet
            provides a dedicated place to browse available soccer fixtures and markets.
          </Lead>
          <P>
            Explore soccer betting markets, check current soccer betting odds, follow selected
            matches through live soccer betting and review live soccer odds where supported.
          </P>
          <P>
            Whether you&rsquo;re following a regular league fixture or an important competition
            match, check the individual event page for the markets and odds currently available.
          </P>
          <P>
            Mobile users can also check the availability of the soccer betting app and supported
            mobile access options.
          </P>
          <P>
            Soccer events, competitions, markets and services can vary according to location and
            applicable regulations. Always check the latest information provided on the platform,
            review the relevant terms and participate responsibly.
          </P>

          <div className="grid grid-cols-2 gap-2.5 pt-2 sm:flex sm:flex-wrap sm:gap-3">
            <Cta href="#markets" solid>Explore Soccer Betting</Cta>
            <Cta href="#odds">View Available Soccer Markets</Cta>
          </div>
        </div>
      </Sec>
    </main>
  );
}
