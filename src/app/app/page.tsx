'use client';

import React from 'react';
import { soundFX } from '@/lib/audio';
import { 
  Smartphone, 
  Apple, 
  Download, 
  ShieldCheck, 
  Zap, 
  Bell, 
  Fingerprint, 
  QrCode
} from 'lucide-react';

export default function MobileAppPage() {
  return (
    <>
      <main className="flex-1 overflow-x-hidden p-4 sm:p-8 max-w-[1440px] mx-auto w-full space-y-10">
        
        {/* Mobile App Hero Header */}
        <div className="rounded-3xl bg-gradient-to-r from-navy-950 via-navy-700 to-navy-950 text-white p-6 sm:p-10 shadow-2xl border border-brand-900/40 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-200 border border-brand-400/30 text-[10px] font-medium uppercase tracking-[0.1em]">
              <Smartphone className="w-4 h-4 text-brand-400" />
              <span>OFFICIAL 1XBET MOBILE APPLICATIONS</span>
            </div>
            <h1 className="text-[32px] sm:text-[40px] lg:text-[48px] font-semibold leading-[1.1] tracking-[-0.035em] text-white">
              Seamless gaming, in your pocket
            </h1>
            <p className="text-xs sm:text-sm text-navy-100 leading-relaxed">
              Enjoy 60FPS fluid animations, biometric FaceID login, push notification jackpot alerts, and zero-latency live dealer streaming anywhere, anytime.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => soundFX.playClick()}
                className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-white text-navy-900 font-semibold text-xs hover:bg-ink-100 transition shadow-lg cursor-pointer"
              >
                <Apple className="w-5 h-5" />
                <div className="text-left">
                  <span className="text-[10px] text-ink-500 uppercase block leading-none">Download on</span>
                  <span className="text-sm font-semibold">Apple iOS</span>
                </div>
              </button>

              <button
                onClick={() => soundFX.playClick()}
                className="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-win-500 text-white font-semibold text-xs hover:bg-win-600 transition shadow-lg cursor-pointer"
              >
                <Download className="w-5 h-5" />
                <div className="text-left">
                  <span className="text-[10px] text-win-50 uppercase block leading-none">Download APK for</span>
                  <span className="text-sm font-semibold">Android Devices</span>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20 text-center space-y-3 shrink-0">
            <div className="w-36 h-36 mx-auto bg-white p-3 rounded-2xl shadow-xl flex items-center justify-center">
              <QrCode className="w-28 h-28 text-navy-900" />
            </div>
            <p className="text-xs text-ink-300 font-semibold">
              Scan QR to install instantly on your phone
            </p>
          </div>
        </div>

        {/* App Key Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-ink-50 rounded-3xl border border-ink-200 space-y-2">
            <Fingerprint className="w-8 h-8 text-brand-600" />
            <h3 className="font-semibold text-base text-navy-900">Biometric FaceID</h3>
            <p className="text-xs text-ink-600">Instant one-touch login with biometric security encryption.</p>
          </div>

          <div className="p-6 bg-ink-50 rounded-3xl border border-ink-200 space-y-2">
            <Zap className="w-8 h-8 text-brass-500" />
            <h3 className="font-semibold text-base text-navy-900">60 FPS Rendering</h3>
            <p className="text-xs text-ink-600">Native GPU hardware acceleration for lag-free 1xCrash flight.</p>
          </div>

          <div className="p-6 bg-ink-50 rounded-3xl border border-ink-200 space-y-2">
            <Bell className="w-8 h-8 text-brand-500" />
            <h3 className="font-semibold text-base text-navy-900">Push Notifications</h3>
            <p className="text-xs text-ink-600">Real-time alerts for mega jackpot drops and daily free spins.</p>
          </div>

          <div className="p-6 bg-ink-50 rounded-3xl border border-ink-200 space-y-2">
            <ShieldCheck className="w-8 h-8 text-win-500" />
            <h3 className="font-semibold text-base text-navy-900">Zero Block Bypass</h3>
            <p className="text-xs text-ink-600">Built-in smart mirror proxy ensuring uninterrupted 24/7 access.</p>
          </div>
        </div>

        {/* Installation Steps */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-navy-900 tracking-tight">
            HOW TO INSTALL (3 SIMPLE STEPS)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-3xl border border-ink-200 shadow-sm space-y-2">
              <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center font-semibold text-xs">
                1
              </div>
              <h4 className="font-semibold text-sm text-navy-900">Download the File</h4>
              <p className="text-xs text-ink-500">Tap the iOS TestFlight or Android APK download button above.</p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-ink-200 shadow-sm space-y-2">
              <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center font-semibold text-xs">
                2
              </div>
              <h4 className="font-semibold text-sm text-navy-900">Allow Installation</h4>
              <p className="text-xs text-ink-500">If prompted, enable &quot;Install unknown apps&quot; in device settings.</p>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-ink-200 shadow-sm space-y-2">
              <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center font-semibold text-xs">
                3
              </div>
              <h4 className="font-semibold text-sm text-navy-900">Open & Enjoy</h4>
              <p className="text-xs text-ink-500">Log in with your existing credentials and enjoy mobile gaming!</p>
            </div>
          </div>
        </div>

      </main>
    </>
  );
}
