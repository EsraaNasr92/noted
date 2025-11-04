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

        // Move note to Trash folder instead of deleting
        note.isDeleted = true;
        await note.save();

        res.status(200).json({
            message: "Note deleted successfully",
            note,
        });
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

export const permanentlyDelete = async (req, res) => {
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

        // Permanently Delete
        await Note.deleteOne({ _id: note._id });

        res.status(200).json({
            message: "Note permanently deleted successfully",
            note,
        });
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ message: "Failed to permentely delete note" });
    }
}

export const restoreNote = async (req, res) => {
    try {
        const { id } = req.params;

        const filter = isNaN(Number(id))
            ? { _id: id }
            : { id: Number(id) };

        const restoredNote = await Note.findOneAndUpdate(
            filter,
            { $set: { isDeleted: false } },
            { new: true }
        );

        if (!restoredNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({
            message: "Note restored successfully",
            note: restoredNote,
        });
    } catch (error) {
        console.error("Error restoring note:", error);
        res.status(500).json({ message: "Failed to restore note" });
    }
};

export const editNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, date, folder, description } = req.body;

        const updateData = {};

        // Include only provided fields
        if (title && title.trim()) updateData.title = title.trim();
        if (description && description.trim()) updateData.description = description.trim();
        if (date) updateData.date = new Date(date);
        if (folder) updateData.folder = folder;

        // Always update the "updatedAt" timestamp
        updateData.updatedAt = new Date();

        // Check if anything valid to update
        if (Object.keys(updateData).length === 1 && updateData.updatedAt) {
            return res.status(400).json({ message: "No valid fields provided for update" });
        }

        // Determine ID type (numeric vs ObjectId)
        const filter = !isNaN(Number(id)) ? { id: Number(id) } : { _id: id };

        const updatedNote = await Note.findOneAndUpdate(
            filter,
            { $set: updateData },
            { new: true }
        ).populate("folder", "title");

        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({
            message: "Note updated successfully",
            note: updatedNote,
        });
    } catch (error) {
        console.error("❌ Error editing note:", error);
        res.status(500).json({ message: error.message });
    }
};

