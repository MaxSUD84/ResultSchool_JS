/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import configFile from "../config.json";
import localStorageService from "./localStorage.service";
import authService from "./auth.service";

const httpClient = axios.create({
  baseURL: configFile.apiEndpoint,
  timeout: 3000,
  headers: { "Content-Type": "application/json" },
});

httpClient.interceptors.request.use(
  async function (config) {
    const expiresDate = localStorageService.getTokenExpiresDate();
    const refreshToken = localStorageService.getRefreshToken();
    const isExpired = refreshToken && expiresDate < Date.now();

    if (isExpired) {
      const data = await authService.refresh();
      localStorageService.setTokens(data);
    }
    const accessToken = localStorageService.getAccessToken();
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    // console.log(config);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  (res) => {
    return res;
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
    if (!expectedErrors) {
      console.log(error);
      toast.error("Сервер не доступен! Попробуйте позже.");
    }
    return Promise.reject(error);
  }
);

const httpService = {
  get: httpClient.get,
  post: httpClient.post,
  put: httpClient.put,
  delete: httpClient.delete,
};

export default httpService;
