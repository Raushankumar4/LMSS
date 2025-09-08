import { useMutation } from "@tanstack/react-query";
import authApi from "../api/authApi";

export const useRegisterUser = () => {
  return useMutation({
    mutationKey: ["auth", "register"],
    mutationFn: authApi.registerUser,
  });
};
export const useLoginUser = () => {
  return useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: authApi.loginUser,
  });
};
