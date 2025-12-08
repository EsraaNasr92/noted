const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "Secret_key";

function auth(req, res, next) {
    try {
        const header = req.headers.authorization;
        if (!header) return res.status(401).json({ message: "No token provided" });

        const token = header.split(" ")[1]; // "Bearer <token>"
        if (!token) return res.status(401).json({ message: "Invalid token format" });

        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded._id;

        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
}

module.exports = auth;
