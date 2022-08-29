const express = require("express");
const userdata = require("../controllers/userController");
const router = express.Router();
const middleware = require("../middleware/authMiddleware");

router.post("/", userdata.registerUser);
router.post("/login", userdata.authUser);
router.post("/profile", middleware.protect, userdata.updateUserprofile);

module.exports = router;
