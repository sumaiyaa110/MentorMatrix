import React, { useEffect, useState } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import "./MentorProfile.css";

// Importing images
import johnimage from "../../assets/mentor1.jpeg";
import leeimage from "../../assets/mentor3.jpeg";
import anisulimage from "../../assets/mentee2.jpeg";
import nafisaimage from "../../assets/mentee3.jpeg";
import tasfiaimage from "../../assets/mentor5.jpeg";
import tahmimaimage from "../../assets/mentor2.jpeg";
import rakibimage from "../../assets/mentor 3.jpg";
import ayeshaimage from "../../assets/mentor 6.jpg";
import nusratimage from "../../assets/mentor 5.jpg";
import shamimimage from "../../assets/mentor 4.jpg";

const mockImages = {
  "John Doe": johnimage,
  "Alexander Lee": leeimage,
  "Anisul Islam": anisulimage,
  "Nafisa Nawar": nafisaimage,
  "Tasfia Khanom": tasfiaimage,
  "Tahmima Haque": tahmimaimage,
  "Rakib Hasan": rakibimage,
  "Nusrat Jahan": nusratimage,
  "Shamim Reza": shamimimage,
  "Ayesha Akter": ayeshaimage,
};

const MentorProfile = () => {
  const [profileData, setProfileData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [skills, setSkills] = useState([]);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails")) || {};
    setProfileData(userDetails);
    setSkills(userDetails.skills || []);
    setProfilePic(userDetails.profilePic || "");
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (e) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      setSkills((prev) => [...prev, e.target.value.trim()]);
      e.target.value = "";
    }
  };

  const handleRemoveSkill = (index) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const updatedData = { ...profileData, skills, profilePic };
    setIsEditing(false);
    localStorage.setItem("userDetails", JSON.stringify(updatedData));
    alert("Profile updated successfully!");
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const profileImage =
    mockImages[`${profileData.firstName} ${profileData.lastName}`] ||
    profilePic ||
    "https://via.placeholder.com/150";

  return (
    <div className="mentor-profile-container">
      <div className="mentor-profile">
        <div className="profile-pic-container">
          <img src={profileImage} alt="Profile" className="profile-pic" />
          {isEditing && <input type="file" onChange={handleProfilePicChange} />}
        </div>
        {isEditing ? (
          <div>
            <input
              type="text"
              name="firstName"
              value={profileData.firstName || ""}
              onChange={handleInputChange}
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={profileData.lastName || ""}
              onChange={handleInputChange}
              placeholder="Last Name"
            />
            <input
              type="text"
              name="email"
              value={profileData.email || ""}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <input
              type="text"
              name="role"
              value={profileData.role || ""}
              onChange={handleInputChange}
              placeholder="Role"
            />
            <textarea
              name="about"
              value={profileData.about || ""}
              onChange={handleInputChange}
              placeholder="About"
            />
            <div className="skills-container">
              <strong>Skills:</strong>
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="skill-tag"
                  onClick={() => handleRemoveSkill(index)}
                >
                  {skill}
                </span>
              ))}
              <input
                type="text"
                placeholder="Add a skill (Press Enter)"
                onKeyDown={handleSkillChange}
              />
            </div>
            <button onClick={handleSave}>Save</button>
          </div>
        ) : (
          <div>
            <h2>
              {profileData.firstName} {profileData.lastName}
            </h2>
            <p>
              <strong>Email:</strong> {profileData.email}
            </p>
            <p>
              <strong>Role:</strong> {profileData.role}
            </p>
            <p>
              <strong>About:</strong> {profileData.about}
            </p>
            <div className="skills-container">
              <strong>Skills:</strong>
              {skills.map((skill, index) => (
                <span key={index} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
            <div className="icon-container">
              <a
                href={profileData.linkedin || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={30} />
              </a>
              <a
                href={profileData.github || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub size={30} />
              </a>
            </div>
          </div>
        )}
        <button onClick={() => setIsEditing((prev) => !prev)}>
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default MentorProfile;


