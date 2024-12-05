const express = require("express");
const router = express.Router();
const { getUser, deleteUser } = require("../Controllers/UserController");

router.get("/get", getUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
