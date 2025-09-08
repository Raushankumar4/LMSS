const Book = require("../models/book.model");
const asyncHandler = require("../utils/asyncHandler");
const userModel = require("../models/user.model");
const BorrowRequest = require("../models/barrowRequest.model");

const AddBook = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const { title, isbn } = req.body;

  if (!userId) {
    return res.status(404).json({ message: "User Not Found!", success: false });
  }

  if (!title || !isbn) {
    return res.status(400).json({ message: "All fields are required." });
  }
  const existingBook = await Book.findOne({ isbn });
  if (existingBook) {
    return res
      .status(400)
      .json({ message: "Book with this ISBN already exists." });
  }
  const newBook = new Book({ title, author: userId, isbn });
  await newBook.save();

  return res.status(201).json({
    success: true,
    message: "Book created successfully",
    book: newBook,
  });
});

const UpdateBook = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const bookId = req.params.id;

  const { title, isbn } = req.body;

  if (!userId) {
    return res.status(404).json({ message: "User Not Found!", success: false });
  }

  const book = await Book.findById(bookId);
  if (!book) {
    return res.status(404).json({ message: "Book not found", success: false });
  }

  //  if the user is the author (owner)
  if (book.author.toString() !== userId.toString()) {
    return res
      .status(403)
      .json({ message: "Not authorized to update this book" });
  }

  // prevent duplicate ISBNs if changed
  if (isbn && isbn !== book.isbn) {
    const existingBook = await Book.findOne({ isbn });
    if (existingBook) {
      return res
        .status(400)
        .json({ message: "Another book with this ISBN already exists." });
    }
    book.isbn = isbn;
  }

  if (title) book.title = title;

  await book.save();

  return res.status(200).json({
    success: true,
    message: "Book updated successfully",
    book,
  });
});

const DeleteBook = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const bookId = req.params.id;

  if (!userId) {
    return res.status(404).json({ message: "User Not Found!", success: false });
  }

  const book = await Book.findById(bookId);
  if (!book) {
    return res.status(404).json({ message: "Book not found", success: false });
  }

  // only allow author/admin to delete
  if (book.author.toString() !== userId.toString()) {
    return res
      .status(403)
      .json({ message: "Not authorized to delete this book" });
  }

  // Delete the book
  await book.deleteOne();

  // Remove book references from users' borrowedBooks array
  await userModel.updateMany(
    { "borrowedBooks.bookId": bookId },
    { $pull: { borrowedBooks: { bookId: bookId } } }
  );

  return res.status(200).json({
    success: true,
    message:
      "Book deleted successfully and removed from all users' borrowedBooks",
  });
});

const approveBorrowRequest = asyncHandler(async (req, res) => {
  const requestId = req.params.id;

  const request = await BorrowRequest.findById(requestId);
  if (!request || request.status !== "pending") {
    return res.status(404).json({ error: "Pending request not found" });
  }

  const book = await Book.findById(request.bookId);
  if (!book || book.length < 1) {
    return res.status(400).json({ error: "Book not available" });
  }

  const user = await userModel.findById(request.userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  // Check if already borrowed
  const alreadyBorrowed = user.borrowedBooks.some(
    (borrow) =>
      borrow.bookId.toString() === book._id.toString() && !borrow.returnDate
  );
  if (alreadyBorrowed) {
    return res.status(400).json({ error: "User already borrowed this book" });
  }

  // Add to user's borrowedBooks
  const borrowDate = new Date();
  const dueDate = new Date();
  dueDate.setDate(borrowDate.getDate() + 14);

  user.borrowedBooks.push({
    bookId: book._id,
    borrowDate,
    dueDate,
    returnDate: null,
  });

  await user.save();

  // Update request status
  request.status = "approved";
  await request.save();

  res.json({ message: "Borrow request approved and book borrowed", dueDate });
});

const getAllBorrowRequests = asyncHandler(async (req, res) => {
  const requests = await BorrowRequest.find()
    .populate("userId", "username email")
    .populate("bookId", "title isbn author")
    .sort({ requestDate: -1 });

  res.status(200).json({
    message: "All borrow requests",
    requests,
  });
});

const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find().populate("author", "username");
  return res.status(200).json({ message: "All Books", books });
});

module.exports = {
  AddBook,
  DeleteBook,
  approveBorrowRequest,
  UpdateBook,
  getBooks,
  getAllBorrowRequests,
};
