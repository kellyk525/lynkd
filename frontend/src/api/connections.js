import { axiosInstance } from "../lib/axios.js";

// Get all connection request invites from other users
export const getConnectionRequests = async () => {
  const res = await axiosInstance.get("/connections/requests");
  return res;
};

// Get current logged in user's active connections (connected users)
export const getActiveConnections = async () => {
  const res = await axiosInstance.get("/connections");
  return res;
};

// Check if there is a connection request between current user and target user
// Returns the current status of the connection request (accepted, pending, received, not_connected)
export const getConnectionStatus = async (targetUserId) => {
  const res = await axiosInstance.get(`/connections/status/${targetUserId}`);
  return res;
};

// Send connection request
export const sendConnectionRequest = async (targetUserId) => {
  await axiosInstance.post(`/connections/request/${targetUserId}`);
};

// Accept connection request
export const acceptConnectionRequest = async (requestId) => {
  await axiosInstance.put(`/connections/accept/${requestId}`);
};

// Reject connection request
export const rejectConnectionRequest = async (requestId) => {
  await axiosInstance.put(`/connections/reject/${requestId}`);
};

// Remove connection between users
export const removeConnection = async (targetUserId) => {
  await axiosInstance.delete(`/connections/${targetUserId}`);
};
