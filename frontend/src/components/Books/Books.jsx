import React from "react";
import { useGetAllBorrowBooks, useReturnBook } from "../../hooks/useUser";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Books = () => {
  const { data, isLoading, isError } = useGetAllBorrowBooks();
  const borrowedBooks = data?.borrowedBooks || [];
  const { mutate: returnBook } = useReturnBook();
  const queryClient = useQueryClient();
  console.log(borrowedBooks);

  const handleReturn = (borrowId) => {
    returnBook({bookId:borrowId}, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["books"] });
        queryClient.invalidateQueries({
          queryKey: ["books", "all-borrow-book-requests"],
        });
        queryClient.invalidateQueries({
          queryKey: ["books", "all-borrow-books"],
        });
        toast.success(data.message || "Book added successfully!");
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Creation failed");
      },
    });
  };

  if (isLoading) return <div className="p-4">Loading borrowed books...</div>;
  if (isError)
    return (
      <div className="p-4 text-red-600">Failed to load borrowed books.</div>
    );

  if (borrowedBooks.length === 0) {
    return <div className="p-4 text-gray-600">No borrowed books found.</div>;
  }

  return (
    <div className="min-h-screen p-4  max-w-6xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Your Borrowed Books</h2>

      <div className="overflow-auto max-h-[70vh]">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">ISBN</th>
              <th className="p-3">Borrow Date</th>
              <th className="p-3">Due Date</th>
              <th className="p-3">Return Date</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="text-gray-800">
            {borrowedBooks.map((book) => (
              <tr
                key={book?._id}
                className="hover:bg-gray-50 transition-all border-b border-gray-100"
              >
                <td className="p-3">{book?.bookId?.title || "N/A"}</td>
                <td className="p-3">{book?.bookId?.isbn || "N/A"}</td>
                <td className="p-3">
                  {new Date(book?.borrowDate).toLocaleDateString()}
                </td>
                <td className="p-3">
                  {new Date(book?.dueDate).toLocaleDateString()}
                </td>
                <td className="p-3">
                  {book?.returnDate
                    ? new Date(book?.returnDate).toLocaleDateString()
                    : "Not returned"}
                </td>
                <td className="p-3 text-center">
                  {!book?.returnDate ? (
                    <button
                      onClick={() => handleReturn(book?.bookId?._id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                    >
                      Return
                    </button>
                  ) : (
                    <span className="text-green-600 font-semibold">
                      Returned
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Books;
