import http from "../http-common";

const getAll = () => {
  return http.get("/galleries");
};

const get = id => {
  return http.get(`/galleries/${id}`);
};

const create = data => {
  return http.post("/galleries", data);
};

const update = (id, data) => {
  return http.put(`/galleries/${id}`, data);
};

const remove = id => {
  return http.delete(`/galleries/${id}`);
};

const removeAll = () => {
  return http.delete(`/galleries`);
};

const findByTitle = searchTitle => {
  return http.get(`/galleries/${searchTitle}`);
};


export default {
  getAll,
   get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

// export default TutorialService;