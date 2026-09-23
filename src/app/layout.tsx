import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Archivo } from "next/font/google";
import { SiteChrome } from "@/components/SiteChrome";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// Display face. A heavy grotesque with tight tracking — the register sports
// broadcast and game storefronts use. Replaces the editorial serif, which read
// as fashion magazine rather than competition.
const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
});

// Used for every figure on the site — balances, multipliers, jackpots — so
// live-updating numbers stay on a fixed grid instead of shifting each tick.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "1xBet India | Sports Betting & Online Games | 1xBet",
    template: "%s · 1xBet",
  },
  description:
    "Explore 1xBet India for sports betting and online games. Access your 1xBet account, app, registration, login and customer support options.",
  icons: {
    icon: "/1xbet.svg",
  },
  verification: {
    google: "mmvP9t_z162pvkaFlg_UogH7p0dV3adOYy3paBVfhf0",
  },
};

// Left over from the dark build. On a phone this tints the browser chrome
// near-black above a white page and makes the OS render form controls dark.
export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${archivo.variable} h-full antialiased`}
    >
      <head>
        {/*
          Scroll reveals render their hidden state into the server HTML, so
          without JS the landing copy would ship invisible. This is the whole
          page's content on an SEO-facing route, so it gets a hard fallback
          rather than a caveat.
        */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="min-h-full flex flex-col bg-canvas text-fg">
        {/* Header, footer, auth modal and toast are shared by every route. */}
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
