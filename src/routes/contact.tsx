import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SectionLabel } from "../components/SectionLabel";
import { ArrowRight, Mail, Phone, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Sales — RASA" },
      { name: "description", content: "Speak with the RASA sales team. Distribution, lounge partnerships, wholesale and general enquiries across India and the Gulf." },
      { property: "og:title", content: "Contact Sales — RASA" },
      { property: "og:description", content: "Let's start a conversation." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", company: "", country: "", email: "", phone: "", type: "Distributor", message: "",
  });

  const onChange = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const whatsappLink = `https://wa.me/910000000000?text=${encodeURIComponent(
    `Hello RASA — I'm ${form.name || "[name]"} from ${form.company || "[company]"} (${form.country || "[country]"}). I'm enquiring about: ${form.type}.`
  )}`;

  return (
    <section className="pt-32 pb-20 bg-ink min-h-screen">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-20">
        <div className="lg:sticky lg:top-32 self-start">
          <SectionLabel><span>Contact Sales</span></SectionLabel>
          <h1 className="mt-6 font-serif text-6xl md:text-7xl text-balance">
            Let's start a <em className="text-gold not-italic">conversation</em>.
          </h1>
          <p className="mt-6 text-muted-foreground max-w-md leading-relaxed">
            Whether you seek distribution, a lounge partnership, or simply wish to experience
            RASA — our sales team responds within one business day.
          </p>

          <div className="mt-12 space-y-5 text-sm">
            <a href="mailto:sales@rasahouse.com" className="flex items-center gap-4 text-muted-foreground hover:text-gold transition-colors">
              <Mail className="h-4 w-4 text-gold" /> sales@rasahouse.com
            </a>
            <a href="tel:+910000000000" className="flex items-center gap-4 text-muted-foreground hover:text-gold transition-colors">
              <Phone className="h-4 w-4 text-gold" /> +91 00000 00000
            </a>
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-muted-foreground hover:text-gold transition-colors">
              <MessageCircle className="h-4 w-4 text-gold" /> WhatsApp Sales
            </a>
          </div>

          <div className="mt-12 luxe-divider" />
          <p className="mt-6 text-xs text-muted-foreground">
            India · UAE · Saudi Arabia · Qatar · Kuwait · Oman · Bahrain
          </p>
        </div>

        <div>
          {submitted ? (
            <div className="border border-gold/30 bg-surface p-12 text-center animate-fade-up">
              <h2 className="font-serif text-3xl">Thank you.</h2>
              <p className="mt-4 text-muted-foreground">
                Your enquiry has reached our sales atelier. A representative will respond shortly.
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 mt-8 px-8 py-3 bg-gold text-primary-foreground text-xs tracking-luxe uppercase hover:bg-gold-soft transition-colors"
              >
                Continue on WhatsApp <MessageCircle className="h-3.5 w-3.5" />
              </a>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <Field label="Name" value={form.name} onChange={onChange("name")} required />
                <Field label="Company" value={form.company} onChange={onChange("company")} />
                <Field label="Country" value={form.country} onChange={onChange("country")} required />
                <Field label="Email" type="email" value={form.email} onChange={onChange("email")} required />
                <Field label="Phone" type="tel" value={form.phone} onChange={onChange("phone")} />
                <div>
                  <label className="block text-[0.65rem] tracking-luxe uppercase text-gold/80 mb-2">Business Type</label>
                  <select
                    value={form.type}
                    onChange={onChange("type")}
                    className="w-full bg-transparent border-b border-border/60 py-3 text-foreground focus:border-gold outline-none transition-colors"
                  >
                    {["Distributor", "Lounge Owner", "Wholesale", "Retail", "Media", "Other"].map((o) => (
                      <option key={o} value={o} className="bg-ink">{o}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[0.65rem] tracking-luxe uppercase text-gold/80 mb-2">Message</label>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={onChange("message")}
                  className="w-full bg-transparent border-b border-border/60 py-3 text-foreground focus:border-gold outline-none transition-colors resize-none"
                  placeholder="Tell us about your enquiry…"
                />
              </div>

              <div className="pt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-gold text-primary-foreground text-xs tracking-luxe uppercase hover:bg-gold-soft transition-colors duration-500"
                >
                  Submit Enquiry <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-10 py-4 border border-border text-foreground text-xs tracking-luxe uppercase hover:border-gold/50 hover:text-gold transition-all"
                >
                  WhatsApp Instead <MessageCircle className="h-3.5 w-3.5" />
                </a>
              </div>
              <p className="text-xs text-muted-foreground">
                By submitting you confirm you are 18+ and acting in a professional capacity.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label, value, onChange, type = "text", required = false,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[0.65rem] tracking-luxe uppercase text-gold/80 mb-2">{label}{required && " *"}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent border-b border-border/60 py-3 text-foreground focus:border-gold outline-none transition-colors"
      />
    </div>
  );
}
