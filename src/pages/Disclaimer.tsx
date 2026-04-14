import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export default function Disclaimer() {
  useScrollReveal();

  return (
    <div className="bg-navy min-h-screen">
      <section className="pt-32 pb-12 lg:pb-16 bg-navy-alt border-b border-white/5">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl text-center">
          <span className="text-xs uppercase tracking-[0.2em] text-gold font-body font-semibold">Legal</span>
          <h1 className="text-4xl lg:text-5xl font-display text-white mt-2">Disclaimer</h1>
        </div>
      </section>

      <section className="py-12 lg:py-20 bg-navy-alt">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl space-y-6 reveal">
          <p className="text-white/50 font-body leading-relaxed text-sm">
            All products offered by Clarum Research are intended strictly for in vitro laboratory research purposes only. They are not intended for human consumption, veterinary use, or any clinical application.
          </p>
          <p className="text-white/50 font-body leading-relaxed text-sm">
            These products have not been evaluated by the U.S. Food and Drug Administration (FDA). Nothing on this website constitutes medical advice, diagnosis, or treatment recommendations.
          </p>
          <p className="text-white/50 font-body leading-relaxed text-sm">
            Certificates of Analysis (COAs) published on this site reflect batch-specific analytical testing results and do not imply any therapeutic claims or efficacy for any application.
          </p>
          <p className="text-white/50 font-body leading-relaxed text-sm">
            Researchers and purchasers assume full responsibility for ensuring compliance with all applicable local, state, and federal regulations governing the acquisition, handling, and use of research materials.
          </p>
        </div>
      </section>
    </div>
  );
}
