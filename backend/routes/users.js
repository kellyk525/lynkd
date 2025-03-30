import express from "express";
import { protectRoute } from "../middleware/auth.js";
import {
  getSuggestedConnections,
  getPublicProfile,
  updateProfile,
} from "../controllers/users.js";

const router = express.Router();
router.get("/suggestions", protectRoute, getSuggestedConnections);
router.get("/:username", protectRoute, getPublicProfile);
router.put("/profile", protectRoute, updateProfile);

export default router;
