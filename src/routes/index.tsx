import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroHookah from "@/assets/hero-hookah.jpg.asset.json";
import bandEarth from "@/assets/band-earth.jpg.asset.json";
import chapterMajlis from "@/assets/chapter-majlis.jpg.asset.json";
import chapterMakhmal from "@/assets/chapter-makhmal.jpg.asset.json";
import chapterTarkib from "@/assets/chapter-tarkib.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RASA — Smoke, Perfected." },
      {
        name: "description",
        content:
          "RASA — a luxury hookah lifestyle house and premium distribution partner. Three collections. One discipline. Smoke, perfected.",
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
  },
];

function Home() {
  return (
    <>
      {/* ── ACT I · OPENING ──────────────────────────────── */}
      <section className="relative min-h-screen flex items-end justify-center overflow-hidden bg-ink">
        <img
          src={heroHookah.url}
          alt=""
          width={1536}
          height={1024}
          className="absolute inset-0 h-full w-full object-cover object-center opacity-90"
          fetchPriority="high"
        />
        {/* Cinematic fade */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/10 to-ink" />
        <div className="pointer-events-none absolute inset-0 grain opacity-60" />

        <div className="relative z-10 text-center px-6 max-w-4xl pb-[14vh] md:pb-[16vh]">
          <p className="animate-fade-up text-[0.6rem] tracking-wider-luxe uppercase text-gold/80">
            The House of RASA
          </p>
          <h1
            className="animate-fade-up delay-200 mt-6 font-serif font-light text-[clamp(3.5rem,11vw,9rem)] leading-[0.95] tracking-[-0.02em] text-foreground"
          >
            Smoke,
            <span className="block italic text-gold-soft">Perfected.</span>
          </h1>
          <div className="animate-fade-up delay-300 luxe-divider max-w-[6rem] mx-auto mt-10" />
          <p className="animate-fade-up delay-400 mt-8 text-sm md:text-base text-foreground/75 max-w-md mx-auto leading-relaxed font-light">
            A luxury hookah lifestyle house — built on craftsmanship,
            character, and refinement.
          </p>
          <div className="animate-fade-up delay-500 mt-12">
            <Link
              to="/collections"
              className="group inline-flex items-center gap-3 text-[0.65rem] tracking-luxe uppercase text-foreground/90 hover:text-gold transition-colors duration-500"
            >
              <span className="h-px w-10 bg-gold/70 group-hover:w-16 transition-all duration-500" />
              Enter the House
            </Link>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[0.55rem] tracking-wider-luxe uppercase text-foreground/40 animate-fade-in delay-700">
          Scroll
        </div>
      </section>

      {/* ── ACT II · BORN FROM THE EARTH ──────────────────── */}
      <section className="relative h-[80vh] md:h-screen overflow-hidden">
        <img
          src={bandEarth.url}
          alt="Tobacco fields at golden hour"
          width={1536}
          height={1024}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-transparent to-ink/80" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <p className="text-[0.6rem] tracking-wider-luxe uppercase text-gold-soft/90">
            Origin
          </p>
          <h2 className="mt-6 font-serif italic font-light text-[clamp(2.25rem,6vw,5rem)] leading-[1.05] text-balance text-foreground max-w-3xl">
            Born from the earth.
            <span className="block not-italic text-foreground/70">
              Composed in the house.
            </span>
          </h2>
          <p className="mt-8 max-w-md text-sm md:text-base text-foreground/75 leading-relaxed">
            Every RASA leaf begins in a field, ends in a moment. We tend the
            distance between them with discipline.
          </p>
        </div>
      </section>

      {/* ── ACT III · THE THREE EXPRESSIONS ───────────────── */}
      <section className="relative bg-ink py-24 md:py-32">
        <div className="text-center max-w-2xl mx-auto px-6">
          <p className="text-[0.6rem] tracking-wider-luxe uppercase text-gold">
            The Collections
          </p>
          <h2 className="mt-6 font-serif font-light text-4xl md:text-6xl text-balance leading-tight">
            Three expressions,
            <span className="block italic text-gold-soft">one house.</span>
          </h2>
          <div className="luxe-divider max-w-[5rem] mx-auto mt-10" />
        </div>

        <div className="mt-20 md:mt-28 space-y-24 md:space-y-40">
          {chapters.map((c, i) => (
            <ChapterBlock key={c.name} chapter={c} index={i} />
          ))}
        </div>
      </section>

      {/* ── ACT IV · INVITATION ───────────────────────────── */}
      <section className="relative bg-background py-28 md:py-36 overflow-hidden">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, color-mix(in oklab, var(--gold) 14%, transparent), transparent 65%)",
          }}
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <p className="text-[0.6rem] tracking-wider-luxe uppercase text-gold">
            Partner Programme
          </p>
          <h2 className="mt-6 font-serif font-light text-4xl md:text-6xl leading-[1.05] text-balance">
            Become a partner
            <span className="block italic text-gold-soft">of the House.</span>
          </h2>
          <p className="mt-8 text-foreground/80 leading-relaxed max-w-xl mx-auto">
            A curated network of distributors, lounges and boutiques. We grow
            with you — with structured support, exclusive access, and the
            discipline of a luxury house.
          </p>
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
        </div>
      </section>
    </>
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
        {/* Image */}
        <div className="md:col-span-7 relative group">
          <Link to={chapter.path} className="block relative overflow-hidden">
            <div className="aspect-[4/5] md:aspect-[5/6] overflow-hidden">
              <img
                src={chapter.image}
                alt={`${chapter.name} — ${chapter.expression}`}
                width={1024}
                height={1536}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-foreground">
              <span className="text-[0.55rem] tracking-wider-luxe uppercase text-gold-soft">
                Collection {chapter.numeral}
              </span>
              <span className="inline-flex items-center gap-2 text-[0.6rem] tracking-luxe uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                Enter <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        </div>

        {/* Text */}
        <div className="md:col-span-5">
          <p className="text-[0.6rem] tracking-wider-luxe uppercase text-gold/80">
            {chapter.expression}
          </p>
          <h3 className="mt-4 font-serif font-light text-[clamp(2.75rem,7vw,5rem)] leading-[0.95] tracking-[-0.01em]">
            {chapter.name}
          </h3>
          <p className="mt-6 font-serif italic text-xl md:text-2xl text-gold-soft leading-snug">
            {chapter.oneLiner}
          </p>
          <p className="mt-6 text-foreground/75 leading-relaxed max-w-md font-light">
            {chapter.body}
          </p>
          <Link
            to={chapter.path}
            className="mt-10 group inline-flex items-center gap-3 text-[0.65rem] tracking-luxe uppercase text-foreground/90 hover:text-gold transition-colors duration-500"
          >
            <span className="h-px w-8 bg-gold/70 group-hover:w-14 transition-all duration-500" />
            Enter {chapter.name}
          </Link>
          <p className="mt-12 font-serif text-[0.7rem] tracking-wider-luxe uppercase text-foreground/30">
            {String(index + 1).padStart(2, "0")} · {String(chapters.length).padStart(2, "0")}
          </p>
        </div>
      </div>
    </article>
  );
}
