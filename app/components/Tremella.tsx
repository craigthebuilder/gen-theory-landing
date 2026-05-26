"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TITLE = "Tremella, the beauty mushroom";

// BODY is an array of paragraphs. Each item becomes its own <p> with a
// gap between it and the next. To add a paragraph break, add a new
// string to the array. To remove one, delete the line.
const BODY = [
  "Meet 銀耳 — silver ear mushroom.",
  "For over 2,000 years, Tremella has been treasured in Chinese medicine and court beauty rituals for one purpose: deep, lasting hydration from within. Delicate in appearance yet remarkably powerful, it became known as the “beauty mushroom” for the luminous, dewy skin it was believed to support.",
  "Modern research now confirms what practitioners long understood. Tremella's polysaccharides can retain up to 500 times their weight in water — often surpassing hyaluronic acid in moisture retention molecule for molecule — while offering antioxidant and skin-supportive benefits.",
  "We're slowly cooking up something to brighten your daily rituals.",
];

export default function Tremella() {
  const sectionRef = useRef<HTMLElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // Section opacity fade-in → hold → fade-out runs on BOTH mobile and
      // desktop so both views get the section-to-section crossfade feel.
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
        .to(
          sectionRef.current,
          { opacity: 0, ease: "none", duration: 0.45 },
          0.55
        );

      // Root slide and text rise only on desktop — those refs are attached
      // to absolute-positioned elements that are hidden on mobile.
      if (isMobile) return;

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
      {/* Mobile: stacked. Image full-bleed (w-full, no horizontal padding on
          this container); text gets its own px-6. */}
      <div className="flex md:hidden min-h-screen w-full flex-col items-center justify-center py-12 gap-6">
        <Image
          src="/images/tremella-new.jpg"
          alt=""
          width={1448}
          height={1086}
          className="w-full h-auto object-contain"
        />
        <div className="text-center max-w-md px-6">
          <h2 className="font-serif text-3xl text-brand-orange leading-[1.1] mb-5">
            {TITLE}
          </h2>
          <div className="space-y-4">
            {BODY.map((paragraph, i) => (
              <p
                key={i}
                className="font-sans text-sm text-black/80 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
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
            src="/images/tremella-new.jpg"
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
            <div className="space-y-5">
              {BODY.map((paragraph, i) => (
                <p
                  key={i}
                  className="font-sans text-base lg:text-[17px] text-black/80 leading-[1.7]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
