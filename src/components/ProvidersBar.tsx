'use client';

import React from 'react';
import { GAME_PROVIDERS } from '@/lib/authenticGames';
import { soundFX } from '@/lib/audio';

interface ProvidersBarProps {
  selectedProvider: string | null;
  onSelectProvider: (providerName: string | null) => void;
}

export const ProvidersBar: React.FC<ProvidersBarProps> = ({
  selectedProvider,
  onSelectProvider,
}) => {
  return (
    <div className="border-b border-ink-200 bg-ink-50 py-7">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">

        <div className="mb-4 flex items-center justify-between">
          <span className="eyebrow">Certified game studios</span>
          <button
            onClick={() => { soundFX.playClick(); onSelectProvider(null); }}
            className="text-xs font-medium text-brand-600 transition-colors hover:text-brand-700 cursor-pointer"
          >
            {selectedProvider ? 'Clear filter' : 'View all'}
          </button>
        </div>

        <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {GAME_PROVIDERS.map((prov) => {
            const isSelected = selectedProvider === prov.name;
            return (
              <button
                key={prov.id}
                onClick={() => {
                  soundFX.playClick();
                  onSelectProvider(isSelected ? null : prov.name);
                }}
                className={`flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-xl border px-3.5 py-2.5 text-[13px] font-medium transition-all duration-250 cursor-pointer ${
                  isSelected
                    ? 'border-navy-700 bg-navy-700 text-white shadow-md'
                    : 'border-ink-200 bg-white text-ink-700 shadow-xs hover:border-ink-300 hover:text-ink-900'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${
                    isSelected ? 'bg-brand-300' : 'bg-brand-500'
                  }`}
                />
                <span>{prov.name}</span>
                <span
                  className={`font-mono text-[11px] ${
                    isSelected ? 'text-navy-200' : 'text-ink-400'
                  }`}
                >
                  {prov.gamesCount}
                </span>
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
};
