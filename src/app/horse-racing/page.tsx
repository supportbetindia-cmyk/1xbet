'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Radio, Smartphone, Globe2, Trophy, LineChart,
  UserRound, ClipboardList, MapPin, Clock,
} from 'lucide-react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { Accordion, AccordionEntry } from '@/components/ui/Accordion';
import { useReveal } from '@/hooks/useReveal';
import { Rail } from '@/components/ui/Rail';
import { Silks, SilkField, TrackStraight, SilkPattern } from '@/components/racing/RacingVisuals';
import { FurlongScrubber } from '@/components/racing/FurlongScrubber';

/* Each section is issued its own silk, the way each runner in a field is. */
const SILKS: { p: SilkPattern; base: string; mark: string }[] = [
  { p: 'stripes',  base: '#8e1f38', mark: '#f2e3c8' },
  { p: 'hoops',    base: '#1f4d33', mark: '#e9d79a' },
  { p: 'chevron',  base: '#24446e', mark: '#ffffff' },
  { p: 'sash',     base: '#94701f', mark: '#12241c' },
  { p: 'quarters', base: '#5c2050', mark: '#f0e6d2' },
  { p: 'spots',    base: '#0f3b52', mark: '#ffd9a0' },
];

const RACE_CHECKS = [
  'Race details',
  'Participants',
  'Event date and time',
  'Race status',
  'Available horse racing betting markets',
  'Current horse racing odds',
  'Live market availability',
  'Applicable terms and restrictions',
];

const BEFORE_RACE: { t: string; b: string; icon: React.ElementType }[] = [
  { t: 'Race information', icon: Clock,
    b: 'Check the event, scheduled time and current status.' },
  { t: 'Participants', icon: UserRound,
    b: 'Review the horses and other information displayed for the race.' },
  { t: 'Available markets', icon: ClipboardList,
    b: 'Markets can differ between races, so check the options offered for the individual event.' },
  { t: 'Current odds', icon: LineChart,
    b: 'Use the latest horse racing odds displayed on the platform.' },
  { t: 'Live availability', icon: Radio,
    b: 'If the race is underway, check whether live markets are currently supported.' },
  { t: 'Regional requirements', icon: MapPin,
    b: 'Confirm that the service is permitted and available in your location.' },
];

const WHY: { t: string; b: string; icon: React.ElementType }[] = [
  { t: 'Race-focused markets', icon: Trophy,
    b: 'Browse available markets directly from individual racing events.' },
  { t: 'Current odds', icon: LineChart,
    b: 'Check the latest horse racing odds displayed for available markets.' },
  { t: 'Selected live events', icon: Radio,
    b: 'Where supported, follow available races through live markets.' },
  { t: 'Mobile access', icon: Smartphone,
    b: 'Use supported mobile options to browse available racing events.' },
  { t: 'Central account access', icon: UserRound,
    b: 'Registered users can access supported platform features through their account.' },
  { t: 'Event-based information', icon: Globe2,
    b: 'Review the details and markets associated with the specific race you’re viewing.' },
];

const RESPONSIBLE = [
  'Horse racing betting involves financial risk. No market or odds guarantee a particular outcome, and losses can occur.',
  'Only participate where you are legally permitted to do so and where you meet the applicable age and eligibility requirements.',
  'Set a personal budget before participating and avoid using money required for everyday expenses.',
  'Do not chase losses or increase spending because a previous race did not produce the expected result.',
  'Live markets can move particularly quickly, so avoid making decisions simply because the odds have changed during an event.',
  'If betting begins affecting your finances, relationships, work or everyday responsibilities, consider taking a break and seeking appropriate support.',
  'Always review the applicable terms, restrictions and local requirements before using the service.',
];

