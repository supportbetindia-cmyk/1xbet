import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Soccer Betting | Live Soccer Odds & Markets | 1xBet',
  },
  description:
    'Explore soccer betting on 1xBet. Browse available soccer fixtures, soccer betting markets, live soccer betting and current soccer betting odds.',
};

export default function SoccerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
