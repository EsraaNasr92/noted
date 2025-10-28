import Note from "../models/Note.js";

export const getNotes = async(req, res) => {
    try{
        const notes = await Note.find().populate("folder", "title"); // to get the folder title
        res.status(200).json(notes);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;

        // Try numeric ID first, fallback to MongoDB _id
        let note = null;

        if (!isNaN(Number(id))) {
        // Numeric ID (e.g. 1, 2, 3)
        note = await Note.findOne({ id: Number(id) });
        } else {
        // MongoDB ObjectId (string)
        note = await Note.findById(id);
        }

        if (!note) {
        return res.status(404).json({ message: "Note not found" });
        }

        await note.deleteOne();

        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ message: error.message });
    }
};

export const updatedNote = async (req, res) => {
    try {
        const { id } = req.params;
        const filter = isNaN(Number(id))
        ? { _id: id }  // handle Mongo ObjectId
        : { id: Number(id) }; // handle numeric id

        const updated = await Note.findOneAndUpdate(
        filter,
        { $set: req.body },
        { new: true }
        );

        if (!updated)
        return res.status(404).json({ message: "Note not found" });

        res.json(updated);
    } catch (error) {
        console.error("Error updating note:", error);
        res.status(500).json({ message: "Failed to update note" });
    }
};
