export interface AuthenticGame {
  id: string;
  title: string;
  category: 'originals' | 'slots' | 'live' | 'game-shows' | 'bonus-buy' | 'megaways' | 'table';
  provider: string;
  rtp: string;
  volatility: 'Low' | 'Medium' | 'High' | 'Very High' | 'Extreme';
  maxWin: string;
  minBet: number;
  maxBet: number;
  badge?: string;
  isHot?: boolean;
  isNew?: boolean;
  playsCount: string;
  description: string;
  posterBg: string;
  iconSymbol: string;
  accentColor: string;
  imageUrl?: string;
}

export interface GameProvider {
  id: string;
  name: string;
  gamesCount: number;
  logoText: string;
  bgGradient: string;
}

export const GAME_PROVIDERS: GameProvider[] = [
  { id: '1x-originals', name: '1xOriginals', gamesCount: 48, logoText: '1X ORIGINALS', bgGradient: 'from-brand-600 to-brand-900' },
  { id: 'pragmatic', name: 'Pragmatic Play', gamesCount: 380, logoText: 'PRAGMATIC PLAY', bgGradient: 'from-brass-500 to-brass-600' },
  { id: 'evolution', name: 'Evolution Gaming', gamesCount: 195, logoText: 'EVOLUTION', bgGradient: 'from-navy-800 to-navy-950' },
  { id: 'spribe', name: 'Spribe', gamesCount: 24, logoText: 'SPRIBE', bgGradient: 'from-loss-600 to-loss-600' },
  { id: 'hacksaw', name: 'Hacksaw Gaming', gamesCount: 140, logoText: 'HACKSAW', bgGradient: 'from-navy-900 to-black' },
  { id: 'nolimit', name: 'Nolimit City', gamesCount: 95, logoText: 'NOLIMIT CITY', bgGradient: 'from-brass-500 to-brass-600' },
  { id: 'netent', name: 'NetEnt', gamesCount: 220, logoText: 'NETENT', bgGradient: 'from-win-600 to-win-600' },
  { id: 'playngo', name: 'Play\'n GO', gamesCount: 310, logoText: 'PLAY\'N GO', bgGradient: 'from-brand-600 to-brand-800' },
];

