import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Star, Gift, Users, Instagram, Trophy, Cake } from "lucide-react";

export const Route = createFileRoute("/loyalty")({
  component: LoyaltyPage,
});

const TIERS = [
  {
    name: "Bronze",
    requirement: "Join / ₹5,000 spent",
    benefits: ["Early product updates", "Welcome points bonus"],
    color: "#CD7F32",
    border: "#CD7F3250",
  },
  {
    name: "Silver",
    requirement: "₹5,000 spent",
    benefits: ["5% rewards on purchases", "Birthday gifts"],
    color: "#C0C0C0",
    border: "#C0C0C050",
  },
  {
    name: "Gold",
    requirement: "₹15,000 spent",
    benefits: ["Free shipping", "Exclusive flavours", "Priority access"],
    color: "#c9a96e",
    border: "#c9a96e50",
  },
  {
    name: "Platinum",
    requirement: "₹40,000 spent",
    benefits: ["VIP support", "Event invites", "Limited edition access"],
    color: "#DEA193",
    border: "#DEA19350",
  },
];

const EARN_WAYS = [
  { icon: <Star className="h-5 w-5" />, label: "Every Purchase", desc: "Earn points on every order" },
  { icon: <Users className="h-5 w-5" />, label: "Refer Friends", desc: "Points for every successful referral" },
  { icon: <Gift className="h-5 w-5" />, label: "Write Reviews", desc: "Share your experience and earn" },
  { icon: <Instagram className="h-5 w-5" />, label: "Post & Tag RASA", desc: "Post on Instagram and tag @rasatobacco" },
  { icon: <Cake className="h-5 w-5" />, label: "Birthday Bonus", desc: "Special points on your birthday" },
  { icon: <Trophy className="h-5 w-5" />, label: "Complete Profile", desc: "Earn points for a complete profile" },
];

const REDEEM_WAYS = [
  { label: "Discounts", desc: "Redeem points for order discounts" },
  { label: "Free Accessories", desc: "Bowls, hoses, mouthpieces and more" },
  { label: "Free Flavour Packs", desc: "Complimentary flavour packs of your choice" },
];

function LoyaltyPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    birthday: "",
    instagram_handle: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const f = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      setError("Name, email, and phone are required.");
      return;
    }
    setSending(true);
    setError("");
    const { error: err } = await supabase.from("loyalty_members").insert([
      {
        name: form.name,
        email: form.email,
        phone: form.phone,
        city: form.city || null,
        birthday: form.birthday || null,
        instagram_handle: form.instagram_handle || null,
      },
    ]);
    setSending(false);
    if (err) {
      if (err.code === "23505") {
        setError("This email is already registered in the loyalty program.");
      } else {
        setError("Something went wrong. Please try again.");
      }
      return;
    }
    setSubmitted(true);
  };

  return (
    <>
      <main className="bg-ink text-foreground min-h-screen">
        {/* Hero */}
        <section className="relative pt-40 pb-24 px-6 text-center overflow-hidden">
          <div className="absolute inset-0 grain opacity-40" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <p className="text-[0.65rem] tracking-luxe uppercase text-gold mb-4">Exclusive Membership</p>
            <h1 className="font-serif text-6xl md:text-8xl leading-none mb-6">Loyalty</h1>
            <p className="font-display text-sm tracking-luxe uppercase" style={{ color: "#DEA193" }}>
              SMOKE, PERFECTED
            </p>
            <p className="mt-8 text-foreground/75 max-w-xl mx-auto leading-relaxed">
              Join the House of RASA's exclusive loyalty program. Earn points, unlock rewards, and rise through tiers
              crafted for the discerning connoisseur.
            </p>
          </div>
        </section>

        <div className="luxe-divider max-w-md mx-auto" />

        {/* How to Earn */}
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <p className="text-[0.65rem] tracking-luxe uppercase text-gold mb-3 text-center">Points</p>
          <h2 className="font-serif text-4xl text-center mb-12">How to Earn</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {EARN_WAYS.map((w) => (
              <div
                key={w.label}
                className="border border-border/40 hover:border-gold/40 transition-colors p-6 bg-surface/20"
              >
                <div className="text-gold mb-3">{w.icon}</div>
                <p className="font-serif text-lg mb-1">{w.label}</p>
                <p className="text-xs text-foreground/65 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How to Redeem */}
        <section className="py-16 px-6 max-w-5xl mx-auto">
          <p className="text-[0.65rem] tracking-luxe uppercase text-gold mb-3 text-center">Rewards</p>
          <h2 className="font-serif text-4xl text-center mb-12">How to Redeem</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {REDEEM_WAYS.map((r) => (
              <div key={r.label} className="border border-gold/20 bg-gold/5 p-6 text-center">
                <p className="font-serif text-xl text-gold mb-2">{r.label}</p>
                <p className="text-sm text-foreground/70 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="luxe-divider max-w-md mx-auto" />

        {/* Tier Memberships */}
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <p className="text-[0.65rem] tracking-luxe uppercase text-gold mb-3 text-center">Membership</p>
          <h2 className="font-serif text-4xl text-center mb-12">Tier Levels</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {TIERS.map((t) => (
              <div
                key={t.name}
                className="relative border p-6 transition-all duration-300 hover:scale-[1.02]"
                style={{ borderColor: t.border, background: `${t.color}08` }}
              >
                <div className="w-8 h-px mb-4" style={{ background: t.color }} />
                <p className="font-serif text-2xl mb-1" style={{ color: t.color }}>
                  {t.name}
                </p>
                <p className="text-[0.6rem] tracking-luxe uppercase text-foreground/50 mb-4">{t.requirement}</p>
                <ul className="space-y-2">
                  {t.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2 text-xs text-foreground/75">
                      <span style={{ color: t.color }} className="mt-0.5 shrink-0">
                        ·
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <div className="luxe-divider max-w-md mx-auto" />

        {/* Sign Up Form */}
        <section className="py-20 px-6 max-w-2xl mx-auto">
          <p className="text-[0.65rem] tracking-luxe uppercase text-gold mb-3 text-center">Join Now</p>
          <h2 className="font-serif text-4xl text-center mb-12">Become a Member</h2>

          {submitted ? (
            <div className="border border-gold/30 bg-gold/5 p-10 text-center">
              <p className="font-serif text-3xl text-gold mb-4">Welcome to RASA.</p>
              <p className="text-foreground/75 leading-relaxed">
                You are now a Bronze member of the House of RASA Loyalty Program. Our team will be in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { key: "name", label: "Full Name *", type: "text", placeholder: "Your full name" },
                  { key: "email", label: "Email Address *", type: "email", placeholder: "your@email.com" },
                  { key: "phone", label: "Phone Number *", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                  { key: "city", label: "City", type: "text", placeholder: "Your city" },
                  { key: "birthday", label: "Birthday (for bonus points)", type: "date", placeholder: "" },
                  { key: "instagram_handle", label: "Instagram Handle", type: "text", placeholder: "@yourusername" },
                ].map(({ key, label, type, placeholder }) => (
                  <div key={key}>
                    <label className="block text-[0.65rem] tracking-luxe uppercase text-gold/80 mb-2">{label}</label>
                    <input
                      type={type}
                      value={form[key as keyof typeof form]}
                      onChange={f(key as keyof typeof form)}
                      placeholder={placeholder}
                      className="w-full bg-transparent border-b border-border/60 focus:border-gold py-3 text-foreground outline-none transition-colors placeholder:text-muted-foreground/40"
                    />
                  </div>
                ))}
              </div>

              {error && (
                <p className="text-xs font-serif italic text-red-400 bg-red-950/60 border border-red-800/50 px-4 py-2.5">
                  {error}
                </p>
              )}

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={sending}
                  className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-gold text-primary-foreground text-[0.7rem] tracking-luxe uppercase hover:bg-gold-soft transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? "Joining…" : "Join the Program"}
                  {!sending && <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />}
                </button>
              </div>
            </form>
          )}
        </section>
      </main>
    </>
  );
}
