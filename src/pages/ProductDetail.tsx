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

              {/* 5-Panel COA */}
              <div className="bg-white/[0.03] rounded-2xl border border-white/[0.06] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FlaskConical className="h-4 w-4 text-gold" />
                  <h3 className="font-display text-lg text-white">5-Panel COA Results</h3>
                </div>
                <div className="space-y-3">
                  {testPanels.map((panel) => (
                    <div key={panel.label} className="flex items-center justify-between text-sm font-body">
                      <span className="text-white/50">{panel.label}</span>
                      <span className="flex items-center gap-1.5 font-semibold text-emerald-400">
                        <Check className="h-3.5 w-3.5" />
                        {panel.result}
                      </span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/coa-library"
                  className="mt-4 inline-flex items-center gap-1 text-xs text-gold font-body font-semibold hover:text-gold-light transition-colors"
                >
                  View Full COA Library →
                </Link>
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
