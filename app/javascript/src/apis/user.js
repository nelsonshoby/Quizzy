import axios from "axios";

const create = payload => axios.post("/users", payload);
const report_export = () => axios.get("/export");
const report_export_status = job_id => axios.get(`/export_status/${job_id}`);
const report_export_download = job_id =>
  axios.get(`/export_download/${job_id}`);
const usersApi = {
  create,
  report_export,
  report_export_status,
  report_export_download,
};
export default usersApi;
