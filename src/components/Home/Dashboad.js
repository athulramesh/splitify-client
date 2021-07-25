import { Avatar, IconButton } from "@material-ui/core";
import React from "react";
import "../../styles/Home/Dashboard.css";

import { useAuth } from "../../contexts/AuthContext";
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
          <div className="user">{/* <Profile /> */}</div>
        </div>
      </div>
      <SideBar />
    </div>
  );
}

export default Dashboad;
