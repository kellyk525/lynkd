import { X } from "lucide-react";
import { useState } from "react";
import InputField from "../shared/InputField";

const SkillsSection = ({ userData, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [skills, setSkills] = useState(userData.skills || []);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const handleDeleteSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSave = () => {
    onSave({ skills });
    setIsEditing(false);
  };

  return (
    <div className="card py-6 px-10">
      <h2 className="text-lg font-semibold mb-4">Skills</h2>
      <div className="flex flex-wrap">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 mb-2 flex items-center"
          >
            {skill}
            {isEditing && (
              <button
                onClick={() => handleDeleteSkill(skill)}
                className="ml-2 text-red-500"
              >
                <X size={14} />
              </button>
            )}
          </span>
        ))}
      </div>

      {isEditing && (
        <div className="mt-4 flex items-center">
          <InputField
            type="text"
            placeholder="New Skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <button
            onClick={handleAddSkill}
            className="submit-button ml-2 w-fit bg-base-300 text-neutral hover:bg-gray-400"
          >
            Add Skill
          </button>
        </div>
      )}

      {isOwnProfile && (
        <>
          {isEditing ? (
            <button
              onClick={handleSave}
              className="submit-button py-2 mt-5 w-fit"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="submit-button py-2 mt-4 w-fit"
            >
              Edit Skills
            </button>
          )}
        </>
      )}
    </div>
  );
};
export default SkillsSection;
