import axios from "axios";

const create = payload => axios.post("/quizzes", payload);
const index = () => axios.get("/quizzes");
const update = ({ id, payload }) => {
  return axios.put(`/quizzes/${id}`, payload);
};

const destroy = id => axios.delete(`/quizzes/${id}`);
const quizzesApi = {
  create,
  index,
  update,
  destroy,
};
export default quizzesApi;
