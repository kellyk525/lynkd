import { Camera } from "lucide-react";

const ProfileHeaderProfilePicture = ({
  isEditing,
  editedData,
  userData,
  handleImageChange,
}) => {
  return (
    <div className="relative -mt-20 mb-4">
      <img
        className="w-40 h-40 ml-6 rounded-full border-4 border-base-100 object-cover"
        src={
          editedData.profilePicture || userData.profilePicture || "/avatar.png"
        }
        alt={userData.name}
      />

      {isEditing && (
        <label className="absolute bottom-0 left-0 transform translate-x-44 bg-white p-2 rounded-full shadow cursor-pointer">
          <Camera size={20} />
          <input
            type="file"
            className="hidden"
            name="profilePicture"
            onChange={handleImageChange}
            accept="image/*"
          />
        </label>
      )}
    </div>
  );
};

export default ProfileHeaderProfilePicture;
