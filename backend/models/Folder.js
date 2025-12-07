import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
}, {timestamps: true});

export default mongoose.model("Folder", folderSchema);