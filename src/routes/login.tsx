import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import rasaLogo from "@/assets/rasa-logo.png";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — RASA" },
      { property: "og:title", content: "Sign In — RASA" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { user, signInWithGoogle, loading } = useAuth();
  const navigate = useNavigate();
  const signingInRef = useRef(false);

  useEffect(() => {
    if (!loading && user) {
      navigate({ to: "/" });
    }
  }, [user, loading, navigate]);

  const handleGoogle = async () => {
    if (signingInRef.current) return;
    signingInRef.current = true;
    try {
      await signInWithGoogle();
    } catch {
      signingInRef.current = false;
    }
  };

  return (
    <div className="relative min-h-screen bg-ink flex items-center justify-center px-4 overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 smoke-bg opacity-80" />
      <div
        className="absolute inset-0 opacity-40 animate-smoke pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 25% 35%, rgba(211,161,136,0.10), transparent 55%), radial-gradient(ellipse at 75% 65%, rgba(211,161,136,0.07), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 grain pointer-events-none" />

      {/* Decorative corner lines */}
      <div className="absolute top-8 left-8 w-16 h-px bg-gold/30" />
      <div className="absolute top-8 left-8 w-px h-16 bg-gold/30" />
      <div className="absolute top-8 right-8 w-16 h-px bg-gold/30" />
      <div className="absolute top-8 right-8 w-px h-16 bg-gold/30" />
      <div className="absolute bottom-8 left-8 w-16 h-px bg-gold/30" />
      <div className="absolute bottom-8 left-8 w-px h-16 bg-gold/30" />
      <div className="absolute bottom-8 right-8 w-16 h-px bg-gold/30" />
      <div className="absolute bottom-8 right-8 w-px h-16 bg-gold/30" />

      {/* Card */}
      <div
        className="relative z-10 w-full max-w-md animate-fade-up"
        style={{
          background: "linear-gradient(180deg, oklch(0.22 0.006 60 / 0.85), oklch(0.14 0.005 60 / 0.95))",
          border: "1px solid oklch(0.78 0.09 48 / 0.35)",
          backdropFilter: "blur(24px)",
          boxShadow: "0 40px 100px -20px oklch(0 0 0 / 0.8), 0 0 60px -10px oklch(0.78 0.09 48 / 0.2)",
        }}
      >
        {/* Gold corner accents */}
        <span className="absolute top-0 left-0 w-8 h-px bg-gold" />
        <span className="absolute top-0 left-0 w-px h-8 bg-gold" />
        <span className="absolute top-0 right-0 w-8 h-px bg-gold" />
        <span className="absolute top-0 right-0 w-px h-8 bg-gold" />
        <span className="absolute bottom-0 left-0 w-8 h-px bg-gold" />
        <span className="absolute bottom-0 left-0 w-px h-8 bg-gold" />
        <span className="absolute bottom-0 right-0 w-8 h-px bg-gold" />
        <span className="absolute bottom-0 right-0 w-px h-8 bg-gold" />

        <div className="px-10 py-12 text-center">
          {/* Logo */}
          <div className="animate-fade-up flex justify-center mb-6">
            <img
              src={rasaLogo}
              alt="RASA"
              className="h-20 w-auto"
              loading="eager"
              draggable={false}
            />
          </div>

          {/* Tagline */}
          <p className="font-display text-[0.6rem] tracking-luxe mb-8 animate-fade-up delay-100" style={{ color: "#DEA193" }}>
            SMOKE, PERFECTED
          </p>

          <div className="luxe-divider mb-8 animate-fade-up delay-100" />

          {/* Heading */}
          <div className="animate-fade-up delay-200">
            <p className="text-[0.6rem] tracking-luxe uppercase text-gold mb-3">Welcome</p>
            <h1 className="font-serif text-4xl text-foreground mb-3">Sign In</h1>
            <p className="text-sm text-foreground/65 leading-relaxed mb-8">
              Access the House of RASA. Sign in to submit enquiries, request catalogues, and manage your experience.
            </p>
          </div>

          {/* Google Button */}
          <div className="animate-fade-up delay-300">
            <button
              onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white text-gray-800 text-sm font-medium hover:bg-gray-50 active:bg-gray-100 transition-all duration-300 mb-6 group"
              style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.3)" }}
            >
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="group-hover:tracking-wide transition-all duration-300">Continue with Google</span>
            </button>

            <p className="text-[0.6rem] text-foreground/35 leading-relaxed">
              By continuing, you agree to our{" "}
              <span className="text-gold/60 hover:text-gold cursor-pointer transition-colors">Privacy Policy</span>
              {" "}and{" "}
              <span className="text-gold/60 hover:text-gold cursor-pointer transition-colors">Terms & Conditions</span>.
            </p>
          </div>

          <div className="luxe-divider mt-8 mb-6 animate-fade-up delay-400" />

          {/* Back to site */}
          <div className="animate-fade-up delay-500">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-[0.65rem] tracking-luxe uppercase text-foreground/50 hover:text-gold transition-colors duration-300"
            >
              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                <path d="M7.5 2L3.5 6L7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Site
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
