'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Smartphone, LifeBuoy, Lock } from 'lucide-react';
import { useSite } from '@/components/SiteChrome';
import { HeroStage } from '@/components/landing/HeroStage';
import { OneXGamesSection } from '@/components/landing/OneXGamesSection';
import { LiveCasinoSection } from '@/components/landing/LiveCasinoSection';
import { SportsSection } from '@/components/landing/SportsSection';
import { FeaturedGrid } from '@/components/landing/FeaturedGrid';
import { CategoryBrowser } from '@/components/landing/CategoryBrowser';
import { OverviewShowcase } from '@/components/landing/OverviewShowcase';
import { MobileAppSection } from '@/components/landing/MobileAppSection';
import { InfoBand } from '@/components/landing/InfoBand';
import { Accordion, AccordionEntry } from '@/components/ui/Accordion';
import { GameTheaterModal } from '@/components/GameTheaterModal';
import { AuthenticGame } from '@/lib/authenticGames';
import { useReveal } from '@/hooks/useReveal';

const REASONS: [string, string][] = [
  ['Sports and games in one place', 'Browse the sports events and 1xBet games currently available through the platform.'],
  ['Straightforward account access', 'Registered users can move between their account and available platform sections through a single login.'],
  ['Desktop and mobile options', 'Access supported features through the website or available mobile experiences.'],
  ['Current event information', 'Review the information displayed for available events and markets before making a decision.'],
  ['Account-focused experience', 'Manage supported account information and access available features from your personal account.'],
  ['Customer support', 'Find assistance through the official 1xBet customer support channels available for your region.'],
];

const SUPPORT_TOPICS = [
  '1xBet login',
  'Account access',
  'Registration',
  'Application availability',
  'Mobile access',
  'General platform questions',
];

const FAQS: [string, string][] = [
  ['What is 1xBet India?', '1xBet India refers to the 1xBet platform and services available to eligible users in India, subject to regional availability, applicable terms and local regulations.'],
  ['How do I access 1xBet login?', 'Existing users can select the 1xBet login option on the official platform and follow the required sign-in process using their account credentials.'],
  ['What is 1xBet sign in?', '1xBet sign in is the process registered users use to access their existing account through the official 1xBet website or supported application.'],
  ['How does 1xBet registration work?', 'New users can select the registration option and follow the account-creation instructions provided by the platform. Eligibility and verification requirements can vary depending on location.'],
  ['Is there a 1xBet app?', '1xBet provides supported mobile application and mobile access options. Availability can depend on your device, operating system and location.'],
  ['Where can I find the 1xBet India app?', 'If you are looking for the 1xBet India app, check the official 1xBet platform for current availability and installation instructions for your device.'],
  ['Where can I find 1xBet download information?', 'For 1xBet download information, use the official 1xBet platform or an official application source applicable to your device. Avoid unknown third-party download websites.'],
  ['Can I access my 1xBet account from mobile?', 'Where mobile access is supported, registered users can access their 1xBet account through the available mobile website or application options.'],
  ['What are 1xBet games?', '1xBet games refers to the online gaming options available through the platform. The selection can change depending on current availability and location.'],
  ['How can I contact 1xBet customer support?', 'Users can access 1xBet customer support through the official support channels provided by the platform. Available support methods can vary by region.'],
  ['Is 1xBet available everywhere?', 'No. The availability of 1xBet services, games, sports and betting markets can vary according to jurisdiction, local regulations and platform availability.'],
];

const ACCESS_DOORS = [
  {
    tag: 'Already registered?',
    title: '1xBet login',
    lead: 'Coming back to 1xBet?',
    body: [
      'Use 1xBet login to access your existing account and the features currently available to you. The 1xBet sign in process is intended for registered users. Follow the instructions displayed on the official platform and check that you are using the correct website or application before entering your credentials.',
      'If you cannot access your account, review the available account-recovery or support options rather than creating multiple accounts unnecessarily.',
    ],
    cta: '1xBet Login',
  },
  {
    tag: 'New to 1xBet?',
    title: '1xBet registration',
    lead: 'Getting started begins with 1xBet registration.',
    body: [
      'Eligible users can follow the registration process provided by the platform and enter the information requested during account creation. Depending on your location, additional eligibility or verification requirements may apply.',
      'Before registering, make sure you meet the applicable requirements and that using the service is permitted in your jurisdiction. Once your account has been created, you can use your login details to access the platform through supported devices.',
    ],
    cta: 'Register with 1xBet',
  },
];

