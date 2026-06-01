import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "../components/SectionLabel";
import majlisImg from "../assets/collection-majlis.jpg";
import makhmalImg from "../assets/collection-makhmal.jpg";
import tarkibImg from "../assets/collection-tarkib.jpg";

export const Route = createFileRoute("/collections/")({
  head: () => ({
    meta: [
      { title: "Collections — RASA" },
      { name: "description", content: "Three houses, one discipline. Discover Majlis, Makhmal and Tarkib — the luxury tobacco collections of RASA." },
      { property: "og:title", content: "Collections — RASA" },
      { property: "og:description", content: "Majlis, Makhmal, Tarkib — three luxury tobacco collections." },
    ],
  }),
  component: Collections,
});

const list = [
  { slug: "majlis", name: "Majlis", arabic: "مَجْلِس", tag: "Rich. Bold. Authentic.", img: majlisImg, accent: "oklch(0.38 0.13 18)" },
  { slug: "makhmal", name: "Makhmal", arabic: "مَخْمَل", tag: "Smooth. Velvety. Refined.", img: makhmalImg, accent: "oklch(0.34 0.10 320)" },
  { slug: "tarkib", name: "Tarkib", arabic: "تَرْكِيب", tag: "Innovative. Experimental. Engineered.", img: tarkibImg, accent: "oklch(0.32 0.09 265)" },
] as const;

function Collections() {
  return (
    <>
      <section className="pt-40 pb-20 bg-ink text-center px-6">
        <SectionLabel className="justify-center"><span>The Tobacco Houses</span></SectionLabel>
        <h1 className="mt-6 font-serif text-6xl md:text-8xl">Collections</h1>
        <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
          Three distinct philosophies of smoke. Each a complete house unto itself.
        </p>
      </section>

      <section className="bg-ink pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 space-y-px">
          {list.map((c, i) => (
            <Link
              key={c.slug}
              to="/collections/$slug"
              params={{ slug: c.slug }}
              className={`group grid lg:grid-cols-2 gap-0 overflow-hidden ${i % 2 ? "lg:[direction:rtl]" : ""}`}
            >
              <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[520px] overflow-hidden [direction:ltr]">
                <img src={c.img} alt={c.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-105" loading="lazy" width={1024} height={1280} />
              </div>
              <div className="relative bg-surface p-10 lg:p-16 flex flex-col justify-center [direction:ltr]">
                <span className="block h-1 w-12 mb-8" style={{ background: c.accent }} />
                <p className="font-serif text-3xl text-gold-soft mb-3">{c.arabic}</p>
                <h2 className="font-serif text-5xl md:text-6xl">{c.name}</h2>
                <p className="mt-4 text-[0.7rem] tracking-luxe uppercase text-gold">{c.tag}</p>
                <p className="mt-8 text-muted-foreground leading-relaxed max-w-md">
                  Step into the {c.name} story — its philosophy, its flavours, its formats.
                </p>
                <span className="inline-flex items-center gap-2 mt-10 text-xs tracking-luxe uppercase text-foreground group-hover:text-gold transition-colors">
                  Enter {c.name} <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
