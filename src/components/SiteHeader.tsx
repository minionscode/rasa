import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Search, ChevronDown } from "lucide-react";

type DropItem = { label: string; sub?: string; to: string; hash?: string };

const collectionsDrop: DropItem[] = [
  { label: "Explore All", sub: "Discover the complete House of RASA", to: "/collections" },
  { label: "Majlis", sub: "The Expression of Heritage", to: "/collections", hash: "majlis" },
  { label: "Makhmal", sub: "The Expression of Refinement", to: "/collections", hash: "makhmal" },
  { label: "Tarkib", sub: "The Expression of Innovation", to: "/collections", hash: "tarkib" },
];

const hookahDrop: DropItem[] = [
  { label: "Explore All", to: "/hookah" },
  { label: "Classic — Portable", to: "/hookah", hash: "classic-collection" },
  { label: "Classic — Medium", to: "/hookah", hash: "classic-collection" },
  { label: "Classic — Large", to: "/hookah", hash: "classic-collection" },
  { label: "Luxury — Portable", to: "/hookah", hash: "luxury-collection" },
  { label: "Luxury — Medium", to: "/hookah", hash: "luxury-collection" },
  { label: "Luxury — Large", to: "/hookah", hash: "luxury-collection" },
];

const partnersDrop: DropItem[] = [
  { label: "Distributor Partnerships", to: "/partners", hash: "distributor" },
  { label: "Lounge Partnerships", to: "/partners", hash: "lounge" },
  { label: "Retail Partnerships", to: "/partners", hash: "retail" },
];

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
    "text-[0.7rem] tracking-luxe uppercase text-foreground/70 hover:text-gold transition-colors duration-500";

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-700 ${
          scrolled
            ? "bg-ink/75 backdrop-blur-xl border-b border-border/60"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
          <Link to="/" className="font-serif text-xl tracking-[0.4em] text-gold">
            RASA
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/house-of-rasa" className={navLink} activeProps={{ className: "text-gold" }}>
              The House of RASA
            </Link>

            <DropdownNav
              label="Collections"
              items={collectionsDrop}
              isOpen={openDrop === "collections"}
              onOpen={() => setOpenDrop("collections")}
              onClose={() => setOpenDrop(null)}
            />

            <DropdownNav
              label="Hookah"
              items={hookahDrop}
              isOpen={openDrop === "hookah"}
              onOpen={() => setOpenDrop("hookah")}
              onClose={() => setOpenDrop(null)}
            />

            <Link to="/accessories" className={navLink} activeProps={{ className: "text-gold" }}>
              Accessories
            </Link>

            <DropdownNav
              label="Partners"
              items={partnersDrop}
              isOpen={openDrop === "partners"}
              onOpen={() => setOpenDrop("partners")}
              onClose={() => setOpenDrop(null)}
            />

            <Link to="/contact" className={navLink} activeProps={{ className: "text-gold" }}>
              Contact
            </Link>

            <button
              aria-label="Search"
              onClick={() => setSearch(true)}
              className="text-foreground/70 hover:text-gold transition-colors"
            >
              <Search className="h-4 w-4" />
            </button>
          </nav>

          <div className="lg:hidden flex items-center gap-4">
            <button aria-label="Search" onClick={() => setSearch(true)} className="text-foreground/80">
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
            <span className="font-serif text-xl tracking-[0.4em] text-gold">RASA</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col px-8 py-10 gap-6">
            {[
              { to: "/house-of-rasa", label: "The House of RASA" },
              { to: "/collections", label: "Collections" },
              { to: "/hookah", label: "Hookah" },
              { to: "/accessories", label: "Accessories" },
              { to: "/partners", label: "Partners" },
              { to: "/contact", label: "Contact" },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="font-serif text-2xl tracking-wide text-foreground hover:text-gold transition-colors"
                activeProps={{ className: "text-gold" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Search overlay */}
      {search && <SearchOverlay onClose={() => setSearch(false)} />}
    </>
  );
}

function DropdownNav({
  label,
  items,
  isOpen,
  onOpen,
  onClose,
}: {
  label: string;
  items: DropItem[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button className="text-[0.7rem] tracking-luxe uppercase text-foreground/70 hover:text-gold transition-colors duration-500 inline-flex items-center gap-1.5">
        {label}
        <ChevronDown className="h-3 w-3 opacity-60" />
      </button>
      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-5 min-w-[280px]">
          <div className="bg-ink/95 backdrop-blur-xl border border-border/60 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] py-3 animate-fade-in">
            {items.map((it) => (
              <Link
                key={`${it.label}-${it.hash ?? ""}`}
                to={it.to}
                hash={it.hash}
                onClick={onClose}
                className="block px-6 py-3 hover:bg-surface/60 transition-colors group"
              >
                <p className="font-serif text-base text-foreground group-hover:text-gold transition-colors">
                  {it.label}
                </p>
                {it.sub && (
                  <p className="text-[0.65rem] tracking-luxe uppercase text-muted-foreground mt-1">
                    {it.sub}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
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
