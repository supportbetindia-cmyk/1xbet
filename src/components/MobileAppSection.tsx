'use client';

import React, { useState } from 'react';
import { 
  Smartphone, 
  Download, 
  QrCode, 
  CheckCircle2, 
  Apple, 
  Zap, 
  ShieldCheck, 
  BellRing 
} from 'lucide-react';
import { soundFX } from '@/lib/audio';
import { useSite } from '@/components/SiteChrome';

export const MobileAppSection: React.FC = () => {
  const { showToast } = useSite();
  const [platform, setPlatform] = useState<'ios' | 'android'>('android');

  const handleDownload = (os: string) => {
    soundFX.playClick();
    showToast(`Downloading official 1xBet ${os} app package...`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-navy-950 via-navy-900 to-navy-950 py-16 text-white">
      {/* Glow Effects */}
      <div className="pointer-events-none absolute top-10 left-10 h-72 w-72 rounded-full bg-brand-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-72 w-72 rounded-full bg-brand-400/10 blur-[100px]" />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Content Column */}
          <div className="space-y-6 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1 text-xs font-bold text-brand-300 backdrop-blur-md">
              <Smartphone className="h-3.5 w-3.5" />
              <span>NATIVE MOBILE EXPERIENCE</span>
            </div>

            <h2 className="text-[32px] sm:text-[44px] font-black tracking-[-0.03em] leading-tight text-white">
              Bet on the Move with the Official 1xBet App
            </h2>

            <p className="text-sm sm:text-base text-navy-200 max-w-xl leading-relaxed">
              Experience zero-lag 120 FPS gaming, instant biometric Face ID access, and live in-play sports streaming directly in your pocket.
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-500/20 text-brand-400 border border-brand-500/30">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">120Hz Ultra-Smooth</h4>
                  <p className="text-xs text-navy-300">Lag-free Aviator flights &amp; live tables.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-win-500/20 text-win-400 border border-win-500/30">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Biometric Security</h4>
                  <p className="text-xs text-navy-300">Instant Face ID &amp; fingerprint login.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <BellRing className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Instant Win Alerts</h4>
                  <p className="text-xs text-navy-300">Real-time push alerts for payouts &amp; goals.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Built-in Mirror Proxy</h4>
                  <p className="text-xs text-navy-300">Uninterrupted access anytime, anywhere.</p>
                </div>
              </div>
            </div>

            {/* Direct Download Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => handleDownload('Android APK')}
                className="btn-1x-primary flex items-center gap-3 px-6 py-3.5 text-sm font-bold shadow-lg shadow-brand-500/25 cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <div className="text-left leading-tight">
                  <span className="text-[10px] font-normal block opacity-80">Download for</span>
                  <span>Android (.APK)</span>
                </div>
              </button>

              <button
                onClick={() => handleDownload('iOS PWA')}
                className="flex items-center gap-3 rounded-xl border border-white/20 bg-line px-6 py-3.5 text-sm font-bold text-white backdrop-blur-md transition hover:bg-white/20 cursor-pointer"
              >
                <Apple className="h-4 w-4" />
                <div className="text-left leading-tight">
                  <span className="text-[10px] font-normal block opacity-80">Download for</span>
                  <span>iOS (Apple App)</span>
                </div>
              </button>
            </div>
          </div>

          {/* Right Column: QR Code & Mobile Mockup Preview */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-sm rounded-3xl border border-white/15 bg-gradient-to-b from-navy-900/90 to-navy-950 p-7 shadow-2xl backdrop-blur-xl text-center space-y-5">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-brand-300">
                <QrCode className="h-4 w-4" />
                <span>SCAN TO INSTALL ON MOBILE</span>
              </div>

              {/* High-Contrast QR Code Artwork */}
              <div className="mx-auto w-44 h-44 rounded-2xl bg-white p-3 shadow-xl flex items-center justify-center border-4 border-brand-500">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <rect width="100" height="100" fill="#ffffff" />
                  {/* Outer corner markers */}
                  <rect x="10" y="10" width="24" height="24" fill="#001124" />
                  <rect x="14" y="14" width="16" height="16" fill="#ffffff" />
                  <rect x="18" y="18" width="8" height="8" fill="#007acc" />

                  <rect x="66" y="10" width="24" height="24" fill="#001124" />
                  <rect x="70" y="14" width="16" height="16" fill="#ffffff" />
                  <rect x="74" y="18" width="8" height="8" fill="#007acc" />

                  <rect x="10" y="66" width="24" height="24" fill="#001124" />
                  <rect x="14" y="70" width="16" height="16" fill="#ffffff" />
                  <rect x="18" y="74" width="8" height="8" fill="#007acc" />

                  {/* QR Matrix Dots */}
                  <rect x="42" y="12" width="6" height="6" fill="#001124" />
                  <rect x="52" y="18" width="6" height="6" fill="#001124" />
                  <rect x="40" y="38" width="8" height="8" fill="#007acc" />
                  <rect x="52" y="44" width="8" height="8" fill="#001124" />
                  <rect x="66" y="42" width="6" height="6" fill="#001124" />
                  <rect x="76" y="52" width="8" height="8" fill="#007acc" />
                  <rect x="42" y="66" width="6" height="6" fill="#001124" />
                  <rect x="56" y="74" width="6" height="6" fill="#007acc" />
                  <rect x="70" y="70" width="8" height="8" fill="#001124" />
                  <rect x="80" y="80" width="6" height="6" fill="#007acc" />

                  {/* Center Emblem */}
                  <circle cx="50" cy="50" r="8" fill="#007acc" />
                  <text x="50" y="53" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">1X</text>
                </svg>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold text-white block">
                  Compatible with iOS 14+ &amp; Android 8.0+
                </span>
                <span className="text-[11px] text-navy-300 block">
                  Scan with your phone camera to download instantly
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
