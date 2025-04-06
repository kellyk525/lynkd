import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { logout, getCurrentUser } from "../../api/auth.js";
import { getNotifications } from "../../api/notifications.js";
import { getConnectionRequests } from "../../api/connections.js";

import LinkIcon from "../shared/LinkIcon";

const Navbar = () => {
  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: getCurrentUser,
  });
  const queryClient = useQueryClient();

  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => getNotifications(),
    enabled: !!authUser,
  });

  const { data: connectionRequests } = useQuery({
    queryKey: ["connectionRequests"],
    queryFn: () => getConnectionRequests(),
    enabled: !!authUser, // onlly call queryFn if we have the authenticated user
  });

  const { mutate: logoutMutation } = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] }); // refresh query/refetch this data on success
    },
  });

  const unreadNotificationCount = notifications?.data.filter(
    (notif) => !notif.read
  ).length;
  const unreadConnectionRequestsCount = connectionRequests?.data?.length;

  return (
    <nav className="bg-base-100 border-base-300 border-b-[1px] sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center">
              <img
                className="h-8 rounded mr-2.5"
                src="/small-logo.png"
                alt="LinkedIn"
              />
              <h2 className="font-semibold text-lg text-netural hover:text-lynkd transition-all duration-200">
                LYNKD
              </h2>
            </Link>
          </div>
          {authUser ? (
            <div className="flex items-center gap-2 md:gap-6">
              <LinkIcon to="/" iconName="home" text="Home" />
              <LinkIcon
                to="/network"
                iconName="users"
                text="My Network"
                counter={unreadConnectionRequestsCount}
              />
              <LinkIcon
                to="/notifications"
                iconName="bell"
                text="Notifications"
                counter={unreadNotificationCount}
              />
              <LinkIcon
                to={`/profile/${authUser.username}`}
                iconName="user"
                text="Me"
              />
              <button
                className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800"
                onClick={() => logoutMutation()}
              >
                <LogOut size={20} />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 md:gap-4">
              <Link
                to="/login"
                className="w-full flex justify-center py-2 px-4 rounded-lg bg-base-200 hover:bg-base-300 text-sm font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="w-full flex justify-center py-2 px-4 rounded-lg bg-secondary hover: text-white text-sm font-medium text-nowrap"
              >
                Join now
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
