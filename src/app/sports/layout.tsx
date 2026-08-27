import type { Metadata } from 'next';

/*
 * The page itself is a client component (tabs, accordion, GSAP), so metadata
 * lives here. `absolute` bypasses the root "%s · 1xBet" template, which would
 * otherwise append the brand a second time.
 */
export const metadata: Metadata = {
  title: {
    absolute: 'Online Sports Betting | Live Sports Betting & Odds | 1xBet',
  },
  description:
    'Explore online sports betting on 1xBet with live sports betting, football, cricket, tennis, basketball, esports and available betting markets.',
};

export default function SportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
