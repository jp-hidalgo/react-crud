import http from "../http-common";

const getAll=()=>{
    return http.post("/team");
}
const get=id=>{
    return http.get(`/player/${id}`);
}
const findPlayers = (name, order) => {
    return http.get(`/players?name=${name}&order=${order}`);
}

const create = data => {
    return http.post("/", data);
}

const findByTeam = team => {
    return http.post(`/team?team=${team}`);
}
//eslint-disable-next-line
export default {
    getAll,
    get,
    findPlayers,
    create,
    findByTeam
};
