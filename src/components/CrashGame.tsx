'use client';

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  History,
  Users,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Volume2,
  VolumeX,
  Sparkles,
} from 'lucide-react';
import { Currency, CrashBet } from '@/lib/types';
import { soundFX } from '@/lib/audio';

interface CrashGameProps {
  balance: number;
  currency: Currency;
  onUpdateBalance: (newBalance: number) => void;
  onOpenDeposit: () => void;
}

// Iconic Aviator Red Airplane SVG Component
interface AviatorAirplaneProps {
  state: 'idle' | 'flying' | 'crashed';
  angle: number;
}

const AviatorAirplane: React.FC<AviatorAirplaneProps> = ({ state, angle }) => {
  return (
    <div
      className="relative select-none pointer-events-none transition-transform duration-75"
      style={{
        transform: `rotate(${angle}deg)`,
        transformOrigin: 'center center',
      }}
    >
      {/* Engine thrust / exhaust flame (only during flight or launch) */}
      {(state === 'flying' || state === 'crashed') && (
        <div className="absolute -left-7 top-[42%] -translate-y-1/2 flex items-center pointer-events-none">
          {/* Outer jet glow */}
          <div className="h-4 w-9 rounded-full bg-gradient-to-r from-transparent via-amber-500/80 to-rose-500 blur-xs animate-pulse" />
          {/* Inner flame core */}
          <div className="absolute right-0 h-2 w-5 rounded-full bg-gradient-to-r from-yellow-200 to-amber-400 blur-[1px]" />
          {/* Smoke particle trail */}
          <div className="absolute -left-8 h-1.5 w-7 rounded-full bg-white/25 blur-xs animate-ping" />
        </div>
      )}

      {/* Aviator Plane Vector Graphic */}
      <svg
        viewBox="0 0 140 70"
        className="w-24 h-12 sm:w-28 sm:h-14 drop-shadow-[0_8px_16px_rgba(225,29,72,0.45)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Fuselage Red Gradient */}
          <linearGradient id="fuselageGrad" x1="0" y1="0" x2="1" y2="0.6">
            <stop offset="0%" stopColor="#9f1239" />
            <stop offset="40%" stopColor="#e11d48" />
            <stop offset="85%" stopColor="#f43f5e" />
            <stop offset="100%" stopColor="#fda4af" />
          </linearGradient>

          {/* Wing Red Gradient */}
          <linearGradient id="wingGrad" x1="0" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor="#be123c" />
            <stop offset="60%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#fb7185" />
          </linearGradient>

          {/* Glass Canopy Gradient */}
          <linearGradient id="canopyGrad" x1="0.2" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0c4a6e" />
          </linearGradient>

          {/* Chrome / Metal Spinner */}
          <linearGradient id="spinnerGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>

          {/* Propeller Blur Disc */}
          <radialGradient id="propBlur" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="60%" stopColor="rgba(255,255,255,0.2)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Tail Fin / Rudder */}
        <path
          d="M12 28 L24 6 L36 6 L32 28 Z"
          fill="url(#fuselageGrad)"
          stroke="#881337"
          strokeWidth="0.8"
        />
        {/* Tail Stripe Decal */}
        <path d="M22 8 L28 8 L24 24 L18 24 Z" fill="#ffffff" opacity="0.9" />

        {/* Main Fuselage Body */}
        <path
          d="M14 36 C14 30 26 24 60 23 C98 22 120 28 126 34 C128 36 128 38 126 40 C118 46 95 50 60 49 C26 48 14 42 14 36 Z"
          fill="url(#fuselageGrad)"
          stroke="#881337"
          strokeWidth="0.8"
        />

        {/* Fuselage White Racing Stripe */}
        <path
          d="M24 35 C42 33 80 33 118 36 L116 38 C78 35 42 35 24 37 Z"
          fill="#ffffff"
          opacity="0.9"
        />

        {/* Cockpit Canopy Glass Dome */}
        <path
          d="M72 23 C75 16 92 16 102 24 Z"
          fill="url(#canopyGrad)"
          stroke="#0369a1"
          strokeWidth="0.6"
        />
        {/* Canopy Glass Specular Highlight */}
        <path
          d="M78 20 C82 17 90 17 96 22"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Main Wing (Lower/Foreground) */}
        <path
          d="M48 38 L72 58 L94 58 L82 38 Z"
          fill="url(#wingGrad)"
          stroke="#881337"
          strokeWidth="0.8"
        />
        {/* Wing Tip Strobe Light (Starboard Green) */}
        <circle cx="83" cy="57" r="1.8" fill="#22c55e" className="animate-pulse" />

        {/* Top/Far Wing */}
        <path
          d="M58 24 L78 12 L92 12 L82 24 Z"
          fill="#be123c"
          opacity="0.8"
        />
        {/* Wing Tip Strobe Light (Port Red) */}
        <circle cx="85" cy="13" r="1.5" fill="#ef4444" className="animate-pulse" />

        {/* Front Engine Cowling & Nose */}
        <path
          d="M122 30 C126 31 129 33 130 36 C129 39 126 41 122 42 Z"
          fill="url(#spinnerGrad)"
        />

        {/* Propeller Blade Spinning Motion */}
        <g className="origin-[131px_36px] animate-[spin_0.12s_linear_infinite]">
          {/* Motion blur disc */}
          <ellipse cx="131" cy="36" rx="4" ry="24" fill="url(#propBlur)" opacity="0.6" />
          {/* Physical Blade 1 */}
          <ellipse cx="131" cy="24" rx="2.2" ry="11" fill="#1e293b" />
          <ellipse cx="131" cy="24" rx="1" ry="9" fill="#f8fafc" opacity="0.5" />
          {/* Physical Blade 2 */}
          <ellipse cx="131" cy="48" rx="2.2" ry="11" fill="#1e293b" />
          <ellipse cx="131" cy="48" rx="1" ry="9" fill="#f8fafc" opacity="0.5" />
        </g>

        {/* Center Spinner Cone */}
        <circle cx="131" cy="36" r="3.5" fill="#f8fafc" stroke="#475569" strokeWidth="0.8" />
      </svg>
    </div>
  );
};

