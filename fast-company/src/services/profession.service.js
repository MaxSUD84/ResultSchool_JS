import httpService from "./http.service";

const propfessionEndpoint = "profession/";

const propfessionService = {
    get: async () => {
        const { data } = await httpService.get(propfessionEndpoint);
        return data;
    }
};

export default propfessionService;
