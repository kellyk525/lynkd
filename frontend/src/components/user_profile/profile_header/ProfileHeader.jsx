import { useQuery } from "@tanstack/react-query";
import { Camera } from "lucide-react";
import { useState } from "react";
import { getCurrentUser } from "../../../api/auth.js";

import ProfileHeaderProfilePicture from "./ProfileHeaderProfilePicture.jsx";
import ProfileHeaderInputFields from "./ProfileHeaderInputFields.jsx";
import ProfileHeaderActions from "./ProfileHeaderActions.jsx";

const ProfileHeader = ({ userData, onSave, isOwnProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const { data: authUser } = useQuery({
    queryKey: ["authUser"],
    queryFn: getCurrentUser,
  });

  const isConnected = userData.connections.some(
    (connectedUserId) => connectedUserId === authUser._id
  );

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedData((prev) => ({
          ...prev,
          [event.target.name]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(editedData);
    setIsEditing(false);
  };

  return (
    <div className="card mb-2">
      <div
        className="relative h-48 rounded-t-lg bg-cover bg-center"
        style={{
          backgroundImage: `url('${
            editedData.bannerImg || userData.bannerImg || "/banner.png"
          }')`,
        }}
      >
        {isEditing && (
          <label className="absolute top-2 right-2 bg-white p-2 rounded-full shadow cursor-pointer">
            <Camera size={20} />
            <input
              type="file"
              className="hidden"
              name="bannerImg"
              onChange={handleImageChange}
              accept="image/*"
            />
          </label>
        )}
      </div>

      <div className="p-4">
        <ProfileHeaderProfilePicture
          isEditing={isEditing}
          editedData={editedData}
          userData={userData}
          handleImageChange={handleImageChange}
        />
        <ProfileHeaderInputFields
          isEditing={isEditing}
          editedData={editedData}
          setEditedData={setEditedData}
          userData={userData}
        />
        <ProfileHeaderActions
          isOwnProfile={isOwnProfile}
          isConnected={isConnected}
          onSave={handleSave}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          targetUserId={userData._id}
        />
      </div>
    </div>
  );
};

export default ProfileHeader;
