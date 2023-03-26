import httpService from "./http.service";

const progressEndpoint = "api/progress/";

const progressService = {
  getAllProgress: async () => {
    const { data } = await httpService.get(progressEndpoint + "all");
    return data;
  },
  getClassProgress: async ({ journalId, lessonId }) => {
    const { data } = await httpService.get(progressEndpoint + "class/", {
      params: {
        journalId: journalId,
        lessonId: lessonId,
      },
    });
    return data;
  },
  getProgressById: async ({ lessonId, journalId, progressId }) => {
    const { data } = await httpService.get(progressEndpoint + progressId, {
      params: {
        journalId,
        lessonId,
      },
    });
    return data;
  },

  getProgressTimePeriod: async ({ startDate, endDate, learnerId }) => {
    const { data } = await httpService.get(
      progressEndpoint + "TimePeriod/" + learnerId,
      {
        params: {
          startDate,
          endDate,
          learnerId,
        },
      }
    );
    return data;
  },

  // Создание сущности "Запись прогресса для обного ученика по одной теме"
  setProgress: async ({ journalId, lessonId, learnerId }) => {
    const { data } = await httpService.put(progressEndpoint + "setProgress/", {
      journalId,
      lessonId,
      learnerId,
    });
    return data;
  },

  // Создание сущностей "Запись прогресса для класса по одной теме"
  setClassProgress: async ({ journalId, lessonId }) => {
    const { data } = await httpService.put(
      progressEndpoint + "setClassProgress/",
      { journalId, lessonId }
    );
    return data;
  },

  addMarkToProgressById: async ({
    progressId,
    journalId,
    date,
    task,
    type,
    mark,
    _id,
  }) => {
    const { data } = await httpService.post(
      progressEndpoint + "addMark/" + progressId,
      {
        journalId,
        date,
        task,
        type,
        mark,
        _id,
      }
    );
    return data;
  },

  deleteMarkFromProgressById: async ({
    progressId,
    journalId,
    deleteMarkId,
  }) => {
    const { data } = await httpService.delete(
      progressEndpoint + "deleteMark/" + progressId,
      {
        data: {
          journalId,
          deleteMarkId,
        },
      }
    );
    return data;
  },
};

export default progressService;
