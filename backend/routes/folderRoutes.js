const express = require("express");
const { deleteFolder, getFolder, renameFolder } = require("../controllers/folderControllers");
const auth = require("../middleware/auth");
const Folder = require("../models/Folder");

const router = express.Router();

// Get all notes
router.get("/", auth, getFolder);

// Post new folder name
router.post("/", auth, async (req, res) => {
    try {
        const newFolder = new Folder({
            title: req.body.title,
            userId: req.userId
        });
        const saved = await newFolder.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete("/:id", auth, deleteFolder);

router.patch("/:id", auth, renameFolder);

module.exports = router;
