import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Horse Racing Betting | Live Racing Odds & Markets | 1xBet',
  },
  description:
    'Explore horse racing betting on 1xBet. Browse available races, horse racing betting markets, live horse racing betting and current horse racing odds.',
};

export default function HorseRacingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
