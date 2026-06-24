import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Globe, Truck, Building2, Briefcase, TrendingUp, Sparkles } from "lucide-react";
import majlisLogo from "@/assets/majlis-logo.png.asset.json";
import makhmalLogo from "@/assets/makhmal-logo.png.asset.json";
import tarkibLogo from "@/assets/tarkib-logo.png.asset.json";
import { Hero3D } from "@/components/Hero3D";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RASA — Smoke, Perfected." },
      {
        name: "description",
        content:
          "RASA — a luxury hookah lifestyle house and premium distribution partner across domestic and international markets.",
      },
      { property: "og:title", content: "RASA — Smoke, Perfected." },
      {
        property: "og:description",
        content:
          "A luxury hookah lifestyle house and premium distribution partner.",
      },
    ],
  }),
  component: Home,
});

const pillars = [
  { icon: Truck, title: "Premium Distribution", body: "Disciplined logistics for tobacco, hookah and accessories." },
  { icon: Globe, title: "Domestic & International", body: "Sourcing and supply across India and the Gulf region." },
  { icon: Building2, title: "Wholesale Network", body: "Tiered structures aligned with serious trade partners." },
  { icon: Briefcase, title: "Hospitality Partners", body: "Lounges and venues where the RASA experience is composed." },
  { icon: TrendingUp, title: "Growth Support", body: "Brand assets, training and co-branded programmes." },
];

const collections = [
  { name: "Majlis", tag: "The Expression of Heritage", slug: "majlis" as const, path: "/collections/majlis" as const, logo: majlisLogo.url },
  { name: "Makhmal", tag: "The Expression of Refinement", slug: "makhmal" as const, path: "/collections/makhmal" as const, logo: makhmalLogo.url },
  { name: "Tarkib", tag: "The Expression of Innovation", slug: "tarkib" as const, path: "/collections/tarkib" as const, logo: tarkibLogo.url },
];

