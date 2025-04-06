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
        <div className="card mb-8 pb-5">
          <h2 className="text-base p-5">
            My Connections ({connections.data.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-5">
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
