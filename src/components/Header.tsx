import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Shop", to: "/shop" },
  { label: "Recovery", to: "/shop?cat=Recovery" },
  { label: "Longevity", to: "/shop?cat=Longevity" },
  { label: "GHK-Cu", to: "/shop?cat=GHK-Cu" },
  { label: "Cognitive", to: "/shop?cat=Cognitive" },
  { label: "NAD+", to: "/shop?cat=NAD+" },
  { label: "COA Library", to: "/coa-library", accent: true },
];

const marqueeItems = [
  "HPLC ≥99% Purity Verified",
  "Mass Spectrometry Identity Confirmed",
  "Heavy Metals Tested — ND",
  "Microbial & Yeast Screened",
  "Endotoxin Tested (LAL Method)",
  "Batch-Specific COA Included",
  "Ships from USA",
  "No Fillers. No Shortcuts.",
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const bg = scrolled || !isHome ? "bg-navy shadow-lg" : "bg-transparent";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bg}`}>
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-display text-2xl tracking-[0.12em] text-primary-foreground">CLARUM</span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-gold font-body font-medium">Research Peptides</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`text-sm font-medium tracking-wide transition-colors ${
                link.accent ? "text-gold hover:text-gold-light" : "text-primary-foreground/80 hover:text-primary-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button className="relative text-primary-foreground/80 hover:text-primary-foreground transition-colors">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-1.5 -right-1.5 bg-gold text-navy-deep text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </button>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-primary-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Trust Ticker - pinned right under nav */}
      <div className="bg-navy-deep border-y border-primary-foreground/5 overflow-hidden py-2">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="mx-6 text-xs uppercase tracking-wider text-primary-foreground/30 font-body font-medium">
              {item} <span className="text-gold/40 mx-2">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-navy border-t border-gold/10 animate-in slide-in-from-top-2 duration-200">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`text-base font-medium ${
                  link.accent ? "text-gold" : "text-primary-foreground/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
