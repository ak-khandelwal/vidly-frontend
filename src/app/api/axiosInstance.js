import axios from "axios";
// const BASE_URL = import.meta.env.VITE_BASE_URL_LOCAL_HOST
const BASE_URL =  import.meta.env.VITE_BASE_URL_PRODUCTION

console.log("BASE_URL:", BASE_URL);
console.log("POST request to:", `${BASE_URL}/users/register`);

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const apiMultipartClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

export { apiClient, apiMultipartClient };
