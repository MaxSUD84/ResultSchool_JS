import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "../config.json";

// import logger from "./log.service";  // включить библеотеку в index.js

// использовать только для обращения к статическому адресу BackEnd Server'а
axios.defaults.baseURL = config.apiEndpoint;

axios.interceptors.response.use(
    (res) => res,
    function (error) {
        const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500;
        if (!expectedErrors) {
            // logger.log(error) // логирование "ошибок сервера" на сервер sentry.io
            // console.log("Unexpected error");
            toast.error("Something was wrong. Try it later!");
            // toast.info("Unexpected error");
        }
        return Promise.reject(error);
    }
);
const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
};

export default httpService;
