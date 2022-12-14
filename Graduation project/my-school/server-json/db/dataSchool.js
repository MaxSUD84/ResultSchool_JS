/* eslint-disable no-undef */

const className = ["5К", "5А", "6Б"];
const subjects = [
  "Математика",
  "Русский язык",
  "Литература",
  "Англиский язык",
  "Физика",
  "Биология"
];

const prg_subjects = {
  mathematics: "Математика",
  physics: "Физика",
  biology: "Биология",
  russian_lang: "Русский язык",
  literature: "Литература",
  english_lang: "Англиский язык"
};

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

module.exports = {
  className: className,
  subjects: subjects,
  universities: universities,
  specialty_education: specialty_education,
  prg_subjects: prg_subjects
};
