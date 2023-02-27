import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { SocialMediaContext } from "../../App";
import SearchFriend from "../searchFriend/SearchFriend";
import FriendRequest from "../friendRequest/FriendRequest";
import Notification from "../notification/Notification";

function Navbar({ isLoading }) {
  const { user } = useContext(AuthContext);
  const { setSearchTerm } = useContext(SocialMediaContext);
  const [searchComponent, setSearchComponent] = useState({
    isOpen: false,
  });
  const [requestComponent, setRequestComponent] = useState({
    isOpen: false,
  });
  const [notificationComponent, setNotificationComponent] = useState({
    isOpen: false,
  });

  const [notificationCount, setNotificationCount] = useState({
    friend_requests: 0,
    alerts: 0,
    unseenMsg: 0,
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    const openSearchComponent = () => {
      if (!input) {
        setSearchComponent({ isOpen: false });
      } else {
        setSearchComponent({ isOpen: true });
      }
    };

    openSearchComponent();
  }, [input, setSearchComponent]);

  const handleSearchClick = () => {
    setSearchTerm(input);
  };

  const navigate = useNavigate();
  return (
    <>
      <div className="navbar">
        <div className="navbarContainer">
          <div className="navbarLeft">
            <Link to="/">
              {/* <span className="logo">Social App</span> */}
              <img
                className="socialapplogoNavbar"
                src="/assests/logo/logo-light.png"
                alt=""
              />
            </Link>
          </div>

          <div className="navbarCenter">
            <SearchFriend
              searchComponent={searchComponent}
              setSearchComponent={setSearchComponent}
            />
            <div
              onClick={() => {
                setSearchComponent({ isOpen: true });
                setRequestComponent({ isOpen: false });
                setNotificationComponent({
                  isOpen: false,
                });
              }}
              className="searchbar"
            >
              <i className="fa-sharp fa-solid fa-magnifying-glass searchIcon"></i>
              <input
                value={input}
                type="text"
                placeholder="Search for friends"
                className="searchInput"
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
              {input ? (
                <button onClick={handleSearchClick} className="searchButton">
                  search
                </button>
              ) : null}
            </div>
          </div>
          <div className="navbarRight">
            {/* <div className="navbarLinks">
          <span
            onClick={() => {
              navigate("/signup");
            }}
            className="navbarLink"
          >
            Home
          </span>
          <span
            onClick={() => {
              navigate("/login");
            }}
            className="navbarLink"
          >
            Timeline
          </span>
        </div> */}
            <div className="navbarIcons">
              <div className="navbarIconItem">
                <div
                  onClick={() => {
                    setRequestComponent({ isOpen: !requestComponent.isOpen });
                    setNotificationComponent({
                      isOpen: false,
                    });
                    setSearchComponent({ isOpen: false });
                  }}
                >
                  <i className="fa-solid fa-user navbarIcon"></i>
                  {notificationCount.friend_requests !== 0 ? (
                    <span className="navbarIconBadge">
                      {notificationCount.friend_requests}
                    </span>
                  ) : null}
                </div>
                <FriendRequest
                  requestComponent={requestComponent}
                  setRequestComponent={setRequestComponent}
                  setNotificationCount={setNotificationCount}
                  notificationCount={notificationCount}
                />
              </div>
              <div className="navbarIconItem navbarIcon">
                <Link
                  onClick={() => {
                    setRequestComponent({ isOpen: false });
                    setNotificationComponent({
                      isOpen: false,
                    });
                    setSearchComponent({ isOpen: false });
                  }}
                  style={{ color: "white" }}
                  to="/messenger"
                >
                  <i className="fa-solid fa-comment"></i>
                  {notificationCount.unseenMsg !== 0 ? (
                    <span className="navbarIconBadge">
                      {notificationCount.unseenMsg}
                    </span>
                  ) : null}
                </Link>
              </div>
              <div className="navbarIconItem">
                <div
                  onClick={() => {
                    setNotificationComponent({
                      isOpen: !notificationComponent.isOpen,
                    });
                    setRequestComponent({ isOpen: false });
                    setSearchComponent({ isOpen: false });
                  }}
                >
                  <i className="fa-solid fa-bell navbarIcon"></i>
                  <span className="navbarIconBadge">
                    {notificationCount.alerts}
                  </span>
                </div>
                <Notification
                  notificationComponent={notificationComponent}
                  setNotificationComponent={setNotificationComponent}
                />
              </div>
            </div>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <img
                onClick={() => {
                  navigate(`/profile/${user?._id}`);
                }}
                className="navbarImage"
                src={user?.profilePicture || "/assests/person/noAvatar.png"}
                alt="..."
              />
            )}
          </div>
        </div>
      </div>

      <div className="searchMobile">
        <div className="navbarCenterMobile">
          <SearchFriend
            searchComponent={searchComponent}
            setSearchComponent={setSearchComponent}
          />
          <div
            onClick={() => {
              setSearchComponent({ isOpen: true });
              setRequestComponent({ isOpen: false });
              setNotificationComponent({
                isOpen: false,
              });
            }}
            className="searchbar"
          >
            <i className="fa-sharp fa-solid fa-magnifying-glass searchIcon"></i>
            <input
              value={input}
              type="text"
              placeholder="Search for friends"
              className="searchInput"
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            {input ? (
              <button onClick={handleSearchClick} className="searchButton">
                search
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
