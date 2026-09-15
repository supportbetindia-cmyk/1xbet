'use client';

import React from 'react';
import Link from 'next/link';
import { LifeBuoy, Clock, Ban, Wallet, PhoneCall } from 'lucide-react';
import { DataTable } from '@/components/editorial/DataTable';

const LIMIT_ROWS: React.ReactNode[][] = [
  ['Deposit limit', 'Daily, weekly or monthly', 'Immediate', '24 hours'],
  ['Loss limit', 'Daily, weekly or monthly', 'Immediate', '24 hours'],
  ['Session reminder', '15, 30 or 60 minutes', 'Immediate', 'Immediate'],
  ['Cool-off', '24 hours to 6 weeks', 'Immediate', 'Cannot be lifted early'],
  ['Self-exclusion', '6 months to 5 years', 'Immediate', 'Cannot be lifted early'],
];

const SUPPORT = [
  {
    name: 'BeGambleAware',
    detail: 'Free, confidential advice and a 24-hour helpline.',
    contact: '0808 8020 133',
    href: 'https://www.begambleaware.org',
  },
  {
    name: 'GamCare',
    detail: 'Counselling, group sessions and a live chat service.',
    contact: 'gamcare.org.uk',
    href: 'https://www.gamcare.org.uk',
  },
  {
    name: 'Gamblers Anonymous',
    detail: 'Peer support meetings, online and in person.',
    contact: 'gamblersanonymous.org',
    href: 'https://www.gamblersanonymous.org',
  },
];

