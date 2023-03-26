import express from "express";
import Class from "../models/Class.js";
import Learner from "../models/Learner.js";
import Teacher from "../models/Teacher.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
    // console.log(Profession);
    // ***
    try {
        const list = await Class.find();
        res.status(200).send(list);
        // res.status(200).json({ list });
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
        });
    }
});

router.get("/:classId", auth, async (req, res) => {
    // ***
    try {
        const { classId } = req.params;
        const curClass = await Class.findById(classId);
        const grMentor = await Teacher.findById(curClass.group_mentor);

        const teachers = await Promise.all(
            curClass.study_subjects.map(async (sub) => {
                try {
                    const subTeacher = await Teacher.findById(sub.teacher_uuid);
                    return {
                        name: sub.name,
                        teacher: subTeacher.full_name,
                        _id: sub.teacher_uuid,
                    };
                } catch (error) {
                    return error;
                }
            })
        );

        const learners = await Promise.all(
            curClass.learners_list.map(async (learnId) => {
                try {
                    const learName = await Learner.findById(learnId);
                    return {
                        name: learName ? `${learName.last_name} ${learName.first_name}` : "Ученик не найден",
                        _id: learnId,
                    };
                } catch (error) {
                    return error;
                }
            })
        );

        if (teachers && learners) {
            const _class = {
                title: curClass.title,
                mentor: grMentor.full_name,
                subject_teachers: teachers,
                list_learners: learners,
            };
            res.status(200).send(_class);
        }
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
        });
    }
});

router.get("/fulldata/:classId", auth, async (req, res) => {
    // ***
    try {
        const { classId } = req.params;
        const curClass = await Class.findById(classId);
        const grMentor = await Teacher.findById(curClass.group_mentor);

        const teachers = await Promise.all(
            curClass.study_subjects.map(async (sub) => {
                try {
                    const subTeacher = await Teacher.findById(sub.teacher_uuid);
                    return {
                        [sub.teacher_uuid]: subTeacher,
                    };
                } catch (error) {
                    return error;
                }
            })
        );
        const learners = await Promise.all(
            curClass.learners_list.map(async (learnId) => {
                try {
                    const learName = await Learner.findById(learnId);
                    return {
                        [learnId]: learName,
                    };
                } catch (error) {
                    return error;
                }
            })
        );

        if (teachers && learners) {
            const _class = {
                class: {
                    _id: classId,
                    title: curClass.title,
                },
                mentor: grMentor,
                subject_teachers: teachers,
                list_learners: learners,
            };
            res.status(200).send(_class);
        }
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
        });
    }
});

export default router;
