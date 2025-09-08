const { Router } = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const { AddBook } = require("../controllers/admin.controller");
const isAdmin = require("../middlewares/isAdmin");

const router = Router();

router.route("/add-book").post(isAuthenticated, isAdmin, AddBook);

module.exports = router;
