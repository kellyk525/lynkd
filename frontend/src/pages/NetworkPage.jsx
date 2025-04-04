import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/auth.js";

import Sidebar from "../components/Sidebar";
import UserConnectionsList from "../components/networks/UserConnectionsList.jsx";
import UserConnectionRequests from "../components/networks/UserConnectionRequests.jsx";

const NetworkPage = () => {
  const { data: user } = useQuery({
    queryKey: ["authUser"],
    queryFn: getCurrentUser,
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="col-span-1 lg:col-span-1">
        <Sidebar user={user} />
      </div>
      <div className="col-span-1 lg:col-span-3">
        <div className="bg-secondary rounded-lg shadow p-6 mb-6">
          <h1 className="text-2xl font-bold mb-6">My Network</h1>
          <UserConnectionRequests />
          <UserConnectionsList />
        </div>
      </div>
    </div>
  );
};

export default NetworkPage;
