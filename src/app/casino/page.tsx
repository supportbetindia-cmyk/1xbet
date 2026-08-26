'use client';

import React, { useState } from 'react';
import { useSite } from '@/components/SiteChrome';
import { ProvidersBar } from '@/components/ProvidersBar';
import { GameTheaterModal } from '@/components/GameTheaterModal';
import { GameCard } from '@/components/GameCard';
import { PageHero } from '@/components/PageHero';
import { AUTHENTIC_GAMES, AuthenticGame } from '@/lib/authenticGames';
import { soundFX } from '@/lib/audio';
import {
  Gamepad2,
  Sparkles,
  Search,
  Flame,
  Percent,
  Layers,
} from 'lucide-react';

export default function CasinoPage() {
  const { openAuth } = useSite();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'rtp' | 'maxwin'>('popular');
  const [activeTheaterGame, setActiveTheaterGame] = useState<AuthenticGame | null>(null);

  const categories = [
    { id: 'all', label: 'All Slots', icon: Gamepad2 },
    { id: 'slots', label: 'Top Megaways & Slots', icon: Sparkles },
    { id: 'bonus-buy', label: 'Bonus Buy', icon: Percent },
    { id: 'originals', label: '1xOriginals', icon: Flame },
    { id: 'table', label: 'Table Games', icon: Layers },
  ];

  const filtered = AUTHENTIC_GAMES.filter((game) => {
    const matchesCat = activeCategory === 'all' || game.category === activeCategory;
    const matchesProv = !selectedProvider || game.provider.toLowerCase().includes(selectedProvider.toLowerCase());
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || game.provider.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesProv && matchesSearch;
  });

  if (sortBy === 'rtp') {
    filtered.sort((a, b) => parseFloat(b.rtp) - parseFloat(a.rtp));
  } else if (sortBy === 'maxwin') {
    filtered.sort((a, b) => parseInt(b.maxWin) - parseInt(a.maxWin));
  }

  return (
    <>
      <main className="mx-auto w-full max-w-[1440px] flex-1 space-y-8 overflow-x-hidden p-4 sm:p-8">

        <PageHero
          eyebrow="Official 1xBet casino lobby"
          title="Premium slots & Megaways"
          description="Over 5,000 certified slots, instant bonus buys, high-volatility jackpot drops, and exclusive 1xBet titles."
          icon={Sparkles}
          stats={[
            { label: 'Certified titles', value: '5,840+' },
            { label: 'Average RTP', value: '97.8%' },
          ]}
        />

        <ProvidersBar
          selectedProvider={selectedProvider}
          onSelectProvider={setSelectedProvider}
        />

        {/* Filters & sorting */}
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => { soundFX.playClick(); setActiveCategory(cat.id); }}
                  className={`flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-navy-700 text-white shadow-sm'
                      : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900'
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-brand-300' : 'text-ink-400'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2.5">
            <div className="relative flex-1 sm:w-64">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                type="text"
                placeholder="Search titles or studios…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="field w-full py-2.5 pl-10 pr-4 text-[13px] font-medium"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'popular' | 'rtp' | 'maxwin')}
              className="field cursor-pointer px-3 py-2.5 text-[13px] font-medium"
            >
              <option value="popular">Popularity</option>
              <option value="rtp">Highest RTP</option>
              <option value="maxwin">Max win</option>
            </select>
          </div>

        </div>

        {/* Game Posters Grid */}
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {filtered.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onSelect={(g) => {
                soundFX.playClick();
                setActiveTheaterGame(g);
              }}
            />
          ))}
        </div>

      </main>

      <GameTheaterModal
        game={activeTheaterGame}
        isOpen={!!activeTheaterGame}
        onClose={() => setActiveTheaterGame(null)}
        balance={1250}
        currency="USD"
        onUpdateBalance={() => {}}
        onOpenDeposit={() => openAuth()}
      />
    </>
  );
}
