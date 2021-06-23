import http from "../http-common";

const findPlayers = (name, order) => {
    return http.get(`/player?name=${name}&order=${order}`);
}


const create = data => {
    return http.post("/", data);
}

const findByTeam = team => {
    return http.post(`/teams?title=${team}`);
}
//eslint-disable-next-line
export default {
    findPlayers,
    create,
    findByTeam
};
