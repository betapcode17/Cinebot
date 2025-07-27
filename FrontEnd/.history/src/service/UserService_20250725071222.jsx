import axios from "axios";

const loginApi = async (username, password) => {
  return await axios.post("api/login", { username, password });
};
export { loginApi };
