import React from "react";
import "./leftbar.css";
import { Users } from "../../dummyData";
import Friend from "../friends/Friend";

function Leftbar() {
  return (
    <div className="leftbar">
      <div className="leftbarWrapper">
        <ul className="leftbarList">
          <li className="leftbarListItem">
            <i className="fa-solid fa-square-rss leftbarIcon"></i>
            <span className="leftbarListItemText">Feed</span>
          </li>
          <li className="leftbarListItem">
            <i className="fa-solid fa-message leftbarIcon"></i>
            <span className="leftbarListItemText">Chats</span>
          </li>
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
        </ul>
        <button className="leftbarButton">Show More</button>
        <hr className="leftbarHr" />
        <ul className="leftbarFriendList">
          {Users?.map((user, i) => {
            return <Friend key={i} user={user} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default Leftbar;
