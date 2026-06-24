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
  // Tint surface used for flavour tiles & dividers — slightly darker than section bg
  const tile = `color-mix(in oklab, ${section.color} 35%, var(--ink))`;
  const tileHover = `color-mix(in oklab, ${section.color} 55%, var(--ink))`;
  const sectionBg = `linear-gradient(180deg, ${section.color} 0%, color-mix(in oklab, ${section.color} 40%, var(--ink)) 55%, var(--ink) 100%)`;

  return (
    <section
      id={section.slug}
      className="relative scroll-mt-24 border-t border-border/10"
      style={{ background: sectionBg }}
    >
      {/* Soft vignette for depth (cheap, no animation) */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.06), transparent 60%)",
        }}
      />

      {/* Hero band */}
      <div className="relative">
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 pt-20 pb-14 md:pt-24 md:pb-16 w-full grid md:grid-cols-[1fr_auto] gap-10 md:gap-14 items-center">
          <div>
            <p className="text-[0.65rem] tracking-[0.4em] uppercase text-gold/90">
              {section.numeral}
            </p>
            <h2 className="mt-5 font-serif text-7xl md:text-[8.5rem] leading-[0.95] tracking-tight">
              {section.name}
            </h2>
            <p className="mt-5 font-serif italic text-xl md:text-2xl text-gold-soft">
              {section.tag}
            </p>
          </div>
          <div
            className="hidden md:flex relative items-center justify-center w-56 lg:w-72 aspect-square"
            style={{
              WebkitMaskImage:
                "radial-gradient(circle at center, black 50%, rgba(0,0,0,0.6) 65%, transparent 82%)",
              maskImage:
                "radial-gradient(circle at center, black 50%, rgba(0,0,0,0.6) 65%, transparent 82%)",
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

      {/* Introduction + Philosophy — two columns to compress vertical space */}
      <div className="relative z-10 border-t border-foreground/5">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 py-16 md:py-20 grid md:grid-cols-2 gap-x-16 gap-y-12">
          <div>
            <p className="text-[0.65rem] tracking-[0.4em] uppercase text-gold/80 mb-6">
              Introduction
            </p>
            <div className="space-y-5 text-[15px] md:text-base leading-[1.85] text-foreground/75 font-light">
              {section.intro.map((p, i) => (
                <p key={i} className={i === 0 ? "text-foreground/95" : ""}>
                  {p}
                </p>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[0.65rem] tracking-[0.4em] uppercase text-gold/80 mb-6">
              Philosophy
            </p>
            <div className="space-y-5 text-[15px] md:text-base leading-[1.85] text-foreground/75 font-light">
              {section.philosophy.map((p, i) => (
                <p
                  key={i}
                  className={i === 0 ? "font-serif italic text-xl md:text-2xl text-foreground/95 leading-snug" : ""}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* The Collection — flavour names only */}
      <div className="relative z-10 border-t border-foreground/5">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 md:py-20">
          <p className="text-[0.65rem] tracking-[0.4em] uppercase text-gold/80 mb-8">
            The Collection
          </p>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-px"
            style={{ background: "color-mix(in oklab, var(--gold) 12%, transparent)" }}
          >
            {section.flavours.map((f, i) => (
              <div
                key={f}
                className="px-7 py-5 flex items-baseline gap-5 transition-colors duration-300"
                style={
                  {
                    background: tile,
                    ["--hover-bg" as never]: tileHover,
                  } as React.CSSProperties
                }
                onMouseEnter={(e) => (e.currentTarget.style.background = tileHover)}
                onMouseLeave={(e) => (e.currentTarget.style.background = tile)}
              >
                <span className="text-[0.6rem] tracking-[0.4em] text-gold/70 w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-xl md:text-2xl">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Formats + Closing combined in one band */}
      <div className="relative z-10 border-t border-foreground/5">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 py-16 md:py-20">
          <p className="text-[0.65rem] tracking-[0.4em] uppercase text-gold/80 mb-6">
            Available Formats
          </p>
          <div className="flex flex-wrap gap-3">
            {formats.map((f) => (
              <span
                key={f}
                className="px-7 py-3.5 border border-foreground/15 text-sm tracking-wide hover:border-gold/60 hover:text-gold transition-colors duration-300"
              >
                {f}
              </span>
            ))}
          </div>

          <div className="mt-20 md:mt-24 text-center">
            <p className="font-serif text-4xl md:text-5xl text-balance">
              {section.closing}
            </p>
            <p className="mt-4 font-serif italic text-xl text-gold-soft">
              {section.name}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

