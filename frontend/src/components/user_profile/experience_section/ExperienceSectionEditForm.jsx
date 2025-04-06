import InputField from "../../shared/InputField";

const ExperienceSectionEditForm = ({
  isEditing,
  newExperience,
  setNewExperience,
  handleCurrentlyWorkingChange,
  handleAddExperience,
}) => {
  return (
    <>
      {isEditing && (
        <div className="mt-4 flex flex-col gap-2">
          <InputField
            type="text"
            placeholder="Title"
            value={newExperience.title}
            onChange={(e) =>
              setNewExperience({ ...newExperience, title: e.target.value })
            }
          />
          <InputField
            type="text"
            placeholder="Company"
            value={newExperience.company}
            onChange={(e) =>
              setNewExperience({ ...newExperience, company: e.target.value })
            }
          />
          <InputField
            type="date"
            placeholder="Start Date"
            value={newExperience.startDate}
            onChange={(e) =>
              setNewExperience({ ...newExperience, startDate: e.target.value })
            }
          />
          <div className="flex items-center my-2">
            <input
              type="checkbox"
              id="currentlyWorking"
              checked={newExperience.currentlyWorking}
              onChange={handleCurrentlyWorkingChange}
              className="mr-2"
            />
            <label htmlFor="currentlyWorking">I currently work here</label>
          </div>
          {!newExperience.currentlyWorking && (
            <InputField
              type="date"
              placeholder="End Date"
              value={newExperience.endDate}
              onChange={(e) =>
                setNewExperience({ ...newExperience, endDate: e.target.value })
              }
            />
          )}
          <textarea
            placeholder="Description"
            value={newExperience.description}
            onChange={(e) =>
              setNewExperience({
                ...newExperience,
                description: e.target.value,
              })
            }
            className="w-full p-2 border border-base-300 rounded-lg mb-2"
          />
          <button
            onClick={handleAddExperience}
            className="submit-button w-fit mt-2"
          >
            Add Experience
          </button>
        </div>
      )}
    </>
  );
};

export default ExperienceSectionEditForm;
