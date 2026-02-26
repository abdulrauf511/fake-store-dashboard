import { api } from "./api";

export async function fetchProducts() {
  const res = await api.get("/products");
  console.log("Fake Store Products API: ", res);
  return res.data;
}

export async function fetchCategories() {
  const res = await api.get("/products/categories");
  console.log("Fake Store Categories API: ", res);
  return res.data;
}

export async function fetchProductById(id) {
  const res = await api.get(`/products/${id}`);
  return res.data;
}
