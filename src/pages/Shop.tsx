import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { allProducts, categories, groupProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCat = searchParams.get("cat") || "All";
  const [query, setQuery] = useState("");
  const revealRef = useScrollReveal();

  const grouped = useMemo(() => {
    let items = activeCat === "All" ? allProducts : allProducts.filter((p) => p.category === activeCat);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      items = items.filter((p) => p.name.toLowerCase().includes(q));
    }
    return groupProducts(items);
  }, [activeCat, query]);

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
          {/* Search */}
          <div className="relative max-w-md mb-8 reveal">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search peptides..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-border bg-background text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50 transition-all"
            />
          </div>

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
            {grouped.map(([first, variants]) => (
              <ProductCard key={first.id} product={first} variants={variants} />
            ))}
          </div>

          {grouped.length === 0 && (
            <p className="text-center text-muted-foreground font-body py-20">No products found in this category.</p>
          )}
        </div>
      </section>
    </div>
  );
}
