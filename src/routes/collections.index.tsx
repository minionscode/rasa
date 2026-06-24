import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import majlisLogo from "@/assets/majlis-logo.jpg.asset.json";
import makhmalLogo from "@/assets/makhmal-logo.jpg.asset.json";
import tarkibLogo from "@/assets/tarkib-logo.jpg.asset.json";

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
  tag: string;
  intro: string[];
  philosophy: string[];
  flavours: string[];
  closing: string;
  color: string;
  numeral: string;
};

const sections: Section[] = [
  {
    slug: "majlis",
    name: "Majlis",
    tag: "The Expression of Heritage",
    numeral: "I.",
    color: "var(--majlis)",
    intro: [
      "Majlis celebrates the enduring side of character.",
      "Inspired by tradition but not confined by it, it is crafted for those who appreciate depth, confidence, and authenticity.",
      "Rich in presence and timeless in spirit, Majlis represents a refined expression of the RASA experience.",
    ],
    philosophy: [
      "Some things never need reinvention.",
      "Not because they resist change, but because they possess a character that remains relevant through time.",
      "Majlis is a tribute to that character.",
    ],
    flavours: [
      "Two Apples",
      "Mint",
      "Grape",
      "Rose",
      "Lemon Mint",
      "Gum",
      "Cardamom",
      "Mixed Fruit",
      "Watermelon Mint",
      "Peach",
    ],
    closing: "Character Endures.",
  },
  {
    slug: "makhmal",
    name: "Makhmal",
    tag: "The Expression of Refinement",
    numeral: "II.",
    color: "var(--makhmal)",
    intro: [
      "Makhmal celebrates the quieter side of luxury.",
      "Elegant without excess and refined without effort, it is crafted for those who appreciate balance, comfort, and sophistication.",
      "Smooth in character and composed in presence, Makhmal represents a softer expression of the RASA experience.",
    ],
    philosophy: [
      "Luxury is often mistaken for attention.",
      "True luxury requires none.",
      "It is found in balance. In comfort. In the confidence that comes from simplicity executed well.",
      "Makhmal is a tribute to that philosophy.",
    ],
    flavours: [
      "Velvet Peach",
      "Silk Mango",
      "Soft Berry",
      "Lychee Bloom",
      "Pear Whisper",
      "Vanilla Mist",
      "Coconut Cream",
      "Honey Melon",
      "Passion Fruit",
      "Strawberry Cloud",
    ],
    closing: "Refinement Endures.",
  },
  {
    slug: "tarkib",
    name: "Tarkib",
    tag: "The Expression of Innovation",
    numeral: "III.",
    color: "var(--tarkib)",
    intro: [
      "Tarkib celebrates the spirit of exploration.",
      "Driven by curiosity and shaped by experimentation, it is crafted for those who seek new possibilities and unexpected experiences.",
      "Bold in character and progressive in outlook, Tarkib represents the most forward-thinking expression of the House of RASA.",
    ],
    philosophy: [
      "Innovation begins with curiosity.",
      "The willingness to question what exists. To challenge expectations. To explore new possibilities.",
      "Tarkib is a tribute to that mindset.",
    ],
    flavours: [
      "Smoked Old Fashioned",
      "Negroni Noir",
      "Espresso Martini",
      "Yuzu Spritz",
      "Mezcal Sour",
      "Hibiscus Gin",
      "Cardamom Highball",
      "Saffron Tonic",
      "Black Cherry Bourbon",
      "Pineapple Mezcal",
    ],
    closing: "Discovery Never Ends.",
  },
];

const formats = ["20g", "60g", "250g", "500g", "1kg"];

