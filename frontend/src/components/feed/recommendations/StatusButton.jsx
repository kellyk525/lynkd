import { X, Check, Clock, UserPlus, UserCheck } from "lucide-react";

const StatusButton = ({
  className,
  buttonText,
  iconName,
  iconSize = 16,
  disabled = false,
  isLoading = false,
  ...rest
}) => {
  const icon = () => {
    switch (iconName) {
      case "x":
        return <X size={iconSize} className={buttonText && "mr-1"} />;
      case "check":
        return <Check size={iconSize} className={buttonText && "mr-1"} />;
      case "clock":
        return <Clock size={iconSize} className={buttonText && "mr-1"} />;
      case "userplus":
        return <UserPlus size={iconSize} className={buttonText && "mr-1"} />;
      case "usercheck":
        return <UserCheck size={iconSize} className={buttonText && "mr-1"} />;
      default:
        return null;
    }
  };

  return (
    <button
      className={`px-4 py-1 rounded-lg font-semibold flex items-center text-sm ${className}`}
      disabled={disabled}
      {...rest}
    >
      {!isLoading && icon()}
      {isLoading ? "Loading..." : buttonText}
    </button>
  );
};

export default StatusButton;
