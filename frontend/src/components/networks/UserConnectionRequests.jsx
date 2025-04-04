import { UserPlus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getConnectionRequests } from "../../api/connections";
import FriendRequest from "./FriendRequest";

const UserConnectionRequests = () => {
  const { data: connectionRequests } = useQuery({
    queryKey: ["connectionRequests"],
    queryFn: getConnectionRequests,
  });

  return (
    <>
      {connectionRequests?.data?.length > 0 ? (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Connection Request</h2>
          <div className="space-y-4">
            {connectionRequests.data.map((request) => (
              <FriendRequest key={request._id} request={request} />
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6 text-center mb-6">
          <UserPlus size={48} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Connection Requests</h3>
          <p className="text-gray-600">
            You don&apos;t have any pending connection requests at the moment.
          </p>
          <p className="text-gray-600 mt-2">
            Explore suggested connections below to expand your network!
          </p>
        </div>
      )}
    </>
  );
};
export default UserConnectionRequests;
