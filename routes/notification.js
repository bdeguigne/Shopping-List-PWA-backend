const express = require("express");
const router = express.Router();
const notificationsController = require("../controllers/notificationsController");

router.post("/subscribe", notificationsController.subscribe);
// router.post("/send", notificationsController.sendNotification);
router.post("/sendAll", notificationsController.sendNotificationToAllUsers);

module.exports = router;
