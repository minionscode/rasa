import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionLabel } from "../components/SectionLabel";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/accessories")({
  head: () => ({
    meta: [
      { title: "Accessories — RASA" },
      { name: "description", content: "The RASA atelier of accessories: bowls, hoses, heat management, cleaning, travel and replacement parts." },
      { property: "og:title", content: "Accessories — RASA" },
      { property: "og:description", content: "Every detail matters. The complete RASA atelier." },
    ],
  }),
  component: Accessories,
});

const categories = [
  { name: "Bowls", count: "Phunnel · Vortex · Egyptian", code: "01" },
  { name: "Hoses", count: "Silicone · Leather · Heritage", code: "02" },
  { name: "Heat Management", count: "HMD · Foil · Wind Covers", code: "03" },
  { name: "Cleaning", count: "Brushes · Solutions · Tools", code: "04" },
  { name: "Travel", count: "Cases · Sleeves · Kits", code: "05" },
  { name: "Replacement Parts", count: "Grommets · Stems · Valves", code: "06" },
  { name: "Mouth Tips", count: "Single-use · Reusable · Custom", code: "07" },
  { name: "Lifestyle", count: "Trays · Ashtrays · Accessories", code: "08" },
];

function Accessories() {
  return (
    <>
      <section className="pt-40 pb-20 bg-ink text-center px-6">
        <SectionLabel className="justify-center"><span>The Atelier</span></SectionLabel>
        <h1 className="mt-6 font-serif text-6xl md:text-8xl">Every Detail Matters</h1>
        <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
          From bowls to brushes — a complete atelier of accessories,
          each designed to elevate the ritual.
        </p>
      </section>

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border/40">
            {categories.map((c) => (
              <div
                key={c.name}
                className="group bg-background p-10 aspect-square flex flex-col justify-between hover:bg-surface transition-all duration-700 cursor-pointer"
              >
                <div>
                  <span className="text-[0.6rem] tracking-luxe text-gold/60">{c.code}</span>
                </div>
                <div>
                  <h3 className="font-serif text-3xl group-hover:text-gold transition-colors">{c.name}</h3>
                  <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{c.count}</p>
                  <span className="inline-flex items-center gap-2 mt-6 text-[0.65rem] tracking-luxe uppercase text-muted-foreground group-hover:text-gold transition-colors">
                    Catalogue <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-ink text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-serif text-4xl md:text-5xl text-balance">
            Wholesale catalogue available on request.
          </h2>
          <Link to="/contact" className="inline-flex items-center gap-3 mt-10 px-10 py-4 bg-gold text-primary-foreground text-xs tracking-luxe uppercase hover:bg-gold-soft transition-colors duration-500">
            Request Catalogue <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
