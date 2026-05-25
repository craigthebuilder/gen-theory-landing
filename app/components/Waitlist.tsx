"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// === Editable copy ===
const HEADING = "Join our community";
const INVALID_EMAIL_MESSAGE = "Invalid email";
const SUCCESS_MESSAGE =
  "Success! You have been prioritized to unlock the future of TCM inspired wellness.";
// ======================

const RATE_LIMIT_MS = 2000;

export default function Waitlist() {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const lastSubmitRef = useRef<number>(0);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, scale: 0.94 },
        {
          opacity: 1,
          scale: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%",
            end: "top 30%",
            scrub: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    // Client-side rate limit: one submit per 2s per session
    const now = Date.now();
    if (now - lastSubmitRef.current < RATE_LIMIT_MS) return;

    const value = email.trim();

    // Validation per brief: must contain '@' and '.'
    if (!value.includes("@") || !value.includes(".")) {
      toast.error(INVALID_EMAIL_MESSAGE);
      return;
    }

    lastSubmitRef.current = now;
    setSubmitting(true);

    // TODO: POST to NEXT_PUBLIC_SHEETS_WEBHOOK_URL once Apps Script is deployed.
    // For now, simulate success so we can verify the UX flow.
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      toast.success(SUCCESS_MESSAGE);
      setEmail("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="waitlist"
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-white px-6 py-20"
    >
      {/* Container is w-fit so it sizes to the widest child (the heading);
          the form below uses w-full to match the heading's rendered width. */}
      <div className="flex flex-col items-center w-fit">
        <Image
          src="/images/logo-mark.jpg"
          alt="Gen Theory"
          width={999}
          height={914}
          priority={false}
          className="h-20 md:h-24 w-auto object-contain mb-2 md:mb-3"
        />
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-orange mb-10 md:mb-14 text-center leading-[1.1] whitespace-nowrap">
          {HEADING}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="w-full flex items-center gap-2 border-b border-brand-orange/40 focus-within:border-brand-orange transition-colors duration-300"
          noValidate
        >
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email address"
            autoComplete="email"
            inputMode="email"
            aria-label="Email address"
            className="flex-1 min-w-0 bg-transparent font-sans text-base text-black placeholder:text-black/40 focus:outline-none py-3"
          />
          <button
            type="submit"
            aria-label="Submit email"
            disabled={submitting}
            className="flex items-center justify-center w-10 h-10 text-brand-orange hover:text-brand-red focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 transition-colors duration-300 disabled:opacity-50"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
}
