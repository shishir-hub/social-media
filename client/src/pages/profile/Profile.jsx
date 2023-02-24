import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditProfile from "../../components/editProfile/EditProfile";
import Feed from "../../components/feed/Feed";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import "./profile.css";

function Profile() {
  const params = useParams();
  const [user, setUser] = useState({});
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editProfile, setEditProfile] = useState({
    isOpen: false,
    profile: {},
  });

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_SERVER_DOMAIN}/users/get-user/${params.userId}`
      )
      .then((res) => {
        setUser(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, [params.userId, profileUpdated]);

  return (
    <>
      <EditProfile
        setEditProfile={setEditProfile}
        editProfile={editProfile}
        profileUpdated={profileUpdated}
        setProfileUpdated={setProfileUpdated}
      />
      <div className="profile">
        <Leftbar />
        <div className="profileRight">
          <div className="profileRightTop">
            {isLoading ? (
              <CircularProgress />
            ) : (
              <div className="profileCover">
                <img
                  src={user?.coverPicture || "/assests/person/noCover.png"}
                  alt=""
                  className="profileCoverImg"
                />
                <img
                  src={user?.profilePicture || "/assests/person/noAvatar.png"}
                  alt=""
                  className="profileUserImg"
                />
              </div>
            )}

            <div className="profileInfo">
              <h4 className="profileInfoName">{user?.username}</h4>
              <span className="profileInfoDesc">{user?.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed userId={params.userId} />
            <Rightbar profile={user} setEditProfile={setEditProfile} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
