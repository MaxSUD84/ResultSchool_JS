import httpService from "./http.service";

const todosEndpoint = "todos/";
const todosService = {
  fetch: async () => {
    const { data } = await httpService.get(todosEndpoint, {
      params: {
        _page: 13,
        _limit: 15,
      },
    });
    return data;
  },
  create: async (newID) => {
    const { data } = await httpService.post(todosEndpoint, {
      userId: 10,
      title: "New task by " + new Date().toTimeString(),
      completed: false,
    });
    return { ...data, id: newID };
  },
};

export default todosService;
