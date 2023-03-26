import express from "express";
import Class from "../models/Class.js";
import Homework from "../models/Homework.js";
import Teacher from "../models/Teacher.js";
import JournalClass from "../models/JournalClass.js";
import JournalSubject from "../models/JournalSubject.js";
import LessonData from "../models/LessonData.js";
import auth from "../middleware/auth.middleware.js";
import Learner from "../models/Learner.js";

const router = express.Router({ mergeParams: true });

router.get("/journal_class/", auth, async (req, res) => {
    // console.log(Profession);
    // ***
    try {
        const list = await JournalClass.find();
        res.status(200).send(list);
        // res.status(200).json({ list });
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
        });
    }
});

router.get("/journal_class/:journalId", auth, async (req, res) => {
    // console.log(Profession);
    // ***
    try {
        const { journalId } = req.params;
        const list = await JournalClass.findById(journalId);
        res.status(200).send(list);
        // res.status(200).json({ list });
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
        });
    }
});

router.get("/journal_subject/:journalId", auth, async (req, res) => {
    // console.log(Profession);
    // ***
    try {
        const { journalId } = req.params;
        const list = await JournalSubject.findById(journalId);

        const curClass = (await Class.findById(list.uuid_class))?.title;
        const lessonTopic = await Promise.all(
            list.topics.map(async (topic) => {
                try {
                    const lessonTitle = await LessonData.findById(topic.uuid_lesson);

                    return {
                        lesson_title: lessonTitle,
                        uuid_homeworks: topic.uuid_homeworks,
                        uuid_progress: topic.uuid_progress,
                    };
                } catch (error) {
                    return error;
                }
            })
        );

        res.status(200).send({
            _id: list._id,
            subject: list.subject,
            class: curClass,
            uuid_class: list.uuid_class,
            topics: lessonTopic,
        });
        // res.status(200).json({ list });
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
        });
    }
});

router.get("/homeworkByLesson/:lessonId", auth, async (req, res) => {
    // console.log(Profession);
    // ***
    try {
        const { lessonId } = req.params;
        const { classId, classTitle } = req.body;

        let curClassId;
        if (classId || classTitle) {
            curClassId = classId
                ? classId
                : classTitle
                ? (await Class.findOne({ title: classTitle }))?._id
                : res.status(422).json({ message: "Класс для выгрузки не определен! Проверьте: (body: { classId or classTitle })" });
        }

        // const lesson = await LessonData.findById(lessonId);
        const journal_subject = await JournalSubject.findOne({ uuid_class: curClassId });

        if (journal_subject) {
            const homeworks = journal_subject.topics.find((lessons) => lessons.uuid_lesson.toString() === lessonId)?.uuid_homeworks;
            res.status(200).send({ homeworks });
        }
        // res.status(200).json({ list });
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
            error: e.message,
        });
    }
});

router.get("/homeworksByDate", auth, async (req, res) => {
    // console.log(Profession);
    // ***
    try {
        const { date, journalsId } = req.query;

        const userData = req.user.email ? await Learner.findOne({ email: req.user.email }) : await Learner.findById(req.user._id);
        if (!userData) {
            res.status(401).json({ message: "Пользователь не авторизован" });
            return;
        }

        const ArrJournalsId = journalsId.replaceAll(/\[|\]|"|'/g, "").split(",");
        const stDate = new Date(date).setUTCHours(0, 0, 0, 0);
        const endDate = new Date(date).setUTCHours(23, 59, 59, 999);

        let dateHomeworks = [];
        if (ArrJournalsId?.length) {
            for await (const hw of Homework.find({ date: { $gt: stDate, $lt: endDate } }).cursor()) {
                if (ArrJournalsId?.includes(hw.journal_id.toString())) {
                    const classJournal = await JournalClass.findOne({ uuid_class: hw.class_id });
                    const lessonName = await LessonData.findById(hw.uuid_lesson);
                    // console.log(hw);
                    dateHomeworks.push({
                        subject: classJournal.progress_journal.find(
                            (row) => row.uuid_subject_journal.toString() === hw.journal_id.toString()
                        )?.subject,
                        subjectId: hw.journal_id,
                        lastLesson: lessonName.lesson,
                        homeTasks: hw.task,
                    });
                }
            }

            // console.log(ArrJournalsId, dateHomeworks);

            /*
                {
                subject: "Математика",
                lastLesson: "Сложение и вычитание натуральных чисел",
                homeTasks: "Учебник стр.50(пересказ), упр.782-789",
                },
            */
            // console.log("end:", dateHomeworks);
        }
        res.status(200).send(dateHomeworks);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
            error: e.message,
        });
    }
});

router.get("/homeworkById/:homeworkId", auth, async (req, res) => {
    // console.log(Profession);
    // ***
    try {
        const { homeworkId } = req.params;

        const homework = await Homework.findById(homeworkId);

        res.status(200).send(homework);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
            error: e.message,
        });
    }
});

