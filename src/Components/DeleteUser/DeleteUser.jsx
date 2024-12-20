import React, { useState } from 'react';
import './DeleteUser.css'; // Ensure proper styling

const DeleteUser = () => {
  const [deletedUsers, setDeletedUsers] = useState([
    { id: 1, name: 'John Doe', role: 'Mentor', reason: 'Violation' },
    { id: 2, name: 'Jane Smith', role: 'Mentee', reason: 'Bad Feedback' }
  ]);
  const [flaggedUsers, setFlaggedUsers] = useState([
    { id: 3, name: 'Alice Johnson', role: 'Mentee', feedback: 'Negative' },
    { id: 4, name: 'Bob Williams', role: 'Mentor', feedback: 'Negative' }
  ]);

  const handleDelete = (userId) => {
    // Implement user deletion logic here (API call, etc.)
    console.log(`Deleting user with ID: ${userId}`);
    // Remove the user from the flagged users list once deleted
    const userToDelete = flaggedUsers.find((user) => user.id === userId);
    if (userToDelete) {
      setFlaggedUsers(flaggedUsers.filter((user) => user.id !== userId));
      setDeletedUsers([...deletedUsers, { ...userToDelete, reason: 'Bad Feedback' }]);
    }
  };

  const handleRejectDeletion = (userId) => {
    // Reject user deletion and remove from flagged list
    const userToReject = flaggedUsers.find((user) => user.id === userId);
    if (userToReject) {
      setFlaggedUsers(flaggedUsers.filter((user) => user.id !== userId));
    }
  };

  return (
    <div className="delete-user">
      <h3>Delete User</h3>

      {/* Flagged Users Section */}
      <div className="flagged-users">
        <h4>Flagged Users for Deletion (Bad Feedback or Violations)</h4>
        <div className="user-list">
          {flaggedUsers.length === 0 ? (
            <p>No users flagged for deletion.</p>
          ) : (
            flaggedUsers.map((user) => (
              <div key={user.id} className="user-card">
                <p>{user.name} ({user.role}) - Feedback: {user.feedback}</p>
                <button onClick={() => handleDelete(user.id)} className="action-btn">Delete User</button>
                <button onClick={() => handleRejectDeletion(user.id)} className="reject-btn">Reject Deletion</button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Deleted Users Section */}
      <div className="deleted-users">
        <h4>Recently Deleted Users</h4>
        <div className="user-list">
          {deletedUsers.length === 0 ? (
            <p>No users deleted yet.</p>
          ) : (
            deletedUsers.map((user) => (
              <div key={user.id} className="user-card">
                <p>{user.name} ({user.role}) - Reason: {user.reason}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;

