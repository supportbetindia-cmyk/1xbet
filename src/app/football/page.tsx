'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Smartphone, Radio, TrendingUp, AlertTriangle, Trophy } from 'lucide-react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { useSite } from '@/components/SiteChrome';
import { Accordion, AccordionEntry } from '@/components/ui/Accordion';
import { MatchTimeline, CardPair, PitchMarkings, MatchEvent } from '@/components/football/FootballVisuals';
import { useReveal } from '@/hooks/useReveal';
import { Rail } from '@/components/ui/Rail';

const TIMELINE: MatchEvent[] = [
  { minute: 12, kind: 'goal', label: 'Goal' },
  { minute: 31, kind: 'yellow', label: 'Yellow card' },
  { minute: 58, kind: 'sub', label: 'Substitution' },
  { minute: 67, kind: 'pen', label: 'Penalty' },
  { minute: 82, kind: 'red', label: 'Red card' },
];

const MATCH_CHECKLIST = [
  'Teams and competition',
  'Match date and time',
  'Event status',
  'Available football betting markets',
  'Current football odds',
  'Live market availability',
  'Applicable terms and restrictions',
];

const WHY: [string, string][] = [
  ['Football-focused markets', 'Browse available markets directly from football events.'],
  ['Pre-match access', 'Review upcoming fixtures and available markets before matches begin.'],
  ['Live football', 'Where supported, follow selected matches through available live markets.'],
  ['Current odds', 'Check the latest football betting odds displayed for available markets.'],
  ['Mobile access', 'Use supported mobile options to browse football events and access your account.'],
  ['Multiple competitions', 'Explore available fixtures from different supported football competitions.'],
];

const RESPONSIBLE = [
  'Football betting involves financial risk. No football market or outcome guarantees a particular result, and losses can occur.',
  'Only participate if you are legally permitted to use the service and meet the applicable age and eligibility requirements in your location.',
  'Set a personal budget before participating and avoid using money needed for everyday expenses.',
  'Do not chase losses or increase your spending because a previous result did not go as expected.',
  'Live football can move particularly quickly, so take time to consider your decisions instead of reacting to every goal, card or match event.',
  'If betting begins affecting your finances, relationships, work or everyday responsibilities, consider taking a break and seeking appropriate support.',
  'Always review the applicable terms and local requirements before using the service.',
];

const FAQS: [string, string][] = [
  ['What is football betting?', 'Football betting refers to the available betting markets associated with football matches and competitions. The markets offered can vary depending on the fixture, competition and location.'],
  ['Is football betting available in India?', "Football betting India availability depends on the user's location, applicable regulations, platform coverage and eligibility. Users should confirm that the service is permitted in their jurisdiction before participating."],
  ['What is online football betting?', 'Online football betting allows users to access available football markets through an online platform. Available matches, markets and services can vary by location.'],
  ['What is live football betting?', 'Live football betting refers to selected markets available while a football match is in progress. Live markets and odds can change as the match develops.'],
  ['What are football betting odds?', 'Football betting odds are the prices displayed for available football markets. They can change before a match and during live betting.'],
  ['Can live football odds change?', 'Yes. Live football odds can change as a match develops and new information becomes available. Users should always check the current information shown for the event.'],
  ['What are football betting markets?', 'Football betting markets are the different options available for a particular football match. The markets can differ depending on the competition, fixture and event status.'],
  ['What is football match betting?', 'Football match betting refers to the available markets associated with an individual football fixture.'],
  ['What is soccer betting?', 'Soccer betting is another term used for football-related betting, particularly in markets where the sport is commonly called soccer.'],
  ['Is soccer betting available in India?', 'Soccer betting India availability depends on location, applicable laws, platform availability and user eligibility. Users should check the current requirements before participating.'],
  ['Is there a football betting app?', 'Where supported, users can access football markets through the football betting app or compatible mobile website options.'],
  ['Is there a football betting app in India?', 'Users looking for a football betting app India option should check the official 1xBet platform for current mobile availability and device requirements.'],
  ['What is live soccer betting?', 'Live soccer betting refers to selected football markets available while a match is in progress. Markets and odds can change quickly during live play.'],
  ['Are football betting outcomes guaranteed?', 'No. Football matches have uncertain outcomes. Odds and markets do not guarantee a particular result.'],
];

