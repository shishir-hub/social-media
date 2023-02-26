import React, { useContext, useEffect, useState } from "react";
import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { SocialMediaContext } from "../../App";

function Rightbar({ profile, setEditProfile }) {
  const { conversations, setConversations } = useContext(SocialMediaContext);
  const { user } = useContext(AuthContext);
  const params = useParams();
  const [friends, setFriends] = useState();
  const [followed, setFollowed] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setFollowed(
      profile?.followers?.filter((f) => f === user?._id)[0] ? true : false
    );
  }, [profile, user]);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (profile) {
      try {
        setIsLoading(true);
        axios
          .get(
            `${process.env.REACT_APP_SERVER_DOMAIN}/users/friends/${params.userId}`
          )
          .then((res) => {
            setFriends(res.data.data);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setIsLoading(false);
          });
      } catch (error) {}
    }
  }, [params.userId, profile]);

  const handleFollow = () => {
    setIsLoading(true);
    let data = {};
    axios
      .put(
        `${process.env.REACT_APP_SERVER_DOMAIN}/users/${profile?._id}/follow`,
        data,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.msg);
        setIsLoading(false);
        setFollowed(true);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        setIsLoading(false);
      });
  };

  const handleOpenMessage = () => {
    const createOrgetConversation = async () => {
      let conversation = {
        senderId: user._id,
        receiverId: profile._id,
      };

      await axios
        .post(
          `${process.env.REACT_APP_SERVER_DOMAIN}/conversation`,
          conversation,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          res.data.msg === "new"
            ? conversations
              ? setConversations([...conversations, res.data.data])
              : setConversations([res.data.data])
            : setConversations([...conversations]);
          navigate("/messenger");
        })
        .catch((err) => {
          console.log(err);
        });
    };
    createOrgetConversation();
  };

  const handleUnfollow = () => {
    setIsLoading(true);
    let data = {};
    axios
      .put(
        `${process.env.REACT_APP_SERVER_DOMAIN}/users/${profile?._id}/unfollow`,
        data,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data.msg);
        setIsLoading(false);
        setFollowed(false);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        setIsLoading(false);
      });
  };

  const HomeRightBar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="/assests/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Roster</b> and <b> 3 other friends</b> have birthday today
          </span>
        </div>
        <img src="/assests/ad.png" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users?.map((user, i) => {
            return <Online key={i} user={user} />;
          })}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {params.userId !== user?._id ? (
          <>
            {followed ? (
              <button
                disabled={isLoading}
                onClick={handleUnfollow}
                className="btn btn-primary mx-3 my-3"
              >
                {isLoading ? (
                  <CircularProgress style={{ color: "white" }} />
                ) : (
                  "Unfollow"
                )}
              </button>
            ) : (
              <button
                disabled={isLoading}
                onClick={handleFollow}
                className="btn btn-primary mx-3 my-3"
              >
                {isLoading ? (
                  <CircularProgress style={{ color: "white" }} />
                ) : (
                  "Follow"
                )}
              </button>
            )}
            <button onClick={handleOpenMessage} className="btn btn-secondary">
              Message
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setEditProfile({
                  isOpen: true,
                  profile: user,
                });
              }}
              className="btn btn-secondary mx-3 my-3"
            >
              Edit Profile
            </button>
          </>
        )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City: </span>
            <span className="rightbarInfoValue">{profile?.city} </span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From: </span>
            <span className="rightbarInfoValue">{profile?.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship: </span>
            <span className="rightbarInfoValue">
              {profile?.relationship === 1
                ? "Single"
                : profile?.relationship === 2
                ? "In Relationship"
                : "Complicated"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends?.map((friend, i) => {
            return (
              <Link className="link" key={i} to={`/profile/${friend?._id}`}>
                <div className="rightbarFollowing">
                  <img
                    src={
                      friend?.profilePicture || "/assests/person/noAvatar.png"
                    }
                    alt=""
                    className="rightbarFollowingImg"
                  />
                  <span
                    style={{ color: "black" }}
                    className="rightbarFollowingName"
                  >
                    {friend?.username}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightBar />}
      </div>
    </div>
  );
}

export default Rightbar;
