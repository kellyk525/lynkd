import { useState } from "react";
import { Briefcase, X } from "lucide-react";
import { formatDate } from "../../../utils/dateUtils";
import ExperienceSectionEditForm from "./ExperienceSectionEditForm";

const ExperienceSection = ({ userData, isOwnProfile, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [experiences, setExperiences] = useState(userData.experience || []);
  const [newExperience, setNewExperience] = useState({
    title: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
    currentlyWorking: false,
  });

  const handleAddExperience = () => {
    if (
      newExperience.title &&
      newExperience.company &&
      newExperience.startDate
    ) {
      setExperiences([...experiences, newExperience]);

      setNewExperience({
        title: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
        currentlyWorking: false,
      });
    }
  };

  const handleDeleteExperience = (id) => {
    setExperiences(experiences.filter((exp) => exp._id !== id));
  };

  const handleSave = () => {
    onSave({ experience: experiences });
    setIsEditing(false);
  };

  const handleCurrentlyWorkingChange = (e) => {
    setNewExperience({
      ...newExperience,
      currentlyWorking: e.target.checked,
      endDate: e.target.checked ? "" : newExperience.endDate,
    });
  };

  return (
    <div className="card py-6 px-10 mb-2">
      <h2 className="text-lg font-semibold mb-4">Experience</h2>
      {experiences.map((exp) => (
        <div
          key={exp._id}
          className="py-4 flex justify-between items-start border-b border-base-300"
        >
          <div className="flex items-start">
            <Briefcase size={20} className="mr-2 mt-1" />
            <div>
              <h3 className="font-semibold">{exp.title}</h3>
              <p className="text-gray-600">{exp.company}</p>
              <p className="text-gray-500 text-sm">
                {formatDate(exp.startDate)} -{" "}
                {exp.endDate ? formatDate(exp.endDate) : "Present"}
              </p>
              <p className="text-gray-700">{exp.description}</p>
            </div>
          </div>
          {isEditing && (
            <button
              onClick={() => handleDeleteExperience(exp._id)}
              className="text-red-500"
            >
              <X size={20} />
            </button>
          )}
        </div>
      ))}
      <ExperienceSectionEditForm
        isEditing={isEditing}
        newExperience={newExperience}
        setNewExperience={setNewExperience}
        handleCurrentlyWorkingChange={handleCurrentlyWorkingChange}
        handleAddExperience={handleAddExperience}
      />
      {isOwnProfile && (
        <>
          {isEditing ? (
            <button
              onClick={handleSave}
              className="submit-button py-2 mt-4 w-fit"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="submit-button py-2 mt-4 w-fit"
            >
              Edit Experiences
            </button>
          )}
        </>
      )}
    </div>
  );
};
export default ExperienceSection;
