import { axiosInstance } from "../lib/axios.js";

// Recommended users outside of current user's connections
export const getRecommendedUsers = async () => {
  const res = await axiosInstance.get("/users/suggestions");
  return res.data;
};

export const getUserProfile = async (username) => {
  const res = await axiosInstance.get(`/users/${username}`);
  return res;
};

export const updateUserProfile = async (updatedUserData) => {
  await axiosInstance.put("/users/profile", updatedUserData);
};
