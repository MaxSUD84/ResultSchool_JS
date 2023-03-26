/* eslint-disable indent */
/* eslint-disable no-undef */
// generate.js
// json-server index.jscd

// const translit = (word = "") => {
//   var converter = {
//     а: "a",
//     б: "b",
//     в: "v",
//     г: "g",
//     д: "d",
//     е: "e",
//     ё: "e",
//     ж: "zh",
//     з: "z",
//     и: "i",
//     й: "y",
//     к: "k",
//     л: "l",
//     м: "m",
//     н: "n",
//     о: "o",
//     п: "p",
//     р: "r",
//     с: "s",
//     т: "t",
//     у: "u",
//     ф: "f",
//     х: "h",
//     ц: "c",
//     ч: "ch",
//     ш: "sh",
//     щ: "sch",
//     ь: "",
//     ы: "y",
//     ъ: "",
//     э: "e",
//     ю: "yu",
//     я: "ya"
//   };

//   word = word.toLowerCase();

//   var answer = "";
//   for (var i = 0; i < word.length; ++i) {
//     if (converter[word[i]] == undefined) {
//       answer += word[i];
//     } else {
//       answer += converter[word[i]];
//     }
//   }

//   answer = answer.replace(/[^-0-9a-z]/g, "-");
//   answer = answer.replace(/[-]+/g, ".");
//   answer = answer.replace(/^\-|-$/g, "");
//   return answer;
// };

// var {indexOf}

