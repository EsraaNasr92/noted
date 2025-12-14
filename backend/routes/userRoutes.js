const express = require("express");
const { login, signup, getUser } = require("../controllers/UserController");

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);

router.get("/user", auth ,getUser);

module.exports = router;
