import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true,
    },
}, {timestamps: true});

export default mongoose.model("Folder", folderSchema);