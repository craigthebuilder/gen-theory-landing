"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Phase = "visible" | "fading" | "gone";

const SESSION_KEY = "gt-loading-seen";
const HOLD_MS = 1200;
const FADE_MS = 600;

export default function LoadingScreen() {
  const [phase, setPhase] = useState<Phase>("visible");

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      setPhase("gone");
      return;
    }
    sessionStorage.setItem(SESSION_KEY, "1");
    const t1 = setTimeout(() => setPhase("fading"), HOLD_MS);
    const t2 = setTimeout(() => setPhase("gone"), HOLD_MS + FADE_MS);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      data-gt-loading=""
      aria-hidden="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-white pointer-events-none"
      style={{
        opacity: phase === "fading" ? 0 : 1,
        transition: `opacity ${FADE_MS}ms ease-in-out`,
      }}
    >
      <Image
        src="/images/logo-mark.jpg"
        alt=""
        width={400}
        height={400}
        priority
        className="w-32 h-32 md:w-40 md:h-40 object-contain"
      />
    </div>
  );
}
