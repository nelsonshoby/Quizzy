import axios from "axios";

const create = payload => axios.post("/questions", payload);
const destroy = id => axios.delete(`/questions/${id}`);
const show = id => axios.get(`/questions/${id}`);
const update = (payload, id) => axios.put(`/questions/${id}`, payload);
const questionApi = {
  create,
  destroy,
  show,
  update,
};

export default questionApi;
