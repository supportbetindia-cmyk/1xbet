export type Currency = 'USD' | 'EUR' | 'BTC' | 'ETH' | 'USDT';

export interface GameItem {
  id: string;
  title: string;
  category: 'crash' | 'slots' | 'live' | 'table' | 'exclusives' | 'jackpots';
  provider: string;
  rtp: string;
  volatility: 'Low' | 'Medium' | 'High' | 'Very High';
  jackpot?: string;
  image: string;
  badge?: string;
  isHot?: boolean;
  isNew?: boolean;
  playsCount: string;
  description: string;
  minBet: number;
  maxMultiplier: string;
}

export interface LiveWin {
  id: string;
  player: string;
  avatar: string;
  game: string;
  bet: string;
  multiplier: string;
  payout: string;
  time: string;
  currency: string;
}

export interface VIPTier {
  level: number;
  name: string;
  color: string;
  minXP: number;
  maxXP: number;
  cashback: string;
  rakeback: string;
  levelBonus: string;
  benefits: string[];
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  reward: string;
  xpReward: number;
  progress: number;
  target: number;
  isClaimed: boolean;
  iconName: string;
}

export interface CrashBet {
  id: string;
  player: string;
  avatar: string;
  amount: number;
  cashoutMultiplier?: number;
  isCashedOut: boolean;
  winAmount?: number;
}