const SECURITY_STEPS: [string, string][] = [
  [
    'Sign in on the official site',
    'Use the official 1xBet website or application when signing in. Avoid entering your login information on websites that look unfamiliar or arrive through unsolicited messages.',
  ],
  [
    'Verify before installing',
    'If you are searching for the 1xBet India app or 1xBet download, verify the source before installing anything.',
  ],
  [
    'Never share your password',
    'Do not share your password with other people, and be cautious about messages that request account information while claiming to provide technical or customer support.',
  ],
  [
    'Report suspicious access',
    'If you believe someone else has accessed your account, use the official support channels as soon as possible.',
  ],
];

const SAFETY = [
  ['Results are uncertain', 'Sports betting and online gaming involve financial risk. Results are uncertain, and losses can occur.'],
  ['Check eligibility first', 'Only participate if you are legally permitted to use the service in your location and meet the applicable age and eligibility requirements.'],
  ['Set limits in advance', 'Set personal limits before participating and never use money that you cannot afford to lose. Betting should not interfere with your daily responsibilities, finances or relationships.'],
  ['Take a break if needed', 'If gambling becomes difficult to control or stops feeling like entertainment, consider taking a break and seeking appropriate support.'],
];

export default function Home() {
  const { openAuth } = useSite();
  const [theaterGame, setTheaterGame] = useState<AuthenticGame | null>(null);
  const reasonsRef = useReveal<HTMLOListElement>({ selector: 'li', stagger: 0.05, y: 16 });
  const stepsRef = useReveal<HTMLOListElement>({ selector: 'li', stagger: 0.05, y: 16 });

  const faqEntries: AccordionEntry[] = FAQS.map(([q, a], i) => ({
    id: `faq-${i}`,
    question: q,
    answer: <p>{a}</p>,
  }));

  return (
    <main className="flex-1 overflow-x-hidden">

      {/* Hero with Full-Width Category Navigation Hub */}
      <HeroStage onSelectGame={setTheaterGame} />



      {/* 2. Full-Width Live Casino & 4K Dealer Broadcast Lounge */}
      <LiveCasinoSection onSelectGame={setTheaterGame} />

      {/* 3. Full-Width Sports & In-Play Live Match Odds Center */}
    

      {/* 4. Popular Games Grid */}
      <FeaturedGrid onSelectGame={setTheaterGame} />

      {/* 5. Dynamic Category Browser */}
      <CategoryBrowser onSelectGame={setTheaterGame} />

      {/* ---------- Overview: Everything in One Place Showcase ---------- */}
      <OverviewShowcase />

      {/* ---------- Access: Your 1xBet Account ---------- */}
      <section className="border-t border-line bg-surface-1 py-14 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <span className="label label-volt">Your 1xBet Account</span>
          <h2 className="mt-3 text-[clamp(1.7rem,3.4vw,2.6rem)] uppercase text-fg font-extrabold">
            One Account for Your Platform Access
          </h2>
          <div className="mt-4 max-w-3xl space-y-3 text-[16px] leading-relaxed text-fg-muted">
            <p className="text-[17px] font-medium text-fg">
              Your 1xBet account gives you access to the features and services available to registered users.
            </p>
            <p>
              After registration, you can use your account credentials to sign in, review account information and access supported platform features. Keeping your account details secure is an important part of using any online service.
            </p>
            <p>
              Always access your account through the official 1xBet website or supported application. Never share your password or other sensitive login information with another person.
            </p>
            <p>
              If you have an account-related problem, use the official support options provided by the platform.
            </p>
          </div>

          <div className="mt-9 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {ACCESS_DOORS.map((d) => (
              <div
                key={d.title}
                className="panel cut-corner group relative flex flex-col p-6 transition-all duration-300 hover:border-brand-500/60 sm:p-8 bg-canvas shadow-xs hover:shadow-xl"
              >
                <span className="label label-volt">{d.tag}</span>
                <h3 className="mt-3 text-[clamp(1.35rem,2.4vw,1.85rem)] uppercase font-bold text-fg">
                  {d.title}
                </h3>
                <p className="mt-3 text-[17px] font-semibold text-brand-600">{d.lead}</p>

                <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-fg-muted">
                  {d.body.map((para) => (
                    <p key={para.slice(0, 24)}>{para}</p>
                  ))}
                </div>

                <button
                  onClick={openAuth}
                  className="group/btn mt-7 inline-flex min-h-[48px] w-fit cursor-pointer items-center gap-2.5
                             rounded-[8px] border border-brand-500/40 bg-brand-500/10 px-6 text-[15px]
                             font-bold text-brand-600 transition-all duration-200
                             hover:border-brand-500 hover:bg-brand-500 hover:text-white shadow-xs"
                >
                  {d.cta} &rarr;
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Mobile App Showcase & Security Guide ---------- */}
      <MobileAppSection />

      {/* ---------- Why 1xBet ---------- */}
      <section className="border-t border-line bg-canvas py-14 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="label label-volt">Why 1xBet?</span>
              <h2 className="mt-3 text-[clamp(1.7rem,3.4vw,2.6rem)] uppercase text-fg font-extrabold">
                A Platform Designed for Easy Access
              </h2>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-fg-muted">
              1xBet brings different platform features together instead of making users search through separate services.
            </p>
          </div>

          <ol
            ref={reasonsRef}
            className="mt-9 grid grid-cols-1 gap-px overflow-hidden rounded-[10px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3 shadow-xs"
          >
            {REASONS.map(([title, body], i) => (
              <li
                key={title}
                className="group relative bg-white p-6 transition-colors duration-300 hover:bg-surface-3"
              >
                <span className="font-mono text-[12px] font-semibold tracking-[0.14em] text-brand-600">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-[17px] font-bold tracking-[-0.02em] text-fg">
                  {title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{body}</p>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-brand-500 transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Support ---------- */}
      <InfoBand
        label="Help When You Need It"
        title="1xBet Customer Support"
        action={{ label: 'Visit Customer Support →', href: '/responsible-gaming' }}
        aside={
          <div className="panel p-6 bg-surface-1 border border-line rounded-xl">
            <LifeBuoy className="h-6 w-6 text-brand-600" aria-hidden />
            <span className="mt-3 block text-[15px] font-bold text-fg">
              Support May Be Relevant For
            </span>
            <ul className="mt-3 divide-y divide-line text-[14px] text-fg-muted">
              {SUPPORT_TOPICS.map((t) => (
                <li key={t} className="py-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <p className="text-[17px] font-medium text-fg">
          Sometimes you need help with your account, login, registration or mobile access.
        </p>
        <p>
          1xBet customer support provides assistance through the official support channels made available by the platform. The available contact methods may vary depending on your region and the nature of your question.
        </p>
        <p>
          For example, support may be relevant if you are experiencing difficulty with login, account access, registration, application availability, mobile access or general platform questions.
        </p>
        <p>
          Always use the official support section when looking for assistance. Be cautious of third parties claiming to represent 1xBet and asking for your password, payment details or other sensitive information.
        </p>
      </InfoBand>

      {/* ---------- Security ---------- */}
      {/* ---------- Security: numbered steps ----------
           The heading promises steps, so these are steps. Previously this ran
           as a two-column InfoBand whose left column held only a heading, and
           whose aside repeated the final paragraph verbatim. */}
      <section className="border-t border-line bg-surface-1 py-14 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <span className="label label-volt">Keep Your Account Secure</span>
              <h2 className="mt-3 text-[clamp(1.7rem,3.4vw,2.6rem)] uppercase">
                Simple Steps for Safer Access
              </h2>
              <div className="score-rule mt-5 max-w-[180px]" aria-hidden />
            </div>

            <p className="max-w-md text-[17px] font-medium leading-relaxed text-fg">
              Your account credentials are personal. Keeping them private helps protect your
              account from unauthorized access.
            </p>
          </div>

          <ol
            ref={stepsRef}
            className="mt-10 grid grid-cols-1 gap-px overflow-hidden rounded-[10px] border border-line bg-line sm:grid-cols-2 xl:grid-cols-4"
          >
            {SECURITY_STEPS.map(([title, body], i) => (
              <li key={title} className="group relative bg-canvas p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[13px] font-bold tracking-[0.14em] text-brand-600">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <ShieldCheck className="h-4 w-4 text-fg-dim" aria-hidden />
                </div>

                <h3 className="mt-4 text-[16px] font-bold tracking-[-0.02em] text-fg">
                  {title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">{body}</p>

                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-brand-500 transition-transform duration-300 ease-out group-hover:scale-x-100"
                />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Responsible play ---------- */}
      <section className="relative overflow-hidden border-t border-line bg-surface-1">
        <div className="relative mx-auto w-full max-w-[1600px] px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <span className="label label-volt">Responsible play</span>
              <h2 className="mt-3 text-[clamp(1.7rem,3.4vw,2.6rem)] uppercase">
                Keep betting within your limits
              </h2>
              <div className="score-rule mt-5 max-w-[180px]" aria-hidden />

              <Link
                href="/responsible-gaming"
                className="group mt-6 inline-flex min-h-[44px] items-center gap-2 text-[15px] font-medium text-fg
                           transition-colors hover:text-brand-600
                           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                Player safety tools
                <ArrowRight
                  className="h-4 w-4 text-brand-600 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
              {SAFETY.map(([t, b]) => (
                <div key={t} className="panel panel-2 p-5">
                  <ShieldCheck className="h-5 w-5 text-win-600" aria-hidden />
                  <h3 className="mt-3 text-[16px] font-bold tracking-[-0.02em] text-fg">{t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-fg-muted">{b}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="fine-print mt-9 max-w-3xl border-t border-line pt-5">
            Always review the applicable terms, restrictions and local regulations before
            using the platform.
          </p>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="border-t border-line bg-canvas py-14 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Left column previously held a heading and one line, then ~700px
                of empty column. It now carries a support card and topic jumps
                so the sticky rail stays useful the whole way down the list. */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <span className="label label-volt">Frequently asked</span>
                <h2 className="mt-3 text-[clamp(1.7rem,3.4vw,2.6rem)] uppercase">
                  Questions &amp; answers
                </h2>
                <div className="score-rule mt-5 max-w-[180px]" aria-hidden />
                <p className="mt-5 text-[15px] leading-relaxed text-fg-muted">
                  Availability of services, games and betting markets may vary by location.
                </p>

                <div className="panel mt-7 p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-brand-500/10 text-brand-600">
                      <LifeBuoy className="h-5 w-5" aria-hidden />
                    </span>
                    <span>
                      <span className="label text-[10px]">Still stuck?</span>
                      <span className="mt-1 block text-[15px] font-bold text-fg">
                        1xBet customer support
                      </span>
                    </span>
                  </div>

                  <p className="mt-4 text-[14px] leading-relaxed text-fg-muted">
                    Users can access 1xBet customer support through the official support
                    channels provided by the platform. Available support methods can vary by
                    region.
                  </p>

                  <ul className="mt-4 border-t border-line pt-3">
                    {SUPPORT_TOPICS.slice(0, 4).map((t) => (
                      <li
                        key={t}
                        className="flex items-center gap-2 border-b border-line py-2 text-[13px] text-fg-muted last:border-b-0"
                      >
                        <span className="h-1 w-1 shrink-0 rounded-full bg-brand-500" aria-hidden />
                        {t}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={openAuth}
                    className="group mt-4 inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-2
                               rounded-[6px] border border-brand-500/30 bg-brand-500/8 px-4 text-[14px] font-semibold
                               text-brand-600 transition-colors hover:bg-brand-500/14
                               focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                  >
                    Contact support
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <Accordion items={faqEntries} />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Closing ---------- */}
      <section className="border-t border-line bg-surface-1 py-14 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <div className="panel cut-corner relative overflow-hidden p-6 sm:p-10 lg:p-14">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-6">
                <span className="label label-volt">1xBet India</span>
                <h2 className="mt-3 text-[clamp(1.8rem,3.8vw,2.9rem)] uppercase">
                  Access the platform your way
                </h2>
                <p className="mt-5 text-[17px] leading-relaxed text-fg-muted">
                  Whether you&rsquo;re visiting for the first time or returning to an existing
                  account, 1xBet India brings available sports, games, account access and
                  mobile options together in one place.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    onClick={openAuth}
                    className="inline-flex min-h-[52px] cursor-pointer items-center rounded-[6px] bg-brand-500 px-7
                               text-[15px] font-semibold text-[#04121f] shadow-[0_8px_24px_rgba(0,122,204,0.26)]
                               transition-colors hover:bg-brand-600
                               focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                  >
                    Register with 1xBet
                  </button>
                  <button
                    onClick={openAuth}
                    className="inline-flex min-h-[52px] cursor-pointer items-center rounded-[6px] border
                               border-line-strong px-7 text-[15px] font-semibold text-fg transition-colors
                               hover:border-brand-500/60 hover:bg-surface-3
                               focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                  >
                    1xBet Login
                  </button>
                </div>
              </div>

              <div className="space-y-4 text-[15px] leading-relaxed text-fg-muted lg:col-span-5 lg:col-start-8">
                <p>
                  Explore 1xBet games, browse available sports and events, or return to your
                  account through 1xBet login. New users can follow 1xBet registration to
                  create an account, subject to eligibility and regional requirements.
                </p>
                <p>
                  Prefer mobile access? Check the availability of the 1xBet app, 1xBet India
                  app or 1xBet mobile app for your device. If you&rsquo;re looking for 1xBet
                  download instructions, always use the official source.
                </p>
                <p>
                  And if you need assistance, 1xBet customer support is available through the
                  official channels provided by the platform.
                </p>
                <p className="fine-print border-t border-line pt-4">
                  Services, features and availability may change according to location and
                  applicable regulations. Always check the latest information, review the
                  relevant terms and use the platform responsibly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clicking any tile opens the existing playable game modal */}
      <GameTheaterModal
        game={theaterGame}
        isOpen={!!theaterGame}
        onClose={() => setTheaterGame(null)}
        balance={1250}
        currency="USD"
        onUpdateBalance={() => {}}
        onOpenDeposit={openAuth}
      />
    </main>
  );
}
