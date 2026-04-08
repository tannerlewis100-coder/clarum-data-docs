import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const faqs = [
  {
    q: "What are research peptides?",
    a: "Research peptides are short chains of amino acids used in scientific and laboratory research. They are synthesized for in vitro study and are not intended for human or veterinary use."
  },
  {
    q: 'What does "Research Use Only" mean?',
    a: "All products sold by Clarum are intended strictly for in vitro laboratory research. They are not for human consumption, clinical application, or veterinary use. By purchasing, you confirm the products will be used solely for legitimate research purposes."
  },
  {
    q: "How do I read a Certificate of Analysis (COA)?",
    a: "A COA includes the compound name, batch number, and results from each test panel. Look for HPLC purity (≥99%), mass spectrometry confirmation, heavy metals (ND = non-detect), microbial counts, and endotoxin levels. All values should be within specification for a PASS result."
  },
  {
    q: "What is endotoxin testing and why does it matter?",
    a: "Endotoxin testing (LAL method) detects bacterial endotoxins — toxic byproducts of gram-negative bacteria. Most peptide vendors skip this test entirely. Clarum runs it on every batch because endotoxin contamination can compromise research results."
  },
  {
    q: "What makes Clarum's testing different from other vendors?",
    a: "Most vendors only test for purity via HPLC. Clarum runs a full 5-panel test on every batch: HPLC purity, mass spectrometry (LC-MS) identity, heavy metals (ICP-MS), microbial/yeast screening, and endotoxin (LAL). All results are published in our public COA Library."
  },
  {
    q: "Do you ship internationally?",
    a: "Currently, Clarum ships within the United States. International shipping is being evaluated and will be announced when available."
  },
  {
    q: "How are products shipped and stored?",
    a: "Products are shipped in insulated packaging with appropriate temperature controls. Upon receipt, we recommend storing lyophilized peptides in a freezer (-20°C) for maximum stability."
  },
  {
    q: "Can I see the COA before I purchase?",
    a: "Yes. Our entire COA Library is publicly available — no login required. You can verify testing results for any product and batch before ordering."
  },
  {
    q: "What is your return policy?",
    a: "Due to the nature of research materials, we cannot accept returns on opened products. Unopened products may be returned within 14 days. Contact us for specific inquiries."
  },
];

export default function FAQ() {
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef}>
      <section className="bg-navy gold-line-texture pt-28 pb-16">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-body font-semibold">Support</span>
          <h1 className="text-4xl lg:text-5xl font-display text-primary-foreground mt-2">
            Frequently Asked Questions
          </h1>
        </div>
      </section>

      <section className="py-12 lg:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl reveal">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="bg-card rounded-card border border-border px-6 data-[state=open]:border-gold/30 transition-colors"
              >
                <AccordionTrigger className="font-display text-lg text-foreground hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-body leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
