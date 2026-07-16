import { useEffect, useState } from "react";
import { X, ArrowRight, Mail } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

type Props = {
  open: boolean;
  onClose: () => void;
  reason?: "contact" | "catalogue";
};

export function AuthModal({ open, onClose, reason = "contact" }: Props) {
  const { sendMagicLink, user } = useAuth();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (user && open) onClose();
  }, [user, open, onClose]);

  if (!open) return null;

  const reasonText = reason === "catalogue"
    ? "sign in to request the full catalogue"
    : "sign in to send your enquiry";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setSending(true);
    try {
      await sendMagicLink(email.trim());
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 animate-fade-in">
      <div className="absolute inset-0 bg-ink/85 backdrop-blur-md" onClick={onClose} />
      <div
        className="relative w-full max-w-md p-10 text-center animate-fade-up"
        style={{
          background: "linear-gradient(180deg, oklch(0.22 0.006 60 / 0.97), oklch(0.14 0.005 60 / 0.99))",
          border: "1px solid oklch(0.78 0.09 48 / 0.3)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 30px 80px -20px oklch(0 0 0 / 0.8), 0 0 60px -10px oklch(0.78 0.09 48 / 0.2)",
        }}
      >
        <button onClick={onClose} aria-label="Close" className="absolute top-4 right-4 text-foreground/50 hover:text-gold transition-colors">
          <X className="h-4 w-4" />
        </button>
        <span className="absolute top-0 left-0 w-6 h-px bg-gold" /><span className="absolute top-0 left-0 w-px h-6 bg-gold" />
        <span className="absolute top-0 right-0 w-6 h-px bg-gold" /><span className="absolute top-0 right-0 w-px h-6 bg-gold" />
        <span className="absolute bottom-0 left-0 w-6 h-px bg-gold" /><span className="absolute bottom-0 left-0 w-px h-6 bg-gold" />
        <span className="absolute bottom-0 right-0 w-6 h-px bg-gold" /><span className="absolute bottom-0 right-0 w-px h-6 bg-gold" />

        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 border border-gold/30 mx-auto mb-5">
          <Mail className="h-5 w-5 text-gold" />
        </div>

        <p className="text-[0.6rem] tracking-luxe uppercase text-gold mb-2">House of RASA</p>
        <h2 className="font-serif text-3xl text-foreground mb-3">Welcome</h2>

        {sent ? (
          <div className="mt-4">
            <p className="text-sm text-foreground/80 leading-relaxed mb-2">
              A sign-in link has been sent to
            </p>
            <p className="font-serif text-gold text-base mb-4">{email}</p>
            <p className="text-xs text-foreground/55 leading-relaxed">
              Click the link in your email to sign in. You may close this window.
            </p>
          </div>
        ) : (
          <>
            <p className="text-sm text-foreground/70 leading-relaxed mb-8">
              Please {reasonText}. Enter your email and we'll send you a secure sign-in link — no password needed.
            </p>
            <form onSubmit={handleSubmit} noValidate className="text-left space-y-4">
              <div>
                <label className="block text-[0.65rem] tracking-luxe uppercase text-gold/80 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (error) setError(""); }}
                  placeholder="your@email.com"
                  className="w-full bg-transparent border-b border-border/60 focus:border-gold py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/40"
                  autoFocus
                />
                {error && <p className="mt-2 text-xs font-serif italic text-red-400">{error}</p>}
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gold text-primary-foreground text-[0.7rem] tracking-luxe uppercase hover:bg-gold-soft transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <><span className="w-4 h-4 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" />Sending…</>
                ) : (
                  <>Send Sign-in Link <ArrowRight className="h-3.5 w-3.5" /></>
                )}
              </button>
            </form>
            <p className="mt-5 text-[0.65rem] text-foreground/40 leading-relaxed">
              By continuing, you agree to our <span className="text-gold/70">Privacy Policy</span> and <span className="text-gold/70">Terms & Conditions</span>.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
