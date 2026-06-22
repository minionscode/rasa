import { Link } from "@tanstack/react-router";
import { Instagram, Mail, Phone, MessageCircle } from "lucide-react";
import rasaLogo from "@/assets/rasa-logo.png.asset.json";

export function SiteFooter() {
  return (
    <footer className="relative bg-ink border-t border-border/60 mt-32">
      <div className="absolute inset-x-0 top-0 luxe-divider" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Column 1 — Brand */}
          <div className="md:col-span-1">
            <img src={rasaLogo.url} alt="RASA" className="h-14 w-auto" />
            <p className="mt-5 text-xs tracking-luxe text-muted-foreground uppercase">
              Smoke, Perfected.
            </p>
            <p className="mt-8 text-sm text-muted-foreground leading-relaxed max-w-xs">
              A luxury hookah lifestyle house built on craftsmanship, character, and refinement.
            </p>
          </div>

          {/* Column 2 — Navigation */}
          <div>
            <h4 className="text-[0.7rem] tracking-luxe uppercase text-gold mb-6">Navigation</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/house-of-rasa" className="hover:text-gold transition-colors">The House of RASA</Link></li>
              <li><Link to="/collections" className="hover:text-gold transition-colors">Collections</Link></li>
              <li><Link to="/hookah" className="hover:text-gold transition-colors">Hookah</Link></li>
              <li><Link to="/accessories" className="hover:text-gold transition-colors">Accessories</Link></li>
              <li><Link to="/partners" className="hover:text-gold transition-colors">Partners</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3 — Collections */}
          <div>
            <h4 className="text-[0.7rem] tracking-luxe uppercase text-gold mb-6">Collections</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/collections" hash="majlis" className="hover:text-gold transition-colors">Majlis</Link></li>
              <li><Link to="/collections" hash="makhmal" className="hover:text-gold transition-colors">Makhmal</Link></li>
              <li><Link to="/collections" hash="tarkib" className="hover:text-gold transition-colors">Tarkib</Link></li>
            </ul>
          </div>

          {/* Column 4 — Connect */}
          <div>
            <h4 className="text-[0.7rem] tracking-luxe uppercase text-gold mb-6">Connect</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Mail className="h-3.5 w-3.5 text-gold/70 shrink-0" />
                <span>sales@rasahouse.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-3.5 w-3.5 text-gold/70 shrink-0" />
                <span>+91 00000 00000</span>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="h-3.5 w-3.5 text-gold/70 shrink-0" />
                <span>WhatsApp</span>
              </li>
              <li className="flex items-center gap-3">
                <Instagram className="h-3.5 w-3.5 text-gold/70 shrink-0" />
                <span>@rasa.house</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© RASA. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms &amp; Conditions</a>
            <a href="#" className="hover:text-gold transition-colors">Age Restriction Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
