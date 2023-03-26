import express from "express";
import Profession from "../models/Profession.js";

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
    // console.log(Profession);
    // ***
    try {
        const list = await Profession.find();
        res.status(200).send(list);
        // res.status(200).json({ list });
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
        });
    }
});

export default router;
