import React, { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import './Notifications.css'
const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const client = new Client({
      brokerURL: 'ws://localhost:8080/notifications',
      onConnect: () => {
        client.subscribe('/topic/notifications', (message) => {
          const notification = JSON.parse(message.body);
          setNotifications((prev) => [...prev, notification]);
        });
      },
    });

    client.activate();
    return () => client.deactivate();
  }, []);

  return (
    <div className="notifications">
      <h2>Real-Time Notifications</h2>
      <ul>
        {notifications.map((n, index) => (
          <li key={index} className={`notification ${n.priority}`}>
            {n.message} - <strong>{n.priority}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
