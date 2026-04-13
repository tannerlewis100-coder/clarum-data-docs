import { useState, useMemo, useEffect, useRef } from "react";
import { Search, ChevronRight, ExternalLink, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { allProducts } from "@/data/products";

const COA_CATEGORIES = [
  { label: "All", slug: "All" },
  { label: "Recovery", slug: "Recovery" },
  { label: "Growth Hormone", slug: "Growth Hormone" },
  { label: "Longevity", slug: "Longevity" },
  { label: "Skin & Radiance", slug: "Skin" },
  { label: "Cognitive", slug: "Cognitive" },
  { label: "Immune", slug: "Immune" },
  { label: "Metabolic", slug: "Weight Management" },
  { label: "NAD+", slug: "NAD+" },
  { label: "Sexual Health", slug: "Sexual Health" },
  { label: "Blends", slug: "Blends" },
  { label: "Supplies", slug: "Supplies" },
];

const COMING_SOON_IDS = new Set([
  "aicar", "glp-3-rz", "hcg", "hmg", "igf-1-lr3-01mg", "igf-1-lr3-1mg", "igf-des",
  "recon-water-3ml", "recon-water-10ml",
]);

function hasCoa(product: { id: string; coaUrl?: string; coaImage?: string; coaEmbed?: string }) {
  if (COMING_SOON_IDS.has(product.id)) return false;
  return !!(product.coaUrl || product.coaImage || product.coaEmbed);
}

function CoaIframeEmbed({ url, name }: { url: string; name: string }) {
  const [loading, setLoading] = useState(true);
  // Convert folder URLs to embeddable format
  let embedUrl = url;
  if (url.includes("/drive/folders/")) {
    const folderId = url.split("/drive/folders/")[1]?.split("?")[0];
    if (folderId) embedUrl = `https://drive.google.com/embeddedfolderview?id=${folderId}#list`;
  }

  return (
    <div className="mt-4 rounded-xl bg-white overflow-hidden relative" style={{ height: 700 }}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <Loader2 className="h-8 w-8 text-gold animate-spin" />
        </div>
      )}
      <iframe
        src={embedUrl}
        title={`COA for ${name}`}
        className="w-full h-full border-0"
        onLoad={() => setLoading(false)}
        allow="autoplay"
      />
    </div>
  );
}

