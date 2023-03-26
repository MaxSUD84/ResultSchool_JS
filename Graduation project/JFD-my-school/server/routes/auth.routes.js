import express from "express";
import bcrypt from "bcryptjs";
import Learner from "../models/Learner.js";
import Teacher from "../models/Teacher.js";
import { generateUserData } from "../utils/helpers.js";
import tokenServices from "../services/token.services.js";
import { check, validationResult } from "express-validator";
import chalk from "chalk";
const router = express.Router({ mergeParams: true });

// 1. get data from req (email, password ...)
// 2. check if user already exists
// 3. hash password
// 4. create user
// 5. generate tokens

// const signUpValidations = [
//     check('email', 'Некорректный email').isEmail(),
//     check('password', "Минимальная длина пароля 8 символов").isLength({min: 8})
// ]

// router.post("/signup", [
//     check("email", "Некорректный email").isEmail(),
//     check("password", "Минимальная длина пароля 8 символов").isLength({ min: 8 }),
//     async (req, res) => {
//         // ***
//         try {
//             const errors = validationResult(req);

//             if (!errors.isEmpty()) {
//                 return res.status(400).json({
//                     error: {
//                         message: "INVALID_DATA",
//                         code: 400,
//                         errors: errors.array(),
//                     },
//                 });
//             }

//             const { email, password } = req.body;

//             const existingUser = await User.findOne({ email });

//             if (existingUser) {
//                 return res.status(400).json({
//                     error: {
//                         message: "EMAIL_EXISTS",
//                         code: 400,
//                     },
//                 });
//             }

//             const hashedPassword = await bcrypt.hash(password, 12);
//             const newUser = await User.create({
//                 ...generateUserData(),
//                 ...req.body,
//                 password: hashedPassword,
//             });

//             const tokens = tokenServices.generate({
//                 _id: newUser._id,
//             });

//             await tokenServices.save(newUser._id, tokens.refreshToken);

//             res.status(201).send({
//                 ...tokens,
//                 userId: newUser._id,
//             });
//         } catch (e) {
//             res.status(500).json({
//                 message: "На сервере произошла ошибка. Попробуйте позже.",
//             });
//         }
//     },
// ]);

// 1. validate
// 2. find user
// 3. compare hashed password
// 4. generate token
// 5. return data

router.post("/signin", [
    check("email", "Email е корректный").normalizeEmail().isEmail(),
    check("password", "Пароль не может быть пустым").exists(),
    async (req, res) => {
        // ***

        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: "INVALID_DATA",
                        code: 400,
                    },
                });
            }

            const { email, password } = await req.body;

            const existingTeacher = await Teacher.findOne({ email: email });
            const existingLearner = await Learner.findOne({ email: email });

            // console.log(email, existingTeacher, existingLearner);

            if (!existingLearner && !existingTeacher) {
                return res.status(400).send({
                    error: {
                        message: "EMAIL_NOT_FOUND",
                        code: 400,
                    },
                });
            }

            const existingUser = !existingLearner ? existingTeacher : existingLearner;

            const isPasswordEqual = await bcrypt.compare(password, existingUser.password);

            const isTeacher = !!existingTeacher;
            const isMentor = isTeacher && existingTeacher.isMentor;

            if (!isPasswordEqual) {
                return res.status(400).send({
                    error: {
                        message: "INVALID_PASSWORD",
                        code: 400,
                    },
                });
            }

            const tokens = tokenServices.generate({ _id: existingUser._id });
            await tokenServices.save(existingUser._id, tokens.refreshToken);

            res.status(200).send({ ...tokens, userId: existingUser._id, isTeacher, isMentor });

            console.log(chalk.bgGreenBright(`User ID: ${existingUser._id} has been connected. `));
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже.",
                error: e.message,
            });
        }
    },
]);

function isTokenInvalid(data, dbToken) {
    return !data || !dbToken || data._id !== dbToken?.user?.toString();
}

router.post("/token", async (req, res) => {
    // ***
    try {
        const { refresh_token: refreshToken } = req.body;
        const data = tokenServices.validateRefresh(refreshToken);

        const dbToken = await tokenServices.findToken(refreshToken);

        if (isTokenInvalid(data, dbToken)) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const tokens = await tokenServices.generate({ id: dbToken.user.toString() });
        await tokenServices.save(data._id, tokens.refreshToken);

        res.status(200).send({ ...tokens, userId: data._id });
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
        });
    }
});

export default router;
