import axios from "axios";

const create = payload => axios.post("/attempts", payload);
const update = (payload, id) => axios.put(`/attempts/${id}`, payload);
const attemptApi = {
  create,
  update,
};
export default attemptApi;
