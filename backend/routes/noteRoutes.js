const express = require("express");
const {
    deleteNote,
    editNote,
    getNotes,
    permanentlyDelete,
    restoreNote,
    updatedNote
} = require("../controllers/noteControllers");
const auth = require("../middleware/auth");
const Note = require("../models/Note");

const router = express.Router();

// Get all notes
router.get("/", auth, getNotes);

// Post a new note
router.post("/", auth, async (req, res) => {
    try {
        const { title, description, date, folder } = req.body;

        if (!title || !title.trim()) return res.status(400).json({ message: "Title is required" });
        if (!description || !description.trim()) return res.status(400).json({ message: "Description is required" });
        if (!folder) return res.status(400).json({ message: "Folder is required" });

        const newNote = new Note({
            title: title.trim(),
            description: description.trim(),
            date: date ? new Date(date) : new Date(),
            folder,
            userId: req.userId,
        });

        const saved = await newNote.save();
        res.status(201).json(saved);

    } catch (err) {
        console.error("Error creating note:", err);
        res.status(400).json({ message: err.message });
    }
});


router.patch("/:id/delete", deleteNote);
router.patch("/:id", updatedNote);
router.patch("/:id/restore", restoreNote);
router.delete("/:id", permanentlyDelete);

router.patch("/:id/edit", editNote);

module.exports = router;
