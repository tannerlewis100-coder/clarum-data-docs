import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Check, FlaskConical, Atom, Shield, Bug, Syringe, ArrowRight } from "lucide-react";

const values = [
  { title: "Transparency First", desc: "Every COA published. Every batch documented. Nothing behind a login." },
  { title: "Science Over Marketing", desc: "We let the data speak. No influencer hype, no miracle claims." },
  { title: "Beyond Purity", desc: "Most vendors stop at HPLC. We run 5 independent tests per batch." },
  { title: "Built for Researchers", desc: "By people who understand what's at stake when quality fails." },
];

export default function About() {
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef}>
      {/* Hero */}
      <section className="bg-navy gold-line-texture pt-28 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-body font-semibold">About Clarum</span>
          <h1 className="text-4xl lg:text-5xl font-display text-primary-foreground mt-3 mb-6">
            Built for the Post-2025 Research Market
          </h1>
          <p className="text-primary-foreground/50 font-body leading-relaxed text-lg">
            When the most trusted peptide vendors disappeared overnight, researchers lost more than suppliers — they lost trust. Clarum was built to restore it.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl reveal">
          <h2 className="text-3xl font-display text-foreground mb-6">Our Mission</h2>
          <p className="text-muted-foreground font-body leading-relaxed mb-4">
            2025 and 2026 saw more than eight research peptide vendors shut down — FDA raids, federal charges, overnight closures. Researchers who'd trusted the same suppliers for years were suddenly without a source.
          </p>
          <p className="text-muted-foreground font-body leading-relaxed mb-4">
            Clarum was founded on a simple belief: the research peptide market doesn't need another vendor — it needs a new standard. One built on full-panel independent testing, publicly available Certificates of Analysis, and complete transparency.
          </p>
          <p className="text-muted-foreground font-body leading-relaxed">
            We're not here to cut corners. We're here to set the bar.
          </p>
        </div>
      </section>

      {/* Testing */}
      <section id="testing" className="py-20 bg-navy gold-grid-texture">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-14 reveal">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-body font-semibold">Methodology</span>
            <h2 className="text-3xl lg:text-4xl font-display text-primary-foreground mt-2">5-Panel Testing Standard</h2>
            <p className="text-primary-foreground/50 font-body mt-3 max-w-xl mx-auto">
              Every batch undergoes independent laboratory testing across five critical parameters.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 reveal">
            {[
              { icon: FlaskConical, title: "HPLC Purity", desc: "≥99% specification" },
              { icon: Atom, title: "Mass Spec (LC-MS)", desc: "Molecular identity confirmation" },
              { icon: Shield, title: "Heavy Metals (ICP-MS)", desc: "As, Pb, Hg, Cd screening" },
              { icon: Bug, title: "Microbial & Yeast", desc: "Aerobic count, mold screening" },
              { icon: Syringe, title: "Endotoxin (LAL)", desc: "Bacterial endotoxin testing" },
            ].map((c) => (
              <div key={c.title} className="text-center">
                <div className="w-14 h-14 mx-auto mb-3 rounded-full border-2 border-gold/40 flex items-center justify-center">
                  <c.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="font-display text-lg text-primary-foreground mb-1">{c.title}</h3>
                <p className="text-xs text-primary-foreground/50 font-body">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12 reveal">
            <span className="text-xs uppercase tracking-[0.2em] text-gold font-body font-semibold">Values</span>
            <h2 className="text-3xl lg:text-4xl font-display text-foreground mt-2">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto reveal">
            {values.map((v) => (
              <div key={v.title} className="bg-card rounded-card border border-border p-6">
                <h3 className="font-display text-xl text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground font-body">{v.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10 reveal">
            <Button variant="goldOutline" size="lg" asChild>
              <Link to="/coa-library">View the COA Library <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
