import LessonData from "../models/LessonData.js";
import ProgrammData from "../models/ProgrammData.js";
import JournalSubject from "../models/JournalSubject.js";
import JournalClass from "../models/JournalClass.js";
import Class from "../models/Class.js";
import { cfgMS } from "./configMySchool.js";
import chalk from "chalk";

export async function createLessonData() {
    const lessonData = await LessonData.find();
    if (lessonData.length === 0) {
        await LessonData.collection.drop();
        const learningProgramm = await ProgrammData.find();

        if (learningProgramm) {
            learningProgramm.forEach(async (subject) => {
                await Promise.all(
                    subject.lp_data.map(async (_lesson) => {
                        try {
                            const lesData = new LessonData({
                                hours: _lesson.hours,
                                labs: _lesson.labs,
                                tests: _lesson.tests,
                                lesson: _lesson.lesson,
                                uuid_subject: subject._id,
                            });
                            await lesData.save();
                            return lesData;
                        } catch (error) {
                            return error;
                        }
                    })
                ).then(() => {
                    console.log(chalk.blueBright(`Lessons for subject: ${subject.description} created successfull.`));
                });
            });
        }
    } else {
        console.log(chalk.greenBright(`Lessons for subjects exists.`));
    }
}

export async function createJournalsSubject() {
    const journalsSubject = await JournalSubject.find();
    if (journalsSubject.length === 0) {
        await JournalSubject.collection.drop();
        // await JournalClass.collection.drop();
        const classes = await Class.find();
        const lessondata = await LessonData.find();

        if (classes && lessondata) {
            // console.log(lessondata.length);
            classes.forEach(async (cls) => {
                await Promise.all(
                    cls.study_subjects.map(async (subject) => {
                        try {
                            const subRef = subject.uuid;
                            const subName = subject.name;
                            const clsRef = cls._id;
                            const filtLesson = await LessonData.find({ uuid_subject: subject.uuid });
                            if (filtLesson) {
                                const topicsArr = [];
                                filtLesson.forEach((lesson) => {
                                    topicsArr.push({
                                        uuid_lesson: lesson._id,
                                        uuid_homeworks: undefined,
                                        uuid_progress: undefined,
                                    });
                                });
                                // console.log(topicsArr);
                                const newSubjectJournal = JournalSubject({
                                    uuid: subRef,
                                    subject: subName,
                                    uuid_class: clsRef,
                                    topics: topicsArr,
                                });

                                await newSubjectJournal.save();
                                return newSubjectJournal;
                            }
                        } catch (error) {
                            return error;
                        }
                    })
                ).then(() => console.log(chalk.blueBright(`Journals for subjects: ${cls.description} created successfull.`)));
            });
        }
    } else {
        console.log(chalk.greenBright(`Journals subjects exists.`));
    }
}

export async function createJournalsClass() {
    const journalClass = await JournalClass.find();
    if (journalClass.length === 0) {
        await JournalClass.collection.drop();
        const classes = await Class.find();

        if (classes) {
            Promise.all(
                classes.map(async (cls) => {
                    try {
                        const clsRef = cls._id;
                        const clsName = cls.title;

                        const filtJournals = await JournalSubject.find({ uuid_class: cls._id });
                        if (filtJournals) {
                            const subjectJournalsArr = [];
                            filtJournals.forEach((sub) => {
                                subjectJournalsArr.push({
                                    subject: sub.subject,
                                    uuid_subject_journal: sub._id,
                                });
                            });
                            // console.log(topicsArr);
                            const newClassJournal = JournalClass({
                                uuid_class: clsRef,
                                name_class: clsName,
                                progress_journal: subjectJournalsArr,
                            });

                            await newClassJournal.save();
                            return newClassJournal;
                        }
                    } catch (error) {
                        return error;
                    }
                })
            ).then(() => console.log(chalk.blueBright(`Journals for classes created successfull.`)));
        }
    } else {
        console.log(chalk.greenBright(`Journals for classes exists.`));
    }
}
