import React, { useState, useEffect } from "react";
import "./AssignProjects.css";
import { FaTasks } from "react-icons/fa";

const AssignProjects = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [assignedProjects, setAssignedProjects] = useState([]); // State for assigned projects

  // Example session options
  const sessions = [
    { id: 1, name: "AI Fundamentals" },
    { id: 2, name: "Machine Learning Basics" },
    { id: 3, name: "Data Science Introduction" },
    { id: 4, name: "Python for Beginners" },
    { id: 5, name: "Deep Learning Essentials" },
  ];

  // Load projects from localStorage on component mount
  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("assignedProjects")) || [];
    setAssignedProjects(storedProjects);
  }, []);

  // Save assigned projects to localStorage whenever the list changes
  useEffect(() => {
    localStorage.setItem("assignedProjects", JSON.stringify(assignedProjects));
  }, [assignedProjects]);

  const handleAssignProject = () => {
    // Validate required fields
    if (!projectTitle || !selectedSession) {
      alert("Please fill all the required fields!");
      return;
    }

    // Create a new project object
    const newProject = {
      id: assignedProjects.length + 1,
      title: projectTitle,
      description: projectDescription,
      session: selectedSession,
    };

    // Add the new project to the assigned projects list
    setAssignedProjects([...assignedProjects, newProject]);

    // Reset the form
    setProjectTitle("");
    setProjectDescription("");
    setSelectedSession("");

    console.log("Project Assigned:", newProject);
  };

  return (
    <div className="assign-projects-container">
      <h2>Assign Projects to Mentees</h2>

      {/* Assign Project Form */}
      <div className="assign-project-form">
        <div className="form-group">
          <label htmlFor="projectTitle">Project Title</label>
          <input
            type="text"
            id="projectTitle"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            placeholder="Enter project title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="projectDescription">Project Description</label>
          <textarea
            id="projectDescription"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="Enter project description"
          />
        </div>
        <div className="form-group">
          <label htmlFor="selectedSession">Assign to Session</label>
          <select
            id="selectedSession"
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
          >
            <option value="">Select Session</option>
            {sessions.map((session) => (
              <option key={session.id} value={session.name}>
                {session.name}
              </option>
            ))}
          </select>
        </div>
        <button className="assign-project-btn" onClick={handleAssignProject}>
          <FaTasks /> Assign Project
        </button>
      </div>

      {/* Assigned Projects List */}
      <div className="assigned-projects">
        <h3>Assigned Projects</h3>
        {assignedProjects.length > 0 ? (
          <table className="projects-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Session</th>
              </tr>
            </thead>
            <tbody>
              {assignedProjects.map((project) => (
                <tr key={project.id}>
                  <td>{project.id}</td>
                  <td>{project.title}</td>
                  <td>{project.description || "N/A"}</td>
                  <td>{project.session}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No projects assigned yet.</p>
        )}
      </div>
    </div>
  );
};

export default AssignProjects;