const FAQS: [string, string][] = [
  ['What is horse racing betting?', 'Horse racing betting refers to available betting markets associated with horse racing events. The markets and odds offered can vary depending on the race, platform coverage and location.'],
  ['Is horse racing betting available in India?', 'Horse racing betting India availability depends on the specific jurisdiction, applicable laws, platform availability and user eligibility. Users should verify the current rules that apply to their location before participating.'],
  ['What is online horse racing betting?', 'Online horse racing betting refers to accessing available horse racing markets through an online platform. Available races, markets and services can vary by location.'],
  ['What are horse racing odds?', 'Horse racing odds are the prices displayed for available racing markets. They can change before a race and, where live markets are supported, during the event.'],
  ['Can live horse racing odds change?', 'Yes. Live horse racing odds can change as an event develops. Markets may also be suspended or become unavailable during a race.'],
  ['What are horse racing betting markets?', 'Horse racing betting markets are the different options available for a particular racing event. The markets offered can vary depending on the race and platform coverage.'],
  ['What is horse race betting?', 'Horse race betting refers to betting markets associated with individual horse racing events. The available options depend on the specific race and applicable availability.'],
  ['Is live horse racing betting available?', 'Where supported, live horse racing betting may be available for selected events. Live availability can vary according to the race and location.'],
  ['Is there a horse racing betting app?', 'Where supported, users may access available racing markets through the horse racing betting app or compatible mobile website options.'],
  ['Can I access online horse racing betting from mobile?', 'Where mobile access is supported and permitted in your location, users may be able to browse available racing events through supported mobile options.'],
  ['Do horse racing betting markets stay the same?', 'No. Markets can change according to the event, timing, platform availability and whether the race is live.'],
  ['Are horse racing odds a guarantee of the result?', 'No. Horse racing odds do not guarantee an outcome. Race results are uncertain and financial losses are possible.'],
  ['How can I check whether horse racing betting is permitted in my location?', 'Check the current laws and regulatory requirements that apply to your specific jurisdiction before participating. Do not assume that availability on a website means the activity is legally permitted where you live.'],
];

/* ---------------------------------------------------------------- shells -- */

/**
 * Section shell. The head is a racecard entry: the section's silk, its
 * saddlecloth number, the kicker, then the running rail out to the right.
 */