module.exports = function () {
  var casual = require("casual").ru_RU;
  var lp = require("./learning_programm");
  var sd = require("./dataSchool");
  var al = require("./add_lib");
  var _ = require("lodash");

  // Геннерируем преподавательский опыт
  casual.define("experience_education", function (subject) {
    const index = _.indexOf(sd.subjects, subject);
    return `Окончил: ${_.sample(
      sd.universities
    )}. Опыт работы: ${_.sample(sd.specialty_education[index])}.`;
  });

  // Создаем уникальные uuid по каждую программу обучения
  casual.define("learning_programm", function (clsNum) {
    const learning_programm = Object.keys(sd.prg_subjects).map((sub) => ({
      classNum: clsNum,
      uuid: casual.uuid,
      description: sd.prg_subjects[sub],
      lp_data: lp.learning_programm[sub][clsNum],
    }));

    // доавляем уникальные идентификаторы к каждой теме
    return learning_programm.map((sub) => ({
      ...sub,
      lp_data: sub.lp_data.map((el) => ({ ...el, uuid: casual.uuid })),
    }));

    // return learning_programm;
  });

  // копируем программу обучения по каждый класс
  // копируем перечень предметов для каждого класса
  casual.define("study_program", function () {
    return sd.subjects;
  });

  // value: { date: date, mark: value, type: "homework", uuid_work: "", description: "comment"}
  // Генерируем структуру для храниения оценок по всем предметам
  // casual.define("all_subjects_progress", function (learning_programm) {
  //   return learning_programm.map((sub) => ({
  //     name: sub.description,
  //     average: 0,
  //     [sub.uuid]: casual.subject_progress(sub.lp_data),
  //   }));
  // });

  casual.define("topicProgress", function (les_uuid) {
    return {
      lesson: "",
      uuid_lesson: les_uuid,
      uuid_progress: casual.uuid,
      progress: {
        avg: 0,
        values: [],
      },
    };
  });

  // Генерируем структуру для назначения домашних заданий.
  casual.define("homework", function (les_uuid) {
    return {
      lesson: les_uuid,
      uuid_homework: casual.uuid,
      date: "",
      task: "",
    };
  });

  // генерируем разделы журнала по каждому предмету
  casual.define("journalClass", function (className, uuid_class) {
    return {
      uuid_class: uuid_class,
      name_class: className,
      progress_journal: [{ subject: "", uuid_subject_journal: "" }],
    };
  });

  // генерируем сам журнал для каждого класса
  casual.define("journalSubject", function (classNum, uuid_subject) {
    console.log(classNum, uuid_subject);
    return {
      uuid: "", // subject - learning programm
      subject: "", // subject - name
      topics: [
        {
          uuid_lesson: "",
          uuid_homeworks: [""],
          uuid_progress: [""],
        },
      ],
    };
  });

  // генирируем классы с программой обучения
  casual.define("class", function (str) {
    return {
      title: str,
      uuid: casual.uuid,
      description: "Класс " + str,
      study_subjects: casual.study_program,
      group_mentor: "",
    };
  });

  // генерируем учетелей
  casual.define("teacher", function (subject) {
    const isFemale = _.sample(["w", "m"])?.toLowerCase().startsWith("w");
    const last_name = casual.last_name + (isFemale ? "а" : "");
    const first_name = casual.populate(
      isFemale ? "{{first_name_female}}" : "{{first_name_male}}"
    );
    const middle_name = casual.populate(
      isFemale ? "{{middle_name_female}}" : "{{middle_name_male}}"
    );

    return {
      full_name: [last_name, first_name, middle_name].join(" "),
      uuid: casual.uuid,
      experience_education: casual.experience_education(subject),
      subject: subject, // _.sample(subject),
      email:
        al.translit(`${last_name}.${first_name}`) +
        _.sample(["_", ".", ""]) +
        casual.integer((from = 1950), (to = 5000)) +
        "@" +
        _.sample(casual.free_email_domains),
      password: casual.password,
      uuid_class: [], // прикрепленные классы uuid
      isMentor: false,
      uuid_mentor: "",
      education_rating: 0,
      learner_rating: 0,
      advices: [], // uuid
      messages: [], // uuid
    };
  });

  // генерируем родителей
  casual.define("parent", function (sex, famaly_name, address) {
    const isFemale = sex?.toLowerCase().startsWith("w");
    const last_name = famaly_name + (isFemale ? "а" : "");
    const first_name = casual.populate(
      isFemale ? "{{first_name_female}}" : "{{first_name_male}}"
    );

    return {
      uuid: casual.uuid,
      full_name: `${last_name} ${first_name}`,
      phone: casual.phone,
      login:
        al.translit(`${last_name}.${first_name}`) +
        _.sample(["_", ".", ""]) +
        casual.integer((from = 1950), (to = 5000)) +
        "@" +
        _.sample(casual.free_email_domains),
      password: casual.password,
      address: address.uuid,
      messages: [],
    };
  });

  // генерируем адресса проживания
  casual.define("addressFamaly", function () {
    return {
      uuid: casual.uuid,
      addr: casual.populate(
        "{{city_prefix}} Москва, {{street_prefix}} {{street}}, {{building_number}}"
      ),
    };
  }); //

  // генерируем учащихся
  casual.define("learner", function (famaly_name, address, father, mother) {
    sex = _.sample(["w", "m"]);
    const last_name = famaly_name + (sex === "w" ? "а" : "");
    const first_name =
      sex === "w"
        ? casual.populate("{{first_name_female}}")
        : casual.populate("{{first_name_male}}");
    return {
      uuid: casual.uuid,
      sex: sex,
      first_name: first_name,
      last_name: last_name,
      phone: casual.phone,
      email:
        al.translit(`${last_name}.${first_name}`) +
        _.sample(["_", ".", ""]) +
        casual.integer((from = 1950), (to = 5000)) +
        "@" +
        _.sample(casual.free_email_domains),
      password: casual.password,
      address: address.uuid,
      hobby: [], // obj: { id: uuid, content: string }
      add_education: [], // obj: { id: uuid, content: string }
      achievements: [], // obj: { id: uuid, content: string }
      study_subjects: casual.study_program,
      academic_progress_sum: 0,
      teacher_raiting: 0,
      birthday: {
        day: casual.integer((from = 1), (to = 28)),
        month: casual.month_number,
        year: casual.integer((from = 2010), (to = 2013)),
      },
      parents: {
        father: father.uuid,
        mother: mother.uuid,
      },
      advices: [], // uuid
      messages: [], // uuid
    };
  });

  // генерируем советы
  casual.define("advice", function (teacher_uuid, topic_uuid, message) {
    return {
      uuid: casual.uuid,
      from: teacher_uuid, // teacher_uuid
      topic: topic_uuid, // topic_uuid
      message: message,
      timestamp: new Date(2023, 1, 25, 13, 31, 0),
    };
  });

  // *** инициализация БД объектов ***

  // инициализация учащихся
  const calcLearner = (obj) => {
    famaly_name = casual.populate("{{last_name_male}}");
    cur_address = casual.addressFamaly;
    mother = casual.parent("w", famaly_name, cur_address);
    father = casual.parent("m", famaly_name, cur_address);
    obj.address.push(cur_address);
    obj.father.push(father);
    obj.mother.push(mother);
    obj.learner.push(casual.learner(famaly_name, cur_address, father, mother));
  };

  let def = {
    address: [],
    father: [],
    mother: [],
    learner: [],
  };

  for (let i = 0; i < 100; i++) {
    calcLearner(def);
  }

  // Инициализируем программы обучения под каждый номер класса
  const classNumbersArr = _.sortedUniq(
    sd.className.map((clsName) => clsName.slice(0, clsName.length > 2 ? 2 : 1))
  );
  const learning_programm = [];
  classNumbersArr.forEach((clsNum) => {
    const classPrg = casual.learning_programm(clsNum);
    if (Array.isArray(classPrg)) {
      classPrg.forEach((el) => learning_programm.push(el));
    }
  });

  // Назначаем классых руководителей
  const setMentor = ({ classes, teachers, learners }) => {
    const tempArr = new Array();
    var teacher_uuid = teachers.map((teacher) => teacher.uuid);
    var learners_uuid = learners.map((learner) => learner.uuid);

    for (const cls of classes) {
      // Выбираем учителей предметников
      const class_teachers = cls.study_subjects.map((subject) =>
        _.sample(teachers.filter((teacher) => teacher.subject === subject))
      );
      // Выбираем классных руководителей
      const selected_teacher = _.sample(teacher_uuid);
      // исключаем выбранного
      teacher_uuid = teacher_uuid.filter(
        (teacher) => teacher !== selected_teacher
      );
      // создаем список учеников в каждый класс
      let learners_list = [];
      for (let i = 0; learners_uuid.length && i < 25; i++) {
        const selected_learner = _.sample(learners_uuid);
        learners_list.push(selected_learner);
        learners_uuid = learners_uuid.filter(
          (learner) => learner !== selected_learner
        );
      }

      tempArr.push({
        class_teachers: class_teachers,
        class_uuid: cls.uuid,
        mentor: selected_teacher,
        class_learner_list: learners_list,
      });
    }

    // Функция для извлечения класса по uuid ученика
    const get_tArrEl = (uuid) =>
      _.find(tempArr, function (o) {
        return o.class_learner_list.includes(uuid);
      });

    return {
      classes: classes.map((cls) => {
        // Ищим класного руководителя
        const mentorId = tempArr.filter(
          (tempData) => tempData.class_uuid === cls.uuid
        )[0].mentor;

        return {
          ...cls,
          // добавляем классного руководителя
          group_mentor: mentorId,
          // добавляем список учащихся в классе
          learners_list: tempArr.filter(
            (tempData) => tempData.class_uuid === cls.uuid
          )[0].class_learner_list,
          // назначаем учителей предметников
          study_subjects: cls.study_subjects.map((subject) => ({
            uuid: learning_programm.filter((subj_prg) => {
              const clsNum = cls.title.slice(0, cls.length > 2 ? 2 : 1);
              return (
                subj_prg.classNum === clsNum && subject === subj_prg.description
              );
            })[0].uuid,
            subject: subject,
            teacher_uuid: tempArr
              .filter((tempData) => tempData.class_uuid === cls.uuid)[0]
              .class_teachers.filter(
                (_teacher) => _teacher.subject === subject
              )[0].uuid,
          })),
        };
      }),

      teachers: teachers.map((teach) => {
        const class_mentor =
          tempArr.filter((tempData) => tempData.mentor === teach.uuid)[0]
            ?.class_uuid || "";
        const isMentor = !!tempArr.filter(
          (tempData) => tempData.mentor === teach.uuid
        )[0];
        const uuid_class = [];
        tempArr.forEach((tArr) => {
          if (
            tArr.class_teachers.reduce(
              (acc, el) => acc || el.uuid === teach.uuid,
              false
            )
          )
            uuid_class.push(tArr.class_uuid);
        });
        return {
          ...teach,
          // определем классных руководителей и привязываем классы
          isMentor: isMentor,
          uuid_mentor: class_mentor,
          // назначаем классы для предметной работы
          uuid_class: [...teach.uuid_class, ...uuid_class],
        };
      }),

      learners: learners.map((learner) => ({
        ...learner,
        uuid_class: get_tArrEl(learner.uuid)?.class_uuid,
        // tempArr.map((el) => ({ lists: el.class_learner_list })),
        // tempArr.filter((tData) =>
        //   tData.class_learner_list.includes(learner.uuid)
        // )["class_uuid"], // )[0].class_uuid
        uuid_progress: "",
      })),
    };
  };

  // Инициализируем по одному совету от преподавателя
  // casual.advice(teacher_uuid, topic_uuid, message)

  // Инициализируем одно домашнее задание по предмету
  // casual.homework(les_uuid)

  // Инициализируем одну оценку по предмету
  // casual.topicProgress(les_uuid)

  const result = {};
  result.classes = sd.className.map((cls) => casual.class(cls));
  result.teachers = _.times(18, () => casual.teacher(_.sample(sd.subjects)));

  result.fathers = def.father;
  result.mothers = def.mother;
  result.address = def.address;
  result.learners = def.learner;

  // Присвоение менторов класам, назначение учетей классам, генерация списков классов

  temp = setMentor(result);
  result.classes = temp.classes;
  result.teachers = temp.teachers;
  result.learners = temp.learners;

  result.learning_programm = learning_programm;

  // result.learning_progress = temp.classes.map((cls) => {
  //   const cls_number = cls.title.slice(0, cls.title.length > 2 ? 2 : 1);
  //   return {
  //     uuid_class: cls.uuid,
  //     name_class: cls.title,
  //     progress_journal: cls.learners_list.map((learner_uuid) => ({
  //       [learner_uuid]: casual.all_subjects_progress(
  //         learning_programm.filter(
  //           (programm) => programm.classNum === cls_number
  //         )[0].prog_data
  //       ),
  //     })),
  //   };
  // });

  result.advices = [];

  return result;
};
