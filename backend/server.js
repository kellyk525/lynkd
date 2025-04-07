import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import notificationRoutes from "./routes/notifications.js";
import connectionRoutes from "./routes/connections.js";

import { connectDB } from "./lib/db.js";

dotenv.config(); // call the dotenv config to be able to read env file

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

if (process.env.NODE_ENV !== "production") {
  const corsOrigin = {
    origin: "http://localhost:5173",
    credentials: true,
    optionSuccessStatus: 200,
  };
  app.use(cors(corsOrigin));
}
app.use(express.json({ limit: "5mb" }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/connections", connectionRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
