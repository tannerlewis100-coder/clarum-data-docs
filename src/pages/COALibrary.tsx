import { useState, useMemo, useEffect, useRef } from "react";
import { Search, ChevronRight, ExternalLink, Loader2, CheckCircle2, Shield } from "lucide-react";
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

const TEST_FIELDS = [
  { label: "Purity", key: "purity" },
  { label: "Assay", key: "assay" },
  { label: "Identity", key: "identity" },
  { label: "Heavy Metals", key: "heavyMetals" },
  { label: "TAMC", key: "tamc" },
  { label: "TYMC", key: "tymc" },
] as const;

function hasCoa(product: { id: string; coaUrl?: string; coaImage?: string; coaEmbed?: string }) {
  if (COMING_SOON_IDS.has(product.id)) return false;
  return !!(product.coaUrl || product.coaImage || product.coaEmbed);
}

/** Convert a Google Drive folder or file URL to a /preview iframe URL if possible */
function getEmbedUrl(product: { coaEmbed?: string; coaUrl?: string }): string | null {
  if (product.coaEmbed) return product.coaEmbed;
  if (product.coaUrl) {
    // Match /file/d/{ID}/ pattern
    const fileMatch = product.coaUrl.match(/\/file\/d\/([^/]+)/);
    if (fileMatch) return `https://drive.google.com/file/d/${fileMatch[1]}/preview`;
  }
  return null;
}

export default function COALibrary() {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState<Record<string, boolean>>({});
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
          <h1 className="text-4xl lg:text-5xl font-display text-white mt-2 mb-3">
            COA Library
          </h1>
          <p className="text-white/50 font-body max-w-lg mx-auto">
            Every batch. Every test. Publicly available.
          </p>
        </div>
      </section>

      {/* Search + Filters */}
      <section className="container mx-auto px-4 lg:px-8 -mt-4 relative z-10">
        <div className="relative max-w-xl mx-auto mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gold" />
          <input
            type="text"
            placeholder="Search by product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white font-body text-sm placeholder:text-white/25 focus:outline-none focus:border-gold/30 transition-colors"
          />
        </div>

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
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {filtered.map((product) => {
            const isComingSoon = !hasCoa(product);
            const isExpanded = expandedId === product.id;
            const embedUrl = getEmbedUrl(product);

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
                }`}
                onClick={() => {
                  if (isComingSoon) return;
                  if (!isExpanded) {
                    setIframeLoaded((prev) => ({ ...prev, [product.id]: false }));
                  }
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
                      <h3 className="font-display text-xl text-white leading-tight">
                        {product.name}
                        {product.dosage && (
                          <span className="text-white/30 text-base ml-2">{product.dosage}</span>
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

                {/* Expanded content — iframe embed */}
                <div
                  className={`transition-all duration-300 ease-out overflow-hidden ${
                    isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-5 pb-5" onClick={(e) => e.stopPropagation()}>
                    {/* PDF iframe or placeholder */}
                    {embedUrl ? (
                      <div className="mt-2 rounded-xl bg-white overflow-hidden relative" style={{ height: 700 }}>
                        {!iframeLoaded[product.id] && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white">
                            <Loader2 className="h-8 w-8 text-gold animate-spin" />
                          </div>
                        )}
                        <iframe
                          src={embedUrl}
                          width="100%"
                          height="700"
                          style={{ border: "none", borderRadius: 12 }}
                          allow="autoplay"
                          onLoad={() => setIframeLoaded((prev) => ({ ...prev, [product.id]: true }))}
                          title={`COA for ${product.name}`}
                        />
                      </div>
                    ) : (
                      <div className="mt-2 rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-hidden flex flex-col items-center justify-center gap-4 py-12 px-6">
                        <Shield className="h-10 w-10 text-gold/60" />
                        <div className="text-center">
                          <p className="text-white/50 text-sm font-body mb-1">Full lab report available on Google Drive</p>
                          <p className="text-white/30 text-xs font-body">View the original certificate of analysis</p>
                        </div>
                        {product.coaUrl && (
                          <a
                            href={product.coaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gold/10 hover:bg-gold/20 text-gold text-xs font-body font-semibold uppercase tracking-wider px-5 py-2.5 rounded-lg border border-gold/20 transition-colors"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                            Open Full Report
                          </a>
                        )}
                      </div>
                    )}

                    {/* Test Results Mini-Grid */}
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      {TEST_FIELDS.map((field) => {
                        const value = (product.coa as any)[field.key] || "N/A";
                        return (
                          <div
                            key={field.key}
                            className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-2 text-center"
                          >
                            <p className="text-[9px] text-white/30 uppercase tracking-wider font-body mb-0.5">
                              {field.label}
                            </p>
                            <div className="flex items-center justify-center gap-1">
                              <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                              <span className="text-[11px] text-white/60 font-body font-medium">{value}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-3 mt-4">
                      {product.coaUrl && (
                        <a
                          href={product.coaUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] text-gold text-[11px] font-body font-semibold uppercase tracking-wider px-4 py-2.5 rounded-lg border border-white/[0.06] transition-colors"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Download Full Report →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
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
          <h2 className="text-3xl lg:text-4xl font-display text-white mt-2 mb-4">
            Independent Third-Party Verified
          </h2>
          <p className="text-white/40 font-body leading-relaxed mb-3">
            Every product is tested by{" "}
            <span className="text-white/60 font-semibold">
              Analytical Formulations, Inc. (AFI)
            </span>
            , a DEA-licensed, ISO 17025-accredited analytical laboratory.
          </p>
          <p className="text-white/40 font-body leading-relaxed mb-8">
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
