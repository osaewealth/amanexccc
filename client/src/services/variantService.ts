// services/variantService.ts
import api from "./api";
import adminApi from "./adminApi";

export const VariantService = {
  getAll() {
    return api.get("/variant-types/");
  },

  getOne(id: string) {
    return api.get(`/variant-types/${id}/`);
  },

  create(data: FormData | { name: string }) {
    return adminApi.post("/variant-types/create/", data);
  },

  update(id: string, data: FormData) {
    return api.put(`/variant-types/${id}/update/`, data);
  },

  delete(id: string) {
    return api.delete(`/variant-types/${id}/delete/`);
  }
};

