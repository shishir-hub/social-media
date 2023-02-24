import axios from "axios";
import React, { useEffect, useState } from "react";
import "./conversation.css";

function Conversation({ active, conversation, currentUser }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const friendId = conversation?.members.find((m) => m !== currentUser?._id);

    const getUser = async () => {
      await axios(
        `${process.env.REACT_APP_SERVER_DOMAIN}/users/get-user/${friendId}`
      )
        .then((res) => {
          setUser(res.data.data);
        })
        .catch((err) => {
          console.log(err.response.data.msg);
        });
    };
    friendId && getUser();
  }, [currentUser?._id, conversation?.members]);
  return (
    <div className={`conversation ${active}`}>
      <img
        className="conversationImg"
        src={user?.profilePicture || "/assests/person/noAvatar.png"}
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}

export default Conversation;
