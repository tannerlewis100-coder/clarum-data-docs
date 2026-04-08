export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  dosage: string;
  categoryColor: string;
}

export const featuredProducts: Product[] = [
  { id: "bpc-157", name: "BPC-157", price: 119, category: "Recovery", dosage: "10mg", categoryColor: "22 90% 55%" },
  { id: "tb-500", name: "TB-500", price: 159, category: "Recovery", dosage: "10mg", categoryColor: "22 90% 55%" },
  { id: "semax", name: "Semax", price: 79, category: "Cognitive", dosage: "10mg", categoryColor: "200 80% 55%" },
  { id: "ghk-cu", name: "GHK-Cu", price: 95, category: "GHK-Cu", dosage: "50mg", categoryColor: "280 60% 55%" },
  { id: "epitalon", name: "Epitalon", price: 115, category: "Longevity", dosage: "10mg", categoryColor: "160 60% 45%" },
  { id: "nad-plus", name: "NAD+", price: 229, category: "NAD+", dosage: "500mg", categoryColor: "45 80% 55%" },
  { id: "mots-c", name: "MOTS-c", price: 219, category: "Longevity", dosage: "10mg", categoryColor: "160 60% 45%" },
  { id: "klow-blend", name: "KLOW Blend", price: 219, category: "Blends", dosage: "", categoryColor: "340 60% 55%" },
];

