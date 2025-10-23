import Folder from "../models/Folder.js";

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

        const deletedFolder = await Folder.findByIdAndDelete(id);

        if (!deletedFolder) {
        return res.status(404).json({ message: "Folder not found" });
        }

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