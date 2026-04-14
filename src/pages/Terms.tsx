import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const sections = [
  {
    title: "Research Use Only",
    content: "All products sold by Clarum Research are intended strictly for in vitro laboratory research purposes. They are not for human or veterinary use, consumption, or clinical application. By placing an order, you confirm that all products will be used solely for legitimate scientific research."
  },
  {
    title: "Eligibility",
    content: "You must be at least 18 years of age to purchase from Clarum Research. By using this site, you represent that you are purchasing products for legitimate research purposes."
  },
  {
    title: "Orders & Payment",
    content: "All prices are listed in USD and are subject to change without notice. We reserve the right to refuse or cancel any order at our sole discretion."
  },
  {
    title: "Shipping & Returns",
    content: "Please refer to our FAQ for detailed shipping information. Returns are accepted for unopened or damaged items within 14 days of delivery. Contact support@clarum.co to initiate a return."
  },
  {
    title: "Limitation of Liability",
    content: "All products are provided as-is for research use. Clarum Research is not liable for any damages or consequences arising from the misuse, mishandling, or misapplication of any product purchased from this site."
  },
  {
    title: "Intellectual Property",
    content: "All content on this website — including text, graphics, logos, and images — is the property of Clarum Research and is protected by applicable intellectual property laws."
  },
  {
    title: "Governing Law",
    content: "These terms are governed by and construed in accordance with the laws of the United States."
  },
  {
    title: "Changes to Terms",
    content: "Clarum Research reserves the right to update these terms at any time. Continued use of the site following any changes constitutes acceptance of the revised terms."
  },
];

export default function Terms() {
  useScrollReveal();

  return (
    <div className="bg-navy min-h-screen">
      <section className="pt-32 pb-12 lg:pb-16 bg-navy-alt border-b border-white/5">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-body font-semibold">Legal</span>
          <h1 className="text-4xl lg:text-5xl font-display text-white mt-2">Terms of Service</h1>
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
