import axios, { AxiosInstance } from "axios";

const API_BASE_URL: string = "http://localhost:8080";

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export default apiClient;
