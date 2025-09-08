const ViewBook = ({ book, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white rounded-md p-6 w-full max-w-md relative shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Book Details</h2>

        <div className="space-y-4 text-sm text-gray-700">
          <div>
            <span className="font-medium text-gray-900">Title:</span>
            <p>{book?.title || "N/A"}</p>
          </div>

          <div>
            <span className="font-medium text-gray-900">ISBN:</span>
            <p>{book?.isbn || "N/A"}</p>
          </div>

          <div>
            <span className="font-medium text-gray-900">Author:</span>
            <p>{book?.author?.username || book?.author || "Unknown"}</p>
          </div>

          <div>
            <span className="font-medium text-gray-900">Status:</span>
            <p
              className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                book?.availabilityStatus === "available"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {book?.availabilityStatus}
            </p>
          </div>

          <div>
            <span className="font-medium text-gray-900">Created At:</span>
            <p>{new Date(book?.createdAt).toLocaleString() || "N/A"}</p>
          </div>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-600 rounded-md hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
