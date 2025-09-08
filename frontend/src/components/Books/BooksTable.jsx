import { useState } from "react";
import { toast } from "react-hot-toast";
import { useGetAllBooks } from "../../hooks/useBooks";
import ActionDropdown from "./ActionDropDown";
import { useAuth } from "../../context/AuthContex";
import AddBook from "../Admin/AddBook";
import { useDeleteBook } from "../../hooks/useAdmin";
import { useQueryClient } from "@tanstack/react-query";
import UpdateBook from "../Admin/UpdateBook";
import ViewBook from "./ViewBook";
import { useBorrowBookRequest } from "../../hooks/useUser";

const BooksTable = () => {
  const { data: allBooks, isLoading, isError } = useGetAllBooks();
  const { mutate: deleteBook } = useDeleteBook();
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();
  const [isUpdateModelOpen, setIsUpdateModelOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectToUpdate, setIsSelectToUpdate] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: borrowBook } = useBorrowBookRequest();

  const handleDelete = (id) => {
    deleteBook(id, {
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["books"] });
        toast.success(data?.message || "Book Deleted");
        reset();
        onClose();
      },
    });
  };

  const handleEdit = (book) => {
    setIsSelectToUpdate(book);
    setIsModalOpen(true);
  };

  const handleView = (book) => {
    setSelectedBook(book);
    setIsViewModalOpen(true);
  };

  const handleBorrow = (id) => {
    borrowBook(id, {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error(
          error?.response?.data?.message ||
            "Already Requested Please wait for admin approvel"
        );
      },
    });
  };

  if (isLoading) return <div>Loading books...</div>;
  if (isError) return <div>Failed to load books.</div>;

  const books = allBooks?.books || [];

  const filteredBooks = books.filter((book) =>
    `${book.title} ${book.author?.username || ""}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
        <h2 className="text-lg font-semibold">Books List</h2>
        <div className="space-x-4">
          {user?.role === "Admin" ? (
            <button
              onClick={() => setIsUpdateModelOpen(true)}
              className="py-1 px-4 bg-blue-500 text-white rounded"
            >
              + Add Book
            </button>
          ) : (
            <button
              onClick={() => toast.success("Request Send!")}
              className="py-1 px-4 bg-blue-500 text-white rounded"
            >
              Request Admin to Add Book
            </button>
          )}
          <input
            type="text"
            placeholder="Search by title or author..."
            className="w-full sm:w-64 px-3 py-2 border rounded-md text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="h-screen overflow-auto">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="p-3">Book ID</th>
              <th className="p-3">Title</th>
              <th className="p-3">Author</th>
              <th className="p-3">ISBN</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {filteredBooks.map((book) => (
              <tr
                key={book._id}
                className="hover:bg-gray-50 transition-all border-b border-gray-100"
              >
                <td className="p-3 font-mono text-xs">
                  {`B-${book._id.slice(0, 4).toUpperCase()}`}
                </td>
                <td className="p-3">{book.title}</td>
                <td className="p-3">{book.author?.username || "Unknown"}</td>
                <td className="p-3">{book.isbn}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      book.availabilityStatus === "available"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {book.availabilityStatus}
                  </span>
                </td>
                <td className="p-3 text-center">
                  <ActionDropdown
                    onView={() => handleView(book)}
                    onEdit={
                      user?.id === book.author?._id
                        ? () => handleEdit(book)
                        : undefined
                    }
                    onDelete={
                      user?.id === book.author?._id
                        ? () => handleDelete(book._id)
                        : undefined
                    }
                    onBorrow={
                      user?.id !== book.author?._id &&
                      book.availabilityStatus === "available"
                        ? () => handleBorrow(book._id)
                        : undefined
                    }
                  />
                </td>
              </tr>
            ))}

            {filteredBooks.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isUpdateModelOpen && (
        <AddBook onClose={() => setIsUpdateModelOpen(false)} />
      )}
      {isModalOpen && isSelectToUpdate && (
        <UpdateBook
          book={isSelectToUpdate}
          onClose={() => {
            setIsModalOpen(false);
            setIsSelectToUpdate(null);
          }}
        />
      )}
      {isViewModalOpen && selectedBook && (
        <ViewBook
          book={selectedBook}
          onClose={() => {
            setIsViewModalOpen(false);
            setSelectedBook(null);
          }}
        />
      )}
    </div>
  );
};

export default BooksTable;
