export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  dosage: string;
  categoryColor: string;
  coaBatch: string;
}

const CAT = {
  Recovery: "22 90% 55%",
  "Growth Hormone": "260 50% 55%",
  Longevity: "160 60% 45%",
  Skin: "280 60% 55%",
  Cognitive: "200 80% 55%",
  Immune: "170 50% 45%",
  "Weight Management": "45 80% 55%",
  "NAD+": "38 55% 52%",
  "Sexual Health": "350 65% 55%",
  Blends: "340 60% 55%",
  Supplies: "210 20% 50%",
} as const;

export const allProducts: Product[] = [
  // ── Recovery & Repair ──
  { id: "bpc-157-5mg", name: "BPC-157", price: 59, category: "Recovery", dosage: "5mg", categoryColor: CAT.Recovery, coaBatch: "2406-BPC5" },
  { id: "bpc-157-10mg", name: "BPC-157", price: 119, category: "Recovery", dosage: "10mg", categoryColor: CAT.Recovery, coaBatch: "2406-BPC10" },
  { id: "bpc-157-20mg", name: "BPC-157", price: 179, category: "Recovery", dosage: "20mg", categoryColor: CAT.Recovery, coaBatch: "2406-BPC20" },
  { id: "tb-500-5mg", name: "TB-500", price: 89, category: "Recovery", dosage: "5mg", categoryColor: CAT.Recovery, coaBatch: "2406-TB5" },
  { id: "tb-500-10mg", name: "TB-500", price: 159, category: "Recovery", dosage: "10mg", categoryColor: CAT.Recovery, coaBatch: "2406-TB10" },
  { id: "wolverine-5mg-r", name: "Wolverine Blend", price: 109, category: "Recovery", dosage: "5mg/5mg", categoryColor: CAT.Recovery, coaBatch: "2406-WLV5" },
  { id: "wolverine-10mg-r", name: "Wolverine Blend", price: 199, category: "Recovery", dosage: "10mg/10mg", categoryColor: CAT.Recovery, coaBatch: "2406-WLV10" },
  { id: "ll-37", name: "LL-37", price: 129, category: "Recovery", dosage: "5mg", categoryColor: CAT.Recovery, coaBatch: "2406-LL37" },
  { id: "ara-290", name: "ARA-290", price: 159, category: "Recovery", dosage: "10mg", categoryColor: CAT.Recovery, coaBatch: "2406-ARA" },
  { id: "pnc-27", name: "PNC-27", price: 199, category: "Recovery", dosage: "10mg", categoryColor: CAT.Recovery, coaBatch: "2406-PNC" },

  // ── Growth Hormone & Secretagogues ──
  { id: "sermorelin", name: "Sermorelin", price: 115, category: "Growth Hormone", dosage: "10mg", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-SER" },
  { id: "cjc-nodac", name: "CJC-1295 Without DAC", price: 99, category: "Growth Hormone", dosage: "10mg", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-CJCND" },
  { id: "cjc-dac", name: "CJC-1295 With DAC", price: 109, category: "Growth Hormone", dosage: "5mg", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-CJCD" },
  { id: "cjc-ipa-blend", name: "2X Blend CJC/Ipamorelin", price: 105, category: "Growth Hormone", dosage: "5mg/5mg", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-CJIP" },
  { id: "ipamorelin", name: "Ipamorelin", price: 129, category: "Growth Hormone", dosage: "10mg", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-IPA" },
  { id: "tesamorelin-10mg", name: "Tesamorelin", price: 165, category: "Growth Hormone", dosage: "10mg", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-TES10" },
  { id: "tesamorelin-20mg", name: "Tesamorelin", price: 299, category: "Growth Hormone", dosage: "20mg", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-TES20" },
  { id: "ghrp-6-5mg", name: "GHRP-6 Acetate", price: 99, category: "Growth Hormone", dosage: "5mg", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-GH65" },
  { id: "ghrp-6-10mg", name: "GHRP-6 Acetate", price: 129, category: "Growth Hormone", dosage: "10mg", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-GH610" },
  { id: "hexarelin", name: "Hexarelin Acetate", price: 139, category: "Growth Hormone", dosage: "5mg", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-HEX" },
  { id: "hcg", name: "HCG", price: 189, category: "Growth Hormone", dosage: "10000iu", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-HCG" },
  { id: "hmg", name: "HMG", price: 149, category: "Growth Hormone", dosage: "75iu", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-HMG" },
  { id: "igf-1-lr3-01mg", name: "IGF-1 LR3", price: 89, category: "Growth Hormone", dosage: "0.1mg", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-IGF01" },
  { id: "igf-1-lr3-1mg", name: "IGF-1 LR3", price: 189, category: "Growth Hormone", dosage: "1mg", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-IGF1" },
  { id: "igf-des", name: "IGF-DES", price: 99, category: "Growth Hormone", dosage: "0.1mg", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-IGFD" },
  { id: "gdf-8", name: "GDF-8", price: 249, category: "Growth Hormone", dosage: "1mg", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-GDF8" },
  { id: "ace-031", name: "ACE-031", price: 279, category: "Growth Hormone", dosage: "1mg", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-ACE" },

  // ── Longevity & Anti-Aging ──
  { id: "na-epitalon", name: "N-Acetyl Epitalon Amidate", price: 115, category: "Longevity", dosage: "5mg", categoryColor: CAT.Longevity, coaBatch: "2406-NAEP" },
  { id: "epitalon-10mg", name: "Epitalon", price: 115, category: "Longevity", dosage: "10mg", categoryColor: CAT.Longevity, coaBatch: "2406-EPI10" },
  { id: "epitalon-50mg", name: "Epitalon", price: 165, category: "Longevity", dosage: "50mg", categoryColor: CAT.Longevity, coaBatch: "2406-EPI50" },
  { id: "mots-c-10mg", name: "MOTS-c", price: 219, category: "Longevity", dosage: "10mg", categoryColor: CAT.Longevity, coaBatch: "2406-MOT10" },
  { id: "mots-c-40mg", name: "MOTS-c", price: 219, category: "Longevity", dosage: "40mg", categoryColor: CAT.Longevity, coaBatch: "2406-MOT40" },
  { id: "ss-31-10mg", name: "SS-31", price: 139, category: "Longevity", dosage: "10mg", categoryColor: CAT.Longevity, coaBatch: "2406-SS10" },
  { id: "ss-31-50mg", name: "SS-31", price: 279, category: "Longevity", dosage: "50mg", categoryColor: CAT.Longevity, coaBatch: "2406-SS50" },
  { id: "foxo4", name: "FOXO4", price: 349, category: "Longevity", dosage: "10mg", categoryColor: CAT.Longevity, coaBatch: "2406-FOX4" },
  { id: "pinealon", name: "Pinealon", price: 135, category: "Longevity", dosage: "20mg", categoryColor: CAT.Longevity, coaBatch: "2406-PIN" },
  { id: "thymalin", name: "Thymalin", price: 149, category: "Longevity", dosage: "10mg", categoryColor: CAT.Longevity, coaBatch: "2406-THYM" },

  // ── Skin & Radiance ──
  { id: "ghk-cu-50mg", name: "GHK-Cu", price: 95, category: "Skin", dosage: "50mg", categoryColor: CAT.Skin, coaBatch: "2406-GHK50" },
  { id: "ghk-cu-100mg", name: "GHK-Cu", price: 149, category: "Skin", dosage: "100mg", categoryColor: CAT.Skin, coaBatch: "2406-GHK100" },
  { id: "glow-blend-s", name: "GLOW Blend — GHK-Cu/BPC-157/TB-500", price: 279, category: "Skin", dosage: "", categoryColor: CAT.Skin, coaBatch: "2406-GLOW" },
  { id: "snap-8", name: "Snap-8", price: 115, category: "Skin", dosage: "10mg", categoryColor: CAT.Skin, coaBatch: "2406-SNAP" },
  { id: "melanotan-ii", name: "Melanotan 2", price: 115, category: "Skin", dosage: "10mg", categoryColor: CAT.Skin, coaBatch: "2406-MEL2" },

  // ── Cognitive & Sleep ──
  { id: "semax", name: "Semax", price: 79, category: "Cognitive", dosage: "10mg", categoryColor: CAT.Cognitive, coaBatch: "2406-SEM" },
  { id: "selank", name: "Selank", price: 79, category: "Cognitive", dosage: "10mg", categoryColor: CAT.Cognitive, coaBatch: "2406-SEL" },
  { id: "dsip-5mg", name: "DSIP", price: 89, category: "Cognitive", dosage: "5mg", categoryColor: CAT.Cognitive, coaBatch: "2406-DSIP5" },
  { id: "dsip-15mg", name: "DSIP", price: 129, category: "Cognitive", dosage: "15mg", categoryColor: CAT.Cognitive, coaBatch: "2406-DSIP15" },

  // ── Immune & Thymic ──
  { id: "ta-1", name: "Thymosin Alpha 1", price: 139, category: "Immune", dosage: "10mg", categoryColor: CAT.Immune, coaBatch: "2406-TA1" },
  { id: "kpv", name: "KPV / Lysine-Proline-Valine", price: 129, category: "Immune", dosage: "10mg", categoryColor: CAT.Immune, coaBatch: "2406-KPV" },
  { id: "vip10", name: "VIP10", price: 199, category: "Immune", dosage: "10mg", categoryColor: CAT.Immune, coaBatch: "2406-VIP" },

  // ── Weight Management & Metabolic ──
  { id: "5a1mq-5mg", name: "5-Amino-1MQ", price: 65, category: "Weight Management", dosage: "5mg", categoryColor: CAT["Weight Management"], coaBatch: "2406-5A5" },
  { id: "5a1mq-50mg", name: "5-Amino-1MQ", price: 229, category: "Weight Management", dosage: "50mg", categoryColor: CAT["Weight Management"], coaBatch: "2406-5A50" },
  { id: "aod-9604", name: "AOD-9604", price: 125, category: "Weight Management", dosage: "5mg", categoryColor: CAT["Weight Management"], coaBatch: "2406-AOD" },
  { id: "aicar", name: "AICAR", price: 139, category: "Weight Management", dosage: "50mg", categoryColor: CAT["Weight Management"], coaBatch: "2406-AIC" },
  { id: "cagrilintide", name: "Cagrilintide", price: 159, category: "Weight Management", dosage: "10mg", categoryColor: CAT["Weight Management"], coaBatch: "2406-CAG" },
  { id: "mazdutide", name: "Mazdutide", price: 299, category: "Weight Management", dosage: "100mg", categoryColor: CAT["Weight Management"], coaBatch: "2406-MAZ" },
  { id: "survodutide", name: "Survodutide", price: 279, category: "Weight Management", dosage: "10mg", categoryColor: CAT["Weight Management"], coaBatch: "2406-SUR" },
  { id: "slu-pp-332", name: "SLU-PP-332", price: 119, category: "Weight Management", dosage: "5mg", categoryColor: CAT["Weight Management"], coaBatch: "2406-SLU" },
  { id: "glp-3-rz", name: "GLP-3 RZ", price: 249, category: "Weight Management", dosage: "60mg", categoryColor: CAT["Weight Management"], coaBatch: "2406-GLP3" },

  // ── NAD+ & Antioxidants ──
  { id: "nad-500mg", name: "NAD+", price: 229, category: "NAD+", dosage: "500mg", categoryColor: CAT["NAD+"], coaBatch: "2406-NAD500" },
  { id: "nad-1000mg", name: "NAD+", price: 329, category: "NAD+", dosage: "1000mg", categoryColor: CAT["NAD+"], coaBatch: "2406-NAD1K" },
  { id: "glutathione-600mg", name: "Glutathione", price: 89, category: "NAD+", dosage: "600mg", categoryColor: CAT["NAD+"], coaBatch: "2406-GLU6" },
  { id: "glutathione-1500mg", name: "Glutathione", price: 165, category: "NAD+", dosage: "1500mg", categoryColor: CAT["NAD+"], coaBatch: "2406-GLU15" },

  // ── Sexual Health ──
  { id: "pt-141", name: "PT-141", price: 129, category: "Sexual Health", dosage: "10mg", categoryColor: CAT["Sexual Health"], coaBatch: "2406-PT14" },
  { id: "kisspeptin", name: "KissPeptin", price: 129, category: "Sexual Health", dosage: "10mg", categoryColor: CAT["Sexual Health"], coaBatch: "2406-KISS" },

  // ── Blends & Stacks ──
  { id: "wolverine-5mg", name: "Wolverine Blend", price: 109, category: "Blends", dosage: "5mg/5mg", categoryColor: CAT.Blends, coaBatch: "2406-WLV5" },
  { id: "wolverine-10mg", name: "Wolverine Blend", price: 199, category: "Blends", dosage: "10mg/10mg", categoryColor: CAT.Blends, coaBatch: "2406-WLV10" },
  { id: "glow-blend", name: "GLOW Blend", price: 279, category: "Blends", dosage: "", categoryColor: CAT.Blends, coaBatch: "2406-GLOW" },
  { id: "klow-blend", name: "KLOW Blend — GHK-Cu/KPV/BPC-157/TB-500", price: 219, category: "Blends", dosage: "", categoryColor: CAT.Blends, coaBatch: "2406-KLOW" },
  { id: "2x-cjc-ipa", name: "2X Blend CJC/Ipamorelin", price: 105, category: "Blends", dosage: "5mg/5mg", categoryColor: CAT.Blends, coaBatch: "2406-CJIP" },
  { id: "8x-lipo", name: "8X Blend (Lipotropic)", price: 175, category: "Blends", dosage: "", categoryColor: CAT.Blends, coaBatch: "2406-8LIP" },
  { id: "4x-mic", name: "4X Blend (MIC)", price: 195, category: "Blends", dosage: "", categoryColor: CAT.Blends, coaBatch: "2406-4MIC" },

  // ── Supplies ──
  { id: "recon-water-3ml", name: "Reconstitution Water", price: 9, category: "Supplies", dosage: "3ml", categoryColor: CAT.Supplies, coaBatch: "2406-RW3" },
  { id: "recon-water-10ml", name: "Reconstitution Water", price: 15, category: "Supplies", dosage: "10ml", categoryColor: CAT.Supplies, coaBatch: "2406-RW10" },
];

/** Group products by name+category into variant sets. Returns [firstProduct, allVariants][] */
export function groupProducts(products: Product[]): [Product, Product[]][] {
  const map = new Map<string, Product[]>();
  for (const p of products) {
    const key = `${p.name}|||${p.category}`;
    const arr = map.get(key) || [];
    arr.push(p);
    map.set(key, arr);
  }
  return Array.from(map.values()).map((variants) => [variants[0], variants]);
}

// Featured products shown on homepage
export const featuredProducts: Product[] = allProducts.filter((p) =>
  ["bpc-157-10mg", "tb-500-10mg", "epitalon-10mg", "mots-c-10mg", "ghk-cu-50mg", "nad-500mg", "klow-blend", "wolverine-10mg"].includes(p.id)
);

export const categories = [
  { name: "Recovery & Repair", emoji: "💪", examples: "BPC-157, TB-500, LL-37", slug: "Recovery" },
  { name: "Growth Hormone & Secretagogues", emoji: "📈", examples: "CJC-1295, Ipamorelin, HCG", slug: "Growth Hormone" },
  { name: "Longevity & Anti-Aging", emoji: "⏳", examples: "Epitalon, MOTS-c, FOXO4", slug: "Longevity" },
  { name: "Skin & Radiance", emoji: "✨", examples: "GHK-Cu, GLOW Blend, Snap-8", slug: "Skin" },
  { name: "Cognitive & Sleep", emoji: "🧠", examples: "Semax, Selank, DSIP", slug: "Cognitive" },
  { name: "Immune & Thymic", emoji: "🛡️", examples: "Thymosin Alpha 1, KPV, VIP10", slug: "Immune" },
  { name: "Weight Management & Metabolic", emoji: "⚡", examples: "5-Amino-1MQ, Cagrilintide, SLU-PP-332", slug: "Weight Management" },
  { name: "NAD+ & Antioxidants", emoji: "🔋", examples: "NAD+, Glutathione", slug: "NAD+" },
  { name: "Sexual Health", emoji: "💎", examples: "PT-141, KissPeptin", slug: "Sexual Health" },
  { name: "Blends & Stacks", emoji: "🔬", examples: "Wolverine, GLOW, KLOW", slug: "Blends" },
  { name: "Supplies", emoji: "💧", examples: "Reconstitution Water", slug: "Supplies" },
];
