import express from "express";
import Class from "../models/Class.js";
import Teacher from "../models/Teacher.js";
import config from "config";
import auth from "../middleware/auth.middleware.js";
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

router.get("/:teacherId", async (req, res) => {
    // ***
    try {
        const { teacherId } = req.params;
        const teacher = await Teacher.findById(teacherId);
        const classes = await Promise.all(
            teacher.uuid_class.map(async (classId) => {
                try {
                    const className = await Class.findById(classId);
                    return className.title;
                } catch (error) {
                    return error;
                }
            })
        );
        const mentorClass = teacher.uuid_mentor ? (await Class.findById(teacher.uuid_mentor))?.title : "";

        const fullTeacher = {
            _id: teacher._id,
            full_name: teacher.full_name,
            experience_education: teacher.experience_education,
            subject: teacher.subject,
            image: `${config.get("host")}:${config.get("port")}/${teacher.image}`,
            email: teacher.email,
            isMentor: teacher.isMentor,
            name_mentor: mentorClass,
            uuid_mentor: teacher.uuid_mentor,
            name_class: classes,
            uuid_class: teacher.uuid_class,
            education_rating: teacher.education_rating,
            learner_rating: teacher.learner_rating,
        };

        res.send(fullTeacher);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
        });
    }
});

// router.get("/", auth, async (req, res) => {
router.get("/", async (req, res) => {
    // ***
    try {
        const list = await Teacher.find();
        res.send(list);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
        });
    }
});

export default router;
