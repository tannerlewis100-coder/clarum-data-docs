import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const STORAGE_KEY = "clarum-discount-shown";

export default function DiscountPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    let triggered = false;
    const trigger = () => {
      if (triggered) return;
      if (!localStorage.getItem("clarum-age-verified")) return;
      triggered = true;
      setOpen(true);
      cleanup();
    };

    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) trigger();
    };

    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (total > 0 && scrolled / total >= 0.4) trigger();
    };

    const cleanup = () => {
      document.removeEventListener("mouseout", onMouseLeave);
      window.removeEventListener("scroll", onScroll);
    };

    document.addEventListener("mouseout", onMouseLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return cleanup;
  }, []);

  const dismiss = () => {
    sessionStorage.setItem(STORAGE_KEY, "true");
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    dismiss();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={dismiss} />

      <div className="relative w-full max-w-sm mx-4 bg-navy rounded-2xl border border-gold/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden">
        <div className="h-1 bg-gradient-to-r from-gold/0 via-gold to-gold/0" />

        <div className="px-8 pt-8 pb-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.25em] text-gold/60 font-body font-semibold mb-3">
            Exclusive Offer
          </p>
          <h2 className="font-display text-3xl text-white mb-2">
            Unlock <span className="text-gold">15% Off</span>
          </h2>
          <p className="text-sm text-white/40 font-body leading-relaxed mb-8">
            Enter your email to receive an exclusive discount on your first order.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-white/10 bg-white/5 text-white placeholder:text-white/25 focus-visible:ring-gold/40 focus-visible:border-gold/30"
            />
            <Button type="submit" variant="gold" size="lg" className="w-full mt-2 uppercase tracking-wider text-xs font-bold">
              Get My 15% Off
            </Button>
          </form>

          <button
            onClick={dismiss}
            className="mt-5 text-[11px] text-white/40 font-body hover:text-white/60 transition-colors"
          >
            No thanks
          </button>
        </div>
      </div>
    </div>
  );
}
