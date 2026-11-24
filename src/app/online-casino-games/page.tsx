'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Radio, Smartphone, Globe2, Layers, ScrollText,
  SlidersHorizontal, UserRound, Dice5,
} from 'lucide-react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { Accordion, AccordionEntry } from '@/components/ui/Accordion';
import { useReveal } from '@/hooks/useReveal';
import { Rail } from '@/components/ui/Rail';
import { RouletteRing, ChipStack, SuitGlyph, Suit } from '@/components/casino/CasinoVisuals';
import { FlipCard } from '@/components/casino/FlipCard';

/* Suits cycle through the sections the way they cycle through a deck. */
const SUITS: Suit[] = ['spade', 'heart', 'diamond', 'club'];
/* Card values stand in for section indices — no other page numbers this way. */
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

const GAME_TYPES = [
  'Table games',
  'Live dealer games',
  'Roulette',
  'Blackjack',
  'Baccarat',
  'Other supported casino games',
];

/* The content pairs each game with its live counterpart, so they are presented
   as one panel with two halves rather than six separate sections. */
const GAMES: {
  name: string; suit: Suit;
  onlineTitle: string; online: string[]; onlineCta?: string;
  liveTitle: string; live: string[];
}[] = [
  {
    name: 'Roulette', suit: 'diamond',
    onlineTitle: 'Explore Roulette Online',
    online: [
      'Online roulette is a casino game built around a numbered wheel and ball, with players selecting from available betting options before the outcome is determined.',
      'Different roulette formats can have different rules, layouts and features. The exact version available on the platform should be checked before playing.',
      'Where supported, users may also find live roulette, which uses a live dealer format rather than an automated game environment.',
    ],
    onlineCta: 'Explore Online Roulette',
    liveTitle: 'Follow a Live Roulette Table',
    live: [
      'Live roulette combines the traditional roulette format with a live dealer experience.',
      'Where available, users can join a supported live table, review the displayed game information and follow the round through the live interface.',
      'Live tables can differ in limits, schedules and availability. Always check the current table details and rules before participating.',
    ],
  },
  {
    name: 'Blackjack', suit: 'spade',
    onlineTitle: 'Play Blackjack Online',
    online: [
      'Online blackjack is a card game in which players play against the dealer according to the rules of the specific blackjack variation.',
      'Different versions of blackjack can use different rules, limits and features. Before playing, review the rules provided for the individual table or game.',
      'Where supported, users may also be able to explore live blackjack with a live dealer.',
    ],
    onlineCta: 'Explore Online Blackjack',
    liveTitle: 'Experience Blackjack With a Live Dealer',
    live: [
      'Live blackjack provides a live dealer format for selected blackjack games.',
      'Users can view the live table through the supported interface and follow the game as it takes place.',
      'Available tables, limits, schedules and game formats can vary. Always check the current table information before joining.',
    ],
  },
  {
    name: 'Baccarat', suit: 'heart',
    onlineTitle: 'Discover Baccarat Online',
    online: [
      'Online baccarat is a card game with a simple structure based around the Player, Banker and Tie outcomes.',
      'Different baccarat versions can have different rules and features, so users should review the information provided for the specific game before playing.',
      'Where available, users can also explore live baccarat through supported live dealer tables.',
    ],
    onlineCta: 'Explore Online Baccarat',
    liveTitle: 'Follow a Live Baccarat Table',
    live: [
      'Live baccarat brings baccarat into a live dealer environment.',
      'Where supported, users can browse available tables, review the game information and follow the dealer-led rounds through the online interface.',
      'Table availability, limits and game formats can vary, so always check the current information before participating.',
    ],
  },
];