function Sec({
  id, n, kicker, title, dark = false, tinted = false, children,
}: {
  id?: string; n: number; kicker: string; title: string;
  dark?: boolean; tinted?: boolean; children: React.ReactNode;
}) {
  const ref = useReveal<HTMLElement>({ selector: '[data-rv]', stagger: 0.05, y: 16 });
  const silk = SILKS[(n - 1) % SILKS.length];

  const ground = dark
    ? 'hr-night hr-on-dark border-transparent'
    : tinted ? 'bg-surface-1 border-line' : 'bg-canvas border-line';

  return (
    <section
      id={id}
      ref={ref}
      className={`relative scroll-mt-[68px] md:scroll-mt-[118px] overflow-hidden border-t py-10 sm:py-12 lg:py-15 ${ground}`}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <div data-rv className="flex items-center gap-3 sm:gap-4">
          <Silks
            pattern={silk.p}
            base={dark ? silk.mark : silk.base}
            mark={dark ? silk.base : silk.mark}
            className="h-11 w-10 shrink-0 drop-shadow-sm"
          />
          <span className="hr-cloth shrink-0 text-hr-claret">{String(n).padStart(2, '0')}</span>
          <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-fg-muted">
            {kicker}
          </span>
          {/* Rail runs out to the edge; too narrow to bother with on phones */}
          <span className="hr-rail hidden flex-1 text-hr-brass sm:block" aria-hidden />
        </div>

        <h2
          data-rv
          className="mt-5 max-w-4xl text-[clamp(1.75rem,4.2vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.042em] text-fg"
        >
          {title}
        </h2>

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
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hr-claret ${
        solid
          ? 'hr-cta-solid bg-hr-claret shadow-[0_10px_26px_rgba(142,31,56,0.28)] hover:brightness-110'
          : 'border-2 border-line-strong bg-canvas text-fg hover:border-hr-claret hover:bg-surface-1'
      }`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}

/* ------------------------------------------------------------------ page -- */

export default function HorseRacingPage() {
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = heroRef.current;
    if (!el || prefersReducedMotion()) return;
    if (document.visibilityState === 'hidden') return;

    // `gsap.from` writes opacity:0 inline the moment the tween exists, so a
    // timeline that never finishes leaves these invisible for good. Clearing on
    // every exit path makes that state unreachable.
    const HIDDEN = '[data-r="k"],[data-r="h"],[data-r="p"],[data-r="cta"] > *,[data-r="track"],[data-r="field"]';
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
        .from('[data-r="k"]', { opacity: 0, x: -12, duration: 0.45 })
        .from('[data-r="h"]', { opacity: 0, y: 24, duration: 0.7 }, '-=0.2')
        .from('[data-r="p"]', { opacity: 0, y: 14, duration: 0.5, stagger: 0.07 }, '-=0.35')
        .from('[data-r="cta"] > *', { opacity: 0, y: 12, duration: 0.45, stagger: 0.06 }, '-=0.3')
        .from('[data-r="field"] > *', { opacity: 0, y: 16, duration: 0.45, stagger: 0.07 }, '-=0.35')
        .from('[data-r="track"]', { opacity: 0, x: 24, duration: 0.7 }, '-=0.5');
    }, el);

    const watchdog = window.setTimeout(reveal, 4000);
    return () => {
      window.clearTimeout(watchdog);
      ctx.revert();
      reveal();
    };
  }, []);

  const faqEntries: AccordionEntry[] = FAQS.map(([q, a], i) => ({
    id: `hr-${i}`, question: q, answer: <p>{a}</p>,
  }));
  // Two independent columns rather than one long list beside a sticky heading:
  // that sidebar treatment is already on tennis and basketball.
  const faqLeft = faqEntries.slice(0, 7);
  const faqRight = faqEntries.slice(7);

  return (
    <main className="flex-1 overflow-x-clip">

      {/* ====================== Hero — night meeting ====================== */}
      <section
        ref={heroRef}
        data-hero
        className="hr-night hr-on-dark relative overflow-hidden"
        aria-labelledby="racing-title"
      >
        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 pt-9 pb-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
          <div className="grid grid-cols-1 items-center gap-9 lg:grid-cols-12 lg:gap-12">

            <div className="flex flex-col lg:col-span-7">
              <div data-r="k" className="flex items-center gap-3">
                <Silks pattern="stripes" base="#f2e3c8" mark="#8e1f38" className="h-10 w-9 shrink-0" />
                <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-hr-brass">
                  Horse Racing Betting
                </span>
              </div>

              <h1
                id="racing-title"
                data-r="h"
                className="mt-4 text-[clamp(2.2rem,5.6vw,4.2rem)] font-extrabold leading-[1] tracking-[-0.048em] text-fg"
              >
                Horse Racing Betting on{' '}
                <span className="text-hr-brass [text-shadow:0_0_26px_rgba(216,176,74,0.4)]">1xBet</span>
              </h1>

              <p data-r="p" className="mt-5 max-w-[62ch] text-[16px] leading-relaxed text-fg sm:text-[18px]">
                Horse racing combines form, pace, conditions and competition, making every race
                different. The horse racing betting section on 1xBet gives users a dedicated place
                to explore available races, review event information and check the markets and odds
                offered for individual events.
              </p>

              <div className="hero-spill">
                <p data-r="p" className="mt-4 max-w-[66ch] text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">
                  Browse scheduled races, review horse racing betting markets, compare available
                  horse racing odds and explore selected live events where supported.
                </p>

                <p data-r="p" className="mt-4 max-w-[66ch] text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">
                  Whether you&rsquo;re searching for horse racing betting India, online horse racing
                  betting or mobile access, availability can depend on the race, location, platform
                  coverage and applicable regulations.
                </p>

                <p data-r="p" className="mt-4 max-w-[66ch] text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">
                  Always check the current race information and applicable terms before
                  participating. Where local restrictions apply, those requirements take precedence.
                </p>
              </div>

              <div data-r="cta" className="mt-7 grid grid-cols-2 gap-2.5 sm:mt-8 sm:flex sm:flex-wrap sm:gap-3">
                <Cta href="#markets" solid>Explore Horse Racing</Cta>
                <Cta href="#live">View Available Races</Cta>
              </div>

              {/* The field, in silks — the page's loudest graphic */}
              <div data-r="field" className="rail -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0">
                <SilkField />
              </div>
            </div>

            <div data-r="track" className="lg:col-span-5">
              <div className="mx-auto w-full max-w-[420px] lg:max-w-none">
                <TrackStraight className="h-auto w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================= Markets ========================= */}
      <Sec id="markets" n={2} kicker="Explore Horse Racing Markets" title="Find Markets for Available Races" tinted>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 lg:col-span-7">
            <Lead>
              Different races can offer different betting markets depending on the event, field,
              race conditions and platform coverage.
            </Lead>
            <P>
              The horse racing betting markets available for one race may not be the same as those
              offered for another. Open the individual race to review the current selections, event
              information and horse racing betting odds available at that time.
            </P>
            <P>
              Markets can also change as a race approaches. Where live markets are supported, they
              may change further once the race is underway.
            </P>
            <P>
              Rather than relying on previously viewed information, always check the individual race
              page for the latest available markets.
            </P>
            <div className="pt-1">
              <Cta href="#odds">Explore Horse Racing Markets</Cta>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="hr-card p-6">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-hr-claret">
                Race by race
              </p>
              <SilkField className="mt-5" />
              <span className="hr-rail mt-6 block text-hr-brass" aria-hidden />
            </div>
          </div>
        </div>
      </Sec>

      {/* ========================== Odds =========================== */}
      <Sec n={3} kicker="Horse Racing Odds" title="Check Current Horse Racing Odds" id="odds">
        <div className="max-w-4xl space-y-4">
          <Lead>Horse racing odds provide the prices displayed for available racing markets.</Lead>
          <P>
            Odds can change before a race as new information becomes available. Factors connected
            with the race, field and market can affect the prices displayed on the platform.
          </P>
          <P>
            Where live markets are available, live horse racing odds can change as the event
            develops.
          </P>
          <P>
            Previously viewed odds may no longer be available, so users should always check the
            current race page before making a decision.
          </P>
          <P>
            Horse racing odds do not guarantee a result. Race outcomes are uncertain, and users
            should understand the financial risks involved before participating.
          </P>
        </div>
      </Sec>

      {/* ======================= Live racing ======================= */}
      <Sec id="live" n={4} kicker="Live Horse Racing Betting" title="Follow Selected Races as They Happen" dark>
        <div className="max-w-4xl space-y-4">
          <Lead>
            Live horse racing betting refers to selected markets available while a race or supported
            racing event is in progress.
          </Lead>
          <P>
            Live racing can move quickly, meaning available markets and live horse racing odds may
            change within a short period.
          </P>
          <P>
            Where live access is supported, users can follow the event and review the markets
            currently displayed on the platform.
          </P>
          <P>
            Markets may change, suspend or close as the race progresses. Always check the latest
            information shown for the event.
          </P>
          <P>
            Live horse racing betting is not necessarily available for every race or in every
            location.
          </P>
          <div className="pt-1">
            <Cta href="#app" solid>Explore Live Horse Racing</Cta>
          </div>
        </div>
      </Sec>

      {/* ====================== Race betting ======================= */}
      <Sec n={5} kicker="Horse Race Betting" title="Review the Race Before You Decide">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 lg:col-span-5">
            <Lead>
              Horse race betting gives users access to available markets connected with individual
              racing events.
            </Lead>
            <P>Before participating, review the information provided for the race, including:</P>
          </div>

          {/* Set as a racecard: saddlecloth number against each line */}
          <div className="lg:col-span-7">
            <ul className="hr-card divide-y divide-line">
              {RACE_CHECKS.map((item, i) => (
                <li key={item} className="flex items-center gap-4 px-4 py-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[2px] border border-hr-claret font-mono text-[11px] font-bold text-hr-claret">
                    {i + 1}
                  </span>
                  <span className="text-[14px] font-semibold text-fg sm:text-[15px]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-7 max-w-4xl space-y-4">
          <P>
            The available markets can differ between races, so information from one event should not
            automatically be applied to another.
          </P>
          <P>
            The individual race page is the best place to check the current information available
            for that event.
          </P>
        </div>
      </Sec>

      {/* ========================== India ========================== */}
      <Sec n={6} kicker="Horse Racing Betting India" title="Availability Depends on Your Location" tinted>
        <div className="max-w-4xl space-y-4">
          <Lead>
            Horse racing has a long-standing following in India, but the legal and regulatory
            position for betting can depend on the specific activity, jurisdiction and current
            rules.
          </Lead>
          <P>
            For users searching for horse racing betting India, it is important to confirm that the
            relevant service is legally available in your location before participating.
          </P>
          <P>
            Current Indian legal developments mean that online real-money gaming and betting should
            not be treated as universally permitted simply because an activity has historically
            received different legal treatment.
          </P>
          <P>
            Users should therefore check the latest applicable requirements for their state or
            territory, meet all eligibility requirements and use the service only where permitted.
          </P>
          <div className="pt-1">
            <Cta href="#markets">Check Available Horse Racing Markets</Cta>
          </div>
        </div>
      </Sec>

      {/* ========================= Online ========================== */}
      <Sec n={7} kicker="Online Horse Racing Betting" title="Browse Available Racing Events Online">
        <div className="max-w-4xl space-y-4">
          <Lead>
            Online horse racing betting provides access to supported racing events through an online
            platform.
          </Lead>
          <P>
            Users can browse available races, review event information, explore horse racing betting
            markets and check the current odds displayed for individual events.
          </P>
          <P>
            The selection of races and markets can vary according to platform coverage, location and
            applicable requirements.
          </P>
          <P>
            If you&rsquo;re searching for horse racing betting online, always use the official
            platform and confirm that the service is available and permitted in your jurisdiction.
          </P>
          <div className="pt-1">
            <Cta href="#app">Explore Horse Racing Online</Cta>
          </div>
        </div>
      </Sec>

      {/* =========================== App =========================== */}
      <Sec id="app" n={8} kicker="Horse Racing Betting App" title="Access Racing on Mobile" tinted>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 lg:col-span-7">
            <Lead>
              The horse racing betting app provides a mobile-focused way to access supported racing
              markets from a compatible device.
            </Lead>
            <P>
              Registered users may be able to browse available races, review event information and
              access their account through supported mobile options.
            </P>
            <P>
              App availability and functionality can depend on your device, operating system and
              location.
            </P>
            <P>
              If you&rsquo;re searching for a horse racing betting app India, check the official
              1xBet platform for the latest mobile availability and applicable requirements. Do not
              download account-related applications from unknown third-party sources.
            </P>
            <div className="pt-1">
              <Cta href="/#app" solid>Explore Mobile Horse Racing</Cta>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="hr-card flex items-center justify-center p-8">
              <Silks pattern="quarters" base="#5c2050" mark="#f0e6d2" className="h-28 w-24" />
            </div>
          </div>
        </div>
      </Sec>

      {/* ======================= Live odds ========================= */}
      <Sec n={9} kicker="Live Horse Racing Odds" title="Racing Markets Can Change Quickly" dark>
        <div className="max-w-4xl space-y-4">
          <Lead>Live horse racing odds can change as a supported event progresses.</Lead>
          <P>
            Because racing events move quickly, available markets may change within a short period.
            An option or price displayed earlier may no longer be available when you return to the
            event.
          </P>
          <P>
            Users following live racing should always check the latest information shown on the
            platform rather than relying on previously viewed odds.
          </P>
          <P>Live markets can also be suspended or closed during an event.</P>
          <P>
            The availability of live horse racing markets depends on the individual race and
            location.
          </P>
        </div>

        <div className="mt-8 max-w-3xl rounded-[3px] border border-line bg-canvas p-5 sm:p-7">
          <FurlongScrubber />
        </div>
      </Sec>

      {/* ==================== Before a race ======================== */}
      <Sec n={10} kicker="What to Check Before a Race" title="Understand the Event You’re Viewing">
        <div className="max-w-4xl space-y-4">
          <Lead>
            Before exploring a horse racing market, take a moment to review the information provided
            for the race.
          </Lead>
          <P>Useful details can include:</P>
        </div>

        <Rail
          className="mt-7"
          grid="sm:grid-cols-2 lg:grid-cols-3"
          gap="gap-3 sm:gap-4"
          card="82%"
          label="What to check before a race"
        >
          {BEFORE_RACE.map(({ t, b, icon: Icon }, i) => (
            <div key={t} className="hr-card p-5">
              <div className="flex items-center gap-3">
                <Silks
                  pattern={SILKS[i % SILKS.length].p}
                  base={SILKS[i % SILKS.length].base}
                  mark={SILKS[i % SILKS.length].mark}
                  className="h-9 w-8 shrink-0"
                />
                <Icon className="h-5 w-5 text-hr-claret" strokeWidth={1.8} aria-hidden />
              </div>
              <h3 className="mt-4 text-[16px] font-extrabold tracking-[-0.01em] text-fg">{t}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">{b}</p>
            </div>
          ))}
        </Rail>

        <p className="mt-7 max-w-4xl text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">
          This helps ensure that you&rsquo;re working from current event information rather than
          assumptions based on another race.
        </p>
      </Sec>

      {/* ========================== Why ============================ */}
      <Sec n={11} kicker="Why Explore Horse Racing on 1xBet?" title="A Dedicated Racing Experience" dark>
        <Lead>
          The horse racing section brings available racing events and markets together in one place.
        </Lead>

        {/* A ledger, not another card grid — tennis and basketball both run a
            three-up rail here and the pages were starting to read as one. */}
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {WHY.map(({ t, b, icon: Icon }, i) => (
            <li
              key={t}
              className="group grid grid-cols-[auto_1fr] items-start gap-4 py-5 transition-colors hover:bg-surface-1 sm:grid-cols-[auto_minmax(0,18rem)_1fr] sm:items-center sm:gap-7 sm:px-3"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[12px] font-bold text-fg-dim">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <Silks
                  pattern={SILKS[i % SILKS.length].p}
                  base={SILKS[i % SILKS.length].base}
                  mark={SILKS[i % SILKS.length].mark}
                  className="h-9 w-8 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5"
                />
              </div>

              <h3 className="text-[16px] font-extrabold tracking-[-0.01em] text-fg sm:text-[17px]">
                {t}
              </h3>

              <p className="col-span-2 text-[14px] leading-relaxed text-fg-muted sm:col-span-1 sm:text-[15px]">
                <Icon className="mr-2 inline h-4 w-4 -translate-y-px text-hr-brass" strokeWidth={1.8} aria-hidden />
                {b}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-7 max-w-4xl text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">
          The exact races, markets, features and mobile options available can vary according to
          location and current platform coverage.
        </p>
      </Sec>

      {/* ====================== Responsible ======================== */}
      <Sec n={12} kicker="Responsible Horse Racing Betting" title="Keep Your Betting Within Your Limits" tinted>
        <Rail
          grid="sm:grid-cols-2 lg:grid-cols-3"
          gap="gap-3 sm:gap-4"
          card="86%"
          label="Responsible play guidance"
        >
          {RESPONSIBLE.map((text, i) => (
            <div key={i} className="hr-card flex gap-4 p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[2px] border border-hr-claret font-mono text-[12px] font-bold text-hr-claret">
                {i + 1}
              </span>
              <p className="text-[14px] leading-relaxed text-fg-muted">{text}</p>
            </div>
          ))}
        </Rail>
      </Sec>

      {/* ========================== FAQ ============================ */}
      <section id="faq" className="scroll-mt-[68px] md:scroll-mt-[118px] border-t border-line bg-canvas py-10 sm:py-12 lg:py-15">
        <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-10">
          {/* Head runs full width above the columns */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Silks pattern="chevron" base="#24446e" mark="#ffffff" className="h-11 w-10 shrink-0" />
            <span className="hr-cloth shrink-0 text-hr-claret">13</span>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-fg-muted">
              Frequently Asked Questions
            </span>
            <span className="hr-rail hidden flex-1 text-hr-brass sm:block" aria-hidden />
          </div>

          <h2 className="mt-5 max-w-4xl text-[clamp(1.75rem,4.2vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.042em] text-fg">
            Horse racing, answered
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-0 lg:grid-cols-2">
            <Accordion items={faqLeft} />
            {/* Second column opens nothing by default, so only one answer shows
                on load rather than two competing for attention. */}
            <Accordion items={faqRight} defaultValue="" />
          </div>
        </div>
      </section>

      {/* ======================== Closing ========================== */}
      <Sec n={14} kicker="Explore Horse Racing Betting on 1xBet" title="Explore Horse Racing Betting on 1xBet" dark>
        <div className="max-w-4xl space-y-4">
          <Lead>
            Explore available horse racing betting markets, review current horse racing odds and
            browse supported racing events from one dedicated section.
          </Lead>
          <P>
            Whether you&rsquo;re searching for horse racing betting India, online horse racing
            betting, live horse racing betting or a horse racing betting app, always start by
            checking current availability for your location and device.
          </P>
          <P>
            Where supported, you can review available horse racing betting markets and follow
            selected events through live racing options.
          </P>
          <P>
            Race availability, markets, odds and services can vary according to location and
            applicable regulations. Always check the latest information, review the relevant terms
            and participate responsibly.
          </P>

          <div className="grid grid-cols-2 gap-2.5 pt-2 sm:flex sm:flex-wrap sm:gap-3">
            <Cta href="#markets" solid>Explore Horse Racing</Cta>
            <Cta href="/sports">Explore Sports</Cta>
          </div>
        </div>
      </Sec>
    </main>
  );
}
