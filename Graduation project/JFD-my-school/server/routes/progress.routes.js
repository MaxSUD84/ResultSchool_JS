import express from "express";
import Class from "../models/Class.js";
import Learner from "../models/Learner.js";
import JournalClass from "../models/JournalClass.js";
import JournalSubject from "../models/JournalSubject.js";
import Teacher from "../models/Teacher.js";
import Progress from "../models/TopicProgress.js";
import auth from "../middleware/auth.middleware.js";
import _ from "lodash";
import { nanoid } from "nanoid";

const router = express.Router({ mergeParams: true });

router.get("/all/", auth, async (_req, res) => {
    try {
        const list = await Progress.find();
        res.status(200).send(list);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
        });
    }
});

router.get("/class/", auth, async (req, res) => {
    try {
        const { journalId, lessonId } = req.query;

        // Check Teacher ID
        const userData = req.user.email ? await Teacher.findOne({ email: req.user.email }) : await Teacher.findById(req.user._id);
        // console.log(req);

        const journalData = await JournalSubject.findById(journalId);

        if (!journalData) {
            res.status(422).json({ message: `Не корректный journalId: ${journalId}` });
            return;
        }

        const isMentor = userData.uuid_mentor?.toString() === journalData.uuid_class.toString();

        if (userData && (userData.uuid_class.includes(journalData.uuid_class) || isMentor)) {
            // Проверка содержимого
            const progressIdArr = journalData.topics.find((les) => les.uuid_lesson == lessonId);

            const resultArr = await Promise.all(
                progressIdArr.uuid_progress.map(async (obj) => {
                    if (!obj || JSON.stringify(obj) === "{}") return;

                    const pairData = _.toPairs(obj)[0]; // pair learnerId: progressId
                    const learnerId = pairData[0]; //
                    const progressId = pairData[1]; //

                    const learnerData = await Learner.findById(learnerId);

                    if (!learnerData)
                        res.status(422).json({
                            message: `Ученик с id:${learnerId} не найден в списке учеников.`,
                        });

                    const progressLearner = await Progress.findById(progressId);

                    if (!progressLearner)
                        res.status(422).json({
                            message: `Ученику с id:${learnerId} не присвоена графа в журнале.`,
                        });

                    const learnerProgress = {
                        first_name: learnerData.first_name,
                        last_name: learnerData.last_name,
                    };

                    Object.assign(learnerProgress, progressLearner._doc);

                    return learnerProgress;
                })
            );

            res.status(200).json(resultArr);
        } else {
            res.status(401).json({
                message: "Ошибка Авторизации пользователя",
            });
        }

        // res.status(200).send(learnerProgress);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
        });
    }
});

router.get("/:learnerId", auth, async (req, res) => {
    try {
        const { learnerId } = req.params;
        const { journalId, lessonId } = req.query;

        // Check Teacher ID
        const userData = req.user.email ? await Teacher.findOne({ email: req.user.email }) : await Teacher.findById(req.user._id);
        // console.log(req);

        const journalData = await JournalSubject.findById(journalId);

        if (userData && journalData && userData.uuid_class.includes(journalData.uuid_class)) {
            // Проверка содержимого
            const progressIdArr = journalData.topics.find((les) => les.uuid_lesson == lessonId);

            const learnerData = await Learner.findById(learnerId);

            if (!learnerData) {
                res.status(422).json({
                    message: "Ученик не найден в списке учеников.",
                });
                return;
            }

            const progressLearner = progressIdArr.uuid_progress.find((obj) => {
                const pairData = Object.entries(obj)?.[0]; // pair learnerId: progressId
                return pairData[0] == learnerId; //
            });

            // console.log(progressLearner);

            if (!progressLearner) {
                res.status(422).json({
                    message: "Ученику не присвоена графа в журнале.",
                });
                return;
            }

            const progressLearnerId = Object.entries(progressLearner)?.[0][1];

            const learnerProgressData = await Progress.findById(progressLearnerId)
                .then((data) => {
                    const learnerProgress = {
                        _id: learnerData._id,
                        first_name: learnerData.first_name,
                        last_name: learnerData.last_name,
                    };

                    Object.assign(learnerProgress, data._doc);

                    res.status(200).send(learnerProgress);
                })
                .catch((_err) => {
                    res.status(422).json({
                        message: "Результаты обучения по уроку не найдены",
                    });
                });
        } else {
            res.status(401).json({
                message: "Ошибка Авторизации пользователя",
            });
        }
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
            error: e.message,
        });
    }
});

