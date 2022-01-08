import React from "react";
import "../../styles/Home/Dashboard.css";
import SideBar from "./SideBar";
import Notification from "./Notification";
import Profile from "./Profile";
import ssicon from "./ssicon.png";

function Dashboad() {
  return (
    <div className="dash">
      <div className="nav">
        <div className="nav__left">
          <img className="nav__logo" src={ssicon} alt="Simplify Split Logo" />
          <h2 className="logo">SimplifySplit</h2>
        </div>
        <div className="nav_right">
          <Notification />
          <Profile />
        </div>
      </div>
      <SideBar />
    </div>
  );
}

export default Dashboad;
