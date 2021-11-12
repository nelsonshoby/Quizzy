import axios from "axios";

const create = payload => axios.post("/quizzes", payload);
const index = () => axios.get("/quizzes");
const update = ({ id, payload }) => {
  return axios.put(`/quizzes/${id}`, payload);
};

const show = id => axios.get(`/quizzes/${id}`);

const destroy = id => axios.delete(`/quizzes/${id}`);
const quizzesApi = {
  create,
  index,
  update,
  destroy,
  show,
};
export default quizzesApi;
