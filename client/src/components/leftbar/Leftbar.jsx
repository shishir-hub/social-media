import React, { useContext, useState } from "react";
import "./leftbar.css";
import Friend from "../friends/Friend";
import { Link, useLocation } from "react-router-dom";
import { SocialMediaContext } from "../../App";

function Leftbar() {
  const { allUsers } = useContext(SocialMediaContext);
  const location = useLocation();

  const [showMore, setShowMore] = useState(false);
  return (
    <div className="leftbar">
      <div className="leftbarWrapper">
        <ul className="leftbarList">
          <Link to="/">
            <li
              className={`leftbarListItem ${
                location.pathname === "/" ? "active" : ""
              }`}
            >
              <i className="fa-solid fa-square-rss leftbarIcon"></i>
              <span className="leftbarListItemText">Feed</span>
            </li>
          </Link>
          <Link to="/messenger">
            <li
              className={`leftbarListItem ${
                location.pathname === "/messenger" ? "active" : ""
              }`}
            >
              <i className="fa-solid fa-message leftbarIcon"></i>
              <span className="leftbarListItemText">Chats</span>
            </li>
          </Link>
          <div className={` ${showMore ? "" : "hide"}`}>
            <li className="leftbarListItem">
              <i className="fa-solid fa-video leftbarIcon"></i>
              <span className="leftbarListItemText">Videos</span>
            </li>
            <li className="leftbarListItem">
              <i className="fa-solid fa-user-group leftbarIcon"></i>
              <span className="leftbarListItemText">Groups</span>
            </li>
            <li className="leftbarListItem">
              <i className="fa-solid fa-bookmark leftbarIcon"></i>
              <span className="leftbarListItemText">Bookmarks</span>
            </li>
            <li className="leftbarListItem">
              <i className="fa-sharp fa-solid fa-circle-question leftbarIcon"></i>
              <span className="leftbarListItemText">Questions</span>
            </li>
            <li className="leftbarListItem">
              <i className="fa-solid fa-suitcase leftbarIcon"></i>
              <span className="leftbarListItemText">Jobs</span>
            </li>
            <li className="leftbarListItem">
              <i className="fa-solid fa-calendar leftbarIcon"></i>
              <span className="leftbarListItemText">Events</span>
            </li>
            <li className="leftbarListItem">
              <i className="fa-solid fa-graduation-cap leftbarIcon"></i>
              <span className="leftbarListItemText">Courses</span>
            </li>
          </div>
        </ul>
        <button
          onClick={() => {
            setShowMore(!showMore);
          }}
          className="leftbarButton mobile"
        >
          {showMore ? "See Less" : "See More"}
        </button>
        <i
          onClick={() => {
            setShowMore(!showMore);
          }}
          className={`fa-solid fa-chevron-${
            showMore ? "up" : "down"
          } upDownIcon`}
        ></i>
        <hr className="leftbarHr" />
        <ul className="leftbarFriendList">
          {allUsers?.map((user, i) => {
            return <Friend key={i} user={user} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default Leftbar;
