const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "Secret_key";

// SIGNUP
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            gender,
            phone
        });

        res.status(201).json({ message: "User created", user: { name: newUser.name, email: newUser.email } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// LOGIN
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid email or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

        const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
        res.json({ message: "Login successful", token, user: { name: user.name, email: user.email, _id: user._id } });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getUser = async (req, res) => {
    try {
        // req.userId should be set by auth middleware
        const user = await User.findById(req.userId).select("-password"); // exclude password
        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { signup, login, getUser };
