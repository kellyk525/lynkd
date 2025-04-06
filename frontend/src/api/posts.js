import { axiosInstance } from "../lib/axios.js";

// Get current user's posts, along with posts from user's connections
export const getPosts = async () => {
  const res = await axiosInstance.get("/posts");
  return res.data;
};

// Like current post
export const likePost = async (postId) => {
  await axiosInstance.post(`/posts/${postId}/like`);
};

// Delete post
export const deletePost = async (postId) => {
  await axiosInstance.delete(`/posts/delete/${postId}`);
};

// Create new post
export const createPost = async (postData) => {
  const res = await axiosInstance.post("/posts/create", postData, {
    headers: { "Content-Type": "application/json" },
  });
  return res.data;
};

// Create comment
export const createComment = async ({ comment, postId }) => {
  await axiosInstance.post(`/posts/${postId}/comment`, {
    content: comment,
  });
};
