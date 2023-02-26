import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SocialMediaContext } from "../../App";
import { AuthContext } from "../../context/AuthContext";
import "./friendRequest.css";

function FriendRequest({
  requestComponent,
  setRequestComponent,
  setNotificationCount,
  notificationCount,
}) {
  const { allUsers } = useContext(SocialMediaContext);
  const { user } = useContext(AuthContext);
  const [friendRequestsProfiles, setFriendRequestsProfiles] = useState();

  const { isOpen } = requestComponent;

  useEffect(() => {
    const friend_requests = user?.followers?.filter(
      (f) => !user?.followings?.includes(f)
    );

    const friend_requests_profiles = allUsers?.filter((u) =>
      friend_requests?.includes(u._id)
    );

    setFriendRequestsProfiles(friend_requests_profiles);
  }, [allUsers, user]);

  useEffect(() => {
    setNotificationCount({
      ...notificationCount,
      friend_requests: friendRequestsProfiles?.length,
    });
    // eslint-disable-next-line
  }, [setNotificationCount, friendRequestsProfiles]);

  return (
    <>
      {isOpen ? (
        <div className="firendRequest">
          <div className="friendRequestWrapper">
            <div className="friends">
              <i
                onClick={() => {
                  setRequestComponent({ isOpen: false });
                }}
                className="fa-solid fa-xmark closeRequestComponent"
              ></i>
              {friendRequestsProfiles?.length !== 0 ? (
                friendRequestsProfiles?.map((req, i) => {
                  return (
                    <Link
                      onClick={() => {
                        setRequestComponent({ isOpen: false });
                      }}
                      key={i}
                      to={`/profile/${req._id}`}
                    >
                      <div className="friend">
                        <img
                          className="friendImg"
                          src={
                            req?.profilePicture ||
                            "/assests/person/noAvatar.png"
                          }
                          alt=""
                        />
                        <span style={{ color: "black" }} className="friendName">
                          {req?.username}
                        </span>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <span style={{ color: "black" }} className="noRequestText">
                  No Friend Requests Found
                </span>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default FriendRequest;