export const AUTHENTIC_GAMES: AuthenticGame[] = [
  // 1xOriginals & Crash
  {
    id: 'aviator-1x',
    title: 'Aviator 1xPro',
    category: 'originals',
    provider: 'Spribe & 1xLab',
    rtp: '99.0%',
    volatility: 'High',
    maxWin: '10,000x',
    minBet: 0.10,
    maxBet: 500,
    badge: 'TOP PLAYED',
    isHot: true,
    playsCount: '1.4M',
    description: 'The world-famous social multiplayer curve game. Watch the plane ascend and cash out before it flies away!',
    posterBg: 'linear-gradient(135deg, #001124 0%, #002f5e 50%, #e11d48 100%)',
    iconSymbol: '✈️',
    accentColor: '#e11d48',
    imageUrl: '/images/games/aviator.jpg'
  },
  {
    id: '1x-mines',
    title: '1xMines Grid',
    category: 'originals',
    provider: '1xOriginals',
    rtp: '99.0%',
    volatility: 'Very High',
    maxWin: '100,000x',
    minBet: 0.05,
    maxBet: 1000,
    badge: 'PROVABLY FAIR',
    isHot: true,
    playsCount: '890K',
    description: 'Uncover diamond gems across the 5x5 grid while dodging explosive landmines for compounding multipliers.',
    posterBg: 'linear-gradient(135deg, #001124 0%, #002f5e 50%, #059669 100%)',
    iconSymbol: '💎',
    accentColor: '#10b981',
    imageUrl: '/images/games/mines.jpg'
  },
  {
    id: '1x-plinko',
    title: '1xPlinko Ultra',
    category: 'originals',
    provider: '1xOriginals',
    rtp: '99.0%',
    volatility: 'High',
    maxWin: '1,000x',
    minBet: 0.10,
    maxBet: 500,
    badge: 'HOT ORIGINALS',
    isHot: true,
    playsCount: '750K',
    description: 'Drop neon quantum spheres through the 16-row pyramid into massive 1,000x edge multiplier pockets.',
    posterBg: 'linear-gradient(135deg, #001124 0%, #002f5e 50%, #7c3aed 100%)',
    iconSymbol: '⚪',
    accentColor: '#8b5cf6',
    imageUrl: '/images/games/plinko.jpg'
  },
  {
    id: '1x-dice',
    title: '1xDice: 99% RTP',
    category: 'originals',
    provider: '1xOriginals',
    rtp: '99.0%',
    volatility: 'Medium',
    maxWin: '990x',
    minBet: 0.01,
    maxBet: 2000,
    badge: 'INSTANT WIN',
    isNew: false,
    playsCount: '520K',
    description: 'Set your target win probability from 1% to 98%, roll the verifiable dice, and take instant crypto profits.',
    posterBg: 'linear-gradient(135deg, #0284c7 0%, #0369a1 50%, #075985 100%)',
    iconSymbol: '🎲',
    accentColor: '#0284c7',
    imageUrl: '/images/games/crystal-deluxe.jpg'
  },

  // Iconic Top Slots
  {
    id: 'gates-of-olympus-1000',
    title: 'Gates of Olympus 1000',
    category: 'slots',
    provider: 'Pragmatic Play',
    rtp: '96.5%',
    volatility: 'Very High',
    maxWin: '15,000x',
    minBet: 0.20,
    maxBet: 100,
    badge: '1000X MULTIS',
    isHot: true,
    playsCount: '2.8M',
    description: 'Zeus summons lightning bolts with random multiplier orbs up to 1000x and unlimited tumbling wins.',
    posterBg: 'linear-gradient(135deg, #001124 0%, #002f5e 50%, #d97706 100%)',
    iconSymbol: '⚡',
    accentColor: '#f59e0b',
    imageUrl: '/images/games/olympus.jpg'
  },
  {
    id: 'sweet-bonanza-1000',
    title: 'Sweet Bonanza 1000',
    category: 'slots',
    provider: 'Pragmatic Play',
    rtp: '96.5%',
    volatility: 'High',
    maxWin: '25,000x',
    minBet: 0.20,
    maxBet: 125,
    badge: 'FEATURE BUY',
    isHot: true,
    playsCount: '2.1M',
    description: 'Explosive candy tumble reels with 1000x multiplier bombs during the free spins sugar bonus round.',
    posterBg: 'linear-gradient(135deg, #db2777 0%, #be185d 50%, #831843 100%)',
    iconSymbol: '🍭',
    accentColor: '#ec4899'
  },
  {
    id: 'wanted-dead-or-a-wild',
    title: 'Wanted Dead or a Wild',
    category: 'slots',
    provider: 'Hacksaw Gaming',
    rtp: '96.4%',
    volatility: 'Extreme',
    maxWin: '12,500x',
    minBet: 0.20,
    maxBet: 100,
    badge: 'VS MULTIPLIERS',
    isHot: true,
    playsCount: '1.9M',
    description: 'Gritty wild west slot featuring VS Multiplier duels up to 100x, The Great Train Robbery, and Dead Man\'s Hand.',
    posterBg: 'linear-gradient(135deg, #1c1917 0%, #292524 50%, #44403c 100%)',
    iconSymbol: '🤠',
    accentColor: '#ea580c'
  },
  {
    id: 'sugar-rush-1000',
    title: 'Sugar Rush 1000',
    category: 'slots',
    provider: 'Pragmatic Play',
    rtp: '96.5%',
    volatility: 'Very High',
    maxWin: '25,000x',
    minBet: 0.20,
    maxBet: 100,
    badge: 'CLUSTER PAYS',
    isHot: false,
    playsCount: '1.6M',
    description: '7x7 grid cluster pays with multiplier spots doubling up to 1024x on consecutive winning pops.',
    posterBg: 'linear-gradient(135deg, #9333ea 0%, #7e22ce 50%, #581c87 100%)',
    iconSymbol: '🍬',
    accentColor: '#a855f7'
  },
  {
    id: 'tombstone-rip',
    title: 'Tombstone RIP',
    category: 'slots',
    provider: 'Nolimit City',
    rtp: '96.1%',
    volatility: 'Extreme',
    maxWin: '300,000x',
    minBet: 0.10,
    maxBet: 50,
    badge: 'MAX WIN 300,000X',
    isNew: false,
    playsCount: '980K',
    description: 'The highest max win potential in slot history. xNudge Wilds, Boothill Freespins, and insane volatility.',
    posterBg: 'linear-gradient(135deg, #09090b 0%, #18181b 50%, #27272a 100%)',
    iconSymbol: '⚰️',
    accentColor: '#71717a'
  },
  {
    id: 'big-bass-splash',
    title: 'Big Bass Splash',
    category: 'slots',
    provider: 'Pragmatic Play',
    rtp: '96.7%',
    volatility: 'High',
    maxWin: '5,000x',
    minBet: 0.10,
    maxBet: 250,
    badge: 'FREE SPINS',
    isHot: true,
    playsCount: '1.7M',
    description: 'Reel in massive fish money symbols with the Fisherman wild and level up multipliers to 10x.',
    posterBg: 'linear-gradient(135deg, #0891b2 0%, #0e7490 50%, #155e75 100%)',
    iconSymbol: '🎣',
    accentColor: '#06b6d4'
  },

  // Live Dealer & Game Shows
  {
    id: 'crazy-time-live',
    title: 'Crazy Time Live 4K',
    category: 'game-shows',
    provider: 'Evolution Gaming',
    rtp: '96.1%',
    volatility: 'Very High',
    maxWin: '25,000x',
    minBet: 0.10,
    maxBet: 5000,
    badge: 'LIVE 4K STREAM',
    isHot: true,
    playsCount: '3.2M',
    description: 'The ultimate live game show wheel with Pachinko, Cash Hunt, Coin Flip, and the colossal Crazy Time bonus.',
    posterBg: 'linear-gradient(135deg, #001124 0%, #002f5e 50%, #b91c1c 100%)',
    iconSymbol: '🎡',
    accentColor: '#ef4444',
    imageUrl: '/images/games/crazy-time.jpg'
  },
  {
    id: 'andar-bahar-live-1x',
    title: 'Andar Bahar Live 1xPro',
    category: 'live',
    provider: '1xLive & Evolution',
    rtp: '97.8%',
    volatility: 'Medium',
    maxWin: '120x',
    minBet: 0.50,
    maxBet: 5000,
    badge: '1X EXCLUSIVE',
    isHot: true,
    playsCount: '1.5M',
    description: 'Classic Indian royal card game with live dealer, side bets, and real-time multiplier cards.',
    posterBg: 'linear-gradient(135deg, #001124 0%, #002f5e 50%, #007acc 100%)',
    iconSymbol: '🃏',
    accentColor: '#007acc',
    imageUrl: '/images/games/andar-bahar.jpg'
  },
  {
    id: 'lightning-roulette-vip',
    title: 'Lightning Roulette XXXTreme',
    category: 'live',
    provider: 'Evolution Gaming',
    rtp: '97.3%',
    volatility: 'High',
    maxWin: '2,000x',
    minBet: 0.20,
    maxBet: 10000,
    badge: 'LIGHTNING MULTIS',
    isHot: true,
    playsCount: '1.8M',
    description: 'European roulette supercharged with chain lightning and double strikes delivering multipliers up to 2,000x.',
    posterBg: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1e38 100%)',
    iconSymbol: '⚡',
    accentColor: '#f59e0b',
    imageUrl: '/images/games/lightning-roulette.jpg'
  },
  {
    id: 'monopoly-big-baller',
    title: 'Monopoly Big Baller Live',
    category: 'game-shows',
    provider: 'Evolution Gaming',
    rtp: '96.1%',
    volatility: 'High',
    maxWin: '25,000x',
    minBet: 0.10,
    maxBet: 2000,
    badge: '3D BOARD GAME',
    isNew: true,
    playsCount: '1.1M',
    description: 'Live riverboat bingo game where Mr. Monopoly walks the 3D board collecting houses, hotels, and multipliers.',
    posterBg: 'linear-gradient(135deg, #166534 0%, #14532d 50%, #052e16 100%)',
    iconSymbol: '🎩',
    accentColor: '#22c55e',
    imageUrl: '/images/games/crazy-time.jpg'
  },
  {
    id: 'speed-blackjack-vip-1x',
    title: '1xExclusive Speed Blackjack',
    category: 'live',
    provider: 'Evolution & 1xBet',
    rtp: '99.3%',
    volatility: 'Low',
    maxWin: '100x',
    minBet: 5.00,
    maxBet: 15000,
    badge: 'HIGH ROLLER VIP',
    isHot: false,
    playsCount: '620K',
    description: 'Dedicated branded 1xBet green felt tables with lightning fast card distribution and 21+3 side bets.',
    posterBg: 'linear-gradient(135deg, #002f5e 0%, #001f3f 50%, #001122 100%)',
    iconSymbol: '♠️',
    accentColor: '#007acc',
    imageUrl: '/images/games/speed-blackjack.jpg'
  }
];

