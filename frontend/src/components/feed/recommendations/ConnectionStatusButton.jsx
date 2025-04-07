import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import StatusButton from "./StatusButton.jsx";
import {
  getConnectionStatus,
  sendConnectionRequest,
  acceptConnectionRequest,
  rejectConnectionRequest,
} from "../../../api/connections.js";

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
      <StatusButton
        disabled={true}
        isLoading={true}
        className="text-gray-500 bg-gray-200"
      />
    );
  }

  const renderButton = () => {
    switch (connectionStatus?.data?.status) {
      case "pending":
        return (
          <StatusButton
            disabled={true}
            className="bg-yellow-500 text-white"
            iconName="clock"
            buttonText="Pending"
          />
        );
      case "received":
        return (
          <div className="flex gap-2 justify-center">
            <StatusButton
              iconName="check"
              className="bg-success hover:bg-green-600 text-white"
              onClick={() => acceptRequest(connectionStatus.data.requestId)}
            />
            <StatusButton
              iconName="x"
              className="bg-error hover:bg-red-600 text-white"
              onClick={() => rejectRequest(connectionStatus.data.requestId)}
            />
          </div>
        );
      case "connected":
        return (
          <StatusButton
            disabled={true}
            iconName="usercheck"
            buttonText="Connected"
            className="bg-green-500 text-white"
          />
        );
      default:
        return (
          <StatusButton
            onClick={handleConnect}
            buttonText="Connect"
            iconName="userplus"
            className="bg-secondary hover:bg-blue-600 text-white duration-200"
          />
        );
    }
  };

  return renderButton();
};

export default ConnectionStatusButton;
