const Note = require("../models/Note");

// Get notes with optional search
const getNotes = async (req, res) => {
    try {
        const { search } = req.query;
        const query = { userId: req.userId, isDeleted: false };

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }

        const notes = await Note.find(query).populate("folder", "title");
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Soft delete a note
const deleteNote = async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, userId: req.userId });
        if (!note) return res.status(404).json({ message: "Note not found" });

        note.isDeleted = true;
        await note.save();
        res.status(200).json({ message: "Note deleted successfully", note });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update note
const updatedNote = async (req, res) => {
    try {
        const { id } = req.params;
        const filter = isNaN(Number(id)) ? { _id: id } : { id: Number(id) };
        const updated = await Note.findOneAndUpdate(filter, { $set: req.body }, { new: true }).populate("folder", "title");

        if (!updated) return res.status(404).json({ message: "Note not found" });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: "Failed to update note" });
    }
};

// Permanently delete note
const permanentlyDelete = async (req, res) => {
    try {
        const note = await Note.findOne({ _id: req.params.id, userId: req.userId, isDeleted: true });
        if (!note) return res.status(404).json({ message: "Note not found or not in trash" });

        await Note.deleteOne({ _id: note._id });
        res.status(200).json({ message: "Note permanently deleted successfully", note });
    } catch (error) {
        res.status(500).json({ message: "Failed to permanently delete note" });
    }
};

// Restore note from trash
const restoreNote = async (req, res) => {
    try {
        const { id } = req.params;
        const filter = isNaN(Number(id)) ? { _id: id } : { id: Number(id) };
        const restoredNote = await Note.findOneAndUpdate(filter, { $set: { isDeleted: false } }, { new: true });

        if (!restoredNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note restored successfully", note: restoredNote });
    } catch (error) {
        res.status(500).json({ message: "Failed to restore note" });
    }
};

// Edit note
const editNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, date, folder, description } = req.body;

        const updateData = { updatedAt: new Date() };
        if (title && title.trim()) updateData.title = title.trim();
        if (description && description.trim()) updateData.description = description.trim();
        if (date) updateData.date = new Date(date);
        if (folder) updateData.folder = folder;

        if (Object.keys(updateData).length === 1) return res.status(400).json({ message: "No valid fields provided" });

        const filter = !isNaN(Number(id)) ? { id: Number(id) } : { _id: id };
        const updatedNote = await Note.findOneAndUpdate(filter, { $set: updateData }, { new: true }).populate("folder", "title");

        if (!updatedNote) return res.status(404).json({ message: "Note not found" });
        res.status(200).json({ message: "Note updated successfully", note: updatedNote });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getNotes, deleteNote, updatedNote, permanentlyDelete, restoreNote, editNote };
