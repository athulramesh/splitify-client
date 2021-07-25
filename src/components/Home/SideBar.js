import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
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
import FriendGroupDetails from "../Group/FriendGroupDetails";
import PrivateRouter from "../PrivateRouter";

function SideBar() {
  let { id } = useParams();

  const routes = [
    {
      path: "/",
      exact: true,
      sidebar: () => <h2>Home</h2>,
      main: Home,
    },
    {
      path: "/group",
      exact: true,
      sidebar: () => <h2>Groups</h2>,
      main: Group,
    },
    {
      path: "/friend",
      exact: true,
      sidebar: () => <h2>Friends</h2>,
      main: Friend,
    },
    {
      path: `/group/:id`,
      sidebar: () => <h2>Groups/{id}</h2>,
      main: GroupDetails,
    },
    {
      path: `/friend/:id`,
      sidebar: () => <h2>Friends</h2>,
      main: FriendGroupDetails,
    },
  ];

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
            <Switch>
              {routes.map((route, index) => (
                <PrivateRouter
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={route.main}
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
