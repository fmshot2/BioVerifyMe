import http from "../http-common";



const getAll = () => {
  return http.get("/statistics");
};

const get = id => {
  return http.get(`/statistics/${id}`);
};

const create = data => {
  return http.post("/statistics", data);
};

const update = (id, data) => {
  return http.put(`/statistics/${id}`, data);
};

const remove = id => {
  return http.delete(`/statistics/${id}`);
};

const removeAll = () => {
  return http.delete(`/statistics`);
};

const findByTitle = searchTitle => {
  return http.get(`/statistics/${searchTitle}`);
};


const StatisticsDataService= {
  getAll,
   get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};


 export default StatisticsDataService;