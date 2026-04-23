import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { useWcFeaturedProducts } from "@/hooks/use-wc-products";
import ProductCard from "@/components/ProductCard";
import Seo from "@/components/Seo";
import { ArrowRight, Check, FlaskConical, Atom, Shield, Bug, Syringe, Sparkles, Loader2 } from "lucide-react";

const stats = ["61 Compounds", "5 Tests Per Batch", "100% COA Documented", "≥99% HPLC Purity"];

const testingCards = [
  { icon: FlaskConical, title: "HPLC Purity", desc: "Confirms ≥99% purity. You see the exact percentage, not a range.", num: "01" },
  { icon: Atom, title: "Mass Spectrometry", desc: "LC-MS confirms molecular identity down to the atomic level. No substitutions.", num: "02" },
  { icon: Shield, title: "Heavy Metals", desc: "ICP-MS screens arsenic, lead, mercury, cadmium. Every batch reported as ND or flagged.", num: "03" },
  { icon: Bug, title: "Microbial & Yeast", desc: "Total aerobic count, yeast, and mold screened for pharmaceutical-grade cleanliness.", num: "04" },
  { icon: Syringe, title: "Endotoxin (LAL)", desc: "The test most peptide brands skip entirely. We run it on every batch.", num: "05" },
];

const brandStats = [
  { num: "61", label: "Research compounds across 10 categories" },
  { num: "5", label: "Independent lab tests on every batch" },
  { num: "≥99%", label: "HPLC purity specification" },
  { num: "100%", label: "Batch COA documentation, publicly available" },
];

