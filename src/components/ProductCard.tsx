import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { type Product, getProductSlug } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import CoaCard from "@/components/CoaCard";

function getPerMgPrice(product: Product): string | null {
  if (!product.dosage) return null;
  const matches = product.dosage.match(/(\d+(?:\.\d+)?)\s*mg/gi);
  if (!matches || matches.length === 0) return null;
  if (matches.length >= 4) return null;
  const totalMg = matches.reduce((sum, m) => {
    const val = parseFloat(m);
    return sum + (isNaN(val) ? 0 : val);
  }, 0);
  if (totalMg <= 0) return null;
  const perMg = product.price / totalMg;
  return `$${perMg.toFixed(2)}/mg`;
}

interface Props {
  product: Product;
  variants?: Product[];
}

export default function ProductCard({ product, variants }: Props) {
  const items = variants && variants.length > 1 ? variants : [product];
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selected = items[selectedIdx];
  const { addItem } = useCart();
  const perMg = useMemo(() => getPerMgPrice(selected), [selected]);

  return (
    <div className="group relative" data-product-card>
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-gold/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

      <div className="relative bg-white/[0.03] rounded-2xl border border-white/[0.06] overflow-hidden backdrop-blur-sm transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:border-gold/20 group-hover:shadow-[0_8px_30px_rgba(196,160,90,0.08)]">

        {/* Badge */}
        {selected.badge && (
          <span className="absolute top-3 right-3 z-10 bg-gold/10 border border-gold/30 text-gold text-[9px] font-semibold uppercase tracking-[0.15em] px-2 py-1 rounded-sm">
            {selected.badge}
          </span>
        )}

        {/* Info */}
        <div className="p-5">
          <h3 className="font-display text-xl text-white group-hover:text-gold transition-colors duration-300">
            {selected.name}
          </h3>

          {/* Variant selector */}
          {items.length > 1 ? (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {items.map((v, i) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedIdx(i)}
                  className={`text-[10px] font-body font-semibold px-2.5 py-1 rounded-full border transition-all ${
                    i === selectedIdx
                      ? "bg-gold/15 border-gold/40 text-gold"
                      : "border-white/[0.08] text-white/30 hover:border-gold/20"
                  }`}
                >
                  {v.dosage}
                </button>
              ))}
            </div>
          ) : (
            selected.dosage && (
              <p className="text-[11px] text-white/30 font-body mt-0.5">{selected.dosage}</p>
            )
          )}

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.06]">
            <div>
              <span className="text-xl font-display bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
                ${selected.price}
              </span>
              {perMg && (
                <p className="text-xs text-white/20">{perMg}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => addItem(selected)}
                className="relative inline-flex items-center gap-1.5 bg-white/[0.06] text-white/80 border border-white/[0.08] text-[10px] uppercase tracking-wider font-semibold px-4 py-2.5 rounded-lg overflow-hidden transition-all duration-300 hover:bg-gold hover:text-navy hover:border-gold"
              >
                <ShoppingCart className="h-3 w-3" />
                Add
              </button>
              <Link
                to={`/product/${getProductSlug(selected)}`}
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
