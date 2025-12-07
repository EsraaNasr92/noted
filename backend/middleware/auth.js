import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "Secret_key";

export default function auth(req, res, next) {
    try {
        const header = req.headers.authorization;

        if (!header)
            return res.status(401).json({ message: "No token provided" });

        // Expected "Bearer <token>"
        const token = header.split(" ")[1];
        if (!token)
            return res.status(401).json({ message: "Invalid token format" });

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Attach user ID to the request (must match your login token)
        req.userId = decoded._id;

        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
    }
}
