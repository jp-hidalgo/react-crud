import http from "../http-common";

class TutorialDataService {
  getAll() {
    return http.get("/tutorials");
  }

  get(id) {
    return http.get(`/tutorials/${id}`);
  }

  create(data) {
    return http.post("/tutorials", data);
  }

  findByTeam(team) {
    return http.get(`/teams?title=${team}`);
  }
}

export default new TutorialDataService();
