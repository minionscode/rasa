import { useState, type FormEvent } from "react";
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
  const [policyOpen, setPolicyOpen] = useState(false);

  const router = useRouter();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  if (verified || BYPASS.includes(pathname)) return null;

  const handleEnter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const checkbox = form.elements.namedItem("age-confirmation");
    const isChecked = checkbox instanceof HTMLInputElement && checkbox.checked;

    if (!isChecked) return;

    try {
      window.sessionStorage.setItem(AGE_KEY, "1");
    } catch {}

    setExiting(true);
    window.setTimeout(() => setVerified(true), 450);
  };

  const handleDecline = () => {
    router.navigate({ to: "/age-restricted" });
  };

  return (
    <>
      <style>
        {`
          .age-gate-form .age-gate-enter {
            background: rgba(201,169,110,0.35);
            color: rgba(10,8,7,0.55);
            cursor: not-allowed;
          }

          .age-gate-form:has(#age-confirmation:checked) .age-gate-enter {
            background: #c9a96e;
            color: #0a0807;
            cursor: pointer;
          }
        `}
      </style>
      <div
        className={`fixed inset-0 z-[120] flex items-center justify-center px-6 transition-opacity duration-500 ${
          exiting ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        style={{ background: "rgba(10, 8, 7, 0.97)" }}
      >
        <div
          className="relative w-full max-w-xl border border-gold/30 px-8 py-14 text-center md:px-14"
          style={{
            background: "rgba(14, 11, 9, 0.96)",
            boxShadow:
              "0 30px 80px -20px rgba(0,0,0,0.8), 0 0 60px -10px rgba(211,161,136,0.15)",
          }}
        >
          <span className="pointer-events-none absolute left-0 top-0 h-px w-8 bg-gold" />
          <span className="pointer-events-none absolute left-0 top-0 h-8 w-px bg-gold" />
          <span className="pointer-events-none absolute right-0 top-0 h-px w-8 bg-gold" />
          <span className="pointer-events-none absolute right-0 top-0 h-8 w-px bg-gold" />
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
            <p className="mt-5 font-display text-lg uppercase md:text-xl" style={{ color: "#DEA193" }}>
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

          <form className="age-gate-form" onSubmit={handleEnter}>
            <div className="mx-auto flex w-full max-w-md items-start gap-3 text-left">
              <input
                id="age-confirmation"
                name="age-confirmation"
                type="checkbox"
                required
                className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-gold"
              />
              <p className="text-xs leading-relaxed text-muted-foreground">
                <label htmlFor="age-confirmation" className="cursor-pointer">
                  By checking this, you are agreeing to our{" "}
                </label>
                <button
                  type="button"
                  onClick={() => setPolicyOpen(true)}
                  className="cursor-pointer underline"
                  style={{ color: "#c9a96e" }}
                >
                  Age Restriction Policy
                </button>
                .
              </p>
            </div>

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
              type="submit"
              className="age-gate-enter"
              style={{
                padding: "16px 48px",
                fontSize: "0.7rem",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                fontWeight: 500,
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
          </form>

          <p
            style={{
              fontSize: "0.65rem",
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.6,
              maxWidth: "380px",
              margin: "32px auto 0",
            }}
          >
            By entering, you confirm that you are of legal age to view tobacco-related content in
            your jurisdiction.
          </p>
        </div>
      </div>

      <AgeRestrictionPolicyModal open={policyOpen} onClose={() => setPolicyOpen(false)} />
    </>
  );
}
