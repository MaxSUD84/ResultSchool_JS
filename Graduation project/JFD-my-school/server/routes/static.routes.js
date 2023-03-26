import express from "express";
import fs from "fs/promises";
import path from "path";
import auth from "../middleware/auth.middleware.js";
import { mCalendarEvent } from "../static/text/calendarEvent.js";
import { topNews } from "../static/text/topNews.js";
const router = express.Router({ mergeParams: true });

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/************************************************************/
router.get("/news/data/", async (req, res) => {
    // ***
    try {
        const corContent = topNews.map((news) => ({
            ...news,
            img: "api/static/news/" + news.img,
        }));
        res.json(corContent);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
        });
    }
});

router.get("/events/data/", async (req, res) => {
    // ***
    try {
        const corContent = mCalendarEvent.map((event) => ({
            ...event,
            img: "api/static/events/" + event.img,
        }));
        res.json(corContent);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
        });
    }
});

router.get("/news/:newsId", async (req, res) => {
    // ***
    try {
        const { newsId } = req.params;
        const preUrl = "images/news/";

        sendRes(preUrl + newsId, "image/png", res);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
        });
    }
});

router.get("/events/:eventsId", async (req, res) => {
    // ***
    try {
        const { eventsId } = req.params;
        const preUrl = "images/events/";

        sendRes(preUrl + eventsId, "image/png", res);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
        });
    }
});

router.get("/others/:picId", async (req, res) => {
    // ***
    try {
        const { picId } = req.params;
        const preUrl = "images/others/";

        sendRes(preUrl + picId, "image/png", res);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
        });
    }
});

router.get("/avatars/girls/:girlsId", async (req, res) => {
    // ***
    try {
        const { girlsId } = req.params;
        const preUrl = "images/avatars/learners/girls/";

        sendRes(preUrl + girlsId, "image/png", res);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
        });
    }
});

router.get("/avatars/boys/:boysId", async (req, res) => {
    // ***
    try {
        const { boysId } = req.params;
        const preUrl = "images/avatars/learners/boys/";

        sendRes(preUrl + boysId, "image/png", res);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
        });
    }
});

router.get("/avatars/teachers/:teacherId", async (req, res) => {
    // ***
    try {
        const { teacherId } = req.params;
        const preUrl = "images/avatars/teachers/";

        sendRes(preUrl + teacherId, "image/png", res);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
        });
    }
});

async function sendRes(url, contentType, res) {
    let file = path.resolve(__dirname, "../static/", url);
    try {
        let content = await fs.readFile(file);

        res.contentType(contentType);
        res.status(200).send(content);
    } catch (error) {
        res.status(404).json({
            message: `Фаил не найден (по пути ${file}).`,
            error: error.message,
        });
        // console.log(`Error 404: ${file}`, error);
    }
}

export default router;
