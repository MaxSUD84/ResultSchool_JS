import httpService from "./http.service";

const timetableEndpoint = "api/timetable/";

const timetableService = {
  get: async (classId) => {
    const { data } = await httpService.get(timetableEndpoint + classId);
    return data;
  },
};

export default timetableService;
