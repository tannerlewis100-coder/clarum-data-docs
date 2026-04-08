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
      <section className="relative min-h-screen flex items-center bg-navy overflow-hidden">
        {/* Ambient background effects */}
        <div className="absolute inset-0 gold-line-texture" />
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-gold/[0.03] blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-gold/[0.04] blur-[100px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div className="relative container mx-auto px-4 lg:px-8 pt-36 pb-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Left */}
          <div className="flex-1 max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="h-px w-8 bg-gold/60" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-gold font-body font-semibold">
                Research Grade Peptides
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-display font-normal text-primary-foreground leading-[1.05] mb-8">
              Nothing Hidden.
              <br />
              <span className="italic bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
                Everything Tested.
              </span>
            </h1>

            <p className="text-base lg:text-lg text-primary-foreground/50 font-body leading-relaxed max-w-xl mb-10">
              Full-panel tested peptides — HPLC purity, mass spec identity, heavy metals, microbial, and endotoxin. The only research peptide brand that shows you the data.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-12">
              <Button variant="gold" size="xl" className="shadow-[0_0_30px_-5px_hsl(40_50%_56%/0.4)] hover:shadow-[0_0_40px_-5px_hsl(40_50%_56%/0.6)] transition-shadow" asChild>
                <Link to="/shop">Shop the Catalog</Link>
              </Button>
              <Button variant="goldOutline" size="xl" asChild>
                <Link to="/coa-library">View COA Library <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </div>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-3">
              {stats.map((s) => (
                <span key={s} className="text-[11px] font-body font-medium text-primary-foreground/40 border border-primary-foreground/10 rounded-full px-5 py-2 backdrop-blur-sm bg-primary-foreground/[0.02]">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Right - Lab readout panel */}
          <div className="hidden lg:block flex-1 max-w-md w-full">
            <div className="relative group">
              {/* Glow behind card */}
              <div className="absolute -inset-1 rounded-card bg-gradient-to-br from-gold/20 via-gold/5 to-transparent blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative frosted-glass rounded-card p-7 border border-gold/10">
                {/* Header */}
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-primary-foreground/10">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-primary-foreground/30 font-body mb-1">Batch 2406-BPC</p>
                    <p className="text-lg font-display text-primary-foreground">BPC-157 <span className="text-sm text-primary-foreground/50">(10mg)</span></p>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-body font-bold bg-emerald-500/15 text-emerald-400 px-4 py-1.5 rounded-full border border-emerald-500/20">
                    ● PASS
                  </span>
                </div>

                <div className="space-y-3.5">
                  {/* HPLC row with bar */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-primary-foreground/50 font-body">HPLC Purity</span>
                      <span className="text-sm font-body font-semibold text-primary-foreground tabular-nums">99.2%</span>
                    </div>
                    <div className="h-2 bg-primary-foreground/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-gold/80 to-gold rounded-full transition-all duration-1000" style={{ width: "99.2%" }} />
                    </div>
                  </div>

                  {[
                    { label: "Mass Spec ID", value: "Confirmed", icon: "✓" },
                    { label: "Heavy Metals", value: "ND (Non-Detect)", icon: "✓" },
                    { label: "Microbial Count", value: "< 10 CFU/g", icon: "✓" },
                    { label: "Endotoxin (LAL)", value: "< 1 EU/mg", icon: "✓" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between py-2 border-t border-primary-foreground/5">
                      <span className="text-xs text-primary-foreground/40 font-body">{row.label}</span>
                      <span className="flex items-center gap-1.5 text-xs font-body font-semibold text-emerald-400">
                        <span className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[9px]">{row.icon}</span>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-primary-foreground/10 flex items-center justify-between">
                  <span className="text-[10px] text-primary-foreground/25 font-body">Independent 3rd-party lab verified</span>
                  <Link to="/coa-library" className="text-[10px] text-gold font-body font-semibold hover:text-gold-light transition-colors flex items-center gap-1">
                    View All COAs <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-deep to-transparent" />
      </section>

      {/* ===== TRUST TICKER (moved to Header area) ===== */}

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

      {/* ===== BRAND STORY ===== */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            <div className="flex-1 reveal">
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-body font-semibold">Why We Exist</span>
              <h2 className="text-3xl lg:text-4xl font-display text-foreground mt-2 mb-6 leading-tight">
                The Market Lost Its Most Trusted Vendors. We Built the Replacement.
              </h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-4">
                2025 and 2026 saw more than eight research peptide vendors shut down — FDA raids, federal charges, overnight closures. Researchers who'd trusted the same suppliers for years were suddenly without a source.
              </p>
              <p className="text-muted-foreground font-body leading-relaxed mb-8">
                Clarum was built for this moment. Not to fill a gap with the same shortcuts that got vendors shut down — but to set a new standard. Full-panel testing. Public COAs. Nothing hidden.
              </p>
              <Button variant="goldOutline" size="lg" asChild>
                <Link to="/about">Our Story <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-4 reveal">
              {brandStats.map((s) => (
                <div key={s.num} className="bg-secondary border border-border rounded-card p-6 text-center">
                  <p className="text-3xl lg:text-4xl font-display text-gold mb-2">{s.num}</p>
                  <p className="text-xs text-muted-foreground font-body leading-relaxed">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== COA / TRANSPARENCY ===== */}
      <section className="py-20 lg:py-28 bg-navy gold-grid-texture">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            <div className="flex-1 reveal">
              <span className="text-xs uppercase tracking-[0.2em] text-gold font-body font-semibold">Full Transparency</span>
              <h2 className="text-3xl lg:text-4xl font-display text-primary-foreground mt-2 mb-6">
                Every Batch Has a COA.<br />No Exceptions.
              </h2>
              <p className="text-primary-foreground/50 font-body leading-relaxed mb-6">
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
                    <span className="text-sm text-primary-foreground/70 font-body">{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="gold" size="lg" asChild>
                <Link to="/coa-library">View the COA Library</Link>
              </Button>
            </div>
            <div className="flex-1 max-w-md w-full reveal">
              <div className="bg-navy-deep rounded-card overflow-hidden shadow-2xl border border-primary-foreground/10">
                <div className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-primary-foreground/40 font-body">Certificate of Analysis</p>
                    <p className="text-sm font-display text-primary-foreground mt-0.5">GHK-Cu (50mg) — Batch #2406-GHK</p>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-body font-bold bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full">
                    PASS
                  </span>
                </div>
                <div className="divide-y divide-primary-foreground/5">
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
    </div>
  );
}