router.get("/TimePeriod/:learner_Id", auth, async (req, res) => {
    try {
        const { learner_Id } = req.params;
        const { learnerId, startDate, endDate } = req.query;

        const learnerData = await Learner.findById(learnerId);
        if (!learnerData) {
            res.status(422).json({
                message: "Ученик не найден в списке учеников.",
            });
            return;
        }

        const classData = await Class.findById(learnerData.uuid_class);
        if (!classData) {
            res.status(422).json({
                message: `Класс с ID:${learnerData.uuid_class} не найден.`,
            });
            return;
        }

        // Check Teacher
        const userData =
            req.user?._id?.toString() === learnerId || req.user?.email === learnerData.email
                ? learnerData
                : req.user?.email
                ? await Teacher.findOne({ email: req.user.email })
                : await Teacher.findById(req.user._id);

        if (
            !userData &&
            (!classData.uuid_mentor.toString() === userData._id.toString() ||
                !classData.study_subjects.find((sub) => sub.teacher_uuid.toString() === userData._id.toString()))
        ) {
            res.status(401).json({
                message: `Пользователь не авторизован или не имеет доступа к данным.`,
            });
            return;
        }

        const classJournalData = await JournalClass.findOne({ uuid_class: learnerData.uuid_class });
        if (!classJournalData) {
            res.status(422).json({
                message: `Классный журнал не найден.`,
            });
            return;
        }

        const journalData = [
            ...classJournalData.progress_journal.map((journal) => ({
                subjectName: journal.subject,
                journalId: journal.uuid_subject_journal,
                progress: [],
                avg: 0.0,
            })),
        ];
        const stDate = new Date(startDate).setUTCHours(0, 0, 0, 0);
        const enDate = new Date(endDate).setUTCHours(23, 59, 59, 999);

        let twoWeekProgress = await Promise.all(
            journalData.map(async (jSubject) => {
                var sProgress = [];
                var sAvg = 0.0;

                for await (const topicProgress of Progress.find({ journalId: jSubject.journalId, learnerId: learnerId }).cursor()) {
                    if (topicProgress?.progress?.values?.length) {
                        sProgress = topicProgress.progress.values.map((markData) => {
                            const dataMark = Date.parse(markData.date);
                            if (dataMark >= stDate && dataMark <= enDate) {
                                return markData;
                            }
                            return;
                        });
                        sProgress = sProgress.filter((el) => el);
                        sAvg = sProgress.reduce((acc, el, _, arr) => (acc += +el?.mark / arr.length), 0.0);
                    }
                }

                return {
                    ...jSubject,
                    progress: [...sProgress] || [],
                    avg: sAvg || 0,
                };
            })
        );
        res.status(200).send(twoWeekProgress);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
            error: e.message,
        });
    }
});

