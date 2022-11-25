/* eslint-disable no-undef */
// generate.js
// json-server index.jscd

const { indexOf } = require("lodash");

module.exports = function () {
  var casual = require("casual").ru_RU;
  var _ = require("lodash");

  const className = ["5К", "5А", "6Б"];
  const subjects = [
    "Математика",
    "Русский язык",
    "Литература",
    "Англиский язык",
    "Физика",
    "Химия"
  ];

  const universities = [
    "Российский государственный педагогический университет имени А. И. Герцена",
    "Московский государственный психолого-педагогический университет",
    "Новосибирский государственный педагогический университет",
    "Тульский государственный педагогический университет имени Л.Н.Толстого",
    "Башкирский государственный педагогический университет им. М.Акмуллы",
    "Красноярский государственный педагогический университет им. В.П. Астафьева",
    "Волгоградский государственный социально-педагогический университет",
    "Алтайский государственный гуманитарно-педагогический университет имени В.М. Шукшина",
    "Российский государственный профессионально-педагогический университет",
    "Томский государственный педагогический университет",
    "Южно-Уральский государственный гуманитарно-педагогический университет"
  ];

  const specialty_education = [
    [
      "Психология и социальная педагогика, Преподаватель математики",
      "Психология и социальная педагогика, Математик-программист"
    ],
    [
      "Педагог дополнительного образования, Учитель литературы и русского языка",
      "Учитель русского языка"
    ],
    [
      "Школьный психолог, Учитель литературы",
      "Педагог дополнительного образования, Учитель литературы и русского языка"
    ],
    [
      "Учитель английского языка, Лингвист",
      "Учитель английского языка, Переводчик-синхронист"
    ],
    [
      "Учитель физики, Преподаватель физики, Физик-исследователь",
      "Школьный психолог, Учитель начальных классов, Преподаватель физики"
    ],
    [
      "Учитель химии, Агрохимик, Биохимик",
      "Учитель химии, Гидрохимик, Лаборант химического анализа",
      "Преподаватель химии,  Химик экспертно-криминалистической лаборатории",
      "Социальный педагог, Фундаментальная и прикладная химия"
    ]
  ];

  casual.define("experience_education", function (subject) {
    const index = indexOf(subjects, subject);
    return `Окончил: ${_.sample(
      universities
    )}. Опыт работы: ${_.sample(specialty_education[index])}.`;
  });

  casual.define("class", function (str) {
    return {
      title: str,
      uuid: casual.uuid,
      description: "Класс " + str,
      group_mentor: "",
      study_program: []
    };
  });

  casual.define("teacher", function (subject) {
    return {
      full_name: casual.full_name,
      uuid: casual.uuid,
      experience_education: casual.experience_education(subject),
      subject: subject, // _.sample(subject),
      uuid_class: [], // прикрепленные классы
      isMentor: false,
      uuid_mentor: "",
      events: [],
      achievements: [],
      education_rating: 0,
      learner_rating: 0,
      advices: [],
      messages: []
    };
  });

  casual.define("parent", function (sex, famaly_name, address) {
    const isFemale = sex.toLowerCase().startsWith("w");
    return {
      uuid_parent: casual.uuid,
      full_name: `${famaly_name} ${
        isFemale ? "{{first_name_female}}" : "{{first_name_female}}"
      }`,
      phone: `+7${casual.phone}`,
      login: casual.email,
      password: casual.password,
      address: address.uuid,
      messages: []
    };
  });

  casual.define("address", function () {
    return {
      uuid: casual.uuid,
      addr: casual.address
    };
  });

  casual.define("learner", function (famaly_name, address) {
    return {
      uuid: casual.uuid,
      first_name: casual.first_name,
      last_name: famaly_name,
      phone: `+7${casual.phone}`,
      login: casual.email,
      password: casual.password,
      address: address.uuid,
      hobby: [],
      add_education: [],
      uuid_class: "",
      academic_progress_sum: 0,
      teacher_raiting: 0,
      study_program: "",
      birthday: {
        day: casual.day_of_mounth,
        month: casual.month_number,
        year: casual.integer((from = 2010), (to = 2013))
      },
      achievements: [],
      events: [],
      messages: []
    };
  });

  // *** инициализация БД объектов ***

  // eslint-disable-next-line no-unused-vars
  const calcLearner = () => {
    // obj.address = [];
    // obj.learners = [];
    // obj.fathers = [];
    // obj.mothers = [];
    // const address = new Array();

    return _.times(100, () => {
      famaly_name = casual.last_name;
      cur_address = casual.address;
      // address.push(cur_address);
      // obj.learners.push(casual.learner(famaly_name, cur_address));
      // obj.fathers.push(casual.parent(famaly_name, cur_address));
      // obj.mothers.push(casual.parent(famaly_name, cur_address));
      return {
        address: cur_address,
        father: casual.parent(famaly_name, cur_address)
      };
    });

    // let fh = new Array();
    // data.forEach((learner) => {
    //   fh.push(learner.father);
    // });
    // Array.prototype.push.apply(fathers, fh);

    // address.push(data.address);
    // mothers.push(data.mother);
    // learners.push(data.learner);
  };

  const result = {};
  result.classes = className.map((cls) => casual.class(cls));
  result.teachers = _.times(18, () => casual.teacher(_.sample(subjects)));
  result.fathers = casual.parent("asad", { uuid: "121", addr: "asda" });
  // result.mothers = learnerData.mothers;
  // result.address = calcLearner();
  // result.learners = learnerData.learners;
  // calcLearner(result);

  result.messages = [];
  result.events = [];

  return result;
};
