const { Router } = require("express");
const isAuthenticated = require("../middlewares/isAuthenticated");
const {
  AddBook,
  getBooks,
  approveBorrowRequest,
  getAllBorrowRequests,
  DeleteBook,
  UpdateBook,
} = require("../controllers/admin.controller");
const isAdmin = require("../middlewares/isAdmin");

const router = Router();

router.route("/add-book").post(isAuthenticated, isAdmin, AddBook);
router.route("/books/:id").put(isAuthenticated, isAdmin, UpdateBook);
router.route("/books/:id").delete(isAuthenticated, isAdmin, DeleteBook);
router.route("/books").get(isAuthenticated, getBooks);
router.route("/borrow-requests").get(isAuthenticated, getAllBorrowRequests);
router.route("/borrow-requests/:id/approve").put(isAuthenticated, isAdmin, approveBorrowRequest);

module.exports = router;
