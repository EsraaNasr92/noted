import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import folderRoutes from "./routes/folderRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Load environment variables first
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(
    cors({
        origin: [
        "http://localhost:5173", // Vite
        "http://localhost:3000", // CRA
        "https://noted-eight.vercel.app" // ✅ must include https:// for deployed site
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
        credentials: true,
    })
);
app.use(express.json());

// Routes
app.use("/api/notes", noteRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api", userRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("✅ Server is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
