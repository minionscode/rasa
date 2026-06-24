import { useEffect, useState } from "react";
import { useRouter, useRouterState } from "@tanstack/react-router";
import rasaLogo from "@/assets/rasa-logo.png.asset.json";

const STORAGE_KEY = "rasa_age_verified";

const readVerified = () => {
  if (typeof window === "undefined") return false;
  try {
    return (
      window.localStorage.getItem(STORAGE_KEY) === "1" ||
      window.sessionStorage.getItem(STORAGE_KEY) === "1"
    );
  } catch {
    return false;
  }
};

export function AgeGate() {
  // Client-only: avoid SSR/client hydration mismatch by waiting one tick.
  const [mounted, setMounted] = useState(false);
  const [verified, setVerified] = useState<boolean>(false);
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setMounted(true);
    setVerified(readVerified());
  }, [pathname]);

  if (!mounted) return null;
  if (verified || pathname === "/age-restricted") return null;

  const enter = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setVerified(true);
  };

  const decline = () => {
    router.navigate({ to: "/age-restricted" });
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-ink/95 animate-fade-in px-6">
      <div className="absolute inset-0 smoke-bg opacity-70" />
      <div
        className="absolute -inset-[20%] opacity-50 animate-smoke"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.05), transparent 55%), radial-gradient(ellipse at 70% 60%, rgba(255,255,255,0.04), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 grain" />

      {/* Glassmorphism card */}
      <div className="relative z-10 max-w-xl w-full">
        <div
          className="relative border border-gold/30 bg-ink/60 backdrop-blur-2xl px-8 md:px-14 py-14 text-center"
          style={{ boxShadow: "0 30px 80px -20px rgba(0,0,0,0.7), 0 0 60px -10px rgba(211,161,136,0.15)" }}
        >
          {/* Copper corner accents */}
          <span className="absolute top-0 left-0 w-8 h-px bg-gold" />
          <span className="absolute top-0 left-0 w-px h-8 bg-gold" />
          <span className="absolute top-0 right-0 w-8 h-px bg-gold" />
          <span className="absolute top-0 right-0 w-px h-8 bg-gold" />
          <span className="absolute bottom-0 left-0 w-8 h-px bg-gold" />
          <span className="absolute bottom-0 left-0 w-px h-8 bg-gold" />
          <span className="absolute bottom-0 right-0 w-8 h-px bg-gold" />
          <span className="absolute bottom-0 right-0 w-px h-8 bg-gold" />

          <div className="animate-fade-up flex flex-col items-center">
            <img src={rasaLogo.url} alt="RASA" className="h-24 md:h-28 w-auto" />
            <p className="mt-5 font-serif italic text-lg md:text-xl text-gold-soft">
              Smoke, Perfected.
            </p>
          </div>

          <div className="luxe-divider my-10 animate-fade-up delay-100" />

          <p className="font-serif text-2xl md:text-[1.75rem] text-foreground/95 text-balance leading-snug animate-fade-up delay-200">
            This website contains content intended for adults.
          </p>
          <p className="mt-4 text-sm text-muted-foreground animate-fade-up delay-300">
            Please confirm you are 18 years of age or older.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center animate-fade-up delay-400">
            <button
              onClick={enter}
              className="px-12 py-4 bg-gold text-primary-foreground text-[0.7rem] tracking-luxe uppercase font-medium hover:bg-gold-soft transition-colors duration-500"
            >
              Enter
            </button>
            <button
              onClick={decline}
              className="px-10 py-4 border border-border/80 text-[0.7rem] tracking-luxe uppercase text-muted-foreground hover:text-gold hover:border-gold/50 transition-all duration-500"
            >
              I'm Below 18
            </button>
          </div>


          <p className="mt-10 text-[0.65rem] leading-relaxed text-muted-foreground/80 max-w-md mx-auto animate-fade-up delay-500">
            By entering, you confirm that you are of legal age to view tobacco-related content in
            your jurisdiction.
          </p>
        </div>
      </div>
    </div>
  );
}
