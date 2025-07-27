import axios from "axios";

const loginApi = async (username, password) => {
  return await axios.post(" http://localhost:8080/api/auth/login", {
    username,
    password,
  });
};

const registerApi = async (email, password) => {
  return await axios.post("http://localhost:8080/api/auth/register", {
    email,
    password,
  });
};

export { loginApi, registerApi };
