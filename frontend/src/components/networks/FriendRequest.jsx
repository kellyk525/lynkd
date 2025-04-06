import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  acceptConnectionRequest,
  rejectConnectionRequest,
} from "../../api/connections.js";

const FriendRequest = ({ request }) => {
  const queryClient = useQueryClient();

  const { mutate: acceptConnectionRequestMutation } = useMutation({
    mutationFn: (requestId) => acceptConnectionRequest(requestId),
    onSuccess: () => {
      toast.success("Connection request accepted");
      queryClient.invalidateQueries({ queryKey: ["connectionRequests"] });
    },
    onError: (error) => {
      toast.error(error.response.data.error);
    },
  });

  const { mutate: rejectConnectionRequestMutation } = useMutation({
    mutationFn: (requestId) => rejectConnectionRequest(requestId),
    onSuccess: () => {
      toast.success("Connection request rejected");
      queryClient.invalidateQueries({ queryKey: ["connectionRequests"] });
    },
    onError: (error) => {
      toast.error(error.response.data.error);
    },
  });

  return (
    <div className="p-4 flex items-center justify-between border-b">
      <div className="flex items-center gap-4">
        <Link to={`/profile/${request.sender.username}`}>
          <img
            src={request.sender.profilePicture || "/avatar.png"}
            alt={request.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        </Link>

        <div>
          <Link
            to={`/profile/${request.sender.username}`}
            className="font-semibold text-neutral text-base"
          >
            {request.sender.name}
          </Link>
          <p className="text-gray-600 text-sm mb-1">
            {request.sender.headline}
          </p>
          <p className="text-gray-600 text-xs">
            {request.sender.connections.length} connections
          </p>
        </div>
      </div>

      <div className="space-x-2">
        <button
          className="border border-secondary text-secondary px-4 py-2 rounded-lg hover:bg-secondary hover:text-white transition-colors"
          onClick={() => acceptConnectionRequestMutation(request._id)}
        >
          Accept
        </button>
        <button
          className="bg-gray-200 text-neutral px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
          onClick={() => rejectConnectionRequestMutation(request._id)}
        >
          Reject
        </button>
      </div>
    </div>
  );
};
export default FriendRequest;
