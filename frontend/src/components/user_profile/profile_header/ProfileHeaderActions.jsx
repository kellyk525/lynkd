import toast from "react-hot-toast";
import { useMemo } from "react";
import { UserPlus, Clock, UserCheck, X } from "lucide-react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  getConnectionStatus,
  sendConnectionRequest,
  acceptConnectionRequest,
  rejectConnectionRequest,
} from "../../../api/connections.js";

const EditProfileActions = ({
  isOwnProfile,
  isConnected,
  isEditing,
  setIsEditing,
  onSave,
  targetUserId,
}) => {
  const queryClient = useQueryClient();

  const { data: connectionStatus, refetch: refetchConnectionStatus } = useQuery(
    {
      queryKey: ["connectionStatus", targetUserId],
      queryFn: () => getConnectionStatus(targetUserId),
      enabled: !isOwnProfile,
    }
  );

  const handleConnectionMutation = (successMessage) => {
    toast.success(successMessage);
    refetchConnectionStatus();
    queryClient.invalidateQueries(["connectionRequests"]);
  };

  const { mutate: sendConnectionRequestMutation } = useMutation({
    mutationFn: (targetUserId) => sendConnectionRequest(targetUserId),
    onSuccess: () =>
      handleConnectionMutation("Connection request sent successfully"),
    onError: (error) => {
      toast.error(error.response?.data?.error || "An error occurred");
    },
  });

  const { mutate: acceptRequest } = useMutation({
    mutationFn: (requestId) => acceptConnectionRequest(requestId),
    onSuccess: () => handleConnectionMutation("Connection request accepted"),
    onError: (error) => {
      toast.error(error.response?.data?.error || "An error occurred");
    },
  });

  const { mutate: rejectRequest } = useMutation({
    mutationFn: (requestId) => rejectConnectionRequest(requestId),
    onSuccess: () => handleConnectionMutation("Connection request rejected"),
    onError: (error) => {
      toast.error(error.response?.data?.error || "An error occurred");
    },
  });

  const { mutate: removeConnection } = useMutation({
    mutationFn: (userId) => removeConnection(userId),
    onSuccess: () => handleConnectionMutation("Connection removed"),
    onError: (error) => {
      toast.error(error.response?.data?.message || "An error occurred");
    },
  });

  const userConnectionStatus = useMemo(() => {
    if (isConnected) return "connected";
    return connectionStatus?.data?.status;
  }, [isConnected, connectionStatus]);

  const renderConnectionButton = () => {
    const baseClass =
      "text-white py-2 px-4 rounded-full transition duration-300 flex items-center justify-center";
    switch (userConnectionStatus) {
      case "connected":
        return (
          <div className="flex gap-2 justify-center">
            <div className={`${baseClass} bg-green-500 hover:bg-green-600`}>
              <UserCheck size={20} className="mr-2" />
              Connected
            </div>
            <button
              className={`${baseClass} bg-red-500 hover:bg-red-600 text-sm`}
              onClick={() => removeConnection(targetUserId)}
            >
              <X size={20} className="mr-2" />
              Remove Connection
            </button>
          </div>
        );

      case "pending":
        return (
          <button className={`${baseClass} bg-yellow-500 hover:bg-yellow-600`}>
            <Clock size={20} className="mr-2" />
            Pending
          </button>
        );

      case "received":
        return (
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => acceptRequest(connectionStatus.data.requestId)}
              className={`${baseClass} bg-green-500 hover:bg-green-600`}
            >
              Accept
            </button>
            <button
              onClick={() => rejectRequest(connectionStatus.data.requestId)}
              className={`${baseClass} bg-red-500 hover:bg-red-600`}
            >
              Reject
            </button>
          </div>
        );
      default:
        return (
          <button
            onClick={() => sendConnectionRequestMutation(targetUserId)}
            className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-full transition duration-300 flex items-center justify-center"
          >
            <UserPlus size={20} className="mr-2" />
            Connect
          </button>
        );
    }
  };

  return (
    <>
      {isOwnProfile ? (
        isEditing ? (
          <button
            className="w-full bg-primary text-white py-2 px-4 rounded-full hover:bg-primary-dark
                               transition duration-300"
            onClick={onSave}
          >
            Save Profile
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="w-full bg-primary text-white py-2 px-4 rounded-full hover:bg-primary-dark
                               transition duration-300"
          >
            Edit Profile
          </button>
        )
      ) : (
        <div className="flex justify-center">{renderConnectionButton()}</div>
      )}
    </>
  );
};

export default EditProfileActions;
