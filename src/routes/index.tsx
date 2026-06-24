import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import heroHookah from "@/assets/hero-hookah.jpg.asset.json";
import bandCopper from "@/assets/band-copper.jpg.asset.json";
import chapterMajlis from "@/assets/chapter-majlis.jpg.asset.json";
import chapterMakhmal from "@/assets/chapter-makhmal.jpg.asset.json";
import chapterTarkib from "@/assets/chapter-tarkib.jpg.asset.json";
import { CinematicSmoke } from "@/components/CinematicSmoke";
import { Reveal, RevealChild, RevealGroup } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { AnimatedWordmark } from "@/components/AnimatedWordmark";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RASA — Smoke, Perfected." },
      {
        name: "description",
        content:
          "RASA — a luxury hookah lifestyle house. Three collections. One discipline. Smoke, perfected.",
      },
      { property: "og:title", content: "RASA — Smoke, Perfected." },
      {
        property: "og:description",
        content:
          "A luxury hookah lifestyle house — Majlis, Makhmal, Tarkib. Smoke, perfected.",
      },
      { property: "og:image", content: heroHookah.url },
      { name: "twitter:image", content: heroHookah.url },
    ],
  }),
  component: Home,
});

type Chapter = {
  numeral: string;
  name: string;
  expression: string;
  oneLiner: string;
  body: string;
  image: string;
  path: "/collections/majlis" | "/collections/makhmal" | "/collections/tarkib";
  align: "left" | "right";
  tone: "burgundy" | "aubergine" | "midnight";
};

const chapters: Chapter[] = [
  {
    numeral: "I",
    name: "Majlis",
    expression: "Heritage",
    oneLiner: "Where evenings remember themselves.",
    body: "A tribute to gathering. Rooted in heritage, warmed by hospitality — the timeless character of an evening spent in good company.",
    image: chapterMajlis.url,
    path: "/collections/majlis",
    align: "right",
    tone: "burgundy",
  },
  {
    numeral: "II",
    name: "Makhmal",
    expression: "Refinement",
    oneLiner: "Velvet, made vapour.",
    body: "Quiet, composed, effortlessly elegant. Luxury without volume, refinement without effort — the confidence of simplicity executed well.",
    image: chapterMakhmal.url,
    path: "/collections/makhmal",
    align: "left",
    tone: "aubergine",
  },
  {
    numeral: "III",
    name: "Tarkib",
    expression: "Innovation",
    oneLiner: "Curiosity, bottled.",
    body: "Bold, modern, progressive. The House of RASA looking forward — composing flavours the way a perfumer composes an accord.",
    image: chapterTarkib.url,
    path: "/collections/tarkib",
    align: "right",
    tone: "midnight",
  },
];

function Home() {
  return (
    <>
      <Hero />
      <OriginBand />
      <ChaptersSection />
      <Invitation />
    </>
  );
}

/* ─────────────────────────────── HERO ─────────────────────────────── */

