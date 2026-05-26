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
const HEADING = "Begin your ritual";
const INVALID_EMAIL_MESSAGE = "Invalid email";
const SUCCESS_MESSAGE =
  "You're in. Something rooted in tradition — and made for now — is almost here.";
// ======================

const RATE_LIMIT_MS = 2000;

export default function Waitlist() {
  const sectionRef = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const lastSubmitRef = useRef<number>(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Section fade-in runs on both mobile and desktop.
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

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

    // OPTIMISTIC UI: show the success toast and clear the field immediately
    // so the user gets instant feedback. The Apps Script round-trip can
    // take 1-3 seconds; we don't make the user wait. The fetch fires in
    // the background; failures are logged to console.
    toast.success(SUCCESS_MESSAGE);
    setEmail("");

    const webhookUrl = process.env.NEXT_PUBLIC_SHEETS_WEBHOOK_URL;
    if (!webhookUrl) {
      if (typeof window !== "undefined") {
        console.warn(
          "NEXT_PUBLIC_SHEETS_WEBHOOK_URL is not set; submission skipped."
        );
      }
      return;
    }

    // text/plain avoids the CORS preflight Apps Script doesn't handle
    // cleanly. mode: 'no-cors' means we can't read the response — the row
    // still appends; verify via the linked Google Sheet.
    fetch(webhookUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ email: value }),
    }).catch((err) => {
      if (typeof window !== "undefined") {
        console.error("Waitlist submit failed:", err);
      }
    });
  };

  return (
    <section
      ref={sectionRef}
      id="waitlist"
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-white px-6 py-12"
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
            className="flex-1 min-w-0 bg-transparent font-sans text-sm md:text-base text-black placeholder:text-black/40 focus:outline-none py-2 md:py-3"
          />
          <button
            type="submit"
            aria-label="Submit email"
            className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 text-brand-orange hover:text-brand-red focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 transition-colors duration-300"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="w-[18px] h-[18px] md:w-[22px] md:h-[22px]"
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
