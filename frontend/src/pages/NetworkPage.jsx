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
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 py-6">
      <div className="col-span-1 lg:col-span-1">
        <Sidebar user={user} />
      </div>
      <div className="col-span-1 lg:col-span-3">
        <UserConnectionRequests />
        <UserConnectionsList />
      </div>
    </div>
  );
};

export default NetworkPage;
