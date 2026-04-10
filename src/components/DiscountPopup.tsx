import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

const STORAGE_KEY = "clarum-discount-shown";

export default function DiscountPopup() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;
    const timer = setTimeout(() => setOpen(true), 5000);
    return () => clearTimeout(timer);
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

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) dismiss(); }}>
      <DialogContent className="max-w-sm border-gold/20 bg-card p-0 gap-0 overflow-hidden">
        <button onClick={dismiss} className="absolute right-3 top-3 z-10 text-muted-foreground hover:text-foreground transition-colors">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <div className="p-8 text-center">
          <div className="w-16 h-1 mx-auto mb-6 bg-gradient-to-r from-transparent via-gold to-transparent rounded-full" />
          <h2 className="font-display text-2xl text-foreground mb-2">Unlock 15% Off</h2>
          <p className="text-sm text-muted-foreground font-body mb-6">
            Enter your email and phone number to receive an exclusive discount on your first order.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-border/60 bg-background/50 focus-visible:ring-gold/40"
            />
            <Input
              type="tel"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="border-border/60 bg-background/50 focus-visible:ring-gold/40"
            />
            <Button type="submit" variant="gold" size="lg" className="w-full mt-2">
              Yes, I Love Saving Money
            </Button>
          </form>

          <button
            onClick={dismiss}
            className="mt-4 text-xs text-muted-foreground/60 font-body hover:text-muted-foreground transition-colors"
          >
            No, I'd rather pay full price
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
