import axios from "axios";
import React, { useEffect, useState } from "react";
import "./chatOnline.css";

function ChatOnline({ setCurrentChat, currentUserId, onlineUsers }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      await axios
        .get(
          `${process.env.REACT_APP_SERVER_DOMAIN}/users/friends/${currentUserId}`
        )
        .then((res) => {
          setFriends(res.data.data);
        })
        .catch((err) => {
          console.log(err.response.data.msg);
        });
    };
    getFriends();
  }, [currentUserId]);

  useEffect(() => {
    setOnlineFriends(friends?.filter((f) => onlineUsers?.includes(f?._id)));
  }, [onlineUsers, friends]);

  const handleChatClick = async (user) => {
    await axios
      .get(
        `${process.env.REACT_APP_SERVER_DOMAIN}/conversation/find/${currentUserId}/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      )
      .then((res) => {
        setCurrentChat(res.data.data);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  };

  return (
    <div className="chatOnline">
      {onlineFriends?.map((onlinef, i) => {
        return (
          <div
            key={i}
            className="chatOnlineFriend"
            onClick={() => {
              handleChatClick(onlinef);
            }}
          >
            <div className="chatOnlineImgContainer">
              <img
                className="chatOnlineImg"
                src={onlinef?.profilePicture || "/assests/person/noAvatar.png"}
                alt=""
              />
              <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{onlinef?.username}</span>
          </div>
        );
      })}
    </div>
  );
}

export default ChatOnline;
