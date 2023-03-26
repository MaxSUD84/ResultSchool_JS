import express from "express";

let { default: authRoutes } = await import("./auth.routes.js");
let { default: addressRoutes } = await import("./address.routes.js");
let { default: parentRoutes } = await import("./parent.routes.js");
let { default: learnerRoutes } = await import("./learner.routes.js");
let { default: teacherRoutes } = await import("./teacher.routes.js");
let { default: classRoutes } = await import("./class.routes.js");
let { default: journalRoutes } = await import("./journal.routes.js");
let { default: progressRoutes } = await import("./progress.routes.js");
let { default: staticRoutes } = await import("./static.routes.js");
let { default: timeTableRoutes } = await import("./weeklyTimetable.js");

const router = express.Router({ mergeParams: true });

router.use("/auth", authRoutes);
router.use("/address", addressRoutes);
router.use("/parent", parentRoutes);
router.use("/learner", learnerRoutes);
router.use("/teacher", teacherRoutes);
router.use("/class", classRoutes);
router.use("/journal", journalRoutes);
router.use("/progress", progressRoutes);
router.use("/static", staticRoutes);
router.use("/timetable", timeTableRoutes);

export default router;
