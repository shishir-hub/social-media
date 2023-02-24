import React from "react";
import "./friend.css";

function Friend({ user }) {
  return (
    <li className="leftbarFriend">
      <img
        src={user?.profilePicture}
        alt="..."
        className="leftbarFriendImage"
      />
      <span className="leftbarFriendName">{user?.username}</span>
    </li>
  );
}

export default Friend;
