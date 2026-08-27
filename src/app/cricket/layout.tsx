import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Cricket Betting | IPL, T20 & Live Cricket Odds | 1xBet',
  },
  description:
    'Explore cricket betting on 1xBet. Browse available cricket markets, IPL betting, T20 betting, international fixtures and live cricket odds.',
};

export default function CricketLayout({ children }: { children: React.ReactNode }) {
  return children;
}
