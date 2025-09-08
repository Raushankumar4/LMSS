const { Router } = require("express");
const {
  requestToBorrow,
  getRequestedBooks,
  getBorrowedBooks,
  returnBook,
} = require("../controllers/user.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

const router = Router();

router.route("/book-borrow/:id/request").post(isAuthenticated, requestToBorrow);
router.route("/books/:id/return").post(isAuthenticated, returnBook);
router.route("/requested-books").get(isAuthenticated, getRequestedBooks);
router.route("/borrowed-books").get(isAuthenticated, getBorrowedBooks);

module.exports = router;
