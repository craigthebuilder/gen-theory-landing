import type { Metadata } from "next";
import localFont from "next/font/local";
import ClientToaster from "./components/ClientToaster";
import "./globals.css";

// Swei Spring Sugar CJK SC — self-hosted from /public/fonts/.
// Source TTFs were ~25 MB each; subset with pyftsubset to Basic Latin +
// Latin Extended + General Punctuation + CJK Symbols + the specific
// ideographs 根源銀耳 used in the body copy. Final files are ~25 KB each.
// If you add new Chinese characters to the copy, re-run the subset
// (see scripts/subset-fonts.sh — TODO if we add more).
const swei = localFont({
  src: [
    {
      path: "../public/fonts/SweiSpringSugarCJKsc-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/SweiSpringSugarCJKsc-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-swei",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gentheory | The Future of TCM Inspired Wellness",
  description:
    "Discover Gentheory, a modern wellness brand inspired by Traditional Chinese Medicine and powered by science backed ingredients like Tremella mushroom to support radiant skin, longevity, and daily vitality.",
  icons: { icon: "/images/gen-logo-no-background.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${swei.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-white text-black antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem('gt-loading-seen')==='1')document.documentElement.classList.add('gt-skip-loading')}catch(e){}`,
          }}
        />
        {children}
        <ClientToaster />
      </body>
    </html>
  );
}
