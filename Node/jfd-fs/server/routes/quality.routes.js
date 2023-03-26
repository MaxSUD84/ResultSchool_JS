import express from "express";
import Quality from "../models/Quality.js";

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
    // ***
    try {
        const list = await Quality.find();
        res.status(200).send(list);
        // res.status(200).json({ list });
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
        });
    }
});

export default router;
