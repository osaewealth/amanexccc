import api from "./api";

export const CategoryService = {
  getAll() {
    return api.get("/categories/");
  },

  getOne(id: string) {
    return api.get(`/categories/${id}/`);
  },

  create(data: FormData) {
    return api.post("/categories/create/", data);
  },

  update(id: string, data: FormData) {
    return api.put(`/categories/${id}/update/`, data);
  },

  delete(id: string) {
    return api.delete(`/categories/${id}/delete/`);
  }
};
