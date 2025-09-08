import { useMutation, useQuery } from "@tanstack/react-query";
import { userApi } from "../api/userApi";

export const useBorrowBookRequest = () => {
  return useMutation({
    mutationKey: ["books", "borrow-book-request"],
    mutationFn: userApi.borrowBookRequest,
  });
};

export const useGetAllborrowRequestedBooks = () => {
  return useQuery({
    queryKey: ["books", "all-borrow-book-requests"],
    queryFn: userApi.borrowRequestedBooks,
  });
};

export const useGetAllBorrowBooks = () => {
  return useQuery({
    queryKey: ["books", "all-borrow-books"],
    queryFn: userApi.getBorrowedBooks,
  });
};

export const useReturnBook = () => {
  return useMutation({
    mutationKey: ["books", "return-books"],
    mutationFn: userApi.returnBooks,
  });
};
