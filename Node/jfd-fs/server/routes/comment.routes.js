import express from "express";
import auth from "../middleware/auth.middleware.js";
import Comment from "../models/Comment.js";
const router = express.Router({ mergeParams: true });

// /api/comment
router
    .route("/")
    .get(auth, async (req, res) => {
        // ***
        try {
            const { orderBy, equalTo } = req.query;
            const list = await Comment.find({ [orderBy]: equalTo });
            res.send(list);
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже",
            });
        }
    })
    .post(auth, async (req, res) => {
        // ***
        try {
            const newComment = await Comment.create({
                ...req.body,
                userId: req.user._id,
            });
            res.status(201).send(newComment);
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка. Попробуйте позже",
            });
        }
    });

router.delete("/:commentId", auth, async (req, res) => {
    // ***
    try {
        const { commentId } = req.params;
        const removedComment = await Comment.findById(commentId);
        // const removedComment = await Comment.find({ _id: commentId });

        // console.log(req.user);

        if (removedComment.userId.toString() === req.user._id) {
            await removedComment.remove();
            return res.send(null);
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (e) {
        res.status(500).json({
            message: " На сервере произошла ошибка. Попробуйте позже",
        });
    }
});

export default router;
