import { createFileRoute, Link } from "@tanstack/react-router";
import heroSmoke from "../assets/hero-smoke.jpg";
import hookahLuxury from "../assets/hookah-luxury.jpg";
import majlisImg from "../assets/collection-majlis.jpg";
import makhmalImg from "../assets/collection-makhmal.jpg";
import tarkibImg from "../assets/collection-tarkib.jpg";
import aboutAtmosphere from "../assets/about-atmosphere.jpg";
import packaging from "../assets/packaging.jpg";
import { SectionLabel } from "../components/SectionLabel";
import { ArrowRight, MapPin } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RASA — Smoke, Perfected." },
      { name: "description", content: "RASA is a luxury hookah lifestyle house: premium tobacco collections, hookah systems, and curated accessories across India and the Gulf." },
      { property: "og:title", content: "RASA — Smoke, Perfected." },
      { property: "og:description", content: "A luxury hookah lifestyle house. Premium tobacco, hookahs and accessories." },
    ],
  }),
  component: Home,
});

const collections = [
  {
    slug: "majlis",
    name: "Majlis",
    arabic: "مَجْلِس",
    tagline: "Rich. Bold. Authentic.",
    description: "Traditional Arabic-inspired blends, deeply rooted in heritage and the rituals of gathering.",
    img: majlisImg,
    accentClass: "text-[oklch(0.55_0.18_18)]",
    bgAccent: "bg-[oklch(0.38_0.13_18)]",
  },
  {
    slug: "makhmal",
    name: "Makhmal",
    arabic: "مَخْمَل",
    tagline: "Smooth. Velvety. Refined.",
    description: "An elegant assembly of soft, layered profiles for connoisseurs who favour finesse.",
    img: makhmalImg,
    accentClass: "text-[oklch(0.62_0.14_320)]",
    bgAccent: "bg-[oklch(0.34_0.10_320)]",
  },
  {
    slug: "tarkib",
    name: "Tarkib",
    arabic: "تَرْكِيب",
    tagline: "Innovative. Experimental. Engineered.",
    description: "Modern compositions built in our laboratory — for the curious and the bold.",
    img: tarkibImg,
    accentClass: "text-[oklch(0.65_0.14_265)]",
    bgAccent: "bg-[oklch(0.32_0.09_265)]",
  },
] as const;

const formats = ["15g Single Serve", "100g Pouch", "250g Pouch", "500g Pouch", "1kg Tin"];

