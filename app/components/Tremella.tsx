"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TITLE = "Tremella, the beauty mushroom";
const BODY =
  "Known colloquially as the original “fountain of youth”, Tremella, or Snow Mushroom, has been used in Traditional Chinese Medicine to support luminous skin, deep hydration, and graceful aging. Naturally rich in skin loving polysaccharides that help support collagen production and moisture retention, Tremella supports natural bodily processes that promote a smoother, plumper, more radiant glow.";

export default function Tremella() {
  const sectionRef = useRef<HTMLElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      // Single timeline manages section opacity end-to-end (fade-in → hold →
      // fade-out) so two ScrollTriggers can't fight over the same property.
      const sectionTL = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          end: "bottom top",
          scrub: true,
        },
      });

      sectionTL
        .fromTo(
          sectionRef.current,
          { opacity: 0, scale: 0.94 },
          { opacity: 1, scale: 1, ease: "power2.out", duration: 0.15 },
          0
        )
        // Implicit hold at opacity 1 from 0.15 → 0.55
        .to(
          sectionRef.current,
          { opacity: 0, ease: "none", duration: 0.45 },
          0.55
        );

      // Root with Tremella slides in from the right edge
      gsap.fromTo(
        rootRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "top 35%",
            scrub: true,
          },
        }
      );

      // Text rises in slightly behind the root
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            end: "top 15%",
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
      className="relative min-h-screen w-full overflow-hidden bg-white"
    >
      {/* Mobile: stacked */}
      <div className="flex md:hidden min-h-screen w-full flex-col items-center justify-center px-6 py-20 gap-8">
        <Image
          src="/images/root-right-tremella.png"
          alt=""
          width={906}
          height={957}
          className="h-[38vh] w-auto max-w-[85vw] object-contain"
        />
        <div className="text-center max-w-md">
          <h2 className="font-serif text-3xl text-brand-orange leading-[1.1] mb-5">
            {TITLE}
          </h2>
          <p className="font-sans text-sm text-black/80 leading-relaxed">
            {BODY}
          </p>
        </div>
      </div>

      {/* Desktop: root anchored to the right edge, text on the left */}
      <div className="hidden md:block relative h-screen w-full">
        <div
          ref={rootRef}
          className="absolute right-0 top-0 h-full w-1/2"
          style={{ opacity: 0 }}
        >
          <Image
            src="/images/root-right-tremella.png"
            alt=""
            fill
            sizes="50vw"
            className="object-contain object-right"
          />
        </div>
        <div
          ref={textRef}
          className="absolute left-0 top-0 h-full w-1/2 flex items-center px-12 lg:px-20"
          style={{ opacity: 0 }}
        >
          <div className="max-w-[480px]">
            <h2 className="font-serif text-4xl lg:text-5xl text-brand-orange leading-[1.1] mb-6">
              {TITLE}
            </h2>
            <p className="font-sans text-base lg:text-[17px] text-black/80 leading-[1.7]">
              {BODY}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
