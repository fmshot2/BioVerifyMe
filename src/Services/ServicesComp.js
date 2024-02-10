import http from "../http-common";

const getAll = () => {
  return http.get("/services");
};

const get = id => {
  return http.get(`/services/${id}`);
};

const create = data => {
  return http.post("/services", data);
};

const update = (id, data) => {
  return http.put(`/services/${id}`, data);
};

const remove = id => {
  return http.delete(`/services/${id}`);
};

const removeAll = () => {
  return http.delete(`/service`);
};

const findByTitle = searchTitle => {
  return http.get(`/service/${searchTitle}`);
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