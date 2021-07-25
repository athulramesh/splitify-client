import React from "react";
import "../../styles/Home/Dashboard.css";
import SideBar from "./SideBar";
import Notification from "./Notification";
import Profile from "./Profile";

function Dashboad() {
  return (
    <div className="dash">
      <div className="nav">
        <h1 className="logo">Splitify</h1>
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
