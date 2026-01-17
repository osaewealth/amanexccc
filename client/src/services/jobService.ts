// services/jobService.ts
import api from "./api";

export const JobService = {
  getAll() {
    return api.get("/jobs/");
  },

  getOne(id: string) {
    return api.get(`/jobs/${id}/`);
  },

  create(data: any) {
    return api.post("/jobs/create/", data);
  },

  update(id: string, data: any) {
    return api.put(`/jobs/${id}/update/`, data);
  },

  toggle(id: string) {
    return api.patch(`/jobs/${id}/toggle/`);
  },

  delete(id: string) {
    return api.delete(`/jobs/${id}/delete/`);
  }
};
