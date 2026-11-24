import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: "Online Tennis Betting | Tennis Betting Odds & Games | 1xBet",
  },
  description:
    "Explore Tennis Betting Online at 1xBet. Compare tennis odds, follow tournament matches, and enjoy a simple way to stay connected with every tennis event today.",
};

export default function TennisLayout({ children }: { children: React.ReactNode }) {
  return children;
}
