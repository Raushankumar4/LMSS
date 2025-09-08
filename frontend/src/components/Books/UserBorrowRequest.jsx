import React from "react";
import { useGetAllborrowRequestedBooks } from "../../hooks/useUser";
import { Link } from "react-router-dom";

const UserBorrowRequest = () => {
  const { data, isLoading, isError } = useGetAllborrowRequestedBooks();
  const requestedBooks = data?.requestedBooks || [];

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError) return <div className="p-4 text-red-600">Failed to load requests.</div>;

  return (
    <div className=" p-4 min-h-screen max-w-6xl mx-auto mt-6">
      <h2 className="text-lg font-semibold mb-4">My Borrow Requests</h2>

      {requestedBooks.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">You haven’t requested any books yet.</p>
          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Request Book
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">ISBN</th>
                <th className="p-3">Request Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {requestedBooks.map((req) => (
                <tr
                  key={req._id}
                  className="hover:bg-gray-50 transition-all border-b border-gray-100"
                >
                  <td className="p-3">{req.bookId?.title || "N/A"}</td>
                  <td className="p-3">{req.bookId?.isbn || "N/A"}</td>
                  <td className="p-3">
                    {new Date(req.requestDate).toLocaleDateString()}
                  </td>
                  <td className="p-3 capitalize">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        req.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : req.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserBorrowRequest;
