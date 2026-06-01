import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionLabel } from "../components/SectionLabel";
import aboutAtmosphere from "../assets/about-atmosphere.jpg";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/partner")({
  head: () => ({
    meta: [
      { title: "Partner With RASA — Distributor & Lounge Programs" },
      { name: "description", content: "Become a RASA distributor, supply your lounge, or join our wholesale program across India and the Gulf." },
      { property: "og:title", content: "Partner With RASA" },
      { property: "og:description", content: "Distributor, Lounge and Wholesale programs across India and the Gulf." },
    ],
  }),
  component: Partner,
});

const programs = [
  {
    title: "Distributor Program",
    eyebrow: "For territorial partners",
    desc: "Bring the full RASA ecosystem into your market. Structured territorial support, marketing assets, and dedicated account management.",
    points: ["Exclusive territories", "Co-branded marketing", "Volume pricing", "Logistics support"],
  },
  {
    title: "Lounge Program",
    eyebrow: "For premium venues",
    desc: "Equip your lounge with the complete RASA experience — tobacco, hookahs, accessories, and staff training.",
    points: ["Venue starter kits", "Staff masterclasses", "Custom flavour panels", "Co-marketing"],
  },
  {
    title: "Wholesale Program",
    eyebrow: "For established trade",
    desc: "High-volume programs for established trade partners with proven distribution capability.",
    points: ["Bulk pricing tiers", "Annual contracts", "Priority production", "Private allocations"],
  },
];

function Partner() {
  return (
    <>
      <section className="relative h-[60vh] flex items-end pb-16 overflow-hidden bg-ink">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${aboutAtmosphere})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-32 w-full">
          <SectionLabel><span>Partnerships</span></SectionLabel>
          <h1 className="mt-6 font-serif text-6xl md:text-8xl">Partner With RASA</h1>
          <p className="mt-6 text-muted-foreground max-w-xl">
            Three structured programs for partners who share our commitment to craft.
          </p>
        </div>
      </section>

      <section className="py-32 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 space-y-px">
          {programs.map((p, i) => (
            <div
              key={p.title}
              className="grid lg:grid-cols-12 gap-10 border-t border-border/40 last:border-b py-16"
            >
              <div className="lg:col-span-1">
                <span className="font-serif text-3xl text-gold/50">0{i + 1}</span>
              </div>
              <div className="lg:col-span-5">
                <p className="text-[0.65rem] tracking-luxe uppercase text-gold/80">{p.eyebrow}</p>
                <h2 className="mt-3 font-serif text-4xl md:text-5xl">{p.title}</h2>
              </div>
              <div className="lg:col-span-6 space-y-6">
                <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
                <ul className="grid grid-cols-2 gap-3">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-3 text-sm text-foreground/90">
                      <span className="h-px w-4 bg-gold" /> {pt}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="luxe-underline inline-flex items-center gap-2 text-gold text-xs tracking-luxe uppercase">
                  Submit Enquiry <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
