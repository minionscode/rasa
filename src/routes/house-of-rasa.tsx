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
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-ink">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url(${aboutAtmosphere})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />
        <div
          className="absolute -inset-[15%] opacity-40 animate-smoke pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, rgba(211,161,136,0.10), transparent 55%), radial-gradient(ellipse at 70% 60%, rgba(255,255,255,0.04), transparent 60%)",
          }}
        />
        <div className="absolute inset-0 grain" />
        <div className="relative z-10 text-center px-6 pt-24 animate-fade-up">
          <h1 className="font-serif text-6xl md:text-[8rem] leading-none text-balance">
            The House of RASA
          </h1>
          <div className="luxe-divider max-w-[8rem] mx-auto my-8" />
          <p className="font-serif italic text-2xl md:text-3xl text-gold-soft">
            Smoke, Perfected.
          </p>
        </div>
      </section>

      {/* SECTION 2 — Crafted Beyond the Product (two-column editorial) */}
      <section className="py-20 md:py-28 bg-background relative overflow-hidden">
        <div
          className="absolute -inset-[10%] opacity-25 animate-smoke pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 80% 30%, rgba(211,161,136,0.10), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-10 grid md:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
          <div className="animate-fade-up">
            <p className="text-[0.65rem] tracking-luxe uppercase text-gold mb-6">I.</p>
            <h2 className="font-serif text-4xl md:text-5xl text-balance leading-[1.05]">
              Crafted Beyond the Product
            </h2>
            <div className="mt-8 space-y-5 text-base md:text-lg leading-relaxed text-muted-foreground font-light">
              <p className="text-foreground/90">
                Some experiences stay with us long after they end — not because of
                what was consumed, but because of how they made us feel.
              </p>
              <p className="font-serif italic text-xl md:text-2xl text-gold-soft leading-snug">
                The atmosphere. The company. The conversations. The moments that
                quietly become memories.
              </p>
              <p>
                From flavour to craftsmanship, from ritual to atmosphere, excellence
                is never accidental. It is the result of intention.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
              style={{ backgroundImage: `url(${aboutAtmosphere})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
            <div
              className="absolute -inset-[10%] opacity-50 animate-smoke pointer-events-none mix-blend-screen"
              style={{
                background:
                  "radial-gradient(ellipse at 30% 70%, rgba(211,161,136,0.15), transparent 55%)",
              }}
            />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="text-[0.6rem] tracking-luxe uppercase text-gold/90">An Atelier of Atmosphere</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — What Smoke, Perfected. Means */}
      <section className="py-20 md:py-24 bg-ink relative overflow-hidden">
        <div
          className="absolute -inset-[15%] opacity-25 animate-smoke pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 20% 40%, rgba(211,161,136,0.08), transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(255,255,255,0.03), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-[0.65rem] tracking-luxe uppercase text-gold mb-6">II.</p>
            <h2 className="font-serif text-4xl md:text-5xl text-balance leading-[1.05]">
              What <em className="not-italic text-gold">Smoke, Perfected.</em> Means
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-px bg-border/30">
            {pillars.map((p, i) => (
              <div
                key={p.title}
                className="group bg-ink p-10 md:p-12 transition-all duration-700 hover:bg-surface/40"
              >
                <span className="text-[0.6rem] tracking-luxe text-gold/60 group-hover:text-gold transition-colors">
                  0{i + 1}
                </span>
                <h3 className="mt-5 font-serif text-2xl md:text-3xl group-hover:text-gold-soft transition-colors">{p.title}</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed max-w-sm">
                  {p.body}
                </p>
                <div className="mt-5 h-px w-10 bg-gold/40 group-hover:w-20 group-hover:bg-gold transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — Three Expressions */}
      <section className="py-20 md:py-24 bg-background">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-[0.65rem] tracking-luxe uppercase text-gold mb-6">III.</p>
            <h2 className="font-serif text-4xl md:text-5xl text-balance leading-[1.05]">
              Three Expressions. One House.
            </h2>
          </div>

          <div className="mt-12 space-y-px">
            {expressions.map((e) => (
              <div
                key={e.name}
                className="grid md:grid-cols-12 gap-8 py-10 border-t border-border/40 last:border-b items-center group hover:bg-surface/20 transition-colors duration-500"
              >
                <div className="md:col-span-1">
                  <span
                    className="block h-12 w-px"
                    style={{ background: e.color }}
                  />
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-serif text-4xl md:text-5xl group-hover:text-gold-soft transition-colors">{e.name}</h3>
                  <p className="mt-3 text-[0.65rem] tracking-luxe uppercase text-gold">
                    {e.tag}
                  </p>
                </div>
                <div className="md:col-span-7">
                  <p className="text-muted-foreground leading-relaxed">{e.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — Closing */}
      <section className="relative py-24 md:py-32 bg-ink overflow-hidden">
        <div className="absolute inset-0 smoke-bg opacity-50" />
        <div
          className="absolute -inset-[15%] opacity-40 animate-smoke pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(211,161,136,0.10), transparent 55%)",
          }}
        />
        <div className="absolute inset-0 grain" />
        <div className="relative max-w-3xl mx-auto px-6 text-center space-y-6">
          <p className="font-serif text-3xl md:text-5xl text-balance leading-tight text-foreground/90">
            Luxury is not defined by excess.
          </p>
          <p className="font-serif text-3xl md:text-5xl text-balance leading-tight text-gold-soft italic">
            It is defined by attention.
          </p>
          <div className="luxe-divider max-w-[6rem] mx-auto" />
          <p className="text-muted-foreground tracking-wide leading-relaxed">
            Attention to detail. Attention to experience. Attention to what matters.
          </p>
          <p className="font-serif text-2xl md:text-3xl tracking-[0.15em] text-gold mt-8">
            Smoke, Perfected.
          </p>
        </div>
      </section>
    </>
  );
}
