import http from "../http-common";

const getAll = () => {
  return http.get("/testimonies");
};

const get = id => {
  return http.get(`/testimonies/${id}`);
};

const create = data => {
  return http.post("/testimonies", data);
};

const update = (id, data) => {
  return http.put(`/testimonies/${id}`, data);
};

const remove = id => {
  return http.delete(`/testimonies/${id}`);
};

const removeAll = () => {
  return http.delete(`/testimonies`);
};

const findByTitle = searchTitle => {
  return http.get(`/testimonies/${searchTitle}`);
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