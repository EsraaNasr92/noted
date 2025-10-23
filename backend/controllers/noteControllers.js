import Note from "../models/Note.js";

export const getNotes = async(req, res) => {
    try{
        const notes = await Note.find().populate("folder", "title"); // to get the folder title
        res.status(200).json(notes);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};
