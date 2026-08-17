import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { collections, formats } from "@/data/collections";
import { contactInfo } from "@/data/contact";

export const Route = createFileRoute("/flavours")({
  head: () => ({
    meta: [
      { title: "Hookah Flavours — House of RASA" },
      { property: "og:title", content: "RASA Hookah Flavours" },
    ],
  }),
  component: FlavoursPage,
});

// Flatten all flavours without mentioning collection
const ALL_FLAVOURS = collections.flatMap((c) =>
  c.flavours.map((f) => ({ name: f.name, notes: f.notes }))
).filter((f, i, arr) => arr.findIndex(x => x.name === f.name) === i); // deduplicate by name

const WEIGHTS = ["20g", "60g", "250g", "500g", "1kg"];

const WEIGHT_LABELS: Record<string, string> = {
  "20g": "Trial Pack",
  "60g": "Standard",
  "250g": "Value Pack",
  "500g": "Bulk",
  "1kg": "Professional",
};

function FlavoursPage() {
  const [search, setSearch] = useState("");
  const [selectedWeight, setSelectedWeight] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return ALL_FLAVOURS;
    return ALL_FLAVOURS.filter(
      (f) =>
        f.name.toLowerCase().includes(term) ||
        f.notes.toLowerCase().includes(term)
    );
  }, [search]);

  const enquireUrl = (flavour: string, weight: string) =>
    `https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent(
      `Hi RASA! I'm interested in ${flavour} (${weight}). Could you share more details?`
    )}`;

  return (
    <main className="bg-ink text-foreground min-h-screen">
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 grain opacity-30 pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, oklch(0.74 0.08 45 / 0.12), transparent 60%)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto">
          <p className="text-[0.65rem] tracking-luxe uppercase text-gold mb-4">
            House of RASA
          </p>
          <h1 className="font-serif text-6xl md:text-8xl leading-none mb-6">
            Flavours
          </h1>
          <p
            className="font-display text-sm tracking-luxe uppercase mb-8"
            style={{ color: "#DEA193" }}
          >
            SMOKE, PERFECTED
          </p>
          <p className="text-foreground/70 max-w-xl mx-auto leading-relaxed text-sm">
            {ALL_FLAVOURS.length} distinct flavours, crafted across three
            collections. Each available in five pack sizes — from trial to
            professional.
          </p>
        </div>
      </section>

      <div className="luxe-divider max-w-md mx-auto" />

      {/* Filters */}
      <section className="sticky top-20 z-30 bg-ink/95 backdrop-blur-xl border-b border-border/30 px-6 py-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 w-full sm:max-w-sm">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-foreground/40" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search flavours or notes…"
              className="w-full bg-transparent border border-border/50 focus:border-gold pl-9 pr-4 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/40"
            />
          </div>

          {/* Weight filter */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="text-[0.6rem] tracking-luxe uppercase text-foreground/40 mr-1">Size:</span>
            {WEIGHTS.map((w) => (
              <button
                key={w}
                onClick={() => setSelectedWeight(selectedWeight === w ? null : w)}
                className={`text-[0.6rem] tracking-luxe uppercase px-3 py-1.5 border transition-all duration-200 ${
                  selectedWeight === w
                    ? "border-gold text-gold bg-gold/10"
                    : "border-border/40 text-foreground/60 hover:border-gold/50 hover:text-gold"
                }`}
              >
                {w}
              </button>
            ))}
          </div>

          <p className="text-[0.6rem] tracking-luxe uppercase text-foreground/40 shrink-0">
            {filtered.length} flavour{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
      </section>

      {/* Flavours Grid */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-foreground/60 mb-3">No flavours found.</p>
            <button onClick={() => setSearch("")} className="text-[0.65rem] tracking-luxe uppercase text-gold hover:text-gold-soft transition-colors">
              Clear search
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((flavour) => (
              <div
                key={flavour.name}
                className="group border border-border/40 hover:border-gold/40 transition-all duration-500 bg-surface/10 hover:bg-surface/20 flex flex-col"
              >
                {/* Card header */}
                <div className="p-6 flex-1">
                  <div className="w-8 h-px bg-gold/60 mb-4" />
                  <h3 className="font-serif text-2xl text-foreground group-hover:text-gold transition-colors duration-300 mb-2">
                    {flavour.name}
                  </h3>
                  <p className="text-xs text-foreground/60 leading-relaxed tracking-wide">
                    {flavour.notes}
                  </p>
                </div>

                {/* Weight options */}
                <div className="px-6 pb-3 border-t border-border/30">
                  <p className="text-[0.6rem] tracking-luxe uppercase text-foreground/40 mt-4 mb-3">
                    Available Sizes
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {WEIGHTS.map((w) => (
                      <a
                        key={w}
                        href={enquireUrl(flavour.name, w)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex flex-col items-center px-3 py-2 border text-center transition-all duration-200 hover:border-gold hover:bg-gold/10 group/btn ${
                          selectedWeight === w
                            ? "border-gold bg-gold/10"
                            : "border-border/40"
                        }`}
                        title={`Enquire about ${flavour.name} — ${w}`}
                      >
                        <span className="text-[0.65rem] tracking-luxe uppercase font-medium text-foreground group-hover/btn:text-gold transition-colors">
                          {w}
                        </span>
                        <span className="text-[0.55rem] text-foreground/40 mt-0.5">
                          {WEIGHT_LABELS[w]}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Enquire CTA */}
                <div className="px-6 py-4">
                  <a
                    href={enquireUrl(flavour.name, selectedWeight ?? "60g")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[0.65rem] tracking-luxe uppercase text-gold/80 hover:text-gold transition-colors duration-300 group/link"
                  >
                    Enquire on WhatsApp
                    <svg className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6h7m0 0L6.5 3m3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-6 text-center border-t border-border/30">
        <p className="text-[0.65rem] tracking-luxe uppercase text-gold mb-4">Wholesale & Bulk Orders</p>
        <h2 className="font-serif text-3xl md:text-4xl mb-6">Looking for larger quantities?</h2>
        <p className="text-sm text-foreground/65 max-w-md mx-auto mb-8 leading-relaxed">
          RASA offers wholesale pricing for retailers, lounges, and distributors across India and internationally.
        </p>
        <a
          href={`https://wa.me/${contactInfo.whatsappNumber}?text=${encodeURIComponent("Hi RASA! I'm interested in wholesale/bulk pricing for your hookah flavours. Could you share more details?")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-ink text-[0.7rem] tracking-luxe uppercase hover:bg-gold-soft transition-all duration-500 group"
        >
          Discuss Wholesale
          <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10m0 0L8 3m4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </section>
    </main>
  );
}
