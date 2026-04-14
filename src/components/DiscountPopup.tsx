import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


const STORAGE_KEY = "clarum-discount-shown";

export default function DiscountPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;

    const checkAgeGate = () => {
      if (localStorage.getItem("clarum-age-verified")) {
        const timer = setTimeout(() => setOpen(true), 5000);
        return () => clearTimeout(timer);
      }
      return undefined;
    };

    const cleanup = checkAgeGate();
    if (cleanup) return cleanup;

    const interval = setInterval(() => {
      if (localStorage.getItem("clarum-age-verified")) {
        clearInterval(interval);
        setTimeout(() => setOpen(true), 5000);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !phone) return;
    dismiss();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={dismiss} />

      {/* Modal */}
      <div className="relative w-full max-w-sm mx-4 bg-navy rounded-2xl border border-gold/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden">

        {/* Gold accent line */}
        <div className="h-1 bg-gradient-to-r from-gold/0 via-gold to-gold/0" />

        <div className="px-8 pt-8 pb-6 text-center">
          <p className="text-[11px] uppercase tracking-[0.25em] text-gold/60 font-body font-semibold mb-3">
            Exclusive Offer
          </p>
          <h2 className="font-display text-3xl text-white mb-2">
            Unlock <span className="text-gold">15% Off</span>
          </h2>
          <p className="text-sm text-white/40 font-body leading-relaxed mb-8">
            Enter your email and phone number to receive an exclusive discount on your first order.
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
            <Input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="border-white/10 bg-white/5 text-white placeholder:text-white/25 focus-visible:ring-gold/40 focus-visible:border-gold/30"
            />
            <Button type="submit" variant="gold" size="lg" className="w-full mt-2 uppercase tracking-wider text-xs font-bold">
              Yes, I Love Saving Money
            </Button>
          </form>

          <button
            onClick={dismiss}
            className="mt-5 text-[11px] text-white/25 font-body hover:text-white/40 transition-colors"
          >
            No, I'd rather pay full price
          </button>
        </div>
      </div>
    </div>
  );
}
