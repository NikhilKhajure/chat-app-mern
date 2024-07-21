const { register, login, setAvatar, getAllUsers, logout } = require("../controlers/userControlers")

const express = require("express");
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/setavatar", setAvatar);
router.get("/allusers/:id", getAllUsers);
router.get("/logout/:id", logout);

module.exports = router;