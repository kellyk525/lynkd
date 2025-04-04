import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getCurrentUser } from "../api/auth.js";
import { getUserProfile, updateUserProfile } from "../api/users.js";

import ProfileHeader from "../components/user_profile/profile_header/ProfileHeader.jsx";
import ExperienceSection from "../components/user_profile/experience_section/ExperienceSection.jsx";
import AboutSection from "../components/user_profile/AboutSection.jsx";
import EducationSection from "../components/user_profile/education_section/EducationSection.jsx";
import SkillsSection from "../components/user_profile/SkillsSection.jsx";

const ProfilePage = () => {
  const { username } = useParams();
  const queryClient = useQueryClient();

  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: getCurrentUser,
  });

  const { data: userProfile, isLoading: isUserProfileLoading } = useQuery({
    queryKey: ["userProfile", username],
    queryFn: () => getUserProfile(username),
  });

  const { mutate: updateProfile } = useMutation({
    mutationFn: (updatedData) => updateUserProfile(updatedData),
    onSuccess: () => {
      toast.success("Profile updated successfully");
      queryClient.invalidateQueries(["userProfile", username]);
    },
  });

  if (isLoading || isUserProfileLoading) return null;
  const isOwnProfile = authUser.username === userProfile.data.username;
  const userData = isOwnProfile ? authUser : userProfile.data;

  const handleSave = (updatedData) => {
    updateProfile(updatedData);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <ProfileHeader
        userData={userData}
        isOwnProfile={isOwnProfile}
        onSave={handleSave}
      />
      <AboutSection
        userData={userData}
        isOwnProfile={isOwnProfile}
        onSave={handleSave}
      />
      <ExperienceSection
        userData={userData}
        isOwnProfile={isOwnProfile}
        onSave={handleSave}
      />
      <EducationSection
        userData={userData}
        isOwnProfile={isOwnProfile}
        onSave={handleSave}
      />
      <SkillsSection
        userData={userData}
        isOwnProfile={isOwnProfile}
        onSave={handleSave}
      />
    </div>
  );
};

export default ProfilePage;
