import { useState } from "react";

const AboutSection = ({ userData, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [about, setAbout] = useState(userData.about || "");

  const handleSave = () => {
    setIsEditing(false);
    onSave({ about });
  };
  return (
    <div className="card py-6 px-10 mb-2">
      <h2 className="text-lg font-semibold mb-4">About</h2>
      {isOwnProfile && (
        <>
          {isEditing ? (
            <>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="card w-full p-2"
                rows="4"
              />
              <button onClick={handleSave} className="submit-button mt-5 w-fit">
                Save
              </button>
            </>
          ) : (
            <>
              <p>{userData.about}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="submit-button py-2 mt-4 w-fit"
              >
                Edit
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AboutSection;
