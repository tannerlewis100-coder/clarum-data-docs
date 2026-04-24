import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, ShieldCheck, MapPin } from "lucide-react";
import type { WcProduct } from "@/lib/woocommerce";
import { useCart } from "@/contexts/CartContext";
import ProductCoaModal, { getLocalCoa, hasCoa } from "@/components/ProductCoaModal";

interface Props {
  product: WcProduct;
}

function getInitials(name: string): string {
  const cleaned = name.replace(/[^a-zA-Z0-9 -]/g, "").trim();
  const parts = cleaned.split(/[\s-]+/).filter(Boolean);
  if (parts.length === 0) return "·";
  if (parts.length === 1) return parts[0].slice(0, 3).toUpperCase();
  return (parts[0][0] + parts[1][0] + (parts[2]?.[0] ?? "")).toUpperCase();
}

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();
  const hasVariations = product.type === "variable" && product.variations.length > 0;
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [coaOpen, setCoaOpen] = useState(false);
  const coaAvailable = hasCoa(getLocalCoa(product.slug));

  const selectedVariation = hasVariations ? product.variations[selectedIdx] : null;
  const displayPrice = selectedVariation ? selectedVariation.price : product.price;
  const displaySize = selectedVariation?.size;

  const variantInStock = selectedVariation ? selectedVariation.inStock : product.inStock;
  const anyInStock = hasVariations
    ? product.variations.some((v) => v.inStock)
    : product.inStock;
  const soldOut = !variantInStock || !anyInStock;

  const variantSummary = hasVariations
    ? product.variations.map((v) => v.size).filter(Boolean).join(" / ")
    : displaySize;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
    <div className="group relative" data-product-card>
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-gold/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

      <div className="relative bg-white/[0.03] rounded-2xl border border-white/[0.06] overflow-hidden backdrop-blur-sm transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:border-gold/20 group-hover:shadow-[0_8px_30px_rgba(196,160,90,0.08)]">

        {/* ── Product art ── */}
        <Link to={`/product/${product.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-navy-alt via-navy to-navy-alt border-b border-white/[0.05]">
          {/* Subtle gold radial */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_30%,rgba(196,160,90,0.18),transparent_60%)]" />
          {/* Monogram */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-5xl text-gold/30 group-hover:text-gold/50 transition-colors duration-500 tracking-wide">
              {getInitials(product.name)}
            </span>
          </div>

          {/* Category pill — top-left */}
          <span className="absolute top-3 left-3 text-[9px] uppercase tracking-wider font-body font-bold bg-gold/15 border border-gold/40 text-gold px-2.5 py-1 rounded-full backdrop-blur-sm">
            {product.category}
          </span>

          {/* Sold out overlay */}
          {!anyInStock && (
            <span className="absolute top-3 right-3 text-[9px] uppercase tracking-wider font-body font-bold bg-destructive/15 border border-destructive/40 text-destructive px-2.5 py-1 rounded-full backdrop-blur-sm">
              Sold Out
            </span>
          )}
        </Link>

        <div className="p-5">
          {/* Name */}
          <Link to={`/product/${product.slug}`}>
            <h3 className="font-display text-xl text-white group-hover:text-gold transition-colors duration-300">
              {product.name}
            </h3>
          </Link>

          {/* Dose variants line */}
          {variantSummary && (
            <p className="text-[11px] text-white/40 font-body mt-1">{variantSummary}</p>
          )}

          {/* Purity stat */}
          <p className="text-[10px] font-mono text-gold/80 tracking-wider mt-2">≥99.5% HPLC</p>

          {/* Variant selector chips */}
          {hasVariations && product.variations.length > 1 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {product.variations.map((v, i) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedIdx(i)}
                  disabled={!v.inStock}
                  className={`text-[10px] font-body font-semibold px-2.5 py-1 rounded-full border transition-all ${
                    !v.inStock
                      ? "border-white/[0.04] text-white/15 line-through cursor-not-allowed"
                      : i === selectedIdx
                      ? "bg-gold/15 border-gold/40 text-gold"
                      : "border-white/[0.08] text-white/30 hover:border-gold/20"
                  }`}
                >
                  {v.size}
                </button>
              ))}
            </div>
          )}

          {/* Trust badges row */}
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCoaOpen(true);
              }}
              className={`inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-body font-bold px-2 py-0.5 rounded-full transition-colors ${
                coaAvailable
                  ? "bg-gold/15 border border-gold/40 text-gold hover:bg-gold/25"
                  : "bg-white/[0.04] border border-white/[0.08] text-white/40 hover:bg-white/[0.08]"
              }`}
            >
              <ShieldCheck className="h-2.5 w-2.5" />
              {coaAvailable ? "View COA" : "COA Pending"}
            </button>
            {anyInStock && (
              <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-body font-semibold text-white/40">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                In Stock
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-body font-semibold text-white/40">
              <MapPin className="h-2.5 w-2.5" />
              Ships USA
            </span>
          </div>

          {/* Price + ADD */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.06]">
            <div>
              {hasVariations && product.variations.length > 1 ? (
                <span className="text-2xl font-display bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
                  ${displayPrice}
                </span>
              ) : (
                <span className="text-2xl font-display bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
                  {product.type === "variable" ? `From $${product.price}` : `$${displayPrice}`}
                </span>
              )}
            </div>
            <button
              onClick={handleAdd}
              disabled={soldOut}
              className="inline-flex items-center gap-1.5 bg-gold text-navy border border-gold text-[11px] uppercase tracking-wider font-bold px-5 py-2.5 rounded-lg shadow-[0_4px_12px_rgba(196,160,90,0.25)] hover:bg-gold-light hover:shadow-[0_6px_18px_rgba(196,160,90,0.4)] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gold disabled:shadow-none"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              {soldOut ? "Sold Out" : "Add"}
            </button>
          </div>
        </div>
      </div>
      <ProductCoaModal
        open={coaOpen}
        onOpenChange={setCoaOpen}
        productSlug={product.slug}
        productName={product.name}
      />
    </div>
  );
}
