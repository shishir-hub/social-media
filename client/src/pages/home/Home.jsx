import React, { useContext } from "react";
import { SocialMediaContext } from "../../App";
import Feed from "../../components/feed/Feed";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";

function Home() {
  const { rightbarOpen, setRightbarOpen } = useContext(SocialMediaContext);
  return (
    <>
      <div className="homeContainer">
        <Leftbar />
        <Feed />
        <div className={`rightContainer ${rightbarOpen ? "" : "inactive"}`}>
          <div className="crossIconContainer">
            <i
              onClick={() => {
                setRightbarOpen(false);
              }}
              className="fa-solid fa-xmark closeRightBar"
            ></i>
          </div>
          <Rightbar />
        </div>
      </div>
    </>
  );
}

export default Home;
