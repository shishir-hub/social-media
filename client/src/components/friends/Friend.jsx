import React from "react";
import { Link } from "react-router-dom";
import "./friend.css";

function Friend({ user }) {
  return (
    <li className="leftbarFriend">
      <Link to={`/profile/${user._id}`}>
        <img
          src={user?.profilePicture || "/assests/person/noAvatar.png"}
          alt="..."
          className="leftbarFriendImage"
        />
        <span style={{ color: "black" }} className="leftbarFriendName">
          {user?.username}
        </span>
      </Link>
    </li>
  );
}

export default Friend;
