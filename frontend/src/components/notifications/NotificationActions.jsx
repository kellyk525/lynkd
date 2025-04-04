import toast from "react-hot-toast";
import { Trash2, Eye } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  deleteNotification,
  markNotificationAsRead,
} from "../../api/notifications.js";

const NotificationActions = ({ notification }) => {
  const queryClient = useQueryClient();

  const { mutate: markAsReadMutation } = useMutation({
    mutationFn: (notificationId) => markNotificationAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const { mutate: deleteNotificationMutation } = useMutation({
    mutationFn: (notificationId) => deleteNotification(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries(["notifications"]);
      toast.success("Notification deleted");
    },
  });

  return (
    <div className="flex gap-2">
      {!notification.read && (
        <button
          onClick={() => markAsReadMutation(notification._id)}
          className="p-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors"
          aria-label="Mark as read"
        >
          <Eye size={16} />
        </button>
      )}

      <button
        onClick={() => deleteNotificationMutation(notification._id)}
        className="p-1 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
        aria-label="Delete notification"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};

export default NotificationActions;
