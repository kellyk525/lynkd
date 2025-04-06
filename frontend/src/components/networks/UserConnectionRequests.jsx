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
    <div className="card mb-2.5">
      <h2 className="text-base p-5 border-b">
        Invitations ({connectionRequests?.data?.length})
      </h2>
      {connectionRequests?.data?.length > 0 ? (
        <div className="mb-8">
          {connectionRequests.data.map((request) => (
            <FriendRequest key={request._id} request={request} />
          ))}
        </div>
      ) : (
        <div className="mb-6 p-6 text-center text-neutral">
          <UserPlus size={48} className="mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Connection Requests</h3>
          <p>
            You don&apos;t have any pending connection requests at the moment.
          </p>
        </div>
      )}
    </div>
  );
};
export default UserConnectionRequests;
