import { useQuery } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchProductById,
  fetchCategories,
  fetchProductsByCategoryList,
} from "../api/products";

export function useProducts(params) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => fetchProducts(params),
    placeholderData: (prev) => prev,
    staleTime: 60_000,
  });
}

export function useProduct(id) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
    staleTime: 60_000,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 5 * 60_000,
  });
}

export function useProductsByCategory(slug, limit) {
  return useQuery({
    queryKey: ["productsByCategory", slug, limit],
    queryFn: () => fetchProductsByCategoryList(slug, limit),
    enabled: !!slug,
    staleTime: 60_000,
  });
}
