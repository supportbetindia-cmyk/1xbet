'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Smartphone, Radio, TrendingUp, AlertTriangle } from 'lucide-react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { useSite } from '@/components/SiteChrome';
import { Accordion, AccordionEntry } from '@/components/ui/Accordion';
import { BallStrip, PitchDiagram, FormatCards } from '@/components/cricket/CricketVisuals';
import { useReveal } from '@/hooks/useReveal';
import { Rail } from '@/components/ui/Rail';

const FORMATS = [
  { name: 'T20', overs: '20', note: 'Twenty overs a side. A few deliveries can alter the balance of a game.', colour: '#007acc' },
  { name: 'Limited overs', overs: '50', note: 'Longer innings, different market shapes from the shorter format.', colour: '#0068b0' },
  { name: 'Test', overs: '5 days', note: 'Multi-day cricket. Markets differ again from limited-overs fixtures.', colour: '#0b4478' },
];

const FIXTURE_CHECKLIST = [
  'Teams and competition',
  'Match format',
  'Event date and status',
  'Available cricket betting markets',
  'Current cricket odds',
  'Live market availability',
  'Applicable terms and restrictions',
];

const WHY: [string, string][] = [
  ['Dedicated cricket markets', 'Browse available markets directly from cricket events instead of searching across unrelated categories.'],
  ['Live cricket options', 'Where supported, follow selected matches through available live markets while the game is in progress.'],
  ['Current odds', "Review the latest cricket odds shown for the market you're viewing."],
  ['IPL and T20 coverage', 'Find available markets for selected IPL and T20 fixtures.'],
  ['International cricket', 'Browse selected international matches and the markets offered for them.'],
  ['Mobile access', 'Use supported mobile options to check available cricket events and account features.'],
];

const RESPONSIBLE = [
  'Cricket betting involves financial risk. No market or outcome is guaranteed, and losses are possible.',
  'Only participate if you are legally permitted to do so and meet the applicable age and eligibility requirements in your location.',
  'Set a personal budget before participating and avoid using money needed for everyday expenses. Do not chase losses or increase spending because of a previous result.',
  'Live betting can move particularly quickly. If you choose to participate in live markets, take time to consider your decisions rather than reacting to every change during a match.',
  'If betting begins affecting your finances, work, relationships or everyday life, consider taking a break and seeking appropriate support.',
  'Always review the applicable terms and local requirements before using the service.',
];

const FAQS: [string, string][] = [
  ['What is cricket betting?', 'Cricket betting refers to the available betting markets associated with cricket matches and events. The markets offered can vary by competition, format, fixture and location.'],
  ['Is cricket betting available in India?', "Cricket betting India availability depends on the user's location, applicable laws, platform coverage and eligibility requirements. Users should confirm that the service is permitted in their jurisdiction before participating."],
  ['What is live cricket betting?', 'Live cricket betting refers to markets that are available while a cricket match is in progress. These markets and odds can change as the match develops.'],
  ['What are cricket betting markets?', 'Cricket betting markets are the different options offered for a particular cricket event. The available markets can vary depending on the match, competition and format.'],
  ['What are cricket odds?', 'Cricket odds are the prices displayed for available cricket markets. They can change before a match and, where live markets are available, while the match is being played.'],
  ['Can live cricket odds change?', 'Yes. Live cricket odds can change as the match progresses and new events occur. Users should always check the current information displayed for the market.'],
  ['What is IPL betting?', 'IPL betting refers to available betting markets for selected Indian Premier League matches. Availability can depend on the fixture, platform coverage and location.'],
  ['Where can I find IPL betting odds?', 'Where IPL markets are available, the relevant IPL betting odds are displayed on the individual event or market page.'],
  ['What is T20 betting?', 'T20 betting refers to available markets for Twenty20 cricket matches. The markets offered can vary between competitions and individual fixtures.'],
  ['What is international cricket betting?', 'International cricket betting covers available markets for selected international cricket fixtures. Availability depends on the match, platform coverage and location.'],
  ['Can I access cricket betting from a mobile device?', 'Where supported, users can access available cricket markets through the cricket betting app or supported mobile website options.'],
  ['Do cricket betting markets remain the same?', 'No. Markets can change depending on the event, match conditions, timing and platform availability. Live markets can change particularly quickly.'],
  ['Are cricket betting outcomes guaranteed?', 'No. Cricket matches have uncertain outcomes. Odds and betting markets do not guarantee a particular result.'],
];

