import http from "../http-common";

const getAll = () => {
  return http.get("/sliders");
};

const get = id => {
  return http.get(`/sliders/${id}`);
};

const create = data => {
  return http.post("/sliders", data);
};

const update = (id, data) => {
  return http.put(`/sliders/${id}`, data);
};

const remove = id => {
  return http.delete(`/sliders/${id}`);
};

const removeAll = () => {
  return http.delete(`/sliders`);
};

const findByTitle = searchTitle => {
  return http.get(`/sliders/${searchTitle}`);
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