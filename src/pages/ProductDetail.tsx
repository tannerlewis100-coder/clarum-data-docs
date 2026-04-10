import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart, Shield, FlaskConical, Check } from "lucide-react";
import { allProducts, getProductSlug, getProductVariants, type Product } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const testPanels = [
  { label: "HPLC Purity", result: "≥99%" },
  { label: "Mass Spectrometry", result: "Identity Confirmed" },
  { label: "Heavy Metals (ICP-MS)", result: "ND" },
  { label: "Microbial & Yeast", result: "Pass" },
  { label: "Endotoxin (LAL)", result: "Pass" },
];

// Product-specific descriptions
const descriptions: Record<string, string> = {
  "bpc-157": "BPC-157 (Body Protection Compound-157) is a synthetic peptide derived from a portion of human gastric juice proteins. It has been extensively studied for its regenerative properties in connective tissue, muscle, and the nervous system.",
  "tb-500": "TB-500 (Thymosin Beta-4) is a naturally occurring peptide present in virtually all human and animal cells. Research focuses on its role in tissue repair, cell migration, and anti-inflammatory activity.",
  "wolverine": "The Wolverine Blend combines BPC-157 and TB-500 in a single formulation, designed for researchers studying synergistic recovery and tissue repair pathways.",
  "ll-37": "LL-37 is a cathelicidin antimicrobial peptide found in the human immune system. It plays a critical role in innate immunity and has been studied for wound healing and antimicrobial applications.",
  "ara-290": "ARA-290 is a non-erythropoietic peptide derived from erythropoietin (EPO). Research explores its tissue-protective and anti-inflammatory properties without hematopoietic effects.",
  "pnc-27": "PNC-27 is a synthetic peptide that combines a p53 residue with a cell membrane-penetrating sequence. It has been studied for its selective interaction with HDM-2 protein in research models.",
  "sermorelin": "Sermorelin is a growth hormone-releasing hormone (GHRH) analog consisting of the first 29 amino acids of GHRH. It stimulates the pituitary gland to produce and secrete growth hormone.",
  "cjc-nodac": "CJC-1295 without DAC is a modified GHRH analog with improved stability. It promotes sustained growth hormone release without the extended half-life of the DAC-conjugated version.",
  "cjc-dac": "CJC-1295 with DAC (Drug Affinity Complex) features an extended half-life through albumin binding. Research focuses on sustained GH elevation over extended periods.",
  "cjc-ipa-blend": "This 2X blend combines CJC-1295 (without DAC) and Ipamorelin for researchers studying the synergistic effects of GHRH analogs and ghrelin mimetics on growth hormone secretion.",
  "ipamorelin": "Ipamorelin is a selective growth hormone secretagogue and ghrelin receptor agonist. It is one of the most selective GH-releasing peptides with minimal effect on cortisol and prolactin.",
  "tesamorelin": "Tesamorelin is a stabilized analog of growth hormone-releasing factor (GRF). It has been studied extensively for its effects on visceral adipose tissue and growth hormone regulation.",
  "ghrp-6": "GHRP-6 (Growth Hormone Releasing Peptide-6) is a synthetic hexapeptide that stimulates GH secretion via the ghrelin receptor. It is one of the earliest and most studied GH secretagogues.",
  "hexarelin": "Hexarelin is a synthetic growth hormone secretagogue with potent GH-releasing activity. Research indicates it may have cardioprotective properties independent of GH release.",
  "hcg": "Human Chorionic Gonadotropin (HCG) is a glycoprotein hormone. It is widely used in research studying reproductive endocrinology and gonadal function.",
  "hmg": "Human Menopausal Gonadotropin (HMG) contains both FSH and LH activity. It is used in research related to gonadal stimulation and reproductive biology.",
  "igf-1-lr3": "IGF-1 LR3 is a modified form of Insulin-like Growth Factor-1 with an extended half-life. The LR3 modification reduces IGF binding protein affinity, increasing bioavailability.",
  "igf-des": "IGF-DES (Des(1-3) IGF-1) lacks the first three amino acids of IGF-1, resulting in reduced binding to IGF binding proteins and increased potency in cell culture research.",
  "gdf-8": "GDF-8 (Myostatin) is a member of the TGF-β superfamily that negatively regulates skeletal muscle mass. Research focuses on myostatin inhibition and muscle growth pathways.",
  "ace-031": "ACE-031 is a soluble form of the activin receptor type IIB (ActRIIB). It acts as a myostatin/activin trap and has been studied for its effects on muscle mass regulation.",
  "na-epitalon": "N-Acetyl Epitalon Amidate is an enhanced version of Epitalon with improved stability and bioavailability. Research focuses on its interaction with telomerase and cellular aging.",
  "epitalon": "Epitalon (Epithalon) is a synthetic tetrapeptide based on the natural epithalamin produced by the pineal gland. It is studied for its effects on telomerase activity and cellular longevity.",
  "mots-c": "MOTS-c is a mitochondria-derived peptide encoded within the 12S rRNA gene. It is studied for its role in metabolic homeostasis, insulin sensitivity, and exercise-mimetic effects.",
  "ss-31": "SS-31 (Elamipretide) is a mitochondria-targeted peptide that selectively binds to cardiolipin in the inner mitochondrial membrane. Research explores its role in mitochondrial bioenergetics.",
  "foxo4": "FOXO4-DRI is a cell-permeable peptide that disrupts the FOXO4/p53 interaction. It has been studied in research models focused on cellular senescence and aging pathways.",
  "pinealon": "Pinealon is a short tripeptide (Glu-Asp-Arg) originally isolated from the pineal gland. Research explores its neuroprotective and geroprotective properties.",
  "thymalin": "Thymalin is a polypeptide complex originally isolated from the thymus gland. It has been studied for its immunomodulatory and geroprotective properties in aging research.",
  "ghk-cu": "GHK-Cu (copper peptide) is a naturally occurring tripeptide-copper complex found in human plasma. Research focuses on its role in tissue remodeling, wound healing, and skin biology.",
  "glow-blend": "The GLOW Blend combines GHK-Cu, BPC-157, and TB-500 in a single formulation for researchers studying synergistic pathways in skin and tissue regeneration.",
  "snap-8": "SNAP-8 (Acetyl Octapeptide-3) is a peptide that mimics the N-terminal end of SNAP-25. It is studied in skin biology research for its effects on muscle contraction signaling.",
  "melanotan-ii": "Melanotan II is a synthetic analog of alpha-melanocyte stimulating hormone (α-MSH). It activates melanocortin receptors and has been studied for pigmentation research.",
  "semax": "Semax is a synthetic analog of ACTH(4-10) developed for its nootropic and neuroprotective properties. It does not carry the hormonal effects of full-length ACTH.",
  "selank": "Selank is a synthetic analog of the immunomodulatory peptide tuftsin. Research explores its anxiolytic-like properties and effects on neurotrophic factor expression.",
  "dsip": "DSIP (Delta Sleep-Inducing Peptide) is a neuropeptide originally isolated from cerebral venous blood. Research focuses on its role in sleep architecture and stress response modulation.",
  "ta-1": "Thymosin Alpha 1 is a peptide originally isolated from thymic tissue. It is one of the most studied immunomodulatory peptides, with research spanning decades across multiple fields.",
  "kpv": "KPV (Lysine-Proline-Valine) is a C-terminal tripeptide fragment of alpha-MSH. Research focuses on its anti-inflammatory properties mediated through NF-κB pathway modulation.",
  "vip10": "VIP (Vasoactive Intestinal Peptide) is a 28-amino-acid neuropeptide. Research explores its immunomodulatory, anti-inflammatory, and neuroprotective properties.",
  "5a1mq": "5-Amino-1MQ is a small molecule inhibitor of nicotinamide N-methyltransferase (NNMT). Research focuses on its role in cellular energy metabolism and NAD+ salvage pathways.",
  "aod-9604": "AOD-9604 is a modified fragment (176-191) of human growth hormone. It has been studied specifically for its lipolytic properties without the growth-promoting effects of full GH.",
  "aicar": "AICAR (5-Aminoimidazole-4-carboxamide ribonucleotide) is an AMP-activated protein kinase (AMPK) agonist. It is studied as an exercise-mimetic compound in metabolic research.",
  "cagrilintide": "Cagrilintide is a long-acting amylin analog. Research explores its effects on appetite regulation and metabolic pathways through amylin receptor agonism.",
  "mazdutide": "Mazdutide is a dual GLP-1 and glucagon receptor agonist. It is studied for its combined effects on glucose homeostasis and energy expenditure in metabolic research.",
  "survodutide": "Survodutide is a dual glucagon/GLP-1 receptor agonist. Research focuses on its effects on hepatic lipid metabolism and energy balance regulation.",
  "slu-pp-332": "SLU-PP-332 is an ERRα/γ agonist studied as an exercise-mimetic compound. Research explores its effects on oxidative metabolism and endurance-related gene expression.",
  "glp-3-rz": "GLP-3 RZ is a GLP-1 receptor agonist variant. Research focuses on its glucose-dependent insulinotropic effects and metabolic signaling pathways.",
  "nad": "NAD+ (Nicotinamide Adenine Dinucleotide) is a critical coenzyme in cellular metabolism. Research explores its role in energy production, DNA repair, and sirtuin activation.",
  "glutathione": "Glutathione is the body's master antioxidant, a tripeptide of glutamate, cysteine, and glycine. Research focuses on its role in oxidative stress defense and detoxification.",
  "pt-141": "PT-141 (Bremelanotide) is a synthetic peptide analog of α-MSH that activates melanocortin receptors MC3R and MC4R. It is studied for its effects on central nervous system pathways.",
  "kisspeptin": "Kisspeptin is a neuropeptide that plays a critical role in the regulation of the hypothalamic-pituitary-gonadal axis. Research explores its role in reproductive endocrinology.",
  "klow-blend": "The KLOW Blend combines GHK-Cu, KPV, BPC-157, and TB-500 for researchers studying multi-pathway approaches to tissue repair and inflammatory modulation.",
  "2x-cjc-ipa": "This 2X blend combines CJC-1295 (without DAC) and Ipamorelin in equal parts for researchers studying synergistic growth hormone secretion pathways.",
  "8x-lipo": "The 8X Lipotropic Blend combines eight lipotropic compounds in a single formulation for metabolic research applications.",
  "4x-mic": "The 4X MIC Blend combines four methionine-inositol-choline compounds for researchers studying hepatoprotective and lipotropic metabolic pathways.",
  "wolverine-r": "The Wolverine Blend combines BPC-157 and TB-500 in a single formulation, designed for researchers studying synergistic recovery and tissue repair pathways.",
  "glow-blend-s": "The GLOW Blend combines GHK-Cu, BPC-157, and TB-500 for researchers studying synergistic pathways in skin and tissue regeneration.",
  "recon-water": "Pharmaceutical-grade bacteriostatic water for peptide reconstitution. Contains 0.9% benzyl alcohol as a preservative. Sterile filtered.",
  "b12": "Vitamin B12 (Methylcobalamin) injectable solution. Essential coenzyme for DNA synthesis, fatty acid metabolism, and neurological function research.",
};

