import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { SocialMediaContext } from "../../App";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversations/Conversation";
import Leftbar from "../../components/leftbar/Leftbar";
import Message from "../../components/message/Message";
import { AuthContext } from "../../context/AuthContext";
import "./messenger.css";

function Messenger() {
  const { conversations, setConversations } = useContext(SocialMediaContext);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setnewMessage] = useState();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [showChatMenu, setShowChatMenu] = useState(true);
  const [messageIsLoading, setMessageIsLoading] = useState(false);

  const scrollRef = useRef();
  const socket = useRef();

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_SOCKET_DOMAIN);
    socket.current?.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current?.emit("addUser", user?._id);
    socket.current?.on("getUsers", (users) => {
      setOnlineUsers(
        user?.followings?.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      setIsLoading(true);
      await axios
        .get(
          `${process.env.REACT_APP_SERVER_DOMAIN}/conversation/${user?._id}`,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
        )
        .then((res) => {
          setConversations(res.data.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err.response.data.msg);
        });
    };
    getConversations();
  }, [user?._id, setConversations]);

  useEffect(() => {
    const getMessages = async () => {
      setMessageIsLoading(true);
      await axios
        .get(
          `${process.env.REACT_APP_SERVER_DOMAIN}/message/${currentChat?._id}`,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
        )
        .then((res) => {
          setMessages(res.data.data);
          setMessageIsLoading(false);
        })
        .catch((err) => {
          console.log(err.response.data.msg);
          setMessageIsLoading(false);
        });
    };
    currentChat && getMessages();
  }, [currentChat]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const messgae = {
      sender: user?._id,
      text: newMessage,
      conversationId: currentChat?._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    socket.current?.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    axios
      .post(`${process.env.REACT_APP_SERVER_DOMAIN}/message`, messgae, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        setMessages([...messages, res.data.data]);
        setnewMessage("");
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="messenger">
        <i
          onClick={() => {
            setShowChatMenu(true);
          }}
          className="fa-solid fa-bars openChatMenu"
        ></i>
        <div className="leftbarContainer">
          <Leftbar />
        </div>
        <div className={`chatMenu ${showChatMenu ? "" : "inactive"}`}>
          <div className="chatMenuWrapper">
            <div className="crossIconContainer">
              <i
                onClick={() => {
                  setShowChatMenu(false);
                }}
                className="fa-solid fa-xmark closeMessengerBar"
              ></i>
            </div>
            <input
              type="text"
              placeholder="Search For Friends"
              className="chatMenuInput"
            />
            {conversations ? (
              isLoading ? (
                <CircularProgress />
              ) : (
                conversations?.map((c, i) => {
                  return (
                    <div
                      onClick={() => {
                        setCurrentChat(c);
                      }}
                      key={i}
                    >
                      <Conversation
                        active={currentChat?._id === c?._id ? "active" : ""}
                        conversation={c}
                        currentUser={user}
                      />
                    </div>
                  );
                })
              )
            ) : (
              <span
                style={{
                  color: "grey",
                  fontSize: "20px",
                  textAlign: "center",
                  marginTop: "20px",
                  display: "block",
                }}
              >
                Start conversation with your friends
              </span>
            )}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                {messageIsLoading ? (
                  <CircularProgress />
                ) : (
                  <div className="chatBoxTop">
                    {messages?.map((m, i) => {
                      return (
                        <div key={i} ref={scrollRef}>
                          <Message
                            own={m?.sender === user?._id ? "own" : ""}
                            message={m}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
                <div className="chatBoxBottom">
                  <textarea
                    name=""
                    className="chatMessageInput"
                    placeholder="Write something..."
                    onChange={(e) => {
                      setnewMessage(e.target.value);
                    }}
                    value={newMessage}
                  ></textarea>
                  <button
                    disabled={messageIsLoading}
                    onClick={handleSendMessage}
                    className="btn btn-primary chatSubmitButton"
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start to chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentUserId={user?._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
