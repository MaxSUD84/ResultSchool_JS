import Class from "../models/Class.js";
import Learner from "../models/Learner.js";
import ProgrammData from "../models/ProgrammData.js";
import Teacher from "../models/Teacher.js";

import { cfgMS } from "./configMySchool.js";
import { boysFiles } from "./imagesLinks/BoysFileNames.js";
import { girlsFiles } from "./imagesLinks/GirlsFileNames.js";
import _ from "lodash";
import bcrypt from "bcryptjs";
import chalk from "chalk";

export async function createClass() {
    const classExist = await Class.find({});
    if (classExist.length === 0) {
        const progData = await ProgrammData.find({});
        var teachers = [...(await Teacher.find({}))];
        var learners = [...(await Learner.find({}))];
        var mentors = [...teachers];

        let imageLearner_Boys = boysFiles;
        let imageLearner_Girls = girlsFiles;

        const classArr = cfgMS.className;

        if (teachers && learners && mentors && progData) {
            classArr.map(async (clsName) => {
                const classNumber = clsName.slice(0, clsName.length > 2 ? 2 : 1); // забираем цифру класса

                // выбираем программу обучения - массив предметов
                const programmData = progData.filter((prog) => prog.classNum === classNumber.toString());

                // выбираем учителя по каждому предмету
                const studySubjects = programmData.map((prgSubject) => {
                    const subTeacher = teachers.filter((teach) => teach.subject === prgSubject.description);
                    const choosenTeacher = _.sample(subTeacher)._id;
                    return {
                        uuid: prgSubject._id,
                        name: prgSubject.description,
                        teacher_uuid: choosenTeacher,
                    };
                });

                // выбираем классного руководителя
                const groupMentor = _.sample(mentors)._id;
                mentors = mentors.filter((ment) => ment._id !== groupMentor);

                // набираем класс учеников
                const learnList = [];
                for (let index = 0; index < cfgMS.classSize; index++) {
                    const lear = _.sample(learners)._id;
                    learnList.push(lear);
                    learners = learners.filter((lr) => lr._id !== lear);
                }
                const learnersList = [...learnList];

                const classData = {
                    title: clsName,
                    description: `Класс ${clsName}`,
                    group_mentor: groupMentor,
                    study_subjects: studySubjects,
                    learners_list: learnersList,
                };

                const newClass = new Class(classData);
                await newClass.save().then(async (curClass) => {
                    // console.log(curClass._id);

                    // обновим все сущности которые привязали
                    // обновим всех учителей которым назначили класс
                    await Promise.all(
                        curClass.study_subjects.map(async (sub) => {
                            const subTeacher = await Teacher.findById(sub.teacher_uuid);
                            const newPassword = bcrypt.hash(subTeacher.password, 12);

                            newPassword.then(async (newPassword) => {
                                // subTeacher.image - задам руками, так как нет желания делить их по полу
                                subTeacher.password = newPassword;
                                subTeacher.uuid_class.push(curClass._id);
                                subTeacher.markModified("uuid_class");
                                await subTeacher.save();
                                return subTeacher;
                            });
                        })
                    );

                    // обновим всех учеников которым назначен класс
                    await Promise.all(
                        curClass.learners_list.map(async (learner) => {
                            const _learner = await Learner.findById(learner);
                            const newPassword = bcrypt.hash(_learner.password, 12);

                            newPassword.then(async (newPassword) => {
                                let imageAvatar;
                                if (_learner.sex === "w") {
                                    imageAvatar = "api/static/avatars/girls/" + _.sample(imageLearner_Girls);
                                    imageLearner_Girls = imageLearner_Girls.filter((img) => img !== imageAvatar);
                                } else {
                                    imageAvatar = "api/static/avatars/boys/" + _.sample(imageLearner_Boys);
                                    imageLearner_Boys = imageLearner_Boys.filter((img) => img !== imageAvatar);
                                }

                                _learner.image = imageAvatar;
                                _learner.password = newPassword;
                                _learner.uuid_class = curClass._id;
                                _learner.markModified("uuid_class");
                                await _learner.save();
                            });
                        })
                    );

                    // назначим ментору класс
                    const clsMentor = await Teacher.findById(curClass.group_mentor);
                    if (clsMentor) {
                        clsMentor.uuid_mentor = curClass._id;
                        clsMentor.isMentor = true;
                        clsMentor.markModified("uuid_mentor");
                        await clsMentor.save();
                    }
                });
            });
        }
        console.log(chalk.bgMagenta("createdClass loaded successfull."));
    } else {
        console.log(chalk.greenBright("createdClass passed without loading."));
    }
}
