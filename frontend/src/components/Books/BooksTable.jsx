import { useState } from "react";
import { toast } from "react-hot-toast";
import { useGetAllBooks } from "../../hooks/useBooks";
import ActionDropdown from "./ActionDropDown";
import { useAuth } from "../../context/AuthContex";

const BooksTable = () => {
  const { data: allBooks, isLoading, isError } = useGetAllBooks();
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();
  console.log(user?.id);

  const handleDelete = (id) => {
    toast.success(`Deleted book with ID: ${id}`);
  };

  const handleEdit = (id) => {
    toast.info(`Edit book with ID: ${id}`);
  };

  const handleView = (id) => {
    toast(`Viewing book with ID: ${id}`);
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
        <input
          type="text"
          placeholder="Search by title or author..."
          className="w-full sm:w-64 px-3 py-2 border rounded-md text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
                    onView={() => handleView(book?._id)}
                    onEdit={
                      user?.id === book.author?._id
                        ? () => handleEdit(book._id)
                        : undefined
                    }
                    onDelete={
                      user?.id === book.author?._id
                        ? () => handleDelete(book._id)
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
    </div>
  );
};

export default BooksTable;