function getDescription(product: Product): string {
  // Try exact id first, then strip variant suffixes
  const baseSlug = product.id.replace(/-\d+mg$|-\d+iu$|-\d+ml$|-01mg$|-5mg$|-10mg$|-r$|-s$/, "");
  return descriptions[product.id] || descriptions[baseSlug] || `${product.name} is a pharmaceutical-grade research compound. Every batch undergoes our mandatory 5-panel independent lab testing: HPLC purity, mass spectrometry identity, heavy metals, microbial screening, and endotoxin testing.`;
}

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const revealRef = useScrollReveal();
  const { addItem } = useCart();

  // Find all variants for this product
  const variants = useMemo(() => {
    if (!slug) return [];
    return getProductVariants(slug);
  }, [slug]);

  const [selectedIdx, setSelectedIdx] = useState(0);

  if (variants.length === 0) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h1 className="font-display text-3xl text-foreground">Product Not Found</h1>
        <Link to="/shop" className="text-gold font-body text-sm mt-4 inline-block hover:text-gold-light">
          ← Back to Shop
        </Link>
      </div>
    );
  }

  const selected = variants[selectedIdx] || variants[0];
  const description = getDescription(selected);

  return (
    <div ref={revealRef}>
      {/* Hero banner */}
      <section className="bg-navy gold-line-texture pt-28 pb-12">
        <div className="container mx-auto px-4 lg:px-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider text-gold/70 hover:text-gold font-body font-semibold transition-colors mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Catalog
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.15em] text-gold font-body font-semibold bg-gold/10 border border-gold/20 px-3 py-1 rounded-full">
              {selected.category}
            </span>
            <span className="text-[10px] uppercase tracking-[0.15em] text-primary-foreground/40 font-body">
              Batch {selected.coaBatch}
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-display text-primary-foreground mt-3">
            {selected.name}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 lg:py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Left: Image / Visual */}
            <div className="reveal">
              <div className="relative aspect-square rounded-2xl bg-navy gold-grid-texture overflow-hidden border border-border">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.06] via-transparent to-gold/[0.03]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-8">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-gold/50 font-body font-semibold mb-3">
                    {selected.category}
                  </span>
                  <span className="font-display text-4xl lg:text-5xl text-primary-foreground">
                    {selected.name}
                  </span>
                  {selected.dosage && (
                    <span className="text-sm text-primary-foreground/40 font-body mt-2">{selected.dosage}</span>
                  )}
                </div>

                {/* COA badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2 bg-navy/80 backdrop-blur-sm rounded-lg px-4 py-3 border border-gold/10">
                  <Shield className="h-4 w-4 text-gold shrink-0" />
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gold font-body font-semibold">5-Panel COA Verified</p>
                    <p className="text-[9px] text-primary-foreground/40 font-body">Batch {selected.coaBatch} · Full report available</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Details */}
            <div className="reveal">
              {/* Price */}
              <div className="mb-6">
                <span className="text-3xl font-display bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
                  ${selected.price}
                </span>
              </div>

              {/* Variant selector */}
              {variants.length > 1 && (
                <div className="mb-8">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-body font-semibold mb-2">Select Size</p>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((v, i) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedIdx(i)}
                        className={`text-xs font-body font-semibold px-4 py-2 rounded-full border transition-all ${
                          i === selectedIdx
                            ? "bg-gold/15 border-gold/40 text-gold"
                            : "border-border text-muted-foreground hover:border-gold/20"
                        }`}
                      >
                        {v.dosage} — ${v.price}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Add to cart */}
              <button
                onClick={() => addItem(selected)}
                className="inline-flex items-center gap-2 bg-gold text-navy font-body font-semibold text-sm uppercase tracking-wider px-8 py-3.5 rounded-lg hover:bg-gold-light transition-colors mb-10"
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </button>

              {/* Description */}
              <div className="mb-10">
                <h2 className="font-display text-xl text-foreground mb-3">About This Product</h2>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">{description}</p>
                <p className="text-[10px] text-muted-foreground/50 font-body mt-4 uppercase tracking-wider">
                  For in vitro laboratory research use only. Not for human or veterinary consumption.
                </p>
              </div>

              {/* 5-Panel COA */}
              <div className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FlaskConical className="h-4 w-4 text-gold" />
                  <h3 className="font-display text-lg text-foreground">5-Panel COA Results</h3>
                </div>
                <div className="space-y-3">
                  {testPanels.map((panel) => (
                    <div key={panel.label} className="flex items-center justify-between text-sm font-body">
                      <span className="text-muted-foreground">{panel.label}</span>
                      <span className="flex items-center gap-1.5 font-semibold text-emerald-600">
                        <Check className="h-3.5 w-3.5" />
                        {panel.result}
                      </span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/coa-library"
                  className="inline-block mt-4 text-xs text-gold font-body font-medium hover:text-gold-light transition-colors uppercase tracking-wider"
                >
                  View Full Report →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
