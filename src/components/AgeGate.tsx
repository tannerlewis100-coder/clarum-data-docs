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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md">
      <div className="relative mx-4 max-w-md w-full bg-navy border border-gold/20 rounded-2xl overflow-hidden shadow-[0_30px_80px_-20px_hsl(40_50%_56%/0.15)]">
        {/* Gold accent line */}
        <div className="h-1 bg-gradient-to-r from-gold/0 via-gold to-gold/0" />

        <div className="p-8 text-center">
          <div className="w-14 h-14 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mx-auto mb-5">
            <Shield className="h-6 w-6 text-gold" />
          </div>

          <h2 className="font-display text-2xl text-white mb-2">Age Verification</h2>
          <p className="text-sm text-white/50 font-body mb-6 leading-relaxed">
            You must be at least <span className="text-white font-semibold">18 years of age</span> to access this website. By entering, you confirm that you meet this requirement.
          </p>

          <p className="text-[10px] text-white/25 font-body mb-6 uppercase tracking-wider">
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
              className="w-full py-3 rounded-lg border border-white/10 text-white/40 font-body text-sm hover:border-gold/20 hover:text-white/60 transition-colors"
            >
              I Am Under 18 — Leave
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
