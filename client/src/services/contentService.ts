import api from "./api";

export const ContentService = {
  getMissionVideo() {
    return api.get("/mission-video/");
  },
  updateMissionVideo() {
    return api.post("/mission-video/update");
  },

  getStoryVideo() {
    return api.get("/story-video/");
  },
  
  updateStoryVideo() {
    return api.post("/story-video/update/");
  },

};
