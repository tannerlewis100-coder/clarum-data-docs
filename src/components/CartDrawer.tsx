import { Minus, Plus, X, ShoppingBag, Trash2, ExternalLink } from "lucide-react";
import { useCart, cartKey } from "@/contexts/CartContext";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();

  const handleCheckout = () => {
    // Redirect to WooCommerce shop where users can complete purchase
    window.open("https://admin.clarumpeptides.com/shop/", "_blank");
  };

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
        className={`fixed top-0 right-0 z-[90] h-full w-full max-w-md bg-[#0F1A2E] border-l border-white/[0.06] shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-gold" />
            <h2 className="font-display text-xl text-white">Your Cart</h2>
            {totalItems > 0 && (
              <span className="text-[10px] font-body font-bold bg-gold text-navy px-2 py-0.5 rounded-full">
                {totalItems}
              </span>
            )}
          </div>
          <button
            onClick={closeCart}
            className="w-8 h-8 rounded-full border border-white/[0.06] flex items-center justify-center text-white/50 hover:text-white hover:border-gold/30 transition-all"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-12 w-12 text-white/10 mb-4" />
              <p className="font-display text-lg text-white/50">Your cart is empty</p>
              <p className="text-xs text-white/25 font-body mt-1">Add products to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const key = cartKey(item);
                return (
                  <div
                    key={key}
                    className="flex gap-4 p-3 rounded-xl border border-white/[0.06] bg-white/[0.03] hover:border-gold/20 transition-colors"
                  >
                    {/* Color swatch */}
                    <div className="w-16 h-16 rounded-lg bg-navy gold-grid-texture shrink-0 flex items-center justify-center">
                      <span className="text-[9px] uppercase tracking-wider text-gold/60 font-body font-semibold">
                        {item.category.slice(0, 3)}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-sm text-white truncate">{item.name}</h3>
                      {item.size && (
                        <p className="text-[10px] text-white/30 font-body">{item.size}</p>
                      )}
                      <p className="text-sm font-display text-gold mt-1">${item.price}</p>
                    </div>

                    {/* Quantity + Remove */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeItem(key)}
                        className="text-white/25 hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateQuantity(key, item.quantity - 1)}
                          className="w-6 h-6 rounded-full border border-white/[0.06] flex items-center justify-center text-white/50 hover:border-gold/30 hover:text-white transition-all"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-xs font-body font-semibold w-5 text-center text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(key, item.quantity + 1)}
                          className="w-6 h-6 rounded-full border border-white/[0.06] flex items-center justify-center text-white/50 hover:border-gold/30 hover:text-white transition-all"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/[0.06] px-6 py-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-body font-semibold uppercase tracking-wider text-white/30">Subtotal</span>
              <span className="text-xl font-display bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="w-full py-3 rounded-lg bg-gold text-navy font-body font-semibold text-sm uppercase tracking-wider hover:bg-gold-light transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isCheckingOut ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Transferring Cart...
                </>
              ) : (
                <>
                  Proceed to Checkout
                  <ExternalLink className="h-3.5 w-3.5" />
                </>
              )}
            </button>
            <button
              onClick={clearCart}
              className="w-full py-2.5 rounded-lg border border-white/[0.06] text-white/50 font-body text-xs uppercase tracking-wider hover:border-gold/20 hover:text-white transition-all"
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  );
}
