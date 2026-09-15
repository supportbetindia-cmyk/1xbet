import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Basketball Betting | Live Basketball Odds & Markets | 1xBet',
  },
  description:
    'Explore basketball betting on 1xBet. Browse available basketball games, basketball betting markets, live basketball betting and current basketball betting odds.',
};

export default function BasketballLayout({ children }: { children: React.ReactNode }) {
  return children;
}
