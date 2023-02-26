import React from "react";
import "./notification.css";

function Notification({ setNotificationComponent, notificationComponent }) {
  const { isOpen } = notificationComponent;
  return (
    <>
      {isOpen ? (
        <div className="notificationContainer">
          <div className="notificationWrapper">
            <div className="notifications">
              <i
                onClick={() => {
                  setNotificationComponent({ isOpen: false });
                }}
                className="fa-solid fa-xmark closeNotificationComponent"
              ></i>
              <div className="notification"></div>
              <span style={{ color: "black" }} className="noNotificationText">
                No new notifications
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Notification;
