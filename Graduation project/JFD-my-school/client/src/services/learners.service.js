import httpService from "./http.service";

const learnersEndpoint = "api/learner/";

const learnersService = {
  get: async () => {
    const { data } = await httpService.get(learnersEndpoint);
    return data;
  },
  getById: async (lern_uuid) => {
    const { data } = await httpService.get(learnersEndpoint + lern_uuid);
    return data;
  },
  postAdditionalData: async ({
    hobby,
    add_education,
    achievements,
    learnerId,
  }) => {
    const { data } = await httpService.post(learnersEndpoint + learnerId, {
      hobby,
      add_education,
      achievements,
    });
    return data;
  },
};

export default learnersService;
