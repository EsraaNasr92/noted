import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import folderRoutes from "./routes/folderRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // allow frontend access
app.use(express.json());

app.use("/api/notes", noteRoutes);
app.use("/api/folders", folderRoutes);

// Connect to MongoDB
mongoose
    .connect("mongodb://localhost:27017/noted_app")
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Connection Error:", err));

// Basic route
app.get("/", (req, res) => {
    res.send("Server is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
