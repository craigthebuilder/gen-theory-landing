"use client";

import { Toaster } from "react-hot-toast";

export default function ClientToaster() {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#FFFFFF",
          color: "#000000",
          border: "1px solid rgba(159, 107, 47, 0.25)",
          padding: "14px 22px",
          borderRadius: "4px",
          fontFamily: "var(--font-inter), system-ui, sans-serif",
          fontSize: "14px",
          fontWeight: 400,
          maxWidth: "440px",
          textAlign: "center" as const,
          letterSpacing: "0.01em",
        },
        success: {
          iconTheme: {
            primary: "#9F6B2F",
            secondary: "#FFFFFF",
          },
        },
        error: {
          iconTheme: {
            primary: "#780414",
            secondary: "#FFFFFF",
          },
        },
      }}
    />
  );
}
