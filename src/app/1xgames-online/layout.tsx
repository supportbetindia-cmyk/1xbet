import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: "Table Games Online | Aviator, Mines & Plinko Games | 1xBet",
  },
  description:
    "Explore table games online at 1xBet, including Aviator, Mines and Plinko. Find easy game options and enjoy a fresh way to experience online entertainment now.",
};

export default function OneXGamesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
