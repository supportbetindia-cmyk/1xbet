'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Sparkles, 
  RotateCw, 
  Trophy 
} from 'lucide-react';
import { GameItem, Currency } from '@/lib/types';
import { soundFX } from '@/lib/audio';

interface PlayableSlotModalProps {
  game: GameItem | null;
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  currency: Currency;
  onUpdateBalance: (newBalance: number) => void;
}

const SYMBOLS = ['7️⃣', '💎', '👑', '⭐', '🍒', '🚀', '🔔'];

export const PlayableSlotModal: React.FC<PlayableSlotModalProps> = ({
  game,
  isOpen,
  onClose,
  balance,
  onUpdateBalance
}) => {
  const [reels, setReels] = useState<string[]>(['7️⃣', '💎', '👑']);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinBet, setSpinBet] = useState(5);
  const [lastWin, setLastWin] = useState<number | null>(null);
  const [winMessage, setWinMessage] = useState<string>('');

  if (!isOpen || !game) return null;

  const handleSpin = () => {
    if (isSpinning) return;
    if (spinBet > balance) {
      soundFX.playClick();
      alert('Insufficient balance. Please deposit or lower bet.');
      return;
    }

    soundFX.playClick();
    setIsSpinning(true);
    setLastWin(null);
    setWinMessage('');
    onUpdateBalance(balance - spinBet);

    // Animate reels shuffling
    let step = 0;
    const interval = setInterval(() => {
      setReels([
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
      ]);
      soundFX.playSlotStop();
      step++;
      if (step > 15) {
        clearInterval(interval);

        // Final result calculation
        const finalReels = [
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
          SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
        ];

        // 30% chance to force a matching combination for demo fun
        if (Math.random() < 0.35) {
          const lucky = ['7️⃣', '💎', '👑', '⭐'][Math.floor(Math.random() * 4)];
          finalReels[0] = lucky;
          finalReels[1] = lucky;
          finalReels[2] = lucky;
        }

        setReels(finalReels);
        setIsSpinning(false);

        // Check payouts
        if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
          const match = finalReels[0];
          let mult = 10;
          if (match === '7️⃣') mult = 100;
          else if (match === '💎') mult = 50;
          else if (match === '👑') mult = 25;
          else if (match === '⭐') mult = 15;

          const won = spinBet * mult;
          setLastWin(won);
          setWinMessage(`MEGA 3x MATCH! ${mult}x PAYOUT!`);
          onUpdateBalance(balance - spinBet + won);
          soundFX.playWin();

          try {
            confetti({
              particleCount: 90,
              spread: 75,
              origin: { y: 0.5 }
            });
          } catch {
            // safe fallback
          }
        } else if (finalReels[0] === finalReels[1] || finalReels[1] === finalReels[2] || finalReels[0] === finalReels[2]) {
          const won = spinBet * 2;
          setLastWin(won);
          setWinMessage(`PAIR MATCH! 2x RETURN`);
          onUpdateBalance(balance - spinBet + won);
          soundFX.playCashout();
        } else {
          setLastWin(0);
          setWinMessage('No match. Try again!');
        }
      }
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/75 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-ink-200 overflow-hidden text-center">
        
        {/* Close Button */}
        <button
          onClick={() => {
            soundFX.playClick();
            onClose();
          }}
          disabled={isSpinning}
          className="absolute top-4 right-4 p-2 rounded-full text-ink-400 hover:text-ink-700 hover:bg-ink-100 transition cursor-pointer disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 text-brand-600 border border-brand-200 text-xs font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>INTERACTIVE DEMO REELS</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-semibold text-navy-900">
            {game.title}
          </h3>
          <p className="text-xs text-ink-500">
            {game.description} • <strong>{game.rtp} RTP</strong>
          </p>
        </div>

        {/* 3-Reel Visual Slot Machine */}
        <div className="bg-gradient-to-br from-navy-900 to-navy-700 p-6 rounded-3xl shadow-xl border-4 border-brass-400/40 my-6 relative">
          
          {/* Top Jackpot Header */}
          <div className="text-[10px] font-medium uppercase tracking-[0.1em] text-brass-300 tracking-wider mb-4 flex items-center justify-center gap-2">
            <Trophy className="w-4 h-4 text-brass-400" />
            <span>TRIPLE 7️⃣ JACKPOT = 100X STAKE</span>
          </div>

          {/* Slot Reels Container */}
          <div className="grid grid-cols-3 gap-3 bg-navy-950 p-4 rounded-2xl border border-navy-800 shadow-inner">
            {reels.map((symbol, idx) => (
              <div
                key={idx}
                className="h-28 bg-white rounded-xl flex items-center justify-center text-4xl sm:text-5xl shadow-md border border-ink-200 font-bold select-none transition-transform"
              >
                <span className={isSpinning ? 'animate-bounce' : ''}>{symbol}</span>
              </div>
            ))}
          </div>

          {/* Result Alert inside machine */}
          {winMessage && (
            <div className={`mt-4 py-2 px-3 rounded-xl text-xs font-bold ${
              lastWin && lastWin > 0 
                ? 'bg-win-500 text-white' 
                : 'bg-navy-800 text-ink-400'
            }`}>
              {winMessage} {lastWin && lastWin > 0 ? `(+$${lastWin})` : ''}
            </div>
          )}
        </div>

        {/* Stake Controls */}
        <div className="flex items-center justify-between bg-ink-50 p-3 rounded-2xl border border-ink-200 mb-4">
          <span className="text-xs font-bold text-ink-600">Stake per Spin:</span>
          <div className="flex items-center gap-1.5">
            {[1, 5, 10, 25].map((val) => (
              <button
                key={val}
                onClick={() => { soundFX.playClick(); setSpinBet(val); }}
                disabled={isSpinning}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                  spinBet === val 
                    ? 'bg-brand-500 text-white' 
                    : 'bg-white text-ink-700 border border-ink-200 hover:bg-ink-100'
                }`}
              >
                ${val}
              </button>
            ))}
          </div>
        </div>

        {/* Spin CTA Button */}
        <button
          onClick={handleSpin}
          disabled={isSpinning}
          className="w-full py-4 rounded-2xl font-semibold text-lg btn-1x-primary flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-xl"
        >
          <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
          <span>{isSpinning ? 'SPINNING REELS...' : `SPIN SLOTS ($${spinBet})`}</span>
        </button>

      </div>
    </div>
  );
};
