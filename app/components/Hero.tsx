"use client";

import Image from "next/image";
import { useCallback } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

export default function Hero() {
  const handleJoinClick = useCallback(() => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: "#waitlist", offsetY: 0 },
      ease: "power2.inOut",
    });
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 py-6 md:py-8 bg-white"
    >
      <Image
        src="/images/hero-tree.png"
        alt="Gen Theory"
        width={921}
        height={1152}
        priority
        className="h-[70vh] md:h-[86vh] w-auto max-w-[92vw] object-contain"
      />
      <button
        type="button"
        onClick={handleJoinClick}
        className="mt-8 md:mt-10 px-10 py-3.5 border border-brand-orange text-brand-orange font-sans text-xs uppercase tracking-[0.22em] transition-colors duration-500 ease-out hover:bg-brand-orange hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
      >
        Join now
      </button>
    </section>
  );
}
