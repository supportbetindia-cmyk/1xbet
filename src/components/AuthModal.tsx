'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Zap,
  Smartphone,
  Mail,
  Globe,
  Gift,
  ShieldCheck,
  Sparkles,
  KeyRound,
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { soundFX } from '@/lib/audio';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (username: string) => void;
}

type RegMethod = '1click' | 'phone' | 'email' | 'social';

const METHODS: { id: RegMethod; label: string; icon: React.ElementType }[] = [
  { id: '1click', label: '1-Click', icon: Zap },
  { id: 'phone', label: 'Phone', icon: Smartphone },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'social', label: 'Social', icon: Globe },
];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
}) => {
  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');
  const [regMethod, setRegMethod] = useState<RegMethod>('1click');
  const [selectedBonus, setSelectedBonus] = useState<'casino' | 'sports' | 'none'>('casino');
  const [promoCode, setPromoCode] = useState<string>('1XBONUS');
  const [country, setCountry] = useState<string>('Germany');
  const [currency, setCurrency] = useState<string>('EUR (€)');

  const [loginUser, setLoginUser] = useState<string>('User_884920');
  const [loginPass, setLoginPass] = useState<string>('');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playClick();

    const username =
      authMode === 'register'
        ? `Player_${Math.floor(Math.random() * 89999 + 10000)}`
        : loginUser;

    soundFX.playWin();
    try {
      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#007acc', '#002f5e', '#6fb9ec', '#ffffff'],
      });
    } catch {
      // safe fallback
    }

    onAuthSuccess(username);
    onClose();
  };

  const labelCls = 'text-[11px] font-medium text-ink-500';
  const fieldCls = 'field w-full px-3 py-2.5 text-[13px] font-medium';

  const modeToggle = (
    <div
      role="group"
      aria-label="Choose register or log in"
      className="flex items-center gap-1 rounded-[4px] border border-ink-200 bg-ink-50 p-1"
    >
      {(['register', 'login'] as const).map((mode) => (
        <button
          key={mode}
          type="button"
          aria-pressed={authMode === mode}
          onClick={() => { soundFX.playClick(); setAuthMode(mode); }}
          className={`min-h-[34px] cursor-pointer rounded-[3px] px-3.5 text-[13px] font-medium transition-colors duration-200
            focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-500 ${
            authMode === mode
              ? 'bg-white text-ink-900 shadow-xs'
              : 'text-ink-600 hover:text-ink-900'
          }`}
        >
          {mode === 'register' ? 'Register' : 'Log in'}
        </button>
      ))}
    </div>
  );

  return (
    <Modal
      open={isOpen}
      onOpenChange={(o) => { if (!o) onClose(); }}
      title={authMode === 'register' ? 'Create your 1xBet account' : 'Log in to 1xBet'}
      hideTitle
      description="Registration and login are presentation only in this build."
      size="md"
      headerSlot={modeToggle}
    >
      <div>
        <div>
          {authMode === 'register' ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12">

              {/* Left */}
              <div className="md:col-span-7">
                <div className="grid grid-cols-4 gap-1 rounded-xl border border-ink-200 bg-ink-50 p-1">
                  {METHODS.map((m) => {
                    const Icon = m.icon;
                    const isActive = regMethod === m.id;
                    return (
                      <button
                        key={m.id}
                        onClick={() => { soundFX.playClick(); setRegMethod(m.id); }}
                        className={`flex flex-col items-center gap-1.5 rounded-lg py-2.5 text-[11px] font-medium transition-all duration-200 cursor-pointer ${
                          isActive
                            ? 'bg-white text-brand-700 shadow-xs'
                            : 'text-ink-500 hover:text-ink-800'
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                        <span>{m.label}</span>
                      </button>
                    );
                  })}
                </div>

                <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
                  {regMethod === '1click' && (
                    <div className="animate-rise-in grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelCls}>Country</label>
                        <select
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          className={`${fieldCls} mt-1.5 cursor-pointer`}
                        >
                          <option>Germany</option>
                          <option>United Kingdom</option>
                          <option>Canada</option>
                          <option>Brazil</option>
                          <option>India</option>
                        </select>
                      </div>
                      <div>
                        <label className={labelCls}>Currency</label>
                        <select
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                          className={`${fieldCls} mt-1.5 cursor-pointer`}
                        >
                          <option>EUR (€)</option>
                          <option>USD ($)</option>
                          <option>USDT (₮)</option>
                          <option>BTC (₿)</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {regMethod === 'phone' && (
                    <div className="animate-rise-in">
                      <label className={labelCls}>Mobile number</label>
                      <div className="mt-1.5 flex gap-2">
                        <input
                          type="tel"
                          defaultValue="+49 152 9840192"
                          className={`${fieldCls} font-mono`}
                        />
                        <button
                          type="button"
                          className="btn-quiet shrink-0 px-3.5 text-[12px] cursor-pointer"
                        >
                          Send SMS
                        </button>
                      </div>
                    </div>
                  )}

                  {regMethod === 'email' && (
                    <div className="animate-rise-in space-y-3">
                      <div>
                        <label className={labelCls}>Email</label>
                        <input
                          type="email"
                          placeholder="player@example.com"
                          className={`${fieldCls} mt-1.5`}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Password</label>
                        <input
                          type="password"
                          placeholder="Create a secure password"
                          className={`${fieldCls} mt-1.5`}
                        />
                      </div>
                    </div>
                  )}

                  {regMethod === 'social' && (
                    <div className="animate-rise-in grid grid-cols-3 gap-2">
                      {['Google', 'Telegram', 'Metamask'].map((p) => (
                        <button
                          key={p}
                          type="button"
                          className="btn-quiet py-3 text-[12px] cursor-pointer"
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  )}

                  <div>
                    <label className={labelCls}>Promo code</label>
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className={`${fieldCls} mt-1.5 font-mono uppercase tracking-wide`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-1x-primary flex w-full items-center justify-center gap-2 py-3.5 text-sm cursor-pointer"
                  >
                    <Sparkles className="h-4 w-4" strokeWidth={2.2} />
                    <span>Register and unlock bonus</span>
                  </button>

                  <p className="text-center text-[11px] leading-relaxed text-ink-400">
                    By registering you confirm you are 18+ and accept the Terms &amp; Conditions.
                  </p>
                </form>
              </div>

              {/* Right */}
              <div className="md:col-span-5">
                <span className="eyebrow">Welcome bonus</span>

                <div className="mt-3 space-y-2.5">
                  {[
                    {
                      id: 'casino' as const,
                      icon: Gift,
                      tag: 'Casino + 1xGames',
                      title: '100% up to €1,500 + 150 FS',
                      body: 'Valid on Aviator, Gates of Olympus, and all 1xOriginals.',
                    },
                    {
                      id: 'sports' as const,
                      icon: ShieldCheck,
                      tag: 'Sports betting',
                      title: '100% up to €100',
                      body: 'On first deposit with minimum 3 accumulator legs.',
                    },
                  ].map((b) => {
                    const Icon = b.icon;
                    const isSelected = selectedBonus === b.id;
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => { soundFX.playClick(); setSelectedBonus(b.id); }}
                        className={`relative w-full rounded-xl border p-3.5 text-left transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'border-brand-500 bg-brand-50/60 ring-2 ring-brand-500/15'
                            : 'border-ink-200 bg-white hover:border-ink-300'
                        }`}
                      >
                        <span
                          className={`flex items-center gap-2 text-[11px] font-medium ${
                            isSelected ? 'text-brand-700' : 'text-ink-500'
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                          {b.tag}
                        </span>

                        <span className="mt-1.5 block text-[14px] font-semibold tracking-tight text-ink-900">
                          {b.title}
                        </span>
                        <span className="mt-1 block text-[12px] leading-snug text-ink-500">
                          {b.body}
                        </span>

                        {isSelected && (
                          <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-brand-500" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mx-auto max-w-sm space-y-4 py-2">
              <div>
                <label className={labelCls}>Account ID, email, or phone</label>
                <input
                  type="text"
                  value={loginUser}
                  onChange={(e) => setLoginUser(e.target.value)}
                  className={`${fieldCls} mt-1.5`}
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className={labelCls}>Password</label>
                  <button
                    type="button"
                    className="text-[11px] font-medium text-brand-600 hover:text-brand-700 cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  type="password"
                  value={loginPass}
                  onChange={(e) => setLoginPass(e.target.value)}
                  placeholder="Enter your password"
                  className={`${fieldCls} mt-1.5`}
                />
              </div>

              <button
                type="submit"
                className="btn-1x-primary flex w-full items-center justify-center gap-2 py-3.5 text-sm cursor-pointer"
              >
                <KeyRound className="h-4 w-4" strokeWidth={2.2} />
                <span>Log in</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </Modal>
  );
};
