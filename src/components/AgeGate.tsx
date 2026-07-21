import { useState } from "react";
import { useRouter, useRouterState } from "@tanstack/react-router";
import rasaLogo from "@/assets/rasa-logo.png";
import { AgeRestrictionPolicyModal } from "@/components/AgeRestrictionPolicyModal";

const AGE_KEY = "rasa_age_verified";

const isVerified = () => {
  try { return window.sessionStorage.getItem(AGE_KEY) === "1"; } catch { return false; }
};

const setVerifiedInStorage = () => {
  try { window.sessionStorage.setItem(AGE_KEY, "1"); } catch {}
};

export function AgeGate() {
  const [verified, setVerified] = useState<boolean>(isVerified);
  const [exiting, setExiting] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showError, setShowError] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);
  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const BYPASS = ["/age-restricted", "/login", "/test-email"];
  if (verified || BYPASS.includes(pathname)) return null;

  const enter = () => {
    if (!checked) { setShowError(true); return; }
    setVerifiedInStorage();
    setExiting(true);
    setTimeout(() => setVerified(true), 700);
  };

  const decline = () => router.navigate({ to: "/age-restricted" });

  return (
    <>
      <div className={`fixed inset-0 z-[120] flex items-center justify-center bg-ink/95 px-6 transition-opacity duration-700 ${exiting ? "opacity-0 pointer-events-none" : "animate-fade-in"}`}>
        <div className="absolute inset-0 smoke-bg opacity-70 pointer-events-none" />
        <div
          className="absolute -inset-[20%] opacity-50 animate-smoke pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.05), transparent 55%), radial-gradient(ellipse at 70% 60%, rgba(255,255,255,0.04), transparent 60%)" }}
        />
        <div className="absolute inset-0 grain pointer-events-none" />
        <div className="relative z-10 max-w-xl w-full">
          <div
            className="relative border border-gold/30 bg-ink/60 backdrop-blur-2xl px-8 md:px-14 py-14 text-center"
            style={{ boxShadow: "0 30px 80px -20px rgba(0,0,0,0.7), 0 0 60px -10px rgba(211,161,136,0.15)" }}
          >
            <span className="absolute top-0 left-0 w-8 h-px bg-gold" /><span className="absolute top-0 left-0 w-px h-8 bg-gold" />
            <span className="absolute top-0 right-0 w-8 h-px bg-gold" /><span className="absolute top-0 right-0 w-px h-8 bg-gold" />
            <span className="absolute bottom-0 left-0 w-8 h-px bg-gold" /><span className="absolute bottom-0 left-0 w-px h-8 bg-gold" />
            <span className="absolute bottom-0 right-0 w-8 h-px bg-gold" /><span className="absolute bottom-0 right-0 w-px h-8 bg-gold" />

            <div className="animate-fade-up flex flex-col items-center">
              <img src={rasaLogo} alt="RASA" width={728} height={292} loading="lazy" className="h-24 md:h-28 w-auto" />
              <p className="mt-5 font-display uppercase tracking-wider text-lg md:text-xl text-gold-soft">SMOKE, PERFECTED</p>
            </div>
            <div className="luxe-divider my-10 animate-fade-up delay-100" />
            <p className="font-serif text-2xl md:text-[1.75rem] text-foreground/95 text-balance leading-snug animate-fade-up delay-200">
              This website contains content intended for adults.
            </p>
            <p className="mt-3 text-sm text-muted-foreground animate-fade-up delay-300">
              Please confirm you are 18 years of age or older.
            </p>
            <div className="luxe-divider my-8 animate-fade-up delay-350" />
            <div className="flex items-start justify-center gap-3">
              <button
                type="button"
                role="checkbox"
                aria-checked={checked}
                onClick={() => { setChecked(!checked); if (showError) setShowError(false); }}
                style={{ pointerEvents: "auto", position: "relative", zIndex: 50 }}
                className={`shrink-0 mt-0.5 w-5 h-5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${checked ? "border-gold bg-gold" : showError ? "border-red-400" : "border-gold/70 hover:border-gold"}`}
              >
                {checked && (
                  <svg className="w-2.5 h-2.5 text-primary-foreground" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
              <p className="text-xs text-muted-foreground/90 text-left leading-relaxed">
                By checking this, you are agreeing to our{" "}
                <button type="button" onClick={() => setPolicyOpen(true)} className="text-gold underline underline-offset-2 hover:text-gold-soft transition-colors">
                  Age Restriction Policy
                </button>
              </p>
            </div>
            {showError && (
              <p className="mt-3 text-xs font-serif italic text-red-400 bg-red-950/60 border border-red-800/50 px-4 py-2.5 animate-fade-up">
                Please agree to the Age Restriction Policy to continue.
              </p>
            )}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center animate-fade-up delay-400">
              <button
                onClick={enter}
                className={`px-12 py-4 text-[0.7rem] tracking-luxe uppercase font-medium transition-all duration-500 ${checked ? "bg-gold text-primary-foreground hover:bg-gold-soft" : "bg-gold/40 text-primary-foreground/60 cursor-not-allowed"}`}
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
            <p className="mt-8 text-[0.65rem] leading-relaxed text-muted-foreground/80 max-w-md mx-auto animate-fade-up delay-500">
              By entering, you confirm that you are of legal age to view tobacco-related content in your jurisdiction.
            </p>
          </div>
        </div>
      </div>
      <AgeRestrictionPolicyModal open={policyOpen} onClose={() => setPolicyOpen(false)} />
    </>
  );
}
