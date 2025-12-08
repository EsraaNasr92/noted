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

        // Find the last note to auto-generate a numeric ID
        const lastNote = await Note.findOne({ userId: req.userId }).sort({ id: -1 });
        const newId = lastNote ? lastNote.id + 1 : 1;

        const newNote = new Note({
            id: newId,
            title,
            description,
            date,
            folder,
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
