import httpService from "./http.service";

const teachersEndpoint = "api/teacher/";

const teachersService = {
  get: async () => {
    const { data } = await httpService.get(teachersEndpoint);
    return data;
  },
  getById: async (teach_uuid) => {
    const { data } = await httpService.get(teachersEndpoint + teach_uuid);
    return data;
  },
};

export default teachersService;