export default function ResponsibleGamingPage() {
  return (
    <>
      <main className="mx-auto w-full max-w-[1440px] flex-1 space-y-12 overflow-x-hidden p-4 sm:p-8">

        {/* Hero — type only, no imagery */}
        <section className="panel-navy panel-navy-hairline overflow-hidden rounded-2xl shadow-xl">
          <div className="max-w-3xl p-6 sm:p-8 lg:p-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1.5 backdrop-blur-md">
              <LifeBuoy className="h-3.5 w-3.5 text-brand-300" strokeWidth={2} />
              <span className="text-[10px] font-medium uppercase tracking-[0.11em] text-navy-100">
                Player safety
              </span>
            </span>

            <h1 className="mt-5 text-[30px] leading-[1.1] sm:text-[42px] font-semibold tracking-[-0.033em] text-white">
              The house has an edge. Play like you know it.
            </h1>

            <p className="mt-5 text-[15px] leading-relaxed text-navy-100">
              Every game on this site is built to return less than it takes. That is not a
              secret and it is not a flaw — it is how the business works. Gambling is
              entertainment you pay for, and the moment it stops being entertainment, the tools
              below exist to stop it quickly.
            </p>
          </div>
        </section>

        {/* Plain talk */}
        <section className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <span className="eyebrow eyebrow-brand">Straight answers</span>
            <h2 className="mt-2.5 text-[26px] sm:text-[32px] font-semibold tracking-[-0.03em] text-ink-900">
              What the maths actually says
            </h2>

            <div className="prose-1x mt-6">
              <p>
                A 99% RTP sounds close to break-even. It is not. It means that for every £100
                staked, £99 comes back <em>on average, across millions of rounds</em>. Stake
                £100 twenty times over an evening and you have put £2,000 through the game, not
                £100. The expected cost of that evening is £20, and the actual cost will be
                nowhere near it in either direction.
              </p>
              <p>
                Slots are steeper. A 96% RTP game takes £4 of every £100 staked. Spin £2 a
                go, four hundred times, and you have staked £800 for an expected loss of £32 —
                again, with real results scattered widely around that number.
              </p>

              <h3>Things that are not true</h3>
              <ul>
                <li>
                  A game is not &ldquo;due&rdquo;. Every round is independent. Ten busts in a row
                  changes the eleventh round not at all.
                </li>
                <li>
                  Staking systems do not beat the edge. Martingale, Fibonacci, D&rsquo;Alembert —
                  all of them redistribute <em>when</em> you lose, never <em>whether</em>.
                </li>
                <li>
                  Chasing losses is the single most expensive habit in gambling. The urge to
                  win it back is strongest at exactly the moment your judgement is worst.
                </li>
                <li>
                  Winning early means nothing. Variance is generous at the start of plenty of
                  losing sessions.
                </li>
              </ul>

              <h3>Signs worth taking seriously</h3>
              <p>
                Gambling with money set aside for something else. Hiding how much you play, or
                lying about it. Needing bigger stakes for the same interest. Playing to escape
                a bad mood rather than for enjoyment. Trying to stop and finding you cannot.
              </p>
              <p>
                If more than one of those lands, use a cool-off today rather than promising
                yourself you will cut back. The tools work because they do not rely on
                willpower at the moment it is weakest.
              </p>
            </div>
          </div>

          {/* Quick actions */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28 space-y-3">
              {[
                {
                  icon: Wallet,
                  title: 'Set a deposit limit',
                  body: 'Caps what can enter the account over a day, week or month. Tightening applies instantly.',
                },
                {
                  icon: Clock,
                  title: 'Take a cool-off',
                  body: 'Locks betting for 24 hours up to six weeks. Your balance stays put and withdrawable.',
                },
                {
                  icon: Ban,
                  title: 'Self-exclude',
                  body: 'Closes the account for six months minimum. Marketing stops and it cannot be reopened early.',
                },
              ].map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="rounded-xl border border-ink-200 bg-white p-4 transition-colors hover:border-ink-300"
                >
                  <div className="flex items-start gap-3.5">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-ink-200 bg-ink-50 text-brand-600">
                      <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                    </span>
                    <div>
                      <h3 className="text-[14px] font-semibold text-ink-900">{title}</h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-ink-600">{body}</p>
                    </div>
                  </div>
                </div>
              ))}

              <p className="fine-print pt-1">
                All five tools sit under Account → Player safety. None of them require you to
                speak to anyone, and using one never affects a pending withdrawal.
              </p>
            </div>
          </aside>
        </section>

        {/* Tools table */}
        <section>
          <div className="max-w-2xl">
            <span className="eyebrow eyebrow-brand">The controls</span>
            <h2 className="mt-2.5 text-[26px] sm:text-[32px] font-semibold tracking-[-0.03em] text-ink-900">
              What each tool does, and how hard it is to undo
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
              Every limit tightens immediately and loosens slowly. The asymmetry is deliberate:
              a decision made calmly should outlast a decision made at 2am.
            </p>
          </div>

          <div className="mt-6">
            <DataTable
              columns={['Tool', 'Range', 'Takes effect', 'Time to reverse']}
              rows={LIMIT_ROWS}
              note="Cool-off and self-exclusion cannot be shortened for any reason, including by contacting support. Please be sure before confirming."
            />
          </div>
        </section>

        {/* Independent help */}
        <section className="rounded-2xl border border-ink-200 bg-ink-50 p-6 sm:p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-md">
              <span className="eyebrow">Independent support</span>
              <h2 className="mt-2.5 text-[22px] font-semibold tracking-[-0.028em] text-ink-900">
                Help that has nothing to do with us
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-600">
                These organisations are independent of any operator and free to use. Talking to
                one of them is not a big dramatic step — most people who call are simply
                unsure, which is exactly who they are there for.
              </p>
            </div>

            <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-3 lg:max-w-2xl">
              {SUPPORT.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-ink-200 bg-white p-4 transition-colors hover:border-brand-300"
                >
                  <h3 className="text-[14px] font-semibold text-ink-900 group-hover:text-brand-700">
                    {s.name}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-ink-600">{s.detail}</p>
                  <p className="mt-3 flex items-center gap-1.5 font-mono text-[12px] text-brand-600">
                    <PhoneCall className="h-3 w-3" strokeWidth={2} />
                    {s.contact}
                  </p>
                </a>
              ))}
            </div>
          </div>

          <p className="fine-print mt-8 border-t border-ink-200 pt-5">
            You must be 18 or over to hold an account. We run age verification on every
            registration and re-check it before a first withdrawal. Accounts found to belong to
            a minor are closed, stakes refunded and winnings voided. If you share a device,
            consider blocking software such as Gamban or Net Nanny — and see{' '}
            <Link href="/provably-fair">how our games are verified</Link> if you want to
            understand what you are actually playing.
          </p>
        </section>

      </main>
    </>
  );
}
