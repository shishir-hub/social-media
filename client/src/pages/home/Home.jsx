import React, { useState } from "react";
import Feed from "../../components/feed/Feed";
import Leftbar from "../../components/leftbar/Leftbar";
import Rightbar from "../../components/rightbar/Rightbar";
import "./home.css";

function Home() {
  const [rightbarOpen, setRightbarOpen] = useState(false);
  return (
    <>
      <div className="homeContainer">
        <Leftbar />
        <Feed />
        <i
          onClick={() => {
            setRightbarOpen(true);
          }}
          className="fa-solid fa-bars openRightBar"
        ></i>
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
