import api from "./api";
import adminApi from "./adminApi";

export const ProductService = {
  getAll() {
    return api.get("/products/");
  },

  getOne(id: string) {
    return api.get(`/products/${id}/`);
  },

  getCategoryProducts(id: string) {
    return api.get(`/products/${id}/category/`)
  },

  getBestSellers() {
    return api.get(`/products/best-sellers/`)
  },

  create(data: FormData) {
    return adminApi.post("/products/create/", data);
  },

  update(id: string, data: FormData) {
    return adminApi.put(`/products/${id}/update/`, data);
  },

  delete(id: string) {
    return api.delete(`/products/${id}/delete/`);
  },

};
