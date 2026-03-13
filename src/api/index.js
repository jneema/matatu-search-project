import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("NETWORK ERROR DETAIL:", {
      message: error.message,
      code: error.code,
      url: error.config?.url,
      response: error.response?.data,
    });
    return Promise.reject(error);
  },
);

export default api;
