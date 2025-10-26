import Folder from "../models/Folder.js";
import Note from "../models/Note.js";

export const getFolder = async(req, res) => {
    try{
        const folders = await Folder.find();
        res.status(200).json(folders);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

export const deleteFolder = async (req, res) => {
    try {
        const { id } = req.params; // or req.body.id if you send it in the body

        // Find the folder to delete
        const folderToDelete = await Folder.findById(id);
        if(!folderToDelete){
            return res.status(404).json({ message: "Folder not found " });
        }

        // Find or create the "Default" folder
        let defaultFolder = await Folder.findOne({ title: "Default" });
        if (!defaultFolder) {
            defaultFolder = await Folder.create({ title: "Default" });
        }

        // Reassign all notes from this folder to Default
        await Note.updateMany(
            { folder: id },
            { folder: defaultFolder._id }
        );

        // Delete the folder
        await Folder.findByIdAndDelete(id);

        res.status(200).json({
            message: `Folder "${folderToDelete.title}" deleted successfully. Notes moved to "Default" folder.`,
        });

        res.status(200).json({ message: "Folder deleted successfully", deletedFolder });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const ensureDefaultFolder = async () => {
    const defaultFolder = await Folder.findOne({ title: "Default" });
    if (!defaultFolder) {
        await Folder.create({ title: "Default" });
        console.log("✅ Default folder created in the database.");
    }
};

ensureDefaultFolder();