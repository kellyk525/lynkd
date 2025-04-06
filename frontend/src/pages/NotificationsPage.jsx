import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/auth.js";
import { getNotifications } from "../api/notifications.js";

import Sidebar from "../components/Sidebar.jsx";
import Notification from "../components/notifications/Notification.jsx";

const NotificationsPage = () => {
  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: getCurrentUser,
  });

  const { data: notifications, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 py-6">
      <div className="col-span-1 lg:col-span-1">
        <Sidebar user={authUser} />
      </div>
      <div className="col-span-1 lg:col-span-3 card">
        <h1 className="text-base p-5 border-b">Notifications</h1>
        {isLoading ? (
          <p>Loading notifications...</p>
        ) : notifications && notifications.data.length > 0 ? (
          <ul>
            {notifications.data.map((notification) => (
              <Notification
                key={notification._id}
                notification={notification}
              />
            ))}
          </ul>
        ) : (
          <div className="p-6 flex justify-center items-center">
            <p>No notifications!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
