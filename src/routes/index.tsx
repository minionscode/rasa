import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import rasaLogo from "@/assets/rasa-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RASA — Smoke, Perfected." },
      {
        name: "description",
        content:
          "RASA — a luxury hookah lifestyle house built on craftsmanship, character, and refinement.",
      },
      { property: "og:title", content: "RASA — Smoke, Perfected." },
      {
        property: "og:description",
        content: "A luxury hookah lifestyle house built on craftsmanship, character, and refinement.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink">
      {/* Smoke field — monochrome only */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 smoke-bg opacity-40" />
        <div
          className="absolute -inset-[20%] opacity-50 animate-smoke"
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, rgba(255,255,255,0.05), transparent 55%), radial-gradient(ellipse at 70% 60%, rgba(255,255,255,0.04), transparent 60%)",
          }}
        />
        <div className="absolute inset-0 grain" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1 className="animate-fade-up flex justify-center">
          <img src={rasaLogo.url} alt="RASA — Smoke, Perfected." className="h-40 md:h-64 w-auto" />
        </h1>
        <div className="animate-fade-up delay-200 mt-8 luxe-divider max-w-[8rem] mx-auto" />
        <p className="animate-fade-up delay-300 mt-8 font-serif italic text-2xl md:text-3xl text-gold-soft">
          Smoke, Perfected.
        </p>
        <p className="animate-fade-up delay-400 mt-8 text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          A luxury hookah lifestyle house built on craftsmanship, character, and refinement.
        </p>

        <div className="animate-fade-up delay-500 mt-14 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/partners"
            className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-gold text-primary-foreground text-[0.7rem] tracking-luxe uppercase hover:bg-gold-soft transition-all duration-500"
          >
            Contact Sales Team
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/collections"
            className="inline-flex items-center justify-center px-10 py-4 border border-foreground/20 text-foreground text-[0.7rem] tracking-luxe uppercase hover:border-gold/60 hover:text-gold transition-all duration-500"
          >
            Explore Collections
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-fade-in delay-700">
        <span className="text-[0.6rem] tracking-luxe text-muted-foreground uppercase">Scroll</span>
        <span className="block w-px h-12 bg-gradient-to-b from-gold/60 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
