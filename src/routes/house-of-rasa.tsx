import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import aboutAtmosphere from "../assets/about-atmosphere.jpg";
import { CinematicSmoke } from "@/components/CinematicSmoke";
import { Reveal, RevealChild, RevealGroup } from "@/components/motion/Reveal";

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
      <HeroBlock />

      {/* SECTION 2 — Crafted Beyond the Product */}
      <section className="py-24 md:py-32 bg-background relative overflow-hidden">
        <CinematicSmoke intensity={0.3} tone="copper" className="opacity-50" />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-10 grid md:grid-cols-[1fr_1fr] gap-12 lg:gap-16 items-center">
          <RevealGroup stagger={0.12}>
            <RevealChild>
              <p className="text-[0.65rem] tracking-wider-luxe uppercase text-gold mb-6">I.</p>
            </RevealChild>
            <RevealChild>
              <h2 className="font-serif font-light text-4xl md:text-6xl text-balance leading-[1.02]">
                Crafted Beyond
                <span className="block italic text-gold-soft">the Product.</span>
              </h2>
            </RevealChild>
            <RevealChild>
              <div className="mt-8 space-y-5 text-base md:text-lg leading-relaxed text-muted-foreground font-light max-w-md">
                <p className="text-foreground/90">
                  Some experiences stay with us long after they end — not because of
                  what was consumed, but because of how they made us feel.
                </p>
                <p className="font-serif italic text-xl md:text-2xl text-gold-soft leading-snug">
                  The atmosphere. The company. The conversations.
                </p>
                <p>
                  From flavour to craftsmanship, from ritual to atmosphere, excellence
                  is never accidental. It is the result of intention.
                </p>
              </div>
            </RevealChild>
          </RevealGroup>

          <Reveal y={60}>
            <div className="relative aspect-[4/5] overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${aboutAtmosphere})` }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
              <CinematicSmoke
                intensity={0.4}
                tone="copper"
                className="opacity-60 mix-blend-screen"
              />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[0.6rem] tracking-wider-luxe uppercase text-gold/90">
                  An Atelier of Atmosphere
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 3 — What Smoke, Perfected. Means */}
      <section className="py-24 md:py-32 bg-ink relative overflow-hidden">
        <CinematicSmoke intensity={0.25} tone="copper" className="opacity-40" />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
          <RevealGroup className="max-w-2xl" stagger={0.1}>
            <RevealChild>
              <p className="text-[0.65rem] tracking-wider-luxe uppercase text-gold mb-6">II.</p>
            </RevealChild>
            <RevealChild>
              <h2 className="font-serif font-light text-4xl md:text-6xl text-balance leading-[1.02]">
                What <em className="not-italic text-gold-soft italic">Smoke, Perfected.</em> Means
              </h2>
            </RevealChild>
          </RevealGroup>

          <RevealGroup
            className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-px bg-border/30"
            stagger={0.1}
          >
            {pillars.map((p, i) => (
              <RevealChild key={p.title}>
                <div className="group bg-ink p-10 md:p-12 transition-all duration-700 hover:bg-surface/40 h-full">
                  <span className="text-[0.6rem] tracking-wider-luxe text-gold/60 group-hover:text-gold transition-colors">
                    0{i + 1}
                  </span>
                  <h3 className="mt-5 font-serif font-light text-2xl md:text-4xl group-hover:text-gold-soft transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-muted-foreground leading-relaxed max-w-sm">{p.body}</p>
                  <div className="mt-5 h-px w-10 bg-gold/40 group-hover:w-20 group-hover:bg-gold transition-all duration-500" />
                </div>
              </RevealChild>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* SECTION 4 — Three Expressions */}
      <section className="py-24 md:py-32 bg-background relative overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
          <RevealGroup className="max-w-2xl" stagger={0.1}>
            <RevealChild>
              <p className="text-[0.65rem] tracking-wider-luxe uppercase text-gold mb-6">III.</p>
            </RevealChild>
            <RevealChild>
              <h2 className="font-serif font-light text-4xl md:text-6xl text-balance leading-[1.02]">
                Three Expressions.
                <span className="block italic text-gold-soft">One House.</span>
              </h2>
            </RevealChild>
          </RevealGroup>

          <RevealGroup className="mt-16 space-y-px" stagger={0.08}>
            {expressions.map((e) => (
              <RevealChild key={e.name}>
                <div className="grid md:grid-cols-12 gap-8 py-10 border-t border-border/40 last:border-b items-center group hover:bg-surface/20 transition-colors duration-500">
                  <div className="md:col-span-1">
                    <span
                      className="block h-12 w-px transition-all duration-700 group-hover:h-20"
                      style={{ background: e.color }}
                    />
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="font-serif font-light text-4xl md:text-6xl group-hover:text-gold-soft transition-colors">
                      {e.name}
                    </h3>
                    <p className="mt-3 text-[0.65rem] tracking-wider-luxe uppercase text-gold">
                      {e.tag}
                    </p>
                  </div>
                  <div className="md:col-span-7">
                    <p className="text-muted-foreground leading-relaxed">{e.body}</p>
                  </div>
                </div>
              </RevealChild>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* SECTION 5 — Closing */}
      <section className="relative py-28 md:py-40 bg-ink overflow-hidden">
        <CinematicSmoke intensity={0.6} tone="copper" />
        <div className="absolute inset-0 grain opacity-60" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <RevealGroup stagger={0.18}>
            <RevealChild>
              <p className="font-serif font-light text-3xl md:text-6xl text-balance leading-tight text-foreground/90">
                Luxury is not defined by excess.
              </p>
            </RevealChild>
            <RevealChild>
              <p className="font-serif italic text-3xl md:text-6xl text-balance leading-tight text-gold-soft">
                It is defined by attention.
              </p>
            </RevealChild>
            <RevealChild>
              <div className="luxe-divider max-w-[6rem] mx-auto my-10" />
            </RevealChild>
            <RevealChild>
              <p className="text-muted-foreground tracking-wide leading-relaxed">
                Attention to detail. Attention to experience. Attention to what matters.
              </p>
            </RevealChild>
            <RevealChild>
              <p className="font-serif text-2xl md:text-4xl tracking-[0.15em] text-gold mt-10">
                Smoke, Perfected.
              </p>
            </RevealChild>
          </RevealGroup>
        </div>
      </section>
    </>
  );
}

function HeroBlock() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 0.4, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);

  return (
    <section ref={ref} className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-ink">
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <div
          className="h-full w-full bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url(${aboutAtmosphere})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/40 to-ink" />
      </motion.div>
      <CinematicSmoke intensity={0.85} tone="copper" />
      <div className="absolute inset-0 grain opacity-60" />

      <motion.div style={{ y: titleY, opacity: titleOpacity }} className="relative z-10 text-center px-6 pt-24">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[0.6rem] tracking-wider-luxe uppercase text-gold/80 mb-6"
        >
          The Philosophy
        </motion.p>
        <motion.h1
          className="font-serif font-light leading-[0.9] tracking-[-0.02em]"
          style={{ fontSize: "clamp(3.5rem, 11vw, 10rem)" }}
          initial={{ opacity: 0, y: 60, filter: "blur(20px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          The House
          <span className="block italic text-gold-soft">of RASA.</span>
        </motion.h1>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="luxe-divider max-w-[8rem] mx-auto my-8 origin-center"
        />
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          className="font-serif italic text-2xl md:text-3xl text-gold-soft"
        >
          Smoke, Perfected.
        </motion.p>
      </motion.div>
    </section>
  );
}
