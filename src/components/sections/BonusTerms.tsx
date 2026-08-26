import React from 'react';
import { DataTable } from '@/components/editorial/DataTable';

/**
 * Game weighting for wagering contribution. This is the table that decides
 * whether a bonus is realistically clearable, and it is the one most sites
 * bury four clicks deep.
 */
const WEIGHTING_ROWS: React.ReactNode[][] = [
  ['Slots and Megaways', '100%', '£100 staked clears £100'],
  ['1xCrash and 1xGames', '20%', '£100 staked clears £20'],
  ['Roulette (all variants)', '10%', '£100 staked clears £10'],
  ['Blackjack and baccarat', '5%', '£100 staked clears £5'],
  ['Live dealer tables', '5%', '£100 staked clears £5'],
  ['Video poker', '0%', 'Does not contribute'],
];

const KEY_TERMS: { term: string; value: string; note: string }[] = [
  {
    term: 'Wagering requirement',
    value: '35×',
    note: 'Applied to the bonus amount only, not deposit plus bonus.',
  },
  {
    term: 'Maximum bet while wagering',
    value: '£5',
    note: 'Per spin or per round. Exceeding it voids the bonus.',
  },
  {
    term: 'Time to complete',
    value: '30 days',
    note: 'From the moment the bonus is credited, not from registration.',
  },
  {
    term: 'Maximum win from bonus',
    value: '5× bonus',
    note: 'Anything above the cap is removed when the bonus converts.',
  },
];

export const BonusTerms: React.FC = () => {
  return (
    <section className="rounded-2xl border border-ink-200 bg-white p-6 sm:p-8">

      <div className="max-w-2xl">
        <span className="eyebrow eyebrow-brand">Before you claim</span>
        <h2 className="mt-2.5 text-[26px] sm:text-[30px] font-semibold tracking-[-0.03em] text-ink-900">
          What the welcome bonus actually costs
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
          A 200% match is a real offer, but it is a loan against your play rather than free
          money. Here is every condition attached to it, in the same place, without a link
          chain.
        </p>
      </div>

      {/* Four key numbers — deliberately not padded out to six */}
      <div className="mt-7 grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-ink-200 bg-ink-200 sm:grid-cols-2 lg:grid-cols-4">
        {KEY_TERMS.map((k) => (
          <div key={k.term} className="bg-white p-4">
            <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-500">
              {k.term}
            </span>
            <div className="mt-2 font-mono text-2xl font-semibold tracking-tight text-ink-900">
              {k.value}
            </div>
            <p className="mt-1.5 text-[12px] leading-relaxed text-ink-500">{k.note}</p>
          </div>
        ))}
      </div>

      {/* Worked example */}
      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <h3 className="text-[15px] font-semibold text-ink-900">A worked example</h3>
          <div className="prose-1x mt-3 text-[14px]">
            <p>
              Deposit <strong>£100</strong> and take the 200% match. You receive{' '}
              <strong>£200</strong> in bonus funds, giving a £300 balance.
            </p>
            <p>
              The 35× requirement applies to the bonus, so <strong>£7,000</strong> has to be
              staked before it converts. On slots at 100% weighting that is 3,500 spins at £2.
              On 1xCrash at 20% it is <strong>£35,000</strong> of stakes — which is why nobody
              clears a bonus on crash.
            </p>
            <p>
              Your own £100 is spent first and stays withdrawable throughout. Bonus funds only
              come into play once the cash balance reaches zero, and only then does the clock
              really matter.
            </p>
          </div>

          <div className="mt-5 rounded-xl border border-ink-200 bg-ink-25 p-4">
            <p className="text-[13px] leading-relaxed text-ink-600">
              <strong className="font-semibold text-ink-900">You can decline it.</strong> Pick
              &ldquo;no bonus&rdquo; at registration and your deposit carries no conditions at
              all — no wagering, no max bet, no expiry, and withdrawals whenever you like. For
              a lot of players that is the better deal, and we would rather say so here than
              field the complaint later.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <h3 className="text-[15px] font-semibold text-ink-900">Game weighting</h3>
          <p className="mt-1.5 text-[13px] leading-relaxed text-ink-500">
            Not every game clears wagering at the same rate. Low-edge games contribute least,
            for the obvious reason.
          </p>
          <div className="mt-4">
            <DataTable
              columns={['Game type', 'Contribution', 'In practice']}
              rows={WEIGHTING_ROWS}
              note="Weighting is applied at the moment each bet settles. Changing games mid-bonus does not retroactively adjust progress already earned."
            />
          </div>
        </div>
      </div>

      {/* Small print */}
      <div className="mt-9 border-t border-ink-200 pt-6">
        <h3 className="text-[13px] font-semibold text-ink-900">The rest of the small print</h3>
        <ul className="fine-print mt-3 grid grid-cols-1 gap-x-10 gap-y-2 md:grid-cols-2">
          <li>One welcome bonus per person, household, card and IP address.</li>
          <li>Minimum qualifying deposit is £10. Deposits below this do not trigger the match.</li>
          <li>Deposits by Skrill or Neteller do not qualify, per the providers&rsquo; own terms.</li>
          <li>Requesting a withdrawal before wagering completes forfeits the bonus and its winnings.</li>
          <li>Free spins are credited 24 hours after the deposit clears and expire 7 days later.</li>
          <li>Free spin winnings are paid as bonus funds and carry the same 35× requirement.</li>
          <li>Bets covering both sides of an even-money market do not count toward wagering.</li>
          <li>We may withdraw or amend an offer at any time; changes never apply retroactively.</li>
        </ul>
        <p className="fine-print mt-4">
          Full promotional terms were last updated 2 August 2026. Where this summary and the
          full terms disagree, the full terms apply.
        </p>
      </div>

    </section>
  );
};
