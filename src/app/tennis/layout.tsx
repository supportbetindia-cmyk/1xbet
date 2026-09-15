import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Tennis Betting | Live Tennis Odds & Markets | 1xBet',
  },
  description:
    'Explore tennis betting on 1xBet. Browse available tennis matches, tennis betting markets, live tennis betting and current tennis betting odds.',
};

export default function TennisLayout({ children }: { children: React.ReactNode }) {
  return children;
}
