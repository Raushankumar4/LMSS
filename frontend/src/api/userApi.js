import axiosInstance from "../axios/axiosInstance";

export const userApi = {
  borrowBookRequest: async (bookId) => {
    const { data } = await axiosInstance.post(
      `/user/book-borrow/${bookId}/request`
    );
    return data;
  },
  borrowRequestedBooks: async () => {
    const { data } = await axiosInstance.get("/user/requested-books");
    return data;
  },
  getBorrowedBooks: async () => {
    const { data } = await axiosInstance.get("/user/borrowed-books");
    return data;
  },
  returnBooks: async (bookId) => {
    const { data } = await axiosInstance.post(`/user/books/${bookId}/return`);
    return data;
  },
};
