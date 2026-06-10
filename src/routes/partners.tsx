import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { useRouterState } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title: "Partners — Join the House of RASA" },
      {
        name: "description",
        content:
          "Distributor, Lounge, and Retail partnerships with RASA across India and the Gulf region.",
      },
      { property: "og:title", content: "Partners — RASA" },
      {
        property: "og:description",
        content: "Distributor, Lounge and Retail partnerships with the House of RASA.",
      },
    ],
  }),
  component: Partners,
});

const programs = [
  {
    anchor: "distributor",
    title: "Distributor Partnerships",
    tag: "Territory & Trade",
    body: "We collaborate with established trade partners across India and the Gulf region. Distributor relationships are built on structured territorial support, brand discipline, and long-term alignment.",
  },
  {
    anchor: "lounge",
    title: "Lounge Partnerships",
    tag: "Hospitality & Experience",
    body: "RASA partners with discerning lounges and hospitality venues to deliver the complete experience — tobacco, hookah, and accessories — composed for guests who recognise the difference.",
  },
  {
    anchor: "retail",
    title: "Retail Partnerships",
    tag: "Boutique & Specialist",
    body: "We work with boutique retailers and specialty merchants whose presentation, clientele, and atmosphere align with the standards of the House of RASA.",
  },
];

function Partners() {
  const hash = useRouterState({ select: (s) => s.location.hash });

  useEffect(() => {
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  }, [hash]);

  return (
    <>
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-ink">
        <div className="absolute inset-0 smoke-bg opacity-50" />
        <div className="absolute inset-0 grain" />
        <div className="relative z-10 text-center px-6 max-w-3xl animate-fade-up">
          <p className="text-[0.65rem] tracking-luxe uppercase text-gold mb-8">
            Partnerships
          </p>
          <h1 className="font-serif text-6xl md:text-[8rem] leading-none">Partners</h1>
          <div className="luxe-divider max-w-[6rem] mx-auto my-10" />
          <p className="font-serif italic text-xl md:text-2xl text-gold-soft">
            Join the House of RASA.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-5xl px-6 lg:px-10 space-y-24">
          {programs.map((p, i) => (
            <article
              id={p.anchor}
              key={p.anchor}
              className="scroll-mt-24 grid md:grid-cols-12 gap-10 items-start py-12 border-t border-border/40"
            >
              <div className="md:col-span-1">
                <span className="text-[0.6rem] tracking-luxe text-gold/60">
                  0{i + 1}
                </span>
              </div>
              <div className="md:col-span-4">
                <p className="text-[0.65rem] tracking-luxe uppercase text-gold">
                  {p.tag}
                </p>
                <h2 className="mt-4 font-serif text-3xl md:text-4xl leading-tight">
                  {p.title}
                </h2>
              </div>
              <div className="md:col-span-7">
                <p className="text-muted-foreground leading-loose">{p.body}</p>
                <Link
                  to="/contact"
                  className="luxe-underline inline-flex items-center gap-2 mt-8 text-gold text-[0.7rem] tracking-luxe uppercase"
                >
                  Enquire <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-32 bg-ink text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="font-serif text-4xl md:text-5xl text-balance">
            Begin a conversation with our sales team.
          </h2>
          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 mt-10 px-12 py-5 bg-gold text-primary-foreground text-[0.7rem] tracking-luxe uppercase hover:bg-gold-soft transition-colors duration-500"
          >
            Contact Sales Team
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
