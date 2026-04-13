export interface CoaData {
  purity: string;
  assay: string;
  identity: "Confirmed";
  heavyMetals: "<20ppb";
  tamc: "0 CFU";
  tymc: "0 CFU";
  sku: string;
  date: string;
  form: string;
}

export interface Product {
  id: string;
  name: string;
  coaEmbed?: string;
  price: number;
  category: string;
  dosage: string;
  categoryColor: string;
  coaBatch: string;
  description?: string;
  badge?: string;
  coa: CoaData;
  coaUrl?: string;
  coaImage?: string;
}

/** Slug used for URL routing — groups variants under one base slug */
export function getProductSlug(product: Product): string {
  return product.id.replace(/-\d+mg$|-\d+iu$|-\d+ml$|-01mg$/, "").replace(/-r$|-s$/, "");
}

/** Find all variants sharing the same base slug */
export function getProductVariants(slug: string): Product[] {
  return allProducts.filter((p) => getProductSlug(p) === slug);
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

const D = "Jan 14, 2026";
const C: Pick<CoaData, "identity" | "heavyMetals" | "tamc" | "tymc"> = { identity: "Confirmed", heavyMetals: "<20ppb", tamc: "0 CFU", tymc: "0 CFU" };

function coa(purity: string, assay: string, sku: string, form: string, date = D): CoaData {
  return { purity, assay, ...C, sku, date, form };
}

export const allProducts: Product[] = [
  // ── Recovery & Repair ──
  { id: "bpc-157-5mg", name: "BPC-157", price: 59, category: "Recovery", dosage: "5mg", categoryColor: CAT.Recovery, coaBatch: "2406-BPC5", badge: "BEST SELLER", coa: coa("99.5%", "5.00mg", "YPB.212", "5mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1yd1qbGOUm1hx-Oba_5_opRq6-jLn2dSv", coaImage: "/coa/bpc-157-5mg-1.jpg" },
  { id: "bpc-157-10mg", name: "BPC-157", price: 119, category: "Recovery", dosage: "10mg", categoryColor: CAT.Recovery, coaBatch: "2406-BPC10", badge: "BEST SELLER", coa: coa("99.9%", "10.02mg", "YPB.213", "10mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/12UTrpVLuQ8UMISTPpXRBhZkVRXbJ1HVj", coaImage: "/coa/bpc-157-10mg-1.jpg" },
  { id: "bpc-157-20mg", name: "BPC-157", price: 179, category: "Recovery", dosage: "20mg", categoryColor: CAT.Recovery, coaBatch: "2406-BPC20", badge: "BEST SELLER", coa: coa("99.8%", "20.04mg", "YPB.237", "20mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1vaS1-9c_b2Jh1H5CSUZRsoF7Q74j-Yft", coaImage: "/coa/bpc-157-20mg-1.jpg" },
  { id: "tb-500-5mg", name: "TB-500", price: 89, category: "Recovery", dosage: "5mg", categoryColor: CAT.Recovery, coaBatch: "2406-TB5", coa: coa("99.9%", "5.08mg", "YPB.214", "5mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/17aYRCyuDt3TsUaH9w2oxgNPjjsT2_yzV", coaImage: "/coa/tb-500-5mg-1.jpg" },
  { id: "tb-500-10mg", name: "TB-500", price: 159, category: "Recovery", dosage: "10mg", categoryColor: CAT.Recovery, coaBatch: "2406-TB10", coa: coa("99.8%", "10.28mg", "YPB.215", "10mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1dC4JEl2LB0x21L4X652bgM1XLOgm0vXw", coaImage: "/coa/tb-500-10mg-1.jpg" },
  { id: "wolverine-5mg-r", name: "Wolverine Blend", price: 109, category: "Recovery", dosage: "5mg/5mg", categoryColor: CAT.Recovery, coaBatch: "2406-WLV5", coa: coa("99.7%", "10.06mg", "YPB.216", "BPC-157 (5mg) / TB500 (5mg)"), coaUrl: "https://drive.google.com/drive/folders/1hfyQ4hNDTcSy974vVKxzLtjXtBamqsHU", coaImage: "/coa/wolverine-5mg-r-1.jpg" },
  { id: "wolverine-10mg-r", name: "Wolverine Blend", price: 199, category: "Recovery", dosage: "10mg/10mg", categoryColor: CAT.Recovery, coaBatch: "2406-WLV10", coa: coa("99.6%", "20.12mg", "YPB.217", "BPC-157 (10mg) / TB500 (10mg)"), coaUrl: "https://drive.google.com/drive/folders/1mUATcAAmdMYQzR7tv16dvwnYDNLbAlo3", coaImage: "/coa/wolverine-10mg-r-1.jpg" },
  { id: "ll-37", name: "LL-37", price: 129, category: "Recovery", dosage: "5mg", categoryColor: CAT.Recovery, coaBatch: "2406-LL37", coa: coa("99.5%", "5.02mg", "YPB.244", "5mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/17d8N9cUiIPZpqMwM2RsQg1V_ZyGA6xck", coaImage: "/coa/ll-37-1.jpg" },
  { id: "ara-290", name: "ARA-290", price: 159, category: "Recovery", dosage: "10mg", categoryColor: CAT.Recovery, coaBatch: "2406-ARA", coa: coa("99.8%", "9.97mg", "YPB.277", "10mg Lyophilized Powder") },
  { id: "pnc-27", name: "PNC-27", price: 199, category: "Recovery", dosage: "10mg", categoryColor: CAT.Recovery, coaBatch: "2406-PNC", coa: coa("99.1%", "10.04mg", "YPB.275", "10mg Lyophilized Powder") },

  // ── Growth Hormone & Secretagogues ──
  { id: "sermorelin", name: "Sermorelin", price: 115, category: "Growth Hormone", dosage: "10mg", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-SER", coa: coa("99.2%", "9.91mg", "YPB.211", "10mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1XQeNykEKE6KpHV2RDGH5GBRyanziS4_W", coaImage: "/coa/sermorelin-1.jpg" },
  { id: "cjc-nodac", name: "CJC-1295 Without DAC", price: 99, category: "Growth Hormone", dosage: "10mg", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-CJCND", coa: coa("99.9%", "10.16mg", "YPB.219", "10mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1jUglWPQNA5I1P4czrEkNAuujNMKxdNZb", coaImage: "/coa/cjc-nodac-1.jpg" },
  { id: "cjc-dac", name: "CJC-1295 With DAC", price: 109, category: "Growth Hormone", dosage: "5mg", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-CJCD", coa: coa("99.5%", "5.04mg", "YPB.220", "5mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1jz137QnZeh--fq8syBHLX5Ke0urUYgDF", coaImage: "/coa/cjc-dac-1.jpg" },
  { id: "cjc-ipa-blend", name: "2X Blend CJC/Ipamorelin", price: 105, category: "Growth Hormone", dosage: "5mg/5mg", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-CJIP", coa: coa("99.6%", "10.08mg", "YPB.238", "CJC-1295 Without DAC (5mg) / Ipamorelin (5mg)"), coaUrl: "https://drive.google.com/drive/folders/175q_zN_FmHt6b3XuSZGe7oG03g3eRrl9", coaImage: "/coa/cjc-ipa-blend-1.jpg" },
  { id: "ipamorelin", name: "Ipamorelin", price: 129, category: "Growth Hormone", dosage: "10mg", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-IPA", coa: coa("99.7%", "10.12mg", "YPB.263", "10mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1dmSoTwRBZscv3zqwxev_Vi6ZciV6t0U_" },
  { id: "tesamorelin-10mg", name: "Tesamorelin", price: 165, category: "Growth Hormone", dosage: "10mg", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-TES10", coa: coa("99.3%", "9.98mg", "YPB.279", "10mg Lyophilized Powder") },
  { id: "tesamorelin-20mg", name: "Tesamorelin", price: 299, category: "Growth Hormone", dosage: "20mg", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-TES20", coa: coa("99.2%", "20.06mg", "YPB.273", "20mg Lyophilized Powder") },
  { id: "ghrp-6-5mg", name: "GHRP-6 Acetate", price: 99, category: "Growth Hormone", dosage: "5mg", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-GH65", coa: coa("99.9%", "4.99mg", "YPB.282", "5mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/14Jp9mA9lOO2vwaRWo3MUw-RiYd4RNH8e", coaImage: "/coa/ghrp-6-5mg-1.jpg" },
  { id: "ghrp-6-10mg", name: "GHRP-6 Acetate", price: 129, category: "Growth Hormone", dosage: "10mg", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-GH610", coa: coa("99.6%", "10.08mg", "YPB.257", "10mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/14Jp9mA9lOO2vwaRWo3MUw-RiYd4RNH8e" },
  { id: "hexarelin", name: "Hexarelin Acetate", price: 139, category: "Growth Hormone", dosage: "5mg", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-HEX", coa: coa("99.4%", "5.06mg", "YPB.261", "5mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/12c8HFS-BCAlz3RVDrDwgFjlVFbMkxTKu", coaImage: "/coa/hexarelin-1.jpg" },
  { id: "hcg", name: "HCG", price: 189, category: "Growth Hormone", dosage: "10000iu", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-HCG", coa: coa("99.3%", "10000iu", "YPB.290", "10000iu Lyophilized Powder") },
  { id: "hmg", name: "HMG", price: 149, category: "Growth Hormone", dosage: "75iu", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-HMG", coa: coa("99.1%", "75iu", "YPB.291", "75iu Lyophilized Powder") },
  { id: "igf-1-lr3-01mg", name: "IGF-1 LR3", price: 89, category: "Growth Hormone", dosage: "0.1mg", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-IGF01", coa: coa("98.9%", "0.10mg", "YPB.292", "0.1mg Lyophilized Powder") },
  { id: "igf-1-lr3-1mg", name: "IGF-1 LR3", price: 189, category: "Growth Hormone", dosage: "1mg", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-IGF1", coa: coa("99.1%", "1.01mg", "YPB.249", "1mg Lyophilized Powder") },
  { id: "igf-des", name: "IGF-DES", price: 99, category: "Growth Hormone", dosage: "0.1mg", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-IGFD", coa: coa("98.7%", "0.10mg", "YPB.293", "0.1mg Lyophilized Powder") },
  { id: "gdf-8", name: "GDF-8", price: 249, category: "Growth Hormone", dosage: "1mg", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-GDF8", coa: coa("99.1%", "1.01mg", "YPB.233", "1mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1zcwNXLSprpD4bdkfq4aWmgYb2XQaB21y", coaImage: "/coa/gdf-8-1.jpg" },
  { id: "ace-031", name: "ACE-031", price: 279, category: "Growth Hormone", dosage: "1mg", categoryColor: CAT["Growth Hormone"], coaBatch: "2406-ACE", coa: coa("98.9%", "1.01mg", "YPB.249", "1mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1b8uaBjUSVqbWIhqBaKdk9xAi4R-IhlLl", coaImage: "/coa/ace-031-1.jpg" },

  // ── Longevity & Anti-Aging ──
  { id: "na-epitalon", name: "N-Acetyl Epitalon Amidate", price: 115, category: "Longevity", dosage: "5mg", categoryColor: CAT.Longevity, coaBatch: "2406-NAEP", coa: coa("99.5%", "5.02mg", "YPB.232", "5mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1gsQaTw_8aJ6IYO1tJO6dKUBvLagE5kQx" },
  { id: "epitalon-10mg", name: "Epitalon", price: 115, category: "Longevity", dosage: "10mg", categoryColor: CAT.Longevity, coaBatch: "2406-EPI10", coa: coa("99.7%", "10.04mg", "YPB.253", "10mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1QVWwNjLCwVdRx_EkTASI56AIyOWRDmSq", coaImage: "/coa/epitalon-10mg-1.jpg" },
  { id: "epitalon-50mg", name: "Epitalon", price: 165, category: "Longevity", dosage: "50mg", categoryColor: CAT.Longevity, coaBatch: "2406-EPI50", coa: coa("99.5%", "50.87mg", "YPB.254", "50mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1N9FKjhYb7--H7dg-XQkAoeIc0qyRCzMo" },
  { id: "mots-c-10mg", name: "MOTS-c", price: 219, category: "Longevity", dosage: "10mg", categoryColor: CAT.Longevity, coaBatch: "2406-MOT10", coa: coa("99.6%", "10.05mg", "YPB.227", "10mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/17tMWs6D6C1_h8ZBndWqB8I5CWbvt8vYC", coaImage: "/coa/mots-c-10mg-1.jpg" },
  { id: "mots-c-40mg", name: "MOTS-c", price: 219, category: "Longevity", dosage: "40mg", categoryColor: CAT.Longevity, coaBatch: "2406-MOT40", coa: coa("99.8%", "39.68mg", "YPB.271", "40mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/17tMWs6D6C1_h8ZBndWqB8I5CWbvt8vYC" },
  { id: "ss-31-10mg", name: "SS-31", price: 139, category: "Longevity", dosage: "10mg", categoryColor: CAT.Longevity, coaBatch: "2406-SS10", coa: coa("99.4%", "10.11mg", "YPB.294", "10mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1QYjXK43cip4YTsHj3J3gNifS9kg4GvfS", coaImage: "/coa/ss-31-10mg-1.jpg" },
  { id: "ss-31-50mg", name: "SS-31", price: 279, category: "Longevity", dosage: "50mg", categoryColor: CAT.Longevity, coaBatch: "2406-SS50", coa: coa("99.2%", "50.44mg", "YPB.295", "50mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1H7d3L5WZsNhcb1tLM9ppGvogoOBCi-7B", coaImage: "/coa/ss-31-50mg-1.jpg" },
  { id: "foxo4", name: "FOXO4", price: 349, category: "Longevity", dosage: "10mg", categoryColor: CAT.Longevity, coaBatch: "2406-FOX4", coa: coa("99.2%", "9.94mg", "YPB.255", "10mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1c-MRQpSIJbowMnU2z2aROU5UccrZehwq", coaImage: "/coa/foxo4-1.jpg" },
  { id: "pinealon", name: "Pinealon", price: 135, category: "Longevity", dosage: "20mg", categoryColor: CAT.Longevity, coaBatch: "2406-PIN", coa: coa("99.2%", "20.06mg", "YPB.273", "20mg Lyophilized Powder") },
  { id: "thymalin", name: "Thymalin", price: 149, category: "Longevity", dosage: "10mg", categoryColor: CAT.Longevity, coaBatch: "2406-THYM", coa: coa("99.2%", "10.08mg", "YPB.280", "10mg Lyophilized Powder") },

  // ── Skin & Radiance ──
  { id: "ghk-cu-50mg", name: "GHK-Cu", price: 95, category: "Skin", dosage: "50mg", categoryColor: CAT.Skin, coaBatch: "2406-GHK50", coa: coa("99.3%", "50.22mg", "YPB.221", "50mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1sSdOORuQnubbJY5sT-hv87MY2WKvZN9J", coaImage: "/coa/ghk-cu-50mg-1.jpg" },
  { id: "ghk-cu-100mg", name: "GHK-Cu", price: 149, category: "Skin", dosage: "100mg", categoryColor: CAT.Skin, coaBatch: "2406-GHK100", coa: coa("99.1%", "100.5mg", "YPB.222", "100mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1rQ4mjGwRmR0aIATaMTrOvXC83MlSTLpf", coaImage: "/coa/ghk-cu-100mg-1.jpg" },
  { id: "glow-blend-s", name: "GLOW Blend — GHK-Cu/BPC-157/TB-500", price: 279, category: "Skin", dosage: "", categoryColor: CAT.Skin, coaBatch: "2406-GLOW", coa: coa("99.4%", "70.08mg", "YPB.218", "GHK-Cu (50mg) / BPC-157 (10mg) / TB500 (10mg)"), coaUrl: "https://drive.google.com/drive/folders/1bgn9BYPOLEmtsIdG2-MBUN4XvkCaROJF", coaImage: "/coa/glow-blend-s-1.jpg" },
  { id: "snap-8", name: "Snap-8", price: 115, category: "Skin", dosage: "10mg", categoryColor: CAT.Skin, coaBatch: "2406-SNAP", coa: coa("99.4%", "10.11mg", "YPB.272", "10mg Lyophilized Powder") },
  { id: "melanotan-ii", name: "Melanotan 2", price: 115, category: "Skin", dosage: "10mg", categoryColor: CAT.Skin, coaBatch: "2406-MEL2", coa: coa("99.3%", "10.08mg", "YPB.270", "10mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1APgBbJggit5MijjjXXcWP9OEh-JgAjBO", coaImage: "/coa/melanotan-ii-1.jpg" },

  // ── Cognitive & Sleep ──
  { id: "semax", name: "Semax", price: 79, category: "Cognitive", dosage: "10mg", categoryColor: CAT.Cognitive, coaBatch: "2406-SEM", coa: coa("99.2%", "10.06mg", "YPB.229", "10mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1pjHSiPz0Q7-eFy4zA2gYVhNG_gHJLsV9", coaImage: "/coa/semax-1.jpg" },
  { id: "selank", name: "Selank", price: 79, category: "Cognitive", dosage: "10mg", categoryColor: CAT.Cognitive, coaBatch: "2406-SEL", coa: coa("99.5%", "10.04mg", "YPB.228", "10mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1el17hsIyDWT7BP9VHHLCPhUvsrMqRWFd", coaImage: "/coa/selank-1.jpg" },
  { id: "dsip-5mg", name: "DSIP", price: 89, category: "Cognitive", dosage: "5mg", categoryColor: CAT.Cognitive, coaBatch: "2406-DSIP5", coa: coa("98.8%", "5.39mg", "YPB.252", "5mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1nqYFphuA6rFa4dj5sKLwd152P4M7Iye9", coaImage: "/coa/dsip-5mg-1.jpg" },
  { id: "dsip-15mg", name: "DSIP", price: 129, category: "Cognitive", dosage: "15mg", categoryColor: CAT.Cognitive, coaBatch: "2406-DSIP15", coa: coa("98.8%", "15.12mg", "YPB.230", "15mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1LYF_ihZzZkydp70od9G2HTaAiubN4KFV", coaImage: "/coa/dsip-15mg-1.jpg" },

  // ── Immune & Thymic ──
  { id: "ta-1", name: "Thymosin Alpha 1", price: 139, category: "Immune", dosage: "10mg", categoryColor: CAT.Immune, coaBatch: "2406-TA1", coa: coa("99.7%", "10.06mg", "YPB.231", "10mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1WnbGc1Z7vIaS9dQT4Mq2fIgy9xVQxML4", coaImage: "/coa/ta-1-1.jpg" },
  { id: "kpv", name: "KPV / Lysine-Proline-Valine", price: 129, category: "Immune", dosage: "10mg", categoryColor: CAT.Immune, coaBatch: "2406-KPV", coa: coa("99.6%", "10.14mg", "YPB.265", "10mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1OY5VSh_dIld7GaRqPx9qbH3I782lJ9y2", coaImage: "/coa/kpv-1.jpg" },
  { id: "vip10", name: "VIP10", price: 199, category: "Immune", dosage: "10mg", categoryColor: CAT.Immune, coaBatch: "2406-VIP", coa: coa("99.4%", "10.06mg", "YPB.281", "10mg Lyophilized Powder") },

  // ── Weight Management & Metabolic ──
  { id: "5a1mq-5mg", name: "5-Amino-1MQ", price: 65, category: "Weight Management", dosage: "5mg", categoryColor: CAT["Weight Management"], coaBatch: "2406-5A5", coa: coa("99.4%", "5.11mg", "YPB.248", "5mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1K0ZHA4nYQLpW-4-WTNB4sIvry9L9KhE1", coaImage: "/coa/5a1mq-5mg-1.jpg" },
  { id: "5a1mq-50mg", name: "5-Amino-1MQ", price: 229, category: "Weight Management", dosage: "50mg", categoryColor: CAT["Weight Management"], coaBatch: "2406-5A50", coa: coa("99.2%", "512.4mg", "YPB.223", "50mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1l6v6-WRE9icMRRhbGm70Prq_je25KfmW", coaImage: "/coa/5a1mq-50mg-1.jpg" },
  { id: "aod-9604", name: "AOD-9604", price: 125, category: "Weight Management", dosage: "5mg", categoryColor: CAT["Weight Management"], coaBatch: "2406-AOD", coa: coa("99.2%", "5.11mg", "YPB.248", "5mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1G09CULFkaZmZMT6Buu0xrfbQlAiE8AK7", coaImage: "/coa/aod-9604-1.jpg" },
  { id: "aicar", name: "AICAR", price: 139, category: "Weight Management", dosage: "50mg", categoryColor: CAT["Weight Management"], coaBatch: "2406-AIC", coa: coa("99.5%", "1062.2mg", "YPB.224", "50mg Lyophilized Powder") },
  { id: "cagrilintide", name: "Cagrilintide", price: 159, category: "Weight Management", dosage: "10mg", categoryColor: CAT["Weight Management"], coaBatch: "2406-CAG", coa: coa("99.9%", "10.69mg", "YPB.241", "10mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1CvFT2tV1S4Frvrky-x1LpKuPkPhorWBB", coaImage: "/coa/cagrilintide-1.jpg" },
  { id: "mazdutide", name: "Mazdutide", price: 299, category: "Weight Management", dosage: "100mg", categoryColor: CAT["Weight Management"], coaBatch: "2406-MAZ", coa: coa("99.6%", "100.42mg", "YPB.269", "100mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1zzvncjabHn-sEa5hs6aQ2wJZtlJOnqf-", coaImage: "/coa/mazdutide-1.jpg" },
  { id: "survodutide", name: "Survodutide", price: 279, category: "Weight Management", dosage: "10mg", categoryColor: CAT["Weight Management"], coaBatch: "2406-SUR", coa: coa("99.5%", "10.12mg", "YPB.278", "10mg Lyophilized Powder") },
  { id: "slu-pp-332", name: "SLU-PP-332", price: 119, category: "Weight Management", dosage: "5mg", categoryColor: CAT["Weight Management"], coaBatch: "2406-SLU", coa: coa("99.1%", "10.19mg", "YPB.266", "5mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1EEyI7WBdUBEPDkcj4cYMwAHQJ2A8E4s3", coaImage: "/coa/slu-pp-332-1.jpg" },
  { id: "glp-3-rz", name: "GLP-3 RZ", price: 249, category: "Weight Management", dosage: "60mg", categoryColor: CAT["Weight Management"], coaBatch: "2406-GLP3", coa: coa("99.3%", "60.11mg", "YPB.296", "60mg Lyophilized Powder") },

  // ── NAD+ & Antioxidants ──
  { id: "nad-500mg", name: "NAD+", price: 229, category: "NAD+", dosage: "500mg", categoryColor: CAT["NAD+"], coaBatch: "2406-NAD500", coa: coa("99.6%", "512.4mg", "YPB.223", "500mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1DeHsZqK6EUZQAjiJIrkr9J4zzRUJo9ry", coaImage: "/coa/nad-500mg-1.jpg" },
  { id: "nad-1000mg", name: "NAD+", price: 329, category: "NAD+", dosage: "1000mg", categoryColor: CAT["NAD+"], coaBatch: "2406-NAD1K", coa: coa("99.5%", "1062.2mg", "YPB.224", "1000mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1017m47lMuxCRX9JCcnG6hz6fzcpY8EbD", coaImage: "/coa/nad-1000mg-1.jpg" },
  { id: "glutathione-600mg", name: "Glutathione", price: 89, category: "NAD+", dosage: "600mg", categoryColor: CAT["NAD+"], coaBatch: "2406-GLU6", coa: coa("98.8%", "604.2mg", "YPB.283", "600mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1zJ-iOa3oXVjjiDidhRfWUfHzIV4oEcFE", coaImage: "/coa/glutathione-600mg-1.jpg" },
  { id: "glutathione-1500mg", name: "Glutathione", price: 165, category: "NAD+", dosage: "1500mg", categoryColor: CAT["NAD+"], coaBatch: "2406-GLU15", coa: coa("98.5%", "1505.83mg", "YPB.259", "1500mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1zJ-iOa3oXVjjiDidhRfWUfHzIV4oEcFE" },

  // ── Sexual Health ──
  { id: "pt-141", name: "PT-141", price: 129, category: "Sexual Health", dosage: "10mg", categoryColor: CAT["Sexual Health"], coaBatch: "2406-PT14", coa: coa("99.4%", "10.06mg", "YPB.274", "10mg Lyophilized Powder") },
  { id: "kisspeptin", name: "KissPeptin", price: 129, category: "Sexual Health", dosage: "10mg", categoryColor: CAT["Sexual Health"], coaBatch: "2406-KISS", coa: coa("99.1%", "10.19mg", "YPB.266", "10mg Lyophilized Powder"), coaUrl: "https://drive.google.com/drive/folders/1jQRFzkUrD4jQfK7cZwD6Z2WbMQpo98b7", coaImage: "/coa/kisspeptin-1.jpg" },

  // ── Blends & Stacks ──
  { id: "wolverine-5mg", name: "Wolverine Blend", price: 109, category: "Blends", dosage: "5mg/5mg", categoryColor: CAT.Blends, coaBatch: "2406-WLV5", coa: coa("99.7%", "10.06mg", "YPB.216", "BPC-157 (5mg) / TB500 (5mg)"), coaUrl: "https://drive.google.com/drive/folders/1hfyQ4hNDTcSy974vVKxzLtjXtBamqsHU", coaImage: "/coa/wolverine-5mg-r-1.jpg" },
  { id: "wolverine-10mg", name: "Wolverine Blend", price: 199, category: "Blends", dosage: "10mg/10mg", categoryColor: CAT.Blends, coaBatch: "2406-WLV10", coa: coa("99.6%", "20.12mg", "YPB.217", "BPC-157 (10mg) / TB500 (10mg)"), coaUrl: "https://drive.google.com/drive/folders/1mUATcAAmdMYQzR7tv16dvwnYDNLbAlo3", coaImage: "/coa/wolverine-10mg-r-1.jpg" },
  { id: "glow-blend", name: "GLOW Blend", price: 279, category: "Blends", dosage: "", categoryColor: CAT.Blends, coaBatch: "2406-GLOW", coa: coa("99.4%", "70.08mg", "YPB.218", "GHK-Cu (50mg) / BPC-157 (10mg) / TB500 (10mg)"), coaUrl: "https://drive.google.com/drive/folders/1bgn9BYPOLEmtsIdG2-MBUN4XvkCaROJF", coaImage: "/coa/glow-blend-s-1.jpg" },
  { id: "klow-blend", name: "KLOW Blend — GHK-Cu/KPV/BPC-157/TB-500", price: 219, category: "Blends", dosage: "", categoryColor: CAT.Blends, coaBatch: "2406-KLOW", coa: coa("99.3%", "80.14mg", "YPB.264", "GHK-Cu (50mg) / KPV (10mg) / BPC-157 (10mg) / TB500 (10mg)"), coaUrl: "https://drive.google.com/drive/folders/16olIYPqxzShIcxtwNUIR1cI9_HQhgJie", coaImage: "/coa/klow-blend-1.jpg" },
  { id: "2x-cjc-ipa", name: "2X Blend CJC/Ipamorelin", price: 105, category: "Blends", dosage: "5mg/5mg", categoryColor: CAT.Blends, coaBatch: "2406-CJIP", coa: coa("99.6%", "10.08mg", "YPB.238", "CJC-1295 Without DAC (5mg) / Ipamorelin (5mg)"), coaUrl: "https://drive.google.com/drive/folders/175q_zN_FmHt6b3XuSZGe7oG03g3eRrl9", coaImage: "/coa/2x-cjc-ipa-1.jpg" },
  { id: "8x-lipo", name: "8X Blend (Lipotropic)", price: 175, category: "Blends", dosage: "", categoryColor: CAT.Blends, coaBatch: "2406-8LIP", coa: coa("99.4%", "196mg", "YPB.267", "L-Carnitine / L-Arginine / Methionine / Inositol / Choline / B6 / B5 / B12"), coaUrl: "https://drive.google.com/drive/folders/1op2f32kZM70UWI10lgg4s7hiPPRx4-mB", coaImage: "/coa/8x-lipo-1.jpg" },
  { id: "4x-mic", name: "4X Blend (MIC)", price: 195, category: "Blends", dosage: "", categoryColor: CAT.Blends, coaBatch: "2406-4MIC", coa: coa("99.5%", "120mg", "YPB.268", "Methionine / Choline Chloride / Carnitine / Dexpanthenol"), coaUrl: "https://drive.google.com/drive/folders/1nXpoSziuWb8O-cw6IuM-DTnTMTeHKstO", coaImage: "/coa/4x-mic-1.jpg" },

  // ── Supplies ──
  { id: "b12", name: "B12", price: 29, category: "Supplies", dosage: "1ml", categoryColor: CAT.Supplies, coaBatch: "2406-B12", coa: coa("99.9%", "1ml", "YPB.298", "1ml Injectable Solution"), coaUrl: "https://drive.google.com/file/d/1zuxpQTO-QBfLmed-E1i0_700Ya8oQCDu/preview", coaEmbed: "https://drive.google.com/file/d/1zuxpQTO-QBfLmed-E1i0_700Ya8oQCDu/preview" },
  { id: "recon-water-3ml", name: "Reconstitution Water", price: 9, category: "Supplies", dosage: "3ml", categoryColor: CAT.Supplies, coaBatch: "2406-RW3", coa: coa("99.9%", "3ml", "YPB.297", "3ml Sterile Water") },
  { id: "recon-water-10ml", name: "Reconstitution Water", price: 15, category: "Supplies", dosage: "10ml", categoryColor: CAT.Supplies, coaBatch: "2406-RW10", coa: coa("99.8%", "10ml", "YPB.251", "10ml") },
  
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