export const allProducts: Product[] = [
  ...featuredProducts,
  { id: "selank", name: "Selank", price: 69, category: "Cognitive", dosage: "10mg", categoryColor: "200 80% 55%" },
  { id: "dsip", name: "DSIP", price: 89, category: "Cognitive", dosage: "5mg", categoryColor: "200 80% 55%" },
  { id: "foxo4-dri", name: "FOXO4-DRI", price: 349, category: "Longevity", dosage: "10mg", categoryColor: "160 60% 45%" },
  { id: "glutathione", name: "Glutathione", price: 79, category: "NAD+", dosage: "200mg", categoryColor: "45 80% 55%" },
  { id: "aicar", name: "AICAR", price: 189, category: "NAD+", dosage: "50mg", categoryColor: "45 80% 55%" },
  { id: "wolverine", name: "Wolverine Blend", price: 259, category: "Blends", dosage: "", categoryColor: "340 60% 55%" },
  { id: "4x-mic", name: "4X MIC", price: 179, category: "Blends", dosage: "", categoryColor: "340 60% 55%" },
  { id: "glow-blend", name: "GLOW Blend", price: 199, category: "GHK-Cu", dosage: "", categoryColor: "280 60% 55%" },
  { id: "ipamorelin", name: "Ipamorelin", price: 89, category: "Recovery", dosage: "5mg", categoryColor: "22 90% 55%" },
  { id: "cjc-1295", name: "CJC-1295", price: 99, category: "Recovery", dosage: "5mg", categoryColor: "22 90% 55%" },
  { id: "pt-141", name: "PT-141", price: 69, category: "Recovery", dosage: "10mg", categoryColor: "22 90% 55%" },
  { id: "thymosin-alpha", name: "Thymosin Alpha-1", price: 139, category: "Longevity", dosage: "5mg", categoryColor: "160 60% 45%" },
  { id: "ss-31", name: "SS-31", price: 199, category: "Longevity", dosage: "5mg", categoryColor: "160 60% 45%" },
  { id: "dihexa", name: "Dihexa", price: 149, category: "Cognitive", dosage: "10mg", categoryColor: "200 80% 55%" },
  { id: "noopept", name: "Noopept", price: 59, category: "Cognitive", dosage: "20mg", categoryColor: "200 80% 55%" },
  { id: "cerebrolysin", name: "Cerebrolysin", price: 179, category: "Cognitive", dosage: "10mg", categoryColor: "200 80% 55%" },
  { id: "igf-1-lr3", name: "IGF-1 LR3", price: 199, category: "Recovery", dosage: "1mg", categoryColor: "22 90% 55%" },
  { id: "mgf", name: "MGF", price: 129, category: "Recovery", dosage: "5mg", categoryColor: "22 90% 55%" },
  { id: "follistatin", name: "Follistatin 344", price: 289, category: "Recovery", dosage: "1mg", categoryColor: "22 90% 55%" },
  { id: "aod-9604", name: "AOD-9604", price: 79, category: "NAD+", dosage: "5mg", categoryColor: "45 80% 55%" },
  { id: "tesamorelin", name: "Tesamorelin", price: 189, category: "Recovery", dosage: "5mg", categoryColor: "22 90% 55%" },
  { id: "hexarelin", name: "Hexarelin", price: 79, category: "Recovery", dosage: "5mg", categoryColor: "22 90% 55%" },
  { id: "ghrp-6", name: "GHRP-6", price: 69, category: "Recovery", dosage: "10mg", categoryColor: "22 90% 55%" },
  { id: "ghrp-2", name: "GHRP-2", price: 69, category: "Recovery", dosage: "10mg", categoryColor: "22 90% 55%" },
  { id: "sermorelin", name: "Sermorelin", price: 99, category: "Recovery", dosage: "5mg", categoryColor: "22 90% 55%" },
  { id: "kisspeptin", name: "Kisspeptin-10", price: 119, category: "Recovery", dosage: "5mg", categoryColor: "22 90% 55%" },
  { id: "melanotan-ii", name: "Melanotan II", price: 59, category: "Recovery", dosage: "10mg", categoryColor: "22 90% 55%" },
  { id: "snap-8", name: "SNAP-8", price: 89, category: "GHK-Cu", dosage: "50mg", categoryColor: "280 60% 55%" },
  { id: "copper-peptide", name: "Copper Peptide AHK", price: 99, category: "GHK-Cu", dosage: "50mg", categoryColor: "280 60% 55%" },
  { id: "thymalin", name: "Thymalin", price: 149, category: "Longevity", dosage: "10mg", categoryColor: "160 60% 45%" },
  { id: "pinealon", name: "Pinealon", price: 89, category: "Longevity", dosage: "10mg", categoryColor: "160 60% 45%" },
  { id: "vilon", name: "Vilon", price: 89, category: "Longevity", dosage: "10mg", categoryColor: "160 60% 45%" },
  { id: "epithalon-nasal", name: "Epithalon Nasal", price: 139, category: "Longevity", dosage: "10mg", categoryColor: "160 60% 45%" },
  { id: "nad-nasal", name: "NAD+ Nasal", price: 199, category: "NAD+", dosage: "250mg", categoryColor: "45 80% 55%" },
  { id: "nmn", name: "NMN", price: 149, category: "NAD+", dosage: "500mg", categoryColor: "45 80% 55%" },
  { id: "resveratrol", name: "Resveratrol", price: 79, category: "NAD+", dosage: "500mg", categoryColor: "45 80% 55%" },
  { id: "fisetin", name: "Fisetin", price: 89, category: "Longevity", dosage: "500mg", categoryColor: "160 60% 45%" },
  { id: "rapamycin", name: "Rapamycin Analog", price: 299, category: "Longevity", dosage: "5mg", categoryColor: "160 60% 45%" },
  { id: "dasatinib", name: "Dasatinib Analog", price: 249, category: "Longevity", dosage: "10mg", categoryColor: "160 60% 45%" },
  { id: "quercetin", name: "Quercetin", price: 59, category: "Longevity", dosage: "500mg", categoryColor: "160 60% 45%" },
  { id: "p21", name: "P21", price: 159, category: "Cognitive", dosage: "10mg", categoryColor: "200 80% 55%" },
  { id: "cortagen", name: "Cortagen", price: 99, category: "Cognitive", dosage: "10mg", categoryColor: "200 80% 55%" },
  { id: "na-selank", name: "NA-Selank", price: 99, category: "Cognitive", dosage: "10mg", categoryColor: "200 80% 55%" },
  { id: "na-semax", name: "NA-Semax", price: 99, category: "Cognitive", dosage: "10mg", categoryColor: "200 80% 55%" },
  { id: "bpc-tb-blend", name: "BPC + TB Blend", price: 249, category: "Blends", dosage: "", categoryColor: "340 60% 55%" },
  { id: "recovery-stack", name: "Recovery Stack", price: 289, category: "Blends", dosage: "", categoryColor: "340 60% 55%" },
  { id: "longevity-stack", name: "Longevity Stack", price: 319, category: "Blends", dosage: "", categoryColor: "340 60% 55%" },
  { id: "cognitive-stack", name: "Cognitive Stack", price: 259, category: "Blends", dosage: "", categoryColor: "340 60% 55%" },
  { id: "ll-37", name: "LL-37", price: 129, category: "Recovery", dosage: "5mg", categoryColor: "22 90% 55%" },
  { id: "ta1-thymosin", name: "TA1", price: 149, category: "Longevity", dosage: "5mg", categoryColor: "160 60% 45%" },
  { id: "pentosan", name: "Pentosan", price: 179, category: "Recovery", dosage: "10mg", categoryColor: "22 90% 55%" },
  { id: "bpc-oral", name: "BPC-157 Oral", price: 89, category: "Recovery", dosage: "500mcg x 60", categoryColor: "22 90% 55%" },
  { id: "ghk-cu-topical", name: "GHK-Cu Topical", price: 129, category: "GHK-Cu", dosage: "50ml", categoryColor: "280 60% 55%" },
];

export const categories = [
  { name: "Recovery & Performance", emoji: "💪", examples: "BPC-157, TB-500", slug: "Recovery" },
  { name: "Longevity & Anti-Aging", emoji: "⏳", examples: "Epitalon, MOTS-c, FOXO4", slug: "Longevity" },
  { name: "GHK-Cu & Radiance", emoji: "✨", examples: "GHK-Cu 50mg, GLOW Blend", slug: "GHK-Cu" },
  { name: "Cognitive & Sleep", emoji: "🧠", examples: "Semax, Selank, DSIP", slug: "Cognitive" },
  { name: "NAD+ & Metabolic", emoji: "⚡", examples: "NAD+, Glutathione, AICAR", slug: "NAD+" },
  { name: "Blends & Stacks", emoji: "🔬", examples: "KLOW, Wolverine, 4X MIC", slug: "Blends" },
];
