import axios from "axios";

const getAll = data => {
  return axios.get("https://localhost:44398/api/passenger", data);
};

const get = id => {
  return axios.get(`https://localhost:44398/api/passenger/${id}`);
};

const create = data => {
  return axios.post("https://localhost:44398/api/passenger/add", data);
};

const update = (id, data) => {
  return axios.put(`https://localhost:44398/api/passenger/update/${id}`, data);
};

const remove = id => {
  return axios.delete(`https://localhost:44398/api/passenger/delete/${id}`);
};


const PassengerService = {
  getAll,
  get,
  create,
  update,
  remove
};

export default PassengerService;
