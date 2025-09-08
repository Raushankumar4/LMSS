const asyncHandler = require("../utils/asyncHandler");
const BorrowRequest = require("../models/barrowRequest.model");
const Book = require("../models/book.model");
const userModel = require("../models/user.model");

const requestToBorrow = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const bookId = req.params.id;

  const existingRequest = await BorrowRequest.findOne({
    userId,
    bookId,
    status: "pending",
  });
  if (existingRequest) {
    return res.status(400).json({ error: "Request already pending" });
  }

  const request = new BorrowRequest({ userId, bookId });
  await request.save();

  res
    .status(201)
    .json({ message: "Borrow request submitted for admin approval" });
});

const returnBook = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const bookId = req.params.id;

  const book = await Book.findById(bookId);
  if (!book) return res.status(404).json({ error: "Book not found" });

  const user = await userModel.findById(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  // Find the borrow entry
  const borrowEntry = user.borrowedBooks.find(
    (borrow) => borrow.bookId.toString() === bookId && !borrow.returnDate
  );

  if (!borrowEntry) {
    return res
      .status(400)
      .json({ error: "This book is not currently borrowed by the user" });
  }

  // Set return date
  borrowEntry.returnDate = new Date();

  // Save changes
  await book.save();
  await user.save();

  res.json({
    message: "Book returned successfully",
    returnDate: borrowEntry.returnDate,
  });
});

const getRequestedBooks = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const requests = await BorrowRequest.find({
    userId,
    status: "pending",
  }).populate("bookId", "title author isbn");

  res.status(200).json({
    message: "Requested books (pending approval)",
    requestedBooks: requests,
  });
});

const getBorrowedBooks = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const user = await userModel
    .findById(userId)
    .populate("borrowedBooks.bookId", "title author isbn");
  if (!user) return res.status(404).json({ error: "User not found" });

  const activeBorrows = user.borrowedBooks.filter((b) => !b.returnDate);

  res.status(200).json({
    message: "Borrowed books",
    borrowedBooks: activeBorrows,
  });
});

module.exports = {
  requestToBorrow,
  returnBook,
  getRequestedBooks,
  getBorrowedBooks,
};
