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
  // If 4+ components (like KLOW blend), omit
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

  return (
    <div className="group relative">
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-gold/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

      <div className="relative bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-gold/30 group-hover:shadow-[0_20px_50px_-15px_hsl(40_50%_56%/0.2)]">

        {/* Info */}
        <div className="p-5">
          <h3 className="font-display text-xl text-foreground group-hover:text-gold transition-colors duration-300">
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
                      : "border-border text-muted-foreground hover:border-gold/20"
                  }`}
                >
                  {v.dosage}
                </button>
              ))}
            </div>
          ) : (
            selected.dosage && (
              <p className="text-[11px] text-muted-foreground font-body mt-0.5">{selected.dosage}</p>
            )
          )}

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <span className="text-xl font-display bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
              ${selected.price}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => addItem(selected)}
                className="inline-flex items-center gap-1.5 bg-navy text-primary-foreground text-[10px] uppercase tracking-wider font-semibold px-4 py-2.5 rounded-lg hover:bg-navy transition-colors"
              >
                <ShoppingCart className="h-3 w-3" />
                Add
              </button>
              <Link
                to={`/product/${getProductSlug(selected)}`}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold hover:bg-gold/5 transition-all duration-300"
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
