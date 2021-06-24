import http from "../http-common";

const getAll=()=>{
    return http.post("/teams");
}
const get=id=>{
    return http.get(`/player/${id}`);
}
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
    getAll,
    get,
    findPlayers,
    create,
    findByTeam
};