const CHOOSE: { suit: Suit; value: string; t: string; b: string }[] = [
  { suit: 'spade',   value: 'A', t: 'Game format',
    b: 'Decide whether you prefer a traditional digital game, table game or live dealer format.' },
  { suit: 'heart',   value: '2', t: 'Rules',
    b: 'Read the rules provided for the specific game before participating.' },
  { suit: 'diamond', value: '3', t: 'Limits',
    b: 'Check any displayed minimum and maximum limits.' },
  { suit: 'club',    value: '4', t: 'Game information',
    b: 'Review the features and conditions associated with the individual game.' },
  { suit: 'spade',   value: '5', t: 'Availability',
    b: 'Confirm that the game is currently available in your location.' },
];

const WHY: { t: string; b: string; icon: React.ElementType }[] = [
  { t: 'Multiple game formats', icon: Layers,
    b: 'Browse available table, digital and live dealer games.' },
  { t: 'Live casino access', icon: Radio,
    b: 'Where supported, explore live dealer experiences.' },
  { t: 'Popular casino formats', icon: Dice5,
    b: 'Find selected roulette, blackjack and baccarat games.' },
  { t: 'Mobile access', icon: Smartphone,
    b: 'Use supported mobile options to browse available casino games.' },
  { t: 'Game information', icon: ScrollText,
    b: 'Review the rules and details associated with individual games.' },
  { t: 'Central account access', icon: UserRound,
    b: 'Registered users can access supported casino features through their account.' },
];

const RESPONSIBLE = [
  'Casino games involve financial risk. Outcomes are not guaranteed, and losses can occur.',
  'Only participate where you are legally permitted to do so and where you meet the applicable age and eligibility requirements.',
  'Set a personal budget before playing and avoid using money needed for everyday expenses.',
  'Do not chase losses or increase spending because a previous game did not produce the result you wanted.',
  'Take regular breaks and avoid playing when you are tired, upset or making decisions under pressure.',
  'If gambling begins affecting your finances, relationships, work or everyday responsibilities, consider taking a break and seeking appropriate support.',
  'Always review the applicable terms, limits and local requirements before using the service.',
];

const FAQS: [string, string][] = [
  ['What is an online casino?', 'An online casino is a digital platform that provides access to supported casino-style games through online devices. Available games and services vary by platform and location.'],
  ['What online casino games are available?', 'Available online casino games can vary, but may include roulette, blackjack, baccarat, table games and selected live dealer formats.'],
  ['Is online casino available in India?', 'Online casino India availability depends on the user’s specific location, applicable regulations, platform coverage and eligibility. Users should verify the current rules that apply to their jurisdiction before participating.'],
  ['What is a live casino?', 'A live casino provides selected casino games through a live dealer environment. Available games and tables depend on current platform coverage.'],
  ['What are live casino games?', 'Live casino games are casino games presented through a live dealer format. They may include live roulette, live blackjack and live baccarat where supported.'],
  ['What is online roulette?', 'Online roulette is a digital version of roulette where players select available options before the wheel outcome is determined. Specific rules can vary by version.'],
  ['What is live roulette?', 'Live roulette uses a live dealer format, allowing users to follow the roulette game through a live-streamed interface where supported.'],
  ['What is online blackjack?', 'Online blackjack is a digital card game played according to the rules of the selected blackjack variation. Rules and limits can vary between games.'],
  ['What is live blackjack?', 'Live blackjack is a live dealer version of blackjack available through supported online tables.'],
  ['What is online baccarat?', 'Online baccarat is a digital card game featuring Player, Banker and Tie outcomes. Specific game rules can vary by version.'],
  ['What is live baccarat?', 'Live baccarat provides a live dealer format for selected baccarat games through supported online tables.'],
  ['Is there a casino app?', 'Where supported, users can access available casino features through the casino app or compatible mobile website options.'],
  ['Can casino games be played on mobile?', 'Where mobile access is supported and permitted in your location, users can browse available games through supported mobile devices.'],
  ['Are online casino outcomes guaranteed?', 'No. Casino game outcomes are uncertain. There are no guaranteed wins or guaranteed results.'],
  ['Can casino games have different rules?', 'Yes. Different versions of the same game can have different rules, limits and features. Always check the individual game information before playing.'],
  ['How can I check whether online casinos are permitted in my location?', 'Check the current laws and regulatory requirements applicable to your specific jurisdiction. Do not assume that a service being accessible online means it is legally permitted where you live.'],
];

