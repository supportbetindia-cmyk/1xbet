import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Online Casino | Live Casino, Roulette & Blackjack | 1xBet',
  },
  description:
    'Explore the online casino on 1xBet. Browse available casino games, live casino tables, online roulette, blackjack and baccarat formats.',
};

export default function OnlineCasinoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