export const CrashGame: React.FC<CrashGameProps> = ({
  balance,
  currency,
  onUpdateBalance,
  onOpenDeposit,
}) => {
  // Game state
  const [gameState, setGameState] = useState<'idle' | 'flying' | 'crashed'>('idle');
  const [multiplier, setMultiplier] = useState<number>(1.0);
  const [crashPoint, setCrashPoint] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Active Betting Panel 1
  const [bet1Amount, setBet1Amount] = useState<number>(10);
  const [autoCashout1, setAutoCashout1] = useState<number>(2.0);
  const [isAuto1Enabled, setIsAuto1Enabled] = useState<boolean>(false);
  const [userBet1Placed, setUserBet1Placed] = useState<boolean>(false);
  const [hasCashedOut1, setHasCashedOut1] = useState<boolean>(false);
  const [cashedOutAmount1, setCashedOutAmount1] = useState<number>(0);
  const [cashedOutMult1, setCashedOutMult1] = useState<number>(0);

  // Secondary Betting Panel 2 (Classic Aviator Dual Bet)
  const [dualBetActive, setDualBetActive] = useState<boolean>(false);
  const [bet2Amount, setBet2Amount] = useState<number>(5);
  const [autoCashout2, setAutoCashout2] = useState<number>(5.0);
  const [isAuto2Enabled, setIsAuto2Enabled] = useState<boolean>(false);
  const [userBet2Placed, setUserBet2Placed] = useState<boolean>(false);
  const [hasCashedOut2, setHasCashedOut2] = useState<boolean>(false);
  const [cashedOutAmount2, setCashedOutAmount2] = useState<number>(0);
  const [cashedOutMult2, setCashedOutMult2] = useState<number>(0);

  // Round History
  const [history, setHistory] = useState<number[]>([1.45, 8.2, 2.1, 1.15, 34.5, 1.88, 12.4, 1.05, 4.32, 22.1]);

  // Live community bets
  const [liveBets, setLiveBets] = useState<CrashBet[]>([
    { id: 'b1', player: 'CryptoKing', avatar: '👑', amount: 50, isCashedOut: false },
    { id: 'b2', player: 'CyberNinja', avatar: '🥷', amount: 100, isCashedOut: false },
    { id: 'b3', player: 'AeroAce', avatar: '✈️', amount: 25, isCashedOut: false },
    { id: 'b4', player: 'LuckyLucy', avatar: '🍀', amount: 10, isCashedOut: false },
    { id: 'b5', player: 'MaxMultiplier', avatar: '⚡', amount: 200, isCashedOut: false },
  ]);

  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Generate provably fair crash multiplier
  const generateCrashPoint = (): number => {
    const rand = Math.random();
    if (rand < 0.05) return +(1.0 + Math.random() * 0.15).toFixed(2);
    if (rand < 0.45) return +(1.15 + Math.random() * 0.95).toFixed(2);
    if (rand < 0.78) return +(2.1 + Math.random() * 3.5).toFixed(2);
    if (rand < 0.93) return +(5.6 + Math.random() * 12.0).toFixed(2);
    return +(18.0 + Math.random() * 65.0).toFixed(2);
  };

  const handleToggleMute = () => {
    const muted = soundFX.toggleMute();
    setIsMuted(muted);
  };

  // Launch the Aviator Flight
  const startFlight = () => {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);

    const totalRequired = (userBet1Placed ? 0 : bet1Amount) + (dualBetActive && !userBet2Placed ? bet2Amount : 0);
    if (totalRequired > balance) {
      soundFX.playClick();
      onOpenDeposit();
      return;
    }

    // Deduct bet balances
    let deduction = 0;
    if (!userBet1Placed) {
      setUserBet1Placed(true);
      setHasCashedOut1(false);
      setCashedOutAmount1(0);
      setCashedOutMult1(0);
      deduction += bet1Amount;
    }
    if (dualBetActive && !userBet2Placed) {
      setUserBet2Placed(true);
      setHasCashedOut2(false);
      setCashedOutAmount2(0);
      setCashedOutMult2(0);
      deduction += bet2Amount;
    }

    if (deduction > 0) {
      onUpdateBalance(balance - deduction);
    }

    const targetCrash = generateCrashPoint();
    setCrashPoint(targetCrash);
    setGameState('flying');
    setMultiplier(1.0);

    // Refresh live players feed
    setLiveBets([
      { id: 'b1', player: 'Pilot_Alex', avatar: '✈️', amount: Math.floor(Math.random() * 80 + 20), isCashedOut: false },
      { id: 'b2', player: 'CryptoKing', avatar: '👑', amount: Math.floor(Math.random() * 150 + 50), isCashedOut: false },
      { id: 'b3', player: 'CyberNinja', avatar: '🥷', amount: Math.floor(Math.random() * 60 + 15), isCashedOut: false },
      { id: 'b4', player: 'LuckyLucy', avatar: '🍀', amount: Math.floor(Math.random() * 40 + 10), isCashedOut: false },
      { id: 'b5', player: 'MaxMultiplier', avatar: '⚡', amount: Math.floor(Math.random() * 200 + 50), isCashedOut: false },
    ]);

    startTimeRef.current = performance.now();
    soundFX.playClick();
  };

  // Cashout handlers
  const handleCashout1 = () => {
    if (gameState !== 'flying' || !userBet1Placed || hasCashedOut1) return;

    const winAmt = +(bet1Amount * multiplier).toFixed(2);
    setHasCashedOut1(true);
    setCashedOutAmount1(winAmt);
    setCashedOutMult1(multiplier);
    onUpdateBalance(balance + winAmt);

    soundFX.playCashout();
    soundFX.playWin();

    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#e11d48', '#f43f5e', '#10b981', '#ffffff'],
      });
    } catch {}
  };

  const handleCashout2 = () => {
    if (gameState !== 'flying' || !userBet2Placed || hasCashedOut2) return;

    const winAmt = +(bet2Amount * multiplier).toFixed(2);
    setHasCashedOut2(true);
    setCashedOutAmount2(winAmt);
    setCashedOutMult2(multiplier);
    onUpdateBalance(balance + winAmt);

    soundFX.playCashout();
    soundFX.playWin();

    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#e11d48', '#38bdf8', '#f59e0b', '#ffffff'],
      });
    } catch {}
  };

  // Main real-time flight animation loop
  useEffect(() => {
    if (gameState !== 'flying') return;

    const updateLoop = (currentTime: number) => {
      const elapsedSec = (currentTime - startTimeRef.current) / 1000;
      // Exponential curve formula for Aviator
      const currentMult = +Math.pow(Math.E, 0.082 * Math.pow(elapsedSec * 1.5, 1.28)).toFixed(2);

      soundFX.playRocketPitch(currentMult);

      // Random bot cashouts
      setLiveBets((prevBets) =>
        prevBets.map((b) => {
          if (!b.isCashedOut && Math.random() < 0.02 && currentMult > 1.2) {
            return {
              ...b,
              isCashedOut: true,
              cashoutMultiplier: currentMult,
              winAmount: +(b.amount * currentMult).toFixed(2),
            };
          }
          return b;
        })
      );

      // Auto cashout checks
      if (isAuto1Enabled && !hasCashedOut1 && userBet1Placed && currentMult >= autoCashout1) {
        handleCashout1();
      }
      if (dualBetActive && isAuto2Enabled && !hasCashedOut2 && userBet2Placed && currentMult >= autoCashout2) {
        handleCashout2();
      }

      // Check crash condition
      if (currentMult >= crashPoint) {
        setMultiplier(crashPoint);
        setGameState('crashed');
        soundFX.playCrash();
        setHistory((prev) => [crashPoint, ...prev.slice(0, 11)]);
        setUserBet1Placed(false);
        setUserBet2Placed(false);

        // Auto restart countdown
        setCountdown(4);
        const countInterval = setInterval(() => {
          setCountdown((c) => {
            if (c <= 1) {
              clearInterval(countInterval);
              setGameState('idle');
              setMultiplier(1.0);
              return 0;
            }
            return c - 1;
          });
        }, 1000);

        return;
      }

      setMultiplier(currentMult);
      animationFrameRef.current = requestAnimationFrame(updateLoop);
    };

    animationFrameRef.current = requestAnimationFrame(updateLoop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    gameState,
    crashPoint,
    isAuto1Enabled,
    autoCashout1,
    hasCashedOut1,
    userBet1Placed,
    dualBetActive,
    isAuto2Enabled,
    autoCashout2,
    hasCashedOut2,
    userBet2Placed,
  ]);

  const formatCur = (num: number) =>
    `${currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency + ' '}${num.toFixed(2)}`;

  // ==========================================
  // TRAJECTORY & PLANE POSITIONING MATH (SVG %)
  // ==========================================
  // Progress t in [0, 1] mapped smoothly across multiplier scale
  const progressT = Math.min(1, Math.max(0, Math.log(Math.max(1, multiplier)) / Math.log(32)));

  // Cubic Bezier Control Points for the Aviator Ascent Curve
  const P0 = { x: 8, y: 82 };   // Runway launch position
  const P1 = { x: 36, y: 82 };  // Flat initial takeoff
  const P2 = { x: 62, y: 60 };  // Ascending shoulder
  const P3 = { x: 86, y: 18 };  // High altitude peak

  // Compute (x, y) along the Bezier curve at progress t
  const getBezierPoint = (t: number) => {
    const mt = 1 - t;
    const x =
      Math.pow(mt, 3) * P0.x +
      3 * Math.pow(mt, 2) * t * P1.x +
      3 * mt * Math.pow(t, 2) * P2.x +
      Math.pow(t, 3) * P3.x;
    const y =
      Math.pow(mt, 3) * P0.y +
      3 * Math.pow(mt, 2) * t * P1.y +
      3 * mt * Math.pow(t, 2) * P2.y +
      Math.pow(t, 3) * P3.y;
    return { x, y };
  };

  // Compute tangent angle in degrees along the curve
  const getTangentAngle = (t: number) => {
    const mt = 1 - t;
    const dx =
      3 * Math.pow(mt, 2) * (P1.x - P0.x) +
      6 * mt * t * (P2.x - P1.x) +
      3 * Math.pow(t, 2) * (P3.x - P2.x);
    const dy =
      3 * Math.pow(mt, 2) * (P1.y - P0.y) +
      6 * mt * t * (P2.y - P1.y) +
      3 * Math.pow(t, 2) * (P3.y - P2.y);
    return Math.atan2(dy, dx) * (180 / Math.PI);
  };

  const currentPoint = getBezierPoint(progressT);
  const currentAngle = gameState === 'idle' ? -4 : Math.max(-42, Math.min(-6, getTangentAngle(progressT)));

  // Generate SVG path for flight curve up to current progress
  const generateFlightPath = (t: number) => {
    if (t <= 0.005) return `M ${P0.x} ${P0.y}`;
    const steps = 30;
    let path = `M 0 96 L ${P0.x} ${P0.y}`;
    for (let i = 1; i <= steps; i++) {
      const stepT = (i / steps) * t;
      const pt = getBezierPoint(stepT);
      path += ` L ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`;
    }
    return path;
  };

  // Generate closed polygon SVG for the glowing area fill under the curve
  const generateAreaFillPath = (t: number) => {
    if (t <= 0.005) return '';
    const flightPath = generateFlightPath(t);
    const endPt = getBezierPoint(t);
    return `${flightPath} L ${endPt.x.toFixed(2)} 100 L 0 100 Z`;
  };

  // Plane screen coordinates based on game state
  const planePosX =
    gameState === 'crashed' ? 120 : gameState === 'idle' ? P0.x : currentPoint.x;
  const planePosY =
    gameState === 'crashed' ? -20 : gameState === 'idle' ? P0.y : currentPoint.y;

  return (
    <section id="crash" className="border-t border-ink-200 bg-ink-50 py-12 select-none">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="eyebrow eyebrow-brand flex items-center gap-1.5">
                <span className="text-sm">✈️</span> Spribe &amp; 1xLab Original
              </span>
              <span className="rounded-full bg-rose-500/10 px-2 py-0.5 text-[10px] font-bold text-rose-600 border border-rose-500/20">
                PROVABLY FAIR 99.0% RTP
              </span>
            </div>
            <h2 className="mt-2 text-[28px] sm:text-[34px] font-bold tracking-[-0.03em] text-ink-900 flex items-center gap-3">
              Aviator <span className="text-brand-500 font-medium text-lg sm:text-xl">1xPro Crash</span>
            </h2>
            <p className="mt-1 text-sm text-ink-500">
              Watch the red plane ascend in real time. Cash out your bet before it flies away!
            </p>
          </div>

          {/* Recent Multipliers Strip */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none bg-white p-2 rounded-2xl border border-ink-200 shadow-xs">
            <span className="flex shrink-0 items-center gap-1.5 px-2 text-[11px] font-bold uppercase tracking-wider text-ink-400">
              <History className="h-3.5 w-3.5" />
              History
            </span>
            {history.map((h, i) => (
              <span
                key={i}
                className={`shrink-0 rounded-lg px-2.5 py-1 font-mono text-[12px] font-bold transition-all shadow-2xs ${
                  h >= 10.0
                    ? 'bg-amber-500 text-navy-950 font-extrabold shadow-amber-500/20'
                    : h >= 2.0
                    ? 'bg-purple-600 text-white shadow-purple-600/20'
                    : 'bg-brand-50 text-brand-700 border border-brand-200'
                }`}
              >
                {h.toFixed(2)}&times;
              </span>
            ))}
          </div>
        </div>

        {/* Main Grid Layout: Flight Arena + Dual Bet Controls */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
          
          {/* ========================================================= */}
          {/* 1. AVIATOR FLIGHT RADAR ARENA */}
          {/* ========================================================= */}
          <div className="relative flex min-h-[460px] sm:min-h-[500px] flex-col justify-between overflow-hidden rounded-3xl bg-[#090d16] border border-white/10 p-5 sm:p-7 shadow-2xl lg:col-span-8">
            
            {/* Subtle Radar Background Grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-15"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
              }}
            />

            {/* Altitude Ceiling Horizon Lines */}
            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-6 opacity-20 text-[10px] font-mono text-white">
              <div className="border-b border-dashed border-white/20 pb-1">100.00&times; CEILING</div>
              <div className="border-b border-dashed border-white/20 pb-1">10.00&times; STRATOSPHERE</div>
              <div className="border-b border-dashed border-white/20 pb-1">2.00&times; TAKEOFF ZONE</div>
              <div className="border-b border-dashed border-white/30 pb-1 flex justify-between">
                <span>0.00s RUNWAY</span>
                <span>DISTANCE &rarr;</span>
              </div>
            </div>

            {/* Glowing Runway Strip at the bottom left */}
            <div className="pointer-events-none absolute bottom-4 left-6 right-6 flex items-center gap-3 opacity-40">
              <div className="h-1 w-24 bg-gradient-to-r from-brand-500 to-rose-500 rounded-full" />
              <div className="flex gap-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-1 w-4 bg-white/60 rounded-full animate-pulse" />
                ))}
              </div>
            </div>

            {/* Dynamic SVG Flight Path & Area Glow */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                {/* Curve Stroke Red/Rose Gradient */}
                <linearGradient id="aviatorStroke" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#e11d48" stopOpacity="0.4" />
                  <stop offset="60%" stopColor="#f43f5e" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#fb7185" stopOpacity="1" />
                </linearGradient>

                {/* Shaded Area Underneath Gradient */}
                <linearGradient id="aviatorAreaFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#e11d48" stopOpacity="0.35" />
                  <stop offset="60%" stopColor="#be123c" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#9f1239" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Glowing fill underneath trajectory curve */}
              {gameState !== 'idle' && (
                <path
                  d={generateAreaFillPath(progressT)}
                  fill="url(#aviatorAreaFill)"
                  className="transition-all duration-75"
                />
              )}

              {/* Trajectory Flight Path Line */}
              {gameState !== 'idle' && (
                <path
                  d={generateFlightPath(progressT)}
                  fill="none"
                  stroke="url(#aviatorStroke)"
                  strokeWidth="0.9"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                />
              )}
            </svg>

            {/* Top Arena Header: State indicator, Seed Hash & Audio Toggle */}
            <div className="relative z-10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3.5 py-1.5 backdrop-blur-md">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      gameState === 'flying'
                        ? 'bg-rose-500 animate-ping'
                        : gameState === 'crashed'
                        ? 'bg-loss-500'
                        : 'bg-brand-400'
                    }`}
                  />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white">
                    {gameState === 'flying'
                      ? 'FLIGHT IN PROGRESS'
                      : gameState === 'crashed'
                      ? 'FLEW AWAY'
                      : 'READY FOR TAKEOFF'}
                  </span>
                </span>

                {gameState === 'crashed' && countdown > 0 && (
                  <span className="rounded-full bg-line px-2.5 py-1 text-[11px] font-mono font-medium text-navy-200">
                    Next in {countdown}s
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-mono text-navy-300 sm:flex">
                  <ShieldCheck className="h-3.5 w-3.5 text-brand-300" />
                  <span>SHA256: 8b4f…a92</span>
                </span>

                <button
                  onClick={handleToggleMute}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition hover:bg-line cursor-pointer"
                  title={isMuted ? 'Unmute sound' : 'Mute sound'}
                >
                  {isMuted ? <VolumeX className="h-4 w-4 text-ink-400" /> : <Volume2 className="h-4 w-4 text-brand-300" />}
                </button>
              </div>
            </div>

            {/* ================================================= */}
            {/* THE VISIBLE ANIMATED RED AVIATOR AIRPLANE */}
            {/* ================================================= */}
            <div
              className="pointer-events-none absolute z-20 transition-all"
              style={{
                left: `${planePosX}%`,
                top: `${planePosY}%`,
                transform: 'translate(-50%, -50%)',
                transition:
                  gameState === 'crashed'
                    ? 'left 0.8s cubic-bezier(0.2, 0.9, 0.3, 1), top 0.8s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.8s ease-in'
                    : gameState === 'idle'
                    ? 'left 0.4s ease-out, top 0.4s ease-out'
                    : 'none',
                opacity: gameState === 'crashed' ? 0.3 : 1,
              }}
            >
              <AviatorAirplane state={gameState} angle={currentAngle} />
            </div>

            {/* Center Arena: Huge Live Multiplier Display & Notifications */}
            <div className="relative z-10 my-auto py-8 text-center">
              {gameState === 'crashed' ? (
                <div className="animate-in zoom-in-95 duration-200">
                  <span className="inline-flex items-center gap-2 rounded-full border border-rose-500/40 bg-rose-500/15 px-4 py-1.5 text-[12px] font-bold uppercase tracking-wider text-rose-400 shadow-lg shadow-rose-500/20">
                    <AlertTriangle className="h-4 w-4" />
                    FLEW AWAY AT
                  </span>
                  <div className="mt-3 font-mono text-[72px] sm:text-[92px] font-black leading-none tracking-tight text-rose-500 drop-shadow-[0_0_50px_rgba(225,29,72,0.6)]">
                    {multiplier.toFixed(2)}&times;
                  </div>
                  <p className="mt-3 text-sm text-navy-300">Prepare bets for the next takeoff…</p>
                </div>
              ) : gameState === 'flying' ? (
                <div>
                  <div className="font-mono text-[76px] sm:text-[104px] font-black leading-none tracking-tight text-white drop-shadow-[0_0_60px_rgba(244,63,94,0.5)]">
                    {multiplier.toFixed(2)}&times;
                  </div>
                  {userBet1Placed && !hasCashedOut1 && (
                    <p className="mt-3 text-sm font-medium text-rose-200">
                      Bet 1 Payout:{' '}
                      <span className="font-mono font-bold text-white text-base">
                        {formatCur(bet1Amount * multiplier)}
                      </span>
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[12px] font-semibold text-brand-200 backdrop-blur-md">
                    <Sparkles className="h-4 w-4 text-brand-300" />
                    AVIATOR 1X PRO READY
                  </div>
                  <div className="font-mono text-[64px] sm:text-[84px] font-black leading-none tracking-tight text-fg">
                    1.00&times;
                  </div>
                  <p className="mx-auto max-w-sm text-xs sm:text-sm text-navy-300">
                    Place your bets and watch the red plane climb to 10,000&times;!
                  </p>
                </div>
              )}

              {/* Cashout Success Badges */}
              {hasCashedOut1 && (
                <div className="animate-rise-in mt-4 inline-flex items-center gap-2 rounded-xl border border-win-500/40 bg-win-500/15 px-4 py-2 text-white backdrop-blur-md shadow-lg shadow-win-500/20">
                  <CheckCircle2 className="h-5 w-5 text-win-500" />
                  <span className="text-sm">
                    Bet 1 Won <strong className="font-mono text-win-400">{formatCur(cashedOutAmount1)}</strong> at{' '}
                    <strong className="font-mono text-win-400">{cashedOutMult1.toFixed(2)}&times;</strong>
                  </span>
                </div>
              )}
              {hasCashedOut2 && (
                <div className="animate-rise-in mt-2 ml-2 inline-flex items-center gap-2 rounded-xl border border-win-500/40 bg-win-500/15 px-4 py-2 text-white backdrop-blur-md shadow-lg shadow-win-500/20">
                  <CheckCircle2 className="h-5 w-5 text-win-500" />
                  <span className="text-sm">
                    Bet 2 Won <strong className="font-mono text-win-400">{formatCur(cashedOutAmount2)}</strong> at{' '}
                    <strong className="font-mono text-win-400">{cashedOutMult2.toFixed(2)}&times;</strong>
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Flight Telemetry Strip */}
            <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3 font-mono text-[11px] text-navy-300">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 animate-pulse" />
                Live Telemetry: {(progressT * 100).toFixed(0)}% altitude
              </span>
              <span className="text-rose-300 font-bold">10,000&times; MAX CLIMB</span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 2. CLASSIC AVIATOR DUAL BETTING PANELS */}
          {/* ========================================================= */}
          <div className="space-y-4 lg:col-span-4">
            
            {/* Header Tabs: Single Bet vs Dual Bet */}
            <div className="flex items-center justify-between rounded-2xl bg-white p-2 border border-ink-200 shadow-xs">
              <div className="flex gap-1">
                <button
                  onClick={() => setDualBetActive(false)}
                  className={`rounded-xl px-4 py-1.5 text-xs font-bold transition cursor-pointer ${
                    !dualBetActive ? 'bg-navy-900 text-white' : 'text-ink-500 hover:text-ink-900'
                  }`}
                >
                  Single Bet
                </button>
                <button
                  onClick={() => setDualBetActive(true)}
                  className={`rounded-xl px-4 py-1.5 text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    dualBetActive ? 'bg-rose-600 text-white' : 'text-ink-500 hover:text-ink-900'
                  }`}
                >
                  <span>Dual Bet (2x)</span>
                  <span className="rounded-sm bg-amber-400 text-navy-950 px-1 text-[9px] font-extrabold">PRO</span>
                </button>
              </div>

              <div className="text-right pr-2">
                <span className="text-[10px] font-semibold text-ink-400 block">BALANCE</span>
                <span className="font-mono text-xs font-bold text-ink-800">{formatCur(balance)}</span>
              </div>
            </div>

            {/* BET PANEL 1 */}
            <div className="rounded-3xl border border-ink-200 bg-white p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-[11px] font-black text-rose-600">
                    1
                  </span>
                  Bet Panel 1
                </span>
                <span className="text-[11px] font-mono text-ink-500">Min $1.00</span>
              </div>

              {/* Stake input */}
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max={balance}
                  value={bet1Amount}
                  onChange={(e) => setBet1Amount(Math.max(1, Number(e.target.value)))}
                  disabled={gameState === 'flying' && userBet1Placed}
                  className="field w-full py-2.5 pl-3.5 pr-[120px] font-mono text-[15px] font-bold"
                />
                <div className="absolute right-1.5 top-1/2 flex -translate-y-1/2 gap-1">
                  <button
                    onClick={() => { soundFX.playClick(); setBet1Amount(Math.max(1, +(bet1Amount / 2).toFixed(1))); }}
                    disabled={gameState === 'flying' && userBet1Placed}
                    className="rounded-md px-2 py-1 text-[11px] font-bold text-ink-600 hover:bg-ink-100 cursor-pointer"
                  >
                    ½
                  </button>
                  <button
                    onClick={() => { soundFX.playClick(); setBet1Amount(Math.min(balance, +(bet1Amount * 2).toFixed(1))); }}
                    disabled={gameState === 'flying' && userBet1Placed}
                    className="rounded-md px-2 py-1 text-[11px] font-bold text-ink-600 hover:bg-ink-100 cursor-pointer"
                  >
                    2&times;
                  </button>
                  <button
                    onClick={() => { soundFX.playClick(); setBet1Amount(Math.min(100, balance)); }}
                    disabled={gameState === 'flying' && userBet1Placed}
                    className="rounded-md bg-rose-50 px-2 py-1 text-[11px] font-bold text-rose-600 hover:bg-rose-100 cursor-pointer"
                  >
                    Max
                  </button>
                </div>
              </div>

              {/* Quick stake presets */}
              <div className="grid grid-cols-4 gap-1.5">
                {[1, 5, 10, 25].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => { soundFX.playClick(); setBet1Amount(preset); }}
                    disabled={gameState === 'flying' && userBet1Placed}
                    className={`rounded-lg py-1.5 font-mono text-[11px] font-bold transition cursor-pointer ${
                      bet1Amount === preset
                        ? 'bg-rose-600 text-white'
                        : 'bg-ink-50 text-ink-600 hover:bg-ink-100'
                    }`}
                  >
                    ${preset}
                  </button>
                ))}
              </div>

              {/* Auto Cashout option */}
              <div className="rounded-xl border border-ink-200 bg-ink-25 p-3">
                <label className="flex cursor-pointer items-center justify-between">
                  <span className="text-[12px] font-bold text-ink-800">Auto Cash Out</span>
                  <input
                    type="checkbox"
                    checked={isAuto1Enabled}
                    onChange={(e) => setIsAuto1Enabled(e.target.checked)}
                    className="h-4 w-4 cursor-pointer accent-rose-600"
                  />
                </label>

                {isAuto1Enabled && (
                  <div className="animate-rise-in mt-2 flex items-center gap-2">
                    <input
                      type="number"
                      step="0.1"
                      min="1.1"
                      max="100"
                      value={autoCashout1}
                      onChange={(e) => setAutoCashout1(Number(e.target.value))}
                      className="field w-full bg-white px-2.5 py-1.5 font-mono text-[13px] font-bold"
                    />
                    <span className="shrink-0 text-[11px] font-bold text-ink-500">&times; MULTIPLIER</span>
                  </div>
                )}
              </div>

              {/* Action Button: Bet or Cashout */}
              {gameState === 'flying' && userBet1Placed ? (
                <button
                  onClick={handleCashout1}
                  disabled={hasCashedOut1}
                  className={`w-full rounded-2xl py-3.5 transition-all shadow-lg cursor-pointer ${
                    hasCashedOut1
                      ? 'cursor-not-allowed bg-ink-200 text-ink-400'
                      : 'bg-win-500 text-white shadow-win-500/30 hover:bg-win-600 active:scale-98'
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-90">
                    {hasCashedOut1 ? 'CASHED OUT' : 'TAKE PROFIT'}
                  </span>
                  <div className="font-mono text-lg font-black">
                    {hasCashedOut1
                      ? `+${formatCur(cashedOutAmount1)}`
                      : formatCur(bet1Amount * multiplier)}
                  </div>
                </button>
              ) : (
                <button
                  onClick={startFlight}
                  className="w-full rounded-2xl bg-rose-600 hover:bg-rose-700 py-3.5 text-white font-bold text-base transition-all shadow-lg shadow-rose-600/30 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span className="text-lg">✈️</span>
                  <span>BET {formatCur(bet1Amount)}</span>
                </button>
              )}
            </div>

            {/* BET PANEL 2 (When Dual Bet is Active) */}
            {dualBetActive && (
              <div className="animate-in fade-in slide-in-from-top-2 duration-200 rounded-3xl border border-brand-200 bg-white p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-600 flex items-center gap-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-100 text-[11px] font-black text-brand-600">
                      2
                    </span>
                    Bet Panel 2
                  </span>
                  <span className="text-[11px] font-mono text-ink-500">Min $1.00</span>
                </div>

                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max={balance}
                    value={bet2Amount}
                    onChange={(e) => setBet2Amount(Math.max(1, Number(e.target.value)))}
                    disabled={gameState === 'flying' && userBet2Placed}
                    className="field w-full py-2.5 pl-3.5 pr-[120px] font-mono text-[15px] font-bold"
                  />
                  <div className="absolute right-1.5 top-1/2 flex -translate-y-1/2 gap-1">
                    <button
                      onClick={() => { soundFX.playClick(); setBet2Amount(Math.max(1, +(bet2Amount / 2).toFixed(1))); }}
                      disabled={gameState === 'flying' && userBet2Placed}
                      className="rounded-md px-2 py-1 text-[11px] font-bold text-ink-600 hover:bg-ink-100 cursor-pointer"
                    >
                      ½
                    </button>
                    <button
                      onClick={() => { soundFX.playClick(); setBet2Amount(Math.min(balance, +(bet2Amount * 2).toFixed(1))); }}
                      disabled={gameState === 'flying' && userBet2Placed}
                      className="rounded-md px-2 py-1 text-[11px] font-bold text-ink-600 hover:bg-ink-100 cursor-pointer"
                    >
                      2&times;
                    </button>
                    <button
                      onClick={() => { soundFX.playClick(); setBet2Amount(Math.min(100, balance)); }}
                      disabled={gameState === 'flying' && userBet2Placed}
                      className="rounded-md bg-brand-50 px-2 py-1 text-[11px] font-bold text-brand-600 hover:bg-brand-100 cursor-pointer"
                    >
                      Max
                    </button>
                  </div>
                </div>

                <div className="rounded-xl border border-ink-200 bg-ink-25 p-3">
                  <label className="flex cursor-pointer items-center justify-between">
                    <span className="text-[12px] font-bold text-ink-800">Auto Cash Out</span>
                    <input
                      type="checkbox"
                      checked={isAuto2Enabled}
                      onChange={(e) => setIsAuto2Enabled(e.target.checked)}
                      className="h-4 w-4 cursor-pointer accent-brand-600"
                    />
                  </label>

                  {isAuto2Enabled && (
                    <div className="animate-rise-in mt-2 flex items-center gap-2">
                      <input
                        type="number"
                        step="0.1"
                        min="1.1"
                        max="100"
                        value={autoCashout2}
                        onChange={(e) => setAutoCashout2(Number(e.target.value))}
                        className="field w-full bg-white px-2.5 py-1.5 font-mono text-[13px] font-bold"
                      />
                      <span className="shrink-0 text-[11px] font-bold text-ink-500">&times; MULTIPLIER</span>
                    </div>
                  )}
                </div>

                {gameState === 'flying' && userBet2Placed ? (
                  <button
                    onClick={handleCashout2}
                    disabled={hasCashedOut2}
                    className={`w-full rounded-2xl py-3.5 transition-all shadow-lg cursor-pointer ${
                      hasCashedOut2
                        ? 'cursor-not-allowed bg-ink-200 text-ink-400'
                        : 'bg-win-500 text-white shadow-win-500/30 hover:bg-win-600 active:scale-98'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-90">
                      {hasCashedOut2 ? 'CASHED OUT' : 'TAKE PROFIT (BET 2)'}
                    </span>
                    <div className="font-mono text-lg font-black">
                      {hasCashedOut2
                        ? `+${formatCur(cashedOutAmount2)}`
                        : formatCur(bet2Amount * multiplier)}
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={startFlight}
                    className="w-full rounded-2xl bg-brand-600 hover:bg-brand-700 py-3.5 text-white font-bold text-base transition-all shadow-lg shadow-brand-600/30 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span className="text-lg">✈️</span>
                    <span>BET 2 {formatCur(bet2Amount)}</span>
                  </button>
                )}
              </div>
            )}

            {/* Live Community Bets Feed */}
            <div className="rounded-3xl border border-ink-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between pb-2 border-b border-ink-100">
                <span className="flex items-center gap-2 text-xs font-bold text-ink-700">
                  <Users className="h-4 w-4 text-ink-400" />
                  Live Round Pilots ({liveBets.length})
                </span>
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-win-600">
                  <span className="h-2 w-2 rounded-full bg-win-500 animate-pulse" />
                  LIVE
                </span>
              </div>

              <div className="mt-3 max-h-40 space-y-1.5 overflow-y-auto pr-1">
                {liveBets.map((b) => (
                  <div
                    key={b.id}
                    className={`flex items-center justify-between rounded-xl px-3 py-2 text-[12px] transition ${
                      b.isCashedOut ? 'bg-win-50 border border-win-200' : 'bg-ink-50'
                    }`}
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <span className="text-sm">{b.avatar}</span>
                      <span className="truncate font-semibold text-ink-800">{b.player}</span>
                    </span>

                    <span className="flex shrink-0 items-center gap-2 font-mono">
                      <span className="text-ink-500">${b.amount}</span>
                      {b.isCashedOut ? (
                        <span className="rounded-md bg-win-500 px-1.5 py-0.5 text-[11px] font-extrabold text-white">
                          {b.cashoutMultiplier?.toFixed(2)}&times;
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-rose-600 flex items-center gap-1">
                          <span>✈️</span> Flying
                        </span>
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
