import React from "react";
import MentorRegistrationForm from "../MentorRegistrationForm/MentorRegistrationForm"; // Adjusted import path
import CalendarInput from "./CalendarInput";

const MentorProfilePage = () => {
  return (
    <div>
      <h1>Mentor Profile Page</h1>
      <MentorRegistrationForm />
      <CalendarInput />
      {/* Additional mentor profile management components */}
    </div>
  );
};

export default MentorProfilePage;
