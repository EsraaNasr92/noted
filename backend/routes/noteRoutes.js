import express from "express";
import { deleteNote, getNotes, updatedNote } from "../controllers/noteControllers.js";
import Note from "../models/Note.js";


const router = express.Router();

// Get all notes
router.get("/", getNotes);

// Post a new note
router.post("/", async (req, res) => {
    try {
        const { title, description, date, folder } = req.body;

        // Find the last note to auto-generate a numeric ID
        const lastNote = await Note.findOne().sort({ id: -1 });
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

router.patch("/api/notes/:id/delete", deleteNote);

router.patch("/:id", updatedNote);

export default router;