import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const revealRef = useScrollReveal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll be in touch soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div ref={revealRef}>
      <section className="bg-navy gold-line-texture pt-28 pb-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-body font-semibold">Get in Touch</span>
          <h1 className="text-4xl lg:text-5xl font-display text-primary-foreground mt-2">
            Contact Us
          </h1>
        </div>
      </section>

      <section className="py-12 lg:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-xl reveal">
          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { label: "Name", key: "name", type: "text" },
              { label: "Email", key: "email", type: "email" },
              { label: "Subject", key: "subject", type: "text" },
            ].map((field) => (
              <div key={field.key}>
                <label className="text-xs uppercase tracking-wider text-muted-foreground font-body font-semibold block mb-1.5">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  required
                  value={form[field.key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                  className="w-full px-4 py-3 rounded-[6px] border border-border bg-card text-foreground font-body text-sm focus:outline-none focus:border-gold/40 transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="text-xs uppercase tracking-wider text-muted-foreground font-body font-semibold block mb-1.5">
                Message
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-[6px] border border-border bg-card text-foreground font-body text-sm focus:outline-none focus:border-gold/40 transition-colors resize-none"
              />
            </div>
            <Button variant="gold" size="lg" type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
