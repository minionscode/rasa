import { useState } from "react";
import { useRouter, useRouterState } from "@tanstack/react-router";
import rasaLogo from "@/assets/rasa-logo.png";
import { AgeRestrictionPolicyModal } from "@/components/AgeRestrictionPolicyModal";

const AGE_KEY = "rasa_age_verified";

const isVerified = () => {
  try { return window.sessionStorage.getItem(AGE_KEY) === "1"; } catch { return false; }
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
    try { window.sessionStorage.setItem(AGE_KEY, "1"); } catch {}
    setExiting(true);
    setTimeout(() => setVerified(true), 700);
  };

  const decline = () => router.navigate({ to: "/age-restricted" });

  return (
    <>
      <div
        className={`fixed inset-0 z-[120] flex items-center justify-center px-6 transition-opacity duration-700 ${exiting ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        style={{ background: "oklch(0.10 0.004 60 / 0.97)" }}
      >
        {/* Background effects — all pointer-events-none */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse at 20% 30%, oklch(0.74 0.08 45 / 0.10), transparent 50%), radial-gradient(ellipse at 80% 70%, oklch(0.38 0.13 18 / 0.12), transparent 55%)"
        }} />

        {/* Card */}
        <div className="relative z-10 max-w-xl w-full animate-fade-in">
          <div
            className="relative border border-gold/30 px-8 md:px-14 py-14 text-center"
            style={{
              background: "oklch(0.10 0.004 60 / 0.80)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 30px 80px -20px rgba(0,0,0,0.7), 0 0 60px -10px rgba(211,161,136,0.15)"
            }}
          >
            {/* Corner accents */}
            <span className="absolute top-0 left-0 w-8 h-px bg-gold pointer-events-none" />
            <span className="absolute top-0 left-0 w-px h-8 bg-gold pointer-events-none" />
            <span className="absolute top-0 right-0 w-8 h-px bg-gold pointer-events-none" />
            <span className="absolute top-0 right-0 w-px h-8 bg-gold pointer-events-none" />
            <span className="absolute bottom-0 left-0 w-8 h-px bg-gold pointer-events-none" />
            <span className="absolute bottom-0 left-0 w-px h-8 bg-gold pointer-events-none" />
            <span className="absolute bottom-0 right-0 w-8 h-px bg-gold pointer-events-none" />
            <span className="absolute bottom-0 right-0 w-px h-8 bg-gold pointer-events-none" />

            {/* Logo */}
            <div className="flex flex-col items-center mb-2">
              <img src={rasaLogo} alt="RASA" width={728} height={292} className="h-24 md:h-28 w-auto" />
              <p className="mt-5 font-display uppercase text-lg md:text-xl" style={{ color: "#DEA193" }}>SMOKE, PERFECTED</p>
            </div>

            <div className="luxe-divider my-10" />

            <p className="font-serif text-2xl md:text-[1.75rem] text-foreground/95 text-balance leading-snug">
              This website contains content intended for adults.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Please confirm you are 18 years of age or older.
            </p>

            <div className="luxe-divider my-8" />

            <div className="flex items-start justify-center gap-3">
              <input
                type="checkbox"
                id="age-check"
                checked={checked}
                onChange={() => { setChecked(prev => !prev); setShowError(false); }}
                className="mt-1 w-4 h-4 cursor-pointer shrink-0"
                style={{ accentColor: "#c9a96e", width: "16px", height: "16px" }}
              />
              <label htmlFor="age-check" className="text-xs text-muted-foreground/90 text-left leading-relaxed cursor-pointer">
                By checking this, you are agreeing to our{" "}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setPolicyOpen(true); }}
                  className="text-gold underline underline-offset-2 hover:text-gold-soft transition-colors"
                >
                  Age Restriction Policy
                </button>
              </label>
            </div>

            {showError && (
              <p className="mt-3 text-xs font-serif italic text-red-400 bg-red-950/60 border border-red-800/50 px-4 py-2.5">
                Please agree to the Age Restriction Policy to continue.
              </p>
            )}

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={enter}
                className="px-12 py-4 text-[0.7rem] tracking-luxe uppercase font-medium transition-all duration-500 bg-gold text-ink hover:bg-gold-soft"
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

            <p className="mt-8 text-[0.65rem] leading-relaxed text-muted-foreground/80 max-w-md mx-auto">
              By entering, you confirm that you are of legal age to view tobacco-related content in your jurisdiction.
            </p>
          </div>
        </div>
      </div>

      <AgeRestrictionPolicyModal open={policyOpen} onClose={() => setPolicyOpen(false)} />
    </>
  );
}
