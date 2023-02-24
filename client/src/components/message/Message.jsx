import React from "react";
import { format } from "timeago.js";
import "./message.css";

function Message({ own, message }) {
  return (
    <div className={`message ${own}`}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={
            message?.send_by?.profilePicture || "/assests/person/noAvatar.png"
          }
          alt=""
        />
        <p className="messageText">{message?.text}</p>
      </div>
      <div className="messageBottom">{format(message?.createdAt)}</div>
    </div>
  );
}

export default Message;
