import axios from "axios";

const create = payload => axios.post("/quizzes", payload);
const index = () => axios.get("/quizzes");
const update = ({ id, payload }) => {
  return axios.put(`/quizzes/${id}`, payload);
};

const show = id => axios.get(`/quizzes/${id}`);

const destroy = id => axios.delete(`/quizzes/${id}`);

const setSlug = id => axios.get(`/quizzes/setSlug/${id}`);

const showSlug = slug => axios.get(`/quizzes/showSlug/${slug}`);

const showSlugHeader = slug => axios.get(`/quizzes/showSlugHeader/${slug}`);
const quizzesApi = {
  create,
  index,
  update,
  destroy,
  show,
  setSlug,
  showSlug,
  showSlugHeader,
};
export default quizzesApi;
