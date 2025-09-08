const Book = require("../models/book.model");
const asyncHandler = require("../utils/asyncHandler");

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


module.exports = { AddBook };
