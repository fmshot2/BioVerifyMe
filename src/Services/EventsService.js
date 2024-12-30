import http from "../http-common";

const getAll = () => {
  return http.get("/events");
};

const get = id => {
  const item = http.get(`/events/${id}`);
  console.log('idd3', item);
  return item;

};

const create = data => {
  return http.post("/events", data);
};

const update = (id, data) => {
  return http.put(`/events/${id}`, data);
};

const remove = id => {
  return http.delete(`/event/${id}`);
};

const removeAll = () => {
  return http.delete(`/event`);
};

const findByTitle = searchTitle => {
  return http.get(`/event/${searchTitle}`);
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