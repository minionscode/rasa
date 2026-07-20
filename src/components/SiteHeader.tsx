import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Menu, X, Search, ChevronDown, ArrowRight } from "lucide-react";
import rasaLogo from "@/assets/rasa-logo.png";
import majlisLogo from "@/assets/majlis-logo.png";
import makhmalLogo from "@/assets/makhmal-logo.png";
import tarkibLogo from "@/assets/tarkib-logo.png";
import { collections } from "@/data/collections";
import { useAuth } from "@/hooks/useAuth";

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
  const { user, signOut } = useAuth();

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
            <Link to="/loyalty" className={navLink} activeProps={{ className: "text-gold" }}>
              Loyalty
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

            {user ? (
              <ProfileMenu
                user={user}
                signOut={signOut}
                isOpen={openDrop === "profile"}
                onOpen={() => setOpenDrop("profile")}
                onClose={() => setOpenDrop(null)}
              />
            ) : (
              <Link
                to="/login"
                className="hidden md:inline-flex items-center gap-2 px-5 py-2 border border-gold/50 text-gold text-[0.65rem] tracking-luxe uppercase hover:bg-gold hover:text-primary-foreground transition-all duration-300"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="5" r="3" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M2 14c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                Sign In
              </Link>
            )}
          </nav>

          <div className="lg:hidden flex items-center gap-3">
            <button aria-label="Search" onClick={() => setSearch(true)} className="text-foreground/85">
              <Search className="h-4 w-4" />
            </button>
            {user ? (
              <Link
                to="/loyalty"
                aria-label="Account"
                className="flex items-center"
              >
                {user.user_metadata?.avatar_url ? (
                  <img src={user.user_metadata.avatar_url as string} alt="" className="w-8 h-8 rounded-full object-cover border border-gold/40" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold text-xs font-medium">
                    {((user.user_metadata?.full_name as string) || user.email || "U")[0]?.toUpperCase()}
                  </div>
                )}
              </Link>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gold/50 text-gold text-[0.6rem] tracking-luxe uppercase hover:bg-gold hover:text-primary-foreground transition-all duration-300"
              >
                Sign In
              </Link>
            )}
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
              { to: "/loyalty", label: "Loyalty" },
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

            <div className="mt-6 pt-6 border-t border-border/40 flex flex-col gap-4">
              {user ? (
                <>
                  <button
                    onClick={() => { setOpen(false); void signOut(); }}
                    className="text-left font-serif tracking-wide text-lg text-red-400/80 hover:text-red-400 transition-colors"
                  >
                    Sign Out
                  </button>
                </>

              ) : (
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gold/50 text-gold text-xs tracking-luxe uppercase hover:bg-gold hover:text-primary-foreground transition-all duration-300"
                >
                  Sign In
                </Link>
              )}
            </div>
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

function ProfileMenu({
  user,
  signOut,
  isOpen,
  onOpen,
  onClose,
}: {
  user: NonNullable<ReturnType<typeof useAuth>["user"]>;
  signOut: () => Promise<void>;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const name = (user.user_metadata?.full_name as string) || (user.user_metadata?.name as string) || user.email || "Account";
  const initial = name[0]?.toUpperCase() ?? "U";
  const avatar = user.user_metadata?.avatar_url as string | undefined;

  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button
        className="flex items-center gap-2 text-[0.65rem] tracking-luxe uppercase text-foreground/85 hover:text-gold transition-colors"
        aria-label="Account menu"
      >
        {avatar ? (
          <img src={avatar} alt="" className="w-8 h-8 rounded-full object-cover border border-gold/40" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center text-gold text-xs font-medium">
            {initial}
          </div>
        )}
        <ChevronDown className={`h-3 w-3 opacity-60 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-full pt-4 z-50">
          <div className="w-64 bg-ink/95 backdrop-blur-xl border border-gold/15 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
            <div className="px-5 py-4 border-b border-border/40 flex items-center gap-3">
              {avatar ? (
                <img src={avatar} alt="" className="w-10 h-10 rounded-full object-cover border border-gold/30" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center text-gold text-sm font-medium">
                  {initial}
                </div>
              )}
              <div className="min-w-0">
                <p className="font-serif text-sm text-foreground truncate">{name}</p>
                <p className="text-[0.6rem] tracking-wide text-foreground/50 truncate">{user.email}</p>
              </div>
            </div>
            <nav className="py-2">
              <button
                onClick={() => {
                  onClose();
                  void signOut();
                }}
                className="w-full text-left px-5 py-2.5 text-[0.7rem] tracking-luxe uppercase text-red-400/80 hover:text-red-400 hover:bg-red-950/30 transition-colors"
              >
                Sign Out
              </button>
            </nav>

          </div>
        </div>
      )}
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
    {
      name: "Majlis",
      tag: "The Expression of Heritage",
      label: "Collection I",
      slug: "majlis",
      path: "/collections/majlis" as const,
      logo: majlisLogo,
      bg: "#5B1823",
      bgSecondary: "#742131",
      pattern: "pattern-arabesque",
    },
    {
      name: "Makhmal",
      tag: "The Expression of Refinement",
      label: "Collection II",
      slug: "makhmal",
      path: "/collections/makhmal" as const,
      logo: makhmalLogo,
      bg: "#3A123F",
      bgSecondary: "#4D1754",
      pattern: "pattern-velvet",
    },
    {
      name: "Tarkib",
      tag: "The Expression of Innovation",
      label: "Collection III",
      slug: "tarkib",
      path: "/collections/tarkib" as const,
      logo: tarkibLogo,
      bg: "#081A3B",
      bgSecondary: "#0D2552",
      pattern: "pattern-geometric",
    },
  ];

  return (
    <DropButton label="Collections" isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <div className="bg-ink/95 backdrop-blur-xl border border-gold/15 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] p-5 w-[600px]">
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
              className={`group block relative overflow-hidden border border-white/10 hover:border-gold/40 transition-all duration-500`}
              style={{ background: c.bg }}
            >
              {/* Pattern overlay */}
              <div
                className={`absolute inset-0 ${c.pattern} opacity-40`}
              />
              {/* Gradient vignette — darkens edges so logo/text pop */}
              <div
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(ellipse at 50% 30%, ${c.bgSecondary}80, ${c.bg}ff 80%)`,
                }}
              />
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, rgba(211,161,136,0.18), transparent 70%)`,
                }}
              />
              {/* Content */}
              <div className="relative z-10 p-4 flex flex-col items-center text-center">
                <div className="h-20 flex items-center justify-center mb-3">
                  <img
                    src={c.logo}
                    alt={c.name}
                    width={612}
                    height={408}
                    loading="lazy"
                    className="max-h-16 w-auto opacity-90 group-hover:opacity-100 crisp-img transition-opacity duration-300"
                  />
                </div>
                <p className="text-[0.55rem] tracking-luxe uppercase text-white/50 mb-1">{c.label}</p>
                <p className="font-serif text-base text-white group-hover:text-gold transition-colors duration-300">
                  {c.name}
                </p>
                <p className="text-[0.55rem] tracking-luxe uppercase text-white/50 mt-1 leading-snug">
                  {c.tag}
                </p>
              </div>
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
