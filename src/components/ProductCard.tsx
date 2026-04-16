import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart } from "lucide-react";
import type { WcProduct } from "@/lib/woocommerce";
import { useCart } from "@/contexts/CartContext";

interface Props {
  product: WcProduct;
}

export default function ProductCard({ product }: Props) {
  const { addItem } = useCart();
  const hasVariations = product.type === "variable" && product.variations.length > 0;
  const [selectedIdx, setSelectedIdx] = useState(0);

  const selectedVariation = hasVariations ? product.variations[selectedIdx] : null;
  const displayPrice = selectedVariation ? selectedVariation.price : product.price;
  const displaySize = selectedVariation?.size;

  const variantInStock = selectedVariation ? selectedVariation.inStock : product.inStock;
  const anyInStock = hasVariations
    ? product.variations.some((v) => v.inStock)
    : product.inStock;
  const soldOut = !variantInStock || !anyInStock;

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
    <div className="group relative" data-product-card>
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-gold/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

      <div className="relative bg-white/[0.03] rounded-2xl border border-white/[0.06] overflow-hidden backdrop-blur-sm transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:border-gold/20 group-hover:shadow-[0_8px_30px_rgba(196,160,90,0.08)]">
        {!anyInStock && (
          <div className="absolute top-3 right-3 z-10 text-[9px] uppercase tracking-wider font-body font-bold bg-destructive/15 border border-destructive/40 text-destructive px-2.5 py-1 rounded-full">
            Sold Out
          </div>
        )}
        <div className="p-5">
          <h3 className="font-display text-xl text-white group-hover:text-gold transition-colors duration-300">
            {product.name}
          </h3>

          {/* Variant selector */}
          {hasVariations && product.variations.length > 1 ? (
            <div className="flex flex-wrap gap-1.5 mt-2">
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
          ) : (
            displaySize && (
              <p className="text-[11px] text-white/30 font-body mt-0.5">{displaySize}</p>
            )
          )}

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.06]">
            <div>
              {hasVariations && product.variations.length > 1 ? (
                <span className="text-xl font-display bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
                  ${displayPrice}
                </span>
              ) : (
                <span className="text-xl font-display bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
                  {product.type === "variable" ? `From $${product.price}` : `$${displayPrice}`}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleAdd}
                disabled={soldOut}
                className="relative inline-flex items-center gap-1.5 bg-white/[0.06] text-white/80 border border-white/[0.08] text-[10px] uppercase tracking-wider font-semibold px-4 py-2.5 rounded-lg overflow-hidden transition-all duration-300 hover:bg-gold hover:text-navy hover:border-gold disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/[0.06] disabled:hover:text-white/80 disabled:hover:border-white/[0.08]"
              >
                <ShoppingCart className="h-3 w-3" />
                {soldOut ? "Sold Out" : "Add"}
              </button>
              <Link
                to={`/product/${product.slug}`}
                className="w-9 h-9 rounded-full border border-white/[0.08] bg-white/[0.06] flex items-center justify-center text-white/50 hover:text-gold hover:border-gold hover:bg-gold/5 transition-all duration-300"
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
