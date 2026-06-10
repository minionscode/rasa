import { createFileRoute } from "@tanstack/react-router";
import aboutAtmosphere from "../assets/about-atmosphere.jpg";

export const Route = createFileRoute("/house-of-rasa")({
  head: () => ({
    meta: [
      { title: "The House of RASA — Smoke, Perfected." },
      {
        name: "description",
        content:
          "The House of RASA is built on craftsmanship, character, consistency, and refinement. Three expressions — Majlis, Makhmal, Tarkib — one house.",
      },
      { property: "og:title", content: "The House of RASA" },
      {
        property: "og:description",
        content:
          "Three expressions, one house. The philosophy behind Smoke, Perfected.",
      },
    ],
  }),
  component: HouseOfRasa,
});

const pillars = [
  { title: "Craftsmanship", body: "Every detail deserves attention." },
  { title: "Character", body: "Every experience should leave an impression." },
  { title: "Consistency", body: "Excellence should never be occasional." },
  { title: "Refinement", body: "The pursuit never ends." },
];

const expressions = [
  {
    name: "Majlis",
    tag: "The Expression of Heritage",
    body: "Inspired by timeless traditions, rich character, and enduring authenticity.",
    color: "var(--majlis)",
  },
  {
    name: "Makhmal",
    tag: "The Expression of Refinement",
    body: "Smooth, elegant, and composed. A celebration of sophistication and balance.",
    color: "var(--makhmal)",
  },
  {
    name: "Tarkib",
    tag: "The Expression of Innovation",
    body: "Curious, experimental, and forward-thinking. Crafted for those who seek something new.",
    color: "var(--tarkib)",
  },
];

function HouseOfRasa() {
  return (
    <>
      {/* SECTION 1 — Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url(${aboutAtmosphere})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />
        <div className="absolute inset-0 grain" />
        <div className="relative z-10 text-center px-6 animate-fade-up">
          <h1 className="font-serif text-6xl md:text-[9rem] leading-none text-balance">
            The House of RASA
          </h1>
          <div className="luxe-divider max-w-[8rem] mx-auto my-10" />
          <p className="font-serif italic text-2xl md:text-3xl text-gold-soft">
            Smoke, Perfected.
          </p>
        </div>
      </section>

      {/* SECTION 2 — Crafted Beyond the Product */}
      <section className="py-32 md:py-48 bg-background">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <p className="text-[0.65rem] tracking-luxe uppercase text-gold mb-10">I.</p>
          <h2 className="font-serif text-4xl md:text-6xl text-balance leading-[1.05]">
            Crafted Beyond the Product
          </h2>
          <div className="mt-16 space-y-7 text-lg leading-loose text-muted-foreground font-light">
            <p className="text-foreground/90">
              Some experiences stay with us long after they end.
            </p>
            <p>
              Not because of what was consumed, but because of how they made us feel.
            </p>
            <p className="font-serif italic text-2xl text-gold-soft leading-snug">
              The atmosphere. The company. The conversations. The moments that quietly
              become memories.
            </p>
            <div className="luxe-divider max-w-[6rem] my-12" />
            <p>RASA was created with a simple belief:</p>
            <p className="text-foreground/90 font-serif text-xl italic">
              That every detail contributes to the experience.
            </p>
            <p>
              From flavour to craftsmanship, from ritual to atmosphere, excellence is
              never accidental. It is the result of intention.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 — What Smoke, Perfected. Means */}
      <section className="py-32 md:py-40 bg-ink">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-[0.65rem] tracking-luxe uppercase text-gold mb-10">II.</p>
            <h2 className="font-serif text-4xl md:text-6xl text-balance leading-[1.05]">
              What <em className="not-italic text-gold">Smoke, Perfected.</em> Means
            </h2>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-px bg-border/30">
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className="bg-ink p-12 md:p-16 transition-colors duration-700 hover:bg-surface/40"
              >
                <span className="text-[0.6rem] tracking-luxe text-gold/60">
                  0{i + 1}
                </span>
                <h3 className="mt-6 font-serif text-3xl md:text-4xl">{p.title}</h3>
                <p className="mt-5 text-muted-foreground leading-relaxed max-w-sm">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — Three Expressions */}
      <section className="py-32 md:py-40 bg-background">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-[0.65rem] tracking-luxe uppercase text-gold mb-10">III.</p>
            <h2 className="font-serif text-4xl md:text-6xl text-balance leading-[1.05]">
              Three Expressions. One House.
            </h2>
          </div>

          <div className="mt-20 space-y-px">
            {expressions.map((e, i) => (
              <div
                key={e.name}
                className="grid md:grid-cols-12 gap-8 py-12 border-t border-border/40 last:border-b items-start"
              >
                <div className="md:col-span-1">
                  <span className="text-[0.6rem] tracking-luxe text-gold/60">
                    0{i + 1}
                  </span>
                </div>
                <div className="md:col-span-1">
                  <span
                    className="block h-12 w-px"
                    style={{ background: e.color }}
                  />
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-serif text-4xl md:text-5xl">{e.name}</h3>
                  <p className="mt-3 text-[0.65rem] tracking-luxe uppercase text-gold">
                    {e.tag}
                  </p>
                </div>
                <div className="md:col-span-6">
                  <p className="text-muted-foreground leading-loose">{e.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — Closing */}
      <section className="relative py-40 md:py-56 bg-ink overflow-hidden">
        <div className="absolute inset-0 smoke-bg opacity-50" />
        <div className="absolute inset-0 grain" />
        <div className="relative max-w-3xl mx-auto px-6 text-center space-y-8">
          <p className="font-serif text-3xl md:text-5xl text-balance leading-tight text-foreground/90">
            Luxury is not defined by excess.
          </p>
          <p className="font-serif text-3xl md:text-5xl text-balance leading-tight text-gold-soft italic">
            It is defined by attention.
          </p>
          <div className="luxe-divider max-w-[6rem] mx-auto" />
          <p className="text-muted-foreground tracking-wide leading-loose">
            Attention to detail. Attention to experience. Attention to what matters.
          </p>
          <p className="font-serif text-2xl md:text-3xl tracking-[0.15em] text-gold mt-10">
            Smoke, Perfected.
          </p>
        </div>
      </section>
    </>
  );
}
