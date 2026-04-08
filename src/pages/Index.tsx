import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { featuredProducts, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, Check, FlaskConical, Atom, Shield, Bug, Syringe } from "lucide-react";

const stats = ["61 Compounds", "5 Tests Per Batch", "100% COA Documented", "≥99% HPLC Purity"];

const testingCards = [
  { icon: FlaskConical, title: "HPLC Purity", desc: "Confirms ≥99% purity. You see the exact percentage, not a range." },
  { icon: Atom, title: "Mass Spectrometry", desc: "LC-MS confirms molecular identity down to the atomic level. No substitutions." },
  { icon: Shield, title: "Heavy Metals", desc: "ICP-MS screens arsenic, lead, mercury, cadmium. Every batch reported as ND or flagged." },
  { icon: Bug, title: "Microbial & Yeast", desc: "Total aerobic count, yeast, and mold screened for research-grade cleanliness." },
  { icon: Syringe, title: "Endotoxin (LAL)", desc: "The test most peptide brands skip entirely. We run it on every batch." },
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

const brandStats = [
  { num: "61", label: "Research compounds across 10 categories" },
  { num: "5", label: "Independent lab tests on every batch" },
  { num: "≥99%", label: "HPLC purity specification" },
  { num: "100%", label: "Batch COA documentation, publicly available" },
];

export default function Index() {
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef}>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center bg-navy gold-line-texture overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 py-32 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left */}
          <div className="flex-1 max-w-2xl">
            <span className="inline-block text-xs uppercase tracking-[0.2em] text-gold font-body font-semibold mb-6">
              Research Grade Peptides
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-normal text-primary-foreground leading-[1.1] mb-6">
              Nothing Hidden.{" "}
              <span className="italic text-gold">Everything Tested.</span>
            </h1>
            <p className="text-base lg:text-lg text-primary-foreground/60 font-body leading-relaxed max-w-xl mb-8">
              Full-panel tested peptides — HPLC purity, mass spec identity, heavy metals, microbial, and endotoxin. The only research peptide brand that shows you the data.
            </p>
            <div className="flex flex-wrap items-center gap-3 mb-10">
              <Button variant="gold" size="xl" asChild>
                <Link to="/shop">Shop the Catalog</Link>
              </Button>
              <Button variant="goldOutline" size="xl" asChild>
                <Link to="/coa-library">View COA Library <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </div>
            {/* Stat pills */}
            <div className="flex flex-wrap gap-2">
              {stats.map((s) => (
                <span key={s} className="text-xs font-body font-medium text-primary-foreground/50 border border-primary-foreground/10 rounded-full px-4 py-1.5">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Right - Lab readout panel */}
          <div className="hidden lg:block flex-1 max-w-md w-full">
            <div className="frosted-glass rounded-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-primary-foreground/40 font-body">Batch 2406-BPC</p>
                  <p className="text-sm font-display text-primary-foreground mt-0.5">BPC-157 (10mg)</p>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-body font-bold bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full">
                  PASS
                </span>
              </div>

              <div className="space-y-3">
                {/* HPLC row with bar */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-primary-foreground/50 font-body">HPLC Purity</span>
                    <span className="text-xs font-body font-semibold text-primary-foreground">99.2%</span>
                  </div>
                  <div className="h-1.5 bg-primary-foreground/10 rounded-full overflow-hidden">
                    <div className="h-full bg-gold rounded-full" style={{ width: "99.2%" }} />
                  </div>
                </div>

                {[
                  { label: "Mass Spec ID", value: "Confirmed", color: "text-emerald-400" },
                  { label: "Heavy Metals", value: "ND", color: "text-emerald-400" },
                  { label: "Microbial Count", value: "< 10 CFU/g", color: "text-emerald-400" },
                  { label: "Endotoxin", value: "< 1 EU/mg", color: "text-emerald-400" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between py-1.5 border-t border-primary-foreground/5">
                    <span className="text-xs text-primary-foreground/50 font-body">{row.label}</span>
                    <span className={`text-xs font-body font-semibold ${row.color}`}>{row.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-primary-foreground/10 flex items-center justify-between">
                <span className="text-[10px] text-primary-foreground/30 font-body">Independent 3rd-party lab verified</span>
                <Link to="/coa-library" className="text-[10px] text-gold font-body font-medium hover:text-gold-light transition-colors">
                  View All COAs →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST TICKER ===== */}
      <div className="bg-navy-deep border-y border-primary-foreground/5 overflow-hidden py-3">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="mx-6 text-xs uppercase tracking-wider text-primary-foreground/30 font-body font-medium">
              {item} <span className="text-gold/40 mx-2">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12 reveal">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-body font-semibold">Catalog</span>
            <h2 className="text-3xl lg:text-4xl font-display text-foreground mt-2">Featured Compounds</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 reveal">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="text-center mt-10 reveal">
            <Button variant="goldOutline" size="lg" asChild>
              <Link to="/shop">View All 61 Compounds <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== TESTING STANDARDS ===== */}
      <section className="py-20 lg:py-28 bg-navy gold-grid-texture">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14 reveal">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-body font-semibold">Quality</span>
            <h2 className="text-3xl lg:text-4xl font-display text-primary-foreground mt-2">We Test What Others Skip</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 reveal">
            {testingCards.map((card) => (
              <div key={card.title} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-gold/40 flex items-center justify-center group-hover:border-gold transition-colors">
                  <card.icon className="h-7 w-7 text-gold" />
                </div>
                <h3 className="font-display text-lg text-primary-foreground mb-2">{card.title}</h3>
                <p className="text-xs text-primary-foreground/50 font-body leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 reveal">
            <Button variant="goldOutline" size="lg" asChild>
              <Link to="/coa-library">Browse the COA Library <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== CATEGORY GRID ===== */}
      <section className="py-20 lg:py-28 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12 reveal">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-body font-semibold">Categories</span>
            <h2 className="text-3xl lg:text-4xl font-display text-foreground mt-2">Browse by Category</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 reveal">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/shop?cat=${cat.slug}`}
                className="group bg-card rounded-card border border-border p-6 flex items-center gap-4 transition-all duration-300 hover:translate-x-1 hover:border-gold/40 hover:shadow-[0_8px_30px_-8px_hsl(40_50%_56%/0.2)]"
              >
                <span className="text-3xl">{cat.emoji}</span>
                <div className="flex-1">
                  <h3 className="font-display text-lg text-foreground">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground font-body mt-0.5">{cat.examples}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-gold transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== COA / TRANSPARENCY ===== */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div className="flex-1 reveal">
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-body font-semibold">Full Transparency</span>
              <h2 className="text-3xl lg:text-4xl font-display text-foreground mt-2 mb-6">
                Every Batch Has a COA.<br />No Exceptions.
              </h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-6">
                We don't just claim "third-party tested." We publish the actual data — batch-specific Certificates of Analysis with full 5-panel results — publicly available, no login required.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Batch-specific COA, not generic certificates",
                  "Independent third-party lab",
                  "Full 5-panel results published publicly, no login required",
                  "Heavy metals and endotoxin — tests most vendors skip",
                  "QR code on every order links to batch COA",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-foreground/80 font-body">{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="navy" size="lg" asChild>
                <Link to="/coa-library">View the COA Library</Link>
              </Button>
            </div>

            {/* Right - COA mock */}
            <div className="flex-1 max-w-md w-full reveal">
              <div className="bg-navy rounded-card overflow-hidden shadow-2xl">
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-primary-foreground/40 font-body">Certificate of Analysis</p>
                    <p className="text-sm font-display text-primary-foreground mt-0.5">GHK-Cu (50mg) — Batch #2406-GHK</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-body font-bold bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full">
                    PASS
                  </span>
                </div>
                <div className="bg-navy-deep/50 divide-y divide-primary-foreground/5">
                  {[
                    { label: "HPLC Purity", value: "99.4%", check: true },
                    { label: "Molecular Identity (LC-MS)", value: "Confirmed", check: true },
                    { label: "Heavy Metals", value: "ND Non-Detect", check: true },
                    { label: "Total Aerobic Count", value: "< 10 CFU/g", check: true },
                    { label: "Endotoxin", value: "< 1 EU/mg", check: true },
                    { label: "Testing Lab", value: "ISO/IEC 17025 Accredited", check: false },
                    { label: "Test Date", value: "March 2026", check: false },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between px-5 py-3">
                      <span className="text-xs text-primary-foreground/50 font-body">{row.label}</span>
                      <span className="text-xs font-body font-semibold text-primary-foreground flex items-center gap-1.5">
                        {row.check && <Check className="h-3 w-3 text-emerald-400" />}
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="bg-emerald-500/10 px-5 py-3">
                  <p className="text-xs text-emerald-400 font-body font-medium flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5" /> All parameters within specification
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BRAND STORY ===== */}
      <section className="py-20 lg:py-28 bg-navy gold-grid-texture">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div className="flex-1 reveal">
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-body font-semibold">Why We Exist</span>
              <h2 className="text-3xl lg:text-4xl font-display text-primary-foreground mt-2 mb-6 leading-tight">
                The Market Lost Its Most Trusted Vendors. We Built the Replacement.
              </h2>
              <p className="text-primary-foreground/50 font-body leading-relaxed mb-4">
                2025 and 2026 saw more than eight research peptide vendors shut down — FDA raids, federal charges, overnight closures. Researchers who'd trusted the same suppliers for years were suddenly without a source.
              </p>
              <p className="text-primary-foreground/50 font-body leading-relaxed mb-8">
                Clarum was built for this moment. Not to fill a gap with the same shortcuts that got vendors shut down — but to set a new standard. Full-panel testing. Public COAs. Nothing hidden.
              </p>
              <Button variant="goldOutline" size="lg" asChild>
                <Link to="/about">Our Story <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </div>

            {/* Right - stats grid */}
            <div className="flex-1 grid grid-cols-2 gap-4 reveal">
              {brandStats.map((s) => (
                <div key={s.num} className="bg-primary-foreground/5 border border-primary-foreground/10 rounded-card p-6 text-center">
                  <p className="text-3xl lg:text-4xl font-display text-gold mb-2">{s.num}</p>
                  <p className="text-xs text-primary-foreground/50 font-body leading-relaxed">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
