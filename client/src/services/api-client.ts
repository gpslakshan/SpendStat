import axios from "axios";

let AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

AxiosInstance.interceptors.request.use(function (config) {
  let token = localStorage.getItem("token");
  config.headers["Authorization"] = "Bearer " + token;
  return config;
});

export default AxiosInstance;
