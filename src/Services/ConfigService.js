import http from "../http-common";


const getAll = () => {
  return http.get("/system_configs");
};

const get = id => {
  return http.get(`/system_configs/${id}`);
};

const create = data => {
  return http.post("/system_configs", data);
};

const update = (id, data) => {
  return http.put(`/system_configs/${id}`, data);
};

const remove = id => {
  return http.delete(`/system_configs/${id}`);
};

const removeAll = () => {
  return http.delete(`/system_configs`);
};

const findByTitle = searchTitle => {
  return http.get(`/system_configs/${searchTitle}`);
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

