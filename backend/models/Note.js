const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required: true,
        default: Date.now,
    },
    folder:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Folder", // reference to Folder model
        required: true,
    },
    description:{
        type: mongoose.Schema.Types.Mixed, // Allow string or array
        required: true,
    },
    isFavorite:{
        type: Boolean,
        default: false,
    },
    isArchive:{
        type: Boolean,
        default: false,
    },
    isDeleted:{
        type: Boolean,
        default: false,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {timestamps: true});

module.exports = mongoose.model("Note", noteSchema);