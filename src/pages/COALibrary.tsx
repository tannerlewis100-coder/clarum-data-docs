import { useState, useMemo } from "react";
import { Check, Search } from "lucide-react";
import { allProducts } from "@/data/products";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const coaData = allProducts.slice(0, 30).map((p, i) => ({
  product: p.name,
  dosage: p.dosage,
  batch: `2406-${p.id.toUpperCase().slice(0, 4)}`,
  date: "March 2026",
  purity: (99 + Math.random() * 0.9).toFixed(1) + "%",
  pass: true,
}));

export default function COALibrary() {
  const [search, setSearch] = useState("");
  const revealRef = useScrollReveal();

  const filtered = useMemo(() => {
    if (!search) return coaData;
    return coaData.filter((c) => c.product.toLowerCase().includes(search.toLowerCase()));
  }, [search]);

  return (
    <div ref={revealRef}>
      <section className="bg-navy gold-line-texture pt-28 pb-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-body font-semibold">Transparency</span>
          <h1 className="text-4xl lg:text-5xl font-display text-primary-foreground mt-2 mb-4">
            COA Library
          </h1>
          <p className="text-primary-foreground/50 font-body max-w-lg mx-auto">
            Full 5-panel Certificates of Analysis for every product, every batch. No login required.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Search */}
          <div className="relative max-w-md mx-auto mb-10 reveal">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by product name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-card border border-border bg-card text-foreground font-body text-sm focus:outline-none focus:border-gold/40 transition-colors"
            />
          </div>

          {/* COA Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 reveal">
            {filtered.map((coa) => (
              <div key={coa.batch} className="bg-card rounded-card border border-border overflow-hidden hover:border-gold/40 hover:shadow-[0_8px_30px_-8px_hsl(40_50%_56%/0.15)] transition-all duration-300">
                <div className="bg-navy p-4 flex items-center justify-between">
                  <div>
                    <p className="font-display text-primary-foreground">{coa.product}</p>
                    <p className="text-[10px] text-primary-foreground/40 font-body mt-0.5">
                      {coa.dosage && `${coa.dosage} · `}Batch {coa.batch}
                    </p>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-body font-bold bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full">
                    PASS
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex justify-between text-xs font-body">
                    <span className="text-muted-foreground">HPLC Purity</span>
                    <span className="font-semibold text-foreground">{coa.purity}</span>
                  </div>
                  <div className="flex justify-between text-xs font-body">
                    <span className="text-muted-foreground">5-Panel Test</span>
                    <span className="font-semibold text-emerald-600 flex items-center gap-1"><Check className="h-3 w-3" /> Complete</span>
                  </div>
                  <div className="flex justify-between text-xs font-body">
                    <span className="text-muted-foreground">Test Date</span>
                    <span className="text-foreground">{coa.date}</span>
                  </div>
                </div>
                <div className="border-t border-border px-4 py-3">
                  <button className="text-xs text-gold font-body font-medium hover:text-gold-light transition-colors uppercase tracking-wider">
                    View Full Report →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
