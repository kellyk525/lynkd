import { MapPin } from "lucide-react";

const ProfileHeaderInputFields = ({
  isEditing,
  editedData,
  setEditedData,
  userData,
}) => {
  return (
    <div className="text-center mb-4">
      {isEditing ? (
        <input
          type="text"
          value={editedData.name ?? userData.name}
          onChange={(e) =>
            setEditedData({ ...editedData, name: e.target.value })
          }
          className="text-2xl font-bold mb-2 text-center w-full"
        />
      ) : (
        <h1 className="text-2xl font-bold mb-2">{userData.name}</h1>
      )}

      {isEditing ? (
        <input
          type="text"
          value={editedData.headline ?? userData.headline}
          onChange={(e) =>
            setEditedData({ ...editedData, headline: e.target.value })
          }
          className="text-gray-600 text-center w-full"
        />
      ) : (
        <p className="text-gray-600">{userData.headline}</p>
      )}

      <div className="flex justify-center items-center mt-2">
        <MapPin size={16} className="text-gray-500 mr-1" />
        {isEditing ? (
          <input
            type="text"
            value={editedData.location ?? userData.location}
            onChange={(e) =>
              setEditedData({ ...editedData, location: e.target.value })
            }
            className="text-gray-600 text-center"
          />
        ) : (
          <span className="text-gray-600">{userData.location}</span>
        )}
      </div>
    </div>
  );
};

export default ProfileHeaderInputFields;
