import { Link } from "react-router-dom";
import { Bell, User, Users, Home } from "lucide-react";

const LinkIcon = ({ to, counter = 0, iconName, iconSize = 20, text }) => {
  const icon = () => {
    switch (iconName) {
      case "bell":
        return <Bell size={iconSize} />;
      case "user":
        return <User size={iconSize} />;
      case "users":
        return <Users size={iconSize} />;
      case "home":
        return <Home size={iconSize} />;
      default:
        return;
    }
  };

  return (
    <Link to={to} className="text-neutral flex flex-col items-center relative">
      {icon()}
      <span className="text-xs hidden md:block">{text}</span>
      {counter > 0 ? (
        <span
          className="absolute -top-1 -right-1 md:right-4 bg-blue-500 text-white text-xs 
                  rounded-full size-3 md:size-4 flex items-center justify-center"
        >
          {counter}
        </span>
      ) : null}
    </Link>
  );
};

export default LinkIcon;
