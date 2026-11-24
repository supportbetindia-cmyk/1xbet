import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: "1xBet Provably Fair | Check Game Results with SHA-256 Hash",
  },
  description:
    "Check 1xBet's provably fair system with SHA-256. Review server and client seeds, reproduce game outcomes, and understand how round results are checked yourself.",
};

export default function ProvablyFairLayout({ children }: { children: React.ReactNode }) {
  return children;
}
