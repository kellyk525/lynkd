import { Link } from "react-router-dom";
import { Home, UserPlus, Bell, User } from "lucide-react";

export default function Sidebar({ user }) {
  return (
    <div>
      <div className="card pb-5 border-b-[1px]">
        <div
          className="h-16 bg-cover bg-center rounded-t-2xl"
          style={{
            backgroundImage: `url("${user.bannerImg || "/banner.png"}")`,
          }}
        />
        <Link to={`/profile/${user.username}`}>
          <img
            src={user.profilePicture || "/avatar.png"}
            alt={user.username}
            className="w-20 h-20 ml-5 mt-[-40px] rounded-full border-[3px] border-base-100"
          />
          <h3 className="mt-1 ml-5 text-neutral text-xl font-semibold">
            {user.name}
          </h3>
        </Link>
        <p className="mt-1 ml-5 text-neutral text-xs">{user.headline}</p>
        <p className="mt-1 ml-5 text-gray-500 text-xs">
          {user.connections.length} connections
        </p>
      </div>
      <div className="card p-4 mt-2.5 font-semibold text-xs">
        <ul className="space-y-4">
          <li>
            <Link to="/" className="flex items-center hover:text-secondary">
              <Home className="mr-2" size={20} />
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/network"
              className="flex items-center hover:text-secondary"
            >
              <UserPlus className="mr-2" size={20} /> My Network
            </Link>
          </li>
          <li>
            <Link
              to="/notifications"
              className="flex items-center hover:text-secondary"
            >
              <Bell className="mr-2" size={20} /> Notifications
            </Link>
          </li>
          <li>
            <Link
              to={`/profile/${user.username}`}
              className="flex items-center hover:text-secondary"
            >
              <User className="mr-2" size={20} /> Profile
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
