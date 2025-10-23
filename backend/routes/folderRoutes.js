import express from "express";
import { deleteFolder, getFolder } from "../controllers/folderControllers.js";
import Folder from "../models/Folder.js";


const router = express.Router();

// Get all notes
router.get("/", getFolder);

// Post new folder name
router.post("/", async(req, res) => {
    try {
        const newFolder = new Folder({
            title: req.body.title,
        });
        const saved = await newFolder.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete("/:id", deleteFolder);

export default router;