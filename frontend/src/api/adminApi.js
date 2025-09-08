import axiosInstance from "../axios/axiosInstance";

export const adminAPi = {
  addBook: async (formData) => {
    const { data } = await axiosInstance.post("/admin/add-book", formData);
    return data;
  },
  deleteBook: async (bookId) => {
    const { data } = await axiosInstance.delete(`/admin/books/${bookId}`);
    return data;
  },
  updateBook: async (bookId, formData) => {
    const { data } = await axiosInstance.put(
      `/admin/books/${bookId}`,
      formData
    );
    return data;
  },
  getAllBooks: async () => {
    const { data } = await axiosInstance.get("/admin/books");
    return data;
  },
  getAllBorrowRequestsBooks: async () => {
    const { data } = await axiosInstance.get("/admin/borrow-requests");
    return data;
  },
  approveBorrowRequestedBook: async (borrowRequestId) => {
    const { data } = await axiosInstance.put(
      `/admin/borrow-requests/${borrowRequestId}/approve`
    );
    return data;
  },
};
