import React from 'react';
import { DataTable } from '@/components/editorial/DataTable';

const PAYMENT_ROWS: React.ReactNode[][] = [
  ['Visa / Mastercard', '£10', '£4,000', '1–3 working days', 'None'],
  ['Bitcoin', '0.0005 BTC', 'No limit', 'Usually under 10 minutes', 'Network fee only'],
  ['USDT (TRC-20)', '10 USDT', 'No limit', 'Usually under 10 minutes', '1 USDT'],
  ['Skrill / Neteller', '£10', '£5,500', 'Within 15 minutes', 'None'],
  ['Bank transfer', '£20', '£20,000', '2–5 working days', 'None'],
  [
    'Apple Pay',
    '£10',
    '—',
    <span key="ap" className="text-ink-500">Deposit only</span>,
    'None',
  ],
];

export const PaymentsAndLimits: React.FC = () => {
  return (
    <section id="payments" className="border-t border-ink-200 bg-ink-50 py-14">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">

        <div className="max-w-2xl">
          <span className="eyebrow eyebrow-brand">Cashier</span>
          <h2 className="mt-2.5 text-[26px] sm:text-[32px] font-semibold tracking-[-0.03em] text-ink-900">
            Deposits, withdrawals and the small print
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
            Crypto clears in minutes. Cards do not, and no payment provider will let us
            pretend otherwise. Below is what each method actually does, including the one
            that can take money in but cannot send it back out.
          </p>
        </div>

        <div className="mt-7">
          <DataTable
            columns={['Method', 'Min deposit', 'Withdrawal cap (daily)', 'Withdrawal time', 'Fee']}
            rows={PAYMENT_ROWS}
            note="Withdrawal times begin when a payout is approved, not when it is requested. Approval is normally within 12 hours."
          />
        </div>

        {/* Deliberately four unequal notes rather than a tidy three-card row —
            these are the questions the support desk actually receives. */}
        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-[13px] font-semibold text-ink-900">Verification</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-600">
              Your first withdrawal needs photo ID and a proof of address dated within three
              months. Do it on a quiet afternoon rather than the moment you want paying —
              checks take up to 24 hours and everyone submits at the weekend.
            </p>
          </div>

          <div>
            <h3 className="text-[13px] font-semibold text-ink-900">Same method back</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-600">
              Money returns the way it arrived, up to the amount you deposited. Anti-money-laundering
              rules, not preference. Deposit £50 by card and win £400, and the first £50 goes
              back to the card while the remainder needs a second method on file.
            </p>
          </div>

          <div>
            <h3 className="text-[13px] font-semibold text-ink-900">Pending period</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-600">
              There is no reversal window. Once a withdrawal is approved it is gone and cannot
              be pulled back into your balance to gamble. This is intentional, and we will not
              undo it if you ask.
            </p>
          </div>

          <div>
            <h3 className="text-[13px] font-semibold text-ink-900">Crypto network fees</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-ink-600">
              Bitcoin withdrawals carry whatever the network charges at that moment, deducted
              from the amount sent. During congestion this has been as high as £14. USDT on
              TRC-20 is a flat 1 USDT and is the cheaper route most weeks.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
