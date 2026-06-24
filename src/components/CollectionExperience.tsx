import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowDown, ArrowRight, Check } from "lucide-react";

import { collections, formats, type Collection, type Flavour } from "@/data/collections";

export function CollectionExperience({ collection }: { collection: Collection }) {
  const [selectedFormat, setSelectedFormat] = useState<string>("250g");
  const secondaryVar = `var(--${collection.slug}-secondary)`;
  const sectionBg = `radial-gradient(ellipse at 20% 10%, ${secondaryVar} 0%, transparent 45%), radial-gradient(ellipse at 85% 80%, color-mix(in oklab, ${collection.accentVar} 10%, transparent) 0%, transparent 55%), linear-gradient(180deg, color-mix(in oklab, ${collection.bgVar} 85%, var(--ink)) 0%, color-mix(in oklab, ${collection.bgVar} 60%, var(--ink)) 50%, var(--ink) 100%)`;

  return (
    <section className="relative" style={{ background: sectionBg }}>
      <div className={`pointer-events-none absolute inset-0 opacity-25 ${collection.pattern}`} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(0,0,0,0.55), transparent 65%), radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.35), transparent 60%)",
        }}
      />

      {/* HERO */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 pt-36 md:pt-40 pb-10 grid md:grid-cols-[1fr_auto] gap-10 md:gap-14 items-center">
        <div>
          <div className="flex items-center gap-4 mb-6">
            <Link
              to="/collections"
              className="text-[0.6rem] tracking-luxe uppercase text-foreground/60 hover:text-foreground transition-colors"
            >
              ← All Collections
            </Link>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <img src={collection.logo} alt="" className="h-10 md:h-12 w-auto opacity-90 crisp-img" />
            <span
              className="text-[0.65rem] tracking-[0.45em] uppercase"
              style={{ color: collection.accentVar }}
            >
              {collection.name} Collection
            </span>
          </div>
          <h1 className="font-serif text-7xl md:text-[8.5rem] leading-[0.95] tracking-tight">
            {collection.name}
          </h1>
          <p
            className="mt-5 font-serif text-2xl md:text-3xl"
            style={{ color: collection.accentVar }}
          >
            {collection.expression}
          </p>
          <p className="mt-3 font-serif italic text-lg md:text-xl text-foreground/80">
            {collection.tagline}
          </p>
        </div>

        <div className="hidden md:block relative w-56 lg:w-80 aspect-square">
          <div
            className="absolute inset-[-25%] pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, ${collection.bgVar} 0%, color-mix(in oklab, ${collection.bgVar} 70%, transparent) 35%, transparent 70%)`,
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
              src={collection.logo}
              alt={`${collection.name} emblem`}
              className="w-full h-full object-cover crisp-img"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>

      {/* INTRO + SIGNATURE */}
      <div className="relative z-10">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 pb-12 grid md:grid-cols-[1.4fr_1fr] gap-x-14 gap-y-10 items-start">
          <p className="font-serif text-2xl md:text-[1.65rem] leading-snug text-foreground/95 text-balance">
            {collection.intro}
          </p>
          <div className="flex flex-col gap-3">
            <p
              className="text-[0.6rem] tracking-[0.4em] uppercase mb-1"
              style={{ color: collection.accentVar }}
            >
              Signature
            </p>
            {collection.signature.map((s) => (
              <div key={s} className="flex items-center gap-3 text-sm text-foreground/85">
                <span
                  className="h-px w-6"
                  style={{ background: collection.accentVar, opacity: 0.6 }}
                />
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURED FLAVOURS */}
      <div className="relative z-10 border-t border-foreground/10">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 py-14 md:py-16">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <p
                className="text-[0.65rem] tracking-[0.4em] uppercase"
                style={{ color: collection.accentVar }}
              >
                Featured Flavours
              </p>
              <h2 className="mt-2 font-serif text-3xl md:text-4xl">
                Selected from the {collection.name} cellar
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {collection.featured.map((p) => (
              <FlavourCard
                key={p.name}
                flavour={p}
                collection={collection}
                selectedFormat={selectedFormat}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <a
              href="#all-flavours"
              className="group inline-flex items-center gap-3 px-8 py-3.5 border border-foreground/30 text-[0.7rem] tracking-luxe uppercase hover:border-gold hover:text-gold transition-all duration-500"
              style={{ color: collection.accentVar }}
            >
              Explore All {collection.name} Flavours
              <ArrowDown className="h-3.5 w-3.5 group-hover:translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* PHILOSOPHY */}
      <div className="relative z-10 border-t border-foreground/10">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 py-14 md:py-16 text-center">
          <p
            className="text-[0.65rem] tracking-[0.4em] uppercase mb-5"
            style={{ color: collection.accentVar }}
          >
            Philosophy
          </p>
          <p className="font-serif italic text-2xl md:text-3xl leading-snug text-foreground/95 text-balance">
            {collection.philosophy}
          </p>
        </div>
      </div>

      {/* FORMAT SELECTOR */}
      <div id="formats" className="relative z-10 border-t border-foreground/10 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 py-14 md:py-16">
          <div className="grid md:grid-cols-[1fr_auto] items-end gap-8 mb-6">
            <div>
              <p
                className="text-[0.65rem] tracking-[0.4em] uppercase"
                style={{ color: collection.accentVar }}
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
            {formats.map((f) => {
              const active = selectedFormat === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setSelectedFormat(f)}
                  data-selected={active}
                  aria-pressed={active}
                  className="chip-luxe px-5 py-4 text-sm tracking-luxe uppercase text-center inline-flex items-center justify-center gap-2"
                >
                  {active && <Check className="h-3.5 w-3.5" strokeWidth={2.5} />}
                  {f}
                </button>
              );
            })}
          </div>
          <p className="mt-4 text-xs text-foreground/60">
            Selected: <span style={{ color: collection.accentVar }}>{selectedFormat}</span> — included automatically in your enquiry.
          </p>
        </div>
      </div>

      {/* ALL FLAVOURS */}
      <div id="all-flavours" className="relative z-10 border-t border-foreground/10 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 py-14 md:py-16">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <p
                className="text-[0.65rem] tracking-[0.4em] uppercase"
                style={{ color: collection.accentVar }}
              >
                The Complete {collection.name} Cellar
              </p>
              <h2 className="mt-2 font-serif text-3xl md:text-4xl">
                All {collection.name} Flavours
              </h2>
            </div>
            <Link
              to="/contact"
              search={{ collection: collection.name, format: selectedFormat }}
              className="luxe-underline text-[0.7rem] tracking-luxe uppercase"
              style={{ color: collection.accentVar }}
            >
              Request the full catalogue
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {collection.flavours.map((p) => (
              <FlavourCard
                key={p.name}
                flavour={p}
                collection={collection}
                selectedFormat={selectedFormat}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CLOSING CTA */}
      <div className="relative z-10 border-t border-foreground/10">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 py-14 md:py-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-serif text-3xl md:text-4xl">{collection.closing}</p>
            <p
              className="mt-2 font-serif italic text-lg"
              style={{ color: collection.accentVar }}
            >
              {collection.name}.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/contact"
              search={{ collection: collection.name, format: selectedFormat }}
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

      {/* SISTER COLLECTIONS */}
      <div className="relative z-10 border-t border-foreground/10 bg-ink/40">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 py-14">
          <p className="text-[0.65rem] tracking-luxe uppercase text-gold mb-6 text-center">
            Continue Exploring
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {collections
              .filter((c) => c.slug !== collection.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  to={c.path}
                  className="card-luxe collection-card p-6 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <img src={c.logo} alt="" className="h-12 w-auto opacity-90 group-hover:brightness-110 transition crisp-img" />
                    <div>
                      <p className="font-serif text-xl group-hover:text-gold transition-colors">{c.name}</p>
                      <p className="text-[0.6rem] tracking-luxe uppercase text-gold/75">{c.expression}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-foreground/60 group-hover:text-gold group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FlavourCard({
  flavour,
  collection,
  selectedFormat,
}: {
  flavour: Flavour;
  collection: Collection;
  selectedFormat: string;
}) {
  return (
    <article className="card-luxe p-6 flex flex-col">
      <h4 className="font-serif text-2xl md:text-[1.5rem] leading-tight">
        {flavour.name}
      </h4>
      <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
        {flavour.notes}
      </p>
      <div className="mt-5">
        <p className="text-[0.55rem] tracking-[0.35em] uppercase mb-2 text-foreground/55">
          Available Formats
        </p>
        <div className="flex flex-wrap gap-1.5">
          {formats.map((f) => (
            <span
              key={f}
              className="text-[0.6rem] tracking-luxe uppercase px-2 py-1 border border-foreground/15 text-foreground/65"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
      <Link
        to="/contact"
        search={{ product: flavour.name, collection: collection.name, format: selectedFormat }}
        className="mt-6 inline-flex items-center justify-between text-[0.7rem] tracking-luxe uppercase hover:text-gold transition-colors group"
        style={{ color: collection.accentVar }}
      >
        Request Information
        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
      </Link>
    </article>
  );
}