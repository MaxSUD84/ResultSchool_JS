import httpService from "./http.service";

const staticEndpoint = "api/static/";

const staticService = {
  getNews: async () => {
    const { data } = await httpService.get(staticEndpoint + "news/data/");
    return data;
  },
  getEvents: async () => {
    const { data } = await httpService.get(staticEndpoint + "events/data/");
    return data;
  },
  // get: async () => {
  //   const { data } = await httpService.get(staticEndpoint);
  //   return data;
  // },
};

export default staticService;
