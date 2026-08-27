'use client';

import React from 'react';
import Link from 'next/link';
import {
  Smartphone,
  ShieldCheck,
  ArrowRight,
  Download,
  Zap,
  Radio,
  Bell,
  QrCode,
  Lock,
  Apple,
  Check,
} from 'lucide-react';
import { useSite } from '@/components/SiteChrome';
import { soundFX } from '@/lib/audio';

const FEATURES = [
  { label: 'Fast 1-Tap Bets', desc: 'Zero latency live odds', icon: Zap },
  { label: '4K Live Streams', desc: 'Multi-angle studio feeds', icon: Radio },
  { label: 'Biometric Access', desc: 'Face ID & Fingerprint login', icon: ShieldCheck },
  { label: 'Instant Alerts', desc: 'Score & cashout push notices', icon: Bell },
];

const SPECS: [string, string][] = [
  ['Version', 'v14.2.0'],
  ['Size', '48.2 MB'],
  ['Requires', 'Android 8+ / iOS 14+'],
];

export const MobileAppSection: React.FC = () => {
  const { openAuth, showToast } = useSite();

  const handleDownloadClick = (os: string) => {
    soundFX.playClick();
    showToast(`Downloading official 1xBet ${os} package...`);
    openAuth();
  };

  return (
    <section
      id="app"
      className="relative overflow-hidden border-t border-line bg-canvas py-16 sm:py-20 lg:py-24"
    >
      {/* Navy hairline grid — structure on the white field, not a tint. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(0,47,94,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,47,94,0.05) 1px, transparent 1px)',
          backgroundSize: '68px 68px',
          maskImage: 'linear-gradient(to bottom, #000 0%, transparent 78%)',
        }}
      />

      <div className="relative mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">

          {/* ---------------- Left: copy ---------------- */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2.5">
              <span className="live-dot" />
              <span className="inline-flex items-center gap-1.5 rounded-[5px] border border-brand-500/25 bg-brand-500/8 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-600">
                <Smartphone className="h-3.5 w-3.5" aria-hidden />
                Take 1xBet With You
              </span>
              <span className="h-px w-10 bg-brand-500/35" aria-hidden />
            </div>

            <h2 className="mt-4 text-[clamp(2.2rem,4.5vw,3.6rem)] uppercase leading-[1.03]">
              1xBet App &amp; <span className="text-brand-600">Mobile Access</span>
            </h2>

            <p className="mt-5 text-[18px] font-semibold leading-relaxed text-fg">
              Your phone can be another way to access the platform.
            </p>

            <div className="mt-4 max-w-2xl space-y-3.5 text-[15px] leading-relaxed text-fg-muted">
              <p>
                The 1xBet app provides a mobile-focused experience for supported devices,
                allowing registered users to access their account and available platform
                features without relying only on a desktop browser.
              </p>
              <p>
                For users searching for the 1xBet India app, availability can depend on the
                device, operating system and region. The mobile experience may also differ
                from the desktop website.
              </p>
              <p>
                If you prefer using a browser, supported mobile web access may provide
                another option.
              </p>
            </div>

            {/* Feature grid — hairline gaps so four tiles read as one board */}
            <div className="mt-7 grid grid-cols-1 gap-px overflow-hidden rounded-[10px] border border-line bg-line sm:grid-cols-2">
              {FEATURES.map((feat) => (
                <div key={feat.label} className="flex items-start gap-3 bg-canvas p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] bg-brand-500/10 text-brand-600">
                    <feat.icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-[13px] font-bold text-fg">{feat.label}</span>
                    <span className="mt-0.5 block text-[12px] text-fg-dim">{feat.desc}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ---------------- Right: download panel (no imagery) ---------------- */}
          <div className="lg:col-span-5">
            <div className="panel overflow-hidden">

              <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5">
                <span className="label label-volt">Get the app</span>
                <span className="chip chip-live">
                  <span className="live-dot" />
                  Live in-play engine
                </span>
              </div>

              <div className="p-5">
                {/* QR block — drawn from a vector glyph, not an image asset */}
                <div className="flex items-center gap-4 rounded-[8px] border border-line bg-surface-1 p-4">
                  <span className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-[6px] border border-line-strong bg-canvas p-2 text-fg">
                    <QrCode className="h-full w-full" strokeWidth={1.4} aria-hidden />
                  </span>
                  <span>
                    <span className="label text-[10px]">Scan to install</span>
                    <span className="mt-1.5 block text-[15px] font-bold text-fg">
                      Direct download
                    </span>
                    <span className="mt-1 block text-[12px] leading-snug text-fg-dim">
                      Point your camera at the code to open the official install page.
                    </span>
                  </span>
                </div>

                {/* Download actions */}
                <div className="mt-4 grid grid-cols-1 gap-2.5">
                  <button
                    onClick={() => handleDownloadClick('Android APK')}
                    className="group inline-flex min-h-[52px] cursor-pointer items-center gap-3 rounded-[6px]
                               bg-brand-500 px-5 text-left text-white shadow-[0_8px_24px_rgba(0,122,204,0.26)]
                               transition-colors hover:bg-brand-600 active:translate-y-px
                               focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                  >
                    <Download
                      className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                    <span>
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.1em] opacity-80">
                        Download for
                      </span>
                      <span className="block text-[14px] font-bold">Android (.APK)</span>
                    </span>
                  </button>

                  <button
                    onClick={() => handleDownloadClick('iOS')}
                    className="group inline-flex min-h-[52px] cursor-pointer items-center gap-3 rounded-[6px]
                               border border-line-strong bg-canvas px-5 text-left text-fg
                               transition-colors hover:border-brand-500/60 hover:bg-surface-1
                               focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                  >
                    <Apple
                      className="h-5 w-5 shrink-0 text-fg-muted transition-transform duration-300 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                    <span>
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.1em] text-fg-dim">
                        Download for
                      </span>
                      <span className="block text-[14px] font-bold">iOS App Store</span>
                    </span>
                  </button>

                  <Link
                    href="/app"
                    className="group inline-flex min-h-[46px] items-center justify-between gap-2 rounded-[6px]
                               border border-brand-500/30 bg-brand-500/8 px-5 text-[14px] font-semibold text-brand-600
                               transition-colors hover:bg-brand-500/14
                               focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                  >
                    Explore Mobile Access
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </Link>
                </div>

                {/* Specs — a small data table rather than a caption strip */}
                <dl className="mt-5 border-t border-line pt-4">
                  {SPECS.map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-baseline justify-between gap-3 border-b border-line py-2 last:border-b-0"
                    >
                      <dt className="text-[13px] text-fg-dim">{k}</dt>
                      <dd className="font-mono text-[13px] font-semibold text-fg">{v}</dd>
                    </div>
                  ))}
                  <div className="flex items-baseline justify-between gap-3 pt-2">
                    <dt className="text-[13px] text-fg-dim">Security</dt>
                    <dd className="flex items-center gap-1.5 text-[13px] font-semibold text-win-600">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
                      Verified SSL
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- Bottom: download guidance + mobile access ---------------- */}
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">

          <div className="panel p-6 transition-colors duration-300 hover:border-brand-500/45 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-brand-500/25 bg-brand-500/10 text-brand-600">
                <Download className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="label label-volt block">Official installation method</span>
                <h3 className="mt-1 text-[20px] uppercase">1xBet Download</h3>
              </span>
            </div>

            <p className="mt-5 text-[16px] font-semibold text-fg">
              Looking for 1xBet download information?
            </p>

            <div className="mt-3 space-y-3 text-[14px] leading-relaxed text-fg-muted">
              <p>
                Always check the official 1xBet platform for the current installation method
                available for your device and location. Application requirements and
                supported platforms can change, so the latest official instructions should be
                used.
              </p>
              <p>
                Avoid downloading applications from unknown websites or unofficial sources. A
                third-party file may be outdated or modified and can create unnecessary
                security risks.
              </p>
              <p>
                Before installing the 1xBet mobile app, make sure the application source is
                official and that your device meets the relevant requirements.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-4 text-[13px] font-semibold">
              <span className="flex items-center gap-1.5 text-win-600">
                <ShieldCheck className="h-4 w-4" aria-hidden />
                Always verify official certificates
              </span>
              <button
                onClick={openAuth}
                className="flex cursor-pointer items-center gap-1 text-fg transition-colors hover:text-brand-600
                           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                Install Guide &rarr;
              </button>
            </div>
          </div>

          <div className="panel p-6 transition-colors duration-300 hover:border-brand-500/45 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-[8px] border border-brand-500/25 bg-brand-500/10 text-brand-600">
                <Smartphone className="h-5 w-5" aria-hidden />
              </span>
              <span>
                <span className="label label-volt block">On the go access</span>
                <h3 className="mt-1 text-[20px] uppercase">Mobile Made Simple</h3>
              </span>
            </div>

            <p className="mt-5 text-[16px] font-semibold text-fg">
              Your 1xBet Account on the Go
            </p>

            <div className="mt-3 space-y-3 text-[14px] leading-relaxed text-fg-muted">
              <p>
                A mobile device gives registered users another way to access supported 1xBet
                features.
              </p>
              <p>
                Whether you use the 1xBet mobile app or a supported mobile website, the
                experience is designed around accessing your account and available platform
                sections from a smaller screen.
              </p>
              <p>
                The exact mobile features can vary by device and location. Users should always
                check the official platform for the latest information about application
                availability and supported devices.
              </p>
              <p className="border-l-2 border-brand-500 pl-3 font-medium text-fg">
                For security, keep your phone protected and avoid saving account credentials
                on shared or public devices.
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-4 text-[13px] font-semibold">
              <span className="flex items-center gap-1.5 text-brand-600">
                <Lock className="h-4 w-4" aria-hidden />
                Biometric Protection Supported
              </span>
              <button
                onClick={openAuth}
                className="flex cursor-pointer items-center gap-1 text-fg transition-colors hover:text-brand-600
                           focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              >
                Open Web App &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
