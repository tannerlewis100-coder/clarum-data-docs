import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import Seo from "@/components/Seo";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock, ArrowRight, Send } from "lucide-react";

const contactInfo = [
  { icon: Mail, label: "Email", value: "support@tpeptides.com", href: "mailto:support@tpeptides.com" },
  { icon: Phone, label: "Phone", value: "1-800-PEPTIDE", href: "tel:1800737843" },
  { icon: MapPin, label: "Location", value: "United States" },
  { icon: Clock, label: "Business Hours", value: "Mon – Fri: 9AM – 5PM EST" },
];

const quickLinks = [
  { label: "Frequently Asked Questions", to: "/faq" },
  { label: "About Us", to: "/about" },
  { label: "Browse Products", to: "/shop" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const revealRef = useScrollReveal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    };
    if (!trimmed.name || !trimmed.email || !trimmed.subject || !trimmed.message) {
      toast.error("Please fill in all fields.");
      return;
    }
    toast.success("Message sent! We'll be in touch soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div ref={revealRef}>
      {/* Hero */}
      <section className="relative bg-navy overflow-hidden pt-32 pb-20 border-b border-white/[0.03]">
        <div className="absolute inset-0 gold-line-texture" />
        <div className="absolute top-1/3 -right-32 w-[400px] h-[400px] rounded-full bg-gold/[0.03] blur-[120px]" />
        <div className="relative container mx-auto px-4 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 justify-center mb-4">
            <span className="h-px w-8 bg-gold/40" />
            <span className="text-[11px] uppercase tracking-[0.25em] text-gold font-body font-semibold">Contact</span>
            <span className="h-px w-8 bg-gold/40" />
          </div>
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-display text-white leading-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-white/40 font-body text-lg max-w-md mx-auto">
            We typically respond within 24–48 business hours.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-20 lg:py-28 bg-navy-alt overflow-hidden">
        <div className="absolute inset-0 gold-grid-texture" />
        <div className="absolute bottom-20 left-0 w-[300px] h-[300px] rounded-full bg-gold/[0.02] blur-[100px]" />
        <div className="relative container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-14 lg:gap-20">

            {/* Left – Contact Info */}
            <div className="lg:w-[380px] shrink-0 reveal">
              {/* Info cards */}
              <div className="space-y-5 mb-10">
                {contactInfo.map((item) => (
                  <div key={item.label} className="group flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0 group-hover:border-gold/30 transition-colors">
                      <item.icon className="h-5 w-5 text-gold/70" />
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.15em] text-white/30 font-body font-semibold mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm font-body text-white hover:text-gold transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-body text-white">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-white/[0.06] via-gold/15 to-transparent mb-10" />

              {/* Follow Us */}
              <div className="mb-10">
                <p className="text-[11px] uppercase tracking-[0.15em] text-white/30 font-body font-semibold mb-4">Follow Us</p>
                <div className="flex items-center gap-3">
                  {["Instagram", "X / Twitter", "Reddit"].map((platform) => (
                    <span
                      key={platform}
                      className="text-xs font-body text-white/50 bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-2 hover:border-gold/30 hover:text-gold transition-all duration-300 cursor-pointer"
                    >
                      {platform}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <p className="text-[11px] uppercase tracking-[0.15em] text-white/30 font-body font-semibold mb-4">Quick Links</p>
                <div className="space-y-2.5">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="group/link flex items-center gap-2 text-sm font-body text-white/70 hover:text-gold transition-colors"
                    >
                      <ArrowRight className="h-3.5 w-3.5 text-gold/50 group-hover/link:translate-x-0.5 transition-transform" />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Right – Form */}
            <div className="flex-1 reveal">
              <div className="relative group/form">
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-0 group-hover/form:opacity-100 transition-opacity duration-500 blur-sm" />
                <div className="relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 lg:p-10">
                  <h2 className="text-2xl lg:text-3xl font-display text-white mb-2">Send Us a Message</h2>
                  <p className="text-sm text-white/50 font-body mb-8">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="text-[11px] uppercase tracking-[0.12em] text-white/30 font-body font-semibold block mb-2">
                          Full Name <span className="text-gold">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={100}
                          placeholder="John Doe"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white font-body text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] uppercase tracking-[0.12em] text-white/30 font-body font-semibold block mb-2">
                          Email Address <span className="text-gold">*</span>
                        </label>
                        <input
                          type="email"
                          required
                          maxLength={255}
                          placeholder="john@example.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white font-body text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-[0.12em] text-white/30 font-body font-semibold block mb-2">
                        Subject <span className="text-gold">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={200}
                        placeholder="How can we help you?"
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white font-body text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] uppercase tracking-[0.12em] text-white/30 font-body font-semibold block mb-2">
                        Message <span className="text-gold">*</span>
                      </label>
                      <textarea
                        required
                        rows={5}
                        maxLength={2000}
                        placeholder="Please provide details about your inquiry..."
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.04] text-white font-body text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/40 focus:ring-1 focus:ring-gold/20 transition-all resize-none"
                      />
                    </div>

                    <Button variant="gold" size="lg" type="submit" className="w-full shadow-[0_0_25px_-5px_hsl(40_50%_56%/0.3)] hover:shadow-[0_0_35px_-5px_hsl(40_50%_56%/0.5)] transition-shadow">
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