router.put("/setProgress/", auth, async (req, res) => {
    try {
        const { journalId, lessonId, learnerId } = req.body;

        const userData = req.user.email ? await Teacher.findOne({ email: req.user.email }) : await Teacher.findById(req.user._id);

        const journal_subject = await JournalSubject.findById(journalId);

        const isMentor = userData.uuid_mentor?.toString() === journal_subject.classId.toString();

        if (userData && journal_subject && (userData.uuid_class.includes(journal_subject.uuid_class) || isMentor)) {
            // Проверка содержимого
            if (lessonId && learnerId) {
                const editingLesson = journal_subject.topics.find((lesson) => lesson.uuid_lesson == lessonId);

                if (!editingLesson) {
                    res.status(422).json({ message: `Не корректный lessonId: ${lessonId}` });
                    return;
                }

                const progressId = { _id: "" };

                const isProgressExist = editingLesson.uuid_progress.find((obj) => _.has(obj, learnerId));

                if (!editingLesson.uuid_progress.length || !isProgressExist) {
                    // Генерируем новую строку успеваемости
                    const progress = new Progress({
                        journalId: journalId,
                        learnerId: learnerId,
                        lesson: "",
                        uuid_lesson: lessonId,
                        progress: {
                            avg: 0,
                            values: [],
                        },
                    });

                    // Сохраним ссылку на "новую строку успеваемости"

                    await progress.save().then((doc) => (progressId._id = doc._id));

                    editingLesson.uuid_progress.push({ [learnerId]: progressId._id });

                    // Обновим данные в журнале
                    const newTopics = journal_subject.topics.map((topic) => (topic.uuid_lesson == lessonId ? editingLesson : topic));

                    journal_subject.topics = newTopics;
                    journal_subject.markModified("topics");
                    await journal_subject.save().then((doc) => res.send(doc._doc));
                } else {
                    // Заменим новым значением
                    // function replaceVal(obj) {
                    //     // console.log(k, v);
                    //     if (typeof obj === "object" && JSON.stringify(obj) !== "{}") {
                    //         const pairArr = Object.entries(obj)[0];
                    //         const resObj = { [pairArr[0]]: pairArr[0] == learnerId ? progressId._id : pairArr[1] };
                    //         return resObj;
                    //     }
                    //     return;
                    // }
                    // editingLesson.uuid_progress = _.map(editingLesson.uuid_progress, replaceVal);

                    // Найдем имеющееся значение прогресса
                    // значение прогресса существует. Все остается без изменения.
                    progressId._id = _.get(isProgressExist, learnerId, "");

                    const result = Object.assign(
                        { message: `Прогресс для пользователя ${learnerId} существует: ${progressId._id}` },
                        journal_subject["_doc"]
                    );
                    res.status(200).json(result);
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
            error: e.message,
        });
    }
});

router.put("/setClassProgress/", auth, async (req, res) => {
    try {
        const { journalId, lessonId } = req.body;

        const userData = req.user.email ? await Teacher.findOne({ email: req.user.email }) : await Teacher.findById(req.user._id);

        const journal_subject = await JournalSubject.findById(journalId);

        const isMentor = userData.uuid_mentor?.toString() === journal_subject?.uuid_class.toString();

        if (userData && journal_subject && (userData.uuid_class.includes(journal_subject.uuid_class) || isMentor)) {
            const classId = journal_subject.uuid_class;

            // Проверка содержимого
            if (classId && journalId && lessonId) {
                const editingLesson = journal_subject.topics.find((lesson) => lesson.uuid_lesson == lessonId);

                if (!editingLesson) {
                    res.status(422).json({ message: `Не корректный lessonId: ${lessonId}` });
                    return;
                }

                const classListLearner = await Class.findById(classId);

                if (!classListLearner) {
                    res.status(422).json({ message: `Не корректный classId: ${classId}` });
                    return;
                }

                // const progressObjArr = [...editingLesson.uuid_progress];
                const progressObjArr = await Promise.all(
                    classListLearner.learners_list.map(async (learnerId) => {
                        const progressId = { _id: "" };

                        const isProgressExist = editingLesson.uuid_progress.find((obj) => _.has(obj, learnerId));

                        if (!editingLesson.uuid_progress.length || !isProgressExist) {
                            // Генерируем новую строку успеваемости
                            const progress = new Progress({
                                journalId: journalId,
                                learnerId: learnerId,
                                lesson: "",
                                uuid_lesson: lessonId,
                                progress: {
                                    avg: 0,
                                    values: [],
                                },
                            });

                            // Сохраним ссылку на "новую строку успеваемости"
                            const res = await progress.save().then((doc) => (progressId._id = doc._doc._id));
                            return { [learnerId]: progressId._id };
                        } else return isProgressExist;
                    })
                );
                // console.log(progressObjArr);

                // Обновим данные в журнале
                const newTopics = journal_subject.topics.map((topic) =>
                    topic.uuid_lesson == lessonId ? { ...editingLesson, uuid_progress: progressObjArr } : topic
                );

                journal_subject.topics = newTopics;
                journal_subject.markModified("topics");
                await journal_subject.save().then((doc) => res.send(doc._doc));
            } else {
                res.status(422).json({ message: "Не корректные данные в теле запроса" });
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

router.post("/addMark/:progressId", auth, async (req, res) => {
    // ***
    try {
        const { progressId } = req.params;
        const { journalId, date, mark, task, type, _id } = req.body;

        // Check Teacher ID
        const userData = req.user.email ? await Teacher.findOne({ email: req.user.email }) : await Teacher.findById(req.user._id);
        // console.log(req);

        const journalData = await JournalSubject.findById(journalId);

        const isMentor = userData.uuid_mentor?.toString() === journalData.uuid_class.toString();

        if (userData && (userData.uuid_class.includes(journalData.uuid_class) || isMentor)) {
            // Проверка содержимого
            if (journalId && date && mark && task) {
                const curProgress = await Progress.findById(progressId);

                if (!curProgress) {
                    res.status(422).json({ message: `Запись об успеваемости не найдена progressId: ${progressId}` });
                    return;
                }

                const editingProgress = Object.assign({}, curProgress.progress);
                const isEditMark = editingProgress.values.find((mark) => mark._id === _id);
                if (isEditMark) {
                    editingProgress.values = editingProgress.values.map((elMark) => {
                        return elMark._id !== _id
                            ? elMark
                            : {
                                  _id: _id,
                                  date: date, //new Date(),
                                  mark: mark,
                                  type: type,
                                  task: task,
                              };
                    });
                } else {
                    const _id = nanoid();
                    editingProgress.values.push({
                        _id: _id,
                        date: date, //new Date(),
                        mark: mark,
                        type: type,
                        task: task,
                    });
                }

                const newAvg = editingProgress.values.reduce((acc, cur, _i, arr) => (acc += cur.mark / arr.length), 0.0);

                // console.log(editingProgress);

                // Обновим поле с оценками
                curProgress.progress = {
                    avg: newAvg,
                    values: editingProgress.values,
                };

                curProgress.markModified("progress");
                await curProgress
                    .save()
                    .then((result) => res.status(200).json(result))
                    .catch((err) => res.status(400).json({ message: "Ошибка выставления оценки 'addMark'", error: err.message }));
            } else {
                res.status(422).json({ message: "Ошибка компонетов объекта 'addMark'", error: err.message });
            }
        } else {
            res.status(401).json({ message: "Неавторизован или неявляетесь учителем по данному предмету" });
        }
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
            error: e,
        });
    }
});

router.delete("/deleteMark/:progressId", auth, async (req, res) => {
    // ***
    try {
        const { progressId } = req.params;
        const { journalId, deleteMarkId } = req.body;
        // console.log(req);

        // Проверка содержимого
        if (journalId && deleteMarkId && progressId) {
            // Check Teacher ID
            const userData = req.user.email ? await Teacher.findOne({ email: req.user.email }) : await Teacher.findById(req.user._id);
            // console.log(req);
            const journalData = await JournalSubject.findById(journalId);

            const isMentor = userData.uuid_mentor?.toString() === journalData.uuid_class.toString();

            if (userData && (userData.uuid_class.includes(journalData.uuid_class) || isMentor)) {
                const curProgress = await Progress.findById(progressId);

                if (!curProgress) {
                    res.status(422).json({ message: `Запись об успеваемости не найдена progressId: ${progressId}` });
                    return;
                }

                const editingProgress = Object.assign({}, curProgress.progress);

                editingProgress.values = editingProgress.values.filter((el) => el._id !== deleteMarkId);

                const newAvg = editingProgress.values.reduce((acc, cur, _i, arr) => (acc += cur.mark / arr.length), 0.0);

                // Обновим поле с оценками
                curProgress.progress = {
                    ...editingProgress,
                    avg: newAvg,
                };

                curProgress.markModified("progress");
                await curProgress
                    .save()
                    .then((result) => res.status(200).json(result))
                    .catch((err) => res.status(400).json({ message: "Ошибка выставления оценки 'addMark'", error: err.message }));
            } else {
                res.status(401).json({ message: "Неавторизован или неявляетесь учителем по данному предмету" });
            }
        } else {
            res.status(422).json({ message: "Ошибка компонетов объекта 'addMark'", error: err.message });
        }
    } catch (e) {
        res.status(500).json({
            message: " На сервере произошла ошибка. Попробуйте позже",
            error: e.message,
        });
    }
});

export default router;
