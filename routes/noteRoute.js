const express = require("express");
const router = express.Router();
const notedata = require("../controllers/noteController");
const middleware = require("../middleware/authMiddleware");

router.get("/", middleware.protect, notedata.getNote);
router.post("/create", middleware.protect, notedata.createNote);
router.get("/:id", notedata.getNoteById);
router.put("/:id", middleware.protect, notedata.UpdateNote);
router.delete("/:id", middleware.protect, notedata.DeleteNote);

module.exports = router;