/* Section shell: ghost numeral against a heavy left rule. Neither the sports
   page's filled navy bar nor the homepage's label stack. */
function Sec({
  id, n, kicker, title, blue = false, children,
}: {
  id: string; n: string; kicker: string; title: string; blue?: boolean; children: React.ReactNode;
}) {
  // Section content rises in on scroll. Without this the whole page below the
  // hero was completely static.
  const ref = useReveal<HTMLElement>({ selector: '[data-rv]', stagger: 0.05, y: 16 });

  return (
    <section id={id} ref={ref} className="relative scroll-mt-28">
      <span className="watermark" aria-hidden>{n}</span>

      <header data-rv className={`relative ck-head ${blue ? 'ck-head-blue' : ''}`}>
        <span className="ck-num block">{n}</span>
        <p className={`mt-2 text-[11px] font-extrabold uppercase tracking-[0.16em] ${blue ? 'text-brand-600' : 'text-pitch'}`}>
          {kicker}
        </p>
        <h2 className="mt-1 text-[clamp(1.7rem,3.6vw,2.75rem)] font-extrabold tracking-[-0.04em] text-fg">
          {title}
        </h2>
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
      className="group inline-flex min-h-[48px] items-center gap-2.5 rounded-[7px] border-2 border-pitch
                 bg-canvas px-6 text-[15px] font-extrabold text-pitch transition-all
                 hover:-translate-y-0.5 hover:bg-pitch hover:text-white
                 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}

export default function CricketPage() {
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
    const HIDDEN = '[data-c="k"],[data-c="h"],[data-c="p"],[data-c="cta"] > *,[data-c="ball"] > *';
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
        .from('[data-c="k"]', { opacity: 0, x: -12, duration: 0.45 })
        .from('[data-c="h"]', { opacity: 0, y: 24, duration: 0.7 }, '-=0.2')
        .from('[data-c="p"]', { opacity: 0, y: 14, duration: 0.55, stagger: 0.07 }, '-=0.35')
        .from('[data-c="cta"] > *', { opacity: 0, y: 12, duration: 0.45, stagger: 0.06 }, '-=0.3')
        .from('[data-c="ball"] > *', { opacity: 0, scale: 0.5, duration: 0.35, stagger: 0.05 }, '-=0.3');
    }, el);
    const watchdog = window.setTimeout(reveal, 4000);

    return () => {
      window.clearTimeout(watchdog);
      ctx.revert();
      reveal();
    };
  }, []);

  const faqEntries: AccordionEntry[] = FAQS.map(([q, a], i) => ({
    id: `ck-${i}`, question: q, answer: <p>{a}</p>,
  }));

  return (
    <main className="flex-1 overflow-x-clip">

      {/* ===== Hero — no imagery ===== */}
      <section ref={heroRef} data-hero className="relative overflow-hidden border-b border-line bg-canvas" aria-labelledby="ck-title">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: 'repeating-linear-gradient(90deg, rgba(10,125,84,0.07) 0 2px, transparent 2px 46px)',
            maskImage: 'linear-gradient(to bottom, #000 0%, transparent 82%)',
          }}
        />

        <div className="relative mx-auto w-full max-w-[1600px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
          <div data-c="k" className="flex items-center gap-3">
            <span className="badge-live">Live</span>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-pitch">
              Cricket Betting
            </span>
          </div>

          <h1 id="ck-title" data-c="h" className="mt-5 max-w-[16ch] text-[clamp(2.3rem,5.6vw,4.2rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-fg">
            Cricket Betting on <span className="text-pitch">1xBet</span>
          </h1>

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="flex flex-col space-y-4 lg:col-span-7">
              <p data-c="p" className="text-[18px] leading-relaxed text-fg">
                Cricket brings together strategy, timing and moments that can change a match in
                seconds. The cricket betting section on 1xBet gives users a dedicated place to
                browse available cricket events, review match information and explore the
                markets offered for each fixture.
              </p>
              <div className="hero-spill">
                <div data-c="p"><P>From domestic competitions and T20 matches to international cricket and selected live events, the available options can vary by competition, match and location.</P></div>
              <div data-c="p"><P>You can browse upcoming cricket fixtures, check the available cricket betting markets, review current cricket odds and access selected live markets where available.</P></div>
              <div data-c="p"><P>Whether you follow cricket regularly or are interested in a particular competition, check the information shown for each match before participating. Availability of services and markets can vary according to location and applicable regulations.</P></div>

                </div>

              <div data-c="cta" className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:items-center sm:gap-3 pt-2">
                <Link
                  href="#markets"
                  className="group inline-flex min-h-[54px] items-center gap-2.5 rounded-[7px] bg-pitch px-8
                             text-[16px] font-extrabold text-white shadow-[0_10px_26px_rgba(10,125,84,0.32)]
                             transition-all hover:-translate-y-0.5
                             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                >
                  Explore Cricket
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                </Link>
                <Link
                  href="#live"
                  className="inline-flex min-h-[54px] items-center rounded-[7px] border-2 border-navy-700 bg-canvas px-8
                             text-[16px] font-extrabold text-navy-700 transition-all hover:-translate-y-0.5
                             hover:bg-navy-700 hover:text-white
                             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                >
                  View Live Cricket
                </Link>
              </div>
            </div>

            {/* Over strip stands in for artwork — cricket's own visual shorthand */}
            <div className="lg:col-span-5">
              <div className="g-card lift p-5">
                <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-fg-dim">
                  How an over reads
                </span>
                <div data-c="ball" className="mt-4">
                  <BallStrip balls={['.', '1', '4', '.', 'W', '6']} />
                </div>
                <div className="ck-seam mt-5" aria-hidden />
                <p className="mt-4 text-[13px] leading-relaxed text-fg-dim">
                  A wicket, boundary or change in run rate can move the markets shown for a
                  match. Illustration only — not a live scorecard or price feed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1600px] space-y-9 px-4 py-14 sm:px-6 lg:px-10 lg:space-y-11 lg:py-20">

        {/* ===== 01 Markets ===== */}
        <Sec id="markets" n="01" kicker="Cricket Betting Markets" title="Explore Markets for Available Matches">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="space-y-4 lg:col-span-7">
              <Lead>Every cricket match can offer different betting markets depending on the competition, format, teams and stage of the event.</Lead>
              <P>The cricket betting markets available on 1xBet may include options connected with the match and its performance. The exact markets shown can change before an event and, where live markets are available, while the match is being played.</P>
              <P>When viewing a cricket fixture, check the market name, available options, current odds and relevant event information before making a decision.</P>
              <P>Markets are not identical across every match. A market available for an IPL fixture may not necessarily be available for an international Test or T20 match.</P>
              <P>This makes the individual event page the best place to check what is currently available.</P>
              <div className="pt-2"><Cta href="/casino">Explore Cricket Markets</Cta></div>
            </div>

            <div className="lg:col-span-5">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-fg-dim">
                Formats differ, so markets differ
              </span>
              <div className="mt-4"><FormatCards formats={FORMATS} /></div>
            </div>
          </div>
        </Sec>

        {/* ===== 02 Live ===== */}
        <Sec id="live" n="02" kicker="Live Cricket Betting" title="Follow the Match as It Happens" blue>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="space-y-4 lg:col-span-7">
              <Lead>Live cricket betting allows users to view selected markets while a match is already in progress.</Lead>
              <P>Cricket can change quickly. A wicket, boundary, partnership, change in run rate or a shift in the match situation can affect the markets and odds displayed during the event.</P>
              <P>Because live markets can change quickly, the information shown on the platform should always be checked before participating. An option or price visible earlier in the match may no longer be available.</P>
              <P>Live cricket betting is not available for every match or in every location. The platform will display the live markets available for eligible events.</P>
              <div className="pt-2"><Cta href="/casino">Explore Live Cricket</Cta></div>
            </div>

            <div className="lg:col-span-5">
              <div className="g-card lift p-5">
                <span className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-fg-dim">
                  <Radio className="h-3.5 w-3.5 text-brand-600" aria-hidden />
                  What can move a market
                </span>
                <ul className="mt-4 space-y-2">
                  {['A wicket', 'A boundary', 'A partnership', 'A change in run rate', 'A shift in the match situation'].map((t) => (
                    <li key={t} className="flex items-center gap-3 rounded-[6px] border-2 border-line px-3 py-2.5 text-[15px] font-semibold text-fg">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-pitch" aria-hidden />
                      {t}
                    </li>
                  ))}
                </ul>
                <div className="mt-5"><BallStrip label="Over" balls={['.', 'W', '4', 'wd', '2', '6']} /></div>
              </div>
            </div>
          </div>
        </Sec>

        {/* ===== 03 Odds ===== */}
        <Sec id="odds" n="03" kicker="Cricket Odds" title="Check Current Cricket Odds">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="space-y-4 lg:col-span-7">
              <Lead>Cricket odds show the prices displayed for available betting markets. They can change as new information becomes available before or during a match.</Lead>
              <P>For upcoming matches, odds can be influenced by factors such as team information, competition context and market activity. During a live match, changes on the field can lead to movements in the available live cricket odds.</P>
              <P>Odds should always be checked on the current event page rather than relying on information seen elsewhere.</P>
              <p className="border-l-[5px] border-pitch pl-4 text-[16px] font-semibold leading-relaxed text-fg">
                Most importantly, odds do not guarantee an outcome. Cricket matches remain
                unpredictable, and users should understand the financial risks involved before
                participating.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="g-card overflow-hidden">
                <table className="ck-card">
                  <thead>
                    <tr><th>Stage</th><th>What can shift it</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Before the match</td><td>Team information and competition context</td></tr>
                    <tr><td>Market activity</td><td>Movement across available markets</td></tr>
                    <tr><td>During play</td><td>Changes on the field during a live match</td></tr>
                  </tbody>
                </table>
                <p className="border-t border-line px-4 py-3 text-[12px] leading-snug text-fg-dim">
                  <TrendingUp className="mr-1.5 inline h-3.5 w-3.5 text-brand-600" aria-hidden />
                  Illustration of when prices move. Not a live market and not a price feed.
                </p>
              </div>
            </div>
          </div>
        </Sec>

        {/* ===== 04 IPL ===== */}
        <Sec id="ipl" n="04" kicker="IPL Betting" title="Follow the Indian Premier League" blue>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="space-y-4 lg:col-span-8">
              <Lead>The Indian Premier League is one of the best-known T20 cricket competitions, bringing together teams and players from around the world.</Lead>
              <P>Selected IPL betting markets may be available on 1xBet depending on the match, platform coverage and regional availability.</P>
              <P>Users can browse available IPL fixtures and review the markets and IPL betting odds displayed for each match.</P>
              <P>Where live markets are offered, the available options and odds can change as the IPL match progresses.</P>
              <P>The availability of IPL markets can vary by season, fixture and location, so always check the current event information on the platform.</P>
              <div className="pt-2"><Cta href="/casino">Explore IPL Betting</Cta></div>
            </div>

            <div className="lg:col-span-4">
              <div className="feature-panel feature-panel-accent p-6 sm:p-8">
                <div className="relative">
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-white/70">
                    Format
                  </span>
                  <p className="figure-hero mt-3 text-[clamp(3.4rem,7vw,5rem)]">T20</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-white/85">
                    Twenty overs a side. Availability varies by season, fixture and location.
                  </p>
                  <div className="mt-6 h-px w-full bg-white/25" aria-hidden />
                  <p className="mt-4 text-[13px] text-white/70">
                    Check the current event information on the platform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Sec>

        {/* ===== 05 T20 ===== */}
        <Sec id="t20" n="05" kicker="T20 Betting" title="Fast-Paced Cricket, Changing Markets">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="space-y-4 lg:col-span-7">
              <Lead>T20 betting covers available markets for Twenty20 cricket matches.</Lead>
              <P>With only 20 overs per side, T20 matches can change quickly. A few deliveries can alter the balance of a game, which can also affect the markets and odds displayed during the event.</P>
              <P>Available T20 markets depend on the competition and individual fixture. Users can check upcoming T20 matches and review the options currently displayed for each event.</P>
              <P>T20 coverage may include selected domestic and international competitions, subject to platform and regional availability.</P>
            </div>
            <div className="lg:col-span-5">
              <div className="g-card lift p-5">
                <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-fg-dim">
                  A few deliveries can alter the balance
                </span>
                <div className="mt-4 space-y-3">
                  <BallStrip label="Ov 17" balls={['1', '.', '4', '6', '2', '1']} />
                  <BallStrip label="Ov 18" balls={['6', 'W', '.', '4', '1', '6']} />
                  <BallStrip label="Ov 19" balls={['.', '2', 'W', '.', '1', '4']} />
                </div>
                <p className="mt-4 text-[13px] leading-relaxed text-fg-dim">
                  Illustration of how a short format swings. Not a live scorecard.
                </p>
              </div>
            </div>
          </div>
        </Sec>

        {/* ===== 06 International ===== */}
        <Sec id="international" n="06" kicker="International Cricket Betting" title="Follow International Fixtures" blue>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="space-y-4 lg:col-span-7">
              <Lead>Cricket is played across different countries and formats, creating a wide range of international fixtures throughout the year.</Lead>
              <P>International cricket betting covers available markets for selected international matches. The available options can vary depending on the format, competition, teams and individual fixture.</P>
              <P>Users can review upcoming international matches, check the available markets and view the current information provided for each event.</P>
              <P>Whether a match is scheduled as a limited-overs fixture or another supported format, always check the individual event page for the latest available markets and odds.</P>
            </div>

            {/* Field diagram — drawn, since the project has no cricket photography */}
            <div className="lg:col-span-5">
              <div className="g-card lift overflow-hidden p-5">
                <PitchDiagram className="mx-auto block w-full max-w-[300px]" />
                <p className="mt-4 text-center text-[13px] leading-relaxed text-fg-dim">
                  Formats and competitions differ across the international calendar, and the
                  markets offered differ with them.
                </p>
              </div>
            </div>
          </div>
        </Sec>

        {/* ===== 07 Match betting ===== */}
        <Sec id="match" n="07" kicker="Cricket Match Betting" title="Review the Match Before You Decide">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="space-y-4 lg:col-span-7">
              <Lead>Cricket match betting gives users access to available markets associated with individual cricket fixtures.</Lead>
              <P>Before participating, take time to review the match information displayed on the platform. This can include the teams involved, competition, format, event status, available markets and current odds.</P>
              <P>Different matches can offer different markets. The options available for one fixture should not be assumed to apply to another.</P>
              <P>For live matches, information can change as the game develops, making it particularly important to check the current event details.</P>
            </div>
            <div className="lg:col-span-5">
              <div className="g-card overflow-hidden">
                <table className="ck-card">
                  <thead><tr><th>Check on the event page</th></tr></thead>
                  <tbody>
                    {['Teams involved', 'Competition', 'Format', 'Event status', 'Available markets', 'Current odds'].map((t) => (
                      <tr key={t}><td>{t}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Sec>

        {/* ===== 08 India ===== */}
        <Sec id="india" n="08" kicker="Cricket Betting in India" title="Cricket Betting India" blue>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="space-y-4">
              <Lead>Cricket has a large following in India, with interest spanning domestic competitions, the IPL and international cricket.</Lead>
              <P>Cricket betting in India is subject to regional availability and applicable laws. Users should confirm that using the service is permitted in their location and that they meet the relevant eligibility requirements before participating.</P>
            </div>
            <div className="space-y-4">
              <P>Where cricket markets are available, users may be able to browse selected domestic, T20 and international fixtures through the cricket section.</P>
              <P>The available competitions and markets can change, so the current platform information should always be treated as the most relevant source.</P>
            </div>
          </div>
        </Sec>

        {/* ===== 09 App ===== */}
        <Sec id="app" n="09" kicker="Cricket Betting App" title="Follow Cricket on Mobile">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="space-y-4 lg:col-span-7">
              <Lead>The cricket betting app provides a mobile option for users who want to access supported cricket markets from a compatible device.</Lead>
              <P>Through supported mobile access, registered users may be able to browse cricket fixtures, review available markets and check their account without relying solely on a desktop browser.</P>
              <P>The availability of the app and its features can depend on the device, operating system and location.</P>
              <P>If you&rsquo;re looking for mobile access, use the official 1xBet platform to check the current application options and requirements for your device.</P>
            </div>
            <div className="flex items-start lg:col-span-5">
              <Link
                href="/#app"
                className="group inline-flex min-h-[54px] w-full items-center justify-between gap-3 rounded-[7px]
                           border-2 border-navy-700 bg-canvas px-6 text-[16px] font-extrabold text-navy-700
                           transition-all hover:-translate-y-0.5 hover:bg-navy-700 hover:text-white
                           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                <span className="flex items-center gap-2.5">
                  <Smartphone className="h-5 w-5" aria-hidden />
                  Explore the 1xBet App
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
          </div>
        </Sec>

        {/* ===== 10 Fixtures ===== */}
        <Sec id="fixtures" n="10" kicker="Find Upcoming Cricket Matches" title="Browse Available Fixtures" blue>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="space-y-4 lg:col-span-6">
              <Lead>The cricket section provides a place to find available upcoming fixtures and review the markets offered for each event.</Lead>
              <P>Depending on the current schedule and platform coverage, you may find matches from different competitions and formats.</P>
              <P>Match schedules, markets and odds can change, so always use the current information displayed for the event.</P>
            </div>
            <div className="lg:col-span-6">
              <div className="g-card overflow-hidden">
                <table className="ck-card">
                  <thead><tr><th style={{ width: '56px' }}>#</th><th>When choosing a fixture, check</th></tr></thead>
                  <tbody>
                    {FIXTURE_CHECKLIST.map((item, i) => (
                      <tr key={item}>
                        <td className="font-mono">{String(i + 1).padStart(2, '0')}</td>
                        <td className="!font-semibold !text-fg">{item}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Sec>

        {/* ===== 11 Why ===== */}
        <Sec id="why" n="11" kicker="Why Choose 1xBet for Cricket?" title="A Dedicated Cricket Experience">
          <Lead>The cricket section brings the information most relevant to cricket users together in one place.</Lead>

          <Rail className="mt-7" grid="sm:grid-cols-2 lg:grid-cols-3" gap="gap-3 sm:gap-4" card="82%" label="Why bet on cricket">
            {WHY.map(([t, b], i) => (
              <div key={t} className="g-card g-card-hover overflow-hidden">
                <div className="h-1.5 w-full" style={{ background: i % 2 ? '#007acc' : '#002f5e' }} aria-hidden />
                <div className="p-5">
                  <h3 className="text-[16px] font-extrabold tracking-[-0.02em] text-fg">{t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{b}</p>
                </div>
              </div>
            ))}
          </Rail>

          <p className="mt-6 text-[15px] leading-relaxed text-fg-muted">
            The exact competitions, markets and features available can vary by location and
            platform coverage.
          </p>
        </Sec>

        {/* ===== 12 Responsible ===== */}
        <Sec id="responsible" n="12" kicker="Cricket Betting and Responsible Use" title="Keep Your Decisions Within Your Limits" blue>
          <Rail grid="sm:grid-cols-2" gap="gap-3 sm:gap-4" card="82%" label="Responsible play guidance">
            {RESPONSIBLE.map((text, i) => (
              <div key={i} className="flex gap-4 rounded-[8px] border-2 border-line bg-canvas p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] bg-navy-700 font-mono text-[12px] font-bold text-white">
                  {String(i + 1).padStart(2, '0')}
                </span>
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
        <Sec id="faq" n="13" kicker="Frequently Asked Questions" title="Cricket betting, answered">
          <Accordion items={faqEntries} />
        </Sec>

        {/* ===== Closing ===== */}
        <section>
          {/* Heading at the container edge — inside the card its padding pushed
              it out of line with every other heading on the page. */}
          <h2 className="text-[clamp(1.6rem,3.2vw,2.4rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-fg">
            Explore Cricket Betting on 1xBet
          </h2>

          <div className="g-card mt-7 overflow-hidden">
          <div className="h-2 w-full bg-pitch" aria-hidden />
          <div className="grid grid-cols-1 gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <div className="space-y-3">
                <P>From cricket betting in India and international fixtures to IPL betting, T20 betting and selected live matches, 1xBet provides a dedicated place to browse available cricket markets.</P>
                <P>Check upcoming fixtures, review cricket betting markets, compare the current cricket odds shown for available events and explore live cricket betting where supported.</P>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
                <button
                  onClick={openAuth}
                  className="inline-flex min-h-[52px] cursor-pointer items-center rounded-[7px] bg-pitch px-7
                             text-[15px] font-extrabold text-white shadow-[0_10px_24px_rgba(10,125,84,0.3)]
                             transition-all hover:-translate-y-0.5
                             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                >
                  Register
                </button>
                <Link
                  href="/sports"
                  className="inline-flex min-h-[52px] items-center rounded-[7px] border-2 border-navy-700 px-7
                             text-[15px] font-extrabold text-navy-700 transition-all hover:bg-navy-700 hover:text-white
                             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                >
                  All Sports
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              <P>Mobile users can also check the availability of the cricket betting app and other supported mobile options.</P>
              <p className="border-t border-line pt-4 text-[13px] leading-relaxed text-fg-dim">
                Markets, competitions, features and services can vary according to location and
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
