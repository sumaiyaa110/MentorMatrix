import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import "./Notifications.css";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const SOCKET_URL = "http://localhost:8080/ws"; // Backend WebSocket endpoint

  useEffect(() => {
    const sock = new SockJS(SOCKET_URL);
    const stompClient = Stomp.over(sock);

    stompClient.connect({}, () => {
      // Subscribe to the notifications topic
      stompClient.subscribe("/topic/notifications", (message) => {
        const notification = JSON.parse(message.body);
        setNotifications((prev) => [...prev, notification]);
      });
    });

    return () => {
      stompClient.disconnect();
    };
  }, []);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <div className="notifications-wrapper">
      <div className="notification-bell" onClick={togglePanel}>
        <FaBell size={24} />
        {notifications.length > 0 && <span className="badge">{notifications.length}</span>}
      </div>
      {isPanelOpen && (
        <div className="notifications-panel">
          <div className="notifications-header">
            <h3>Notifications</h3>
          </div>
          <ul className="notifications-list">
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <li key={index} className={`notification-item notification-${notification.type}`}>
                  {notification.message}
                </li>
              ))
            ) : (
              <li className="notification-item">No new notifications</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Notifications;


