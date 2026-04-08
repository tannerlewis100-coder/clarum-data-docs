import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { allProducts, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCat = searchParams.get("cat") || "All";
  const revealRef = useScrollReveal();

  const filtered = useMemo(() => {
    if (activeCat === "All") return allProducts;
    return allProducts.filter((p) => p.category === activeCat);
  }, [activeCat]);

  const allCats = ["All", ...categories.map((c) => c.slug)];

  return (
    <div ref={revealRef}>
      <section className="bg-navy gold-line-texture pt-28 pb-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-body font-semibold">Catalog</span>
          <h1 className="text-4xl lg:text-5xl font-display text-primary-foreground mt-2">
            Research Peptide Catalog
          </h1>
          <p className="text-primary-foreground/50 font-body mt-3 max-w-lg mx-auto">
            61 compounds. Every batch tested with full 5-panel COA.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10 reveal">
            {allCats.map((cat) => (
              <button
                key={cat}
                onClick={() => setSearchParams(cat === "All" ? {} : { cat })}
                className={`text-xs uppercase tracking-wider font-body font-semibold px-4 py-2 rounded-full border transition-all ${
                  activeCat === cat
                    ? "bg-gold text-navy-deep border-gold"
                    : "border-border text-muted-foreground hover:border-gold/40 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 reveal">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground font-body py-20">No products found in this category.</p>
          )}
        </div>
      </section>
    </div>
  );
}
