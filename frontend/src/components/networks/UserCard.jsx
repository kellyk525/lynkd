import { Link } from "react-router-dom";

function UserCard({ user, isConnection }) {
  return (
    <div className="card p-4 flex flex-col items-center hover:border-2 hover:border-gray-400 transition-all">
      <Link
        to={`/profile/${user.username}`}
        className="flex flex-col items-center"
      >
        <img
          src={user.profilePicture || "/avatar.png"}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover mb-3"
        />
        <h3 className="font-semibold text-base text-center">{user.name}</h3>
      </Link>
      <p className="text-sm text-gray-600 text-center">{user.headline}</p>
      <p className="text-xs text-gray-500 mt-6">
        {user.connections?.length} connections
      </p>
      <button
        className="bg-secondary text-white mt-2.5 px-4 py-2 rounded-lg w-full"
        disabled
      >
        {isConnection ? "Connected" : "Connect"}
      </button>
    </div>
  );
}

export default UserCard;
