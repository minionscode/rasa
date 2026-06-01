import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "../components/SectionLabel";
import majlisImg from "../assets/collection-majlis.jpg";
import makhmalImg from "../assets/collection-makhmal.jpg";
import tarkibImg from "../assets/collection-tarkib.jpg";

type CollectionSlug = "majlis" | "makhmal" | "tarkib";

interface CollectionData {
  name: string;
  arabic: string;
  tag: string;
  accent: string;
  accentSoft: string;
  img: string;
  story: string;
  philosophy: string;
  flavours: string[];
  formats: string[];
}

const data: Record<CollectionSlug, CollectionData> = {
  majlis: {
    name: "Majlis",
    arabic: "مَجْلِس",
    tag: "Rich. Bold. Authentic.",
    accent: "oklch(0.55 0.18 18)",
    accentSoft: "oklch(0.38 0.13 18)",
    img: majlisImg,
    story:
      "Majlis takes its name from the gathering room — that quiet, low-lit chamber where guests recline on velvet cushions and conversation unfolds without hurry. It is the heart of Arabic hospitality, and the heart of our heritage line.",
    philosophy:
      "Bold profiles, traditional structures, the unmistakable depth of legacy blends. Every Majlis composition begins with rare leaf and ends with a smoke that feels older than the room it fills.",
    flavours: ["Two Apples", "Mint Royale", "Grape & Mint", "Rose Cardamom", "Lemon Mist", "Mixed Fruits"],
    formats: ["15g", "100g", "250g", "500g", "1kg Tin"],
  },
  makhmal: {
    name: "Makhmal",
    arabic: "مَخْمَل",
    tag: "Smooth. Velvety. Refined.",
    accent: "oklch(0.62 0.14 320)",
    accentSoft: "oklch(0.34 0.10 320)",
    img: makhmalImg,
    story:
      "Makhmal — the Arabic word for velvet — speaks of texture, of softness, of a finish that lingers on the senses. This collection is for those who prefer their smoke to whisper rather than declare.",
    philosophy:
      "Subtle layering, restrained sweetness, a finish like silk drawn slowly across the palate. Each blend is built around balance and the art of holding nothing in excess.",
    flavours: ["Peach Velvet", "Vanilla Latte", "Honey Melon", "White Grape", "Berry Soufflé", "Hibiscus"],
    formats: ["15g", "100g", "250g", "500g", "1kg Tin"],
  },
  tarkib: {
    name: "Tarkib",
    arabic: "تَرْكِيب",
    tag: "Innovative. Experimental. Engineered.",
    accent: "oklch(0.65 0.14 265)",
    accentSoft: "oklch(0.32 0.09 265)",
    img: tarkibImg,
    story:
      "Tarkib — composition, construction — is our laboratory. Where modern technique meets unexpected flavour, where blends are engineered rather than inherited.",
    philosophy:
      "Unusual pairings, contemporary techniques, controlled fermentation. Tarkib is the house's avant-garde — built for the curious, the bold, the connoisseur who collects.",
    flavours: ["Saffron Citrus", "Cardamom Espresso", "Smoked Pineapple", "Black Currant Tonic", "Iced Guava", "Spiced Mango"],
    formats: ["15g", "100g", "250g", "500g", "1kg Tin"],
  },
};

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const slug = params.slug as CollectionSlug;
    if (!data[slug]) throw notFound();
    return { slug, collection: data[slug] };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const c = loaderData.collection;
    return {
      meta: [
        { title: `${c.name} — RASA Collection` },
        { name: "description", content: `${c.name}: ${c.tag} — ${c.story.slice(0, 120)}` },
        { property: "og:title", content: `${c.name} — RASA` },
        { property: "og:description", content: c.tag },
        { property: "og:image", content: c.img },
      ],
    };
  },
  component: CollectionPage,
});

function CollectionPage() {
  const { collection: c } = Route.useLoaderData();

  return (
    <>
      <section className="relative min-h-[80vh] flex items-end overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${c.img})` }} />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${c.accentSoft}, transparent 70%)`, opacity: 0.7 }} />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-20 pt-40 w-full">
          <SectionLabel><span>RASA Collection</span></SectionLabel>
          <p className="mt-8 font-serif text-4xl md:text-5xl" style={{ color: c.accent }}>{c.arabic}</p>
          <h1 className="mt-2 font-serif text-7xl md:text-[10rem] leading-none">{c.name}</h1>
          <p className="mt-6 text-sm tracking-luxe uppercase text-gold">{c.tag}</p>
        </div>
      </section>

      <section className="py-32 bg-background">
        <div className="mx-auto max-w-4xl px-6 space-y-12">
          <div>
            <SectionLabel>The Story</SectionLabel>
            <p className="mt-6 font-serif text-3xl md:text-4xl text-balance leading-snug text-foreground/95">
              {c.story}
            </p>
          </div>
          <div className="luxe-divider" />
          <div>
            <SectionLabel>Philosophy</SectionLabel>
            <p className="mt-6 text-lg text-muted-foreground leading-loose">{c.philosophy}</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-ink">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 grid lg:grid-cols-2 gap-16">
          <div>
            <SectionLabel>Available Flavours</SectionLabel>
            <ul className="mt-8 space-y-px">
              {c.flavours.map((f: string, i: number) => (
                <li key={f} className="border-t border-border/40 last:border-b py-5 flex items-center gap-6 group hover:pl-3 transition-all duration-500">
                  <span className="text-[0.65rem] tracking-luxe text-gold/60 w-8">0{i + 1}</span>
                  <span className="font-serif text-xl group-hover:text-gold transition-colors">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionLabel>Packaging</SectionLabel>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {c.formats.map((f: string) => (
                <div key={f} className="aspect-square border border-border/40 flex items-center justify-center hover:border-gold/40 transition-colors duration-500">
                  <span className="font-serif text-2xl">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-serif text-4xl md:text-5xl">Bring {c.name} to your market.</h2>
          <Link to="/contact" className="inline-flex items-center gap-3 mt-10 px-10 py-4 bg-gold text-primary-foreground text-xs tracking-luxe uppercase hover:bg-gold-soft transition-colors duration-500">
            Enquire for Distribution <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>
    </>
  );
}
