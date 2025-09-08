const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isbn: {
      type: String,
    },
    availabilityStatus: {
      type: String,
      enum: ["available", "borrowed"],
      default: "available",
    },
  },

  { timestamps: true }
);
const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
