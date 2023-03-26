import express from "express";
import Address from "../models/Address.js";
import auth from "../middleware/auth.middleware.js";
const router = express.Router({ mergeParams: true });

// router.get("/", auth, async (req, res) => {
router.get("/:addressId", async (req, res, next) => {
    // ***
    try {
        const { addressId } = req.params;
        const address = await Address.findById(addressId);
        res.send({
            addres: address.addr,
        });
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже.",
        });
    }
});

export default router;
