import ConnectionRequest from "../models/connectionRequest.js";
import Notification from "../models/notification.js";
import User from "../models/user.js";
import { sendConnectionAcceptedEmail } from "../emails/emailHandlers.js";

export const sendConnectionRequest = async (req, res) => {
  try {
    const { userId } = req.params;
    const senderId = req.user._id;

    if (senderId.toString() === userId) {
      return res
        .status(400)
        .json({ message: "You can't send a request to yourself" });
    }

    if (req.user.connections.includes(userId)) {
      return res.status(400).json({ message: "You are already connected" });
    }

    const existingRequest = await ConnectionRequest.findOne({
      sender: senderId,
      recipient: userId,
      status: "pending",
    });

    if (existingRequest)
      return res.status(400).json({ message: "A connection already exists" });

    const newRequest = new ConnectionRequest({
      sender: senderId,
      recipient: userId,
    });

    await newRequest.save();
    res.status(201).json({ message: "Connection request sent successfully" });
  } catch (error) {
    console.error("Error in sendConnectionRequest controller:", error);
    res.status(500).json({ message: "Interval Server Error" });
  }
};
export const acceptConnectionRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userId = req.user._id;

    const request = await ConnectionRequest.findById(requestId)
      .populate("sender", "name email username")
      .populate("recipient", "name username");

    if (!request) {
      return res.status(404).json({ message: "Connection request not found" });
    }

    // Check if the request is for the current user (user is the recipient)
    if (request.recipient._id.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to accept this request" });
    }

    if (request.status === "pending") {
      return res
        .status(400)
        .json({ message: "This request has already been processed" });
    }

    request.status = "accepted";
    await request.save();

    // Update 'connections' field for both sender/recipient
    await User.findByIdAndUpdate(request.sender._id, {
      $addToSet: { connections: userId },
    });
    await User.findByIdAndUpdate(userId, {
      $addToSet: { connections: request.sender._id },
    });

    // Send notification to the sender (inform on accepted connection request)
    const notification = new Notification({
      recipient: request.sender._id,
      type: "connectionAccepted",
      relatedUser: userId,
    });

    await notification.save();
    res.json({ message: "Connection accepted successfully" });

    const senderEmail = request.sender.email;
    const senderName = request.sender.name;
    const recipientName = request.recipient.name;
    const profileUrl =
      process.env.CLIENT_URL + "/profile/" + request.recipient.username;

    try {
      await sendConnectionAcceptedEmail(
        senderEmail,
        senderName,
        recipientName,
        profileUrl
      );
    } catch (error) {
      console.error("Error in sendConnectionAcceptedEmail:", error);
    }
  } catch (error) {
    console.error("Error in acceptConnectionRequest controller:", error);
    res.status(500).json({ message: "Interval Server Error" });
  }
};

export const rejectConnectionRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const userId = req.user._id;

    const request = await ConnectionRequest.findById(requestId);

    if (request.recipient.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to reject this request" });
    }

    if (request.status !== "pending") {
      return res
        .status(400)
        .json({ message: "This request has already been processed" });
    }

    request.status === "rejected";
    await request.save();

    res.json({ message: "Connection request rejected" });
  } catch (error) {
    console.error("Error in rejectConnectionRequest controller:", error);
    res.status(500).json({ message: "Interval Server Error" });
  }
};

export const getConnectionRequests = async (req, res) => {
  try {
    const userId = req.user._id;

    const requests = await ConnectionRequest.find({
      recipient: userId,
      status: "pending",
    }).populate("sender", "name, username profilePicture headline connections");

    res.status(200).json(requests);
  } catch (error) {
    console.error("Error in getConnectionRequests controller:", error);
    res.status(500).json({ message: "Interval Server Error" });
  }
};

export const getUserConnections = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).populate(
      "collections",
      "name username profilePicture headline connections"
    );

    res.json(user.connections);
  } catch (error) {
    console.error("Error in getUserConnections controller:", error);
    res.status(500).json({ message: "Interval Server Error" });
  }
};

export const removeConnection = async (req, res) => {
  try {
    const userId = req.user._id;
    const targetUserId = req.params.userId;

    await User.findByIdAndUpdate(userId, {
      $pull: {
        connections: targetUserId,
      },
    });
    await User.findByIdAndUpdate(targetUserId, {
      $pull: {
        connections: userId,
      },
    });

    res.status(200).json({ status: "Connection removed successfully" });
  } catch (error) {
    console.error("Error in removeConnection controller:", error);
    res.status(500).json({ message: "Interval Server Error" });
  }
};

export const getConnectionStatus = async (req, res) => {
  // checking for request status
  try {
    const targetUserId = req.params.userId;
    const userId = req.user._id;

    const user = req.user;
    if (user.connections.includes(targetUserId)) {
      return res.json({ status: "connected" });
    }

    const pendingRequest = await ConnectionRequest.findOne({
      $or: [
        { sender: userId, recipient: targetUserId },
        { sender: targetUserId, recipient: userId },
      ],
      status: "pending",
    });

    if (pendingRequest) {
      if (pendingRequest.sender.toString() === userId.toString()) {
        return res.json({ status: "pending" });
      } else {
        return res.json({ status: "received", requestId: pendingRequest._id });
      }
    }

    // If no connection or pending request was found
    res.json({ status: "not_connected" });
  } catch (error) {
    console.error("Error in getConnectionStatuscontroller:", error);
    res.status(500).json({ message: "Interval Server Error" });
  }
};
