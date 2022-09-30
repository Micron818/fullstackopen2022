import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => axios.get(baseUrl).then((response) => response.data);

const create = (person) =>
  axios.post(baseUrl, person).then((response) => response.data);

const update = (id, person) =>
  axios.put(`${baseUrl}/${id}`, person).then((response) => response.data);

const drop = (id) => axios.delete(`${baseUrl}/${id}`);

const personService = { getAll, create, update, drop };

export default personService;
