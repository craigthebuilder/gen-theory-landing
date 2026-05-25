"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const handleJoinClick = useCallback(() => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: "#waitlist", offsetY: 0 },
      ease: "power2.inOut",
    });
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Fade hero out as user scrolls past it, crossfading into the next section
      gsap.fromTo(
        sectionRef.current,
        { opacity: 1 },
        {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "20% top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden bg-white"
    >
      {/* Mobile: portrait composition, image contained with button below */}
      <div className="flex md:hidden h-full w-full flex-col items-center justify-center px-4">
        <Image
          src="/images/hero-tree.png"
          alt="Gen Theory"
          width={921}
          height={1152}
          priority
          className="h-[70vh] w-auto max-w-[92vw] object-contain"
        />
        <button
          type="button"
          onClick={handleJoinClick}
          className="mt-8 px-10 py-3.5 border border-brand-orange text-brand-orange font-sans text-xs uppercase tracking-[0.22em] transition-colors duration-500 ease-out hover:bg-brand-orange hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
        >
          Join now
        </button>
      </div>

      {/* Desktop: full-bleed landscape composition with button overlaid */}
      <div className="hidden md:block relative h-full w-full">
        <Image
          src="/images/hero-tree-expanded.png"
          alt="Gen Theory"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <button
          type="button"
          onClick={handleJoinClick}
          className="absolute bottom-[6%] left-1/2 -translate-x-1/2 px-10 py-3.5 border border-brand-orange text-brand-orange font-sans text-xs uppercase tracking-[0.22em] bg-white/85 backdrop-blur-sm transition-colors duration-500 ease-out hover:bg-brand-orange hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
        >
          Join now
        </button>
      </div>
    </section>
  );
}
