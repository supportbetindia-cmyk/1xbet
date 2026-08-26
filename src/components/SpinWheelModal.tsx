'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  Sparkles, 
  Gift, 
  CheckCircle2, 
  RotateCw
} from 'lucide-react';
import { soundFX } from '@/lib/audio';

interface SpinWheelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRewardClaimed: (amount: number, message: string) => void;
}

interface WheelSegment {
  label: string;
  sub: string;
  color: string;
  rewardValue: number;
}

const SEGMENTS: WheelSegment[] = [
  { label: '$500 CRYPTO', sub: 'Instant Cash', color: '#a8873c', rewardValue: 500 },
  { label: '50 FREE SPINS', sub: '1xMegaways', color: '#007acc', rewardValue: 25 },
  { label: '2X MULTIPLIER', sub: 'Next 3 Games', color: '#002f5e', rewardValue: 20 },
  { label: '+500 VIP XP', sub: 'Level Boost', color: '#0068b0', rewardValue: 50 },
  { label: '$50 BONUS', sub: 'Zero Wagering', color: '#063a66', rewardValue: 50 },
  { label: '25 FREE SPINS', sub: '1xOlympus', color: '#2e9ae0', rewardValue: 15 },
  { label: '+1000 VIP XP', sub: 'Tier Jump', color: '#002449', rewardValue: 100 },
  { label: 'MYSTERY BOX', sub: 'Grand Prize', color: '#8a6d2c', rewardValue: 250 },
];

export const SpinWheelModal: React.FC<SpinWheelModalProps> = ({
  isOpen,
  onClose,
  onRewardClaimed
}) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [wonPrize, setWonPrize] = useState<WheelSegment | null>(null);

  if (!isOpen) return null;

  const spinWheel = () => {
    if (isSpinning) return;

    soundFX.playClick();
    setIsSpinning(true);
    setWonPrize(null);

    // Pick random winning segment
    const segmentIndex = Math.floor(Math.random() * SEGMENTS.length);
    const selectedPrize = SEGMENTS[segmentIndex];

    const segmentAngle = 360 / SEGMENTS.length;
    // Calculate final rotation (multiple full spins + target angle)
    const extraSpins = 360 * 5; // 5 full rotations
    // Pin is at top (270 deg / 0 deg reference)
    const targetOffset = 360 - (segmentIndex * segmentAngle + segmentAngle / 2);
    const finalDegree = rotationDegree + extraSpins + targetOffset;

    setRotationDegree(finalDegree);

    // Sound effect tick simulation
    let tickCount = 0;
    const tickInterval = setInterval(() => {
      soundFX.playTick();
      tickCount++;
      if (tickCount > 30) clearInterval(tickInterval);
    }, 120);

    // Stop after 4.5 seconds
    setTimeout(() => {
      setIsSpinning(false);
      setWonPrize(selectedPrize);
      soundFX.playWin();

      // Confetti celebration
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 }
        });
      } catch {
        // safe fallback
      }

      onRewardClaimed(selectedPrize.rewardValue, `Won ${selectedPrize.label} on Lucky Wheel!`);
    }, 4500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-900/70 backdrop-blur-md animate-in fade-in">
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

        {/* Modal Header */}
        <div className="space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brass-50 text-brass-600 border border-brass-300 text-[10px] font-medium uppercase tracking-[0.1em]">
            <Gift className="w-3.5 h-3.5" />
            <span>Daily VIP reward</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-semibold text-navy-900">
            Lucky Cyber Wheel
          </h3>
          <p className="text-xs text-ink-500">
            Spin the high-tech wheel daily to unlock crypto, free spins, and VIP XP!
          </p>
        </div>

        {/* The Visual Wheel Container */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto my-6 flex items-center justify-center">
          
          {/* Top Pointer Needle */}
          <div className="absolute -top-3 z-30 flex flex-col items-center">
            <div className="w-6 h-8 bg-gradient-to-b from-brass-400 to-brass-600 rounded-b-full shadow-lg border-2 border-white transform rotate-180 drop-shadow-md"></div>
          </div>

          {/* Outer Glowing Ring */}
          <div className="absolute inset-0 rounded-full border-8 border-ink-100 shadow-xl" />

          {/* Rotating Canvas / SVG Wheel */}
          <div
            className="w-full h-full rounded-full overflow-hidden shadow-inner transition-transform duration-[4500ms] ease-out relative"
            style={{
              transform: `rotate(${rotationDegree}deg)`,
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              {SEGMENTS.map((seg, idx) => {
                const angle = 360 / SEGMENTS.length;
                const startAngle = idx * angle;
                const endAngle = (idx + 1) * angle;
                
                // SVG arc path calculation
                const x1 = 50 + 50 * Math.cos((Math.PI * startAngle) / 180);
                const y1 = 50 + 50 * Math.sin((Math.PI * startAngle) / 180);
                const x2 = 50 + 50 * Math.cos((Math.PI * endAngle) / 180);
                const y2 = 50 + 50 * Math.sin((Math.PI * endAngle) / 180);

                return (
                  <g key={idx}>
                    <path
                      d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`}
                      fill={seg.color}
                      stroke="#ffffff"
                      strokeWidth="0.75"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Inner Center Hub */}
            <div className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-navy-900 text-brass-400 border-4 border-white shadow-xl flex items-center justify-center font-semibold text-xs">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Won Prize Display Alert */}
        {wonPrize && (
          <div className="mb-4 p-4 rounded-2xl bg-win-50 border border-win-500 text-win-600 animate-in zoom-in-95 duration-200 space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.1em] text-win-600">
              <CheckCircle2 className="w-4 h-4 text-win-500" />
              <span>CONGRATULATIONS!</span>
            </div>
            <div className="text-xl font-semibold text-navy-900">
              {wonPrize.label}
            </div>
            <p className="text-xs text-ink-600">
              Reward has been instantly credited to your simulated wallet balance!
            </p>
          </div>
        )}

        {/* Spin CTA Button */}
        <button
          onClick={spinWheel}
          disabled={isSpinning}
          className="w-full py-4 rounded-2xl font-semibold text-base btn-1x-gold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-xl"
        >
          <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
          <span>{isSpinning ? 'SPINNING THE WHEEL...' : wonPrize ? 'SPIN AGAIN' : 'CLAIM FREE DAILY SPIN'}</span>
        </button>

      </div>
    </div>
  );
};
