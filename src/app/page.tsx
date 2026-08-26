'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Smartphone, LifeBuoy, Lock } from 'lucide-react';
import { useSite } from '@/components/SiteChrome';
import { HeroStage } from '@/components/landing/HeroStage';
import { FeaturedGrid } from '@/components/landing/FeaturedGrid';
import { CategoryBrowser } from '@/components/landing/CategoryBrowser';
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

  const faqEntries: AccordionEntry[] = FAQS.map(([q, a], i) => ({
    id: `faq-${i}`,
    question: q,
    answer: <p>{a}</p>,
  }));

  return (
    <main className="flex-1 overflow-x-hidden">

      <HeroStage onSelectGame={setTheaterGame} />

      <FeaturedGrid onSelectGame={setTheaterGame} />

      <CategoryBrowser onSelectGame={setTheaterGame} />

      {/* ---------- Overview ---------- */}
      <InfoBand
        label="Overview"
        title="Everything in one place"
        aside={
          <div className="panel p-5">
            <span className="label">Please note</span>
            <p className="mt-3 text-[14px] leading-relaxed text-fg-muted">
              The platform&rsquo;s available content can change depending on the event,
              market, device and location. This means users can see different options at
              different times.
            </p>
          </div>
        }
      >
        <p className="text-[17px] text-fg">
          1xBet is built around a simple idea: give registered users one place to access
          the sports, games and account features available to them.
        </p>
        <p>
          From the homepage, users can move between sports and gaming categories, review
          available events, access their account and find mobile options without having to
          navigate through multiple services.
        </p>
        <p>
          For existing users, their 1xBet account provides the central point for accessing
          supported services. New users can begin with the registration process and explore
          the platform after completing the required steps.
        </p>
      </InfoBand>

      {/* ---------- Access: two doors ---------- */}
      <section className="border-t border-line bg-surface-1 py-14 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <span className="label label-volt">Access</span>
          <h2 className="mt-3 text-[clamp(1.7rem,3.4vw,2.6rem)] uppercase">
            Your 1xBet account
          </h2>
          <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-fg-muted">
            Your 1xBet account gives you access to the features and services available to
            registered users. Always access your account through the official 1xBet website
            or supported application, and never share your password.
          </p>

          <div className="mt-9 grid grid-cols-1 gap-4 lg:grid-cols-2">
            {ACCESS_DOORS.map((d) => (
              <div
                key={d.title}
                className="panel cut-corner group relative flex flex-col p-6 transition-colors duration-300 hover:border-brand-500/45 sm:p-8"
              >
                <span className="label">{d.tag}</span>
                <h3 className="mt-3 text-[clamp(1.35rem,2.4vw,1.85rem)] uppercase">
                  {d.title}
                </h3>
                <p className="mt-4 text-[17px] font-medium text-fg">{d.lead}</p>

                <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-fg-muted">
                  {d.body.map((para) => (
                    <p key={para.slice(0, 24)}>{para}</p>
                  ))}
                </div>

                <button
                  onClick={openAuth}
                  className="group/btn mt-7 inline-flex min-h-[48px] w-fit cursor-pointer items-center gap-2.5
                             rounded-[6px] border border-brand-500/40 bg-brand-500/8 px-6 text-[15px]
                             font-semibold text-brand-600 transition-colors duration-200
                             hover:border-brand-500 hover:bg-brand-500 hover:text-[#04121f]
                             focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                >
                  {d.cta}
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                    aria-hidden
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- App & download ---------- */}
      <InfoBand
        label="Take 1xBet with you"
        title={<>1xBet app &amp; mobile access</>}
        action={{ label: 'Explore mobile access', href: '/app' }}
        aside={
          <div className="panel p-5">
            <Smartphone className="h-5 w-5 text-brand-600" aria-hidden />
            <span className="mt-3 block text-[14px] font-semibold text-fg">
              1xBet download
            </span>
            <p className="mt-2 text-[14px] leading-relaxed text-fg-muted">
              Avoid downloading applications from unknown websites or unofficial sources. A
              third-party file may be outdated or modified and can create unnecessary
              security risks.
            </p>
          </div>
        }
      >
        <p className="text-[17px] text-fg">
          Your phone can be another way to access the platform.
        </p>
        <p>
          The 1xBet app provides a mobile-focused experience for supported devices, allowing
          registered users to access their account and available platform features without
          relying only on a desktop browser.
        </p>
        <p>
          For users searching for the 1xBet India app, availability can depend on the device,
          operating system and region. The mobile experience may also differ from the desktop
          website. If you prefer using a browser, supported mobile web access may provide
          another option.
        </p>
        <p>
          Always check the official 1xBet platform for the current installation method
          available for your device and location. Application requirements and supported
          platforms can change, so the latest official instructions should be used.
        </p>
      </InfoBand>

      {/* ---------- Why 1xBet ---------- */}
      <section className="border-t border-line bg-surface-1 py-14 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="label label-volt">Why 1xBet?</span>
              <h2 className="mt-3 text-[clamp(1.7rem,3.4vw,2.6rem)] uppercase">
                A platform designed for easy access
              </h2>
            </div>
            <p className="max-w-md text-[15px] leading-relaxed text-fg-muted">
              1xBet brings different platform features together instead of making users
              search through separate services.
            </p>
          </div>

          {/* Hairline grid: one shared background showing through 1px gaps, so
              six panels read as a single board rather than six loose cards. */}
          <ol
            ref={reasonsRef}
            className="mt-9 grid grid-cols-1 gap-px overflow-hidden rounded-[10px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3"
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
        label="Help when you need it"
        title="1xBet customer support"
        action={{ label: 'Visit customer support', href: '/responsible-gaming' }}
        aside={
          <div className="panel p-5">
            <LifeBuoy className="h-5 w-5 text-brand-600" aria-hidden />
            <span className="mt-3 block text-[14px] font-semibold text-fg">
              Support may be relevant for
            </span>
            <ul className="mt-3">
              {SUPPORT_TOPICS.map((t) => (
                <li
                  key={t}
                  className="border-b border-line py-2 text-[14px] text-fg-muted last:border-b-0"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        }
      >
        <p className="text-[17px] text-fg">
          Sometimes you need help with your account, login, registration or mobile access.
        </p>
        <p>
          1xBet customer support provides assistance through the official support channels
          made available by the platform. The available contact methods may vary depending on
          your region and the nature of your question.
        </p>
        <p>
          Always use the official support section when looking for assistance. Be cautious of
          third parties claiming to represent 1xBet and asking for your password, payment
          details or other sensitive information.
        </p>
      </InfoBand>

      {/* ---------- Security ---------- */}
      <InfoBand
        label="Keep your account secure"
        title="Simple steps for safer access"
        tone="raised"
        aside={
          <div className="panel p-5">
            <Lock className="h-5 w-5 text-win-600" aria-hidden />
            <p className="mt-3 text-[14px] leading-relaxed text-fg-muted">
              If you believe someone else has accessed your account, use the official support
              channels as soon as possible.
            </p>
          </div>
        }
      >
        <p className="text-[17px] text-fg">
          Your account credentials are personal. Keeping them private helps protect your
          account from unauthorized access.
        </p>
        <p>
          Use the official 1xBet website or application when signing in. Avoid entering your
          login information on websites that look unfamiliar or arrive through unsolicited
          messages.
        </p>
        <p>
          If you are searching for the 1xBet India app or 1xBet download, verify the source
          before installing anything. Do not share your password with other people, and be
          cautious about messages that request account information while claiming to provide
          technical or customer support.
        </p>
      </InfoBand>

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
