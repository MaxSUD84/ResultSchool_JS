import express from "express";
import Father from "../models/Father.js";
import Mother from "../models/Mother.js";
import Address from "../models/Address.js";
import Learner from "../models/Learner.js";
import auth from "../middleware/auth.middleware.js";
const router = express.Router({ mergeParams: true });

// router.get("/", auth, async (req, res) => {
router.get("/:learnerId", async (req, res) => {
    // ***
    try {
        const { learnerId } = req.params;
        const learner = await Learner.findById(learnerId);
        const father = await Father.findById(learner.parents.father);
        const fAddress = await Address.findById(father.address);
        const mother = await Mother.findById(learner.parents.mother);
        const mAddress = await Address.findById(mother.address);

        const parents = {
            father: {
                full_name: father.full_name,
                phone: father.phone,
                email: father.email,
                address: fAddress.addr,
            },
            mother: {
                full_name: mother.full_name,
                phone: mother.phone,
                email: mother.email,
                address: mAddress.addr,
            },
        };

        res.send(parents);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
        });
    }
});

// router.get("/", auth, async (req, res) => {
router.get("/father/:fatherId", async (req, res) => {
    // ***
    try {
        const { fatherId } = req.params;
        const father = await Father.findById(fatherId);
        const fAddress = await Address.findById(father.address);

        const parents = {
            full_name: father.full_name,
            phone: father.phone,
            email: father.email,
            address: fAddress.addr,
        };

        res.send(parents);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
        });
    }
});

// router.get("/", auth, async (req, res) => {
router.get("/mother/:motherId", async (req, res) => {
    // ***
    try {
        const { motherId } = req.params;
        const mother = await Mother.findById(motherId);
        const mAddress = await Address.findById(mother.address);

        const parents = {
            full_name: mother.full_name,
            phone: mother.phone,
            email: mother.email,
            address: mAddress.addr,
        };

        res.send(parents);
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
        });
    }
});

export default router;
