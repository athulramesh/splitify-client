import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/Group/Group.css";
import GroupAdapter from "../../adapters/groupAdapter";
import SearchIcon from "@material-ui/icons/Search";
import GroupCard from "./GroupCard";
import AddGroup from "./AddGroup";
import { Link, useRouteMatch } from "react-router-dom";

function Group() {
  let { url } = useRouteMatch();
  const { currentUser } = useAuth();
  const [groups, setGroups] = useState([]);
  const groupNameRef = useRef();
  function getGroups() {
    GroupAdapter.getAllGroups(currentUser).then((data) =>
      setGroups(data.data.groups)
    );
  }
  async function handle(e) {
    e.preventDefault();
  }
  function init() {}
  useEffect(() => {
    getGroups();
  }, []);

  let addGroup = (childData) => {
    setGroups([...groups, childData]);
  };
  return (
    <div className="group">
      <h1 className="header">Groups</h1>
      <div className="searchBar">
        <div className="header__left">
          <SearchIcon />
          <form onSubmit={handle} onChange={init}>
            <input
              placeholder="Search for Groups"
              type="text"
              ref={groupNameRef}
            />
          </form>
        </div>
        <AddGroup addGroupCall={addGroup} />
      </div>
      <div className="groupLs">
        {groups?.map((f) => (
          <Link to={`${url}/${f.groupId}`} style={{ textDecoration: "none" }}>
            <GroupCard key={f.groupId} groupName={f.groupName} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Group;
