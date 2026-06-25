import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Menu, X, Search, ChevronDown, ArrowRight } from "lucide-react";
import rasaLogo from "@/assets/rasa-logo.png";
import majlisLogo from "@/assets/majlis-logo.png";
import makhmalLogo from "@/assets/makhmal-logo.png";
import tarkibLogo from "@/assets/tarkib-logo.png";
import { collections } from "@/data/collections";

type DropItem = {
  label: string;
  sub?: string;
  to: string;
  hash?: string;
  search?: Record<string, string>;
};

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setSearch(false);
    setOpenDrop(null);
  }, [pathname]);

  const navLink =
    "text-[0.7rem] tracking-luxe uppercase whitespace-nowrap text-foreground/85 hover:text-gold transition-colors duration-200";

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-ink/80 backdrop-blur-xl border-b border-border/60"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between gap-6">
          <Link to="/" aria-label="RASA — Home" className="flex items-center shrink-0">
            <img src={rasaLogo} alt="RASA" width={728} height={292} loading="lazy" className="h-10 md:h-11 w-auto crisp-img" />
          </Link>

          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            <Link to="/" className={navLink} activeOptions={{ exact: true }} activeProps={{ className: "text-gold" }}>
              Home
            </Link>
            <Link to="/house-of-rasa" className={navLink} activeProps={{ className: "text-gold" }}>
              House of RASA
            </Link>

            <CollectionsMega
              isOpen={openDrop === "collections"}
              onOpen={() => setOpenDrop("collections")}
              onClose={() => setOpenDrop(null)}
            />

            <ProductsMega
              isOpen={openDrop === "products"}
              onOpen={() => setOpenDrop("products")}
              onClose={() => setOpenDrop(null)}
            />

            <Link to="/partners" className={navLink} activeProps={{ className: "text-gold" }}>
              Partner
            </Link>
            <Link to="/contact" className={navLink} activeProps={{ className: "text-gold" }}>
              Contact
            </Link>


            <button
              aria-label="Search"
              onClick={() => setSearch(true)}
              className="text-foreground/85 hover:text-gold transition-colors"
            >
              <Search className="h-4 w-4" />
            </button>
          </nav>

          <div className="lg:hidden flex items-center gap-4">
            <button aria-label="Search" onClick={() => setSearch(true)} className="text-foreground/85">
              <Search className="h-4 w-4" />
            </button>
            <button onClick={() => setOpen(true)} className="p-1 text-foreground" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 bg-ink/98 backdrop-blur-xl animate-fade-in lg:hidden overflow-y-auto">
          <div className="flex items-center justify-between h-20 px-6 border-b border-border/40">
            <img src={rasaLogo} alt="RASA" width={728} height={292} loading="lazy" className="h-9 w-auto crisp-img" />
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col px-8 py-10 gap-5">
            {[
              { to: "/", label: "Home" },
              { to: "/house-of-rasa", label: "House of RASA" },
              { to: "/collections", label: "Collections" },
              { to: "/collections/majlis", label: "— Majlis" },
              { to: "/collections/makhmal", label: "— Makhmal" },
              { to: "/collections/tarkib", label: "— Tarkib" },
              { to: "/coming-soon", label: "Hookahs", search: { category: "hookahs" } },
              { to: "/coming-soon", label: "Accessories", search: { category: "accessories" } },
              { to: "/partners", label: "Partner" },
              { to: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.to + item.label}
                to={item.to}
                search={item.search as any}
                className={`font-serif tracking-wide text-foreground hover:text-gold transition-colors ${item.label.startsWith("—") ? "text-lg pl-4 text-foreground/75" : "text-2xl"}`}
                activeProps={{ className: "text-gold" }}
              >
                {item.label.replace(/^— /, "")}
              </Link>
            ))}

          </nav>
        </div>
      )}

      {search && <SearchOverlay onClose={() => setSearch(false)} />}
    </>
  );
}

