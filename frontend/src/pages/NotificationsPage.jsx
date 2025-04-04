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
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="col-span-1 lg:col-span-1">
        <Sidebar user={authUser} />
      </div>
      <div className="col-span-1 lg:col-span-3">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-6">Notifications</h1>

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
            <p>No notification at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
