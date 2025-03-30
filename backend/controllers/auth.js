import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";

export const signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, username, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    // set jwt token in the cookie
    res.cookie("jwt-lynkd", token, {
      httpOnly: true, // prevent XSS attack (cross-site scripting), doesn't allow users to access this cookie with JS (it is 'httpOnly')
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in ms
      sameSite: "strict", // prevents CSRF attacks
      secure: process.env.NODE_ENV === "production", // prevents man-in-the-middle attacks
    });

    res.status(201).json({ message: "User registered successfully" });

    // Set up welcome email notification
    const profileUrl = process.env.CLIENT_URL + "/profile/" + user.username;
    try {
      await sendWelcomeEmail(user.email, user.name, profileUrl);
      // pass profile url, which allows users to access profile page from welcome email
    } catch (emailError) {
      console.error("Error sending welcome email", emailError);
    }
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    await res.cookie("jwt-lynkd", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.json({ message: "Logged in successfully" });
  } catch (error) {
    console.error("Error in login controller: ", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("jwt-lynkd");
  res.json({ message: "Logged out successfully" });
};

export const getCurrentUser = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.error("Error in getCurrentUser controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};
