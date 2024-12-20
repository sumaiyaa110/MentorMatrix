import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    console.log("JWT Token for fetching profile:", token); // Debugging

    if (token) {
      axios
        .get("http://localhost:8080/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token
          },
        })
        .then((response) => {
          console.log("Profile data fetched successfully:", response.data);
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error.response || error.message);
          setError("Failed to fetch profile data. Please login again.");
        });
    } else {
      setError("No token found. Please login.");
    }
  }, []);

  if (error) return <div>{error}</div>;
  if (!userData) return <div>Loading...</div>;

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {userData.firstName} {userData.lastName}</p>
      <p>Email: {userData.email}</p>
      <p>Role: {userData.role}</p>
    </div>
  );
};

export default Profile;




