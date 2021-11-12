import axios from "axios";

const create = payload => axios.post("/questions", payload);
const destroy = id => axios.delete(`/questions/${id}`);
const questionApi = {
  create,
  destroy,
};

export default questionApi;
