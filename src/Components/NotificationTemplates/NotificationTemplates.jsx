import React, { useEffect, useState } from 'react';
import './NotificationTemplates.css';

const NotificationTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/notification-templates')
      .then((res) => res.json())
      .then((data) => setTemplates(data));
  }, []);

  return (
    <div className="template-section">
      <h2>Notification Templates</h2>
      <select onChange={(e) => setSelectedTemplate(templates[e.target.value])}>
        <option>Select a Template</option>
        {templates.map((template, index) => (
          <option key={index} value={index}>
            {template.title}
          </option>
        ))}
      </select>
      {selectedTemplate && (
        <div className="template-details">
          <p><strong>Message:</strong> {selectedTemplate.message}</p>
          <p><strong>Priority:</strong> {selectedTemplate.priority}</p>
        </div>
      )}
    </div>
  );
};

export default NotificationTemplates;