export default function COALibrary() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    let items = allProducts;
    if (activeCat !== "All") items = items.filter((p) => p.category === activeCat);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      items = items.filter((p) => p.name.toLowerCase().includes(q));
    }
    return items;
  }, [search, activeCat]);

  // Stagger fade-in
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll("[data-coa-card]");
    cards.forEach((card, i) => {
      const el = card as HTMLElement;
      el.style.opacity = "0";
      el.style.transform = "translateY(12px)";
      setTimeout(() => {
        el.style.transition = "opacity 0.4s ease-out, transform 0.4s ease-out";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, i * 80);
    });
  }, [filtered]);

  return (
    <div className="bg-navy min-h-screen">
      {/* Hero */}
      <section className="gold-line-texture pt-28 pb-14">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-body font-semibold">
            Transparency
          </span>
          <h1 className="text-4xl lg:text-5xl font-display text-primary-foreground mt-2 mb-3">
            COA Library
          </h1>
          <p className="text-primary-foreground/50 font-body max-w-lg mx-auto">
            Every batch. Every test. Publicly available.
          </p>
        </div>
      </section>

      {/* Search + Filters */}
      <section className="container mx-auto px-4 lg:px-8 -mt-4 relative z-10">
        {/* Search */}
        <div className="relative max-w-xl mx-auto mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gold" />
          <input
            type="text"
            placeholder="Search by product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-primary-foreground font-body text-sm placeholder:text-white/25 focus:outline-none focus:border-gold/30 transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {COA_CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => { setActiveCat(cat.slug); setExpandedId(null); }}
              className={`text-[11px] font-body font-semibold uppercase tracking-wider px-4 py-2 rounded-full border transition-all duration-200 ${
                activeCat === cat.slug
                  ? "bg-gold/15 border-gold/30 text-gold"
                  : "bg-white/[0.03] border-white/[0.06] text-white/40 hover:text-white/60 hover:border-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Cards Grid */}
      <section className="container mx-auto px-4 lg:px-8 pb-20">
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((product) => {
            const isComingSoon = !hasCoa(product);
            const isExpanded = expandedId === product.id;
            const embedSource = product.coaEmbed || product.coaUrl;

            return (
              <div
                key={product.id}
                data-coa-card
                className={`relative rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col ${
                  isComingSoon
                    ? "bg-white/[0.02] border-white/[0.04] opacity-60 cursor-default"
                    : isExpanded
                    ? "bg-white/[0.04] border-gold/30 shadow-[0_4px_20px_rgba(196,160,90,0.1)]"
                    : "bg-white/[0.03] border-white/[0.06] hover:border-gold/20 hover:-translate-y-px hover:shadow-[0_4px_20px_rgba(196,160,90,0.08)] cursor-pointer"
                } ${isExpanded ? "sm:col-span-2 lg:col-span-3" : ""}`}
                onClick={() => {
                  if (isComingSoon) return;
                  setExpandedId(isExpanded ? null : product.id);
                }}
              >
                <div className="flex">
                  {/* Gold accent bar */}
                  <div className="w-1 bg-gold/40 shrink-0" />

                  {/* Card content */}
                  <div className="flex-1 p-5">
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="font-display text-xl text-primary-foreground leading-tight">
                        {product.name}
                        {product.dosage && (
                          <span className="text-primary-foreground/30 text-base ml-2">{product.dosage}</span>
                        )}
                      </h3>
                      {isComingSoon ? (
                        <span className="shrink-0 bg-white/10 text-white/30 text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full font-body">
                          Coming Soon
                        </span>
                      ) : (
                        <span className="shrink-0 bg-emerald-500/15 text-emerald-400 text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 font-body">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          Pass
                        </span>
                      )}
                    </div>

                    {/* Form */}
                    <p className="text-xs text-white/30 font-body mb-3">{product.coa.form}</p>

                    {/* Stat chips */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      <span className="text-[10px] text-white/25 bg-white/[0.03] px-2 py-0.5 rounded-full border border-white/[0.04] font-body">
                        {product.coa.purity} Purity
                      </span>
                      <span className="text-[10px] text-white/25 bg-white/[0.03] px-2 py-0.5 rounded-full border border-white/[0.04] font-body">
                        Heavy Metals: {product.coa.heavyMetals}
                      </span>
                      <span className="text-[10px] text-white/25 bg-white/[0.03] px-2 py-0.5 rounded-full border border-white/[0.04] font-body">
                        6 Panel
                      </span>
                    </div>

                    {/* View Certificate link */}
                    {!isComingSoon && (
                      <div className="flex items-center gap-1">
                        <span className="text-gold text-xs uppercase tracking-wider font-body font-semibold">
                          View Certificate
                        </span>
                        <ChevronRight
                          className={`h-3.5 w-3.5 text-gold transition-transform duration-300 ${
                            isExpanded ? "rotate-90" : ""
                          }`}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Expanded content */}
                {isExpanded && embedSource && (
                  <div
                    className="px-5 pb-5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {product.coaImage ? (
                      <div className="mt-2 rounded-xl bg-white overflow-hidden">
                        <img
                          src={product.coaImage}
                          alt={`Certificate of Analysis for ${product.name}`}
                          className="w-full h-auto"
                        />
                      </div>
                    ) : (
                      <CoaIframeEmbed url={embedSource} name={product.name} />
                    )}

                    <div className="mt-4 flex items-center gap-4">
                      {product.coaUrl && (
                        <a
                          href={product.coaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gold text-xs uppercase tracking-wider font-body font-semibold flex items-center gap-1.5 hover:text-gold/80 transition-colors"
                        >
                          Download Full Report
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-white/30 font-body py-20">
            No products found matching your search.
          </p>
        )}
      </section>

      {/* Bottom Section — Third-Party Verified */}
      <section className="border-t border-white/[0.06] bg-white/[0.02]">
        <div className="container mx-auto px-4 lg:px-8 py-20 text-center max-w-2xl">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-body font-semibold">
            Quality Assurance
          </span>
          <h2 className="text-3xl lg:text-4xl font-display text-primary-foreground mt-2 mb-4">
            Independent Third-Party Verified
          </h2>
          <p className="text-primary-foreground/40 font-body leading-relaxed mb-3">
            Every product is tested by{" "}
            <span className="text-primary-foreground/60 font-semibold">
              Analytical Formulations, Inc. (AFI)
            </span>
            , a DEA-licensed, ISO 17025-accredited analytical laboratory.
          </p>
          <p className="text-primary-foreground/40 font-body leading-relaxed mb-8">
            All products undergo comprehensive 6-panel testing including purity, assay, identity confirmation,
            heavy metals screening, and microbial limits (TAMC &amp; TYMC).
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-navy text-xs font-body font-bold uppercase tracking-wider px-8 py-3.5 rounded-lg transition-colors"
          >
            Shop the Catalog
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
