import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, ChevronDown } from "lucide-react";
import { allProducts, categories, groupProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { Slider } from "@/components/ui/slider";

const MIN_PRICE = 0;
const MAX_PRICE = 400;

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCat = searchParams.get("cat") || "All";
  const [query, setQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);
  const revealRef = useScrollReveal();

  const grouped = useMemo(() => {
    let items = activeCat === "All" ? allProducts : allProducts.filter((p) => p.category === activeCat);

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      items = items.filter((p) => p.name.toLowerCase().includes(q));
    }

    items = items.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    return groupProducts(items);
  }, [activeCat, query, priceRange]);

  return (
    <div ref={revealRef}>
      <section className="bg-navy gold-line-texture pt-28 pb-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-body font-semibold">Catalog</span>
          <h1 className="text-4xl lg:text-5xl font-display text-primary-foreground mt-2">
            Pharmaceutical Peptide Catalog
          </h1>
          <p className="text-primary-foreground/50 font-body mt-3 max-w-lg mx-auto">
            Every batch tested with full 5-panel COA. Nothing hidden.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">

          {/* ── Toolbar ── */}
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center mb-8 reveal">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search peptides..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-border bg-background text-sm font-body placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50 transition-all"
              />
            </div>

            {/* Category Dropdown */}
            <div className="relative">
              <select
                value={activeCat}
                onChange={(e) => setSearchParams(e.target.value === "All" ? {} : { cat: e.target.value })}
                className="appearance-none text-xs font-body font-semibold uppercase tracking-wider bg-background border border-border rounded-full pl-4 pr-8 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50 cursor-pointer transition-all"
              >
                <option value="All">All Categories</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
            </div>

            {/* Price Range */}
            <div className="min-w-[260px]">
              <div className="flex justify-between mb-1.5">
                <span className="text-[10px] font-body font-semibold uppercase tracking-wider text-muted-foreground">Price</span>
                <span className="text-[10px] font-body font-semibold text-gold">
                  ${priceRange[0]} — ${priceRange[1]}
                </span>
              </div>
              <Slider
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={5}
                value={priceRange}
                onValueChange={(val) => setPriceRange(val as [number, number])}
                className="w-full"
              />
            </div>
          </div>

          {/* ── Product Count ── */}
          <p className="text-xs text-muted-foreground font-body mb-6 reveal">
            Showing <span className="text-foreground font-semibold">{grouped.length}</span> product{grouped.length !== 1 ? "s" : ""}
          </p>

          {/* ── Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 reveal">
            {grouped.map(([first, variants]) => (
              <ProductCard key={first.id} product={first} variants={variants} />
            ))}
          </div>

          {grouped.length === 0 && (
            <p className="text-center text-muted-foreground font-body py-20">No products found matching your filters.</p>
          )}
        </div>
      </section>
    </div>
  );
}
