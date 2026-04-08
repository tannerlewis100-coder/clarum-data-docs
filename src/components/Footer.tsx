import { Link } from "react-router-dom";

const catalogLinks = [
  { label: "All Peptides", to: "/shop" },
  { label: "Recovery", to: "/shop?cat=Recovery" },
  { label: "Longevity", to: "/shop?cat=Longevity" },
  { label: "GHK-Cu", to: "/shop?cat=GHK-Cu" },
  { label: "Cognitive", to: "/shop?cat=Cognitive" },
  { label: "NAD+", to: "/shop?cat=NAD+" },
  { label: "Blends", to: "/shop?cat=Blends" },
];

const qualityLinks = [
  { label: "COA Library", to: "/coa-library" },
  { label: "Testing Standards", to: "/about#testing" },
  { label: "FAQ", to: "/faq" },
];

const companyLinks = [
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Privacy Policy", to: "#" },
  { label: "Terms of Service", to: "#" },
  { label: "Disclaimer", to: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1 */}
          <div className="lg:col-span-1">
            <div className="flex flex-col leading-none mb-4">
              <span className="font-display text-2xl tracking-[0.12em]">CLARUM</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-body font-medium">Research Peptides</span>
            </div>
            <p className="text-sm text-primary-foreground/60 leading-relaxed mb-6">
              Research-grade peptides tested beyond purity — HPLC, mass spec, heavy metals, microbial, and endotoxin. Every batch. Every time.
            </p>
            <div className="flex items-center gap-4">
              {["Instagram", "X", "Reddit"].map((s) => (
                <a key={s} href="#" className="text-xs uppercase tracking-wider text-primary-foreground/40 hover:text-gold transition-colors">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-gold mb-4 font-body font-semibold">Catalog</h4>
            <ul className="space-y-2.5">
              {catalogLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-gold mb-4 font-body font-semibold">Quality</h4>
            <ul className="space-y-2.5">
              {qualityLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] text-gold mb-4 font-body font-semibold">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-primary-foreground/40">© {new Date().getFullYear()} Clarum Research. All rights reserved.</p>
          <p className="text-xs text-gold/60 uppercase tracking-wider">Research Use Only</p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-primary-foreground/5">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <p className="text-[10px] text-primary-foreground/30 leading-relaxed text-center">
            All products sold strictly for in vitro laboratory research purposes only. Not intended for human or veterinary use, consumption, or clinical application. These statements have not been evaluated by the FDA.
          </p>
        </div>
      </div>
    </footer>
  );
}
