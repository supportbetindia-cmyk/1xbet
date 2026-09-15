'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Radio, Smartphone, Globe2, Trophy, LineChart,
  MonitorSmartphone, Layers,
} from 'lucide-react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { Accordion, AccordionEntry } from '@/components/ui/Accordion';
import { useReveal } from '@/hooks/useReveal';
import { Rail } from '@/components/ui/Rail';
import { CourtDiagram, PointLadder, MomentumBar } from '@/components/tennis/TennisVisuals';

/* The three court surfaces drive the accent instead of one brand hue — it is
   the one colour system that belongs to tennis and to no other page here. */
const SURFACES = {
  hard:  { bg: 'bg-tn-hard',  text: 'text-tn-hard',  border: 'border-tn-hard'  },
  clay:  { bg: 'bg-tn-clay',  text: 'text-tn-clay',  border: 'border-tn-clay'  },
  grass: { bg: 'bg-tn-grass', text: 'text-tn-grass', border: 'border-tn-grass' },
} as const;

type Surface = keyof typeof SURFACES;

const MATCH_CHECKS = [
  'Players',
  'Tournament or competition',
  'Match date and time',
  'Event status',
  'Available tennis betting markets',
  'Current tennis betting odds',
  'Live market availability',
  'Applicable terms and restrictions',
];

const WHY: { t: string; b: string; icon: React.ElementType; s: Surface }[] = [
  { t: 'Tennis-focused markets', icon: Trophy, s: 'hard',
    b: 'Browse available markets directly from individual tennis events.' },
  { t: 'Pre-match access', icon: Layers, s: 'clay',
    b: 'Review upcoming matches and available markets before play begins.' },
  { t: 'Live tennis', icon: Radio, s: 'grass',
    b: 'Where supported, follow selected matches through available live markets.' },
  { t: 'Current odds', icon: LineChart, s: 'hard',
    b: 'Check the latest tennis betting odds displayed for available markets.' },
  { t: 'Mobile access', icon: Smartphone, s: 'clay',
    b: 'Use supported mobile options to browse tennis events and access your account.' },
  { t: 'Multiple competitions', icon: Globe2, s: 'grass',
    b: 'Explore available matches from different supported tennis competitions.' },
];

const RESPONSIBLE = [
  'Tennis betting involves financial risk. No market or result guarantees a particular outcome, and losses can occur.',
  'Only participate if you are legally permitted to use the service and meet the applicable age and eligibility requirements in your location.',
  'Set a personal budget before participating and avoid using money needed for everyday expenses.',
  'Do not chase losses or increase your spending because a previous result did not go as expected.',
  'Live tennis can move quickly, particularly when the score changes or a player gains momentum. Take time to consider your decisions rather than reacting to every point.',
  'If betting begins affecting your finances, relationships, work or everyday responsibilities, consider taking a break and seeking appropriate support.',
  'Always review the applicable terms and local requirements before using the service.',
];

const FAQS: [string, string][] = [
  ['What is tennis betting?', 'Tennis betting refers to the available betting markets associated with tennis matches and tournaments. The markets offered can vary depending on the event, competition and location.'],
  ['Is tennis betting available in India?', 'Tennis betting India availability depends on the user’s location, applicable regulations, platform coverage and eligibility requirements. Users should confirm that the service is permitted in their jurisdiction before participating.'],
  ['What is online tennis betting?', 'Online tennis betting allows users to access available tennis markets through an online platform. Available matches, markets and services can vary by location.'],
  ['What is live tennis betting?', 'Live tennis betting refers to selected markets available while a tennis match is in progress. Live markets and odds can change as the match develops.'],
  ['What are tennis betting odds?', 'Tennis betting odds are the prices displayed for available tennis markets. They can change before a match and during live betting.'],
  ['Can live tennis odds change?', 'Yes. Live tennis odds can change as a match develops and new information becomes available. Users should always check the current information displayed for the event.'],
  ['What are tennis betting markets?', 'Tennis betting markets are the different options available for a particular tennis match. The markets can differ depending on the tournament, players, match stage and event status.'],
  ['What is tennis match betting?', 'Tennis match betting refers to the available markets associated with an individual tennis fixture.'],
  ['Is there a tennis betting app?', 'Where supported, users can access available tennis markets through the tennis betting app or compatible mobile website options.'],
  ['Can I access tennis betting online?', 'Where available in your location, users can browse online tennis betting markets through supported desktop and mobile platforms.'],
  ['Are tennis betting outcomes guaranteed?', 'No. Tennis matches have uncertain outcomes. Odds and markets do not guarantee a particular result.'],
  ['Can tennis betting markets change?', 'Yes. Markets can change depending on the event, timing, match conditions and platform availability. Live markets can change particularly quickly.'],
];

