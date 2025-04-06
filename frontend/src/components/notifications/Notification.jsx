import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ThumbsUp, MessageSquare, UserPlus, ExternalLink } from "lucide-react";
import NotificationActions from "./NotificationActions.jsx";

const Notification = ({ notification }) => {
  const renderNotificationIcon = (type) => {
    switch (type) {
      case "like":
        return <ThumbsUp className="text-blue-500" />;
      case "comment":
        return <MessageSquare className="text-green-500" />;
      case "connectionAccepted":
        return <UserPlus className="text-purple-500" />;
      default:
        return null;
    }
  };

  const renderNotificationContent = (notification) => {
    switch (notification.type) {
      case "like":
        return (
          <span>
            <strong>{notification.relatedUser.name}</strong> liked your post
          </span>
        );
      case "comment":
        return (
          <span>
            <Link
              to={`/profile/${notification.relatedUser.username}`}
              className="font-bold"
            >
              {notification.relatedUser.name}
            </Link>{" "}
            commented on your post
          </span>
        );
      case "connectionAccepted":
        return (
          <span>
            <Link
              to={`/profile/${notification.relatedUser.username}`}
              className="font-bold"
            >
              {notification.relatedUser.name}
            </Link>{" "}
            accepted your connection request
          </span>
        );
      default:
        return null;
    }
  };

  const renderRelatedPost = (relatedPost) => {
    if (!relatedPost) return null;

    return (
      <Link
        to={`/post/${relatedPost._id}`}
        className="mt-2 p-2 bg-gray-50 rounded-lg flex items-center space-x-2 hover:bg-gray-100 transition-colors"
      >
        {relatedPost.image && (
          <img
            src={relatedPost.image}
            alt="Post preview"
            className="w-10 h-10 object-cover rounded"
          />
        )}
        <div className="flex-1 overflow-hidden">
          <p className="text-sm text-gray-600 truncate">
            {relatedPost.content}
          </p>
        </div>
        <ExternalLink size={14} className="text-gray-400" />
      </Link>
    );
  };

  return (
    <li
      key={notification._id}
      className={`border-b p-4 transition-all ${
        !notification.read ? "bg-blue-200 hover:bg-blue-300" : "bg-white"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <Link to={`/profile/${notification.relatedUser.username}`}>
            <img
              src={notification.relatedUser.profilePicture || "/avatar.png"}
              alt={notification.relatedUser.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <div className="p-1 bg-gray-100 rounded-full">
                {renderNotificationIcon(notification.type)}
              </div>
              <p className="text-sm">
                {renderNotificationContent(notification)}
              </p>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {formatDistanceToNow(new Date(notification.createdAt), {
                addSuffix: true,
              })}
            </p>
            {renderRelatedPost(notification.relatedPost)}
          </div>
        </div>
        <NotificationActions notification={notification} />
      </div>
    </li>
  );
};
export default Notification;
