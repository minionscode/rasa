import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative bg-ink border-t border-border/60 mt-32">
      <div className="absolute inset-x-0 top-0 luxe-divider" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="font-serif text-2xl tracking-[0.4em] text-gold">RASA</div>
            <p className="mt-4 text-xs tracking-luxe text-muted-foreground uppercase">
              Smoke, Perfected
            </p>
            <p className="mt-8 text-sm text-muted-foreground leading-relaxed max-w-xs">
              A luxury hookah lifestyle house — uniting heritage,
              craftsmanship, and modern refinement.
            </p>
          </div>

          <div>
            <h4 className="text-[0.7rem] tracking-luxe uppercase text-gold mb-6">Explore</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-gold transition-colors">House of RASA</Link></li>
              <li><Link to="/collections" className="hover:text-gold transition-colors">Tobacco Collections</Link></li>
              <li><Link to="/hookahs" className="hover:text-gold transition-colors">Hookah Series</Link></li>
              <li><Link to="/accessories" className="hover:text-gold transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[0.7rem] tracking-luxe uppercase text-gold mb-6">Partnerships</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/partner" className="hover:text-gold transition-colors">Distributor Program</Link></li>
              <li><Link to="/partner" className="hover:text-gold transition-colors">Lounge Program</Link></li>
              <li><Link to="/partner" className="hover:text-gold transition-colors">Wholesale</Link></li>
              <li><Link to="/contact" className="hover:text-gold transition-colors">Contact Sales</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[0.7rem] tracking-luxe uppercase text-gold mb-6">Reach Us</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="h-3.5 w-3.5" /> sales@rasahouse.com</li>
              <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /> +91 00000 00000</li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-gold transition-colors"><Instagram className="h-4 w-4" /></a>
              <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-gold transition-colors"><Facebook className="h-4 w-4" /></a>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} RASA. All rights reserved. For adult consumers only (18+).</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold transition-colors">Privacy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms</a>
            <a href="#" className="hover:text-gold transition-colors">Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