/* ---------------------------------------------------------------- shells -- */

/**
 * Section shell. The head is a draw-sheet strip: a seeded index box, the
 * kicker, then net mesh running out to the right edge.
 */
function Sec({
  id, n, kicker, title, surface = 'hard', tinted = false, children,
}: {
  id?: string; n: number; kicker: string; title: string;
  surface?: Surface; tinted?: boolean; children: React.ReactNode;
}) {
  const ref = useReveal<HTMLElement>({ selector: '[data-rv]', stagger: 0.05, y: 16 });
  const c = SURFACES[surface];

  return (
    <section
      id={id}
      ref={ref}
      className={`scroll-mt-[68px] md:scroll-mt-[118px] border-t border-line py-8 sm:py-9 lg:py-11 ${tinted ? 'bg-surface-1' : 'bg-canvas'}`}
    >
      <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <div data-rv className="tn-band">
          <span className={`tn-seed ${c.bg}`}>{String(n).padStart(2, '0')}</span>
          <span className="tn-kicker">{kicker}</span>
          {/* Mesh fills whatever is left; hidden on phones where there is none */}
          <span className="tn-mesh hidden flex-1 sm:block" aria-hidden />
        </div>

        <h2
          data-rv
          className="mt-5 max-w-4xl text-[clamp(1.7rem,4vw,2.9rem)] font-extrabold leading-[1.06] tracking-[-0.04em] text-fg"
        >
          {title}
        </h2>

        <div data-rv className="mt-6">{children}</div>
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
      className={`group inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-[6px] px-4 text-[14px] font-extrabold
                  transition-all hover:-translate-y-0.5 sm:px-6 sm:text-[15px]
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tn-hard ${
        solid
          ? 'bg-tn-hard text-white shadow-[0_10px_24px_rgba(24,102,171,0.28)] hover:brightness-110'
          : 'border-2 border-line-strong bg-canvas text-fg hover:border-tn-hard hover:bg-surface-1'
      }`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}

/* ------------------------------------------------------------------ page -- */

export default function TennisPage() {
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = heroRef.current;
    if (!el || prefersReducedMotion()) return;
    if (document.visibilityState === 'hidden') return;

    // `gsap.from` writes opacity:0 inline the moment the tween exists, so a
    // timeline that never finishes leaves these invisible for good. Clearing on
    // every exit path makes that state unreachable.
    const HIDDEN = '[data-t="k"],[data-t="h"],[data-t="p"],[data-t="cta"] > *,[data-t="court"]';
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
        .from('[data-t="k"]', { opacity: 0, x: -12, duration: 0.45 })
        .from('[data-t="h"]', { opacity: 0, y: 24, duration: 0.7 }, '-=0.2')
        .from('[data-t="p"]', { opacity: 0, y: 14, duration: 0.5, stagger: 0.07 }, '-=0.35')
        .from('[data-t="cta"] > *', { opacity: 0, y: 12, duration: 0.45, stagger: 0.06 }, '-=0.3')
        .from('[data-t="court"]', { opacity: 0, scale: 0.94, duration: 0.7 }, '-=0.5');
    }, el);

    const watchdog = window.setTimeout(reveal, 4000);
    return () => {
      window.clearTimeout(watchdog);
      ctx.revert();
      reveal();
    };
  }, []);

  const faqEntries: AccordionEntry[] = FAQS.map(([q, a], i) => ({
    id: `tn-${i}`, question: q, answer: <p>{a}</p>,
  }));

  return (
    <main className="flex-1 overflow-x-clip">

      {/* ============================ Hero ============================
          Light, no imagery: the court diagram is drawn geometry, so the hero
          keeps the white ground the rest of the site uses. */}
      <section
        ref={heroRef}
        data-hero
        className="relative overflow-hidden bg-canvas"
        aria-labelledby="tennis-title"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(0,47,94,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,47,94,0.05) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(80% 70% at 20% 0%, #000 0%, transparent 78%)',
          }}
        />

        <div className="relative mx-auto w-full max-w-[1500px] px-4 pt-9 pb-10 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
          <div className="grid grid-cols-1 items-center gap-9 lg:grid-cols-12 lg:gap-12">

            <div className="flex flex-col lg:col-span-7">
              <div data-t="k" className="tn-band inline-flex">
                <span className="tn-seed bg-tn-hard">01</span>
                <span className="tn-kicker">Tennis Betting</span>
              </div>

              <h1
                id="tennis-title"
                data-t="h"
                className="mt-5 text-[clamp(2.1rem,5.4vw,4rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-fg"
              >
                Tennis Betting on <span className="text-tn-hard">1xBet</span>
              </h1>

              <p data-t="p" className="mt-5 max-w-[62ch] text-[16px] leading-relaxed text-fg sm:text-[18px]">
                Tennis is a sport where momentum can shift from one game, set or point to the
                next. The tennis betting section on 1xBet gives users a dedicated place to browse
                available tennis matches, review event information and explore the markets
                offered for each match.
              </p>

              <div className="hero-spill">

              <p data-t="p" className="mt-4 max-w-[66ch] text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">
                From major tournaments and tour events to selected live matches, users can check
                upcoming fixtures, review tennis betting markets and view the current tennis
                betting odds available on the platform.
              </p>

              <p data-t="p" className="mt-4 max-w-[66ch] text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">
                Whether you&rsquo;re looking for tennis betting India, online tennis betting or
                live match options, availability can depend on the event, location and current
                platform coverage.
              </p>

              <p data-t="p" className="mt-4 max-w-[66ch] text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">
                Always check the latest match information, available markets and applicable terms
                before participating.
              </p>

              </div>

              <div data-t="cta" className="mt-7 grid grid-cols-2 gap-2.5 sm:mt-8 sm:flex sm:flex-wrap sm:gap-3">
                <Cta href="#markets" solid>Explore Tennis Betting</Cta>
                <Cta href="#live">View Live Tennis</Cta>
              </div>

              <PointLadder upTo={3} className="mt-8" />
            </div>

            {/* Court sits beside the copy on desktop, below it on phones */}
            <div data-t="court" className="lg:col-span-5">
              {/* Hard cap on width: the court is 240x500, so letting it fill the
                  column drives it over 1100px tall and it swallows the hero. */}
              <div className="mx-auto w-full max-w-[132px] sm:max-w-[168px] lg:max-w-[224px]">
                <CourtDiagram className="h-auto w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= Markets ======================= */}
      <Sec id="markets" n={2} kicker="Explore Tennis Betting Markets" title="Markets for Different Matches" surface="clay" tinted>
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-4 lg:col-span-7">
            <Lead>
              Tennis matches can offer different betting markets depending on the tournament,
              players, stage of competition and match status.
            </Lead>
            <P>
              The tennis betting markets available for one match may not be the same as those
              offered for another. Users can open the individual event to review the current
              options and tennis odds displayed for that match.
            </P>
            <P>
              Markets can also change as an event approaches and, where live markets are
              available, during the match itself.
            </P>
            <P>
              Checking the current event page gives users the most relevant information about the
              markets available at that time.
            </P>
            <div className="pt-1">
              <Cta href="#odds">View Tennis Markets</Cta>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="tn-card p-5 sm:p-6">
              <div className="tn-mesh h-16 rounded-[4px] border border-line" aria-hidden />
              <p className="mt-5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-tn-clay">
                Match by match
              </p>
              <PointLadder upTo={1} className="mt-3" />
            </div>
          </div>
        </div>
      </Sec>

      {/* ======================== Odds ========================= */}
      <Sec id="odds" n={3} kicker="Tennis Betting Odds" title="Check the Latest Tennis Odds" surface="grass">
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-4 lg:col-span-7">
            <Lead>Tennis betting odds show the prices displayed for available tennis markets.</Lead>
            <P>
              Odds can change before a match as new information becomes available. During live
              play, changes in the score, momentum or match situation can also affect the markets
              and live tennis odds shown on the platform.
            </P>
            <P>
              For example, a player winning a set or moving ahead in a closely contested match can
              affect the available options.
            </P>
            <P>
              The current event page should always be used when checking the latest odds.
              Previously viewed odds may no longer be available.
            </P>
            <P>
              Tennis odds do not guarantee an outcome. Match results remain uncertain, and users
              should understand the financial risks involved before participating.
            </P>
          </div>

          <div className="lg:col-span-5">
            <div className="tn-card p-5 sm:p-6">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-tn-grass">
                Momentum
              </p>
              <MomentumBar left={62} className="mt-4" />
              <MomentumBar left={38} className="mt-5" />
            </div>
          </div>
        </div>
      </Sec>

      {/* ====================== Live tennis ==================== */}
      <Sec id="live" n={4} kicker="Live Tennis Betting" title="Follow the Match as It Happens" surface="hard" tinted>
        <div className="max-w-4xl space-y-4">
          <Lead>
            Live tennis betting allows users to explore selected markets while a tennis match is
            already in progress.
          </Lead>
          <P>
            Tennis can change quickly. A break of serve, set result, injury or shift in momentum
            can affect the markets and odds available during a match.
          </P>
          <P>
            Where live tennis betting is supported, users can follow the match and review the
            options currently displayed on the platform.
          </P>
          <P>
            Live markets can change, suspend or close as the match develops. Always check the
            latest information before participating.
          </P>
          <P>Live tennis betting may not be available for every match or in every location.</P>
          <div className="pt-1">
            <Cta href="#app" solid>Explore Live Tennis</Cta>
          </div>
        </div>
      </Sec>

      {/* ===================== Match betting =================== */}
      <Sec n={5} kicker="Tennis Match Betting" title="Review the Match Before You Decide" surface="clay">
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-4 lg:col-span-5">
            <Lead>
              Tennis match betting gives users access to available markets associated with
              individual tennis fixtures.
            </Lead>
            <P>Before participating, review the information shown for the match, including:</P>
          </div>

          {/* The checklist is the content's own list, set on court lines */}
          <div className="lg:col-span-7">
            <ul className="tn-card divide-y divide-line p-1.5">
              {MATCH_CHECKS.map((item, i) => (
                <li key={item} className="flex items-center gap-3 px-3 py-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[4px] bg-surface-2 font-mono text-[11px] font-bold text-tn-clay">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[14px] font-semibold text-fg sm:text-[15px]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 max-w-4xl space-y-4">
          <P>
            Different tournaments and matches can have different markets. An option available for
            one fixture should not automatically be assumed to be available for another.
          </P>
          <P>
            The individual event page provides the most relevant information about the match and
            markets currently available.
          </P>
        </div>
      </Sec>

      {/* ======================== India ======================== */}
      <Sec n={6} kicker="Tennis Betting India" title="Tennis Betting for Users in India" surface="grass" tinted>
        <div className="max-w-4xl space-y-4">
          <Lead>
            Tennis has a strong international following, with major tournaments and professional
            events taking place throughout the year.
          </Lead>
          <P>
            Tennis betting India availability depends on the user&rsquo;s location, applicable
            regulations, platform coverage and eligibility requirements.
          </P>
          <P>
            Users in India should confirm that the relevant service is permitted in their location
            before participating and make sure they meet all applicable age and eligibility
            requirements.
          </P>
          <P>
            Where tennis markets are available, users can browse supported matches, review the
            available markets and check the current odds displayed for each event.
          </P>
          <P>
            The selection of tournaments, matches and markets can change, so always refer to the
            current information provided on the platform.
          </P>
        </div>
      </Sec>

      {/* ======================== Online ======================= */}
      <Sec n={7} kicker="Online Tennis Betting" title="Browse Tennis Markets Online" surface="hard">
        <div className="max-w-4xl space-y-4">
          <Lead>
            Online tennis betting provides access to available tennis events through an online
            platform.
          </Lead>
          <P>
            Users can browse upcoming matches, check player and event information, review tennis
            betting markets and view the current odds displayed for each match.
          </P>
          <P>
            The available selection can include different tournaments and competitions depending
            on current platform coverage and location.
          </P>
          <P>
            If you&rsquo;re looking for tennis betting online, always use the official platform and
            check whether the match or tournament you&rsquo;re interested in is currently
            available.
          </P>
          <div className="pt-1">
            <Cta href="#app">Explore Tennis Online</Cta>
          </div>
        </div>
      </Sec>

      {/* ========================= App ========================= */}
      <Sec id="app" n={8} kicker="Tennis Betting App" title="Access Tennis Markets on Mobile" surface="clay" tinted>
        <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-4 lg:col-span-7">
            <Lead>
              The tennis betting app provides a mobile-focused way to access supported tennis
              markets from a compatible device.
            </Lead>
            <P>
              Registered users may be able to browse available tennis matches, review event
              information and access their account through supported mobile options.
            </P>
            <P>
              The availability of the app and its features can depend on your device, operating
              system and location.
            </P>
            <P>
              Users looking for a tennis betting app in India should check the official 1xBet
              platform for current mobile availability and installation requirements.
            </P>
            <P>
              Avoid downloading applications from unknown third-party sources. Always verify that
              you&rsquo;re using an official source before entering account information.
            </P>
            <div className="pt-1">
              <Cta href="/#app" solid>Explore the Tennis Betting App</Cta>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="tn-card flex items-center justify-center p-8">
              <MonitorSmartphone className="h-20 w-20 text-tn-clay" strokeWidth={1.2} aria-hidden />
            </div>
          </div>
        </div>
      </Sec>

      {/* ====================== Live odds ====================== */}
      <Sec n={9} kicker="Live Tennis Odds" title="Odds Can Move During a Match" surface="grass">
        <div className="max-w-4xl space-y-4">
          <Lead>Live tennis odds can change as a match progresses.</Lead>
          <P>
            Tennis is particularly dynamic because a single game or set can alter the direction of
            a match. A break of serve, change in score or player retirement can affect the markets
            and odds displayed during live play.
          </P>
          <P>
            Users following live tennis markets should check the current event information rather
            than relying on odds viewed earlier.
          </P>
          <P>Markets can change, suspend or become unavailable as the match develops.</P>
          <P>The availability of live tennis markets depends on the individual event and location.</P>
        </div>
      </Sec>

      {/* ==================== Competitions ===================== */}
      <Sec n={10} kicker="Tennis Competitions" title="Follow Available Tennis Events" surface="hard" tinted>
        <div className="max-w-4xl space-y-4">
          <Lead>
            Professional tennis includes tournaments and events across different tours, surfaces
            and competition levels.
          </Lead>
          <P>
            Depending on current platform coverage, users may find available tennis events from
            different competitions.
          </P>
          <P>
            The exact selection can change according to the tennis calendar, tournament schedule
            and regional availability.
          </P>
          <P>
            When browsing a competition, users can select an available match to view the current
            markets and odds offered for that event.
          </P>
          <P>Always check the individual match page for the latest information.</P>
        </div>
      </Sec>

      {/* ========================= Why ========================= */}
      <Sec n={11} kicker="Why Choose 1xBet for Tennis?" title="A Dedicated Tennis Experience" surface="clay">
        <Lead>1xBet brings available tennis matches and markets together in one dedicated section.</Lead>

        <Rail
          className="mt-7"
          grid="sm:grid-cols-2 lg:grid-cols-3"
          gap="gap-3 sm:gap-4"
          card="82%"
          label="Why choose 1xBet for tennis"
        >
          {WHY.map(({ t, b, icon: Icon, s }) => (
            <div key={t} className="tn-card p-5">
              <span className={`flex h-10 w-10 items-center justify-center rounded-[5px] ${SURFACES[s].bg} text-white`}>
                <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
              </span>
              <h3 className="mt-4 text-[16px] font-extrabold tracking-[-0.01em] text-fg">{t}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">{b}</p>
            </div>
          ))}
        </Rail>

        <p className="mt-6 max-w-4xl text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">
          The exact tournaments, matches, markets and features available can vary according to
          location and current platform coverage.
        </p>
      </Sec>

      {/* ===================== Responsible ===================== */}
      <Sec n={12} kicker="Tennis Betting and Responsible Use" title="Keep Your Betting Within Your Limits" surface="grass" tinted>
        <Rail
          grid="sm:grid-cols-2 lg:grid-cols-3"
          gap="gap-3 sm:gap-4"
          card="86%"
          label="Responsible play guidance"
        >
          {RESPONSIBLE.map((text, i) => (
            <div key={i} className="tn-card flex gap-4 p-5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[4px] bg-tn-grass font-mono text-[12px] font-bold text-white">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-[14px] leading-relaxed text-fg-muted">{text}</p>
            </div>
          ))}
        </Rail>
      </Sec>

      {/* ========================= FAQ ========================= */}
      <section id="faq" className="scroll-mt-[68px] md:scroll-mt-[118px] border-t border-line bg-canvas py-8 sm:py-9 lg:py-11">
        <div className="mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <div className="tn-band inline-flex">
                  <span className="tn-seed bg-tn-hard">13</span>
                  <span className="tn-kicker">Frequently Asked Questions</span>
                </div>
                <h2 className="mt-5 text-[clamp(1.7rem,4vw,2.9rem)] font-extrabold leading-[1.06] tracking-[-0.04em] text-fg">
                  Tennis betting, answered
                </h2>
              </div>
            </div>
            <div className="lg:col-span-8">
              <Accordion items={faqEntries} />
            </div>
          </div>
        </div>
      </section>

      {/* ======================= Closing ======================= */}
      <Sec n={14} kicker="Explore Tennis Betting on 1xBet" title="Explore Tennis Betting on 1xBet" surface="hard" tinted>
        <div className="max-w-4xl space-y-4">
          <Lead>
            From tennis betting India and online tennis betting to selected live matches, 1xBet
            provides a dedicated place to browse available tennis fixtures and markets.
          </Lead>
          <P>
            Explore tennis betting markets, check current tennis betting odds, follow selected
            matches through live tennis betting and review live tennis odds where supported.
          </P>
          <P>
            Whether you&rsquo;re following a major tournament or a regular tour event, check the
            individual match page for the markets and odds currently available.
          </P>
          <P>
            Mobile users can also check the availability of the tennis betting app and supported
            mobile access options.
          </P>
          <P>
            Tennis events, markets, competitions and services can vary according to location and
            applicable regulations. Always check the latest information provided on the platform,
            review the relevant terms and participate responsibly.
          </P>

          <div className="grid grid-cols-2 gap-2.5 pt-2 sm:flex sm:flex-wrap sm:gap-3">
            <Cta href="#markets" solid>Explore Tennis Betting</Cta>
            <Cta href="/sports">Explore Sports</Cta>
          </div>
        </div>
      </Sec>
    </main>
  );
}