function DropButton({
  label,
  isOpen,
  onOpen,
  onClose,
  children,
}: {
  label: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button className="text-[0.7rem] tracking-luxe uppercase whitespace-nowrap text-foreground/85 hover:text-gold transition-colors duration-200 inline-flex items-center gap-1.5">
        {label}
        <ChevronDown className={`h-3 w-3 opacity-60 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="absolute left-1/2 -translate-x-1/2 top-full pt-4">{children}</div>}
    </div>
  );
}

function CollectionsMega({
  isOpen,
  onOpen,
  onClose,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const items = [
    { name: "Majlis", tag: "The Expression of Heritage", slug: "majlis", path: "/collections/majlis" as const, logo: majlisLogo },
    { name: "Makhmal", tag: "The Expression of Refinement", slug: "makhmal", path: "/collections/makhmal" as const, logo: makhmalLogo },
    { name: "Tarkib", tag: "The Expression of Innovation", slug: "tarkib", path: "/collections/tarkib" as const, logo: tarkibLogo },
  ];
  return (
    <DropButton label="Collections" isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <div className="bg-ink/95 backdrop-blur-xl border border-gold/15 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] p-6 w-[560px]">
        <Link
          to="/collections"
          onClick={onClose}
          className="block mb-4 pb-4 border-b border-border/40 hover:text-gold transition-colors"
        >
          <p className="text-[0.6rem] tracking-luxe uppercase text-gold/80">Explore</p>
          <p className="font-serif text-lg mt-1">View All Collections</p>
        </Link>
        <div className="grid grid-cols-3 gap-3">
          {items.map((c) => (
            <Link
              key={c.slug}
              to={c.path}
              onClick={onClose}
              className="group block p-3 border border-transparent hover:border-gold/30 hover:bg-surface/40 transition-all duration-300"
            >
              <div className="aspect-square mb-3 flex items-center justify-center">
                <img src={c.logo} alt="" width={612} height={408} loading="lazy" className="max-h-20 w-auto opacity-90 group-hover:opacity-100 crisp-img transition-opacity" />
              </div>
              <p className="font-serif text-base text-foreground group-hover:text-gold transition-colors text-center">
                {c.name}
              </p>
              <p className="text-[0.6rem] tracking-luxe uppercase text-muted-foreground mt-1 text-center leading-snug">
                {c.tag}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </DropButton>
  );
}

function ProductsMega({
  isOpen,
  onOpen,
  onClose,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const items = [
    {
      title: "Hookahs",
      sub: "Classic & Luxury Series",
      category: "hookahs",
    },
    {
      title: "Accessories",
      sub: "Bowls · Hoses · Mouthpieces",
      category: "accessories",
    },
  ];
  return (
    <DropButton label="Products" isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <div className="bg-ink/95 backdrop-blur-xl border border-gold/15 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] p-6 w-[420px] grid grid-cols-2 gap-4">
        {items.map((it) => (
          <Link
            key={it.category}
            to="/coming-soon"
            search={{ category: it.category }}
            onClick={onClose}
            className="group block p-4 border border-transparent hover:border-gold/30 hover:bg-surface/40 transition-all duration-300"
          >
            <p className="text-[0.6rem] tracking-luxe uppercase text-gold/80">{it.sub}</p>
            <p className="font-serif text-lg mt-2 group-hover:text-gold transition-colors">
              {it.title}
            </p>
          </Link>
        ))}
      </div>
    </DropButton>
  );
}


type SearchResult = {
  name: string;
  notes: string;
  collectionName: string;
  collectionPath: "/collections/majlis" | "/collections/makhmal" | "/collections/tarkib";
  accentVar: string;
};

const allFlavours: SearchResult[] = collections.flatMap((c) =>
  c.flavours.map((f) => ({
    name: f.name,
    notes: f.notes,
    collectionName: c.name,
    collectionPath: c.path,
    accentVar: c.accentVar,
  })),
);

function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [] as SearchResult[];
    return allFlavours
      .filter(
        (f) =>
          f.name.toLowerCase().includes(term) ||
          f.notes.toLowerCase().includes(term) ||
          f.collectionName.toLowerCase().includes(term),
      )
      .slice(0, 12);
  }, [q]);

  return (
    <div className="fixed inset-0 z-50 bg-ink/98 backdrop-blur-2xl animate-fade-in flex flex-col">
      <div className="flex justify-end p-6">
        <button onClick={onClose} aria-label="Close search" className="text-foreground/80 hover:text-gold transition-colors">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto px-6 pb-10">
        <div className="w-full max-w-3xl mx-auto">
          <p className="text-[0.65rem] tracking-luxe uppercase text-gold mb-6 text-center">Search</p>
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search flavours, collections, notes…"
            className="w-full bg-transparent border-b border-border/60 focus:border-gold transition-colors py-5 text-xl md:text-3xl font-serif text-center outline-none placeholder:text-muted-foreground/40"
          />

          <div className="mt-8">
            {q.trim() === "" ? (
              <p className="text-center text-xs tracking-luxe uppercase text-muted-foreground">
                Type to filter flavours across all collections
              </p>
            ) : results.length === 0 ? (
              <p className="text-center text-sm text-foreground/70 font-serif italic">
                No flavours match “{q}”.
              </p>
            ) : (
              <ul className="grid gap-2">
                {results.map((r) => (
                  <li key={`${r.collectionName}-${r.name}`}>
                    <Link
                      to="/contact"
                      search={{ product: r.name, collection: r.collectionName }}
                      onClick={onClose}
                      className="group flex items-center justify-between gap-4 p-4 border border-border/40 hover:border-gold/50 transition-all bg-surface/30 hover:bg-surface/60"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <span
                            className="text-[0.55rem] tracking-luxe uppercase"
                            style={{ color: r.accentVar }}
                          >
                            {r.collectionName}
                          </span>
                        </div>
                        <p className="font-serif text-lg truncate group-hover:text-gold transition-colors">
                          {r.name}
                        </p>
                        <p className="text-xs text-foreground/65 truncate">{r.notes}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-foreground/60 group-hover:text-gold group-hover:translate-x-1 transition-all shrink-0" />
                    </Link>
                  </li>
                ))}
                <li className="pt-2 text-center">
                  <Link
                    to="/collections"
                    onClick={onClose}
                    className="text-[0.65rem] tracking-luxe uppercase text-gold/80 hover:text-gold"
                  >
                    Browse all collections →
                  </Link>
                </li>
              </ul>
            )}
          </div>

          <p className="mt-8 text-center text-xs tracking-luxe uppercase text-muted-foreground">
            Press Esc to close
          </p>
        </div>
      </div>
    </div>
  );
}

// keep DropItem export for type re-use elsewhere
export type { DropItem };
