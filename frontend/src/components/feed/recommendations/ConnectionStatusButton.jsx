import {
  getConnectionStatus,
  sendConnectionRequest,
  acceptConnectionRequest,
  rejectConnectionRequest,
} from "../../../api/connections.js";
import { Clock, Check, X, UserCheck, UserPlus } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const ConnectionStatusButton = ({ user }) => {
  const queryClient = useQueryClient();
  const { data: connectionStatus, isLoading } = useQuery({
    queryKey: ["connectionStatus", user._id],
    queryFn: () => getConnectionStatus(user._id),
  });

  const { mutate: sendConnRequest } = useMutation({
    mutationFn: (targetUserId) => sendConnectionRequest(targetUserId),
    onSuccess: () => {
      queryClient.invalidateQueries([
        { queryKey: ["connectionStatus", user._id] },
      ]);
      toast.success("Connection request sent successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "An error occurred");
    },
  });

  const { mutate: acceptRequest } = useMutation({
    mutationFn: (requestId) => acceptConnectionRequest(requestId),
    onSuccess: () => {
      toast.success("Connection request accepted");
      queryClient.invalidateQueries({
        queryKey: ["connectionStatus", user._id],
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "An error occurred");
    },
  });

  const { mutate: rejectRequest } = useMutation({
    mutationFn: (requestId) => rejectConnectionRequest(requestId),
    onSuccess: () => {
      toast.success("Connection request rejected");
      queryClient.invalidateQueries({
        queryKey: ["connectionStatus", user._id],
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "An error occurred");
    },
  });

  const handleConnect = () => {
    if (connectionStatus?.data?.status === "not_connected") {
      sendConnRequest(user._id);
    }
  };

  if (isLoading) {
    return (
      <button
        className="px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-500"
        disabled
      >
        Loading...
      </button>
    );
  }

  const renderButton = () => {
    switch (connectionStatus?.data?.status) {
      case "pending":
        return (
          <button
            className="px-3 py-1 rounded-full text-sm bg-yellow-500 text-white flex items-center"
            disabled
          >
            <Clock size={16} className="mr-1" />
            Pending
          </button>
        );
      case "received":
        return (
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => acceptRequest(connectionStatus.data.requestId)}
              className={`rounded-full p-1 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white`}
            >
              <Check size={16} />
            </button>
            <button
              onClick={() => rejectRequest(connectionStatus.data.requestId)}
              className={`rounded-full p-1 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white`}
            >
              <X size={16} />
            </button>
          </div>
        );
      case "connected":
        return (
          <button
            className="px-3 py-1 rounded-full text-sm bg-green-500 text-white flex items-center"
            disabled
          >
            <UserCheck size={16} className="mr-1" />
            Connected
          </button>
        );
      default:
        return (
          <button
            className="px-3 py-1 rounded-full text-sm border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-200 flex items-center"
            onClick={handleConnect}
          >
            <UserPlus size={16} className="mr-1" />
            Connect
          </button>
        );
    }
  };

  return renderButton();
};

export default ConnectionStatusButton;
