import api from "./axios";

export async function fetchProducts({ limit = 20, skip = 0, q, category, sortBy, order } = {}) {
  if (q) {
    const { data } = await api.get("/products/search", {
      params: { q, limit, skip },
    });
    return data;
  }
  if (category && category !== "all") {
    const { data } = await api.get(`/products/category/${category}`, {
      params: { limit, skip, sortBy, order },
    });
    return data;
  }
  const { data } = await api.get("/products", {
    params: { limit, skip, sortBy, order },
  });
  return data;
}

export async function fetchProductById(id) {
  const { data } = await api.get(`/products/${id}`);
  return data;
}

export async function fetchCategories() {
  const { data } = await api.get("/products/categories");
  return data;
}

export async function fetchProductsByCategoryList(categorySlug, limit = 8) {
  const { data } = await api.get(`/products/category/${categorySlug}`, {
    params: { limit },
  });
  return data;
}
