import React from 'react';

const STEPS: { n: string; title: string; body: React.ReactNode }[] = [
  {
    n: '01',
    title: 'Copy the hash before you bet',
    body: (
      <>
        <p>
          Open <strong>Game → Fairness</strong> in any 1xOriginals title. The panel shows the
          hashed server seed for the round that is about to start. Copy it somewhere outside
          the site — a notes app is fine. The point is to hold a copy we cannot edit later.
        </p>
      </>
    ),
  },
  {
    n: '02',
    title: 'Set your own client seed',
    body: (
      <>
        <p>
          The same panel lets you replace the client seed with any string you like. Type
          something only you would pick. Because the result is derived from both seeds
          combined, we cannot know the outcome in advance without knowing your half — and you
          chose it after we committed to ours.
        </p>
      </>
    ),
  },
  {
    n: '03',
    title: 'Play the round, then reveal the seed',
    body: (
      <>
        <p>
          When the round settles, the unhashed server seed appears in the history. Take it and
          run it through any SHA-256 tool. In a terminal that is one line:
        </p>
        <pre className="mt-3 overflow-x-auto rounded-lg border border-ink-200 bg-ink-25 p-3.5 font-mono text-[12px] leading-relaxed text-ink-800">
          <code>echo -n &quot;&lt;revealed-server-seed&gt;&quot; | shasum -a 256</code>
        </pre>
        <p>
          If the output matches the hash you copied in step one, the seed existed before you
          bet and was never swapped. If it does not match, something is wrong and we would want
          to hear about it immediately.
        </p>
      </>
    ),
  },
  {
    n: '04',
    title: 'Reproduce the result yourself',
    body: (
      <>
        <p>
          The round outcome is <code>HMAC_SHA256(server_seed, client_seed:nonce)</code>, where
          the nonce is the round number. Take the first 13 hex characters of that digest, read
          them as an integer, and divide by 2<sup>52</sup> to get a number between 0 and 1.
          Feed it through the crash formula and you have the multiplier we paid out.
        </p>
        <p>
          None of this requires our verifier. That is the entire idea — the maths belongs to
          you, not to us.
        </p>
      </>
    ),
  },
];

export const VerifyWalkthrough: React.FC = () => {
  return (
    <section className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">

      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <span className="eyebrow eyebrow-brand">Do it yourself</span>
          <h2 className="mt-2.5 text-[26px] sm:text-[32px] font-semibold tracking-[-0.03em] text-ink-900">
            Verifying a round by hand
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-600">
            &ldquo;We use SHA-256&rdquo; is a claim, not evidence. These four steps are how you
            check it without trusting anything on this page.
          </p>
          <p className="mt-4 text-[13px] leading-relaxed text-ink-500">
            Takes about five minutes the first time. Once you have done it on one round, the
            same method works on every game we run.
          </p>
        </div>
      </div>

      <div className="lg:col-span-8">
        <ol className="space-y-0">
          {STEPS.map((step, i) => (
            <li
              key={step.n}
              className={`flex gap-5 sm:gap-7 ${
                i === 0 ? '' : 'border-t border-ink-200'
              } py-7 first:pt-0`}
            >
              <span className="shrink-0 font-mono text-[13px] font-medium text-brand-500">
                {step.n}
              </span>
              <div className="min-w-0">
                <h3 className="text-[16px] font-semibold tracking-tight text-ink-900">
                  {step.title}
                </h3>
                <div className="prose-1x mt-2 text-[14px]">{step.body}</div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 rounded-xl border border-ink-200 bg-ink-25 p-4">
          <p className="text-[13px] leading-relaxed text-ink-600">
            <strong className="font-semibold text-ink-900">What this does not prove.</strong>{' '}
            Provably fair confirms a specific round was not tampered with. It says nothing
            about the house edge, which is disclosed separately in each game&rsquo;s RTP and is
            working against you whether or not the maths checks out. Both things are true at
            once.
          </p>
        </div>
      </div>

    </section>
  );
};
