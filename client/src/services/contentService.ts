import api from "./api";
import adminApi from "./adminApi";

export const ContentService = {
  getMissionVideo() {
    return api.get("/mission-video/");
  },
  updateMissionVideo() {
    return adminApi.post("/mission-video/update");
  },

  getStoryVideo() {
    return api.get("/story-video/");
  },

  updateStoryVideo() {
    return adminApi.post("/story-video/update/");
  },

};
