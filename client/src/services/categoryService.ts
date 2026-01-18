import api from "./api";
import adminApi from "./adminApi";

export const CategoryService = {
  getAll() {
    return api.get("/categories/");
  },

  getOne(id: string) {
    return api.get(`/categories/${id}/`);
  },

  create(data: FormData) {
    return adminApi.post("/categories/create/", data);
  },

  update(id: string, data: FormData) {
    return adminApi.put(`/categories/${id}/update/`, data);
  },

  delete(id: string) {
    return api.delete(`/categories/${id}/delete/`);
  }
};