function FeaturedSection() {
  const { data: featured, isLoading } = useWcFeaturedProducts();
  return (
    <section className="relative py-24 lg:py-32 bg-navy-alt gold-grid-texture overflow-hidden border-t border-white/[0.03]">
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] rounded-full bg-gold/[0.02] blur-[100px]" />
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-14 reveal">
          <div className="inline-flex items-center gap-2 justify-center mb-4">
            <span className="h-px w-8 bg-gold/40" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold font-body font-semibold">Catalog</span>
            <span className="h-px w-8 bg-gold/40" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-display text-white">Featured Compounds</h2>
          <p className="text-white/50 font-body mt-4 max-w-md mx-auto">
            Pharmaceutical-grade peptides, rigorously tested. Every product ships with a batch-specific COA.
          </p>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 text-gold animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        <div className="text-center mt-12 reveal">
          <Button variant="goldOutline" size="lg" asChild>
            <Link to="/shop" className="text-gold">View Full Catalog <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function Index() {
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef}>
      <Seo
        title="CLARUM — Pharmaceutical Grade Peptides | Nothing Hidden. Everything Tested."
        description="Pharmaceutical-grade research peptides with full 5-panel independent lab testing — HPLC, mass spec, heavy metals, microbial, and endotoxin. Every batch documented."
        path="/"
      />
      {/* ===== HERO ===== */}
      <section className="relative min-h-[88vh] flex items-center bg-navy overflow-hidden">
        <div className="absolute inset-0 gold-line-texture" />
        <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-gold/[0.03] blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 w-[400px] h-[400px] rounded-full bg-gold/[0.04] blur-[100px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 pt-36 pb-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="h-px w-8 bg-gold/60" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-gold font-body font-semibold">
                Pharmaceutical Grade Peptides
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

            <div className="flex flex-wrap gap-3">
              {stats.map((s) => (
                <span key={s} className="text-[11px] font-body font-medium text-primary-foreground/40 border border-primary-foreground/10 rounded-full px-5 py-2 backdrop-blur-sm bg-primary-foreground/[0.02]">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden lg:block flex-1 max-w-md w-full">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-card bg-gradient-to-br from-gold/20 via-gold/5 to-transparent blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative frosted-glass rounded-card p-7 border border-gold/10">
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-primary-foreground/10">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-primary-foreground/30 font-body mb-1">Batch 2406-BPC</p>
                    <p className="text-lg font-display text-primary-foreground">BPC-157 <span className="text-sm text-primary-foreground/50">(10mg)</span></p>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-body font-bold bg-emerald-500/15 text-emerald-400 px-4 py-1.5 rounded-full border border-emerald-500/20">
                    <span className="inline-block animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]">●</span> PASS
                  </span>
                </div>
                <div className="space-y-3.5">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-primary-foreground/50 font-body">HPLC Purity</span>
                      <span className="text-sm font-body font-semibold text-primary-foreground tabular-nums">99.2%</span>
                    </div>
                    <div className="h-2 bg-primary-foreground/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-gold/80 to-gold rounded-full animate-[grow-bar_1.5s_ease-out_forwards]" style={{ width: "99.2%" }} />
                    </div>
                  </div>
                  {[
                    { label: "Mass Spec ID", value: "Confirmed", icon: "✓" },
                    { label: "Heavy Metals", value: "ND (Non-Detect)", icon: "✓" },
                    { label: "Microbial Count", value: "< 10 CFU/g", icon: "✓" },
                    { label: "Endotoxin (LAL)", value: "< 1 EU/mg", icon: "✓" },
                  ].map((row, i) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between py-2 border-t border-primary-foreground/5 animate-[fade-in_0.4s_ease-out_both]"
                      style={{ animationDelay: `${0.8 + i * 0.1}s` }}
                    >
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

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy to-transparent" />
      </section>


      {/* ===== TESTING & COA TRANSPARENCY (Combined) ===== */}
      <section className="relative py-24 lg:py-32 bg-navy overflow-hidden border-t border-white/[0.03]">
        <div className="absolute inset-0 gold-grid-texture" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
        <div className="absolute top-1/3 -left-40 w-[400px] h-[400px] rounded-full bg-gold/[0.03] blur-[100px]" />

        <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 reveal">
            <div className="inline-flex items-center gap-2 justify-center mb-4">
              <span className="h-px w-8 bg-gold/40" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-gold font-body font-semibold">Quality & Transparency</span>
              <span className="h-px w-8 bg-gold/40" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-display text-primary-foreground leading-tight">
              We Test What Others <span className="italic text-gold">Skip</span>
            </h2>
            <p className="text-primary-foreground/40 font-body mt-4 max-w-lg mx-auto">
              Every batch undergoes 5 independent lab tests. Full COAs published publicly — no login required.
            </p>
          </div>

          {/* 5-Panel Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 reveal-stagger">
            {testingCards.map((card) => (
              <div key={card.title} className="group relative">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                <div className="relative bg-navy/80 backdrop-blur-sm border border-primary-foreground/[0.06] rounded-2xl p-6 text-center h-full transition-all duration-300 group-hover:border-gold/30 group-hover:-translate-y-1">
                  <span className="text-[10px] font-body font-bold text-gold/30 tracking-widest">{card.num}</span>
                  <div className="w-14 h-14 mx-auto my-4 rounded-full border border-gold/30 flex items-center justify-center group-hover:border-gold group-hover:shadow-[0_0_20px_-5px_hsl(40_50%_56%/0.3)] transition-all duration-300">
                    <card.icon className="h-6 w-6 text-gold/70 group-hover:text-gold transition-colors" />
                  </div>
                  <h3 className="font-display text-lg text-primary-foreground mb-2">{card.title}</h3>
                  <p className="text-[11px] text-primary-foreground/40 font-body leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* COA Details + Sample COA Card */}
          <div className="mt-20 flex flex-col lg:flex-row gap-14 lg:gap-20 items-center reveal">
            <div className="flex-1">
              <h3 className="text-3xl lg:text-[2.75rem] font-display text-primary-foreground leading-[1.15] mb-6">
                Every Batch Has a COA.
                <br />
                <span className="italic text-gold">No Exceptions.</span>
              </h3>
              <p className="text-primary-foreground/50 font-body leading-relaxed mb-8">
                We don't just claim "third-party tested." We publish the actual data — batch-specific Certificates of Analysis with full 5-panel results — publicly available, no login required.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Batch-specific COA, not generic certificates",
                  "Independent third-party lab",
                  "Full 5-panel results published publicly",
                  "Heavy metals and endotoxin — tests most vendors skip",
                  "QR code on every order links to batch COA",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-emerald-400" />
                    </span>
                    <span className="text-sm text-primary-foreground/70 font-body leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              <Button variant="gold" size="lg" className="shadow-[0_0_25px_-5px_hsl(40_50%_56%/0.3)]" asChild>
                <Link to="/coa-library">View the COA Library</Link>
              </Button>
            </div>

            <div className="flex-1 max-w-md w-full">
              <div className="relative group">
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-gold/15 via-transparent to-emerald-500/10 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative bg-navy rounded-2xl overflow-hidden border border-primary-foreground/10 group-hover:border-gold/20 transition-colors duration-300">
                  <div className="p-6 bg-gradient-to-r from-navy to-navy">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <Sparkles className="h-3.5 w-3.5 text-gold/60" />
                          <p className="text-[10px] uppercase tracking-[0.2em] text-gold/60 font-body font-semibold">Certificate of Analysis</p>
                        </div>
                        <p className="text-base font-display text-primary-foreground">GHK-Cu (50mg)</p>
                        <p className="text-[11px] text-primary-foreground/30 font-body mt-0.5">Batch #2406-GHK</p>
                      </div>
                      <span className="text-[10px] uppercase tracking-wider font-body font-bold bg-emerald-500/15 text-emerald-400 px-4 py-1.5 rounded-full border border-emerald-500/20">
                        ● PASS
                      </span>
                    </div>
                  </div>
                  <div className="divide-y divide-primary-foreground/5">
                    {[
                      { label: "HPLC Purity", value: "99.4%", check: true },
                      { label: "Molecular Identity (LC-MS)", value: "Confirmed", check: true },
                      { label: "Heavy Metals", value: "ND Non-Detect", check: true },
                      { label: "Total Aerobic Count", value: "< 10 CFU/g", check: true },
                      { label: "Endotoxin", value: "< 1 EU/mg", check: true },
                      { label: "Testing Lab", value: "ISO/IEC 17025", check: false },
                      { label: "Test Date", value: "March 2026", check: false },
                    ].map((row) => (
                      <div key={row.label} className="flex items-center justify-between px-6 py-3.5">
                        <span className="text-xs text-primary-foreground/40 font-body">{row.label}</span>
                        <span className="text-xs font-body font-semibold text-primary-foreground flex items-center gap-2">
                          {row.check && (
                            <span className="w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                              <Check className="h-2.5 w-2.5 text-emerald-400" />
                            </span>
                          )}
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-emerald-500/[0.08] px-6 py-4 border-t border-emerald-500/10">
                    <p className="text-xs text-emerald-400 font-body font-medium flex items-center gap-2">
                      <Check className="h-4 w-4" /> All parameters within specification
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BRAND STORY ===== */}
      <section className="relative py-24 lg:py-32 bg-navy overflow-hidden border-t border-white/[0.03]">
        <div className="absolute top-20 right-0 w-[300px] h-[300px] rounded-full bg-gold/[0.03] blur-[100px]" />
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-14 lg:gap-20 items-center">
            <div className="flex-1 max-w-2xl reveal">
              <div className="inline-flex items-center gap-2 mb-4">
                <span className="h-px w-8 bg-gold/60" />
                <span className="text-[11px] uppercase tracking-[0.25em] text-gold font-body font-semibold">Why We Exist</span>
              </div>
              <h2 className="text-3xl lg:text-[2.75rem] font-display text-white leading-[1.05] text-balance mb-8">
                The Market Lost Its Most Trusted Vendors.<br />
                <span className="italic text-gold">We Built the Replacement.</span>
              </h2>
              <div className="space-y-5 mb-10">
                <p className="text-white/60 font-body leading-relaxed">
                  2025 and 2026 saw more than eight research peptide vendors shut down — FDA raids, federal charges, overnight closures. Researchers who'd trusted the same suppliers for years were suddenly without a source.
                </p>
                <p className="text-white/60 font-body leading-relaxed">
                  Clarum was built for this moment. Not to fill a gap with the same shortcuts that got vendors shut down — but to set a new standard. Full-panel testing. Public COAs. Nothing hidden.
                </p>
              </div>
              <Button variant="gold" size="lg" className="shadow-[0_0_25px_-5px_hsl(40_50%_56%/0.3)]" asChild>
                <Link to="/about">Our Story <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </div>

            <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-4 reveal-stagger">
              {brandStats.map((s) => (
                <div
                  key={s.num}
                  className="bg-white/[0.03] border border-white/[0.08] rounded-2xl p-6 text-center transition-all duration-300 hover:border-gold/30 hover:scale-[1.02]"
                >
                  <p className="text-5xl font-display text-gold leading-none">{s.num}</p>
                  <p className="text-xs text-white/50 font-body mt-3 leading-relaxed">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <FeaturedSection />

      {/* ===== CLOSING CTA ===== */}
      <section className="relative py-20 lg:py-28 bg-navy overflow-hidden border-t border-white/[0.03]">
        <div className="absolute inset-0 gold-line-texture" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-gold/[0.04] blur-[120px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

        <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto reveal">
            <div className="inline-flex items-center gap-2 justify-center mb-3">
              <span className="h-px w-8 bg-gold/40" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-gold font-body font-semibold">Get Started</span>
              <span className="h-px w-8 bg-gold/40" />
            </div>
            <Sparkles className="h-8 w-8 text-gold/50 mx-auto mb-6" />
            <h2 className="text-3xl lg:text-5xl font-display text-primary-foreground leading-tight mb-6">
              Ready to Source{" "}
              <span className="italic bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
                Pharmaceutical-Grade?
              </span>
            </h2>
            <p className="text-primary-foreground/40 font-body text-lg mb-10 max-w-lg mx-auto">
              61 compounds. 5 tests per batch. Every COA published. No shortcuts.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button variant="gold" size="xl" className="shadow-[0_0_30px_-5px_hsl(40_50%_56%/0.4)] hover:shadow-[0_0_40px_-5px_hsl(40_50%_56%/0.6)] transition-shadow" asChild>
                <Link to="/shop">Shop the Catalog</Link>
              </Button>
              <Button variant="goldOutline" size="xl" asChild>
                <Link to="/coa-library">View COA Library <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
