import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Replace with your backend API base URL
});
export default axiosInstance;