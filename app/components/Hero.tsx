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
      duration: 0.2,
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
      {/* Background — full-bleed on both mobile and desktop. Mobile crops the
          sides because New-hero is landscape; per user direction that's OK. */}
      <Image
        src="/images/New-hero.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Soft dark scrim behind the logo — lifts it from busy parts of the
          background image without applying anything to the logo itself.
          Radial gradient fades out so no hard edges show. */}
      <div
        aria-hidden="true"
        className="absolute left-[49%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] md:w-[100vw] max-w-[1600px] aspect-[2/1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 65%)",
        }}
      />

      {/* Cream logo overlay. left-[49%] / top-1/2 is the current finalized
          position; tweak `w-[NNvw]` to resize. */}
      <Image
        src="/images/gen-logo-cream.png"
        alt="Gen Theory"
        width={4016}
        height={2481}
        priority
        className="absolute left-[49%] top-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] md:w-[70vw] max-w-[1100px] h-auto object-contain pointer-events-none drop-shadow-[0_3px_8px_rgba(0,0,0,0.85)] drop-shadow-[0_20px_72px_rgba(0,0,0,1)] drop-shadow-[0_36px_120px_rgba(0,0,0,0.55)]"
      />

      <button
        type="button"
        onClick={handleJoinClick}
        className="absolute bottom-[28%] md:bottom-[24%] left-1/2 -translate-x-1/2 px-6 md:px-14 py-2.5 md:py-4 border border-brand-orange text-brand-orange font-sans text-[11px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.25em] bg-white/85 backdrop-blur-sm transition-colors duration-500 ease-out hover:bg-brand-orange hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
      >
        Join now
      </button>
    </section>
  );
}
