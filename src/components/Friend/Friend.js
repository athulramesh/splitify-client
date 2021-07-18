import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "../../styles/Friend/Friend.css";
import FriendAdapter from "../../adapters/friendAdapter";
import SearchIcon from "@material-ui/icons/Search";
import FriendList from "./FriendList";
import Alert from "@material-ui/lab/Alert";
import UserCard from "./UserCard";
import { useFriends } from "../../contexts/FriendsContext";
function Friend({ parentCallbackFriend }) {
  const [user, setUser] = useState();
  const { currentUser } = useAuth();
  const userNameRef = useRef();
  const [error, setError] = useState();
  const { friends, getUserFriends } = useFriends();
  function getFriends() {
    getUserFriends();
  }
  async function handle(e) {
    e.preventDefault();
    try {
      setError("");
      await FriendAdapter.getUserByUserName(
        currentUser,
        userNameRef.current.value
      ).then((data) => {
        setUser(data.data);
        console.log(data.data);
      });
    } catch (err) {
      setError("Oops!! The requested user not found");
      console.log(error);
    }
  }
  function init() {
    setError("");
    setUser("");
  }
  useEffect(() => {
    getFriends();
  }, []);

  function handleClickFriend(groupId) {
    parentCallbackFriend(groupId);
  }
  return (
    <div className="friend">
      <h1 className="header">Friends</h1>
      <div className="header__left">
        <SearchIcon />
        <form onSubmit={handle} onChange={init}>
          <input
            placeholder="Search for Friends"
            type="text"
            ref={userNameRef}
          />
        </form>
      </div>
      <div className="userTab">
        {error && <Alert severity="error">{error}</Alert>}
        {user && (
          <UserCard
            firstName={user?.firstName}
            lastName={user?.lastName}
            userName={user?.userName}
            id={user?.id}
          />
        )}
      </div>
      <div className="friendls">
        {friends?.map((f) => (
          <div onClick={() => handleClickFriend(f)}>
            <FriendList
              key={f.id}
              firstName={f.firstName}
              lastName={f.lastName}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Friend;
