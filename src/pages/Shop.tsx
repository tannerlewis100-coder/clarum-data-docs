import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, ChevronDown, Loader2 } from "lucide-react";
import { useWcProducts, useWcCategories } from "@/hooks/use-wc-products";
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
  const gridRef = useRef<HTMLDivElement>(null);

  const { data: products, isLoading, error } = useWcProducts();
  const { data: categories } = useWcCategories();

  const filtered = useMemo(() => {
    if (!products) return [];
    let items = activeCat === "All" ? products : products.filter((p) => p.categorySlug === activeCat);

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      items = items.filter((p) => p.name.toLowerCase().includes(q));
    }

    items = items.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    return items;
  }, [products, activeCat, query, priceRange]);

  // Stagger fade-in
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll("[data-product-card]");
    const timers: number[] = [];
    cards.forEach((card, i) => {
      const el = card as HTMLElement;
      el.style.opacity = "0";
      el.style.transform = "translateY(12px)";
      const t = window.setTimeout(() => {
        el.style.transition = "opacity 0.4s ease-out, transform 0.4s ease-out";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, i * 80);
      timers.push(t);
    });
    return () => {
      timers.forEach(clearTimeout);
      // Ensure cards stay visible if effect re-runs / unmounts mid-animation
      cards.forEach((card) => {
        const el = card as HTMLElement;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    };
  }, [filtered]);

  return (
    <div ref={revealRef}>
      <section className="bg-navy gold-line-texture pt-28 pb-16 border-b border-white/[0.03]">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-body font-semibold">Catalog</span>
          <h1 className="text-4xl lg:text-5xl font-display text-white mt-2">
            Pharmaceutical Peptide Catalog
          </h1>
          <p className="text-white/50 font-body mt-3 max-w-lg mx-auto">
            Every batch tested with full 5-panel COA. Nothing hidden.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-20 bg-navy-alt">
        <div className="container mx-auto px-4 lg:px-8">

          {/* ── Toolbar ── */}
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center mb-8 reveal">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <input
                type="text"
                placeholder="Search peptides..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-white/[0.08] bg-white/[0.04] text-sm font-body text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50 transition-all"
              />
            </div>

            {/* Category Dropdown */}
            <div className="relative">
              <select
                value={activeCat}
                onChange={(e) => setSearchParams(e.target.value === "All" ? {} : { cat: e.target.value })}
                className="appearance-none text-xs font-body font-semibold uppercase tracking-wider bg-white/[0.04] border border-white/[0.08] rounded-full pl-4 pr-8 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold/50 cursor-pointer transition-all"
              >
                <option value="All">All Categories</option>
                {categories?.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-white/30 pointer-events-none" />
            </div>

            {/* Price Range */}
            <div className="min-w-[260px]">
              <div className="flex justify-between mb-1.5">
                <span className="text-[10px] font-body font-semibold uppercase tracking-wider text-white/30">Price</span>
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

          {/* ── Loading / Error ── */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 text-gold animate-spin" />
              <span className="ml-3 text-white/50 font-body">Loading products...</span>
            </div>
          )}

          {error && (
            <div className="text-center py-20">
              <p className="text-white/50 font-body">Unable to load products. Please try again later.</p>
            </div>
          )}

          {!isLoading && !error && (
            <>
              {/* ── Product Count ── */}
              <p className="text-xs text-white/50 font-body mb-6 reveal">
                Showing <span className="text-white font-semibold">{filtered.length}</span> product{filtered.length !== 1 ? "s" : ""}
              </p>

              {/* ── Grid ── */}
              <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {filtered.length === 0 && (
                <p className="text-center text-white/50 font-body py-20">No products found matching your filters.</p>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
