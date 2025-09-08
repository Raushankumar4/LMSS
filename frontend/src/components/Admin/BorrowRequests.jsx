
import { useGetAllBorrowRequestsBooks } from "../../hooks/useAdmin";

const BorrowRequests = () => {
  const { data, isLoading, isError } = useGetAllBorrowRequestsBooks();
  const requests = data?.requests || [];

  if (isLoading) return <div className="p-4">Loading borrow requests...</div>;
  if (isError) return <div className="p-4 text-red-500">Failed to load borrow requests.</div>;

  return (
    <div className="p-6 min-h-screen shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">📚 Borrow Requests</h2>

      {requests.length === 0 ? (
        <p className="text-gray-500">No borrow requests found.</p>
      ) : (
        <div className="overflow-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3 text-left">Request ID</th>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Book</th>
                <th className="px-4 py-3 text-left">ISBN</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Request Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {requests.map((request) => (
                <tr key={request._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-3 font-mono text-xs text-gray-600">
                    {request._id.slice(0, 6).toUpperCase()}
                  </td>
                  <td className="px-4 py-3">{request.userId?.username || "N/A"}</td>
                  <td className="px-4 py-3">{request.userId?.email || "N/A"}</td>
                  <td className="px-4 py-3">{request.bookId?.title || "N/A"}</td>
                  <td className="px-4 py-3">{request.bookId?.isbn || "N/A"}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold capitalize ${
                          request.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : request.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {request.status}
                      </span>

                      {request.status !== "approved" && (
                        <button
                          onClick={() => {
                            // 🔧 Your logic to approve here
                            console.log("Approving request:", request._id);
                          }}
                          className="text-xs text-blue-600 border border-blue-600 px-2 py-0.5 rounded hover:bg-blue-50 transition"
                        >
                          Approve
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(request.requestDate).toLocaleString()}
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

export default BorrowRequests;
