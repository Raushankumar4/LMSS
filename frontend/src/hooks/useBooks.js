import { useQuery } from "@tanstack/react-query";
import { adminAPi } from "../api/adminApi";

export const useGetAllBooks = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: adminAPi.getAllBooks,
  });
};
