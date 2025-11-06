import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import connectDB from "./db.js";
import folderRoutes from "./routes/folderRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";

// Connect to MongoDB
connectDB();

dotenv.config();

const app = express();

// Middleware
app.use(
    cors({
        origin: [
        "http://localhost:5173",   // local dev (Vite)
        "http://localhost:3000",   // local dev (CRA)
        "noted-leakm9w2p-esraanasr92s-projects.vercel.app" // your deployed frontend domain
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
); // allow frontend access
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
