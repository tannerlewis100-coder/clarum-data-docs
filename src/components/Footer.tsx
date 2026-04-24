import { Link } from "react-router-dom";
import clarumLogo from "@/assets/clarum-logo-transparent.png";

const catalogLinks = [
  { label: "All Peptides", to: "/shop" },
  { label: "Repair Compounds", to: "/shop?cat=Recovery" },
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
  { label: "Privacy Policy", to: "/privacy" },
  { label: "Terms of Service", to: "/terms" },
  { label: "Disclaimer", to: "/disclaimer" },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-primary-foreground">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1 */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <img src={clarumLogo} alt="Clarum - Batch-Tested Research Peptides" className="h-36" />
            </div>
            <p className="text-[13px] text-white/40 font-body leading-relaxed mb-6">
              High-purity research peptides analytically tested beyond purity — HPLC, mass spec, heavy metals, microbial, and endotoxin. Every batch. Every time. For in vitro laboratory research use only.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-white/40 mb-4 font-body font-semibold">Catalog</h4>
            <ul className="space-y-0">
              {catalogLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-white/60 hover:text-white transition-colors block py-1.5">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-white/40 mb-4 font-body font-semibold">Quality</h4>
            <ul className="space-y-0">
              {qualityLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-white/60 hover:text-white transition-colors block py-1.5">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="text-sm uppercase tracking-wider text-white/40 mb-4 font-body font-semibold">Company</h4>
            <ul className="space-y-0">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-white/60 hover:text-white transition-colors block py-1.5">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/30">© {new Date().getFullYear()} Clarum Research. All rights reserved.</p>
          <p className="text-xs text-gold/60 uppercase tracking-wider">Research Use Only</p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-primary-foreground/5">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <p className="text-[11px] text-white/20 leading-relaxed text-center">
            All products sold strictly for in vitro laboratory research purposes only. Not intended for human or veterinary use, consumption, or clinical application. These statements have not been evaluated by the FDA.
          </p>
        </div>
      </div>
    </footer>
  );
}
