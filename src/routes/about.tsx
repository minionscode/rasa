import { createFileRoute } from "@tanstack/react-router";
import { SectionLabel } from "../components/SectionLabel";
import aboutAtmosphere from "../assets/about-atmosphere.jpg";
import heroSmoke from "../assets/hero-smoke.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "House of RASA — Our Story" },
      { name: "description", content: "The story of RASA: a luxury hookah house uniting Arabic heritage, modern craftsmanship and the discipline of perfected smoke." },
      { property: "og:title", content: "House of RASA — Our Story" },
      { property: "og:description", content: "Heritage. Craftsmanship. Modern luxury. The story of RASA." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url(${aboutAtmosphere})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink" />
        <div className="relative z-10 text-center px-6 animate-fade-up">
          <SectionLabel className="justify-center"><span>The House</span></SectionLabel>
          <h1 className="mt-6 font-serif text-6xl md:text-8xl text-balance">House of RASA</h1>
          <p className="mt-6 font-serif italic text-2xl text-gold-soft">Smoke, Perfected.</p>
        </div>
      </section>

      <section className="py-32 bg-background">
        <div className="mx-auto max-w-3xl px-6 space-y-12">
          <div className="space-y-6 text-lg leading-relaxed text-foreground/90 font-light animate-fade-up">
            <p>
              RASA was born of a single conviction — that smoke, when treated with reverence,
              becomes ritual.
            </p>
            <p className="text-muted-foreground text-base leading-loose">
              In the Arabic-speaking world, the word <em className="text-gold not-italic">rasa</em> evokes
              the act of <em className="text-gold not-italic">settling</em> — of grounding, anchoring, of
              presence. In Sanskrit, it speaks of essence and taste — of <em className="text-gold not-italic">flavour</em> in
              its truest, most spiritual form. RASA is the meeting of these worlds: heritage and modernity,
              the Gulf and the Subcontinent, ceremony and design.
            </p>
          </div>

          <div className="luxe-divider" />

          <div className="grid md:grid-cols-2 gap-12 text-sm leading-relaxed text-muted-foreground">
            <div>
              <h3 className="font-serif text-2xl text-foreground mb-4">Craftsmanship</h3>
              <p>
                Every blend is composed by hand, in small batches, by master blenders who
                understand that perfection is the slow accumulation of small disciplines.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-2xl text-foreground mb-4">Tradition</h3>
              <p>
                Our roots are in the majlis — the gathering room, the long evening, the
                hospitality that defines a culture. We honour this lineage in every detail.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-2xl text-foreground mb-4">Innovation</h3>
              <p>
                Tradition is not preservation; it is reinterpretation. Our Tarkib collection,
                our materials, our packaging — each is engineered for the contemporary connoisseur.
              </p>
            </div>
            <div>
              <h3 className="font-serif text-2xl text-foreground mb-4">Luxury</h3>
              <p>
                Luxury is restraint. It is the absence of excess. Every RASA object is composed
                with this principle — quiet, considered, complete.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-32 bg-ink overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${heroSmoke})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-balance">
            A house, not a brand. A ritual, not a product.
          </h2>
          <p className="mt-6 text-muted-foreground leading-loose">
            We do not sell tobacco. We compose moments — the long exhale at the end of a day,
            the gathering of friends, the silence shared with a single companion.
          </p>
        </div>
      </section>
    </>
  );
}
