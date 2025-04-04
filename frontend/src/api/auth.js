import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const getCurrentUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      return null;
    }
    toast.error(error.response.data.message || "Something went wrong");
  }
};

export const logout = async () => {
  await axiosInstance.post("/auth/logout");
};
