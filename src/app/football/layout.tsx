import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Football Betting | Live Football Odds & Markets | 1xBet',
  },
  description:
    'Explore football betting on 1xBet. Browse available football markets, live football betting, soccer betting and current football betting odds.',
};

export default function FootballLayout({ children }: { children: React.ReactNode }) {
  return children;
}
