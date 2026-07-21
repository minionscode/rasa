import { useState } from "react";
import { useRouter, useRouterState } from "@tanstack/react-router";
import rasaLogo from "@/assets/rasa-logo.png";
import { AgeRestrictionPolicyModal } from "@/components/AgeRestrictionPolicyModal";

const AGE_KEY = "rasa_age_verified";
const BYPASS = ["/age-restricted", "/login", "/test-email"];

const readVerified = () => {
  try {
    return window.sessionStorage.getItem(AGE_KEY) === "1";
  } catch {
    return false;
  }
};

export function AgeGate() {
  const [verified, setVerified] = useState<boolean>(readVerified);
  const [exiting, setExiting] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showError, setShowError] = useState(false);
  const [policyOpen, setPolicyOpen] = useState(false);

  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (verified || BYPASS.includes(pathname)) return null;

  const handleToggle = () => {
    setChecked((prev) => {
      const next = !prev;
      if (next) setShowError(false);
      return next;
    });
  };

  const handleEnter = () => {
    if (!checked) {
      setShowError(true);
      return;
    }
    try {
      window.sessionStorage.setItem(AGE_KEY, "1");
    } catch {}
    setExiting(true);
    window.setTimeout(() => setVerified(true), 600);
  };

  const handleDecline = () => {
    router.navigate({ to: "/age-restricted" });
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-[120] flex items-center justify-center px-6 transition-opacity duration-500 ${
          exiting ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{ background: "rgba(10, 8, 7, 0.97)" }}
      >
        <div className="relative w-full max-w-xl">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ backdropFilter: "blur(20px)" }}
          />

          <div
            className="relative border border-gold/30 px-8 md:px-14 py-14 text-center"
            style={{
              background: "rgba(14, 11, 9, 0.85)",
              boxShadow:
                "0 30px 80px -20px rgba(0,0,0,0.8), 0 0 60px -10px rgba(211,161,136,0.15)",
            }}
          >
            {/* Corner accents */}
            <span className="pointer-events-none absolute top-0 left-0 h-px w-8 bg-gold" />
            <span className="pointer-events-none absolute top-0 left-0 h-8 w-px bg-gold" />
            <span className="pointer-events-none absolute top-0 right-0 h-px w-8 bg-gold" />
            <span className="pointer-events-none absolute top-0 right-0 h-8 w-px bg-gold" />
            <span className="pointer-events-none absolute bottom-0 left-0 h-px w-8 bg-gold" />
            <span className="pointer-events-none absolute bottom-0 left-0 h-8 w-px bg-gold" />
            <span className="pointer-events-none absolute bottom-0 right-0 h-px w-8 bg-gold" />
            <span className="pointer-events-none absolute bottom-0 right-0 h-8 w-px bg-gold" />

            <div className="mb-2 flex flex-col items-center">
              <img
                src={rasaLogo}
                alt="RASA"
                width={728}
                height={292}
                className="h-24 w-auto md:h-28"
              />
              <p
                className="mt-5 font-display text-lg uppercase md:text-xl"
                style={{ color: "#DEA193" }}
              >
                SMOKE, PERFECTED
              </p>
            </div>

            <div className="luxe-divider my-10" />

            <p className="font-serif text-2xl leading-snug text-balance text-foreground/95 md:text-[1.75rem]">
              This website contains content intended for adults.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Please confirm you are 18 years of age or older.
            </p>

            <div className="luxe-divider my-8" />

            <button
              type="button"
              onClick={handleToggle}
              className="mx-auto flex w-full max-w-md items-start gap-3 text-left"
              style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "18px",
                  height: "18px",
                  minWidth: "18px",
                  marginTop: "2px",
                  border: `1px solid ${checked ? "#c9a96e" : "rgba(255,255,255,0.35)"}`,
                  background: checked ? "#c9a96e" : "transparent",
                  transition: "all 0.2s ease",
                }}
              >
                {checked && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6L5 9L10 3"
                      stroke="#0a0807"
                      strokeWidth="2"
                      strokeLinecap="square"
                    />
                  </svg>
                )}
              </span>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.6,
                }}
              >
                By checking this, you are agreeing to our{" "}
                <span
                  role="link"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPolicyOpen(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      e.stopPropagation();
                      setPolicyOpen(true);
                    }
                  }}
                  style={{
                    color: "#c9a96e",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  Age Restriction Policy
                </span>
                .
              </span>
            </button>

            {showError && (
              <p
                style={{
                  marginTop: "12px",
                  fontSize: "0.75rem",
                  color: "#f87171",
                  background: "rgba(127,29,29,0.4)",
                  border: "1px solid rgba(239,68,68,0.4)",
                  padding: "8px 16px",
                  fontStyle: "italic",
                }}
              >
                Please agree to the Age Restriction Policy to continue.
              </p>
            )}

            <div
              className="sm:flex-row"
              style={{
                marginTop: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                justifyContent: "center",
              }}
            >
              <button
                type="button"
                onClick={handleEnter}
                disabled={!checked}
                style={{
                  padding: "16px 48px",
                  background: checked ? "#c9a96e" : "rgba(201,169,110,0.35)",
                  color: checked ? "#0a0807" : "rgba(10,8,7,0.55)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  cursor: checked ? "pointer" : "not-allowed",
                  border: "none",
                  transition: "all 0.3s ease",
                }}
              >
                Enter
              </button>
              <button
                type="button"
                onClick={handleDecline}
                style={{
                  padding: "16px 40px",
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.32em",
                  textTransform: "uppercase",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                I'm Below 18
              </button>
            </div>

            <p
              style={{
                marginTop: "32px",
                fontSize: "0.65rem",
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1.6,
                maxWidth: "380px",
                margin: "32px auto 0",
              }}
            >
              By entering, you confirm that you are of legal age to view tobacco-related
              content in your jurisdiction.
            </p>
          </div>
        </div>
      </div>

      <AgeRestrictionPolicyModal open={policyOpen} onClose={() => setPolicyOpen(false)} />
    </>
  );
}
