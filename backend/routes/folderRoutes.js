import express from "express";
import { getFolder } from "../controllers/folderControllers.js";


const router = express.Router();

// Get all notes
router.get("/", getFolder);


export default router;