import axios, { AxiosInstance } from "axios";

const API_BASE_URL: string = "https://chartsdemo-api.codewalnut.com";

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export default apiClient;
