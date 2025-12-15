const express = require("express");
const { login, signup, getUser } = require("../controllers/UserController");
const auth = require("../middleware/auth");
const User = require("../models/User");

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);

// Get user info
router.get("/user", auth ,getUser);

// UPDATE current user
router.put("/user", auth, async (req, res) => {
    try {
        const { gender, phone } = req.body;

        const user = await User.findByIdAndUpdate(
        req.userId, // use userId from middleware
        { gender, phone },
        { new: true }
        ).select("-password");

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});



module.exports = router;