export interface RealBetItem {
  id: string;
  gameTitle: string;
  gameIcon: string;
  user: string;
  time: string;
  betAmount: number;
  multiplier: number;
  payout: number;
  isWin: boolean;
  currency: string;
}

export const INITIAL_REAL_BETS: RealBetItem[] = [
  { id: 'b-101', gameTitle: 'Aviator 1xPro', gameIcon: '✈️', user: 'Pilot_Alex', time: '1s ago', betAmount: 50.00, multiplier: 4.85, payout: 242.50, isWin: true, currency: 'USD' },
  { id: 'b-102', gameTitle: 'Gates of Olympus', gameIcon: '⚡', user: 'Zeus_Winner', time: '3s ago', betAmount: 20.00, multiplier: 125.00, payout: 2500.00, isWin: true, currency: 'USD' },
  { id: 'b-103', gameTitle: '1xMines Grid', gameIcon: '💎', user: 'Crypto_Satoshi', time: '6s ago', betAmount: 100.00, multiplier: 0.00, payout: 0.00, isWin: false, currency: 'USDT' },
  { id: 'b-104', gameTitle: 'Wanted Dead or a Wild', gameIcon: '🤠', user: 'Vortex_99', time: '8s ago', betAmount: 10.00, multiplier: 320.00, payout: 3200.00, isWin: true, currency: 'USD' },
  { id: 'b-105', gameTitle: '1xPlinko Ultra', gameIcon: '⚪', user: 'Lucky_Drop', time: '11s ago', betAmount: 25.00, multiplier: 29.00, payout: 725.00, isWin: true, currency: 'USD' },
  { id: 'b-106', gameTitle: 'Crazy Time Live', gameIcon: '🎡', user: 'HighRoller_K', time: '14s ago', betAmount: 500.00, multiplier: 10.00, payout: 5000.00, isWin: true, currency: 'EUR' },
  { id: 'b-107', gameTitle: 'Tombstone RIP', gameIcon: '⚰️', user: 'Nolimit_Fan', time: '17s ago', betAmount: 2.00, multiplier: 1200.00, payout: 2400.00, isWin: true, currency: 'USD' },
  { id: 'b-108', gameTitle: 'Sweet Bonanza 1000', gameIcon: '🍭', user: 'Sugar_Queen', time: '20s ago', betAmount: 40.00, multiplier: 18.50, payout: 740.00, isWin: true, currency: 'USD' },
];
