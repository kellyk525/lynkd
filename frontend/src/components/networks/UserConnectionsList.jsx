import { useQuery } from "@tanstack/react-query";
import { getActiveConnections } from "../../api/connections.js";
import UserCard from "./UserCard.jsx";

const UserConnectionsList = () => {
  const { data: connections } = useQuery({
    queryKey: ["connections"],
    queryFn: getActiveConnections,
  });

  return (
    <>
      {connections?.data?.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">My Connections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {connections.data.map((connection) => (
              <UserCard
                key={connection._id}
                user={connection}
                isConnection={true}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default UserConnectionsList;
