import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import majlisLogo from "@/assets/majlis-logo.png.asset.json";
import makhmalLogo from "@/assets/makhmal-logo.png.asset.json";
import tarkibLogo from "@/assets/tarkib-logo.png.asset.json";

const collectionLogos: Record<string, string> = {
  majlis: majlisLogo.url,
  makhmal: makhmalLogo.url,
  tarkib: tarkibLogo.url,
};

export const Route = createFileRoute("/collections/")({
  head: () => ({
    meta: [
      { title: "Collections — Three Expressions, One House" },
      {
        name: "description",
        content:
          "Within the House of RASA exist three distinct expressions: Majlis, Makhmal, and Tarkib — each a unique interpretation of character, refinement, and experience.",
      },
      { property: "og:title", content: "Collections — RASA" },
      {
        property: "og:description",
        content:
          "Majlis, Makhmal, Tarkib — three distinct expressions of the House of RASA.",
      },
    ],
  }),
  component: Collections,
});

type Section = {
  slug: "majlis" | "makhmal" | "tarkib";
  name: string;
  label: string;
  expression: string;
  tagline: string;
  intro: string;
  signature: string[];
  philosophy: string;
  featured: { name: string; notes: string }[];
  flavours: string[];
  closing: string;
  bgVar: string;
  accentVar: string;
  pattern: string;
};

const sections: Section[] = [
  {
    slug: "majlis",
    name: "Majlis",
    label: "Collection I",
    expression: "The Expression of Heritage",
    tagline: "Tradition Lives On.",
    intro:
      "Majlis is a tribute to gathering. Rooted in heritage, warmed by hospitality, it carries the timeless character of an evening spent in good company.",
    signature: ["Heritage Profile", "Warm & Aromatic", "Crafted for Conviviality"],
    philosophy:
      "Some rituals never need reinvention. Majlis preserves them with the discipline of a house that respects its origins.",
    featured: [
      { name: "Two Apples", notes: "Anise · Spiced Apple · Char" },
      { name: "Rose", notes: "Damask Rose · Honey · Soft Smoke" },
      { name: "Cardamom", notes: "Green Cardamom · Cream · Wood" },
      { name: "Lemon Mint", notes: "Citrus Zest · Spearmint · Cool" },
      { name: "Grape", notes: "Black Grape · Ice · Lush" },
      { name: "Mixed Fruit", notes: "Stone Fruit · Berry · Bright" },
    ],
    flavours: [
      "Two Apples", "Mint", "Grape", "Rose", "Lemon Mint",
      "Gum", "Cardamom", "Mixed Fruit", "Watermelon Mint", "Peach",
    ],
    closing: "Tradition Lives On.",
    bgVar: "var(--majlis)",
    accentVar: "var(--majlis-accent)",
    pattern: "pattern-arabesque",
  },
  {
    slug: "makhmal",
    name: "Makhmal",
    label: "Collection II",
    expression: "The Expression of Refinement",
    tagline: "Refinement Endures.",
    intro:
      "Makhmal is velvet made vapour. Quiet, composed, and effortlessly elegant — it is luxury without volume, refinement without effort.",
    signature: ["Velvet Profile", "Soft & Composed", "Crafted for Stillness"],
    philosophy:
      "True luxury requires no attention. It is found in balance, in comfort, in the confidence of simplicity executed well.",
    featured: [
      { name: "Velvet Peach", notes: "Ripe Peach · Cream · Silk" },
      { name: "Silk Mango", notes: "Alphonso · Saffron · Smooth" },
      { name: "Lychee Bloom", notes: "Lychee · Rose · Linen" },
      { name: "Vanilla Mist", notes: "Bourbon Vanilla · Cloud · Warm" },
      { name: "Coconut Cream", notes: "Toasted Coconut · Cream · Calm" },
      { name: "Honey Melon", notes: "Honeydew · Honey · Soft" },
    ],
    flavours: [
      "Velvet Peach", "Silk Mango", "Soft Berry", "Lychee Bloom", "Pear Whisper",
      "Vanilla Mist", "Coconut Cream", "Honey Melon", "Passion Fruit", "Strawberry Cloud",
    ],
    closing: "Refinement Endures.",
    bgVar: "var(--makhmal)",
    accentVar: "var(--makhmal-accent)",
    pattern: "pattern-velvet",
  },
  {
    slug: "tarkib",
    name: "Tarkib",
    label: "Collection III",
    expression: "The Expression of Innovation",
    tagline: "Discovery Never Ends.",
    intro:
      "Tarkib is curiosity bottled. Bold, modern, and progressive — it is the House of RASA looking forward, composing flavours the way a bartender composes a cocktail.",
    signature: ["Modern Profile", "Bold & Layered", "Crafted for Discovery"],
    philosophy:
      "Innovation begins with the willingness to question what exists. Tarkib is the proof that tradition and progress are not opposites.",
    featured: [
      { name: "Smoked Old Fashioned", notes: "Bourbon · Orange · Oak" },
      { name: "Espresso Martini", notes: "Espresso · Cocoa · Cream" },
      { name: "Yuzu Spritz", notes: "Yuzu · Soda · Bright" },
      { name: "Negroni Noir", notes: "Bitter Orange · Vermouth · Spice" },
      { name: "Saffron Tonic", notes: "Saffron · Tonic · Floral" },
      { name: "Pineapple Mezcal", notes: "Pineapple · Smoke · Lime" },
    ],
    flavours: [
      "Smoked Old Fashioned", "Negroni Noir", "Espresso Martini", "Yuzu Spritz", "Mezcal Sour",
      "Hibiscus Gin", "Cardamom Highball", "Saffron Tonic", "Black Cherry Bourbon", "Pineapple Mezcal",
    ],
    closing: "Discovery Never Ends.",
    bgVar: "var(--tarkib)",
    accentVar: "var(--tarkib-accent)",
    pattern: "pattern-geometric",
  },
];

