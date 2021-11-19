import axios from "axios";

const index = () => axios.get("/attempts");
const create = payload => axios.post("/attempts", payload);
const update = (payload, id) => axios.put(`/attempts/${id}`, payload);
const show = id => axios.get(`/attempts/${id}`);
const attemptApi = {
  create,
  update,
  show,
  index,
};
export default attemptApi;
