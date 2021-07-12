import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import "../../styles/Home/SideBar.css";
import Friend from "../Friend/Friend";
import Home from "./Home";
import Group from "../Group/Group";
import SidebarOptions from "./SidebarOptions";
import HomeIcon from "@material-ui/icons/Home";
import GroupIcon from "@material-ui/icons/Group";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import GroupDetails from "../Group/GroupDetails";

function SideBar() {
  const [groupId, setGroupId] = useState("");
  let handleCallback = (childData) => {
    setGroupId(childData);
    console.log(groupId);
  };
  const routes = [
    {
      path: "/",
      exact: true,
      sidebar: () => <h2>Home</h2>,
      main: () => <Home />,
    },
    {
      path: "/group",
      exact: true,
      sidebar: () => <h2>Groups</h2>,
      main: () => <Group parentCallback={handleCallback} />,
    },
    {
      path: "/friend",
      sidebar: () => <h2>Friends</h2>,
      main: () => <Friend />,
    },
    {
      path: `/group/:${groupId}`,
      sidebar: () => <h2>group/{groupId}</h2>,
      main: () => <GroupDetails id={groupId} />,
    },
  ];
  const AuthPage = () => {
    if (groupId !== "") {
      let id = groupId;
      return <Redirect from="/group" to={`/group/${id}`} />;
    }
  };
  return (
    <div className="side">
      <Router>
        <div className="sideTab">
          <div className="options">
            <div className="bread">
              <Switch>
                {routes.map((route, index) => (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    children={<route.sidebar />}
                  />
                ))}
              </Switch>
            </div>
            <Link to="/" style={{ textDecoration: "none" }}>
              <SidebarOptions Icon={HomeIcon} title="Home" />
            </Link>

            <Link to="/group" style={{ textDecoration: "none" }}>
              <SidebarOptions Icon={GroupIcon} title="Groups" />
            </Link>

            <Link to="/friend" style={{ textDecoration: "none" }}>
              <SidebarOptions Icon={PersonAddIcon} title="Friends" />
            </Link>
          </div>

          <div className="canvas">
            {AuthPage()}
            <Switch>
              {routes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  children={<route.main />}
                />
              ))}
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default SideBar;
