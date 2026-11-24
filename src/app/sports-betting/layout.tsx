import type { Metadata } from 'next';

/*
 * The page itself is a client component (tabs, accordion, GSAP), so metadata
 * lives here. `absolute` bypasses the root "%s · 1xBet" template, which would
 * otherwise append the brand a second time.
 */
export const metadata: Metadata = {
  title: {
    absolute: "Online Sports Betting Platform | Sports Betting Games | 1xBet",
  },
  description:
    "Explore online sports betting with 1xBet. Discover exciting sports betting games, check the latest odds, and enjoy a user-friendly online sports betting platform.",
};

export default function SportsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
