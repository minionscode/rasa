import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import rasaLogo from "@/assets/rasa-logo.png.asset.json";
import majlisLogo from "@/assets/majlis-logo.png.asset.json";
import makhmalLogo from "@/assets/makhmal-logo.png.asset.json";
import tarkibLogo from "@/assets/tarkib-logo.png.asset.json";

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
            <img src={rasaLogo.url} alt="RASA" className="h-10 md:h-11 w-auto crisp-img" />
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
              Partners
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
          <div className="flex items-center justify-between h-24 px-6 border-b border-border/40">
            <img src={rasaLogo.url} alt="RASA" className="h-11 w-auto" />
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col px-8 py-10 gap-5">
            {[
              { to: "/", label: "Home" },
              { to: "/house-of-rasa", label: "House of RASA" },
              { to: "/collections", label: "Collections" },
              { to: "/coming-soon", label: "Hookahs", search: { category: "hookahs" } },
              { to: "/coming-soon", label: "Accessories", search: { category: "accessories" } },
              { to: "/partners", label: "Partners" },
              { to: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.to + item.label}
                to={item.to}
                search={item.search as any}
                className="font-serif text-2xl tracking-wide text-foreground hover:text-gold transition-colors"
                activeProps={{ className: "text-gold" }}
              >
                {item.label}
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
    { name: "Majlis", tag: "The Expression of Gathering", hash: "majlis", logo: majlisLogo.url },
    { name: "Makhmal", tag: "The Expression of Refinement", hash: "makhmal", logo: makhmalLogo.url },
    { name: "Tarkib", tag: "The Expression of Innovation", hash: "tarkib", logo: tarkibLogo.url },
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
              key={c.hash}
              to="/collections"
              hash={c.hash}
              onClick={onClose}
              className="group block p-3 border border-transparent hover:border-gold/30 hover:bg-surface/40 transition-all duration-300"
            >
              <div className="aspect-square mb-3 flex items-center justify-center">
                <img src={c.logo} alt="" className="max-h-20 w-auto opacity-90 group-hover:opacity-100 transition-opacity" />
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


function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-ink/98 backdrop-blur-2xl animate-fade-in flex flex-col">
      <div className="flex justify-end p-6">
        <button onClick={onClose} aria-label="Close search" className="text-foreground/80 hover:text-gold transition-colors">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-2xl">
          <p className="text-[0.65rem] tracking-luxe uppercase text-gold mb-6 text-center">Search</p>
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search the House of RASA…"
            className="w-full bg-transparent border-b border-border/60 focus:border-gold transition-colors py-6 text-2xl md:text-4xl font-serif text-center outline-none placeholder:text-muted-foreground/40"
          />
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
