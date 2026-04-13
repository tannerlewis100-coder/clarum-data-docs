import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { allProducts } from "@/data/products";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import CoaCard from "@/components/CoaCard";

export default function COALibrary() {
  const [search, setSearch] = useState("");
  const revealRef = useScrollReveal();

  const filtered = useMemo(() => {
    if (!search) return allProducts;
    return allProducts.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()));
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
            Full 6-panel Certificates of Analysis for every product, every batch. No login required.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((product) => (
              <CoaCard
                key={product.id}
                name={product.name}
                form={product.coa.form}
                coa={product.coa}
                coaUrl={product.coaUrl}
                coaImage={product.coaImage}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
