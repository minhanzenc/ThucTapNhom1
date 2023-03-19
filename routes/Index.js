const { Router } = require("express");
const router = Router({ mergeParams: true });

const { router: categoryRouter } = require("./CategoryRoute");
const { router: accountRouter } = require("./AcountRoute");
const { router: notificationRouter } = require("./NotificationRoute");

router.use("/category", categoryRouter);
router.use("/account", accountRouter);
router.use("/notification", notificationRouter);

module.exports = router;
