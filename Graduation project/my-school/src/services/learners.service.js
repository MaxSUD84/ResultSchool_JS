import httpService from "./http.service";

const learnersEndpoint = "learners/";
const fatherEndpoint = "fathers/";
const motherEndpoint = "mothers/";
const addressEndpoint = "address/";

const learnersService = {
  get: async () => {
    const { data } = await httpService.get(learnersEndpoint);
    return data;
  },
  getById: async (UUID) => {
    const { data } = await httpService.get(`${learnersEndpoint}?uuid=${UUID}`);
    return data;
  },
  getFatherById: async (fatherUUID) => {
    const { data } = await httpService.get(
      `${fatherEndpoint}?uuid=${fatherUUID}`
    );
    return data;
  },
  getMotherById: async (motherUUID) => {
    const { data } = await httpService.get(
      `${motherEndpoint}?uuid=${motherUUID}`
    );
    return data;
  },
  getAddressById: async (UUID) => {
    const { data } = await httpService.get(`${addressEndpoint}?uuid=${UUID}`);
    return data;
  }
};

export default learnersService;
