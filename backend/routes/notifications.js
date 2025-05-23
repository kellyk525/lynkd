import express from "express";
import { protectRoute } from "../middleware/auth.js";
import {
  getUserNotifications,
  markNotificationAsRead,
  deleteNotification,
} from "../controllers/notifications.js";

const router = express.Router();
router.get("/", protectRoute, getUserNotifications);
router.put("/:id/read", protectRoute, markNotificationAsRead);
router.delete("/:id", protectRoute, deleteNotification);
export default router;
