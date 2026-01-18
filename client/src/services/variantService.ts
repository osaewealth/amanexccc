// services/variantService.ts
import api from "./api";
import adminApi from "./adminApi";

export const VariantService = {
  getAll() {
    return api.get("/variants/");
  },

  getOne(id: string) {
    return api.get(`/variants/${id}/`);
  },

  create(data: { name: string }) {
    return adminApi.post("/variants/create/", data);
  },

  update(id: string, data: FormData) {
    return adminApi.put(`/variants/${id}/update/`, data);
  },

  delete(id: string) {
    return api.delete(`/variants/${id}/delete/`);
  }
};
