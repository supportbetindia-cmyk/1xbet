import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: "Cricket Betting India | Live Cricket Betting Online | 1xBet",
  },
  description:
    "Discover Cricket Betting India with 1xBet. Follow live cricket betting online, explore match options, and enjoy cricket action on an easy-to-use platform too.",
};

export default function CricketLayout({ children }: { children: React.ReactNode }) {
  return children;
}
