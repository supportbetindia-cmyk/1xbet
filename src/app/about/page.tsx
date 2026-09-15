'use client';

import React, { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight, Radio, Dice5, Smartphone, UserRound, Compass,
  Globe2, ShieldCheck, Trophy,
} from 'lucide-react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import { useSite } from '@/components/SiteChrome';
import { Accordion, AccordionEntry } from '@/components/ui/Accordion';
import { useReveal } from '@/hooks/useReveal';
import StarBurst from '@/components/ui/Background';
import NeonBorder from '@/components/ui/NeonBorder';
import { Rail } from '@/components/ui/Rail';

const SPORT_LIST = [
  'Cricket', 'Football', 'Soccer', 'Tennis',
  'Basketball', 'Badminton', 'Horse racing', 'Other supported sports',
];

const SPORTS: { name: string; body: string; colour: string; href: string }[] = [
  { name: 'Cricket', colour: '#0a7d54', href: '/cricket',
    body: 'Explore available cricket matches and markets across supported competitions and formats.' },
  { name: 'Football & Soccer', colour: '#007acc', href: '/football',
    body: 'Browse available football and soccer fixtures, competitions and markets, including selected live events where supported.' },
  { name: 'Tennis', colour: '#1866ab', href: '/tennis',
    body: 'Follow available tennis matches and tournaments and review the markets offered for individual fixtures.' },
  { name: 'Basketball', colour: '#b64d1a', href: '/basketball',
    body: 'Browse available basketball games and competitions and check the markets and current information provided for each event.' },
  { name: 'Badminton', colour: '#0b82e0', href: '/sports',
    body: 'Explore available badminton matches and supported markets across selected competitions.' },
  { name: 'Horse Racing', colour: '#8e1f38', href: '/horse-racing',
    body: 'Browse supported racing events and review the markets and information available for individual races.' },
];

const CASINO_FORMATS = ['Roulette', 'Blackjack', 'Baccarat', 'Live casino games', 'Other supported casino formats'];

const WHY: { t: string; b: string; icon: React.ElementType }[] = [
  { t: 'Multiple Sports', icon: Trophy, b: 'Explore supported cricket, football, soccer, tennis, basketball, badminton, horse racing and other sports.' },
  { t: 'Live Markets', icon: Radio, b: 'Follow selected sporting events through available live markets where supported.' },
  { t: 'Casino Games', icon: Dice5, b: 'Browse supported online casino games and selected live dealer experiences.' },
  { t: 'Mobile Access', icon: Smartphone, b: 'Access supported platform features through compatible mobile and web experiences.' },
  { t: 'Event Information', icon: Compass, b: 'Review current information, markets and odds associated with individual sporting events.' },
  { t: 'Account Access', icon: UserRound, b: 'Use your registered account to access supported platform features and manage relevant account information.' },
];

const RESPONSIBLE = [
  'Betting and casino gaming involve financial risk. Outcomes are uncertain, and users can lose money.',
  'Only participate where you are legally permitted to do so and where you meet the applicable age and eligibility requirements.',
  'Set a personal budget before participating and avoid using money needed for essential expenses. Do not chase losses or increase spending to recover previous losses.',
  'Take regular breaks and keep betting or gaming within limits that you can afford.',
  'If gambling begins affecting your finances, relationships, work or everyday responsibilities, consider taking a break and seeking appropriate support.',
  'Always review the relevant terms, responsible-gaming information and local requirements before using the platform.',
];

const FAQS: [string, string][] = [
  ['What is 1xBet?', '1xBet is an online sports and gaming platform offering access to supported sports betting, live betting and online gaming experiences.'],
  ['What sports are available on 1xBet?', 'Depending on current platform coverage, users may find cricket, football, soccer, tennis, basketball, badminton, horse racing and other supported sports.'],
  ['Does 1xBet offer casino games?', 'Where supported, 1xBet provides access to available online casino games and selected live dealer experiences.'],
  ['Can I use 1xBet on mobile?', 'Where supported, users can access 1xBet through compatible mobile and web options. Availability depends on the device and location.'],
  ['Does 1xBet provide live betting?', 'Selected sporting events may offer live betting markets. Live availability depends on the event and location, and markets can change during an event.'],
  ['How can I create a 1xBet account?', 'Eligible users can follow the official registration process and provide the information requested by the platform, subject to applicable requirements.'],
  ['How do I access my 1xBet account?', 'Registered users can use the official login or sign-in option to access their account and supported features.'],
  ['Is 1xBet available everywhere?', 'No. Services, sports, markets, casino games and mobile features can vary according to location, platform coverage and applicable regulations.'],
  ['Is betting or gaming on 1xBet risk-free?', 'No. Betting and casino gaming involve financial risk. There are no guaranteed outcomes, and users can lose money.'],
  ['How can I contact 1xBet customer support?', 'Users can access the customer-support options provided through the official 1xBet platform for account and service-related assistance.'],
];