function Hero() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const titleBlur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(14px)"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.4, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);

  

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-ink"
    >
      {/* Cinematic background image */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY, scale: bgScale }}
      >
        <img
          src={heroHookah.url}
          alt=""
          width={1536}
          height={1024}
          className="h-full w-full object-cover object-center opacity-80"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/30 to-ink" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 55%, transparent 25%, oklch(0.06 0.004 60 / 0.85) 80%)",
          }}
        />
      </motion.div>

      {/* Golden smoke */}
      <CinematicSmoke intensity={0.9} tone="gold" />
      <div className="pointer-events-none absolute inset-0 grain opacity-60" />

      {/* MASSIVE RASA WORDMARK (logo PNG with shimmer + halo + float) */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <motion.div
          style={{
            y: titleY,
            scale: titleScale,
            filter: titleBlur,
            opacity: titleOpacity,
          }}
          className="text-center will-change-transform"
        >
          <AnimatedWordmark
            size="h-[18vw] max-h-[18rem] min-h-[7rem]"
            halo
            float
            shimmer={false}
            reveal={false}
          />


          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.4, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-8 h-px w-40 origin-center"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--gold) 50%, transparent)",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1.4, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-serif italic text-2xl md:text-4xl gradient-gold-text tracking-wide"
          >
            Smoke, Perfected.
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom CTAs and scroll cue */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-10 inset-x-0 z-10 flex flex-col items-center gap-6"
      >
        <Link
          to="/collections"
          className="group inline-flex items-center gap-3 text-[0.65rem] tracking-luxe uppercase text-foreground/90 hover:text-gold transition-colors duration-500"
        >
          <span className="h-px w-10 bg-gold/70 group-hover:w-16 transition-all duration-500" />
          Enter the House
          <span className="h-px w-10 bg-gold/70 group-hover:w-16 transition-all duration-500" />
        </Link>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="text-[0.55rem] tracking-wider-luxe uppercase text-foreground/40"
        >
          Scroll
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─────────────────────── ORIGIN BAND ─────────────────────── */

function OriginBand() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section ref={ref} className="relative h-[90vh] md:h-screen overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src={bandCopper.url}
          alt="Tobacco fields at golden hour"
          width={1536}
          height={1024}
          loading="lazy"
          className="h-[120%] w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/20 to-ink" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <RevealGroup className="max-w-3xl" stagger={0.18}>
          <RevealChild>
            <p className="text-[0.6rem] tracking-wider-luxe uppercase text-gold-soft/90">Origin</p>
          </RevealChild>
          <RevealChild>
            <h2 className="mt-6 font-serif italic font-light text-[clamp(2.5rem,7vw,6rem)] leading-[1.05] text-balance gradient-gold-text">
              Forged in copper.
            </h2>
          </RevealChild>
          <RevealChild>
            <h2 className="font-serif font-light text-[clamp(2.5rem,7vw,6rem)] leading-[1.05] text-balance text-foreground/75">
              Tempered in smoke.
            </h2>
          </RevealChild>
          <RevealChild>
            <p className="mt-10 max-w-md mx-auto text-sm md:text-base text-foreground/75 leading-relaxed">
              From ember to expression, every RASA blend is composed with the
              patience of an atelier and the precision of a jeweller.
            </p>
          </RevealChild>
        </RevealGroup>
      </div>
    </section>
  );
}

/* ─────────────────────── CHAPTERS ─────────────────────── */

function ChaptersSection() {
  return (
    <section className="relative bg-ink py-24 md:py-36 overflow-hidden">
      <CinematicSmoke intensity={0.35} tone="copper" className="opacity-50" />

      <div className="relative text-center max-w-2xl mx-auto px-6">
        <Reveal>
          <p className="text-[0.6rem] tracking-wider-luxe uppercase text-gold">
            The Collections
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-serif font-light text-4xl md:text-6xl text-balance leading-tight">
            Three expressions,
            <span className="block italic text-gold-soft">one house.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="luxe-divider max-w-[5rem] mx-auto mt-10" />
        </Reveal>
      </div>

      <div className="relative mt-24 md:mt-36 space-y-32 md:space-y-48">
        {chapters.map((c, i) => (
          <ChapterBlock key={c.name} chapter={c} index={i} />
        ))}
      </div>
    </section>
  );
}

