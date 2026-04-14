const WC_BASE = "https://clarumpeptides.com/wp-json/wc/v3";
const WC_CK = "ck_609f33e322a5b5105c7dd3544c12219c4b907a4b";
const WC_CS = "cs_dcdbda79718ccf0223743aaed503676d61f7edd1";

function authUrl(path: string, params: Record<string, string> = {}): string {
  const url = new URL(`${WC_BASE}${path}`);
  url.searchParams.set("consumer_key", WC_CK);
  url.searchParams.set("consumer_secret", WC_CS);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  return url.toString();
}

// ── Raw WC types ──

export interface WcCategory {
  id: number;
  name: string;
  slug: string;
}

export interface WcAttribute {
  id: number;
  name: string;
  slug: string;
  options?: string[];   // on product
  option?: string;      // on variation
}

export interface WcImage {
  id: number;
  src: string;
  alt: string;
}

export interface WcRawProduct {
  id: number;
  name: string;
  slug: string;
  type: "simple" | "variable";
  price: string;
  regular_price: string;
  description: string;
  short_description: string;
  categories: WcCategory[];
  attributes: WcAttribute[];
  images: WcImage[];
  featured: boolean;
  variations: number[];
}

export interface WcRawVariation {
  id: number;
  price: string;
  regular_price: string;
  attributes: WcAttribute[];
  name: string;
}

// ── Normalised types the UI consumes ──

export interface WcVariation {
  id: number;
  price: number;
  size: string;          // e.g. "10mg", "5mg/5mg"
}

export interface WcProduct {
  id: number;
  name: string;
  slug: string;
  type: "simple" | "variable";
  price: number;
  description: string;
  shortDescription: string;
  category: string;       // display name, decoded
  categorySlug: string;
  image?: string;
  featured: boolean;
  variations: WcVariation[];
}

function decodeHtml(s: string): string {
  const txt = document.createElement("textarea");
  txt.innerHTML = s;
  return txt.value;
}

function stripHtml(s: string): string {
  const d = document.createElement("div");
  d.innerHTML = s;
  return d.textContent || "";
}

function mapProduct(raw: WcRawProduct, rawVars: WcRawVariation[] = []): WcProduct {
  const variations: WcVariation[] = rawVars.map((v) => ({
    id: v.id,
    price: parseFloat(v.price) || 0,
    size: v.attributes.map((a) => a.option).join("/") || v.name,
  }));

  return {
    id: raw.id,
    name: decodeHtml(raw.name),
    slug: raw.slug,
    type: raw.type,
    price: parseFloat(raw.price) || 0,
    description: stripHtml(raw.description),
    shortDescription: stripHtml(raw.short_description),
    category: decodeHtml(raw.categories[0]?.name || "Uncategorized"),
    categorySlug: raw.categories[0]?.slug || "uncategorized",
    image: raw.images[0]?.src,
    featured: raw.featured,
    variations,
  };
}

// ── Fetch helpers ──

async function wcFetch<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const res = await fetch(authUrl(path, params));
  if (!res.ok) throw new Error(`WooCommerce API error: ${res.status}`);
  return res.json();
}

export async function fetchAllProducts(): Promise<WcProduct[]> {
  const raw = await wcFetch<WcRawProduct[]>("/products", { per_page: "100" });

  // Fetch variations for variable products in parallel
  const variableProducts = raw.filter((p) => p.type === "variable" && p.variations.length > 0);
  const variationMap = new Map<number, WcRawVariation[]>();

  if (variableProducts.length > 0) {
    const results = await Promise.all(
      variableProducts.map((p) =>
        wcFetch<WcRawVariation[]>(`/products/${p.id}/variations`, { per_page: "100" })
          .then((vars) => ({ id: p.id, vars }))
      )
    );
    for (const { id, vars } of results) variationMap.set(id, vars);
  }

  return raw.map((p) => mapProduct(p, variationMap.get(p.id) || []));
}

export async function fetchProductBySlug(slug: string): Promise<WcProduct | null> {
  const raw = await wcFetch<WcRawProduct[]>("/products", { slug, per_page: "1" });
  if (raw.length === 0) return null;
  const product = raw[0];

  let vars: WcRawVariation[] = [];
  if (product.type === "variable" && product.variations.length > 0) {
    vars = await wcFetch<WcRawVariation[]>(`/products/${product.id}/variations`, { per_page: "100" });
  }

  return mapProduct(product, vars);
}

export async function fetchCategories(): Promise<{ name: string; slug: string }[]> {
  const raw = await wcFetch<WcCategory[]>("/products/categories", { per_page: "50" });
  return raw
    .filter((c) => c.slug !== "uncategorized" && c.count > 0)
    .map((c) => ({ name: decodeHtml(c.name), slug: c.slug }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
