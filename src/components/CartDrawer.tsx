import { useState } from "react";
import { Minus, Plus, X, ShoppingBag, Trash2, ExternalLink, Loader2, AlertCircle } from "lucide-react";
import { useCart, cartKey } from "@/contexts/CartContext";
import { toast } from "sonner";

const WC_BASE = "https://admin.clarumpeptides.com";
const STORE_API = `${WC_BASE}/wp-json/wc/store/v1`;
const CHECKOUT_URL = `${WC_BASE}/checkout/`;
const ERROR_MESSAGE = "We couldn't prepare checkout. Please try again or contact support.";

interface WcStoreCartItem { id: number; quantity: number; }
interface WcStoreCart { items: WcStoreCartItem[]; }

/** Forward Cart-Token + Nonce headers between requests so WC sees a single session. */
function pickHeaders(res: Response): Record<string, string> {
  const headers: Record<string, string> = {};
  const cartToken = res.headers.get("Cart-Token") || res.headers.get("cart-token");
  const nonce = res.headers.get("Nonce") || res.headers.get("nonce");
  if (cartToken) headers["Cart-Token"] = cartToken;
  if (nonce) headers["Nonce"] = nonce;
  return headers;
}

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (items.length === 0 || isCheckingOut) return;
    setIsCheckingOut(true);
    setCheckoutError(null);

    try {
      // 1) Initialize a fresh session and clear any leftover items.
      const initRes = await fetch(`${STORE_API}/cart`, { credentials: "include" });
      if (!initRes.ok) throw new Error(`Cart init failed: ${initRes.status}`);
      let sessionHeaders = pickHeaders(initRes);

      const clearRes = await fetch(`${STORE_API}/cart/items`, {
        method: "DELETE",
        credentials: "include",
        headers: sessionHeaders,
      });
      if (clearRes.ok) sessionHeaders = { ...sessionHeaders, ...pickHeaders(clearRes) };

      // 2) Add each item; track per-item success.
      const expected = new Map<number, number>();
      for (const item of items) {
        const id = item.wcVariationId || item.wcProductId;
        if (!id) throw new Error(`Missing WooCommerce ID for "${item.name}"`);
        expected.set(id, (expected.get(id) || 0) + item.quantity);

        const addRes = await fetch(`${STORE_API}/cart/add-item`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json", ...sessionHeaders },
          body: JSON.stringify({ id, quantity: item.quantity }),
        });
        if (!addRes.ok) throw new Error(`Failed to add "${item.name}" (${addRes.status})`);
        sessionHeaders = { ...sessionHeaders, ...pickHeaders(addRes) };
      }

      // 3) Verify the WC cart actually contains every expected item & quantity.
      const verifyRes = await fetch(`${STORE_API}/cart`, {
        credentials: "include",
        headers: sessionHeaders,
      });
      if (!verifyRes.ok) throw new Error(`Cart verify failed: ${verifyRes.status}`);
      const cart: WcStoreCart = await verifyRes.json();
      const actual = new Map<number, number>();
      for (const ci of cart.items || []) {
        actual.set(ci.id, (actual.get(ci.id) || 0) + ci.quantity);
      }
      for (const [id, qty] of expected) {
        if ((actual.get(id) || 0) < qty) {
          throw new Error(`Verification failed for product ${id}`);
        }
      }

      // 4) Success — redirect in the same tab.
      window.location.href = CHECKOUT_URL;
    } catch (err) {
      console.error("Checkout handoff failed:", err);
      setCheckoutError(ERROR_MESSAGE);
      toast.error(ERROR_MESSAGE);
      setIsCheckingOut(false);
    }
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