router.put("/homework/", auth, async (req, res) => {
    // console.log(Profession);
    // ***
    try {
        const { classId, journalId, topicId, date, task } = req.body;

        const userData = req.user.email ? await Teacher.findOne({ email: req.user.email }) : await Teacher.findById(req.user._id);

        const isMentor = userData.uuid_mentor?.toString() === classId;

        if (userData && (userData.uuid_class.map((el) => el.toString()).includes(classId) || isMentor)) {
            // Проверка содержимого
            if (classId && journalId && topicId && date && task) {
                const newHomework = new Homework({
                    class_id: classId,
                    journal_id: journalId,
                    uuid_lesson: topicId,
                    date: new Date(date),
                    task: task,
                });
                // await newHomework.save();

                const journal_subject = await JournalSubject.findById(journalId);

                if (journal_subject) {
                    const isTopics = journal_subject.topics.find((lesson) => lesson.uuid_lesson == topicId);
                    if (!isTopics) {
                        res.status(422).json({ message: "Не корректный 'topicId'" });
                        return;
                    }

                    // перенес для проверки topicId и journalId
                    await newHomework.save();

                    const newTopics = journal_subject.topics.map((lesson, ind) => {
                        // console.log(lesson, topicId);
                        if (lesson.uuid_lesson == topicId) {
                            // необходимо приведение обоих частей

                            lesson.uuid_homeworks.push(newHomework._id);
                            journal_subject.topics[ind].markModified("uuid_homeworks");
                            return lesson;
                        } else {
                            return lesson;
                        }
                    });

                    // console.log(newTopics);

                    journal_subject.topics = newTopics;
                    journal_subject.markModified("topics");
                    await journal_subject.save();

                    res.send(newHomework);
                } else {
                    res.status(422).json({ message: "Не корректный 'journalId'" });
                }
            } else {
                res.status(422).json({ message: "Не корректные данные в теле запроса" });
            }
        } else {
            res.status(401).json({ message: "Неавторизован или неявляетесь учителем по данному предмету" });
        }
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
        });
    }
});

router.post("/homework/:homeworkId", auth, async (req, res) => {
    // console.log(Profession);
    // ***
    try {
        const { homeworkId } = req.params;
        const { classId, journalId, topicId, date, task } = req.body;

        // Check Teacher ID
        const userData = req.user.email ? await Teacher.findOne({ email: req.user.email }) : await Teacher.findById(req.user._id);
        // console.log(req);

        // console.log(removedHomeWork.class_id, userData.uuid_class);
        const isMentor = userData.uuid_mentor?.toString() === classId;

        if (userData && (userData.uuid_class.includes(classId) || isMentor)) {
            // Проверка содержимого

            if (classId && journalId && topicId && date && task) {
                const editHomework = await Homework.findByIdAndUpdate(
                    homeworkId,
                    {
                        class_id: classId,
                        journal_id: journalId,
                        uuid_lesson: topicId,
                        date: new Date(date),
                        task: task,
                    },
                    {
                        new: true,
                        upsert: true,
                    }
                )
                    .then((result) => res.status(200).json(result))
                    .catch((err) => res.status(400).json({ message: "Ошибка изменения объекта 'homework'", error: err.message }));
            } else {
                res.status(422).json({ message: "Ошибка компонетов объекта 'homework'", error: err.message });
            }
        } else {
            res.status(401).json({ message: "Неавторизован или неявляетесь учителем по данному предмету" });
        }
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
            error: e.message,
        });
    }
});

router.delete("/homework/:homeworkId", auth, async (req, res) => {
    // ***
    try {
        const { homeworkId } = req.params;
        const removedHomeWork = await Homework.findById(homeworkId);

        console.log(req);

        // Check Teacher ID
        const userData = req.user.email ? await Teacher.findOne({ email: req.user.email }) : await Teacher.findById(req.user._id);

        // console.log(removedHomeWork.class_id, userData.uuid_class);

        const isMentor = userData.uuid_mentor?.toString() === removedHomeWork.class_id.toString();

        if (userData && removedHomeWork && (userData.uuid_class.includes(removedHomeWork.class_id) || isMentor)) {
            // console.log(removedHomeWork);
            const updJournal = await JournalSubject.findById(removedHomeWork.journal_id);
            const newTopics = updJournal.topics.map((topic) => {
                if (topic.uuid_homeworks.includes(homeworkId)) {
                    return {
                        ...topic,
                        uuid_homeworks: topic.uuid_homeworks.filter((hw_id) => hw_id != homeworkId),
                    };
                } else {
                    return topic;
                }
            });

            // const newJournal

            // console.log(newTopics);
            // Удаляем ссылку в журнале по предмету.
            // const doc = await JournalSubject.updateOne(
            //     { _id: removedHomeWork.journal_id },
            //     {
            //         $set: { topics: newTopics },
            //     }
            // );

            updJournal.topics = newTopics;
            updJournal.markModified("topics");

            await updJournal
                .save()
                // Удаляем сущьность Homework
                .then(async () => await removedHomeWork.remove())
                .then(() => res.status(200).send("Delete done !"))
                .catch((err) =>
                    res.status(400).json({ message: "Ошибка удаления объекта 'homework': " + "homeworkId", error: err.message })
                );
        } else {
            res.status(401).json({ message: "Неавторизован или неявляетесь учителем по данному предмету" });
        }
    } catch (e) {
        res.status(500).json({
            message: " На сервере произошла ошибка. Попробуйте позже",
            error: e.message,
        });
    }
});

export default router;
