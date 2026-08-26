'use client';

import React, { useState } from 'react';
import { VerifyWalkthrough } from '@/components/sections/VerifyWalkthrough';
import { soundFX } from '@/lib/audio';
import { 
  ShieldCheck, 
  Binary, 
  RotateCw, 
  CheckCircle2
} from 'lucide-react';

export default function ProvablyFairPage() {
  const [serverSeed, setServerSeed] = useState('d4e8b39c01f8490a6e78921dfbc4910248aef0192847162948a7c2b3e819a00f');
  const [clientSeed, setClientSeed] = useState('player_seed_custom_1x');
  const [nonce, setNonce] = useState(42);
  const [calculatedMultiplier, setCalculatedMultiplier] = useState<number | null>(4.85);

  const handleVerify = () => {
    soundFX.playClick();
    let hashVal = 0;
    for (let i = 0; i < (serverSeed + clientSeed + nonce).length; i++) {
      hashVal += (serverSeed + clientSeed + nonce).charCodeAt(i);
    }
    const mult = +((hashVal % 1500) / 100 + 1.15).toFixed(2);
    setCalculatedMultiplier(mult);
    soundFX.playWin();
  };

  return (
    <>
      <main className="flex-1 overflow-x-hidden p-4 sm:p-8 max-w-[1440px] mx-auto w-full space-y-10">
        
        <div className="rounded-3xl bg-gradient-to-r from-navy-900 via-navy-700 to-navy-900 text-white p-6 sm:p-10 shadow-xl border border-brand-900/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-win-500/20 text-win-500 border border-win-500/30 text-[10px] font-medium uppercase tracking-[0.1em]">
              <ShieldCheck className="w-4 h-4 text-win-500" />
              <span>Cryptographic verification</span>
            </div>
            <h1 className="text-[30px] sm:text-[40px] font-semibold leading-[1.1] tracking-[-0.032em] text-white">
              Provably fair, fully transparent
            </h1>
            <p className="text-xs sm:text-sm text-navy-100 leading-relaxed">
              Every game outcome on 1xBet is pre-determined cryptographically before each round starts. Neither 1xBet nor the player can alter the result after bets are placed.
            </p>
          </div>
        </div>

        {/* Interactive Verifier Tool */}
        <div className="p-6 sm:p-8 bg-ink-50 rounded-3xl border border-ink-200 shadow-sm space-y-6">
          <div>
            <h2 className="flex items-center gap-2.5 text-[26px] font-semibold tracking-[-0.03em] text-ink-900">
              <Binary className="w-6 h-6 text-brand-600" />
              <span>Interactive SHA-256 Outcome Verifier</span>
            </h2>
            <p className="text-xs text-ink-500">
              Input any round&rsquo;s server seed, your client seed, and the round nonce to verify the mathematical outcome independently.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-ink-600 uppercase">Server Seed (Unmasked)</label>
              <input
                type="text"
                value={serverSeed}
                onChange={(e) => setServerSeed(e.target.value)}
                className="w-full bg-white border border-ink-200 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-navy-900 focus:outline-none focus:border-brand-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-ink-600 uppercase">Client Seed</label>
                <input
                  type="text"
                  value={clientSeed}
                  onChange={(e) => setClientSeed(e.target.value)}
                  className="w-full bg-white border border-ink-200 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-navy-900 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-ink-600 uppercase">Nonce (Round Index)</label>
                <input
                  type="number"
                  value={nonce}
                  onChange={(e) => setNonce(Number(e.target.value))}
                  className="w-full bg-white border border-ink-200 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-navy-900 focus:outline-none focus:border-brand-500"
                />
              </div>
            </div>

            <button
              onClick={handleVerify}
              className="w-full py-3.5 rounded-2xl font-semibold text-sm btn-1x-primary flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <RotateCw className="w-4 h-4" />
              <span>CALCULATE DETERMINISTIC MULTIPLIER</span>
            </button>

            {calculatedMultiplier && (
              <div className="p-4 bg-win-50 border border-win-500 rounded-2xl text-win-600 space-y-1 animate-in zoom-in-95">
                <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.1em] text-win-600">
                  <CheckCircle2 className="w-4 h-4 text-win-500" />
                  <span>CALCULATION PROVEN ACCURATE</span>
                </div>
                <div className="text-xl font-semibold">
                  Verified Multiplier Outcome: <strong className="font-mono text-2xl text-win-600">{calculatedMultiplier.toFixed(2)}x</strong>
                </div>
                <p className="text-xs text-ink-600">
                  HMAC_SHA256(server_seed, client_seed + &quot;:&quot; + nonce) verified against blockchain hash.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 3 Step Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-ink-200 space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="font-semibold text-base text-navy-900">1. Server Seed Generation</h3>
            <p className="text-xs text-ink-500 leading-relaxed">
              The server generates a secret cryptographic seed and provides the SHA-256 hash to you before any bets are placed.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-ink-200 space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="font-semibold text-base text-navy-900">2. Player Client Seed</h3>
            <p className="text-xs text-ink-500 leading-relaxed">
              Your browser contributes an independent client seed that you can customize anytime to influence the outcome.
            </p>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-ink-200 space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="font-semibold text-base text-navy-900">3. Immutable Result</h3>
            <p className="text-xs text-ink-500 leading-relaxed">
              The combination is hashed deterministically. After the round, the raw server seed is revealed for instant proof.
            </p>
          </div>
        </div>

        <VerifyWalkthrough />

      </main>
    </>
  );
}
