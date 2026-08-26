'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  Volume2,
  VolumeX,
  Crown,
  Menu,
  X,
  ChevronDown,
  Trophy,
  Globe,
  Smartphone,
  Radio,
  Gamepad2,
  Percent,
  ShieldCheck,
  LifeBuoy,
  Zap,
} from 'lucide-react';
import { soundFX } from '@/lib/audio';

interface HeaderProps {
  onOpenAuth?: () => void;
  currentUser?: string | null;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAuth,
  currentUser,
}) => {
  const pathname = usePathname();
  const [isMuted, setIsMuted] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('English');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // The header sits flat against the hero at rest and lifts onto a shadow once
  // content passes beneath it — a quieter cue than a permanent border.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  const handleSoundToggle = () => {
    const muted = soundFX.toggleMute();
    setIsMuted(muted);
    if (!muted) soundFX.playClick();
  };

  const primaryNavLinks = [
    { href: '/casino', label: 'Casino', icon: Gamepad2 },
    { href: '/live-casino', label: 'Live Casino', icon: Radio, isLive: true },
    { href: '/1xgames', label: '1xGames', icon: Zap, isHot: true },
    { href: '/promotions', label: 'Promotions', icon: Percent },
    { href: '/tournaments', label: 'Tournaments', icon: Trophy },
    { href: '/vip', label: 'VIP Club', icon: Crown },
  ];

  const allNavLinks = [
    ...primaryNavLinks,
    { href: '/app', label: 'Mobile App', icon: Smartphone },
    { href: '/provably-fair', label: 'Provably Fair', icon: ShieldCheck },
    { href: '/responsible-gaming', label: 'Player Safety', icon: LifeBuoy },
  ];

  const languages = [
    { name: 'English', flag: '🇬🇧' },
    { name: 'Español', flag: '🇪🇸' },
    { name: 'Deutsch', flag: '🇩🇪' },
    { name: 'Français', flag: '🇫🇷' },
    { name: 'Português', flag: '🇧🇷' },
    { name: 'Русский', flag: '🇷🇺' },
    { name: 'Türkçe', flag: '🇹🇷' },
    { name: 'हिन्दी', flag: '🇮🇳' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 select-none w-full bg-white/88 backdrop-blur-xl transition-all duration-300 ${
        scrolled ? 'border-b border-line-strong shadow-[0_8px_28px_rgba(0,0,0,0.5)]' : 'border-b border-line'
      }`}
    >
      {/* 1. Utility bar */}
      <div className="bg-surface-1 text-fg text-[11px] border-b border-line">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between">
          <div className="flex items-center gap-5 min-w-0">
            <div className="flex items-center gap-2 whitespace-nowrap">
              <span className="live-dot" />
              <span className="font-medium tracking-[0.08em] uppercase text-[10px] text-fg">
                Official 1xBet Casino
              </span>
            </div>

            <span className="hidden md:block h-3 w-px bg-line" />

            <div className="hidden md:flex items-center gap-5 text-fg-muted">
              <Link
                href="/app"
                className="flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap"
              >
                <Smartphone className="w-3.5 h-3.5 text-brand-600" />
                <span>iOS &amp; Android App</span>
              </Link>
              <Link
                href="/provably-fair"
                className="flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
                <span>Provably Fair RNG</span>
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {/* Language */}
            <div className="relative">
              <button
                onClick={() => { soundFX.playClick(); setLangDropdownOpen(!langDropdownOpen); }}
                className="flex items-center gap-1.5 text-fg-muted hover:text-white cursor-pointer h-8 px-2 rounded-md hover:bg-surface-3 transition-colors whitespace-nowrap"
                aria-expanded={langDropdownOpen}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{currentLang}</span>
                <ChevronDown
                  className={`w-3 h-3 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {langDropdownOpen && (
                <>
                  {/* Click-away layer */}
                  <div
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setLangDropdownOpen(false)}
                    aria-hidden
                  />
                  <div className="absolute right-0 top-full mt-1.5 w-44 panel panel-2 rounded-[8px] p-1.5 z-50 animate-rise-in shadow-[0_16px_40px_rgba(0,0,0,0.6)]">
                    {languages.map((l) => (
                      <button
                        key={l.name}
                        onClick={() => {
                          soundFX.playClick();
                          setCurrentLang(l.name);
                          setLangDropdownOpen(false);
                        }}
                        className={`w-full flex items-center gap-2.5 px-2.5 py-2 text-xs rounded-lg transition-colors cursor-pointer ${
                          currentLang === l.name
                            ? 'bg-brand-500/10 text-brand-600 font-semibold'
                            : 'font-medium text-fg-muted hover:bg-surface-3 hover:text-fg'
                        }`}
                      >
                        <span className="text-sm leading-none">{l.flag}</span>
                        <span>{l.name}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button
              onClick={handleSoundToggle}
              className="flex items-center gap-1.5 text-fg-muted hover:text-white cursor-pointer h-8 px-2 rounded-md hover:bg-surface-3 transition-colors whitespace-nowrap"
              title={isMuted ? 'Unmute sound' : 'Mute sound'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isMuted ? 'Muted' : 'Sound'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main navigation */}
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] gap-6">

          <div className="flex items-center gap-8 xl:gap-10 min-w-0">
            <Link
              href="/"
              onClick={() => soundFX.playClick()}
              className="flex items-center shrink-0 rounded-md"
              aria-label="1xBet home"
            >
              <div className="relative h-8 w-[116px] transition-opacity hover:opacity-80">
                {/* `priority` is deprecated as of Next 16 in favour of `preload`,
                    which states the intent plainly. */}
                <Image
                  src="/1xbet.svg"
                  alt="1xBet"
                  fill
                  sizes="116px"
                  className="object-contain object-left"
                  preload
                />
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5">
              {primaryNavLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => soundFX.playClick()}
                    className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap transition-colors ${
                      isActive
                        ? 'text-fg'
                        : 'text-fg-muted hover:text-fg hover:bg-surface-3'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        isActive ? 'text-brand-600' : 'text-fg-dim'
                      }`}
                      strokeWidth={2}
                    />
                    <span>{link.label}</span>

                    {link.isHot && (
                      <span className="px-1.5 py-px text-[9px] font-semibold tracking-wide uppercase bg-brand-500/10 text-brand-600 border border-brand-500/30 rounded">
                        Hot
                      </span>
                    )}
                    {link.isLive && <span className="live-dot" />}

                    {/* Active marker: a hairline rule rather than a filled blob */}
                    {isActive && (
                      <span className="absolute left-3 right-3 -bottom-[7px] h-0.5 rounded-full bg-brand-500" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: actions */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/app"
              onClick={() => soundFX.playClick()}
              className="hidden 2xl:flex items-center gap-2 px-3 py-2 rounded-lg text-[13px] font-medium text-fg-muted hover:text-fg hover:bg-surface-3 transition-colors whitespace-nowrap"
            >
              <Smartphone className="w-4 h-4 text-fg-dim" />
              <span>Get App</span>
            </Link>

            {currentUser ? (
              <div className="flex items-center gap-2.5 pl-3 ml-1 border-l border-line">
                <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center text-[11px] font-semibold tracking-wide">
                  {currentUser.slice(0, 2).toUpperCase()}
                </div>
                <span className="text-[13px] font-medium text-fg hidden sm:inline">
                  {currentUser}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { soundFX.playClick(); onOpenAuth?.(); }}
                  className="min-h-[40px] px-4 rounded-[5px] text-[13px] font-semibold text-fg-muted hover:text-fg hover:bg-white/[0.07] transition-colors cursor-pointer whitespace-nowrap"
                >
                  Log in
                </button>
                <button
                  onClick={() => { soundFX.playClick(); onOpenAuth?.(); }}
                  className="inline-flex items-center min-h-[40px] px-5 rounded-[5px] bg-brand-500 text-white text-[13px] font-semibold shadow-[0_6px_18px_rgba(0,122,204,0.26)] hover:bg-brand-600 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Register
                </button>
              </div>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 -mr-1 rounded-[5px] text-fg hover:bg-surface-3 cursor-pointer transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* 3. Mobile drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 pt-2 border-t border-line animate-rise-in">
            <nav className="space-y-0.5">
              {allNavLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      soundFX.playClick();
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'bg-brand-500/10 text-brand-600 font-semibold'
                        : 'text-fg-muted font-medium hover:bg-surface-3 hover:text-fg'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <Icon
                        className={`w-[18px] h-[18px] ${isActive ? 'text-brand-600' : 'text-fg-dim'}`}
                      />
                      <span>{link.label}</span>
                    </span>

                    {link.isHot && (
                      <span className="px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide bg-brand-500/10 text-brand-600 border border-brand-500/30 rounded">
                        Hot
                      </span>
                    )}
                    {link.isLive && <span className="live-dot" />}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
