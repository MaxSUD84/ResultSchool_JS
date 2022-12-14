/* eslint-disable no-unused-vars */
import axios from "axios";
import { func } from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import configFile from "../config.json";

const httpClient = axios.create({
  baseURL: configFile.apiEndpoint,
  timeout: 3000,
  headers: { "Content-Type": "application/json" }
});

httpClient.interceptors.request.use(
  function (config) {
    // console.log(config);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// function transformData(data) {
//   return data ? Object.keys(data).map((key) => ({ ...data[key] })) : [];
// }

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
      toast.error("Something was wrong. Try it later!");
    }
    return Promise.reject(error);
  }
);

const httpService = {
  get: httpClient.get,
  post: httpClient.post,
  put: httpClient.put,
  delete: httpClient.delete
};

export default httpService;
