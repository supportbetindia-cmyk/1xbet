'use client';

import React, { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { AuthenticGame, AUTHENTIC_GAMES } from '@/lib/authenticGames';
import { GameCard } from '@/components/GameCard';
import { soundFX } from '@/lib/audio';

interface GameGridProps {
  selectedCategory: string;
  selectedProvider: string | null;
  onSelectCategory: (category: string) => void;
  onSelectGame: (game: AuthenticGame) => void;
  onPlayCrash: () => void;
}

const CATEGORIES: { id: string; label: string }[] = [
  { id: 'all', label: 'All games' },
  { id: 'originals', label: '1xOriginals' },
  { id: 'slots', label: 'Slots' },
  { id: 'live', label: 'Live' },
  { id: 'game-shows', label: 'Game shows' },
  { id: 'megaways', label: 'Megaways' },
  { id: 'bonus-buy', label: 'Bonus buy' },
  { id: 'table', label: 'Table' },
];

export const GameGrid: React.FC<GameGridProps> = ({
  selectedCategory,
  selectedProvider,
  onSelectCategory,
  onSelectGame,
  onPlayCrash,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredGames = AUTHENTIC_GAMES.filter((game) => {
    const matchesCat = selectedCategory === 'all' || game.category === selectedCategory;
    const matchesProvider =
      !selectedProvider || game.provider.toLowerCase().includes(selectedProvider.toLowerCase());
    const matchesSearch =
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.provider.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesProvider && matchesSearch;
  });

  return (
    <section id="slots" className="bg-white py-14">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">

        {/* ---------- Section header ---------- */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow eyebrow-brand">Provably fair casino lobby</span>
            <h2 className="mt-2.5 text-[26px] sm:text-[32px] font-semibold tracking-[-0.03em] text-ink-900">
              {selectedProvider ? `${selectedProvider} games` : 'Top featured titles'}
            </h2>
            <p className="mt-1.5 text-sm text-ink-500">
              <span className="font-mono font-medium text-ink-700">{filteredGames.length}</span>{' '}
              licensed titles with certified RNG and multipliers up to 300,000&times;.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              type="text"
              placeholder="Search games or studios…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="field w-full py-2.5 pl-10 pr-4 text-[13px] font-medium"
            />
          </div>
        </div>

        {/* ---------- Category filter ---------- */}
        <div className="mt-7 flex items-center gap-2.5 overflow-x-auto border-b border-ink-200 pb-3 scrollbar-none">
          <SlidersHorizontal className="hidden h-4 w-4 shrink-0 text-ink-400 sm:block" />
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => { soundFX.playClick(); onSelectCategory(cat.id); }}
                className={`shrink-0 whitespace-nowrap rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-navy-700 text-white shadow-sm'
                    : 'text-ink-600 hover:bg-ink-50 hover:text-ink-900'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ---------- Grid ---------- */}
        {filteredGames.length === 0 ? (
          <div className="mt-14 flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink-300 bg-ink-25 py-20 text-center">
            <Search className="h-6 w-6 text-ink-300" />
            <p className="mt-3 text-sm font-medium text-ink-700">No games match that search</p>
            <p className="mt-1 text-[13px] text-ink-500">
              Try a different title, studio, or category.
            </p>
          </div>
        ) : (
          <div className="mt-7 grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onSelect={(g) => {
                  soundFX.playClick();
                  if (g.id === 'aviator-1x') onPlayCrash();
                  else onSelectGame(g);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
