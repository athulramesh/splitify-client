import { Avatar } from "@material-ui/core";
import React from "react";
import "../../styles/Home/Dashboard.css";

import { useAuth } from "../../contexts/AuthContext";
import SideBar from "./SideBar";

function Dashboad() {
  const { currentUser } = useAuth();
  return (
    <div className="dash">
      <div className="nav">
        <h1 className="logo">Splitify</h1>
        <div className="user">
          <Avatar>
            {currentUser?.userDetails?.firstName[0].toUpperCase()}
          </Avatar>
          <h2>{currentUser?.userDetails?.firstName}</h2>
        </div>
      </div>
      <SideBar />
    </div>
  );
}

export default Dashboad;
