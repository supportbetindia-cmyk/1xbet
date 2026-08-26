import React from 'react';
import { DataTable } from '@/components/editorial/DataTable';

/**
 * Editorial explainer for the crash format.
 *
 * The probability column is derived, not decorative: with a 99% RTP the chance
 * of a round reaching multiplier x is 0.99 / x, and the break-even win rate is
 * 1 / x. The gap between those two columns is the house edge, which is the
 * point the section is making.
 */
const ODDS_ROWS = [
  ['1.50×', '66.0%', '66.7%'],
  ['2.00×', '49.5%', '50.0%'],
  ['5.00×', '19.8%', '20.0%'],
  ['10.0×', '9.90%', '10.0%'],
  ['100×', '0.99%', '1.00%'],
];

export const HowCrashWorks: React.FC = () => {
  return (
    <section className="border-t border-ink-200 bg-white py-14">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">

          {/* ---------- Article ---------- */}
          <div className="lg:col-span-7">
            <span className="eyebrow eyebrow-brand">The format explained</span>
            <h2 className="mt-2.5 text-[26px] sm:text-[32px] font-semibold tracking-[-0.03em] text-ink-900">
              How crash betting actually works
            </h2>

            <div className="prose-1x mt-6">
              <p>
                Every round, the server picks the crash point <em>before</em> the plane leaves
                the runway. It is committed as a hashed value you can check afterwards, which
                is the entire point of the provably fair system: the number cannot move once
                betting opens, not by us and not by you.
              </p>
              <p>
                The plane climbs and the multiplier climbs with it. Your bet is worth your
                stake multiplied by whatever the counter reads at the instant you cash out.
                Leave it a half second too long and the plane flies away with the lot.
              </p>

              <h3>Where the house edge comes from</h3>
              <p>
                One round in a hundred busts instantly at <code>1.00×</code>. That single
                outcome is the whole margin. Every other round pays at true odds, which is why
                1xCrash runs at 99% RTP against the 94–96% typical of a slot.
              </p>
              <p>
                The practical effect is smaller than people expect, and more relentless. Cash
                out at 2.00× every round and you win roughly 49.5% of the time rather than
                50%. Across ten rounds that gap is invisible. Across ten thousand it is the
                only thing that matters.
              </p>

              <h3>On betting systems</h3>
              <p>
                Martingale is the one people arrive with: double your stake after every loss,
                so the first win clears the deficit. It does work, right up until it doesn&rsquo;t.
                The flaw isn&rsquo;t the arithmetic, it&rsquo;s the table ceiling. Ten losses in a row from
                a £1 opening stake needs a £1,024 bet to recover that original pound, and the
                crash table caps at £500. A ten-loss streak at 2.00× arrives about once every
                1,900 rounds, which sounds rare until you notice a busy player sees that many
                in a fortnight.
              </p>
              <p>
                No staking pattern changes the edge. It only changes how quickly you meet it.
              </p>
            </div>
          </div>

          {/* ---------- Figures ---------- */}
          <aside className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <h3 className="text-[13px] font-semibold tracking-tight text-ink-900">
                Cash-out odds at a glance
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-500">
                What each target is actually worth, and what you&rsquo;d need to hit for the bet
                to be neutral.
              </p>

              <div className="mt-4">
                <DataTable
                  columns={['Cash out at', 'Chance of reaching', 'Break-even rate']}
                  rows={ODDS_ROWS}
                  note={
                    <>
                      Chance of reaching <em>x</em> is 0.99 ÷ <em>x</em>; break-even is
                      1 ÷ <em>x</em>. The difference between the two columns is the house edge,
                      and it is identical at every target.
                    </>
                  }
                />
              </div>

              <div className="mt-6 rounded-xl border border-ink-200 bg-ink-25 p-4">
                <p className="text-[13px] leading-relaxed text-ink-600">
                  <strong className="font-semibold text-ink-900">Worth knowing.</strong>{' '}
                  A higher target does not improve your position. 100× pays 100× and lands
                  once in 101 rounds. The edge is flat across the board, so pick the target
                  that suits how long you want a round to last, not the one you think pays
                  best.
                </p>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
};
