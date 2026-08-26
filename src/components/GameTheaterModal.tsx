'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  RotateCw, 
  Play, 
  Coins
} from 'lucide-react';
import { AuthenticGame } from '@/lib/authenticGames';
import { Currency } from '@/lib/types';
import { soundFX } from '@/lib/audio';

interface GameTheaterModalProps {
  game: AuthenticGame | null;
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  currency: Currency;
  onUpdateBalance: (newBalance: number) => void;
  onOpenDeposit: () => void;
}

export const GameTheaterModal: React.FC<GameTheaterModalProps> = ({
  game,
  isOpen,
  onClose,
  balance,
  currency,
  onUpdateBalance,
  onOpenDeposit
}) => {
  const [mode, setMode] = useState<'real' | 'demo'>('real');
  const [bet, setBet] = useState<number>(5.00);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);

  // --- MINES ENGINE STATE ---
  const [minesGrid, setMinesGrid] = useState<Array<{ id: number; isMine: boolean; isRevealed: boolean }>>([]);
  const [minesActive, setMinesActive] = useState<boolean>(false);
  const [minesMultiplier, setMinesMultiplier] = useState<number>(1.00);
  const [minesCount, setMinesCount] = useState<number>(3);
  const [minesGameOver, setMinesGameOver] = useState<boolean>(false);
  const [minesWon, setMinesWon] = useState<boolean>(false);

  // --- PLINKO ENGINE STATE ---
  const [plinkoHistory, setPlinkoHistory] = useState<number[]>([]);
  const [isDropping, setIsDropping] = useState<boolean>(false);

  // --- SLOTS 5-REEL ENGINE STATE ---
  const [slotSymbols, setSlotSymbols] = useState<string[][]>([
    ['⚡', '👑', '💎', '🍭', '7️⃣'],
    ['🍭', '7️⃣', '⚡', '👑', '💎'],
    ['💎', '🍭', '👑', '7️⃣', '⚡'],
  ]);
  const [isSlotSpinning, setIsSlotSpinning] = useState<boolean>(false);
  const [slotWinResult, setSlotWinResult] = useState<{ amount: number; message: string } | null>(null);

  if (!isOpen || !game) return null;

  // Initialize Mines game
  const startMinesGame = () => {
    if (bet > balance && mode === 'real') {
      soundFX.playClick();
      onOpenDeposit();
      return;
    }

    if (mode === 'real') onUpdateBalance(balance - bet);
    soundFX.playClick();

    // Create 25 tiles with random mines
    const tiles = Array.from({ length: 25 }, (_, i) => ({ id: i, isMine: false, isRevealed: false }));
    const mineIndices = new Set<number>();
    while (mineIndices.size < minesCount) {
      mineIndices.add(Math.floor(Math.random() * 25));
    }
    mineIndices.forEach((idx) => {
      tiles[idx].isMine = true;
    });

    setMinesGrid(tiles);
    setMinesActive(true);
    setMinesMultiplier(1.00);
    setMinesGameOver(false);
    setMinesWon(false);
  };

  const handleTileClick = (index: number) => {
    if (!minesActive || minesGrid[index].isRevealed) return;

    soundFX.playClick();
    const updated = [...minesGrid];
    updated[index].isRevealed = true;

    if (updated[index].isMine) {
      // Hit a mine!
      soundFX.playCrash();
      // Reveal all mines
      updated.forEach((t) => { if (t.isMine) t.isRevealed = true; });
      setMinesGrid(updated);
      setMinesActive(false);
      setMinesGameOver(true);
    } else {
      // Found a diamond!
      soundFX.playCashout();
      const currentGems = updated.filter((t) => t.isRevealed && !t.isMine).length;
      const newMult = +(1.00 + currentGems * 0.45 * (minesCount / 2)).toFixed(2);
      setMinesMultiplier(newMult);
      setMinesGrid(updated);
    }
  };

  const handleMinesCashout = () => {
    if (!minesActive) return;
    const winAmt = +(bet * minesMultiplier).toFixed(2);
    setMinesActive(false);
    setMinesWon(true);
    if (mode === 'real') onUpdateBalance(balance + winAmt);

    soundFX.playWin();
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch {}
  };

  // Plinko drop simulation
  const handlePlinkoDrop = () => {
    if (isDropping) return;
    if (bet > balance && mode === 'real') {
      soundFX.playClick();
      onOpenDeposit();
      return;
    }

    if (mode === 'real') onUpdateBalance(balance - bet);
    soundFX.playClick();
    setIsDropping(true);

    const multipliers = [29, 4, 1.5, 0.2, 0.2, 1.5, 4, 29];
    const landedIndex = Math.floor(Math.random() * multipliers.length);
    const resultMult = multipliers[landedIndex];

    setTimeout(() => {
      setIsDropping(false);
      const won = +(bet * resultMult).toFixed(2);
      setPlinkoHistory((prev) => [resultMult, ...prev.slice(0, 5)]);

      if (resultMult >= 1.5) {
        soundFX.playWin();
        if (mode === 'real') onUpdateBalance(balance + won);
        if (resultMult >= 4) {
          try { confetti({ particleCount: 60, spread: 50, origin: { y: 0.6 } }); } catch {}
        }
      } else {
        soundFX.playCashout();
      }
    }, 1200);
  };

  // 5-Reel Slot Spin simulation
  const handleSlotSpin = () => {
    if (isSlotSpinning) return;
    if (bet > balance && mode === 'real') {
      soundFX.playClick();
      onOpenDeposit();
      return;
    }

    if (mode === 'real') onUpdateBalance(balance - bet);
    soundFX.playClick();
    setIsSlotSpinning(true);
    setSlotWinResult(null);

    const symbols = ['⚡', '👑', '💎', '🍭', '7️⃣', '🤠', '🍒'];

    let count = 0;
    const interval = setInterval(() => {
      setSlotSymbols([
        Array.from({ length: 5 }, () => symbols[Math.floor(Math.random() * symbols.length)]),
        Array.from({ length: 5 }, () => symbols[Math.floor(Math.random() * symbols.length)]),
        Array.from({ length: 5 }, () => symbols[Math.floor(Math.random() * symbols.length)]),
      ]);
      soundFX.playSlotStop();
      count++;
      if (count > 12) {
        clearInterval(interval);

        // Win calculation
        const isBigWin = Math.random() < 0.35;
        const mult = isBigWin ? Math.floor(Math.random() * 25 + 3) : Math.random() < 0.3 ? 1.5 : 0;
        const winAmt = +(bet * mult).toFixed(2);

        setIsSlotSpinning(false);
        if (mult > 0) {
          soundFX.playWin();
          setSlotWinResult({ amount: winAmt, message: `BIG WIN! ${mult}x MULTIPLIER!` });
          if (mode === 'real') onUpdateBalance(balance + winAmt);
          if (mult >= 5) {
            try { confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 } }); } catch {}
          }
        } else {
          setSlotWinResult({ amount: 0, message: 'No line match. Try another spin!' });
        }
      }
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-navy-950/85 backdrop-blur-lg animate-in fade-in select-none">
      <div className="relative w-full max-w-5xl bg-navy-900 rounded-3xl overflow-hidden shadow-2xl border border-navy-800 flex flex-col max-h-[92vh]">
        
        {/* Top Game Frame Header */}
        <div className="bg-navy-950 px-4 sm:px-6 py-3 border-b border-navy-800 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-3">
            <span className="text-xl">{game.iconSymbol}</span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm text-white">{game.title}</h3>
                <span className="px-1.5 py-0.2 rounded bg-brand-500/20 text-brand-600 text-[10px] font-bold">
                  {game.provider}
                </span>
              </div>
              <div className="text-[11px] text-ink-400 font-mono">
                RTP: <strong className="text-win-500">{game.rtp}</strong> • Max Win: <strong className="text-brass-400">{game.maxWin}</strong>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mode Switcher */}
            <div className="flex bg-navy-900 p-0.5 rounded-xl border border-navy-800 text-[11px] font-bold">
              <button
                onClick={() => { soundFX.playClick(); setMode('real'); }}
                className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                  mode === 'real' ? 'bg-win-500 text-white font-semibold' : 'text-ink-400 hover:text-white'
                }`}
              >
                REAL PLAY
              </button>
              <button
                onClick={() => { soundFX.playClick(); setMode('demo'); }}
                className={`px-3 py-1 rounded-lg transition cursor-pointer ${
                  mode === 'demo' ? 'bg-brass-500 text-navy-950 font-semibold' : 'text-ink-400 hover:text-white'
                }`}
              >
                FUN DEMO
              </button>
            </div>

            {/* Close */}
            <button
              onClick={() => {
                soundFX.playClick();
                onClose();
              }}
              className="p-2 rounded-xl text-ink-400 hover:text-white hover:bg-navy-800 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Central Game Screen Stage */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-gradient-to-b from-navy-900 via-navy-800 to-navy-950 flex flex-col items-center justify-center min-h-[380px] relative">
          
          {/* Subtle background stage pattern */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(circle, #2e9ae0 1px, transparent 1px)', backgroundSize: '32px 32px' }}
          />

          {/* ENGINE 1: 1xMines Interactive Stage */}
          {game.id === '1x-mines' && (
            <div className="w-full max-w-md space-y-4 text-center relative z-10">
              <div className="flex items-center justify-between text-xs font-bold text-ink-300">
                <span>Active Multiplier: <strong className="text-win-500 font-mono text-base">{minesMultiplier.toFixed(2)}x</strong></span>
                <span>Potential: <strong className="text-brass-400 font-mono text-base">${(bet * minesMultiplier).toFixed(2)}</strong></span>
              </div>

              <div className="grid grid-cols-5 gap-2.5 p-4 bg-navy-950/80 rounded-3xl border border-navy-800 shadow-2xl">
                {minesGrid.length > 0 ? (
                  minesGrid.map((tile) => (
                    <button
                      key={tile.id}
                      onClick={() => handleTileClick(tile.id)}
                      disabled={!minesActive || tile.isRevealed}
                      className={`h-14 sm:h-16 rounded-2xl flex items-center justify-center text-2xl font-bold transition-all shadow-md cursor-pointer ${
                        tile.isRevealed
                          ? tile.isMine
                            ? 'bg-loss-600 text-white'
                            : 'bg-win-500/30 text-win-500 border border-win-500/50'
                          : 'bg-navy-800 hover:bg-ink-700 active:scale-95 border border-ink-700 text-ink-400'
                      }`}
                    >
                      {tile.isRevealed ? (tile.isMine ? '💣' : '💎') : '❓'}
                    </button>
                  ))
                ) : (
                  Array.from({ length: 25 }).map((_, i) => (
                    <div key={i} className="h-14 sm:h-16 rounded-2xl bg-navy-800/60 border border-navy-800 flex items-center justify-center text-ink-600 text-xs">
                      🔒
                    </div>
                  ))
                )}
              </div>

              {/* Status Message */}
              {minesGameOver && (
                <div className="p-3 rounded-2xl bg-loss-500/20 border border-loss-500/50 text-loss-600 font-bold text-xs">
                  💥 EXPLODED! You hit a mine. Better luck next round!
                </div>
              )}

              {minesWon && (
                <div className="p-3 rounded-2xl bg-win-500/20 border border-win-500/50 text-win-500 font-semibold text-sm">
                  🎉 PROFIT TAKEN! Won +${(bet * minesMultiplier).toFixed(2)} ({minesMultiplier.toFixed(2)}x)
                </div>
              )}

              {/* Mines Action Button */}
              {minesActive ? (
                <button
                  onClick={handleMinesCashout}
                  className="w-full py-3.5 rounded-2xl font-semibold text-base bg-win-500 hover:bg-win-500 text-navy-950 shadow-lg shadow-win-500/30 cursor-pointer animate-pulse"
                >
                  CASH OUT ${(bet * minesMultiplier).toFixed(2)} ({minesMultiplier.toFixed(2)}x)
                </button>
              ) : (
                <button
                  onClick={startMinesGame}
                  className="w-full py-3.5 rounded-2xl font-semibold text-base btn-1x-primary flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span>START MINES RUN (${bet})</span>
                </button>
              )}
            </div>
          )}

          {/* ENGINE 2: 1xPlinko Interactive Stage */}
          {game.id === '1x-plinko' && (
            <div className="w-full max-w-md space-y-5 text-center relative z-10">
              <div className="space-y-1">
                <h4 className="text-lg font-semibold text-white">1xPLINKO QUANTUM PYRAMID</h4>
                <p className="text-xs text-ink-400">Watch the peg physics sphere bounce to maximum 29x edge pockets!</p>
              </div>

              {/* Plinko Peg Board Visualization */}
              <div className="p-6 bg-navy-950/80 rounded-3xl border border-navy-800 shadow-2xl space-y-3">
                {[3, 4, 5, 6, 7, 8].map((pegs, rowIdx) => (
                  <div key={rowIdx} className="flex justify-center gap-4 sm:gap-6">
                    {Array.from({ length: pegs }).map((_, pIdx) => (
                      <span key={pIdx} className="w-2.5 h-2.5 rounded-full bg-ink-600 shadow-xs" />
                    ))}
                  </div>
                ))}

                {/* Bottom Multiplier Buckets */}
                <div className="grid grid-cols-8 gap-1 pt-4 border-t border-navy-800">
                  {[29, 4, 1.5, 0.2, 0.2, 1.5, 4, 29].map((mult, idx) => (
                    <div
                      key={idx}
                      className={`py-2 rounded-xl font-mono font-semibold text-[11px] text-center ${
                        mult >= 20 ? 'bg-loss-500 text-white' : mult >= 4 ? 'bg-brass-500 text-navy-950' : mult >= 1.5 ? 'bg-win-500 text-white' : 'bg-navy-800 text-ink-400'
                      }`}
                    >
                      {mult}x
                    </div>
                  ))}
                </div>
              </div>

              {/* Drop Button */}
              <button
                onClick={handlePlinkoDrop}
                disabled={isDropping}
                className="w-full py-3.5 rounded-2xl font-semibold text-base btn-1x-primary flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 shadow-xl"
              >
                <Coins className={`w-5 h-5 ${isDropping ? 'animate-bounce' : ''}`} />
                <span>{isDropping ? 'BALL DROPPING...' : `DROP SPHERE ($${bet})`}</span>
              </button>
            </div>
          )}

          {/* ENGINE 3: Top Slots 5-Reel Interactive Stage */}
          {game.id !== '1x-mines' && game.id !== '1x-plinko' && (
            <div className="w-full max-w-xl space-y-5 text-center relative z-10">
              
              {/* 5-Reel Grid Machine */}
              <div className="p-5 sm:p-6 bg-gradient-to-b from-navy-950 to-navy-900 rounded-3xl border-2 border-ink-700 shadow-2xl space-y-2">
                {slotSymbols.map((row, rIdx) => (
                  <div key={rIdx} className="grid grid-cols-5 gap-2">
                    {row.map((sym, cIdx) => (
                      <div
                        key={cIdx}
                        className="h-16 sm:h-20 bg-navy-900 border border-navy-800 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-inner select-none transition-transform"
                      >
                        <span className={isSlotSpinning ? 'animate-pulse scale-90' : ''}>{sym}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Slot Result Message */}
              {slotWinResult && (
                <div className={`p-3 rounded-2xl text-xs font-bold ${
                  slotWinResult.amount > 0 ? 'bg-win-500 text-navy-950 font-semibold' : 'bg-navy-800 text-ink-400'
                }`}>
                  {slotWinResult.message} {slotWinResult.amount > 0 ? `(+$${slotWinResult.amount.toFixed(2)})` : ''}
                </div>
              )}

              {/* Spin Button */}
              <button
                onClick={handleSlotSpin}
                disabled={isSlotSpinning}
                className="w-full py-4 rounded-2xl font-semibold text-lg btn-1x-primary flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 shadow-xl"
              >
                <RotateCw className={`w-6 h-6 ${isSlotSpinning ? 'animate-spin' : ''}`} />
                <span>{isSlotSpinning ? 'SPINNING 5-REELS...' : `SPIN REELS ($${bet.toFixed(2)})`}</span>
              </button>
            </div>
          )}

        </div>

        {/* Bottom Game Controls Bar */}
        <div className="bg-navy-950 px-4 sm:px-6 py-3.5 border-t border-navy-800 flex flex-wrap items-center justify-between gap-4 text-xs">
          
          {/* Balance Tracker */}
          <div className="flex items-center gap-2">
            <span className="text-ink-400">Balance:</span>
            <span className="font-mono font-bold text-white text-sm">
              {mode === 'real' ? `$${balance.toFixed(2)} ${currency}` : '$10,000.00 DEMO'}
            </span>
          </div>

          {/* Bet Controls */}
          <div className="flex items-center gap-2">
            <span className="text-ink-400">Stake:</span>
            <div className="flex items-center gap-1">
              {[1, 5, 10, 25, 50].map((amt) => (
                <button
                  key={amt}
                  onClick={() => { soundFX.playClick(); setBet(amt); }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                    bet === amt ? 'bg-brand-500 text-white' : 'bg-navy-800 text-ink-300 hover:bg-ink-700'
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
