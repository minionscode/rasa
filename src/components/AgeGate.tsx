import { useEffect, useState } from "react";

const STORAGE_KEY = "rasa_age_verified";

export function AgeGate() {
  const [verified, setVerified] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (stored !== "1") setVerified(false);
  }, []);

  if (verified) return null;

  const enter = () => {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
    setVerified(true);
  };

  const exit = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink animate-fade-in">
      <div className="absolute inset-0 smoke-bg opacity-60" />
      <div className="absolute inset-0 grain" />
      <div className="relative z-10 max-w-xl px-8 text-center">
        <div className="animate-fade-up">
          <p className="font-serif text-4xl md:text-5xl tracking-[0.4em] text-gold">RASA</p>
          <p className="mt-4 text-[0.65rem] tracking-luxe uppercase text-muted-foreground">
            Smoke, Perfected.
          </p>
        </div>

        <div className="luxe-divider my-10 animate-fade-up delay-100" />

        <p className="font-serif text-2xl md:text-3xl text-foreground/95 text-balance animate-fade-up delay-200">
          This website contains content intended for adults.
        </p>
        <p className="mt-4 text-sm text-muted-foreground animate-fade-up delay-300">
          Please confirm that you are 18 years of age or older.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center animate-fade-up delay-400">
          <button
            onClick={enter}
            className="px-12 py-4 bg-gold text-primary-foreground text-[0.7rem] tracking-luxe uppercase font-medium hover:bg-gold-soft transition-colors duration-500"
          >
            Enter
          </button>
          <button
            onClick={exit}
            className="px-12 py-4 border border-border/80 text-[0.7rem] tracking-luxe uppercase text-muted-foreground hover:text-foreground hover:border-gold/50 transition-all duration-500"
          >
            Exit
          </button>
        </div>

        <p className="mt-12 text-[0.65rem] leading-relaxed text-muted-foreground/80 max-w-md mx-auto animate-fade-up delay-500">
          By entering this website, you confirm that you are of legal age to view
          tobacco-related content in your jurisdiction.
        </p>
      </div>
    </div>
  );
}
