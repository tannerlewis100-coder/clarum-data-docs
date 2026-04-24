import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  ArrowLeft,
  ShoppingCart,
  Shield,
  FlaskConical,
  Loader2,
  Atom,
  Bug,
  Syringe,
  ExternalLink,
  Download,
  Hash,
  Calendar,
} from "lucide-react";
import { useWcProductBySlug, useWcProducts } from "@/hooks/use-wc-products";
import { useCart } from "@/contexts/CartContext";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { getProductDescription } from "@/data/descriptions";
import { allProducts as localProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";

const PLACEHOLDER = "Available upon batch release";

const testPanels = [
  { icon: FlaskConical, label: "Purity Testing", method: "HPLC", spec: "≥99% specification" },
  { icon: Atom, label: "Identity Verification", method: "Mass Spectrometry (LC-MS)", spec: "Molecular identity confirmed" },
  { icon: Shield, label: "Heavy Metals", method: "ICP-MS", spec: "As, Pb, Hg, Cd screened" },
  { icon: Bug, label: "Microbial Testing", method: "Total Aerobic / Yeast & Mold", spec: "Per USP standards" },
  { icon: Syringe, label: "Endotoxin Testing", method: "LAL Assay", spec: "Bacterial endotoxin screen" },
];

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const revealRef = useScrollReveal();
  const { addItem } = useCart();
  const { data: product, isLoading, error } = useWcProductBySlug(slug);
  const { data: allProducts } = useWcProducts();

  const hasVariations = product?.type === "variable" && (product?.variations?.length ?? 0) > 0;
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (isLoading) {
    return (
      <div ref={revealRef}>
        <div className="pt-32 pb-20 flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-gold animate-spin" />
          <span className="ml-3 text-white/50 font-body">Loading product...</span>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div ref={revealRef}>
        <div className="pt-32 pb-20 text-center">
          <h1 className="font-display text-3xl text-white">Product Not Found</h1>
          <Link to="/shop" className="text-gold font-body text-sm mt-4 inline-block hover:text-gold-light">
            ← Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const selectedVariation = hasVariations ? product.variations[selectedIdx] : null;
  const displayPrice = selectedVariation ? selectedVariation.price : product.price;
  const displaySize = selectedVariation?.size;

  const variantInStock = selectedVariation ? selectedVariation.inStock : product.inStock;
  const anyInStock = hasVariations
    ? product.variations.some((v) => v.inStock)
    : product.inStock;
  const soldOut = !variantInStock || !anyInStock;

  const description = getProductDescription(product.slug, product.description);
  const metaDescription = description.slice(0, 155).replace(/\s+\S*$/, "") + "…";
  const canonicalUrl = `https://clarumpeptides.com/product/${product.slug}`;

  // Try to surface real COA assets from local catalog when available; otherwise show placeholders.
  const localMatch = localProducts.find(
    (p) =>
      p.id === product.slug ||
      (selectedVariation && `${p.id}` === product.slug && p.dosage === displaySize),
  );
  const coaUrl = localMatch?.coaUrl;
  const coaImage = localMatch?.coaImage;
  const batchNumber = localMatch?.coaBatch || PLACEHOLDER;
  const testDate = localMatch?.coa?.date || PLACEHOLDER;
  const hasCoa = Boolean(coaUrl || coaImage);

  const related = (allProducts ?? [])
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    description: metaDescription,
    sku: String(product.id),
    category: product.category,
    image: product.image ? [product.image] : undefined,
    brand: { "@type": "Brand", name: "Clarum Peptides" },
    offers: {
      "@type": "Offer",
      url: canonicalUrl,
      priceCurrency: "USD",
      price: displayPrice,
      availability: anyInStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  const handleAdd = () => {
    if (soldOut) return;
    addItem({
      wcProductId: product.id,
      wcVariationId: selectedVariation?.id,
      name: product.name,
      price: displayPrice,
      size: displaySize,
      slug: product.slug,
      category: product.category,
    });
  };

  return (
    <div ref={revealRef}>
      <Helmet>
        <title>{`${product.name}${displaySize ? ` ${displaySize}` : ""} — ≥99% HPLC Verified | CLARUM`}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={`${product.name}${displaySize ? ` ${displaySize}` : ""} — Clarum Peptides`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Clarum Peptides" />
        <meta property="og:image" content={product.image || "https://clarumpeptides.com/clarum-og.png"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.name}${displaySize ? ` ${displaySize}` : ""} — Clarum Peptides`} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={product.image || "https://clarumpeptides.com/clarum-og.png"} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Hero banner */}
      <section className="bg-navy gold-line-texture pt-28 pb-12 border-b border-white/[0.03]">
        <div className="container mx-auto px-4 lg:px-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-gold/70 hover:text-gold font-body font-semibold transition-colors mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Catalog
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.15em] text-gold font-body font-semibold bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">
              {product.category}
            </span>
            {!anyInStock && (
              <span className="text-[10px] uppercase tracking-[0.15em] text-destructive font-body font-semibold bg-destructive/10 border border-destructive/30 px-3 py-1 rounded-full">
                Sold Out
              </span>
            )}
          </div>
          <h1 className="text-4xl lg:text-5xl font-display text-white mt-3">
            {product.name}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-20 bg-navy-alt">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Left: Image / Visual */}
            <div className="reveal">
              <div className="relative aspect-square rounded-2xl bg-navy gold-grid-texture overflow-hidden border border-white/[0.06]">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.06] via-transparent to-gold/[0.03]" />
                {product.image ? (
                  <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-contain p-8" />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gold/50 font-body font-semibold mb-3">
                      {product.category}
                    </span>
                    <span className="font-display text-4xl lg:text-5xl text-white">
                      {product.name}
                    </span>
                    {displaySize && (
                      <span className="text-sm text-white/40 font-body mt-2">{displaySize}</span>
                    )}
                  </div>
                )}

                {/* COA badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 bg-navy/80 backdrop-blur-sm rounded-lg px-4 py-3 border border-gold/10">
                  <Shield className="h-4 w-4 text-gold shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gold font-body font-semibold">5-Panel COA Verified</p>
                    <p className="text-[9px] text-white/40 font-body">Full report available</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Details */}
            <div className="reveal">
              {/* Price */}
              <div className="mb-6">
                <span className="text-3xl font-display bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
                  ${displayPrice}
                </span>
              </div>

              {/* Variant selector */}
              {hasVariations && product.variations.length > 1 && (
                <div className="mb-8">
                  <p className="text-[10px] uppercase tracking-wider text-white/30 font-body font-semibold mb-2">Select Size</p>
                  <div className="flex flex-wrap gap-2">
                    {product.variations.map((v, i) => (
                      <button
                        key={v.id}
                        onClick={() => v.inStock && setSelectedIdx(i)}
                        disabled={!v.inStock}
                        className={`text-xs font-body font-semibold px-4 py-2 rounded-full border transition-all ${
                          !v.inStock
                            ? "border-white/[0.04] text-white/15 line-through cursor-not-allowed"
                            : i === selectedIdx
                            ? "bg-gold/15 border-gold/40 text-gold"
                            : "border-white/[0.08] text-white/30 hover:border-gold/20"
                        }`}
                      >
                        {v.size} — ${v.price}
                        {!v.inStock && " (Sold Out)"}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to cart */}
              <button
                onClick={handleAdd}
                disabled={soldOut}
                className="inline-flex items-center gap-2 bg-gold text-navy font-body font-semibold text-sm uppercase tracking-wider px-8 py-3.5 rounded-lg hover:bg-gold-light transition-colors mb-10 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gold"
              >
                <ShoppingCart className="h-4 w-4" />
                {soldOut ? "Sold Out" : "Add to Cart"}
              </button>

              {/* Description */}
              <div className="mb-10">
                <h2 className="font-display text-xl text-white mb-3">About This Product</h2>
                <p className="text-sm text-white/50 font-body leading-relaxed">
                  {description}
                </p>
                <p className="text-[10px] text-white/25 font-body mt-4 uppercase tracking-wider">
                  For in vitro laboratory research use only. Not for human or veterinary consumption.
                </p>
              </div>

              {/* Testing & COA */}
              <div className="relative rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.015] p-6 lg:p-7 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gold/[0.05] blur-3xl pointer-events-none" />

                {/* Header */}
                <div className="relative flex items-start justify-between mb-6 pb-5 border-b border-white/[0.06]">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center shrink-0">
                      <FlaskConical className="h-4 w-4 text-gold" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-[0.2em] text-gold/70 font-body font-semibold">
                        5-Panel Independent Lab
                      </span>
                      <h3 className="font-display text-lg text-white mt-0.5">Testing & COA</h3>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase tracking-wider font-body font-bold bg-gold/10 text-gold px-3 py-1 rounded-full border border-gold/20 whitespace-nowrap">
                    Verified
                  </span>
                </div>

                {/* Test panels */}
                <ul className="relative space-y-3 mb-6">
                  {testPanels.map((panel) => {
                    const Icon = panel.icon;
                    return (
                      <li
                        key={panel.label}
                        className="flex items-start gap-3 py-1"
                      >
                        <div className="w-7 h-7 rounded-md border border-white/[0.08] bg-white/[0.02] flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="h-3.5 w-3.5 text-gold/80" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-body font-semibold text-white leading-tight">
                            {panel.label}
                          </p>
                          <p className="text-[11px] text-white/40 font-body mt-0.5">
                            {panel.method} · {panel.spec}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {/* Batch + Date metadata */}
                <div className="relative grid grid-cols-2 gap-3 mb-6">
                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Hash className="h-3 w-3 text-gold/60" />
                      <span className="text-[9px] uppercase tracking-wider text-white/40 font-body font-semibold">
                        Batch Number
                      </span>
                    </div>
                    <p className={`text-xs font-body ${batchNumber === PLACEHOLDER ? "text-white/35 italic" : "text-white font-semibold tabular-nums"}`}>
                      {batchNumber}
                    </p>
                  </div>
                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Calendar className="h-3 w-3 text-gold/60" />
                      <span className="text-[9px] uppercase tracking-wider text-white/40 font-body font-semibold">
                        Test Date
                      </span>
                    </div>
                    <p className={`text-xs font-body ${testDate === PLACEHOLDER ? "text-white/35 italic" : "text-white font-semibold"}`}>
                      {testDate}
                    </p>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="relative flex flex-col sm:flex-row gap-2.5">
                  {hasCoa ? (
                    <>
                      <a
                        href={coaUrl || coaImage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-gold text-navy font-body font-semibold text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg hover:bg-gold-light transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        View COA
                      </a>
                      <a
                        href={coaImage || coaUrl}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 border border-gold/40 text-gold font-body font-semibold text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg hover:bg-gold/10 transition-colors"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download COA
                      </a>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        disabled
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-white/[0.04] text-white/30 font-body font-semibold text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg cursor-not-allowed border border-white/[0.06]"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        View COA
                      </button>
                      <button
                        type="button"
                        disabled
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-white/[0.04] text-white/30 font-body font-semibold text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg cursor-not-allowed border border-white/[0.06]"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Download COA
                      </button>
                    </>
                  )}
                </div>

                {!hasCoa && (
                  <p className="relative mt-4 text-[11px] text-white/35 font-body italic text-center">
                    COA documents publish with each batch release.
                  </p>
                )}

                <div className="relative mt-5 pt-4 border-t border-white/[0.06] text-center">
                  <Link
                    to="/coa-library"
                    className="inline-flex items-center gap-1 text-[11px] text-gold/80 font-body font-semibold hover:text-gold transition-colors uppercase tracking-wider"
                  >
                    Browse Full COA Library →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Related products */}
          {related.length > 0 && (
            <div className="mt-20 reveal">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gold/70 font-body font-semibold">
                    Continue Exploring
                  </span>
                  <h2 className="font-display text-3xl text-white mt-1">Related Compounds</h2>
                </div>
                <Link
                  to="/shop"
                  className="hidden md:inline-flex items-center gap-1 text-xs text-gold font-body font-semibold hover:text-gold-light transition-colors"
                >
                  View All →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
