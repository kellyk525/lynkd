import { Link } from "react-router-dom";
import ConnectionStatusButton from "./ConnectionStatusButton.jsx";

const RecommendedUser = ({ user }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <Link
        to={`/profile/${user.username}`}
        className="flex items-center flex-grow"
      >
        <img
          src={user.profilePicture || "/avatar.png"}
          alt={user.name}
          className="w-12 h-12 rounded-full mr-3"
        />
        <div>
          <h3 className="text-sm text-neutral font-semibold">{user.name}</h3>
          <p className="text-xs text-gray-500">{user.headline}</p>
        </div>
      </Link>
      <ConnectionStatusButton user={user} />
    </div>
  );
};

export default RecommendedUser;