const formats = ["20g", "60g", "250g", "500g", "1kg"];

function Collections() {
  const hash = useRouterState({ select: (s) => s.location.hash });

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  }, [hash]);

  return (
    <>
      {/* PAGE HERO */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden bg-ink pt-32 pb-14">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 40%, color-mix(in oklab, var(--gold) 14%, transparent), transparent 70%)",
          }}
        />
        <div className="relative z-10 text-center px-6 max-w-3xl animate-fade-up">
          <p className="text-[0.65rem] tracking-[0.4em] uppercase text-gold mb-6">
            The Collections
          </p>
          <h1 className="font-serif text-5xl md:text-7xl text-balance leading-[1.05]">
            Three Expressions. One House.
          </h1>
          <div className="luxe-divider max-w-[6rem] mx-auto my-7" />
          <p className="text-foreground/85 leading-relaxed max-w-2xl mx-auto">
            Within the House of RASA exist three distinct expressions — each a luxury world of its own,
            crafted for domestic and international partners who recognise the difference.
          </p>
        </div>
      </section>

      {sections.map((s) => (
        <CollectionSection key={s.slug} section={s} />
      ))}
    </>
  );
}

function CollectionSection({ section }: { section: Section }) {
  const [selectedFormat, setSelectedFormat] = useState<string>("250g");
  const secondaryVar = `var(--${section.slug}-secondary)`;
  // Darker, richer atmosphere — collection color dominates, subtle copper ambient
  const sectionBg = `radial-gradient(ellipse at 20% 10%, ${secondaryVar} 0%, transparent 45%), radial-gradient(ellipse at 85% 80%, color-mix(in oklab, ${section.accentVar} 10%, transparent) 0%, transparent 55%), linear-gradient(180deg, color-mix(in oklab, ${section.bgVar} 85%, var(--ink)) 0%, color-mix(in oklab, ${section.bgVar} 60%, var(--ink)) 50%, var(--ink) 100%)`;

  return (
    <section
      id={section.slug}
      className="relative scroll-mt-24 border-t border-border/10"
      style={{ background: sectionBg }}
    >
      {/* Identity pattern overlay — subtle */}
      <div className={`pointer-events-none absolute inset-0 opacity-25 ${section.pattern}`} />
      {/* Deep vignette for premium contrast */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.55), transparent 65%), radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.35), transparent 60%)",
        }}
      />


      {/* HERO — restructured hierarchy: LABEL · NAME · EXPRESSION · TAGLINE */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 pt-20 md:pt-24 pb-10 grid md:grid-cols-[1fr_auto] gap-10 md:gap-14 items-center">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <img
              src={collectionLogos[section.slug]}
              alt=""
              className="h-10 md:h-12 w-auto opacity-90 crisp-img"
            />
            <span
              className="text-[0.65rem] tracking-[0.45em] uppercase"
              style={{ color: section.accentVar }}
            >
              {section.name} Collection
            </span>
          </div>
          <h2 className="font-serif text-7xl md:text-[8.5rem] leading-[0.95] tracking-tight">
            {section.name}
          </h2>
          <p
            className="mt-5 font-serif text-2xl md:text-3xl"
            style={{ color: section.accentVar }}
          >
            {section.expression}
          </p>
          <p className="mt-3 font-serif italic text-lg md:text-xl text-foreground/80">
            {section.tagline}
          </p>
        </div>

        <div className="hidden md:block relative w-56 lg:w-80 aspect-square">
          <div
            className="absolute inset-[-25%] pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, ${section.bgVar} 0%, color-mix(in oklab, ${section.bgVar} 70%, transparent) 35%, transparent 70%)`,
              filter: "blur(6px)",
            }}
          />
          <div
            className="relative w-full h-full"
            style={{
              WebkitMaskImage:
                "radial-gradient(circle at center, black 38%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.35) 65%, transparent 82%)",
              maskImage:
                "radial-gradient(circle at center, black 38%, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.35) 65%, transparent 82%)",
            }}
          >
            <img
              src={collectionLogos[section.slug]}
              alt={`${section.name} emblem`}
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>

      {/* INTRO + SIGNATURE — immediately under hero, no empty band */}
      <div className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 pb-12 grid md:grid-cols-[1.4fr_1fr] gap-x-14 gap-y-10 items-start">
          <p className="font-serif text-2xl md:text-[1.65rem] leading-snug text-foreground/95 text-balance">
            {section.intro}
          </p>
          <div className="flex flex-col gap-3">
            <p
              className="text-[0.6rem] tracking-[0.4em] uppercase mb-1"
              style={{ color: section.accentVar }}
            >
              Signature
            </p>
            {section.signature.map((s) => (
              <div
                key={s}
                className="flex items-center gap-3 text-sm text-foreground/85"
              >
                <span
                  className="h-px w-6"
                  style={{ background: section.accentVar, opacity: 0.6 }}
                />
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURED FLAVOURS — luxury product cards */}
      <div className="relative z-10 border-t border-foreground/10">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 py-14 md:py-16">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <p
                className="text-[0.65rem] tracking-[0.4em] uppercase"
                style={{ color: section.accentVar }}
              >
                Featured Flavours
              </p>
              <h3 className="mt-2 font-serif text-3xl md:text-4xl">
                Selected from the {section.name} cellar
              </h3>
            </div>
            <Link
              to="/contact"
              search={{ collection: section.name }}
              className="luxe-underline text-[0.7rem] tracking-luxe uppercase"
              style={{ color: section.accentVar }}
            >
              Request the full catalogue
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {section.featured.map((p, i) => (
              <article key={p.name} className="card-luxe p-6 flex flex-col">
                <p
                  className="text-[0.6rem] tracking-[0.4em] uppercase"
                  style={{ color: section.accentVar }}
                >
                  No. {String(i + 1).padStart(2, "0")}
                </p>
                <h4 className="mt-3 font-serif text-2xl md:text-[1.65rem] leading-tight">
                  {p.name}
                </h4>
                <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
                  {p.notes}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {formats.slice(0, 3).map((f) => (
                    <span
                      key={f}
                      className="text-[0.6rem] tracking-luxe uppercase px-2 py-1 border border-foreground/15 text-foreground/65"
                    >
                      {f}
                    </span>
                  ))}
                  <span className="text-[0.6rem] tracking-luxe uppercase px-2 py-1 text-foreground/45">
                    +2
                  </span>
                </div>
                <Link
                  to="/contact"
                  search={{ product: p.name, collection: section.name, format: selectedFormat }}
                  className="mt-6 inline-flex items-center justify-between text-[0.7rem] tracking-luxe uppercase hover:text-gold transition-colors group"
                  style={{ color: section.accentVar }}
                >
                  Request Information
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </article>
            ))}
          </div>

        </div>
      </div>

      {/* PHILOSOPHY + FULL CATALOGUE — two columns, tight */}
      <div className="relative z-10 border-t border-foreground/10">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 py-14 md:py-16 grid md:grid-cols-2 gap-x-14 gap-y-10">
          <div>
            <p
              className="text-[0.65rem] tracking-[0.4em] uppercase mb-5"
              style={{ color: section.accentVar }}
            >
              Philosophy
            </p>
            <p className="font-serif italic text-xl md:text-2xl leading-snug text-foreground/95 text-balance">
              {section.philosophy}
            </p>
          </div>
          <div>
            <p
              className="text-[0.65rem] tracking-[0.4em] uppercase mb-5"
              style={{ color: section.accentVar }}
            >
              The Complete Cellar
            </p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-foreground/85">
              {section.flavours.map((f, i) => (
                <li key={f} className="flex items-baseline gap-3 text-sm">
                  <span
                    className="text-[0.55rem] tracking-[0.3em]"
                    style={{ color: section.accentVar, opacity: 0.75 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-serif text-base">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* FORMATS + CTA */}
      <div className="relative z-10 border-t border-foreground/10">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 py-14 md:py-16">
          <div className="grid md:grid-cols-[1fr_auto] items-end gap-8 mb-8">
            <div>
              <p
                className="text-[0.65rem] tracking-[0.4em] uppercase"
                style={{ color: section.accentVar }}
              >
                Available Packaging Formats
              </p>
              <h3 className="mt-2 font-serif text-3xl md:text-4xl">
                Select Preferred Format
              </h3>
            </div>
            <p className="text-sm text-foreground/70 max-w-xs">
              Retail through wholesale quantities, supplied to domestic and international partners.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {formats.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setSelectedFormat(f)}
                data-selected={selectedFormat === f}
                className="chip-luxe px-5 py-4 text-sm tracking-luxe uppercase text-center"
              >
                {f}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs text-foreground/60">
            Selected: <span style={{ color: section.accentVar }}>{selectedFormat}</span> — included automatically in your enquiry.
          </p>

          <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-foreground/10">
            <div>
              <p className="font-serif text-3xl md:text-4xl">{section.closing}</p>
              <p
                className="mt-2 font-serif italic text-lg"
                style={{ color: section.accentVar }}
              >
                {section.name}.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact"
                search={{ collection: section.name, format: selectedFormat }}
                className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-gold text-primary-foreground text-[0.7rem] tracking-luxe uppercase hover:bg-gold-soft transition-colors duration-500"
              >
                Request Information <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/partners"
                className="inline-flex items-center justify-center px-8 py-3.5 border border-foreground/30 text-[0.7rem] tracking-luxe uppercase hover:border-gold hover:text-gold transition-all duration-500"
              >
                Wholesale Inquiry

              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
