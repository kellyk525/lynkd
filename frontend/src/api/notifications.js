import { axiosInstance } from "../lib/axios.js";

// Get all notifications for current user (post likes, comments, connections)
export const getNotifications = async () => {
  const res = await axiosInstance.get("/notifications");
  return res;
};

// Mark notification as read
export const markNotificationAsRead = async (notificationId) => {
  await axiosInstance.put(`/notifications/${notificationId}/read`);
};

// Delete notification
export const deleteNotification = async (notificationId) => {
  await axiosInstance.delete(`/notifications/${notificationId}`);
};
