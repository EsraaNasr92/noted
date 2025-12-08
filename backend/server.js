import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import folderRoutes from "./routes/folderRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Load env
dotenv.config();

// Connect DB
connectDB();

const app = express();

// Middleware
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://noted-eight.vercel.app"
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

// -------------------------------
// Run server locally only
// -------------------------------
const PORT = process.env.PORT || 5000;

if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`🚀 Local server running on port ${PORT}`);
    });
}

// -------------------------------
// Export for Vercel
// -------------------------------
export default app;
