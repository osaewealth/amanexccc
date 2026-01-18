// services/jobService.ts
import api from "./api";
import adminApi from "./adminApi";

export const JobService = {
  getAll() {
    return api.get("/jobs/");
  },

  getOne(id: string) {
    return api.get(`/jobs/${id}/`);
  },

  create(data: any) {
    return adminApi.post("/jobs/create/", data);
  },

  update(id: string, data: any) {
    return adminApi.put(`/jobs/${id}/update/`, data);
  },

  toggle(id: string) {
    return adminApi.patch(`/jobs/${id}/toggle/`);
  },

  delete(id: string) {
    return api.delete(`/jobs/${id}/delete/`);
  }
};