/* Section head: shirt number in a solid square, titles stacked beside it,
   heavy rule beneath the block. Horizontal — unlike the cricket page's stacked
   ghost numeral or the sports page's filled bar. */
function Sec({
  id, n, kicker, title, alt = false, children,
}: {
  id: string; n: string; kicker: string; title: string; alt?: boolean; children: React.ReactNode;
}) {
  const ref = useReveal<HTMLElement>({ selector: '[data-rv]', stagger: 0.05, y: 16 });

  return (
    <section id={id} ref={ref} className="relative scroll-mt-28">
      <span className="watermark" aria-hidden>{n}</span>

      <header data-rv className="relative fb-head">
        <span className={`fb-num ${alt ? 'fb-num-alt' : ''}`} aria-hidden>{n}</span>
        <span className="min-w-0 self-center">
          <span className="block text-[11px] font-extrabold uppercase tracking-[0.16em] text-brand-600">
            {kicker}
          </span>
          <h2 className="mt-1 text-[clamp(1.6rem,3.4vw,2.6rem)] font-extrabold tracking-[-0.04em] text-fg">
            {title}
          </h2>
        </span>
      </header>
      <div data-rv className="relative mt-7">{children}</div>
    </section>
  );
}

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[16px] leading-relaxed text-fg-muted">{children}</p>
);

const Lead = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[18px] font-semibold leading-relaxed text-fg">{children}</p>
);

