import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: "1xBet Online Casino | Slots, Live Games & Table Games India!",
  },
  description:
    "Explore the 1xBet casino lobby with thousands of slots, Megaways, live dealer tables and table games. Browse popular titles, studios and demo play options here.",
};

export default function CasinoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
