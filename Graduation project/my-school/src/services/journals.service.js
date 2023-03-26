import httpService from "./http.service";

const journalEndpoint = "api/journal/";

const journalService = {
  getAllClassJournals: async () => {
    const { data } = await httpService.get(journalEndpoint + "journal_class");
    return data;
  },

  getSubjectJournalById: async (uuid_subject) => {
    const { data } = await httpService.get(
      journalEndpoint + "journal_subject/" + uuid_subject
    );
    return data;
  },

  // getHomeworksByLesson: async (uuid_lesson, classTitle, classId) => {
  //   const { data } = await httpService.get(
  //     journalEndpoint + "homeworkByLesson/" + uuid_lesson,
  //     {
  //       params: {
  //         classTitle: classTitle || "",
  //         classId: classId || "",
  //       },
  //     }
  //   );
  //   return data;
  // },

  getHomeworksByDate: async (date, journalsId) => {
    const { data } = await httpService.get(
      journalEndpoint + "homeworksByDate/",
      {
        params: {
          date,
          journalsId,
        },
      }
    );
    return data;
  },

  getHomeworkById: async (uuid_hw) => {
    const { data } = await httpService.get(
      journalEndpoint + "homeworkByid/" + uuid_hw
    );
    return data;
  },

  putNewHomework: async (obj) => {
    const { data } = await httpService.put(journalEndpoint + "homework", {
      classId: obj.classId,
      journalId: obj.journalId,
      topicId: obj.topicId,
      date: obj.date,
      task: obj.task,
    });
    return data;
  },

  postEditHomework: async (obj) => {
    const { data } = await httpService.post(
      journalEndpoint + "homework/" + obj.id,
      {
        classId: obj.classId,
        journalId: obj.journalId,
        topicId: obj.topicId,
        date: obj.date,
        task: obj.task,
      }
    );
    return data;
  },

  deleteHomework: async (homeworkId) => {
    const { data } = await httpService.delete(
      journalEndpoint + "homework/" + homeworkId
    );
    return data;
  },
};

export default journalService;
