import express from "express";
import Father from "../models/Father.js";
import Mother from "../models/Mother.js";
import Address from "../models/Address.js";
import Class from "../models/Class.js";
import Learner from "../models/Learner.js";
import auth from "../middleware/auth.middleware.js";
import config from "config";
const router = express.Router({ mergeParams: true });

// router.patch("/:userId", auth, async (req, res) => {
//     // ***
//     try {
//         const { userId } = req.params;

//         console.log(req.user); // формируется в middleware - auth

//         // todo: userId == current user id
//         if (userId === req.user._id) {
//             const updatedUser = await User.findOneAndUpdate(userId, req.body, { new: true });
//             res.send(updatedUser);
//         } else {
//             res.status(401).json({ message: "Unauthorized" });
//         }
//     } catch (e) {
//         res.status(500).json({
//             message: "На сервере произошла ошибка. Попробуйте позже.",
//         });
//     }
// });

router.get("/:learnerId", auth, async (req, res) => {
    // ***
    try {
        const { learnerId } = req.params;
        const learner = await Learner.findById(learnerId);
        const address = await Address.findById(learner.address);
        const curClass = await Class.findById(learner.uuid_class);
        const father = await Father.findById(learner.parents.father);
        const mother = await Mother.findById(learner.parents.mother);

        const fullLearner = {
            birthday: learner.birthday,
            parents: {
                father: {
                    full_name: father.full_name,
                    phone: father.phone,
                    email: father.email,
                },
                mother: {
                    full_name: mother.full_name,
                    phone: mother.phone,
                    email: mother.email,
                },
            },
            _id: learner._id,
            sex: learner.sex,
            first_name: learner.first_name,
            last_name: learner.last_name,
            image: `${config.get("host")}:${config.get("port")}/${learner.image}`,
            phone: learner.phone,
            name_class: curClass.title,
            uuid_class: learner.uuid_class,
            hobby: learner.hobby,
            add_education: learner.add_education,
            achievements: learner.achievements,
            academic_progress_sum: learner.academic_progress_sum,
            teacher_raiting: learner.teacher_raiting,
            email: learner.email,
            // password: learner.password,
            address: address.addr,
            study_subjects: learner.study_subjects,
            advices: learner.advices,
            messages: learner.messages,
            uuid_progress: learner.uuid_progress,
        };

        res.send(fullLearner);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
        });
    }
});

router.post("/:learnerId", auth, async (req, res) => {
    // ***
    try {
        const { learnerId } = req.params;
        const { hobby, add_education, achievements } = req.body;

        const learner = await Learner.findById(learnerId);
        if (!learner) {
            res.status(400).json({ message: `Пользователь с learnerId: ${learnerId} не найдена` });
            return;
        }

        const userData = req.user.email ? await Learner.findOne({ email: req.user.email }) : await Learner.findById(req.user._id);

        if (userData && userData._id.toString() == learner._id.toString()) {
            // Обновим поле с оценками
            learner.hobby = [...hobby];
            learner.add_education = [...add_education];
            learner.achievements = [...achievements];

            // console.log(learner);

            learner.markModified("hobby");
            learner.markModified("add_education");
            learner.markModified("achievements");
            await learner
                .save()
                .then((result) => res.status(200).json(result))
                .catch((err) => res.status(400).json({ message: "Ошибка сохранения данных пользователя", error: err.message }));
        } else {
            res.status(401).json({ message: "Пользователь не авторизован" });
        }
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
        });
    }
});

// router.get("/", auth, async (req, res) => {
router.get("/", auth, async (req, res, next) => {
    // ***
    try {
        // const learner = await Learner.findById(learnerId);
        const list = await Learner.find();
        const resList = await Promise.all(
            list.map(async (learner) => {
                const [_address, _curClass, _father, _mother] = await Promise.allSettled([
                    Address.findById(learner.address),
                    Class.findById(learner.uuid_class),
                    Father.findById(learner.parents.father),
                    Mother.findById(learner.parents.mother),
                ]);

                const address = _address.status === "fulfilled" ? _address.value : "";
                const curClass = (_curClass.status === "fulfilled" ? _curClass.value : { title: "" }) || { title: "" };
                const father = _father.status === "fulfilled" ? _father.value : {};
                const mother = _mother.status === "fulfilled" ? _mother.value : {};

                const fullLearner = {
                    birthday: learner.birthday,
                    parents: {
                        father: {
                            full_name: father.full_name,
                            phone: father.phone,
                            email: father.email,
                        },
                        mother: {
                            full_name: mother.full_name,
                            phone: mother.phone,
                            email: mother.email,
                        },
                    },
                    _id: learner._id,
                    sex: learner.sex,
                    first_name: learner.first_name,
                    last_name: learner.last_name,
                    image: `${config.get("host")}:${config.get("port")}/${learner.image}`,
                    phone: learner.phone,
                    name_class: curClass.title,
                    uuid_class: learner.uuid_class,
                    hobby: learner.hobby,
                    add_education: learner.add_education,
                    achievements: learner.achievements,
                    academic_progress_sum: learner.academic_progress_sum,
                    teacher_raiting: learner.teacher_raiting,
                    email: learner.email,
                    // password: learner.password,
                    address: address.addr,
                    study_subjects: learner.study_subjects,
                    advices: learner.advices,
                    messages: learner.messages,
                    uuid_progress: learner.uuid_progress,
                };

                return fullLearner;
            })
        );
        // const address = await Address.findById(learner.address);
        // const curClass = await Class.findById(learner.uuid_class);
        // const father = await Father.findById(learner.parents.father);
        // const mother = await Mother.findById(learner.parents.mother);

        res.send(resList);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
            error: e.message,
        });
    }
});

export default router;
