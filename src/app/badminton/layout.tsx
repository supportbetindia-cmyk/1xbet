import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'Badminton Betting | Live Badminton Odds & Markets | 1xBet',
  },
  description:
    'Explore badminton betting on 1xBet. Browse available badminton matches, badminton betting markets, live badminton betting and current badminton odds.',
};

export default function BadmintonLayout({ children }: { children: React.ReactNode }) {
  return children;
}
