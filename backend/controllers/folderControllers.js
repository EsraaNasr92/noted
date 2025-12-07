import Folder from "../models/Folder.js";
import Note from "../models/Note.js";

export const getFolder = async(req, res) => {
    try{
        const folders = await Folder.find({ userId: req.userId }); // Each user get his own folders
        res.status(200).json(folders);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

export const deleteFolder = async (req, res) => {
    try {
        const { id } = req.params;

        const folderToDelete = await Folder.findOne({ _id: id, userId: req.userId });
        if (!folderToDelete) {
            return res.status(404).json({ message: "Folder not found" });
        }

        let defaultFolder = await Folder.findOne({ title: "Default", userId: req.userId });

        if (!defaultFolder) {
            defaultFolder = await Folder.findOneAndUpdate(
                { title: "Default", userId: req.userId },
                { $setOnInsert: { title: "Default", userId: req.userId } },
                { upsert: true, new: true }
            );
        }

        await Note.updateMany({ folder: id }, { folder: defaultFolder._id });
        await Folder.findByIdAndDelete(id);

        res.status(200).json({
            message: `Folder "${folderToDelete.title}" deleted successfully. Notes moved to "Default" folder.`,
            defaultFolder,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// PATCH /api/folders/:id
export const renameFolder = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        if (!title || !title.trim()) {
            return res.status(400).json({ message: "Folder title is required" });
        }

        // Support both numeric and Mongo _id folders
        const filter = isNaN(Number(id))
            ? { _id: id }
            : { id: Number(id) };

        const updatedFolder = await Folder.findOneAndUpdate(
            filter,
            { $set: { title: title.trim() } },
            { new: true }
        );

        if (!updatedFolder) {
            return res.status(404).json({ message: "Folder not found" });
        }

        res.status(200).json({
            message: "Folder renamed successfully",
            folder: updatedFolder,
        });
    } catch (error) {
        console.error("Error renaming folder:", error);
        res.status(500).json({ message: error.message });
    }
};


const ensureDefaultFolder = async () => {
    const defaultFolder = await Folder.findOne({ title: "Default" });
    if (!defaultFolder) {
        await Folder.create({
            title: "Default",
        });
        console.log("✅ Default folder created in the database.");
    }
};

ensureDefaultFolder();