'use client';

import React, { useState } from 'react';
import { useSite } from '@/components/SiteChrome';
import { HeroBanner } from '@/components/HeroBanner';
import { ProvidersBar } from '@/components/ProvidersBar';
import { LiveWinsFeed } from '@/components/LiveWinsFeed';
import { CrashGame } from '@/components/CrashGame';
import { MegaJackpotsSection } from '@/components/MegaJackpotsSection';
import { LiveSportsWidget } from '@/components/LiveSportsWidget';
import { GameGrid } from '@/components/GameGrid';
import { PromotionsSection } from '@/components/PromotionsSection';
import { LiveBetsTable } from '@/components/LiveBetsTable';
import { VIPClubSection } from '@/components/VIPClubSection';
import { TrustPillarsSection } from '@/components/TrustPillarsSection';
import { HowCrashWorks } from '@/components/sections/HowCrashWorks';
import { PaymentsAndLimits } from '@/components/sections/PaymentsAndLimits';
import { MobileAppSection } from '@/components/MobileAppSection';
import { FAQSection } from '@/components/FAQSection';
import { GameTheaterModal } from '@/components/GameTheaterModal';
import { SpinWheelModal } from '@/components/SpinWheelModal';
import { AuthenticGame } from '@/lib/authenticGames';

export default function LobbyPage() {
  const { openAuth, showToast } = useSite();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  // Modals state
  const [isSpinWheelOpen, setIsSpinWheelOpen] = useState<boolean>(false);
  const [activeTheaterGame, setActiveTheaterGame] = useState<AuthenticGame | null>(null);

  const handleRewardClaimed = (amount: number, message: string) => {
    showToast(`${message} — claimed.`);
  };

  return (
    <>
      {/* Main Full-Width Content Stream */}
      <main className="flex-1 overflow-x-hidden">
        
        {/* 1. Hero Banner with Jackpots & Tournaments */}
        <HeroBanner
          onPlayCrash={() => {
            const crashEl = document.getElementById('crash');
            if (crashEl) crashEl.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenSpinWheel={() => setIsSpinWheelOpen(true)}
          onClaimBonus={() => openAuth()}
        />

        {/* 2. Real-Time Live Wins Marquee Feed */}
        <LiveWinsFeed />

        {/* 3. Certified Game Providers Filter Bar */}
        <ProvidersBar
          selectedProvider={selectedProvider}
          onSelectProvider={(prov) => {
            setSelectedProvider(prov);
            const gridEl = document.getElementById('slots');
            if (gridEl) gridEl.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 4. Interactive 1xCrash & Aviator Rocket Multiplier Arena */}
        <CrashGame
          balance={1250}
          currency="USD"
          onUpdateBalance={() => {}}
          onOpenDeposit={() => openAuth()}
        />

        {/* 5. Live Progressive Multi-Tier Mega Jackpots Ticker */}
        <MegaJackpotsSection />

        {/* 6. Live Sports & In-Play Match Odds Center */}
        <LiveSportsWidget />

        {/* 7. Authentic Games Catalog with 3D Card Artwork */}
        <GameGrid
          selectedCategory={activeCategory}
          selectedProvider={selectedProvider}
          onSelectCategory={setActiveCategory}
          onSelectGame={(game) => setActiveTheaterGame(game)}
          onPlayCrash={() => {
            const crashEl = document.getElementById('crash');
            if (crashEl) crashEl.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 8. Exclusive High-Roller Promotions & Bonuses */}
        <PromotionsSection />

        {/* 9. Multi-Tab Live Community Bets Feed */}
        <LiveBetsTable />

        {/* 10. VIP Club & Daily Quests */}
        <VIPClubSection
          onRewardClaimed={handleRewardClaimed}
        />

        {/* 11. Trust, Instant Payouts & 50+ Payment Gateways */}
        <TrustPillarsSection />

        {/* 12. Long-form explainer: how the crash format and its edge work */}
        <HowCrashWorks />

        {/* 13. Cashier reference — methods, caps, timings, fees */}
        <PaymentsAndLimits />

        {/* 14. 1xBet Mobile App Download & QR Scanner */}
        <MobileAppSection />

        {/* 15. Player Knowledge Base & SEO FAQ Accordion */}
        <FAQSection />

      </main>

      {/* --- MODALS --- */}
      
      {/* Game Theater Interactive Player (Mines, Plinko, Slots) */}
      <GameTheaterModal
        game={activeTheaterGame}
        isOpen={!!activeTheaterGame}
        onClose={() => setActiveTheaterGame(null)}
        balance={1250}
        currency="USD"
        onUpdateBalance={() => {}}
        onOpenDeposit={() => openAuth()}
      />

      {/* Daily VIP Lucky Spin Wheel Modal */}
      <SpinWheelModal
        isOpen={isSpinWheelOpen}
        onClose={() => setIsSpinWheelOpen(false)}
        onRewardClaimed={handleRewardClaimed}
      />
    </>
  );
}
