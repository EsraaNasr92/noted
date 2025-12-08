const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/db"); // now properly requires the function
const folderRoutes = require("./routes/folderRoutes");
const noteRoutes = require("./routes/noteRoutes");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
connectDB(); // ✅ should work now

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://noted-eight.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true
}));

app.use(express.json());

app.use("/api/notes", noteRoutes);
app.use("/api/folders", folderRoutes);
app.use("/api", userRoutes);

app.get("/", (req, res) => res.send("Server running"));

const PORT = process.env.PORT || 5000;

if (!process.env.VERCEL) {
    app.listen(PORT, () => console.log(`Local server running on port ${PORT}`));
}

module.exports = app;