/* ---------------------------------------------------------------- shells -- */

/**
 * Section shell. The head is a playing-card corner pip — value over suit —
 * with the kicker and title beside it. `light` is the exception here, not the
 * rule: this page runs dark and lifts to a pale band occasionally.
 */
function Sec({
  id, n, kicker, title, light = false, children,
}: {
  id?: string; n: number; kicker: string; title: string;
  light?: boolean; children: React.ReactNode;
}) {
  const ref = useReveal<HTMLElement>({ selector: '[data-rv]', stagger: 0.05, y: 16 });
  const suit = SUITS[(n - 1) % SUITS.length];
  const value = VALUES[(n - 1) % VALUES.length];

  return (
    <section
      id={id}
      ref={ref}
      className={`relative scroll-mt-[68px] md:scroll-mt-[118px] overflow-hidden border-t py-10 sm:py-12 lg:py-15 ${
        light ? 'border-line bg-surface-1' : 'cs-dark border-white/10 bg-cs-night'
      }`}
    >
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <div data-rv className="flex items-center gap-4 sm:gap-5">
          <span className="cs-pip">
            <span>{value}</span>
            <SuitGlyph suit={suit} className="cs-pip-suit" />
          </span>
          <span className="min-w-0">
            <span className="block text-[11px] font-extrabold uppercase tracking-[0.2em] text-cs-gold">
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
      className={`group inline-flex min-h-[50px] items-center justify-center gap-2.5 rounded-[4px] px-4 text-[14px] font-extrabold
                  transition-all hover:-translate-y-0.5 sm:px-6 sm:text-[15px]
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cs-gold ${
        solid
          ? 'cs-cta-solid bg-cs-gold shadow-[0_10px_28px_rgba(168,128,26,0.3)] hover:brightness-110'
          : 'border-2 border-line-strong bg-canvas text-fg hover:border-cs-gold hover:bg-surface-1'
      }`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}

/* ------------------------------------------------------------------ page -- */

export default function OnlineCasinoPage() {
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = heroRef.current;
    if (!el || prefersReducedMotion()) return;
    if (document.visibilityState === 'hidden') return;

    // `gsap.from` writes opacity:0 inline the moment the tween exists, so a
    // timeline that never finishes leaves these invisible for good. Clearing on
    // every exit path makes that state unreachable.
    const HIDDEN = '[data-x="k"],[data-x="h"],[data-x="p"],[data-x="cta"] > *,[data-x="wheel"],[data-x="chips"]';
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
        .from('[data-x="k"]', { opacity: 0, y: -10, duration: 0.45 })
        .from('[data-x="h"]', { opacity: 0, y: 26, duration: 0.75 }, '-=0.2')
        .from('[data-x="p"]', { opacity: 0, y: 14, duration: 0.5, stagger: 0.07 }, '-=0.4')
        .from('[data-x="cta"] > *', { opacity: 0, y: 12, duration: 0.45, stagger: 0.06 }, '-=0.3')
        .from('[data-x="chips"] > *', { opacity: 0, y: 18, duration: 0.4, stagger: 0.06 }, '-=0.35')
        .from('[data-x="wheel"]', { opacity: 0, scale: 0.9, rotate: -25, duration: 0.9 }, '-=0.7');
    }, el);

    const watchdog = window.setTimeout(reveal, 4000);
    return () => {
      window.clearTimeout(watchdog);
      ctx.revert();
      reveal();
    };
  }, []);

  const faqEntries: AccordionEntry[] = FAQS.map(([q, a], i) => ({
    id: `cs-${i}`, question: q, answer: <p>{a}</p>,
  }));

  return (
    <main className="flex-1 overflow-x-clip">

      {/* ========================= Hero ========================= */}
      <section
        ref={heroRef}
        data-hero
        className="cs-floor cs-dark relative overflow-hidden"
        aria-labelledby="casino-title"
      >
        <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 pt-9 pb-10 sm:px-6 sm:py-14 lg:px-10 lg:py-18">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">

            <div className="flex flex-col lg:col-span-7">
              <div data-x="k" className="flex items-center gap-2.5">
                {SUITS.map((s) => (
                  <SuitGlyph key={s} suit={s} className="text-[17px] leading-none" />
                ))}
                <span className="ml-1 text-[11px] font-extrabold uppercase tracking-[0.22em] text-cs-gold">
                  Online Casino
                </span>
              </div>

              <h1
                id="casino-title"
                data-x="h"
                className="mt-5 text-[clamp(2.2rem,5.8vw,4.4rem)] font-extrabold leading-[0.99] tracking-[-0.05em] text-fg"
              >
                Online Casino on{' '}
                <span className="text-cs-gold [text-shadow:0_0_30px_rgba(232,198,87,0.4)]">1xBet</span>
              </h1>

              <p data-x="p" className="mt-5 max-w-[60ch] text-[16px] leading-relaxed text-fg sm:text-[18px]">
                Discover the online casino section on 1xBet, bringing available casino games and
                supported gaming options together in one place.
              </p>

              <div className="hero-spill">
                <p data-x="p" className="mt-4 max-w-[66ch] text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">
                  Users can browse available online casino games, explore different game categories
                  and access selected casino experiences through supported desktop and mobile
                  platforms. Depending on availability, the selection may include table games, live
                  dealer experiences and other casino formats.
                </p>

                <p data-x="p" className="mt-4 max-w-[66ch] text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">
                  For users searching for online casino India, availability depends on location,
                  applicable regulations, platform coverage and eligibility requirements. Always
                  confirm that the service is permitted in your jurisdiction before participating.
                </p>

                <p data-x="p" className="mt-4 max-w-[66ch] text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">
                  Whether you prefer casino online access from a desktop browser or want to explore
                  supported mobile options through the casino app, check the current platform
                  availability and applicable terms before playing.
                </p>
              </div>

              <div data-x="cta" className="mt-7 grid grid-cols-2 gap-2.5 sm:mt-8 sm:flex sm:flex-wrap sm:gap-3">
                <Cta href="#games" solid>Explore Online Casino</Cta>
                <Cta href="#tables">View Casino Games</Cta>
              </div>

              <div data-x="chips" className="mt-9">
                <ChipStack />
              </div>
            </div>

            <div data-x="wheel" className="lg:col-span-5">
              <div className="mx-auto w-full max-w-[260px] sm:max-w-[320px] lg:max-w-[420px]">
                <RouletteRing className="h-auto w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== Explore games ==================== */}
      <Sec id="games" n={2} kicker="Explore Online Casino Games" title="Find Games That Match Your Style">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 lg:col-span-7">
            <Lead>
              The online casino games available on 1xBet can include different formats, features and
              styles of play.
            </Lead>
            <P>Depending on current platform coverage, users may find:</P>

            {/* Game types as a felt-topped list rather than another card grid */}
            <ul className="cs-card divide-y divide-line !bg-none">
              {GAME_TYPES.map((g, i) => (
                <li key={g} className="flex items-center gap-4 px-5 py-3">
                  <SuitGlyph suit={SUITS[i % SUITS.length]} className="text-[15px] leading-none" />
                  <span className="text-[14px] font-semibold text-fg sm:text-[15px]">{g}</span>
                </li>
              ))}
            </ul>

            <P>
              Each game can have its own rules, format and features. Before playing, take time to
              understand how the individual game works and review any relevant information displayed
              on the platform.
            </P>
            <P>
              The available selection can change according to location, platform coverage and
              applicable requirements.
            </P>
            <div className="pt-1">
              <Cta href="#tables">Explore Casino Games</Cta>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="cs-felt cs-dark rounded-[6px] border border-white/10 p-6 sm:p-8">
              <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-cs-gold">
                On the table
              </p>
              <ChipStack className="mt-6" />
              <p className="mt-6 border-t border-white/10 pt-4 text-[13px] leading-relaxed text-white/60">
                Illustration only — no game, balance or outcome is represented.
              </p>
            </div>
          </div>
        </div>
      </Sec>

      {/* ====================== Casino games ==================== */}
      <Sec id="tables" n={3} kicker="Casino Games" title="Different Games, Different Experiences" light>
        <div className="max-w-4xl space-y-4">
          <Lead>
            Casino games can range from traditional table formats to live dealer experiences and
            other online gaming options.
          </Lead>
          <P>Players can browse the available categories and select a game based on the format they prefer.</P>
          <P>
            For example, roulette focuses on numbered outcomes, blackjack is based around comparing
            hands against the dealer, while baccarat uses a different card-game format.
          </P>
          <P>
            Rules and gameplay can vary between individual versions of a game. Always review the
            rules before participating rather than assuming that every version works in exactly the
            same way.
          </P>
          <div className="pt-1">
            <Cta href="#roulette">Browse Casino Games</Cta>
          </div>
        </div>
      </Sec>

      {/* ======================= Live casino =================== */}
      <Sec n={4} kicker="Live Casino" title="A Live Dealer Experience Online">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="space-y-4">
            <Lead>
              Live casino brings selected casino games into a live-streamed environment, allowing
              users to follow a dealer-led game through supported online platforms.
            </Lead>
            <P>
              Depending on availability, live casino games may include formats such as live
              roulette, live blackjack and live baccarat.
            </P>
            <P>The available games, tables and features can vary according to location and platform coverage.</P>
            <P>Before joining a live table, check the displayed game information, rules and applicable limits.</P>
            <div className="pt-1">
              <Cta href="#roulette" solid>Explore Live Casino</Cta>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-cs-gold">
              Live Casino Games — Explore Selected Live Tables
            </p>
            <Lead>Live casino games combine online access with a live dealer environment.</Lead>
            <P>
              Where supported, users can browse available live tables and review the information
              provided for each game before joining.
            </P>
            <P>
              The experience can vary between tables, game formats and available limits. Tables may
              also have different schedules and availability.
            </P>
            <P>Always check the current information displayed on the individual table before participating.</P>
          </div>
        </div>
      </Sec>

      {/* ============= Games: online + live, paired ============= */}
      {GAMES.map((g, gi) => (
        <Sec
          key={g.name}
          id={gi === 0 ? 'roulette' : undefined}
          n={5 + gi}
          kicker={`Online ${g.name} & Live ${g.name}`}
          title={g.onlineTitle}
          light={gi === 1}
        >
          {/* Two halves of one table: the automated game and the dealt one */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="cs-card p-6 sm:p-7">
              <div className="flex items-center gap-2.5">
                <SuitGlyph suit={g.suit} className="text-[18px] leading-none" />
                <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-fg-dim">
                  Online {g.name}
                </span>
              </div>
              <div className="mt-4 space-y-3.5">
                {g.online.map((t, i) => (i === 0 ? <Lead key={i}>{t}</Lead> : <P key={i}>{t}</P>))}
              </div>
              {g.onlineCta && (
                <div className="mt-5">
                  <Cta href="#india">{g.onlineCta}</Cta>
                </div>
              )}
            </div>

            <div className="cs-felt cs-dark rounded-[6px] border border-white/10 p-6 sm:p-7">
              <div className="flex items-center gap-2.5">
                <span className="live-dot" aria-hidden />
                <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/70">
                  Live {g.name}
                </span>
              </div>
              <h3 className="mt-3 text-[19px] font-extrabold tracking-[-0.02em] text-white">
                {g.liveTitle}
              </h3>
              <div className="mt-4 space-y-3.5">
                {g.live.map((t, i) => (
                  <p key={i} className="text-[15px] leading-relaxed text-white/78">{t}</p>
                ))}
              </div>
            </div>
          </div>
        </Sec>
      ))}

      {/* ========================= India ======================== */}
      <Sec id="india" n={8} kicker="Online Casino India" title="Check Availability for Your Location">
        <div className="max-w-4xl space-y-4">
          <Lead>
            Users searching for online casino India should first confirm whether the relevant casino
            service is legally available in their specific location.
          </Lead>
          <P>
            The regulatory position surrounding online gambling and casino-style games can differ
            between jurisdictions. Availability on a website should not automatically be treated as
            confirmation that the service is permitted everywhere.
          </P>
          <P>
            Users should check the latest applicable requirements, meet all eligibility conditions
            and participate only where permitted.
          </P>
          <P>The games and features available on the platform can also vary depending on location.</P>
          <div className="pt-1">
            <Cta href="#choose">Check Casino Availability</Cta>
          </div>
        </div>
      </Sec>

      {/* ========================== App ========================= */}
      <Sec n={9} kicker="Casino App" title="Access Casino Games on Mobile" light>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-4 lg:col-span-7">
            <Lead>
              The casino app provides a mobile-focused way to access supported casino games from a
              compatible device.
            </Lead>
            <P>
              Registered users may be able to browse available games, access their account and use
              supported casino features through mobile access.
            </P>
            <P>App availability and functionality can depend on your device, operating system and location.</P>
            <P>
              If you&rsquo;re looking for a mobile casino experience, use the official 1xBet platform
              to check current app availability and installation requirements.
            </P>
            <P>Avoid downloading account-related applications from unknown third-party sources.</P>
            <div className="pt-1">
              <Cta href="/#app" solid>Explore the Casino App</Cta>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="cs-card flex items-center justify-center p-10">
              <Smartphone className="h-20 w-20 text-cs-gold" strokeWidth={1.1} aria-hidden />
            </div>
          </div>
        </div>
      </Sec>

      {/* ====================== Casino online =================== */}
      <Sec n={10} kicker="Casino Online" title="A Convenient Way to Explore Casino Games">
        <div className="max-w-4xl space-y-4">
          <Lead>
            Casino online access allows users to browse supported games without relying on a
            physical casino location.
          </Lead>
          <P>
            The experience can include different game categories, live dealer options and
            mobile-compatible features depending on platform availability.
          </P>
          <P>
            Before selecting a game, review its rules, format, limits and any other information
            provided on the platform.
          </P>
          <P>The selection of games and features can vary by location and applicable regulations.</P>
        </div>
      </Sec>

      {/* ======================== Choose ======================== */}
      <Sec id="choose" n={11} kicker="How to Choose an Online Casino Game" title="Understand the Game Before You Play">
        <div className="max-w-4xl space-y-4">
          <Lead>
            With different online casino games available, choosing a game should start with
            understanding how it works.
          </Lead>
          <P>Consider:</P>
        </div>

        {/* Turn the cards over — the page's own interaction, not an accordion */}
        <Rail
          className="mt-7"
          grid="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          gap="gap-3 sm:gap-4"
          card="76%"
          label="What to consider when choosing a game"
        >
          {CHOOSE.map((c) => (
            <FlipCard key={c.t} suit={c.suit} value={c.value} title={c.t} body={c.b} />
          ))}
        </Rail>

        <p className="mt-7 max-w-4xl text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">
          Understanding the game before playing can help you make informed decisions rather than
          choosing based only on appearance or popularity.
        </p>
      </Sec>

      {/* ========================== Why ========================= */}
      <Sec n={12} kicker="Why Explore the 1xBet Online Casino?" title="A Dedicated Casino Experience" light>
        <Lead>The 1xBet casino section brings supported games and casino formats together in one place.</Lead>

        <Rail
          className="mt-8"
          grid="sm:grid-cols-2 lg:grid-cols-3"
          gap="gap-3 sm:gap-4"
          card="82%"
          label="Why explore the 1xBet online casino"
        >
          {WHY.map(({ t, b, icon: Icon }) => (
            <div key={t} className="cs-card p-6">
              <Icon className="h-7 w-7 text-cs-gold" strokeWidth={1.5} aria-hidden />
              <h3 className="mt-4 text-[16px] font-extrabold tracking-[-0.01em] text-fg">{t}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">{b}</p>
            </div>
          ))}
        </Rail>

        <p className="mt-7 max-w-4xl text-[15px] leading-relaxed text-fg-muted sm:text-[16px]">
          The exact games, tables, features and services available can vary according to location
          and platform coverage.
        </p>
      </Sec>

      {/* ====================== Responsible ===================== */}
      <Sec n={13} kicker="Responsible Online Casino Play" title="Play Within Your Limits">
        <ul className="divide-y divide-line border-y border-line">
          {RESPONSIBLE.map((text, i) => (
            <li key={i} className="flex items-start gap-4 py-4 sm:gap-6">
              <span className="mt-0.5 font-mono text-[12px] font-bold text-cs-gold">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-[14px] leading-relaxed text-fg-muted sm:text-[15px]">{text}</p>
            </li>
          ))}
        </ul>
      </Sec>

      {/* ========================== FAQ ========================= */}
      <section id="faq" className="cs-dark scroll-mt-[68px] md:scroll-mt-[118px] border-t border-white/10 bg-cs-night py-10 sm:py-12 lg:py-15">
        <div className="mx-auto w-full max-w-[1100px] px-4 sm:px-6 lg:px-10">
          {/* Narrow measure, centred — every other FAQ on the site is a wide
              two-column or sidebar split. */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2.5">
              {SUITS.map((s) => (
                <SuitGlyph key={s} suit={s} className="text-[16px] leading-none" />
              ))}
            </div>
            <p className="mt-4 text-[11px] font-extrabold uppercase tracking-[0.2em] text-cs-gold">
              Frequently Asked Questions
            </p>
            <h2 className="mt-2 text-[clamp(1.7rem,4.2vw,2.9rem)] font-extrabold leading-[1.05] tracking-[-0.042em] text-fg">
              The casino, answered
            </h2>
          </div>

          <div className="mt-9">
            <Accordion items={faqEntries} />
          </div>
        </div>
      </section>

      {/* ======================== Closing ======================= */}
      <Sec n={14} kicker="Explore the Online Casino on 1xBet" title="Explore the Online Casino on 1xBet">
        <div className="max-w-4xl space-y-4">
          <Lead>
            Explore online casino games, browse supported casino games, discover selected live
            casino games and check available roulette, blackjack and baccarat formats.
          </Lead>
          <P>
            Whether you&rsquo;re looking for online casino India, casino online access or the casino
            app, always begin by checking current availability for your location and device.
          </P>
          <P>
            Where supported, you can explore online roulette, online blackjack, online baccarat,
            live roulette, live blackjack and live baccarat.
          </P>
          <P>
            Game availability, tables, features and services can vary according to location and
            applicable regulations. Always review the latest information, understand the game rules
            and participate responsibly.
          </P>

          <div className="grid grid-cols-2 gap-2.5 pt-2 sm:flex sm:flex-wrap sm:gap-3">
            <Cta href="#games" solid>Explore the Online Casino</Cta>
            <Cta href="#tables">View Casino Games</Cta>
          </div>
        </div>
      </Sec>
    </main>
  );
}
