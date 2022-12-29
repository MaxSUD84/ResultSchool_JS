import axios from "axios";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/0";

const httpService = {
    get: axios.get,
};

export default httpService;
