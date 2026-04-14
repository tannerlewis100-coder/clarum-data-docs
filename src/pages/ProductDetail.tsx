import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Shield, FlaskConical, Check, Loader2 } from "lucide-react";
import { useWcProductBySlug } from "@/hooks/use-wc-products";
import { useCart } from "@/contexts/CartContext";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const testPanels = [
  { label: "HPLC Purity", result: "≥99%" },
  { label: "Mass Spectrometry", result: "Identity Confirmed" },
  { label: "Heavy Metals (ICP-MS)", result: "ND" },
  { label: "Microbial & Yeast", result: "Pass" },
  { label: "Endotoxin (LAL)", result: "Pass" },
];

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const revealRef = useScrollReveal();
  const { addItem } = useCart();
  const { data: product, isLoading, error } = useWcProductBySlug(slug);

  const hasVariations = product?.type === "variable" && (product?.variations?.length ?? 0) > 0;
  const [selectedIdx, setSelectedIdx] = useState(0);

  if (isLoading) {
    return (
      <div className="pt-32 pb-20 flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-gold animate-spin" />
        <span className="ml-3 text-white/50 font-body">Loading product...</span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="font-display text-3xl text-white">Product Not Found</h1>
        <Link to="/shop" className="text-gold font-body text-sm mt-4 inline-block hover:text-gold-light">
          ← Back to Shop
        </Link>
      </div>
    );
  }

  const selectedVariation = hasVariations ? product.variations[selectedIdx] : null;
  const displayPrice = selectedVariation ? selectedVariation.price : product.price;
  const displaySize = selectedVariation?.size;

  const handleAdd = () => {
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
                        onClick={() => setSelectedIdx(i)}
                        className={`text-xs font-body font-semibold px-4 py-2 rounded-full border transition-all ${
                          i === selectedIdx
                            ? "bg-gold/15 border-gold/40 text-gold"
                            : "border-white/[0.08] text-white/30 hover:border-gold/20"
                        }`}
                      >
                        {v.size} — ${v.price}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to cart */}
              <button
                onClick={handleAdd}
                className="inline-flex items-center gap-2 bg-gold text-navy font-body font-semibold text-sm uppercase tracking-wider px-8 py-3.5 rounded-lg hover:bg-gold-light transition-colors mb-10"
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </button>

              {/* Description */}
              <div className="mb-10">
                <h2 className="font-display text-xl text-white mb-3">About This Product</h2>
                <p className="text-sm text-white/50 font-body leading-relaxed">
                  {product.description || product.shortDescription || `${product.name} is a pharmaceutical-grade research compound. Every batch undergoes our mandatory 5-panel independent lab testing.`}
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
        </div>
      </section>
    </div>
  );
}
