'use client';

import React from 'react';
import Link from 'next/link';
import { Accordion, AccordionEntry } from '@/components/ui/Accordion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { soundFX } from '@/lib/audio';

interface FAQItem {
  question: string;
  /** Node rather than string so answers can carry paragraphs, links and figures. */
  answer: React.ReactNode;
  category: string;
}

export const FAQSection: React.FC = () => {
  const faqs: FAQItem[] = [
    {
      category: 'Payouts',
      question: 'How long does a withdrawal really take?',
      answer: (
        <>
          <p>
            The published times start when a payout is <strong>approved</strong>, not when you
            request it. Approval normally lands inside 12 hours. If the amount is unusual for
            your account history, or your documents are near expiry, it goes to manual review
            and can take up to 72 hours.
          </p>
          <p>
            Crypto is genuinely quick once approved — most confirm in under ten minutes. Cards
            are slow because the money travels back through the same acquiring bank that took
            it, and that leg is not ours to speed up.
          </p>
        </>
      ),
    },
    {
      category: 'Bonuses',
      question: 'Why was my withdrawal cancelled and my balance reduced?',
      answer: (
        <>
          <p>
            Almost always an active bonus. Requesting a withdrawal before wagering is finished
            forfeits the bonus and everything won with it, leaving only your own cash. There is
            a confirmation dialog that says so in plain language, and it is the most
            clicked-through warning on the site.
          </p>
          <p>
            Check the wagering bar in your account first. If it is not at 100%, either finish
            it or drop the bonus on purpose.
          </p>
        </>
      ),
    },
    {
      category: 'Bonuses',
      question: 'What does 35× wagering actually mean?',
      answer: (
        <>
          <p>
            It means the bonus amount has to be staked 35 times before it becomes real money.
            Deposit £100, take the 200% offer, and you hold £200 in bonus funds — so £7,000
            must go through the games before a penny of it is withdrawable.
          </p>
          <p>
            At £2 a spin that is 3,500 spins. Most people do not get there, which is the honest
            reason the offer can be this generous. If you would rather not carry the condition,
            decline the bonus at registration and your deposit stays unrestricted.
          </p>
        </>
      ),
    },
    {
      category: '1xCrash',
      question: 'What happens if I lose connection during a round?',
      answer: (
        <p>
          The bet stands. Rounds resolve on the server, so closing the tab changes nothing. If
          you set an auto cash-out it still fires at your target and the win is credited. If you
          did not set one, the bet rides all the way to the crash point and loses. That is
          precisely why the auto cash-out field exists, and why it is worth setting on a mobile
          connection.
        </p>
      ),
    },
    {
      category: 'Fairness',
      question: 'How do I verify a round was fair, rather than take your word for it?',
      answer: (
        <>
          <p>
            Before a round opens we publish the SHA-256 hash of the server seed. After it
            settles we reveal the seed itself. Hash the revealed seed and you should get the
            string published beforehand — if it matches, the outcome was fixed before anyone
            placed a bet.
          </p>
          <p>
            You do not have to trust our tool for this. Any SHA-256 calculator gives the same
            answer. The full walkthrough is on{' '}
            <Link href="/provably-fair">the provably fair page</Link>.
          </p>
        </>
      ),
    },
    {
      category: 'Deposits',
      question: 'Why does money have to come back the same way it went in?',
      answer: (
        <p>
          Anti-money-laundering rules, not preference. Funds return by the original method up to
          the amount deposited. Put in £50 by card and win £400, and the first £50 goes back to
          that card while the remaining £350 needs a second verified method on file. Adding one
          before you request a payout saves a day.
        </p>
      ),
    },
    {
      category: 'Fairness',
      question: 'Is the RTP different in demo mode?',
      answer: (
        <p>
          No. Demo play runs the same RNG and the same paytables as real money — only the
          balance is fake. Worth saying plainly though: a demo session tells you very little
          either way. A few hundred spins is far too small a sample to reveal anything about a
          game&rsquo;s actual return.
        </p>
      ),
    },
    {
      category: 'Accounts',
      question: 'Can I open a second account?',
      answer: (
        <p>
          No. One account per person, household and IP address. Duplicates are closed when found
          and any bonus claimed on the second is removed. If you genuinely share an address with
          another player, tell support before you deposit rather than letting it surface during
          a withdrawal check.
        </p>
      ),
    },
    {
      category: 'Accounts',
      question: 'Which countries are restricted?',
      answer: (
        <p>
          The licence does not cover the United States, the United Kingdom, France, the
          Netherlands, Australia, or any territory under international sanction. The list moves
          as licensing does. A VPN will get you past registration and fail at verification, at
          which point deposits are returned and winnings are not.
        </p>
      ),
    },
    {
      category: 'Player safety',
      question: 'I think I am playing more than I should be.',
      answer: (
        <>
          <p>
            Set a deposit limit now, before the next session rather than during it. Tightening
            one takes effect immediately; loosening it waits 24 hours. That delay is the whole
            point of the tool.
          </p>
          <p>
            If you want a firmer stop, take a cool-off or self-exclusion from{' '}
            <Link href="/responsible-gaming">the player safety page</Link>. Neither can be
            lifted early, by you or by support, and that is deliberate.
          </p>
        </>
      ),
    },
  ];

  const entries: AccordionEntry[] = faqs.map((f, i) => ({
    id: `faq-${i}`,
    question: f.question,
    answer: f.answer,
    category: f.category,
  }));

  return (
    <section id="faq" className="rule-top bg-white">
      <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
        <div className="grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-12">

          {/* Heading holds the left column and stays put while the list scrolls */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading
                kicker="Player knowledge base"
                title={<>The questions people <em>actually</em> ask</>}
                intro="Taken from what the support desk fields most often — including the ones with answers nobody enjoys reading."
                narrow={false}
              />
              <p className="mt-6 text-[13px] leading-relaxed text-ink-500">
                Live chat is staffed around the clock and picks up in about two minutes
                outside peak evenings.
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-4"
                onClick={() => soundFX.playClick()}
              >
                Open live chat
              </Button>
            </div>
          </div>

          <div className="lg:col-span-8">
            <Accordion items={entries} />
          </div>

        </div>
      </div>
    </section>
  );
};
