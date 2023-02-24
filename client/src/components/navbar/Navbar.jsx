import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";

function Navbar({ isLoading }) {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();
  return (
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
        <div className="searchbar">
          <i className="fa-sharp fa-solid fa-magnifying-glass searchIcon"></i>
          <input
            type="text"
            placeholder="Search for friends, posts or videos"
            className="searchInput"
          />
        </div>
      </div>
      <div className="navbarRight">
        <div className="navbarLinks">
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
        </div>
        <div className="navbarIcons">
          <div className="navbarIconItem">
            <i className="fa-solid fa-user"></i>
            <span className="navbarIconBadge">1</span>
          </div>
          <div className="navbarIconItem">
            <Link style={{ color: "white" }} to="/messenger">
              <i className="fa-solid fa-comment"></i>
              <span className="navbarIconBadge">3</span>
            </Link>
          </div>
          <div className="navbarIconItem">
            <i className="fa-solid fa-bell"></i>
            <span className="navbarIconBadge">5</span>
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
  );
}

export default Navbar;
