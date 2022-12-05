import httpService from "./http.service";

const teachersEndpoint = "teachers/";

const teachersService = {
  get: async () => {
    const { data } = await httpService.get(teachersEndpoint);
    return data;
  }
};

export default teachersService;
