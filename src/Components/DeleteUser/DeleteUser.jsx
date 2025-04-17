import React, { useState } from 'react';
import './DeleteUser.css'; // Ensure proper styling

const DeleteUser = () => {
  const [deletedUsers, setDeletedUsers] = useState([
    { id: 1, name: 'John Doe', role: 'Mentor', reason: 'Violation of community guidelines', deletedAt: new Date().toISOString() },
    { id: 2, name: 'Jane Smith', role: 'Mentee', reason: 'Consistently bad feedback from mentors', deletedAt: new Date().toISOString() }
  ]);
  const [flaggedUsers, setFlaggedUsers] = useState([
    { id: 3, name: 'Alice Johnson', role: 'Mentee', feedback: 'Negative', violations: 1, violationType: 'Spamming content' },
    { id: 4, name: 'Bob Williams', role: 'Mentor', feedback: 'Negative', violations: 2, violationType: 'Inappropriate language' }
  ]);
  const [restrictedUsers, setRestrictedUsers] = useState([
    { id: 5, name: 'Charlie Brown', role: 'Mentee', restrictedUntil: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(), reason: 'Repeated spamming behavior' }
  ]);

  const handleDelete = (userId) => {
    const userToDelete = flaggedUsers.find((user) => user.id === userId);
    if (userToDelete) {
      setFlaggedUsers(flaggedUsers.filter((user) => user.id !== userId));
      setDeletedUsers([...deletedUsers, { ...userToDelete, reason: userToDelete.violationType, deletedAt: new Date().toISOString() }]);
    }
  };

  const handleRestrict = (userId) => {
    const userToRestrict = flaggedUsers.find((user) => user.id === userId);
    if (userToRestrict) {
      setFlaggedUsers(flaggedUsers.filter((user) => user.id !== userId));
      setRestrictedUsers([...restrictedUsers, {
        ...userToRestrict,
        restrictedUntil: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
        reason: userToRestrict.violationType
      }]);
    }
  };

  const handleRejectDeletion = (userId) => {
    const userToReject = flaggedUsers.find((user) => user.id === userId);
    if (userToReject) {
      setFlaggedUsers(flaggedUsers.filter((user) => user.id !== userId));
    }
  };

  return (
    <div className="delete-user">
      <h3 className="animated-title">Delete User</h3>

      {/* Flagged Users Section */}
      <div className="flagged-users">
        <h4 className="animated-subtitle">Flagged Users for Deletion or Restriction</h4>
        <div className="user-list">
          {flaggedUsers.length === 0 ? (
            <p>No users flagged for deletion or restriction.</p>
          ) : (
            flaggedUsers.map((user) => (
              <div key={user.id} className="user-card">
                <p> {user.name} ({user.role}) - Feedback: {user.feedback}, Violations: {user.violations}, Violation Type: {user.violationType}</p>
                <button onClick={() => handleDelete(user.id)} className="action-btn">Delete Permanently</button>
                <button onClick={() => handleRestrict(user.id)} className="restrict-btn">Restrict for 1 Month</button>
                <button onClick={() => handleRejectDeletion(user.id)} className="reject-btn">Reject Action</button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Restricted Users Section */}
      <div className="restricted-users">
        <h4 className="animated-subtitle">Restricted Users</h4>
        <div className="user-list">
          {restrictedUsers.length === 0 ? (
            <p>No users are currently restricted.</p>
          ) : (
            restrictedUsers.map((user) => (
              <div key={user.id} className="user-card">
                <p><span className="symbol">🔒</span> {user.name} ({user.role}) - Restricted Until: {new Date(user.restrictedUntil).toLocaleDateString()} - Reason: {user.reason}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Deleted Users Section */}
      <div className="deleted-users">
        <h4 className="animated-subtitle">Recently Deleted Users</h4>
        <div className="user-list">
          {deletedUsers.length === 0 ? (
            <p>No users deleted yet.</p>
          ) : (
            deletedUsers.map((user) => (
              <div key={user.id} className="user-card">
                <p><span className="symbol">❌</span> {user.name} ({user.role}) - Reason: {user.reason} - Deleted At: {new Date(user.deletedAt).toLocaleDateString()}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;

