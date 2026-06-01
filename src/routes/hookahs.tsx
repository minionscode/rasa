import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionLabel } from "../components/SectionLabel";
import hookahLuxury from "../assets/hookah-luxury.jpg";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/hookahs")({
  head: () => ({
    meta: [
      { title: "Hookah Series — RASA" },
      { name: "description", content: "RASA hookah catalogue: Luxury and Classic series, available in portable, medium and large formats." },
      { property: "og:title", content: "Hookah Series — RASA" },
      { property: "og:description", content: "Luxury and Classic hookah series. Portable, medium and large formats." },
      { property: "og:image", content: hookahLuxury },
    ],
  }),
  component: Hookahs,
});

const luxury = [
  { size: "Portable", desc: "Compact yet uncompromising. Hand-finished. Travel-ready.", code: "L-01" },
  { size: "Medium", desc: "The everyday signature. Balanced silhouette, refined materials.", code: "L-02" },
  { size: "Large", desc: "A statement vessel for the gathering. Rare metals, deep draw.", code: "L-03" },
];

const classic = [
  { size: "Portable", desc: "Reliable, simple, elegant. For everyday rituals.", code: "C-01" },
  { size: "Medium", desc: "The trusted companion. Comfortable, dependable.", code: "C-02" },
  { size: "Large", desc: "Generous and inviting. Built for the long evening.", code: "C-03" },
];

function Card({ size, desc, code, tier }: { size: string; desc: string; code: string; tier: "luxury" | "classic" }) {
  return (
    <div className="group relative aspect-[4/5] overflow-hidden bg-surface border border-border/40 hover:border-gold/40 transition-all duration-700 hover-lift">
      <div className="absolute inset-0 bg-gradient-radial-glow opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
        <span className="text-[0.6rem] tracking-luxe text-gold/60">{code}</span>
        <span className="text-[0.6rem] tracking-luxe uppercase text-muted-foreground">{tier === "luxury" ? "Series I" : "Series II"}</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-8">
        <h3 className="font-serif text-3xl">{size}</h3>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function Hookahs() {
  return (
    <>
      <section className="relative min-h-[70vh] flex items-end pb-20 overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: `url(${hookahLuxury})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-40 w-full">
          <SectionLabel><span>The Vessels</span></SectionLabel>
          <h1 className="mt-6 font-serif text-6xl md:text-8xl">Hookah Series</h1>
          <p className="mt-6 text-muted-foreground max-w-xl">
            Two series, six configurations. Each crafted to complete the experience.
          </p>
        </div>
      </section>

      <section className="py-32 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <p className="text-[0.65rem] tracking-luxe uppercase text-gold/80">Series I</p>
              <h2 className="mt-3 font-serif text-5xl md:text-6xl">Luxury Hookah Series</h2>
              <p className="mt-4 text-muted-foreground max-w-xl">Premium finishes. Rare materials. Elevated design language.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {luxury.map((p) => <Card key={p.code} {...p} tier="luxury" />)}
          </div>
        </div>
      </section>

      <section className="py-32 bg-ink">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-12">
            <div>
              <p className="text-[0.65rem] tracking-luxe uppercase text-gold/80">Series II</p>
              <h2 className="mt-3 font-serif text-5xl md:text-6xl">Classic Hookah Series</h2>
              <p className="mt-4 text-muted-foreground max-w-xl">Reliable. Accessible. Elegant. Tuned for the Indian market.</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {classic.map((p) => <Card key={p.code} {...p} tier="classic" />)}
          </div>
        </div>
      </section>

      <section className="py-24 bg-background text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-serif text-4xl">Considering RASA for your lounge?</h2>
          <Link to="/contact" className="inline-flex items-center gap-3 mt-8 px-10 py-4 bg-gold text-primary-foreground text-xs tracking-luxe uppercase hover:bg-gold-soft transition-colors duration-500">
            Speak With Sales <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
