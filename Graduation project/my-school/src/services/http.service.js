/* eslint-disable no-unused-vars */
import axios from "axios";
import { func } from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import configFile from "../config.json";

const httpClient = axios.create({
  baseURL: configFile.apiEndpoint,
  timeout: 100,
  headers: { "Content-Type": "application/json" }
});

httpClient.interceptors.request.use(
  function (config) {
    if (configFile.isFireBase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
      // console.log(config.url);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

function transformData(data) {
  return data ? Object.keys(data).map((key) => ({ ...data[key] })) : [];
}

httpClient.interceptors.response.use(
  (res) => {
    // перехватчик контента ОТВЕТА (для FireBase)
    if (configFile.isFireBase) {
      res.data = { content: transformData(res.data) };
      // console.log(res.data);
    }
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
