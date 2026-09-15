'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Trophy, Dice5, Zap, UserRound } from 'lucide-react';
import { useSite } from '@/components/SiteChrome';
import { soundFX } from '@/lib/audio';

const TABS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/sports', label: 'Sports', icon: Trophy },
  { href: '/casino', label: 'Casino', icon: Dice5 },
  { href: '/1xgames', label: '1xGames', icon: Zap },
] as const;

/**
 * Phone-only bottom navigation.
 *
 * The header nav collapses to a hamburger under `xl`, which buries every route
 * behind a tap. A persistent bar puts the four main destinations one tap away,
 * which is how every betting app on a phone actually works.
 *
 * Hidden from `md` up, where the header has room to show the nav itself.
 */
export const MobileTabBar: React.FC = () => {
  const pathname = usePathname();
  const { openAuth, currentUser } = useSite();

  const cell =
    'flex flex-1 flex-col items-center justify-center gap-1 pt-2 pb-1 text-[10px] font-semibold tracking-[0.01em] transition-colors';

  return (
    <nav
      aria-label="Primary"
      /* pb via safe-area so the bar clears the iPhone home indicator instead of
         sitting under it. */
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur-xl
                 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_20px_rgba(0,47,94,0.08)] md:hidden"
    >
      <div className="mx-auto flex max-w-lg items-stretch px-1">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={() => soundFX.playClick()}
              aria-current={active ? 'page' : undefined}
              className={`${cell} ${active ? 'text-brand-600' : 'text-fg-dim hover:text-fg'}`}
            >
              <span className="relative flex h-6 items-center justify-center">
                <Icon className="h-[21px] w-[21px]" strokeWidth={active ? 2.4 : 1.9} />
                {active && (
                  <span className="absolute -top-2 h-[3px] w-6 rounded-full bg-brand-500" aria-hidden />
                )}
              </span>
              <span>{label}</span>
            </Link>
          );
        })}

        <button
          onClick={() => {
            soundFX.playClick();
            if (!currentUser) openAuth();
          }}
          className={`${cell} cursor-pointer ${currentUser ? 'text-brand-600' : 'text-fg-dim hover:text-fg'}`}
        >
          <span className="flex h-6 items-center justify-center">
            {currentUser ? (
              <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-brand-500 text-[9px] font-bold text-white">
                {currentUser.slice(0, 2).toUpperCase()}
              </span>
            ) : (
              <UserRound className="h-[21px] w-[21px]" strokeWidth={1.9} />
            )}
          </span>
          <span>{currentUser ? 'Account' : 'Log in'}</span>
        </button>
      </div>
    </nav>
  );
};