function ChapterBlock({ chapter, index }: { chapter: Chapter; index: number }) {
  const reverse = chapter.align === "left";
  return (
    <article className="mx-auto max-w-7xl px-6 lg:px-10">
      <div
        className={`grid md:grid-cols-12 gap-10 md:gap-16 items-center ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* Image with parallax + reveal */}
        <Reveal className="md:col-span-7" y={48}>
          <Link to={chapter.path} className="group block relative overflow-hidden">
            <div className="aspect-[4/5] md:aspect-[5/6] overflow-hidden relative">
              <Parallax range={60} scale className="h-full w-full">
                <img
                  src={chapter.image}
                  alt={`${chapter.name} — ${chapter.expression}`}
                  width={1024}
                  height={1536}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
                />
              </Parallax>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <CinematicSmoke
                intensity={0.3}
                tone={chapter.tone}
                className="opacity-60 mix-blend-screen"
              />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-foreground">
                <span className="text-[0.55rem] tracking-wider-luxe uppercase text-gold-soft">
                  Collection {chapter.numeral}
                </span>
                <span className="inline-flex items-center gap-2 text-[0.6rem] tracking-luxe uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  Enter <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          </Link>
        </Reveal>

        {/* Text */}
        <RevealGroup className="md:col-span-5" stagger={0.1}>
          <RevealChild>
            <p className="text-[0.6rem] tracking-wider-luxe uppercase text-gold/80">
              {chapter.expression}
            </p>
          </RevealChild>
          <RevealChild>
            <h3 className="mt-4 font-serif font-light text-[clamp(2.75rem,8vw,6rem)] leading-[0.9] tracking-[-0.02em]">
              {chapter.name}
            </h3>
          </RevealChild>
          <RevealChild>
            <p className="mt-6 font-serif italic text-xl md:text-2xl text-gold-soft leading-snug">
              {chapter.oneLiner}
            </p>
          </RevealChild>
          <RevealChild>
            <p className="mt-6 text-foreground/75 leading-relaxed max-w-md font-light">
              {chapter.body}
            </p>
          </RevealChild>
          <RevealChild>
            <Link
              to={chapter.path}
              className="mt-10 group inline-flex items-center gap-3 text-[0.65rem] tracking-luxe uppercase text-foreground/90 hover:text-gold transition-colors duration-500"
            >
              <span className="h-px w-8 bg-gold/70 group-hover:w-14 transition-all duration-500" />
              Enter {chapter.name}
            </Link>
          </RevealChild>
          <RevealChild>
            <p className="mt-12 font-serif text-[0.7rem] tracking-wider-luxe uppercase text-foreground/30">
              {String(index + 1).padStart(2, "0")} · {String(chapters.length).padStart(2, "0")}
            </p>
          </RevealChild>
        </RevealGroup>
      </div>
    </article>
  );
}

/* ─────────────────────── INVITATION ─────────────────────── */

function Invitation() {
  return (
    <section className="relative bg-background py-28 md:py-40 overflow-hidden">
      <CinematicSmoke intensity={0.25} tone="copper" className="opacity-40" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, color-mix(in oklab, var(--gold) 14%, transparent), transparent 65%)",
        }}
      />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <RevealGroup stagger={0.12}>
          <RevealChild>
            <p className="text-[0.6rem] tracking-wider-luxe uppercase text-gold">
              Partner Programme
            </p>
          </RevealChild>
          <RevealChild>
            <h2 className="mt-6 font-serif font-light text-4xl md:text-6xl leading-[1.05] text-balance">
              Become a partner
              <span className="block italic text-gold-soft">of the House.</span>
            </h2>
          </RevealChild>
          <RevealChild>
            <p className="mt-8 text-foreground/80 leading-relaxed max-w-xl mx-auto">
              A curated network of distributors, lounges and boutiques. We grow
              with you — with structured support, exclusive access, and the
              discipline of a luxury house.
            </p>
          </RevealChild>
          <RevealChild>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/partners"
                className="group inline-flex items-center justify-center gap-3 px-12 py-4 bg-gold text-primary-foreground text-[0.65rem] tracking-luxe uppercase hover:bg-gold-soft transition-all duration-500"
              >
                Become a Partner
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-12 py-4 border border-foreground/25 text-[0.65rem] tracking-luxe uppercase hover:border-gold/70 hover:text-gold transition-all duration-500"
              >
                Wholesale Inquiry
              </Link>
            </div>
          </RevealChild>
        </RevealGroup>
      </div>
    </section>
  );
}
