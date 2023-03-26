import express from "express";
let { default: authRoutes } = await import("./auth.routes.js");
let { default: commentRoutes } = await import("./comment.routes.js");
let { default: professionRoutes } = await import("./profession.routes.js");
let { default: qualityRoutes } = await import("./quality.routes.js");
let { default: userRoutes } = await import("./user.routes.js");

const router = express.Router({ mergeParams: true });

router.use("/auth", authRoutes);
router.use("/comment", commentRoutes);
router.use("/quality", qualityRoutes);
router.use("/profession", professionRoutes);
router.use("/user", userRoutes);

export default router;
