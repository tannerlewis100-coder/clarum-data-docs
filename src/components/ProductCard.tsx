import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart } from "lucide-react";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative">
      {/* Hover glow */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-gold/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

      <div className="relative bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-gold/30 group-hover:shadow-[0_20px_50px_-15px_hsl(40_50%_56%/0.2)]">
        {/* Gradient image area */}
        <div
          className="relative h-48 gold-grid-texture overflow-hidden"
          style={{
            background: `linear-gradient(135deg, hsl(var(--navy)) 0%, hsl(${product.categoryColor}) 100%)`,
          }}
        >
          {/* Subtle shine on hover */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-primary-foreground/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <span className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.15em] text-gold font-body font-semibold bg-navy/70 backdrop-blur-sm px-3 py-1 rounded-md border border-gold/10">
            {product.category}
          </span>
        </div>

        {/* Info */}
        <div className="p-5">
          <h3 className="font-display text-xl text-foreground group-hover:text-gold transition-colors duration-300">{product.name}</h3>
          {product.dosage && (
            <p className="text-[11px] text-muted-foreground font-body mt-0.5">{product.dosage}</p>
          )}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
            <span className="text-xl font-display bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">${product.price}</span>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-1.5 bg-navy text-primary-foreground text-[10px] uppercase tracking-wider font-semibold px-4 py-2.5 rounded-lg hover:bg-navy-deep transition-colors">
                <ShoppingCart className="h-3 w-3" />
                Add
              </button>
              <Link
                to="/shop"
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
