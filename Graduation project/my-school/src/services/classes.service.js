import httpService from "./http.service";

const classesEndpoint = "classes/";

const classesService = {
  get: async () => {
    const { data } = await httpService.get(classesEndpoint);
    return data;
  }
};

export default classesService;
