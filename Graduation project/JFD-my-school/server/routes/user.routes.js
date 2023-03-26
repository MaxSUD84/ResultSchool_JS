import express from "express";
import User from "../models/User.js";
import auth from "../middleware/auth.middleware.js";
const router = express.Router({ mergeParams: true });

router.patch("/:userId", auth, async (req, res) => {
    // ***
    try {
        const { userId } = req.params;

        console.log(req.user); // формируется в middleware - auth

        // todo: userId == current user id
        if (userId === req.user._id) {
            const updatedUser = await User.findOneAndUpdate(userId, req.body, { new: true });
            res.send(updatedUser);
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
        });
    }
});

router.get("/", auth, async (req, res) => {
    // ***
    try {
        const list = await User.find();
        res.send(list);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
        });
    }
});

export default router;
