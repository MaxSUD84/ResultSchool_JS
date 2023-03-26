import httpService from "./http.service";

const classesEndpoint = "api/class/";

const classesService = {
  getClassById: async (class_uuid) => {
    const { data } = await httpService.get(classesEndpoint + class_uuid);
    return data;
  },
  getFullClassById: async (class_uuid) => {
    const { data } = await httpService.get(
      classesEndpoint + "fulldata/" + class_uuid
    );
    return data;
  },
  get: async () => {
    const { data } = await httpService.get(classesEndpoint);
    return data;
  },
};

export default classesService;
