import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: { absolute: 'About 1xBet | Sports Betting, Live & Casino | 1xBet' },
  description:
    'About 1xBet — an online sports and gaming platform bringing supported sports betting, live betting and online casino experiences together in one place.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
