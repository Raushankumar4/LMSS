import axiosInstance from "../axios/axiosInstance";

const authApi = {
  registerUser: async (formData) => {
    const { data } = await axiosInstance.post("/auth/register", formData);
    return data;
  },
  loginUser: async (formData) => {
    const { data } = await axiosInstance.post("/auth/login", formData);
    return data;
  },
};
export default authApi;
