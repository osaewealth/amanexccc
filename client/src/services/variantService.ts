// services/variantService.ts
import api from "./api";

export const VariantService = {
  getAll() {
    return api.get("/variants/");
  },

  getOne(id: string) {
    return api.get(`/variants/${id}/`);
  },

  create(data: { name: string }) {
    return api.post("/variants/create/", data);
  },

  update(id: string, data: FormData) {
    return api.put(`/variants/${id}/update/`, data);
  },

  delete(id: string) {
    return api.delete(`/variants/${id}/delete/`);
  }
};
