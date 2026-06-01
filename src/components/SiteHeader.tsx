import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "House of RASA" },
  { to: "/collections", label: "Collections" },
  { to: "/hookahs", label: "Hookahs" },
  { to: "/accessories", label: "Accessories" },
  { to: "/partner", label: "Partner" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-ink/80 backdrop-blur-xl border-b border-border/60"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-20 flex items-center justify-between">
        <Link to="/" className="font-serif text-xl tracking-[0.4em] text-gold">
          RASA
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {nav.slice(1).map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[0.7rem] tracking-luxe uppercase text-muted-foreground hover:text-gold transition-colors duration-500 luxe-underline"
              activeProps={{ className: "text-gold" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/contact"
          className="hidden lg:inline-flex px-6 py-3 border border-gold/40 text-gold text-[0.7rem] tracking-luxe uppercase hover:bg-gold hover:text-primary-foreground transition-all duration-500"
        >
          Contact Sales
        </Link>

        <button
          onClick={() => setOpen(true)}
          className="lg:hidden p-2 text-foreground"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 bg-ink/98 backdrop-blur-xl animate-fade-in lg:hidden">
          <div className="flex items-center justify-between h-20 px-6">
            <span className="font-serif text-xl tracking-[0.4em] text-gold">RASA</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center gap-8 pt-16">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="font-serif text-2xl tracking-wide text-foreground hover:text-gold transition-colors"
                activeProps={{ className: "text-gold" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
