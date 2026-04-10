import { useState, useEffect } from "react";
import { Shield } from "lucide-react";

export default function AgeGate() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("clarum-age-verified");
    if (!accepted) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("clarum-age-verified", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/90 backdrop-blur-md">
      <div className="relative mx-4 max-w-md w-full bg-card border border-gold/20 rounded-2xl p-8 text-center shadow-[0_30px_80px_-20px_hsl(40_50%_56%/0.15)]">
        {/* Gold accent line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />

        <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-5">
          <Shield className="h-6 w-6 text-gold" />
        </div>

        <h2 className="font-display text-2xl text-foreground mb-2">Age Verification</h2>
        <p className="text-sm text-muted-foreground font-body mb-6 leading-relaxed">
          You must be at least <span className="text-foreground font-semibold">18 years of age</span> to access this website. By entering, you confirm that you meet this requirement.
        </p>

        <p className="text-[10px] text-muted-foreground/60 font-body mb-6 uppercase tracking-wider">
          All products are for in vitro laboratory research use only.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={handleAccept}
            className="w-full py-3 rounded-lg bg-gold text-navy font-body font-semibold text-sm uppercase tracking-wider hover:bg-gold-light transition-colors"
          >
            I Am 18 or Older — Enter
          </button>
          <a
            href="https://www.google.com"
            className="w-full py-3 rounded-lg border border-border text-muted-foreground font-body text-sm hover:border-gold/20 transition-colors"
          >
            I Am Under 18 — Leave
          </a>
        </div>
      </div>
    </div>
  );
}
