import mongoose from "mongoose";

const noteSchema = new mongoose.schema({
    id:{
        type: Number,
        unique: true,
    },
    title:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required: true,
    },
    folder:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "folders", // reference to Folder model
        required: true,
    },
    description:{
        type: mongoose.Schema.Types.Mixed, // Allow string or array
        required: true,
    },
}, {timestamps: true});

export default mongoose.model("Note", noteSchema);