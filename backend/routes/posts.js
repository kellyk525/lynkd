import express from "express";
import { protectRoute } from "../middleware/auth.js";
import {
  getFeedPosts,
  createPost,
  deletePost,
  getPostById,
  createComment,
  likePost,
  updatePost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", protectRoute, getFeedPosts);
router.post("/create", protectRoute, createPost);
router.delete("/delete/:id", protectRoute, deletePost);
router.get("/:id", protectRoute, getPostById);
router.post("/:id/comment", protectRoute, createComment);
router.post("/:id/like", protectRoute, likePost);
router.put("/:postId", protectRoute, updatePost);

export default router;
