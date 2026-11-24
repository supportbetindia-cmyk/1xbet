import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: "Responsible Gaming at 1xBet | Play Safely & Stay in Control!",
  },
  description:
    "Learn about responsible gaming at 1xBet. Set limits, manage play time, recognise warning signs and find guidance to keep your online gaming balanced and safer!",
};

export default function ResponsibleGamingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
