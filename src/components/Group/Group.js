import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/Group/Group.css";
import GroupAdapter from "../../adapters/groupAdapter";
import SearchIcon from "@material-ui/icons/Search";
import GroupCard from "./GroupCard";
import AddGroup from "./AddGroup";

function Group({ parentCallback }) {
  const { currentUser } = useAuth();
  const [groups, setGroups] = useState();
  const groupNameRef = useRef();
  function getGroups() {
    GroupAdapter.getAllGroups(currentUser).then((data) =>
      setGroups(data.data.groups)
    );
  }
  async function handle(e) {
    e.preventDefault();
    // try {
    //   setError("");
    //   await FriendAdapter.getUserByUserName(
    //     currentUser,
    //     userNameRef.current.value
    //   ).then((data) => {
    //     setUser(data.data);
    //     console.log(data.data);
    //   });
    // } catch (err) {
    //   setError("Oops!! The requested user not found");
    //   console.log(error);
    // }
  }
  function init() {}
  useEffect(() => {
    getGroups();
  }, []);

  function handleClick(groupId) {
    parentCallback(groupId);
  }

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
        <AddGroup />
      </div>
      <div className="groupLs">
        {groups?.map((f) => (
          <div onClick={() => handleClick(f.groupId)}>
            <GroupCard key={f.groupId} groupName={f.groupName} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Group;
