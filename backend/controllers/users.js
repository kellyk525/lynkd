import User from "../models/user.js";

export const getSuggestedConnections = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id).select("connections");

    // Find users who are not already connected, including the user
    // 1. Select all documents where id does not equal to current user ID.
    // 2. Select all documents where id does not equal the user IDs in currentUser.connections
    const suggestedUsers = await User.find({
      _id: {
        $ne: req.user._id,
        $nin: currentUser.connections,
      },
    })
      .select("name username profilePicture headline")
      .limit(3);

    res.json(suggestedUsers);
  } catch (error) {
    console.error("Error in getSuggestedConnections controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPublicProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error in getPublicProfile controller", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "username",
      "headline",
      "about",
      "location",
      "profilePicture",
      "bannerImg",
      "skills",
      "experience",
      "education",
    ];

    const updatedData = {};
    for (const field of allowedFields) {
      if (req.body[field]) updatedData[field] = req.body[field];
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updatedData },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (error) {
    console.error("Error in updateProfile controller", error);
    res.status(500).json({ message: "Server error" });
  }
};
