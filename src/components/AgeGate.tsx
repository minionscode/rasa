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
    const ageCheck = document.getElementById("age-check");
    const consentChecked = checked || (ageCheck instanceof HTMLInputElement && ageCheck.checked);
    if (!consentChecked) { setShowError(true); return; }
    try { window.sessionStorage.setItem(AGE_KEY, "1"); } catch {}
    setExiting(true);
    setTimeout(() => setVerified(true), 700);
  };

  const decline = () => router.navigate({ to: "/age-restricted" });

  return (
    <>
      <div
        className={`fixed inset-0 z-[120] flex items-center justify-center px-6 transition-opacity duration-700 ${exiting ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        style={{ background: "rgba(10, 8, 7, 0.97)" }}
      >
        {/* Card */}
        <div className="relative z-10 max-w-xl w-full">

          {/* Blur layer — separate from content so it doesn't eat pointer events */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ backdropFilter: "blur(20px)" }}
          />

          {/* Actual card border + background */}
          <div
            className="relative border border-gold/30 px-8 md:px-14 py-14 text-center"
            style={{
              background: "rgba(14, 11, 9, 0.85)",
              boxShadow: "0 30px 80px -20px rgba(0,0,0,0.8), 0 0 60px -10px rgba(211,161,136,0.15)"
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
                onChange={() => {
                  setChecked((prev) => {
                    const next = !prev;
                    if (next) setShowError(false);
                    return next;
                  });
                }}
                style={{ accentColor: "#c9a96e", width: "16px", height: "16px", minWidth: "16px", cursor: "pointer", marginTop: "2px" }}
              />
              <label htmlFor="age-check" style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", textAlign: "left", lineHeight: "1.6", cursor: "pointer" }}>
                By checking this, you are agreeing to our{" "}
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setPolicyOpen(true); }}
                  style={{ color: "#c9a96e", textDecoration: "underline", background: "none", border: "none", cursor: "pointer", padding: 0, font: "inherit" }}
                >
                  Age Restriction Policy
                </button>
              </label>
            </div>

            {showError && (
              <p style={{ marginTop: "12px", fontSize: "0.75rem", color: "#f87171", background: "rgba(127,29,29,0.4)", border: "1px solid rgba(239,68,68,0.4)", padding: "8px 16px", fontStyle: "italic" }}>
                Please agree to the Age Restriction Policy to continue.
              </p>
            )}

            <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "12px", justifyContent: "center" }} className="sm:flex-row">
              <button
                onClick={enter}
                aria-disabled={!checked}
                style={{ padding: "16px 48px", background: checked ? "#c9a96e" : "rgba(201,169,110,0.35)", color: checked ? "#0a0807" : "rgba(10,8,7,0.55)", fontSize: "0.7rem", letterSpacing: "0.32em", textTransform: "uppercase", fontWeight: 500, cursor: checked ? "pointer" : "not-allowed", border: "none", transition: "all 0.3s ease" }}
              >
                Enter
              </button>
              <button
                onClick={decline}
                style={{ padding: "16px 40px", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", fontSize: "0.7rem", letterSpacing: "0.32em", textTransform: "uppercase", background: "none", cursor: "pointer" }}
              >
                I'm Below 18
              </button>
            </div>

            <p style={{ marginTop: "32px", fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", lineHeight: "1.6", maxWidth: "380px", margin: "32px auto 0" }}>
              By entering, you confirm that you are of legal age to view tobacco-related content in your jurisdiction.
            </p>
          </div>
        </div>
      </div>

      <AgeRestrictionPolicyModal open={policyOpen} onClose={() => setPolicyOpen(false)} />
    </>
  );
}
