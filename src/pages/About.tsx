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
      <section className="relative bg-navy overflow-hidden pt-32 pb-24">
        <div className="absolute inset-0 gold-line-texture" />
        <div className="absolute top-1/3 -right-32 w-[400px] h-[400px] rounded-full bg-gold/[0.03] blur-[120px]" />
        <div className="relative container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 justify-center mb-4">
            <span className="h-px w-8 bg-gold/40" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold font-body font-semibold">Our Story</span>
            <span className="h-px w-8 bg-gold/40" />
          </div>
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-display text-primary-foreground leading-[1.1] mb-6">
            We Saw an Industry Built on{" "}
            <span className="italic bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">Shortcuts</span>
          </h1>
          <p className="text-primary-foreground/45 font-body leading-relaxed text-lg max-w-2xl mx-auto">
            So we built the company we wished existed.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="relative py-24 lg:py-32 bg-background overflow-hidden">
        <div className="absolute top-20 left-0 w-[300px] h-[300px] rounded-full bg-gold/[0.02] blur-[100px]" />
        <div className="relative container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="h-px w-8 bg-gold/60" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-gold font-body font-semibold">The Problem</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-display text-foreground mb-8 leading-tight">
              An industry that stopped caring about the people it served.
            </h2>
            <div className="space-y-5 text-muted-foreground font-body leading-[1.8]">
              <p>
                We spent years as researchers on the other side of the counter — ordering peptides, hoping the label matched what was inside the vial. And for a while, a handful of vendors made that easy. They were trusted. Reliable. Consistent.
              </p>
              <p>
                Then the cracks started showing. Vendor after vendor started cutting the same corners: skip identity testing, skip heavy metals, skip endotoxin — just run an HPLC and call it "third-party tested." It was enough to look legitimate, but not enough to actually protect researchers. Purity alone doesn't tell you if a product contains the right molecule, is contaminated with heavy metals, or carries bacterial endotoxins.
              </p>
              <p>
                But it was cheaper. And faster. And most customers couldn't tell the difference. So the entire market raced to the bottom — competing on price, marketing, and influencer deals instead of quality. The COAs that did exist were vague, generic, or recycled across batches. Some vendors didn't publish them at all.
              </p>
              <p>
                Then came 2025 and 2026. FDA raids. Federal charges. Overnight shutdowns. More than eight vendors disappeared — and with them, the supply chains researchers had depended on for years.
              </p>
            </div>
          </div>

          <div className="my-16 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

          <div className="reveal">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="h-px w-8 bg-gold/60" />
              <span className="text-[11px] uppercase tracking-[0.25em] text-gold font-body font-semibold">The Solution</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-display text-foreground mb-8 leading-tight">
              We didn't build Clarum to fill a gap.{" "}
              <span className="italic text-gold">We built it to fix one.</span>
            </h2>
            <div className="space-y-5 text-muted-foreground font-body leading-[1.8]">
              <p>
                Clarum exists because we refused to accept that "good enough" was the standard. We didn't want to be another vendor selling vials with a purity number and a trust-me attitude. We wanted to build something we'd actually trust ourselves — as researchers, as customers, as people who care about what goes into a lab.
              </p>
              <p>
                So we did something the industry considers extreme: we test every single batch across five independent panels — HPLC purity, mass spectrometry identity, heavy metals screening, microbial and yeast counts, and endotoxin testing. Not some batches. Not flagship products. <strong className="text-foreground">Every batch. Every product. Every time.</strong>
              </p>
              <p>
                Then we publish the full results. No logins. No paywalls. No vague "certificate on file" language. Every Certificate of Analysis is publicly available, batch-specific, and linked via QR code on every order. If you want to verify what you're buying before you buy it — you can.
              </p>
              <p>
                This isn't a marketing angle. It's the entire point. The research peptide market lost trust because vendors treated transparency as optional. We're building Clarum on the belief that it should be the default.
              </p>
            </div>
          </div>
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