function Collections() {
  const hash = useRouterState({ select: (s) => s.location.hash });

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) {
      // small delay to let layout settle
      setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }
  }, [hash]);

  return (
    <>
      {/* PAGE HERO */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-ink">
        <div className="absolute inset-0 smoke-bg opacity-50" />
        <div className="absolute inset-0 grain" />
        <div className="relative z-10 text-center px-6 max-w-3xl animate-fade-up">
          <p className="text-[0.65rem] tracking-luxe uppercase text-gold mb-8">
            The Collections
          </p>
          <h1 className="font-serif text-5xl md:text-8xl text-balance leading-[1.02]">
            Three Expressions. One House.
          </h1>
          <div className="luxe-divider max-w-[6rem] mx-auto my-10" />
          <p className="text-muted-foreground leading-loose max-w-2xl mx-auto">
            Within the House of RASA exist three distinct expressions. Each crafted
            to offer a unique interpretation of character, refinement, and experience.
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
  return (
    <section
      id={section.slug}
      className="relative scroll-mt-24 bg-ink border-t border-border/20"
    >
      {/* Hero band */}
      <div
        className="relative min-h-[60vh] flex items-center overflow-hidden"
        style={{
          background: `linear-gradient(180deg, ${section.color} 0%, transparent 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-ink/70" />
        <div className="absolute inset-0 smoke-bg opacity-40" />
        <div className="absolute inset-0 grain" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 py-24 md:py-28 w-full grid md:grid-cols-[1fr_auto] gap-12 items-center">
          <div>
            <p className="text-[0.65rem] tracking-luxe uppercase text-gold">
              {section.numeral}
            </p>
            <h2 className="mt-6 font-serif text-7xl md:text-[9rem] leading-none">
              {section.name}
            </h2>
            <p className="mt-6 font-serif italic text-xl md:text-2xl text-gold-soft">
              {section.tag}
            </p>
          </div>
          <div className="hidden md:flex items-center justify-center w-64 lg:w-80 aspect-square rounded-full bg-ink ring-1 ring-gold/30 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)] overflow-hidden">
            <img
              src={collectionLogos[section.slug]}
              alt={`${section.name} emblem`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="py-28 md:py-36">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <p className="text-[0.65rem] tracking-luxe uppercase text-gold mb-8">
            Introduction
          </p>
          <div className="space-y-6 text-lg leading-loose text-muted-foreground font-light">
            {section.intro.map((p, i) => (
              <p key={i} className={i === 0 ? "text-foreground/90" : ""}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Philosophy */}
      <div className="py-28 border-t border-border/30">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <p className="text-[0.65rem] tracking-luxe uppercase text-gold mb-8">
            Philosophy
          </p>
          <div className="space-y-6 text-lg leading-loose text-muted-foreground font-light">
            {section.philosophy.map((p, i) => (
              <p key={i} className={i === 0 ? "font-serif italic text-2xl text-foreground/90 leading-snug" : ""}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* The Collection — flavour names only */}
      <div className="py-28 border-t border-border/30">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <p className="text-[0.65rem] tracking-luxe uppercase text-gold mb-10">
            The Collection
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border/30">
            {section.flavours.map((f, i) => (
              <div
                key={f}
                className={`${alt ? "bg-background" : "bg-ink"} px-8 py-7 flex items-baseline gap-6 hover:bg-surface/40 transition-colors duration-500`}
              >
                <span className="text-[0.6rem] tracking-luxe text-gold/60 w-10">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-2xl md:text-3xl">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Formats */}
      <div className="py-28 border-t border-border/30">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <p className="text-[0.65rem] tracking-luxe uppercase text-gold mb-10">
            Available Formats
          </p>
          <div className="flex flex-wrap gap-3">
            {formats.map((f) => (
              <span
                key={f}
                className="px-8 py-4 border border-border/60 text-sm tracking-wide hover:border-gold/50 hover:text-gold transition-colors duration-500"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Closing */}
      <div className="py-32 md:py-40 border-t border-border/30 text-center">
        <p className="font-serif text-4xl md:text-6xl text-balance">
          {section.closing}
        </p>
        <p className="mt-6 font-serif italic text-2xl text-gold-soft">
          {section.name}.
        </p>
      </div>
    </section>
  );
}
