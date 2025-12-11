const Folder = require("../models/Folder");
const Note = require("../models/Note");

// Get all folders for a user
const getFolder = async (req, res) => {
    try {
        const folders = await Folder.find({ userId: req.userId });
        res.status(200).json(folders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a folder and move notes to Default
const deleteFolder = async (req, res) => {
    try {
        const { id } = req.params;
        const folderToDelete = await Folder.findOne({ _id: id, userId: req.userId });

        if (!folderToDelete)
            return res.status(404).json({ message: "Folder not found" });

        // ❌ Prevent deletion of Default
        if (folderToDelete.title === "Default") {
            return res.status(400).json({ message: "Cannot delete the Default folder" });
        }

        // Ensure Default folder exists ONLY for this user
        let defaultFolder = await Folder.findOne({ title: "Default", userId: req.userId });
        if (!defaultFolder) {
            defaultFolder = await Folder.create({
                title: "Default",
                userId: req.userId
            });
        }

        // Move notes
        await Note.updateMany({ folder: id }, { folder: defaultFolder._id });

        // Delete the folder
        await Folder.findByIdAndDelete(id);

        res.status(200).json({
            message: `Folder "${folderToDelete.title}" deleted successfully. Notes moved to "Default".`,
            defaultFolder,
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Rename a folder
const renameFolder = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        if (!title || !title.trim())
            return res.status(400).json({ message: "Folder title is required" });

        const updatedFolder = await Folder.findOneAndUpdate(
            { _id: id, userId: req.userId },
            { $set: { title: title.trim() } },
            { new: true }
        );

        if (!updatedFolder)
            return res.status(404).json({ message: "Folder not found" });

        res.status(200).json({
            message: "Folder renamed successfully",
            folder: updatedFolder,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getFolder, deleteFolder, renameFolder };