const regions = [
  { name: "India", note: "Tobacco · Hookahs · Accessories" },
  { name: "United Arab Emirates", note: "Tobacco" },
  { name: "Saudi Arabia", note: "Tobacco" },
  { name: "Qatar", note: "Tobacco" },
  { name: "Kuwait", note: "Tobacco" },
  { name: "Oman", note: "Tobacco" },
  { name: "Bahrain", note: "Tobacco" },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink">
        <div
          className="absolute inset-0 bg-cover bg-center scale-110 animate-fade-in"
          style={{ backgroundImage: `url(${heroSmoke})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink" />
        <div className="absolute inset-0 grain" />

        <div className="relative z-10 text-center px-6 max-w-5xl">
          <div className="animate-fade-up">
            <span className="inline-block text-[0.65rem] tracking-wider-luxe uppercase text-gold/80 mb-8">
              Est. — A House of Smoke
            </span>
          </div>
          <h1 className="animate-fade-up delay-200 font-serif text-7xl md:text-[10rem] leading-none tracking-tight text-foreground">
            RASA
          </h1>
          <div className="animate-fade-up delay-300 mt-6 luxe-divider max-w-xs mx-auto" />
          <p className="animate-fade-up delay-400 mt-6 font-serif italic text-2xl md:text-3xl text-gold-soft">
            Smoke, Perfected.
          </p>
          <p className="animate-fade-up delay-500 mt-8 text-sm md:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            A luxury hookah lifestyle house — uniting heritage, craftsmanship and modern refinement
            across India and the Gulf.
          </p>

          <div className="animate-fade-up delay-700 mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-gold text-primary-foreground text-xs tracking-luxe uppercase hover:bg-gold-soft transition-all duration-500"
            >
              Contact Sales Team
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/collections"
              className="inline-flex items-center justify-center px-10 py-4 border border-foreground/20 text-foreground text-xs tracking-luxe uppercase hover:border-gold/60 hover:text-gold transition-all duration-500"
            >
              Explore Collections
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[0.6rem] tracking-luxe text-muted-foreground uppercase animate-fade-in delay-700">
          Scroll
        </div>
      </section>

      {/* HOUSE OF RASA */}
      <section className="relative py-32 md:py-48 bg-background">
        <div className="mx-auto max-w-6xl px-6 lg:px-10 grid lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5">
            <SectionLabel>I. The Philosophy</SectionLabel>
            <h2 className="mt-8 font-serif text-5xl md:text-6xl text-balance leading-[1.05]">
              The House <em className="text-gold not-italic font-light">of</em> RASA
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-6 text-muted-foreground leading-loose">
            <p className="text-lg text-foreground/90 font-light">
              RASA is not a tobacco company. It is a house — built around three distinct
              tobacco collections, a family of premium hookah systems, and a curated atelier of
              accessories that complete the ritual.
            </p>
            <p>
              We exist where ceremony meets craft. Where heritage is reinterpreted with the precision
              of modern luxury. Each blend, each vessel, each detail is composed with intent — so
              that every gathering becomes a quiet performance.
            </p>
            <p>
              From the majlis of the Gulf to the rooftops of Mumbai, RASA brings a single discipline:
              perfection of smoke, perfection of moment.
            </p>
            <Link to="/about" className="luxe-underline inline-flex items-center gap-2 mt-6 text-gold text-xs tracking-luxe uppercase">
              Discover the House <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* TOBACCO COLLECTIONS */}
      <section className="relative py-32 md:py-40 bg-ink overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-20">
            <SectionLabel className="justify-center"><span className="mx-auto">II. Tobacco Collections</span></SectionLabel>
            <h2 className="mt-6 font-serif text-5xl md:text-6xl">Three Houses, One Discipline</h2>
            <p className="mt-6 text-muted-foreground">
              Distinct philosophies, each composed for a different state of mind.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {collections.map((c, i) => (
              <Link
                key={c.slug}
                to="/collections/$slug"
                params={{ slug: c.slug }}
                className="group relative block aspect-[3/4] overflow-hidden bg-surface hover-lift"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                <img
                  src={c.img}
                  alt={c.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] group-hover:scale-110"
                  loading="lazy"
                  width={1024}
                  height={1280}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/0" />
                <div className={`absolute top-6 left-6 h-1.5 w-12 ${c.bgAccent}`} />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <p className={`font-serif text-2xl ${c.accentClass} mb-2`}>{c.arabic}</p>
                  <h3 className="font-serif text-4xl text-foreground">{c.name}</h3>
                  <p className="mt-2 text-xs tracking-luxe uppercase text-gold/80">{c.tagline}</p>
                  <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
                    {c.description}
                  </p>
                  <span className="inline-flex items-center gap-2 mt-6 text-xs tracking-luxe uppercase text-foreground/80 group-hover:text-gold transition-colors">
                    Explore Collection <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* HOOKAH COLLECTION */}
      <section className="relative py-32 md:py-40 bg-background overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[3/4] max-w-md mx-auto w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial-glow" />
            <img
              src={hookahLuxury}
              alt="Luxury hookah"
              className="relative h-full w-full object-cover"
              loading="lazy"
              width={1080}
              height={1440}
            />
          </div>
          <div>
            <SectionLabel>III. Hookah Series</SectionLabel>
            <h2 className="mt-6 font-serif text-5xl md:text-6xl text-balance">
              Crafted to Complete <br/> the Experience
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-lg">
              Vessels of weight and intention. Two series — one luxurious, one classic —
              each available in portable, medium and large formats.
            </p>

            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              <div className="border border-border/60 p-6 hover:border-gold/40 transition-colors duration-500">
                <p className="text-[0.65rem] tracking-luxe uppercase text-gold/80">Series I</p>
                <h3 className="mt-2 font-serif text-2xl">Luxury</h3>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                  Premium finishes, rare materials, elevated design language.
                </p>
                <ul className="mt-4 text-xs text-muted-foreground space-y-1">
                  <li>· Portable</li><li>· Medium</li><li>· Large</li>
                </ul>
              </div>
              <div className="border border-border/60 p-6 hover:border-gold/40 transition-colors duration-500">
                <p className="text-[0.65rem] tracking-luxe uppercase text-gold/80">Series II</p>
                <h3 className="mt-2 font-serif text-2xl">Classic</h3>
                <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
                  Reliable, accessible, elegant. Tuned for the Indian market.
                </p>
                <ul className="mt-4 text-xs text-muted-foreground space-y-1">
                  <li>· Portable</li><li>· Medium</li><li>· Large</li>
                </ul>
              </div>
            </div>

            <Link to="/hookahs" className="luxe-underline inline-flex items-center gap-2 mt-10 text-gold text-xs tracking-luxe uppercase">
              View Hookah Catalogue <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* ACCESSORIES */}
      <section className="relative py-32 bg-ink">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="max-w-2xl">
            <SectionLabel>IV. Accessories</SectionLabel>
            <h2 className="mt-6 font-serif text-5xl md:text-6xl">Every Detail Matters</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              The atelier of small things — bowls, hoses, tips, heat-management, tools.
              Each piece designed to elevate the ritual.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border/30">
            {[
              "Bowls", "Hoses", "Mouth Tips", "Charcoal Holders",
              "Heat Management", "Tongs", "Cleaning Tools", "Travel Cases",
            ].map((item, i) => (
              <div
                key={item}
                className="group bg-ink p-8 md:p-10 aspect-square flex flex-col justify-between hover:bg-surface transition-colors duration-700"
              >
                <span className="text-[0.65rem] tracking-luxe text-gold/60">0{i + 1}</span>
                <h3 className="font-serif text-2xl group-hover:text-gold transition-colors">{item}</h3>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to="/accessories" className="luxe-underline inline-flex items-center gap-2 text-gold text-xs tracking-luxe uppercase">
              Browse the Atelier <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* PRODUCT FORMATS */}
      <section className="relative py-32 bg-background overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>V. Formats</SectionLabel>
            <h2 className="mt-6 font-serif text-5xl md:text-6xl text-balance">
              Composed in <em className="text-gold not-italic">five</em> formats
            </h2>
            <p className="mt-6 text-muted-foreground max-w-md leading-relaxed">
              From single-serve indulgence to wholesale tins — each package finished
              with the same restraint.
            </p>
            <div className="mt-10 space-y-px">
              {formats.map((f, i) => (
                <div
                  key={f}
                  className="flex items-center justify-between border-t border-border/40 last:border-b py-5 group hover:pl-4 transition-all duration-500"
                >
                  <span className="text-[0.65rem] tracking-luxe text-gold/60 w-10">0{i + 1}</span>
                  <span className="font-serif text-xl flex-1">{f}</span>
                  <span className="text-xs tracking-luxe uppercase text-muted-foreground group-hover:text-gold transition-colors">
                    Premium
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden">
            <img src={packaging} alt="RASA packaging" className="absolute inset-0 h-full w-full object-cover" loading="lazy" width={1600} height={1200} />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
          </div>
        </div>
      </section>

      {/* GLOBAL PRESENCE */}
      <section className="relative py-32 bg-ink overflow-hidden">
        <div
          className="absolute inset-0 opacity-30 bg-cover bg-center"
          style={{ backgroundImage: `url(${aboutAtmosphere})` }}
        />
        <div className="absolute inset-0 bg-ink/80" />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-10 text-center">
          <SectionLabel className="justify-center"><span>VI. Global Presence</span></SectionLabel>
          <h2 className="mt-6 font-serif text-5xl md:text-6xl">From the Gulf to the Subcontinent</h2>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            RASA serves discerning consumers and partners across seven markets, with growing
            distribution and an ever-expanding atelier of lounge collaborations.
          </p>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {regions.map((r) => (
              <div key={r.name} className="border border-border/40 bg-ink/60 backdrop-blur p-5 hover:border-gold/40 transition-colors duration-500">
                <MapPin className="h-3.5 w-3.5 text-gold mx-auto" />
                <p className="mt-3 font-serif text-base">{r.name}</p>
                <p className="mt-1 text-[0.6rem] tracking-luxe uppercase text-muted-foreground">{r.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARTNER */}
      <section className="relative py-32 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionLabel className="justify-center"><span>VII. Partnerships</span></SectionLabel>
            <h2 className="mt-6 font-serif text-5xl md:text-6xl">Partner With RASA</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Become a Distributor", desc: "Bring RASA tobacco collections to your market with structured territorial support." },
              { title: "Supply Your Lounge", desc: "Equip your venue with the complete RASA ecosystem — tobacco, hookahs, accessories." },
              { title: "Wholesale Opportunities", desc: "High-volume programs for established trade partners across India and the Gulf." },
            ].map((p) => (
              <Link
                key={p.title}
                to="/partner"
                className="group block border border-border/60 p-10 hover:border-gold/50 transition-colors duration-500 hover-lift"
              >
                <span className="block h-px w-10 bg-gold mb-8" />
                <h3 className="font-serif text-2xl text-foreground group-hover:text-gold transition-colors">{p.title}</h3>
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                <span className="inline-flex items-center gap-2 mt-8 text-xs tracking-luxe uppercase text-gold">
                  Enquire <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="relative py-32 md:py-48 bg-ink overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${heroSmoke})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/80 to-ink" />
        <div className="relative text-center max-w-3xl mx-auto px-6">
          <SectionLabel className="justify-center"><span>VIII. Begin</span></SectionLabel>
          <h2 className="mt-6 font-serif text-5xl md:text-7xl text-balance">
            Let's Start a Conversation
          </h2>
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Whether you seek distribution, lounge partnership or simply wish to experience
            RASA — our sales team is at your disposal.
          </p>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 mt-12 px-12 py-5 bg-gold text-primary-foreground text-xs tracking-luxe uppercase hover:bg-gold-soft transition-all duration-500"
          >
            Contact Sales Team
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