const partnerBenefits = [
  "Wholesale Access",
  "Dedicated Support",
  "Exclusive Products",
  "Distribution Opportunities",
  "Priority Service",
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink">
        <div className="absolute inset-0">
          <div className="absolute inset-0 smoke-bg opacity-40" />
          <div className="absolute inset-0 grain" />
        </div>

        {/* Floating copper RASA emblem + smoke (Three.js) */}
        <Hero3D />

        {/* Vignette + bottom fade above the 3D canvas */}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-ink/30 via-transparent to-ink" />
        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              "radial-gradient(ellipse at 50% 55%, transparent 35%, rgba(10,8,7,0.55) 80%)",
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl pt-[42vh] md:pt-[48vh]">
          <h1 className="sr-only">RASA — Smoke, Perfected.</h1>
          <div className="animate-fade-up delay-200 luxe-divider max-w-[8rem] mx-auto" />
          <p className="animate-fade-up delay-300 mt-8 font-serif italic text-2xl md:text-3xl text-gold-soft">
            Smoke, Perfected.
          </p>
          <p className="animate-fade-up delay-400 mt-6 text-sm md:text-base text-foreground/85 max-w-xl mx-auto leading-relaxed">
            A luxury hookah lifestyle house and premium distribution partner — built on craftsmanship,
            character, and refinement.
          </p>

          <div className="animate-fade-up delay-500 mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/collections"
              className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-gold text-primary-foreground text-[0.7rem] tracking-luxe uppercase hover:bg-gold-soft transition-all duration-500"
            >
              Explore Collections
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/partners"
              className="inline-flex items-center justify-center px-10 py-4 border border-foreground/30 text-foreground text-[0.7rem] tracking-luxe uppercase hover:border-gold/70 hover:text-gold transition-all duration-500"
            >
              Become a Partner
            </Link>
          </div>
        </div>
      </section>

      {/* COLLECTIONS PREVIEW */}
      <section className="relative bg-background py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[0.65rem] tracking-luxe uppercase text-gold">The Collections</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl text-balance">
              Three expressions, one house.
            </h2>
            <p className="mt-4 text-foreground/80 leading-relaxed">
              Majlis, Makhmal and Tarkib — each a distinct luxury world, curated for hospitality and trade.
            </p>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {collections.map((c) => {
              const cardBg = `radial-gradient(ellipse at 50% 0%, var(--${c.slug}-secondary) 0%, transparent 55%), linear-gradient(180deg, color-mix(in oklab, var(--${c.slug}) 75%, var(--ink)) 0%, var(--ink) 100%)`;
              return (
                <Link
                  key={c.slug}
                  to={c.path}
                  className="collection-card relative overflow-hidden border border-foreground/10 hover:border-gold/40 p-7 text-center group transition-all duration-500 hover:-translate-y-1.5"
                  style={{ background: cardBg }}
                >
                  <div className="aspect-square mb-4 flex items-center justify-center">
                    <img src={c.logo} alt={c.name} className="max-h-40 w-auto opacity-95 group-hover:opacity-100 group-hover:brightness-110 transition-all duration-500 crisp-img" />
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl group-hover:text-gold-soft transition-colors">{c.name}</h3>
                  <p className="mt-2 text-[0.65rem] tracking-luxe uppercase" style={{ color: `var(--${c.slug}-accent)` }}>
                    {c.tag}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[0.7rem] tracking-luxe uppercase text-foreground/80 group-hover:text-gold transition-colors">
                    Explore <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* BUSINESS CREDIBILITY */}
      <section className="relative bg-ink py-14 md:py-16 border-t border-border/40">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-[0.65rem] tracking-luxe uppercase text-gold">House & Distribution</p>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl text-balance">
              More than a lifestyle brand.
            </h2>
            <p className="mt-4 text-foreground/80 leading-relaxed">
              RASA is a luxury lifestyle house and a premium distribution partner — sourcing,
              curating and supplying for hospitality, retail and wholesale across markets.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {pillars.map(({ icon: Icon, title, body }) => (
              <div key={title} className="card-luxe p-5 flex flex-col">
                <Icon className="h-6 w-6 text-gold mb-4" strokeWidth={1.25} />
                <p className="font-serif text-lg leading-tight">{title}</p>
                <p className="mt-2 text-sm text-foreground/75 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BECOME A PARTNER */}
      <section className="relative bg-background py-16 md:py-20 border-t border-border/40 overflow-hidden">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, color-mix(in oklab, var(--gold) 18%, transparent), transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-6 lg:px-10 grid md:grid-cols-[1.1fr_1fr] gap-12 items-center">
          <div>
            <p className="text-[0.65rem] tracking-luxe uppercase text-gold inline-flex items-center gap-2">
              <Sparkles className="h-3 w-3" /> Partner Programme
            </p>
            <h2 className="mt-4 font-serif text-4xl md:text-6xl leading-[1.05] text-balance">
              Become a Partner of the House of RASA.
            </h2>
            <p className="mt-6 text-foreground/85 leading-relaxed max-w-xl">
              Join a curated network of distributors, lounges and boutiques. We grow with you —
              with structured support, exclusive access, and the discipline of a luxury house.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                to="/partners"
                className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-gold text-primary-foreground text-[0.7rem] tracking-luxe uppercase hover:bg-gold-soft transition-all duration-500"
              >
                Become a Partner
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-10 py-4 border border-foreground/30 text-[0.7rem] tracking-luxe uppercase hover:border-gold/70 hover:text-gold transition-all duration-500"
              >
                Wholesale Inquiry
              </Link>
            </div>
          </div>

          <ul className="grid gap-px bg-border/40">
            {partnerBenefits.map((b) => (
              <li
                key={b}
                className="bg-ink/80 backdrop-blur px-7 py-5 flex items-center gap-4 font-serif text-lg"
              >
                <span className="h-px w-6 bg-gold/70" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
