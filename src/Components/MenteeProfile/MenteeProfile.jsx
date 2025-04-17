import React, { useEffect, useState } from "react";
import "./MenteeProfile.css";

const MenteeProfile = () => {
  const [profileData, setProfileData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails")) || {};
    setProfileData(userDetails);
    setProfilePic(userDetails.profilePic || "");
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedData = { ...profileData, profilePic };
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

  return (
    <div className="mentee-profile-container">
      <div className="mentee-profile">
        <div className="profile-pic-container">
          <img
            src={profilePic || "https://via.placeholder.com/150"}
            alt="Profile"
            className="profile-pic"
          />
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
          </div>
        )}
        <button onClick={() => setIsEditing((prev) => !prev)}>
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>
    </div>
  );
};

export default MenteeProfile; 
