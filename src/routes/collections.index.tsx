import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { collections } from "@/data/collections";

export const Route = createFileRoute("/collections/")({
  head: () => ({
    meta: [
      { title: "Collections — Three Expressions, One House | RASA" },
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

function Collections() {
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

      {/* COLLECTION OVERVIEW CARDS */}
      <section className="relative bg-background py-16 md:py-20 border-t border-border/40">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid md:grid-cols-3 gap-6">
            {collections.map((c) => {
              const secondaryVar = `var(--${c.slug}-secondary)`;
              const cardBg = `radial-gradient(ellipse at 50% 0%, ${secondaryVar} 0%, transparent 60%), linear-gradient(180deg, color-mix(in oklab, ${c.bgVar} 75%, var(--ink)) 0%, var(--ink) 100%)`;
              return (
                <Link
                  key={c.slug}
                  to="/collections/$slug"
                  params={{ slug: c.slug }}
                  className="relative group overflow-hidden border border-foreground/10 hover:border-gold/40 transition-all duration-500 hover:-translate-y-1.5"
                  style={{ background: cardBg }}
                >
                  <div
                    className={`pointer-events-none absolute inset-0 opacity-20 ${c.pattern}`}
                  />
                  <div className="relative p-8 md:p-10 flex flex-col items-center text-center min-h-[24rem]">
                    <div className="aspect-square w-full max-w-[14rem] flex items-center justify-center mb-6">
                      <img
                        src={c.logo}
                        alt={c.name}
                        className="max-h-40 w-auto opacity-95 group-hover:scale-105 group-hover:brightness-110 transition-all duration-700 crisp-img"
                      />
                    </div>
                    <p
                      className="text-[0.6rem] tracking-[0.4em] uppercase mb-3"
                      style={{ color: c.accentVar }}
                    >
                      {c.label}
                    </p>
                    <h2 className="font-serif text-4xl md:text-5xl group-hover:text-gold-soft transition-colors">
                      {c.name}
                    </h2>
                    <p
                      className="mt-3 font-serif text-base md:text-lg"
                      style={{ color: c.accentVar }}
                    >
                      {c.expression}
                    </p>
                    <p className="mt-2 font-serif italic text-sm text-foreground/70">
                      {c.tagline}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[0.7rem] tracking-luxe uppercase text-foreground/85 group-hover:text-gold transition-colors">
                      Explore {c.name}{" "}
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-16 text-center max-w-2xl mx-auto">
            <p className="text-foreground/70 leading-relaxed">
              Three distinct universes — one disciplined house. Each collection is curated for
              hospitality, retail, and wholesale partners worldwide.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-gold text-primary-foreground text-[0.7rem] tracking-luxe uppercase hover:bg-gold-soft transition-colors duration-500"
              >
                Request Catalogue <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/partners"
                className="inline-flex items-center justify-center px-8 py-3.5 border border-foreground/30 text-[0.7rem] tracking-luxe uppercase hover:border-gold hover:text-gold transition-all duration-500"
              >
                Become a Partner
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