function Cta({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex min-h-[48px] items-center gap-2.5 rounded-[6px] bg-navy-700 px-6
                 text-[15px] font-extrabold text-white transition-all hover:-translate-y-0.5 hover:bg-brand-500
                 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}

export default function FootballPage() {
  const { openAuth } = useSite();
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = heroRef.current;
    if (!el || prefersReducedMotion()) return;
    // Backgrounded tab: rAF is suspended, so a .from() would strip the hero to
    // its start state and never play it back in. Leave it painted.
    if (document.visibilityState === 'hidden') return;

    // `gsap.from` writes opacity:0 inline as soon as the tween exists, so a
    // timeline that never finishes leaves these invisible for good. Clearing on
    // every exit path makes that state unreachable.
    const HIDDEN = '[data-f="k"],[data-f="h"],[data-f="p"],[data-f="cta"] > *,[data-f="board"]';
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
        .from('[data-f="k"]', { opacity: 0, x: -12, duration: 0.45 })
        .from('[data-f="h"]', { opacity: 0, y: 24, duration: 0.7 }, '-=0.2')
        .from('[data-f="p"]', { opacity: 0, y: 14, duration: 0.5, stagger: 0.06 }, '-=0.35')
        .from('[data-f="cta"] > *', { opacity: 0, y: 12, duration: 0.45, stagger: 0.06 }, '-=0.3')
        .from('[data-f="board"]', { opacity: 0, x: 20, duration: 0.6 }, '-=0.45');
    }, el);
    const watchdog = window.setTimeout(reveal, 4000);

    return () => {
      window.clearTimeout(watchdog);
      ctx.revert();
      reveal();
    };
  }, []);

  const faqEntries: AccordionEntry[] = FAQS.map(([q, a], i) => ({
    id: `fb-${i}`, question: q, answer: <p>{a}</p>,
  }));

  return (
    <main className="flex-1 overflow-x-clip">

      {/* ===== Hero ===== */}
      <section ref={heroRef} data-hero className="relative overflow-hidden border-b-[3px] border-fg bg-canvas" aria-labelledby="fb-title">
        <div aria-hidden className="fb-stripes pointer-events-none absolute inset-0 opacity-70"
             style={{ maskImage: 'linear-gradient(to bottom, #000 0%, transparent 80%)' }} />

        <div className="relative mx-auto w-full max-w-[1600px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">

            <div className="lg:col-span-7">
              <div data-f="k" className="flex items-center gap-3">
                <span className="badge-live">Live</span>
                <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand-600">
                  Football Betting
                </span>
                <CardPair />
              </div>

              <h1 id="fb-title" data-f="h" className="mt-5 max-w-[15ch] text-[clamp(2.3rem,5.6vw,4.2rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-fg">
                Football Betting on <span className="text-brand-600">1xBet</span>
              </h1>

              <div className="mt-6 flex flex-col space-y-4">
                <p data-f="p" className="text-[18px] leading-relaxed text-fg">
                  Football is followed around the world, from major international competitions to
                  domestic leagues and individual matches. The football betting section on 1xBet
                  gives users a dedicated place to browse available football fixtures, review match
                  information and explore the markets offered for each event.
                </p>
                <div className="hero-spill">
                <div data-f="p"><P>Whether you are interested in football betting India, online football betting, or selected live matches, the available options can vary according to the competition, fixture, location and current platform coverage.</P></div>
                <div data-f="p"><P>Browse upcoming football matches, check available football betting markets, review current football betting odds and explore selected live events where supported.</P></div>
                <div data-f="p"><P>Always review the information displayed for the individual match and check the applicable terms and local requirements before participating.</P></div>
                </div>

              </div>

              <div data-f="cta" className="mt-8 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
                <Link
                  href="#markets"
                  className="group inline-flex min-h-[54px] items-center gap-2.5 rounded-[6px] bg-brand-500 px-8
                             text-[16px] font-extrabold text-white shadow-[0_10px_26px_rgba(0,122,204,0.32)]
                             transition-all hover:-translate-y-0.5 hover:bg-brand-600
                             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                >
                  Explore Football
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                </Link>
                <Link
                  href="#live"
                  className="inline-flex min-h-[54px] items-center rounded-[6px] border-[3px] border-fg bg-canvas px-8
                             text-[16px] font-extrabold text-fg transition-all hover:-translate-y-0.5
                             hover:bg-fg hover:text-canvas
                             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                >
                  Live Football
                </Link>
              </div>
            </div>

            {/* Ninety-minute board stands in for artwork */}
            <div data-f="board" className="lg:col-span-5">
              <div className="g-card p-5 sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-fg-dim">
                    How a match moves markets
                  </span>
                  <span className="fb-min">90&rsquo;</span>
                </div>
                <div className="mt-5"><MatchTimeline events={TIMELINE} /></div>
                <p className="mt-5 border-t border-line pt-4 text-[13px] leading-relaxed text-fg-dim">
                  Illustration of the events that can change available markets. Not a live match,
                  scoreboard or price feed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1600px] space-y-9 px-4 py-14 sm:px-6 lg:px-10 lg:space-y-11 lg:py-20">

        {/* ===== 01 Markets ===== */}
        <Sec id="markets" n="01" kicker="Explore Football Betting Markets" title="Different Matches, Different Markets">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="space-y-4 lg:col-span-7">
              <Lead>Football matches can offer a range of betting markets depending on the competition, teams, match stage and event status.</Lead>
              <P>The football betting markets available for one match may differ from those offered for another. Before participating, users can review the individual event page to see the available options and current football odds.</P>
              <P>Markets can also change as an event approaches or, where live markets are available, while the match is being played.</P>
              <P>Checking the current match information is therefore important rather than relying on previously viewed odds or markets.</P>
              <div className="pt-2"><Cta href="/casino">View Football Markets</Cta></div>
            </div>
            <div className="lg:col-span-5">
              <div className="g-card lift overflow-hidden p-5">
                <PitchMarkings className="mx-auto block w-full max-w-[340px]" />
                <p className="mt-4 text-center text-[13px] leading-relaxed text-fg-dim">
                  Markets differ by competition, teams, match stage and event status.
                </p>
              </div>
            </div>
          </div>
        </Sec>

        {/* ===== 02 Odds ===== */}
        <Sec id="odds" n="02" kicker="Football Betting Odds" title="Check the Current Football Odds" alt>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="space-y-4 lg:col-span-7">
              <Lead>Football betting odds provide the prices displayed for available football markets.</Lead>
              <P>Odds can change before a match begins as new information becomes available. Where live markets are supported, they can also move during the match as the score and game situation change.</P>
              <P>For example, a goal, red card, penalty or other major event can affect the available markets and live football odds.</P>
              <p className="border-l-[5px] border-brand-500 pl-4 text-[16px] font-semibold leading-relaxed text-fg">
                The odds displayed on the current event page should always be treated as the
                relevant information. Odds do not guarantee a particular result, and football
                matches can have unpredictable outcomes.
              </p>
            </div>
            <div className="lg:col-span-5">
              <div className="g-card lift p-5">
                <span className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-fg-dim">
                  <TrendingUp className="h-3.5 w-3.5 text-brand-600" aria-hidden />
                  Events that can move a price
                </span>
                <ul className="mt-4 space-y-2">
                  {[
                    ['A goal', 'bg-fg'],
                    ['A red card', 'bg-[#d4342c]'],
                    ['A penalty', 'bg-brand-700'],
                    ['Another major event', 'bg-[#e8b02a]'],
                  ].map(([t, dot]) => (
                    <li key={t} className="flex items-center gap-3 rounded-[6px] border-2 border-line px-3 py-2.5">
                      <span className={`h-3 w-3 shrink-0 rounded-full ${dot}`} aria-hidden />
                      <span className="text-[15px] font-semibold text-fg">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Sec>

        {/* ===== 03 Live ===== */}
        <Sec id="live" n="03" kicker="Live Football Betting" title="Follow the Match as It Happens">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="space-y-4 lg:col-span-7">
              <Lead>Live football betting allows users to explore selected markets while a football match is already in progress.</Lead>
              <P>A football match can change quickly. A goal, substitution, injury, penalty or red card can alter the situation within seconds, which can also affect available markets and odds.</P>
              <P>When live soccer betting markets are available, users can follow the event and review the options currently displayed on the platform.</P>
              <P>Live markets can change or close as the match develops. Always check the latest information before participating.</P>
              <P>Live football betting is not necessarily available for every match or in every location.</P>
              <div className="pt-2"><Cta href="/casino">Explore Live Football</Cta></div>
            </div>
            <div className="lg:col-span-5">
              <div className="g-card lift p-5">
                <span className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-fg-dim">
                  <Radio className="h-3.5 w-3.5 text-brand-600" aria-hidden />
                  Seconds can change the situation
                </span>
                <div className="mt-4"><MatchTimeline events={TIMELINE} /></div>
              </div>
            </div>
          </div>
        </Sec>

        {/* ===== 04 Match betting ===== */}
        <Sec id="match" n="04" kicker="Football Match Betting" title="Review the Match Before You Decide" alt>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="space-y-4 lg:col-span-6">
              <Lead>Football match betting gives users access to available markets associated with individual football fixtures.</Lead>
              <P>Different fixtures can have different markets. A market available for one competition should not automatically be assumed to be available for another.</P>
              <P>The individual event page provides the most relevant information about the markets currently available for that match.</P>
            </div>
            <div className="lg:col-span-6">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-fg-dim">
                Before participating, review the information shown for the match, including
              </span>
              <ol className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {MATCH_CHECKLIST.map((item, i) => (
                  <li key={item} className="flex items-center gap-3 rounded-[6px] border-2 border-line bg-canvas px-3 py-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[4px] bg-navy-700 font-mono text-[12px] font-bold text-white">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[14px] font-semibold leading-snug text-fg">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Sec>

        {/* ===== 05 India ===== */}
        <Sec id="india" n="05" kicker="Football Betting India" title="Football Betting for Users in India">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4">
              <Lead>Football has a large following in India, with interest in both international competitions and football leagues around the world.</Lead>
              <P>Football betting India availability depends on the user&rsquo;s location, applicable regulations, platform coverage and eligibility requirements.</P>
              <P>Users in India should confirm that using the relevant service is permitted in their location before participating. Age and other eligibility requirements may also apply.</P>
            </div>
            <div className="space-y-4">
              <P>Where football markets are available, users can browse supported fixtures and review the markets offered for individual events.</P>
              <P>The available competitions, matches and markets can change over time, so users should always refer to the current information displayed on the platform.</P>
            </div>
          </div>
        </Sec>

        {/* ===== 06 Online ===== */}
        <Sec id="online" n="06" kicker="Online Football Betting" title="Browse Football Markets Online" alt>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4">
              <Lead>Online football betting provides access to available football events through an online platform.</Lead>
              <P>Users can browse upcoming fixtures, review available football betting markets and check the current odds displayed for individual matches.</P>
            </div>
            <div className="space-y-4">
              <P>The selection can include different competitions and match types depending on platform coverage and location.</P>
              <P>If you are looking for football betting online, always use the official platform and check the current availability of the match or competition you&rsquo;re interested in.</P>
            </div>
          </div>
        </Sec>

        {/* ===== 07 Soccer ===== */}
        <Sec id="soccer" n="07" kicker="Soccer Betting" title="Football and Soccer Markets">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="space-y-4 lg:col-span-8">
              <Lead>Football is also commonly searched for as soccer, particularly in some international markets.</Lead>
              <P>Soccer betting refers to the same broad category of football-related betting markets. Depending on the platform and region, users may encounter either &ldquo;football&rdquo; or &ldquo;soccer&rdquo; terminology when searching for available events.</P>
              <P>Users interested in soccer betting India should check the current availability of football markets for their location and confirm that participation is permitted under applicable requirements.</P>
              <P>The available markets depend on the individual match and competition.</P>
            </div>
            <div className="lg:col-span-4">
              <div className="g-card overflow-hidden">
                <div className="bg-navy-700 px-5 py-4">
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-brand-200">
                    Same sport, two words
                  </span>
                </div>
                <div className="divide-y divide-line">
                  {[['Football', 'Common in most regions'], ['Soccer', 'Common in some international markets']].map(([a, b]) => (
                    <div key={a} className="px-5 py-4">
                      <span className="block text-[17px] font-extrabold text-fg">{a}</span>
                      <span className="mt-0.5 block text-[13px] text-fg-muted">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Sec>

        {/* ===== 08 App ===== */}
        <Sec id="app" n="08" kicker="Football Betting App" title="Access Football Markets on Mobile" alt>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="space-y-4 lg:col-span-7">
              <Lead>The football betting app provides a mobile-focused way to access supported football markets from a compatible device.</Lead>
              <P>Registered users may be able to browse available football fixtures, review match information and check available markets through supported mobile options.</P>
              <P>The availability of the app and its features can depend on your device, operating system and location.</P>
              <P>Users looking for a football betting app India option should check the official 1xBet platform for the latest information about supported mobile access and installation requirements.</P>
              <p className="border-l-[5px] border-[#d4342c] pl-4 text-[16px] font-semibold leading-relaxed text-fg">
                Avoid downloading applications from unknown third-party sources. Always verify
                that you are using an official source before entering account information.
              </p>
              <div className="pt-2"><Cta href="/#app">Explore Mobile Football Betting</Cta></div>
            </div>
            <div className="flex items-start lg:col-span-5">
              <div className="g-card w-full p-6">
                <Smartphone className="h-6 w-6 text-brand-600" aria-hidden />
                <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
                  Availability of the app and its features can depend on your device, operating
                  system and location.
                </p>
              </div>
            </div>
          </div>
        </Sec>

        {/* ===== 09 Live odds ===== */}
        <Sec id="live-odds" n="09" kicker="Live Football Odds" title="Odds Can Change During a Match">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4">
              <Lead>Live football odds can change as a match develops.</Lead>
              <P>A goal can immediately alter the match situation. Other events, such as a penalty, red card, substitution or injury, can also affect the markets displayed during live play.</P>
              <P>For users following live soccer betting, it is important to check the current information shown on the event page rather than relying on odds viewed earlier.</P>
            </div>
            <div className="space-y-4">
              <P>Live markets may change, suspend or become unavailable as the match progresses.</P>
              <P>The availability of live football markets depends on the individual event and location.</P>
              <div className="fb-rule mt-6" aria-hidden />
            </div>
          </div>
        </Sec>

        {/* ===== 10 Competitions ===== */}
        <Sec id="competitions" n="10" kicker="Football Competitions" title="Explore Available Football Events" alt>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="space-y-4 lg:col-span-7">
              <Lead>Football is played across many leagues, tournaments and international competitions.</Lead>
              <P>Depending on current platform coverage, users may find available events from different football competitions.</P>
              <P>The exact selection can change according to the football calendar, match schedule and regional availability.</P>
              <P>When browsing a competition, check the available fixtures and then open the individual match to see the markets currently offered.</P>
              <P>This approach makes it easier to distinguish between upcoming matches, live events and markets that are currently unavailable.</P>
            </div>
            <div className="lg:col-span-5">
              <div className="g-card lift p-5">
                <span className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-fg-dim">
                  <Trophy className="h-3.5 w-3.5 text-brand-600" aria-hidden />
                  How to browse
                </span>
                <ol className="mt-4 space-y-3">
                  {['Open a competition', 'Check the available fixtures', 'Open the individual match', 'Review the markets currently offered'].map((t, i) => (
                    <li key={t} className="flex items-start gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-500 font-mono text-[12px] font-bold text-white">
                        {i + 1}
                      </span>
                      <span className="pt-1 text-[15px] font-semibold leading-snug text-fg">{t}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </Sec>

        {/* ===== 11 Why ===== */}
        <Sec id="why" n="11" kicker="Why Use 1xBet for Football?" title="A Dedicated Football Experience">
          <Lead>1xBet brings available football fixtures and markets together in one dedicated section.</Lead>

          <Rail className="mt-7" grid="sm:grid-cols-2 lg:grid-cols-3" gap="gap-3 sm:gap-4" card="82%" label="Why bet on football">
            {WHY.map(([t, b], i) => (
              <div key={t} className="g-card g-card-hover flex gap-4 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] bg-navy-700 font-display text-[15px] font-extrabold text-white">
                  {i + 1}
                </span>
                <span>
                  <h3 className="text-[16px] font-extrabold tracking-[-0.02em] text-fg">{t}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-fg-muted">{b}</p>
                </span>
              </div>
            ))}
          </Rail>

          <p className="mt-6 text-[15px] leading-relaxed text-fg-muted">
            The exact matches, competitions, markets and features available can vary according to
            location and platform coverage.
          </p>
        </Sec>

        {/* ===== 12 Responsible ===== */}
        <Sec id="responsible" n="12" kicker="Football Betting and Responsible Use" title="Keep Your Betting Within Your Limits" alt>
          <Rail grid="sm:grid-cols-2" gap="gap-3 sm:gap-4" card="82%" label="Responsible play guidance">
            {RESPONSIBLE.map((text, i) => (
              <div key={i} className="flex gap-4 rounded-[8px] border-2 border-line bg-canvas p-5">
                <span className="fb-min shrink-0 self-start">{String(i + 1).padStart(2, '0')}</span>
                <p className="text-[15px] leading-relaxed text-fg-muted">{text}</p>
              </div>
            ))}
          </Rail>
          <p className="mt-5 flex items-center gap-2 text-[14px] font-semibold text-fg">
            <AlertTriangle className="h-4 w-4 text-brand-600" aria-hidden />
            <Link href="/responsible-gaming" className="underline underline-offset-2 hover:text-brand-600">
              Player safety tools
            </Link>
          </p>
        </Sec>

        {/* ===== 13 FAQ ===== */}
        <Sec id="faq" n="13" kicker="Frequently Asked Questions" title="Football betting, answered">
          <Accordion items={faqEntries} />
        </Sec>

        {/* ===== Closing ===== */}
        <section>
          {/* Heading at the container edge, not inside the card's padding. */}
          <h2 className="text-[clamp(1.6rem,3.2vw,2.4rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-fg">
            Explore Football Betting on 1xBet
          </h2>

          <div className="g-card mt-7 overflow-hidden">
          <div className="h-2 w-full bg-brand-500" aria-hidden />
          <div className="grid grid-cols-1 gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <div className="space-y-3">
                <P>From football betting India and online football betting to selected live matches, 1xBet provides a dedicated place to browse available football fixtures and markets.</P>
                <P>Explore football betting markets, check current football betting odds, follow selected events through live football betting and review live football odds where supported.</P>
              </div>
              <div className="mt-7 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
                <button
                  onClick={openAuth}
                  className="inline-flex min-h-[52px] cursor-pointer items-center rounded-[6px] bg-brand-500 px-7
                             text-[15px] font-extrabold text-white shadow-[0_10px_24px_rgba(0,122,204,0.3)]
                             transition-all hover:-translate-y-0.5 hover:bg-brand-600
                             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                >
                  Register
                </button>
                <Link
                  href="/sports"
                  className="inline-flex min-h-[52px] items-center rounded-[6px] border-[3px] border-fg px-7
                             text-[15px] font-extrabold text-fg transition-all hover:bg-fg hover:text-canvas
                             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                >
                  All Sports
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              <P>Whether you search for soccer betting, soccer betting India, or traditional football markets, availability depends on the individual event, location and current platform coverage.</P>
              <P>Mobile users can also check the availability of the football betting app and supported mobile access options.</P>
              <p className="border-t border-line pt-4 text-[13px] leading-relaxed text-fg-dim">
                Football markets, competitions and services can vary according to location and
                applicable regulations. Always check the latest information provided on the
                platform, review the relevant terms and participate responsibly.
              </p>
            </div>
          </div>
          </div>
        </section>
      </div>
    </main>
  );
}
