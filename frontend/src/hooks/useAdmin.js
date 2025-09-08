import { useMutation, useQuery } from "@tanstack/react-query";
import { adminAPi } from "../api/adminApi";

export const useAddBook = () => {
  return useMutation({
    mutationKey: ["books", "create"],
    mutationFn: ({ formData }) => adminAPi.addBook(formData),
  });
};
export const useDeleteBook = () => {
  return useMutation({
    mutationKey: ["books", "delete"],
    mutationFn: adminAPi.deleteBook,
  });
};

export const useUpdateBook = () => {
  return useMutation({
    mutationKey: ["books", "update"],
    mutationFn: ({ bookId, formData }) => adminAPi.updateBook(bookId, formData),
  });
};
export const useGetAllBorrowRequestsBooks = () => {
  return useQuery({
    queryKey: ["books", "BorrowRequestsBooks"],
    queryFn: adminAPi.getAllBorrowRequestsBooks,
  });
};

export const useApproveBorrowRequest = () => {
  return useMutation({
    mutationKey: ["books", "approve"],
    mutationFn: ({ borrowRequestId }) =>
      adminAPi.approveBorrowRequestedBook(borrowRequestId),
  });
};
