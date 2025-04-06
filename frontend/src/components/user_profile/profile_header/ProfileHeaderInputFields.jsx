import { MapPin } from "lucide-react";
import InputField from "../../shared/InputField";

const ProfileHeaderInputFields = ({
  isEditing,
  editedData,
  setEditedData,
  userData,
}) => {
  return (
    <div className={`mx-6 mb-4 flex flex-col ${isEditing && "gap-3"}`}>
      {isEditing ? (
        <>
          <InputField
            type="text"
            value={editedData.name ?? userData.name}
            onChange={(e) =>
              setEditedData({ ...editedData, name: e.target.value })
            }
          />
          <InputField
            type="text"
            value={editedData.headline ?? userData.headline}
            onChange={(e) =>
              setEditedData({ ...editedData, headline: e.target.value })
            }
          />
          <div className="flex items-center">
            <MapPin size={14} className="text-gray-500 mr-1" />
            <InputField
              type="text"
              value={editedData.location ?? userData.location}
              onChange={(e) =>
                setEditedData({ ...editedData, location: e.target.value })
              }
            />
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-semibold">{userData.name}</h1>
          <p className="text-neutral mt-1.5">{userData.headline}</p>
          <div className="flex items-center mt-1.5">
            <MapPin size={14} className="text-gray-500 mr-1" />
            <span className="text-gray-500 text-sm">{userData.location}</span>
          </div>
        </>
      )}
      <p className="text-sm mt-1.5 text-gray-500">
        {userData.connections.length} Connections
      </p>
    </div>
  );
};

export default ProfileHeaderInputFields;
