import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: "1xBet Promotions | Explore Sports Offers and Casino Rewards!",
  },
  description:
    "Visit 1xBet promotions to discover current sports deals, casino rewards and special offers. Check each promotion's rules and dates to see which benefits apply!.",
};

export default function PromotionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
