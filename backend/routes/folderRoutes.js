import express from "express";
import { deleteFolder, getFolder, renameFolder } from "../controllers/folderControllers.js";
import auth from "../middleware/auth.js";
import Folder from "../models/Folder.js";

const router = express.Router();

// Get all notes
router.get("/", auth, getFolder);

// Post new folder name
router.post("/", auth, async(req, res) => {
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

export default router;