import express from "express";
import Class from "../models/Class.js";
import _ from "lodash";
import { nanoid } from "nanoid";

const router = express.Router({ mergeParams: true });

router.get("/:classId", async (req, res) => {
    try {
        const { classId } = req.params;
        const classData = await Class.findById(classId);
        if (!classData) {
            res.status(400).json({ message: `Класс с таким classId: ${classId} не найден` });
            return;
        }

        res.status(200).send(getClassTimetable(classData.title));
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
            error: e.message,
        });
    }
});

export default router;

function getClassTimetable(numClass) {
    // Зададим расписание в ручную
    const class5_1 = [[1, 2, 5, 4, 0], [0, 0, 3, 5, 4], [5, 4, 2, 1], [3, 4, 5, 0, 0], [5, 4, 1, 3], [], []];
    const class5_2 = [[0, 0, 2, 5, 4], [5, 4, 0, 1], [1, 2, 5, 3, 4], [5, 4, 1, 2, 3], [1, 4, 5, 0], [], []];

    const class6 = [[0, 0, 3, 5, 4], [1, 2, 5, 4, 0], [5, 4, 2, 1, 0], [3, 4, 2, 0, 0], [0, 4, 1, 2, 3], [1, 2, 4, 3], []];

    const subjects = ["Математика", "Русский язык", "Литература", "Англиский язык", "Физика", "Биология"];

    // Формируем рандомом расписание уроков
    const resArr = [];
    for (let j = 0; j < 7; j++) {
        let dayTimetab = _.fill([], "");

        switch (numClass) {
            case "5А":
                dayTimetab = [...class5_1[j].map((sub) => ({ id: nanoid(), subject: subjects[sub] }))];
                break;
            case "5К":
                dayTimetab = [...class5_2[j].map((sub) => ({ id: nanoid(), subject: subjects[sub] }))];
                break;
            case "6Б":
                dayTimetab = [...class6[j].map((sub) => ({ id: nanoid(), subject: subjects[sub] }))];
                break;
            default:
        }
        const dayLabel = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"][j];

        const el_id = nanoid();
        resArr.push({
            id: el_id,
            label: dayLabel,
            lessons: dayTimetab,
        });
    }

    return resArr;
}
