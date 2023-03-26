// import Class from "../models/Class.js";
import Address from "../models/Address.js";
import Mother from "../models/Mother.js";
import Father from "../models/Father.js";
import Teacher from "../models/Teacher.js";
import Learner from "../models/Learner.js";
import ProgrammData from "../models/ProgrammData.js";
import chalk from "chalk";

import { addAddress, addAddressForLearners } from "./addAddres.js";
import { createClass } from "./createClass.js";
import { createJournalsSubject, createLessonData, createJournalsClass } from "./createJournal.js";

import * as _teachers from "../mock/teachers.json" assert { type: "json" };
import * as _learners from "../mock/learners.json" assert { type: "json" };
import * as _classes from "../mock/classes.json" assert { type: "json" };
import * as _address from "../mock/address.json" assert { type: "json" };
import * as _fathers from "../mock/fathers.json" assert { type: "json" };
import * as _mothers from "../mock/mothers.json" assert { type: "json" };
import * as _learningProg from "../mock/learningProgramm.json" assert { type: "json" };

// const classMock = _class.default;
const addressMock = _address.default;
const fathersMock = _fathers.default;
const mothersMock = _mothers.default;
const teachersMock = _teachers.default;
const learnersMock = _learners.default;
const learningProgrammMock = _learningProg.default;

export default async () => {
    await createInitData(); // создаем начальные сущности
    await addAddress(); // привязываем адресса к родителям
    await addAddressForLearners(); // привязываем адресса к ученикам
    await createClass(); // заполняем классы и распределяем учителей
    await createLessonData(); // создаем темы для уроков
    await createJournalsSubject(); // создаем журналы по предметам с сылками на оценки и домашние задания по темам
    await createJournalsClass(); // создаем журналы для классов с сылкима на журналы с предметами
};

async function createInitData() {
    const address = await Address.find();
    if (address.length === 0) {
        await createInitialEntity(Address, addressMock);
    }

    const mothers = await Mother.find();
    if (mothers.length === 0) {
        await createInitialEntity(Mother, mothersMock);
    }

    const fathers = await Father.find();
    if (fathers.length === 0) {
        await createInitialEntity(Father, fathersMock);
    }

    const teachers = await Teacher.find();
    if (teachers.length === 0) {
        await createInitialEntity(Teacher, teachersMock);
    }

    const learners = await Learner.find();
    if (learners.length === 0) {
        await createInitialEntity(Learner, learnersMock);
    }

    const learningProgramm = await ProgrammData.find();
    if (learningProgramm.length === 0) {
        await createInitialEntity(ProgrammData, learningProgrammMock);
    }

    console.log(chalk.greenBright("initDatabese passed."));
}

async function createInitialEntity(Model, data) {
    await Model.collection.drop();
    return Promise.all(
        data.map(async (item) => {
            try {
                // delete item._id;
                const newItem = new Model(item);
                await newItem.save();
                return newItem;
            } catch (error) {
                return error;
            }
        })
    );
}
