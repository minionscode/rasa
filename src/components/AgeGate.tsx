import { useEffect, useState } from "react";
import { RasaLogo } from "./RasaLogo";

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 backdrop-blur-xl animate-fade-in">
      <div className="absolute inset-0 smoke-bg opacity-60" />
      <div className="relative z-10 max-w-lg px-8 text-center">
        <RasaLogo showTag className="mb-12 animate-fade-up" />
        <div className="luxe-divider mb-10 animate-fade-up delay-100" />
        <p className="font-serif text-3xl md:text-4xl text-foreground text-balance animate-fade-up delay-200">
          Please confirm you are 18 years of age or older.
        </p>
        <p className="mt-6 text-sm tracking-wide text-muted-foreground animate-fade-up delay-300">
          RASA products are intended for adult consumers only.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center animate-fade-up delay-400">
          <button
            onClick={enter}
            className="group relative px-10 py-4 bg-gold text-primary-foreground text-xs tracking-luxe uppercase font-medium hover:bg-gold-soft transition-colors duration-500"
          >
            Enter Website
          </button>
          <button
            onClick={exit}
            className="px-10 py-4 border border-border text-xs tracking-luxe uppercase text-muted-foreground hover:text-foreground hover:border-gold/50 transition-all duration-500"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
}
