import { Minus, Plus, X, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[80] bg-navy/60 backdrop-blur-sm transition-opacity"
          onClick={closeCart}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-[90] h-full w-full max-w-md bg-card border-l border-border shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-border">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-gold" />
            <h2 className="font-display text-xl text-foreground">Your Cart</h2>
            {totalItems > 0 && (
              <span className="text-[10px] font-body font-bold bg-gold text-navy px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-gold/30 transition-all"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <p className="font-display text-lg text-muted-foreground">Your cart is empty</p>
              <p className="text-xs text-muted-foreground/60 font-body mt-1">Add products to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 rounded-xl border border-border bg-background hover:border-gold/20 transition-colors"
                >
                  {/* Color swatch */}
                  <div className="w-16 h-16 rounded-lg bg-navy gold-grid-texture shrink-0 flex items-center justify-center">
                    <span className="text-[9px] uppercase tracking-wider text-gold/60 font-body font-semibold">
                      {item.product.category.slice(0, 3)}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-sm text-foreground truncate">{item.product.name}</h3>
                    {item.product.dosage && (
                      <p className="text-[10px] text-muted-foreground font-body">{item.product.dosage}</p>
                    )}
                    <p className="text-sm font-display text-gold mt-1">${item.product.price}</p>
                  </div>

                  {/* Quantity + Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-muted-foreground/50 hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-gold/30 hover:text-foreground transition-all"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="text-xs font-body font-semibold w-5 text-center text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:border-gold/30 hover:text-foreground transition-all"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-6 py-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-body font-semibold uppercase tracking-wider text-muted-foreground">Subtotal</span>
              <span className="text-xl font-display bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <button className="w-full py-3 rounded-lg bg-gold text-navy font-body font-semibold text-sm uppercase tracking-wider hover:bg-gold-light transition-colors">
              Checkout
            </button>
            <button
              onClick={clearCart}
              className="w-full py-2.5 rounded-lg border border-border text-muted-foreground font-body text-xs uppercase tracking-wider hover:border-gold/20 hover:text-foreground transition-all"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
