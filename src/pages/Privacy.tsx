import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const sections = [
  {
    title: "Information We Collect",
    content: "When you place an order, we collect your name, email address, and shipping address. Payment is processed by a third-party payment processor — we never store your credit card details or full payment information on our servers."
  },
  {
    title: "How We Use Your Information",
    content: "We use your information solely for order fulfillment, customer support communication, and occasional product updates. We do not sell, rent, or share your personal data with third parties for marketing purposes."
  },
  {
    title: "Cookies",
    content: "Our website uses basic analytics cookies to understand site traffic and improve user experience. We do not use advertising cookies or third-party tracking pixels."
  },
  {
    title: "Third-Party Services",
    content: "We work with trusted third-party providers for payment processing, shipping logistics, and website analytics. These providers only receive the minimum information necessary to perform their services."
  },
  {
    title: "Data Retention",
    content: "Personal data is retained only as long as necessary for order fulfillment, customer support, and legal compliance. You may request deletion of your data at any time."
  },
  {
    title: "Your Rights",
    content: "You have the right to request access to, correction of, or deletion of your personal information. To exercise any of these rights, contact us at support@clarum.co."
  },
  {
    title: "Contact",
    content: "For privacy-related inquiries, reach us at support@clarum.co."
  },
];

export default function Privacy() {
  useScrollReveal();

  return (
    <div className="bg-navy min-h-screen">
      <section className="pt-32 pb-12 lg:pb-16 bg-navy-alt border-b border-white/5">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-body font-semibold">Legal</span>
          <h1 className="text-4xl lg:text-5xl font-display text-white mt-2">Privacy Policy</h1>
          <p className="text-white/40 text-sm font-body mt-4">Last updated — April 2026</p>
        </div>
      </section>

      <section className="py-12 lg:py-20 bg-navy-alt">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl space-y-10 reveal">
          {sections.map((s, i) => (
            <div key={i}>
              <h2 className="text-xl font-display text-white mb-3">{s.title}</h2>
              <p className="text-white/50 font-body leading-relaxed text-sm">{s.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
