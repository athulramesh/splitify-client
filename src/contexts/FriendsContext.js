import React, { useContext, useEffect, useState } from "react";
import friendAdapter from "../adapters/friendAdapter";
import { useAuth } from "./AuthContext";
const AuthContext = React.createContext();

export function useFriends() {
  return useContext(AuthContext);
}

export function FriendsProvider({ children }) {
  const [friends, setFriends] = useState();
  const { currentUser } = useAuth();
  async function getFriends(currentUser) {
    let data = await friendAdapter.getFriends(currentUser).then((data) => {
      setFriends(data.data);
    });
    return data;
  }
  function getUserFriends() {
    if (friends) {
      return friends;
    } else {
      return getFriends(currentUser);
    }
  }
  const value = {
    friends,
    getFriends,
    getUserFriends,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
