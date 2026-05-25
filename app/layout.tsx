import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import ClientToaster from "./components/ClientToaster";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gentheory | The Future of TCM Inspired Wellness",
  description:
    "Discover Gentheory, a modern wellness brand inspired by Traditional Chinese Medicine and powered by science backed ingredients like Tremella mushroom to support radiant skin, longevity, and daily vitality.",
  icons: { icon: "/images/logo-mark.jpg" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable}`}
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
