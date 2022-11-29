/* eslint-disable no-undef */
// generate.js
// json-server index.jscd

const { indexOf } = require("lodash");

module.exports = function () {
  var casual = require("casual").ru_RU;
  var _ = require("lodash");
  var ad = () => require("./add_lib");

  const className = ad.className; //["5К", "5А", "6Б"];
  const subjects = [
    "Математика",
    "Русский язык",
    "Литература",
    "Англиский язык",
    "Физика",
    "Биология"
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
        (() => ad.translit(`${last_name}.${first_name}`)) +
        _.sample(["_", ".", ""]) +
        casual.integer((from = 1950), (to = 5000)) +
        "@" +
        _.sample(casual.free_email_domains),
      password: casual.password,
      address: address.uuid,
      messages: []
    };
  });

  casual.define("addressFamaly", function () {
    return {
      uuid: casual.uuid,
      addr: casual.populate(
        "{{city_prefix}} Москва, {{street_prefix}} {{street}}, {{building_number}}"
      )
    };
  }); //

  casual.define("learner", function (famaly_name, address, father, mother) {
    sex = _.sample(["w", "m"]);
    return {
      uuid: casual.uuid,
      sex: sex,
      first_name:
        sex === "w"
          ? casual.populate("{{first_name_female}}")
          : casual.populate("{{first_name_male}}"),
      last_name: famaly_name + (sex === "w" ? "а" : ""),
      phone: casual.phone,
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
      parents: {
        father: father.uuid,
        mother: mother.uuid
      },
      achievements: [],
      events: [],
      messages: []
    };
  });

  // *** инициализация БД объектов ***

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
    learner: []
  };

  for (let i = 0; i < 50; i++) {
    calcLearner(def);
  }

  const result = {};
  result.classes = className.map((cls) => casual.class(cls));
  result.teachers = _.times(18, () => casual.teacher(_.sample(subjects)));
  result.fathers = def.father;
  result.mothers = def.mother;
  result.address = def.address;
  result.learners = def.learner;

  result.messages = [];
  result.events = [];

  return result;
};
