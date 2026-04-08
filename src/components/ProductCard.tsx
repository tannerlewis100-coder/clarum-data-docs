import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/data/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative bg-card rounded-card border border-border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_-8px_hsl(40_50%_56%/0.25)] hover:border-gold/40">
      {/* Gradient image area */}
      <div
        className="relative h-52 gold-grid-texture"
        style={{
          background: `linear-gradient(135deg, hsl(var(--navy)) 0%, hsl(${product.categoryColor}) 100%)`,
        }}
      >
        <span className="absolute bottom-3 left-3 text-xs uppercase tracking-wider text-gold font-body font-semibold bg-navy/60 backdrop-blur-sm px-2.5 py-1 rounded-sm">
          {product.category}
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-display text-xl text-foreground">{product.name}</h3>
        {product.dosage && (
          <p className="text-xs text-muted-foreground font-body mt-0.5">{product.dosage}</p>
        )}
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-display text-gold">${product.price}</span>
          <div className="flex items-center gap-2">
            <button className="bg-navy text-primary-foreground text-xs uppercase tracking-wider font-semibold px-4 py-2 rounded-[6px] hover:bg-navy-deep transition-colors">
              Add to Cart
            </button>
            <Link
              to={`/shop`}
              className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold transition-colors"
            >
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