/* Section shell. No numerals — all three sport pages use them, so this page
   is identified by a solid accent bar and a wider heading measure instead. */
function Band({
  id, kicker, title, tinted = false, children,
}: {
  id?: string; kicker: string; title: string; tinted?: boolean; children: React.ReactNode;
}) {
  const ref = useReveal<HTMLElement>({ selector: '[data-rv]', stagger: 0.05, y: 16 });

  return (
    <section
      id={id}
      ref={ref}
      className={`scroll-mt-[68px] md:scroll-mt-[118px] border-t border-line py-8 sm:py-9 lg:py-10 ${tinted ? 'bg-surface-1' : 'bg-canvas'}`}
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div data-rv className="max-w-3xl">
          <span className="block h-1 w-12 rounded-full bg-brand-500" aria-hidden />
          <p className="mt-4 text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand-600">
            {kicker}
          </p>
          <h2 className="mt-2 text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-fg">
            {title}
          </h2>
        </div>
        <div data-rv className="mt-6">{children}</div>
      </div>
    </section>
  );
}

const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[16px] leading-relaxed text-fg-muted">{children}</p>
);

const Lead = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[18px] font-semibold leading-relaxed text-fg">{children}</p>
);

function Cta({
  href,
  children,
  solid = false,
  dark = false,
}: {
  href: string;
  children: React.ReactNode;
  solid?: boolean;
  dark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-[50px] items-center gap-2.5 rounded-[7px] px-4 text-[14px] font-extrabold sm:px-6 sm:text-[15px]
                  transition-all hover:-translate-y-0.5
                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
        solid
          ? 'bg-brand-500 text-white shadow-[0_10px_24px_rgba(0,122,204,0.3)] hover:bg-brand-600'
          : dark
          ? 'border-2 border-white/20 bg-white/10 text-white backdrop-blur-sm hover:border-white/40 hover:bg-white/15'
          : 'border-2 border-line-strong bg-canvas text-fg hover:border-brand-500 hover:bg-surface-1'
      }`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}

export default function AboutPage() {
  const { openAuth } = useSite();
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = heroRef.current;
    if (!el || prefersReducedMotion()) return;
    if (document.visibilityState === 'hidden') return;

    // Every element the timeline hides. `gsap.from` writes opacity:0 inline the
    // moment the tween is created, so anything that stops the timeline before
    // it finishes — Fast Refresh, a fast route change, a throttled rAF — leaves
    // those targets invisible for good. Clearing on every exit path is what
    // makes that state unreachable.
    const HIDDEN = '[data-a="k"],[data-a="h"],[data-a="p"],[data-a="cta"] > *,[data-a="chip"]';
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
        .from('[data-a="k"]', { opacity: 0, x: -12, duration: 0.45 })
        .from('[data-a="h"]', { opacity: 0, y: 28, duration: 0.75 }, '-=0.2')
        .from('[data-a="p"]', { opacity: 0, y: 16, duration: 0.55, stagger: 0.07 }, '-=0.4')
        .from('[data-a="cta"] > *', { opacity: 0, y: 14, duration: 0.5, stagger: 0.07 }, '-=0.35')
        .from('[data-a="chip"]', { opacity: 0, y: 10, duration: 0.4, stagger: 0.035 }, '-=0.3');
    }, el);

    // Backstop for the case the callbacks never fire at all. The whole sequence
    // runs in ~2.5s; well past that, visible beats animated.
    const watchdog = window.setTimeout(reveal, 4000);

    return () => {
      window.clearTimeout(watchdog);
      ctx.revert();
      reveal();
    };
  }, []);

  const faqRef = useReveal<HTMLElement>({ selector: '[data-rv]', stagger: 0.05, y: 16 });

  const faqEntries: AccordionEntry[] = FAQS.map(([q, a], i) => ({
    id: `ab-${i}`, question: q, answer: <p>{a}</p>,
  }));

  return (
    <main className="flex-1 overflow-x-clip">

      {/* ================= Hero — single centred column ================= */}
      <section ref={heroRef} data-hero className="relative overflow-hidden bg-[#001124] text-white" aria-labelledby="about-title">
        {/* StarBurst Canvas Background Layer */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <StarBurst
            color="#2e9ae0"
            backgroundColor="#001124"
            centerX={50}
            centerY={100}
            starCount={120}
            starSize={14}
            speed={7}
            opacity={65}
            flowerIntensity={14}
            twinkleSpeed={4}
          />
          {/* Subtle gradient vignette to blend smoothly into page content */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#001124]/40 via-transparent to-[#001124]/80 pointer-events-none" />
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
              maskImage: 'radial-gradient(90% 80% at 50% 100%, #000 0%, transparent 80%)',
            }}
          />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-col px-4 pt-9 pb-0 text-center sm:px-6 sm:py-14 lg:px-10 lg:py-18">
          <div data-a="k" className="flex items-center justify-center gap-3">
            <span className="h-1 w-10 rounded-full bg-brand-400" aria-hidden />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-brand-300">
              About 1xBet
            </span>
            <span className="h-1 w-10 rounded-full bg-brand-400" aria-hidden />
          </div>

          <h1
            id="about-title"
            data-a="h"
            /* Sized so all 38 characters clear the container on one line from lg up;
               below that it wraps rather than shrinking into illegibility. */
            className="mx-auto mt-5 text-[clamp(2.2rem,4.75vw,4.25rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-white lg:whitespace-nowrap"
          >
            Sports, betting and gaming in <span className="text-brand-400">one place</span>
          </h1>

          {/* Body copy. On phones this drops below the dark hero onto its own
              light band — three paragraphs of reversed text under a headline is
              a wall on a 375px screen. From `sm` up it sits inside the hero,
              unchanged. */}
          <p data-a="p" className="mx-auto mt-5 max-w-[88ch] text-center text-[17px] leading-relaxed text-white sm:mt-6 sm:text-[18px]">
            1xBet is an online sports and gaming platform that brings supported sports betting,
            live betting and casino experiences together in one place.
          </p>

          {/* The remaining copy drops below the dark hero on phones — six and
              seven line paragraphs of reversed text are a wall at 375px. From
              `sm` up it sits back inside the hero, unchanged. */}
          <div className="max-sm:order-last max-sm:-mx-4 max-sm:mt-9 max-sm:bg-canvas max-sm:px-4 max-sm:pt-8 max-sm:pb-1">

            <p data-a="p" className="mx-auto mt-3.5 max-w-[96ch] text-left text-[15px] leading-relaxed text-white/80 max-sm:text-fg-muted sm:mt-4 sm:text-center sm:text-[16px]">
              The platform is designed around easy access to available sporting events, betting
              markets and online gaming options across supported devices. Users can browse
              different sports, explore available competitions, review event information and
              access supported gaming categories through the relevant sections.
            </p>

            <p data-a="p" className="mx-auto mt-3.5 max-w-[96ch] text-left text-[15px] leading-relaxed text-white/80 max-sm:text-fg-muted sm:mt-4 sm:text-center sm:text-[16px]">
              The sports selection can include cricket, football, soccer, tennis, basketball,
              badminton, horse racing and other supported sports. The casino section can also
              provide access to selected online casino games and live dealer experiences.
            </p>
          </div>

          <div data-a="cta" className="mt-7 grid grid-cols-2 gap-2.5 [&>a]:justify-center sm:mt-8 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
            <Cta href="#categories" solid>Explore 1xBet</Cta>
            <Cta href="/sports" dark>Explore Sports</Cta>
          </div>

          {/* Supported sports, centred under the copy rather than in a side panel */}
          <div className="rail -mx-4 mt-7 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:mt-10 sm:flex-wrap sm:justify-center sm:px-0">
            {SPORT_LIST.map((s) => (
              <span
                key={s}
                data-a="chip"
                className="shrink-0 whitespace-nowrap rounded-[5px] border border-white/15 bg-white/10 px-3 py-1.5 text-[13px] font-bold text-white/90 backdrop-blur-xs"
              >
                {s}
              </span>
            ))}
          </div>

          <p data-a="p" className="mx-auto mt-5 max-w-[70ch] border-t border-white/15 pt-4 text-left text-[13px] leading-relaxed text-white/60 max-sm:order-last max-sm:-mx-4 max-sm:mt-0 max-sm:border-line max-sm:bg-canvas max-sm:px-4 max-sm:pb-9 max-sm:text-fg-dim sm:mt-6 sm:pt-5 sm:text-center sm:text-[14px]">
            The availability of sports, markets, games, features and services may vary depending
            on location, device, platform coverage and applicable regulations.
          </p>
        </div>
      </section>

      {/* ================= Categories ================= */}
      <Band id="categories" kicker="Sports, Betting & Gaming in One Place" title="Explore Available Categories" tinted>
        <Lead>
          1xBet brings different sports and gaming experiences together, giving users dedicated
          sections for the categories available on the platform.
        </Lead>

        <Rail className="mt-9" grid="lg:grid-cols-3" gap="gap-3 lg:gap-5" card="86%" label="What you can explore">

          {/* Sports betting */}
          <NeonBorder
            color="#007acc"
            secondaryColor="#004e8c"
            borderRadius={12}
            borderWidth={1.5}
            duration={4}
            trailLength={22}
            glowIntensity={0.8}
            trackColor="transparent"
            className="flex flex-col"
          >
            <div className="g-card lift flex flex-col overflow-hidden h-full">
              <div className="h-1.5 w-full bg-brand-500" aria-hidden />
              <div className="flex flex-1 flex-col p-6">
                <Trophy className="h-6 w-6 text-brand-600" aria-hidden />
                <h3 className="mt-4 text-[20px] font-extrabold tracking-[-0.02em] text-fg">Sports Betting</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">
                  Browse available sporting events and explore markets associated with individual
                  matches and competitions.
                </p>
                <p className="mt-3 text-[14px] font-semibold text-fg">
                  Depending on current availability, users can find:
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {SPORT_LIST.map((s) => (
                    <li key={s} className="rounded-[4px] border border-line bg-surface-1 px-2 py-1 text-[12px] font-semibold text-fg-muted">
                      {s}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[15px] leading-relaxed text-fg-muted">
                  Each event can have its own markets, odds and availability. Users should check the
                  individual event page for the latest information.
                </p>
                <div className="mt-auto pt-6"><Cta href="/sports">Explore Sports Betting</Cta></div>
              </div>
            </div>
          </NeonBorder>

          {/* Live betting — the dark centerpiece card with animated Neon Border */}
          <NeonBorder
            color="#00e5ff"
            secondaryColor="#007acc"
            borderRadius={12}
            borderWidth={2}
            duration={3.5}
            trailLength={28}
            glowIntensity={1.3}
            className="flex flex-col"
          >
            <div className="feature-panel flex flex-1 flex-col p-6 h-full">
              <div className="relative flex flex-1 flex-col">
                <span className="badge-live self-start">Live</span>
                <h3 className="mt-4 text-[20px] font-extrabold tracking-[-0.02em] text-white">Live Betting</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/85">
                  Selected sporting events may offer markets while an event is taking place.
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-white/85">
                  Because live events can develop quickly, markets and odds may change, suspend or
                  close during play. Users should always check the latest information displayed on
                  the platform.
                </p>
                <div className="mt-auto pt-6">
                  <Link
                    href="/sports#live"
                    className="group inline-flex min-h-[50px] items-center gap-2.5 rounded-[7px] bg-white px-6
                               text-[15px] font-extrabold text-navy-800 transition-all hover:-translate-y-0.5
                               focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Explore Live Betting
                    <ArrowRight className="h-4 w-4 text-brand-600 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                  </Link>
                </div>
              </div>
            </div>
          </NeonBorder>

          {/* Online casino */}
          <NeonBorder
            color="#c4a45c"
            secondaryColor="#8b7232"
            borderRadius={12}
            borderWidth={1.5}
            duration={4}
            trailLength={22}
            glowIntensity={0.8}
            trackColor="transparent"
            className="flex flex-col"
          >
            <div className="g-card lift flex flex-col overflow-hidden h-full">
              <div className="h-1.5 w-full bg-[#a8873c]" aria-hidden />
              <div className="flex flex-1 flex-col p-6">
                <Dice5 className="h-6 w-6 text-[#a8873c]" aria-hidden />
                <h3 className="mt-4 text-[20px] font-extrabold tracking-[-0.02em] text-fg">Online Casino</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">
                  Where supported, users can explore an online casino featuring available casino
                  games and selected live dealer experiences.
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">
                  Depending on location and platform coverage, available formats may include
                  roulette, blackjack, baccarat and other supported games.
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-fg-muted">
                  Each game can have different rules and features, so users should review the
                  information provided before playing.
                </p>
                <div className="mt-auto pt-6"><Cta href="/casino">Explore Online Casino</Cta></div>
              </div>
            </div>
          </NeonBorder>
        </Rail>
      </Band>

      {/* ================= Sports showcase ================= */}
      <Band kicker="Discover Your Favourite Sports" title="A Dedicated Experience for Every Sport">
        <Lead>
          1xBet provides dedicated sections for different sports, making it easier to find
          available matches and competitions.
        </Lead>

        <Rail className="mt-9" grid="sm:grid-cols-2 lg:grid-cols-3" gap="gap-3 sm:gap-4" card="82%" label="Sports available">
          {SPORTS.map((s) => (
            <NeonBorder
              key={s.name}
              color={s.colour}
              secondaryColor="#007acc"
              borderRadius={12}
              borderWidth={1.5}
              duration={4.5}
              trailLength={20}
              glowIntensity={0.8}
              trackColor="transparent"
              className="flex flex-col"
            >
              <Link
                href={s.href}
                className="g-card lift group flex flex-col overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 h-full"
              >
                <div className="h-1.5 w-full" style={{ background: s.colour }} aria-hidden />
                <div className="flex flex-1 flex-col p-5">
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-[8px] font-display text-[18px] font-extrabold text-white"
                    style={{ background: s.colour }}
                    aria-hidden
                  >
                    {s.name[0]}
                  </span>
                  <h3 className="mt-4 text-[18px] font-extrabold tracking-[-0.02em] text-fg">{s.name}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{s.body}</p>
                  <span className="mt-auto flex items-center gap-1.5 pt-5 text-[14px] font-extrabold text-brand-600">
                    View
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                  </span>
                </div>
              </Link>
            </NeonBorder>
          ))}
        </Rail>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <p className="max-w-2xl text-[15px] leading-relaxed text-fg-muted">
            Sports, competitions and markets can vary according to the sporting calendar,
            location and current platform coverage.
          </p>
          <Cta href="/sports">View All Sports</Cta>
        </div>
      </Band>

      {/* ================= Live experiences — full feature panel ================= */}
      <section className="border-t border-line bg-surface-1 py-8 sm:py-9 lg:py-10">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
          {/* Heading sits at the container edge, not inside the panel — the
              panel's own 56px padding was pushing it out of line with every
              other section heading on the page. */}
          <div className="max-w-3xl">
            <span className="block h-1 w-12 rounded-full bg-brand-500" aria-hidden />
            <p className="mt-4 text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand-600">
              Live experiences
            </p>
            <h2 className="mt-2 text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-fg">
              Follow Selected Events as They Happen
            </h2>
          </div>

          <div className="feature-panel relative overflow-hidden mt-9 p-6 sm:p-8 lg:p-10">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 opacity-40">
              <StarBurst
                color="#00a3ff"
                backgroundColor="transparent"
                centerX={15}
                centerY={50}
                starCount={60}
                starSize={10}
                speed={6}
                opacity={50}
                flowerIntensity={8}
              />
            </div>
            <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-5">
                <span className="badge-live">Live</span>
                <p className="mt-5 text-[20px] font-extrabold leading-snug tracking-[-0.02em] text-white">
                  A live event can change from one moment to the next.
                </p>
              </div>

              <div className="space-y-4 lg:col-span-7">
                <p className="text-[18px] font-semibold leading-relaxed text-white">
                  Live experiences allow users to follow selected sporting events while they are
                  in progress.
                </p>
                <p className="text-[16px] leading-relaxed text-white/85">
                  A live event can change from one moment to the next. A goal in soccer, a wicket
                  in cricket, a point in tennis or a scoring run in basketball can affect the
                  information and markets displayed on the platform.
                </p>
                <p className="text-[16px] leading-relaxed text-white/85">
                  Where live markets are available, users should refer to the current event page
                  for the latest information.
                </p>
                <p className="text-[16px] leading-relaxed text-white/85">
                  Live availability is not guaranteed for every event and can depend on location
                  and platform coverage.
                </p>

                <div className="pt-3">
                  <Link
                    href="/sports#live"
                    className="group inline-flex min-h-[50px] items-center gap-2.5 rounded-[7px] bg-white px-6
                               text-[15px] font-extrabold text-navy-800 transition-all hover:-translate-y-0.5
                               focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Explore Live Events
                    <ArrowRight className="h-4 w-4 text-brand-600 transition-transform duration-300 group-hover:translate-x-1" aria-hidden />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Casino ================= */}
      <Band kicker="Online Casino" title="Explore Supported Casino Experiences">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-4 lg:col-span-7">
            <Lead>
              The 1xBet casino section provides access to available casino games and selected
              live dealer experiences where supported.
            </Lead>
            <P>Game rules, limits, features and availability can differ between individual games.</P>
            <P>Before playing, review the specific game information and understand how the game works.</P>
            <div className="pt-2"><Cta href="/casino" solid>Explore Casino Games</Cta></div>
          </div>

          <div className="lg:col-span-5">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-fg-dim">
              Users may find different formats, including
            </span>
            <ul className="mt-4 space-y-2">
              {CASINO_FORMATS.map((f) => (
                <li key={f} className="flex items-center gap-3 rounded-[7px] border-2 border-line bg-canvas px-4 py-3 transition-colors hover:border-brand-500/50">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#a8873c]" aria-hidden />
                  <span className="text-[15px] font-bold text-fg">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Band>

      {/* ================= Devices ================= */}
      <Band kicker="Access 1xBet Across Supported Devices" title="Mobile & Web Experience" tinted>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-4 lg:col-span-7">
            <Lead>1xBet provides supported web and mobile access for users who meet the applicable requirements.</Lead>
            <P>Depending on location and device, users may be able to browse sports, review available markets, explore casino games and manage their account through supported mobile or web experiences.</P>
            <P>Users looking for mobile access should use official 1xBet sources to check current availability and installation requirements.</P>
            <p className="border-l-[5px] border-loss-600 pl-4 text-[16px] font-semibold leading-relaxed text-fg">
              Avoid using unknown third-party sources for account-related applications or downloads.
            </p>
            <div className="pt-2"><Cta href="/#app">Explore Mobile Access</Cta></div>
          </div>
          <div className="lg:col-span-5">
            <div className="g-card lift flex h-full flex-col justify-center p-8">
              <Smartphone className="h-8 w-8 text-brand-600" aria-hidden />
              <p className="mt-5 text-[16px] leading-relaxed text-fg-muted">
                Availability depends on location, device and applicable regulations. Always use
                official 1xBet sources.
              </p>
            </div>
          </div>
        </div>
      </Band>

      {/* ================= Account ================= */}
      <Band kicker="Your 1xBet Account" title="Simple Access to Supported Features">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-4">
            <Lead>Registered users can access supported platform features through their 1xBet account.</Lead>
            <P>Depending on the services available in their location, an account can provide access to supported sports, betting markets, casino experiences and account-management features.</P>
          </div>
          <div className="space-y-4">
            <P>New users should follow the official registration process and review the applicable eligibility requirements before creating an account.</P>
            <P>Existing users can use the official sign-in option to access their account.</P>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={openAuth}
                className="inline-flex min-h-[50px] cursor-pointer items-center rounded-[7px] bg-brand-500 px-6
                           text-[15px] font-extrabold text-white shadow-[0_10px_24px_rgba(0,122,204,0.3)]
                           transition-all hover:-translate-y-0.5 hover:bg-brand-600
                           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                1xBet Login
              </button>
              <button
                onClick={openAuth}
                className="inline-flex min-h-[50px] cursor-pointer items-center rounded-[7px] border-2 border-line-strong
                           bg-canvas px-6 text-[15px] font-extrabold text-fg transition-all hover:-translate-y-0.5
                           hover:border-brand-500 hover:bg-surface-1
                           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                1xBet Registration
              </button>
            </div>
          </div>
        </div>
      </Band>

      {/* ================= Navigation ================= */}
      <Band kicker="Designed Around Clear Navigation" title="Find the Information You Need" tinted>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-4 lg:col-span-7">
            <Lead>With multiple sports, competitions and gaming categories available, 1xBet organises its platform into dedicated sections.</Lead>
            <P>Users can select a sport or gaming category, open an individual event or game and review the information currently available.</P>
            <P>This event-based approach helps users see the relevant markets, odds, rules and availability associated with the specific event or game they are viewing.</P>
            <P>Information can change, particularly during live events, so the latest details displayed on the platform should always be treated as the current information.</P>
          </div>
          <div className="lg:col-span-5">
            <ol className="space-y-3">
              {['Select a sport or gaming category', 'Open an individual event or game', 'Review the information currently available'].map((t, i) => (
                <li key={t} className="flex items-start gap-4 rounded-[8px] border-2 border-line bg-canvas p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500 font-display text-[15px] font-extrabold text-white">
                    {i + 1}
                  </span>
                  <span className="pt-1.5 text-[15px] font-bold leading-snug text-fg">{t}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Band>

      {/* ================= Availability ================= */}
      <Band kicker="Availability & Regional Requirements" title="Check the Rules That Apply to You">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="space-y-4 lg:col-span-7">
            <Lead>1xBet services are not necessarily available in every location.</Lead>
            <P>Sports, betting markets, casino games, mobile features and other services may vary according to jurisdiction, platform coverage and applicable regulations.</P>
            <P>Users are responsible for determining whether they are legally permitted to access and use the relevant services in their location.</P>
            <P>Age and other eligibility requirements may apply.</P>
            <p className="border-l-[5px] border-brand-500 pl-4 text-[16px] font-semibold leading-relaxed text-fg">
              If a service is restricted in your jurisdiction, local laws and regulations take
              precedence over platform availability.
            </p>
            <div className="pt-2"><Cta href="/responsible-gaming">Check Available Services</Cta></div>
          </div>
          <div className="lg:col-span-5">
            <div className="g-card lift flex h-full flex-col justify-center p-8">
              <Globe2 className="h-8 w-8 text-brand-600" aria-hidden />
              <p className="mt-5 text-[16px] leading-relaxed text-fg-muted">
                Services may vary according to jurisdiction, platform coverage and applicable
                regulations.
              </p>
            </div>
          </div>
        </div>
      </Band>

      {/* ================= Responsible ================= */}
      <Band id="responsible" kicker="Responsible Betting & Gaming" title="Play Responsibly" tinted>
        <Rail grid="sm:grid-cols-2 lg:grid-cols-3" gap="gap-3 sm:gap-4" card="86%" label="Responsible play guidance">
          {RESPONSIBLE.map((text, i) => (
            <div key={i} className="g-card lift flex gap-4 p-5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] bg-navy-700 font-mono text-[13px] font-bold text-white">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-[15px] leading-relaxed text-fg-muted">{text}</p>
            </div>
          ))}
        </Rail>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-win-600" aria-hidden />
          <Cta href="/responsible-gaming">Learn About Responsible Gaming</Cta>
        </div>
      </Band>

      {/* ================= Why ================= */}
      <Band kicker="Why 1xBet?" title="One Platform for Supported Sports & Gaming">
        <Lead>1xBet brings available sports, betting markets and gaming experiences together through dedicated sections.</Lead>

        <Rail className="mt-9" grid="sm:grid-cols-2 lg:grid-cols-3" gap="gap-3 sm:gap-4" card="82%" label="Why use 1xBet">
          {WHY.map(({ t, b, icon: Icon }) => (
            <NeonBorder
              key={t}
              color="#007acc"
              secondaryColor="#004e8c"
              borderRadius={12}
              borderWidth={1.5}
              duration={4}
              trailLength={20}
              glowIntensity={0.8}
              trackColor="transparent"
            >
              <div className="g-card lift group relative overflow-hidden p-6 h-full">
                <span className="flex h-11 w-11 items-center justify-center rounded-[8px] bg-brand-500/10 text-brand-600">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 text-[17px] font-extrabold tracking-[-0.02em] text-fg">{t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{b}</p>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-brand-500 transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
              </div>
            </NeonBorder>
          ))}
        </Rail>

        <p className="mt-7 text-[15px] leading-relaxed text-fg-muted">
          The exact services, events, markets and features available can vary according to
          location and current platform coverage.
        </p>
      </Band>

      {/* ================= FAQ =================
          Not a Band: an accordion is naturally narrow, so stacking it under a
          full-width heading stranded ~460px of empty space down its right side.
          Pinning the heading alongside spends that width instead. */}
      <section
        id="faq"
        ref={faqRef}
        className="scroll-mt-[68px] md:scroll-mt-[118px] border-t border-line bg-surface-1 py-8 sm:py-9 lg:py-10"
      >
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-7 lg:grid-cols-12 lg:gap-12">
            <div data-rv className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <span className="block h-1 w-12 rounded-full bg-brand-500" aria-hidden />
                <p className="mt-4 text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand-600">
                  Frequently Asked Questions
                </p>
                <h2 className="mt-2 text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.04em] text-fg">
                  About 1xBet, answered
                </h2>
              </div>
            </div>

            <div data-rv className="lg:col-span-8">
              <Accordion items={faqEntries} />
            </div>
          </div>
        </div>
      </section>

      {/* ================= Closing ================= */}
      <section className="border-t border-line bg-canvas py-8 sm:py-9 lg:py-10">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <div className="max-w-3xl">
            <span className="block h-1 w-12 rounded-full bg-brand-500" aria-hidden />
            <p className="mt-4 text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand-600">
              Get started
            </p>
            <h2 className="mt-2 text-[clamp(2rem,4.4vw,3.2rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-fg">
              Explore 1xBet
            </h2>
          </div>

          <div className="feature-panel relative overflow-hidden mt-9 p-6 sm:p-8 lg:p-10">
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-0 opacity-40">
              <StarBurst
                color="#00e5ff"
                backgroundColor="transparent"
                centerX={85}
                centerY={50}
                starCount={70}
                starSize={11}
                speed={7}
                opacity={55}
                flowerIntensity={10}
              />
            </div>
            <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-6">
                <p className="text-[18px] leading-relaxed text-white/90">
                  Explore supported sports, browse available betting markets, discover online
                  casino games or access your account through the relevant section.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    { label: 'Explore 1xBet', href: '#categories' },
                    { label: 'Explore Sports', href: '/sports' },
                    { label: 'Explore Casino', href: '/casino' },
                  ].map((c, i) => (
                    <Link
                      key={c.label}
                      href={c.href}
                      className={`group inline-flex min-h-[50px] items-center gap-2.5 rounded-[7px] px-6 text-[15px]
                                  font-extrabold transition-all hover:-translate-y-0.5
                                  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                        i === 0
                          ? 'bg-white text-navy-800'
                          : 'border-2 border-white/25 text-white hover:border-white/50 hover:bg-white/10'
                      }`}
                    >
                      {c.label}
                      <ArrowRight className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${i === 0 ? 'text-brand-600' : ''}`} aria-hidden />
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-4 lg:col-span-5 lg:col-start-8">
                <p className="text-[16px] leading-relaxed text-white/85">
                  Whether you&rsquo;re following cricket, football, tennis, basketball, badminton,
                  horse racing or another supported category, start with the dedicated section
                  for the event you&rsquo;re interested in.
                </p>
                <p className="text-[16px] leading-relaxed text-white/85">
                  For casino users, explore available table games and live dealer experiences
                  where supported.
                </p>
                <p className="border-t border-white/20 pt-5 text-[13px] leading-relaxed text-white/65">
                  Availability varies by location, device and applicable regulations. Always check
                  the latest platform information, understand the relevant terms and participate
                  responsibly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
