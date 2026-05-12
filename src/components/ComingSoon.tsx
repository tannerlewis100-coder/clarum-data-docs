import { useState } from "react";
import { Link } from "react-router-dom";
import clarumLogo from "@/assets/clarum-logo-transparent.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, ArrowRight, Beaker } from "lucide-react";
import { toast } from "sonner";

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setSubmitted(true);
    toast.success("Thank you. We'll notify you at launch.");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Subtle gold texture */}
      <div className="absolute inset-0 gold-grid-texture opacity-50 pointer-events-none" />

      {/* Glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-accent/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-xl w-full text-center flex flex-col items-center">
        {/* Logo */}
        <img
          src={clarumLogo}
          alt="Clarum Research Compounds"
          className="h-28 md:h-36 mb-8 opacity-90"
        />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-6">
          <Beaker className="w-3.5 h-3.5 text-accent" />
          <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
            Research Use Only
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-4xl md:text-6xl font-light text-foreground mb-4 tracking-tight">
          Coming Soon
        </h1>

        {/* Subtitle */}
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10 max-w-md">
          We are preparing a new standard in analytical research compounds.
          Batch-tested. Fully documented. Built for the lab.
        </p>

        {/* Email form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="w-full max-w-sm mb-10">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-muted/50 border-border/50 text-foreground placeholder:text-muted-foreground focus-visible:ring-accent/50"
                />
              </div>
              <Button
                type="submit"
                variant="gold"
                className="h-12 px-6"
              >
                Notify Me
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        ) : (
          <div className="w-full max-w-sm mb-10 bg-muted/40 border border-accent/20 rounded-lg p-6">
            <p className="text-accent text-sm font-medium uppercase tracking-wide">
              You're on the list
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              We'll reach out when we launch.
            </p>
          </div>
        )}

        {/* Trust marks */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.15em] text-muted-foreground/60">
          <span>HPLC Verified</span>
          <span className="text-accent/40">✦</span>
          <span>Batch COAs</span>
          <span className="text-accent/40">✦</span>
          <span>USA Sourced</span>
        </div>
      </div>

      {/* Bottom legal */}
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/40">
          All products are for in vitro laboratory research use only. Not for human or veterinary consumption.
        </p>
      </div>
    </div>
  );
}
