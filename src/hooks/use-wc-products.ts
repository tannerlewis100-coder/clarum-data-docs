import { useQuery } from "@tanstack/react-query";
import { fetchAllProducts, fetchProductBySlug, fetchCategories, type WcProduct } from "@/lib/woocommerce";

export function useWcProducts() {
  return useQuery<WcProduct[]>({
    queryKey: ["wc-products"],
    queryFn: fetchAllProducts,
    staleTime: 5 * 60 * 1000,   // cache 5 min
    gcTime: 10 * 60 * 1000,
  });
}

export function useWcProductBySlug(slug: string | undefined) {
  return useQuery<WcProduct | null>({
    queryKey: ["wc-product", slug],
    queryFn: () => (slug ? fetchProductBySlug(slug) : Promise.resolve(null)),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

export function useWcCategories() {
  return useQuery({
    queryKey: ["wc-categories"],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });
}

export function useWcFeaturedProducts() {
  const { data: all, ...rest } = useWcProducts();
  // Take first 8 products as "featured" (only 1 is actually flagged featured in WC)
  const data = all?.slice(0, 8);
  return { data, ...rest };
}
