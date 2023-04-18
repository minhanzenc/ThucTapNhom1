const { Router } = require("express");
const router = Router({ mergeParams: true });

const { router: categoryRouter } = require("./CategoryRoute");
const { router: classRoomRouter } = require("./ClassRoomRoute");
const { router: teacherRouter } = require("./TeacherRouter");
const { router: studentRouter } = require("./StudentRouter");
const { router: accountRouter } = require("./AcountRoute");
const { router: notificationRouter } = require("./NotificationRoute");
const { router: GroupRouter } = require("./GroupRouter");
const { router: subjectRouter} = require("./SubjectRoute");
const { router: RequestRouter } = require("./RequestRoute");
const { router: DiscussRouter } = require("./DiscussRoute");
const { router: ClassRoomStudentRouter } = require("./ClassRoomStudentRoute");

router.use("/account", accountRouter);
router.use("/notification", notificationRouter);
router.use("/category", categoryRouter);
router.use("/classroom", classRoomRouter);
router.use("/teacher", teacherRouter);
router.use("/student", studentRouter);
router.use("/group", GroupRouter);
router.use("/subject",subjectRouter);
router.use("/request", RequestRouter);
router.use("/discuss", DiscussRouter);
router.use("/classroom-student", ClassRoomStudentRouter);
module.exports = router;
