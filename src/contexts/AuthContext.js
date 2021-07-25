import React, { useContext, useEffect, useState } from "react";
import auth from "../adapters/authenticationAdapter";
import Cookies from "universal-cookie";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const cookies = new Cookies();
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  async function login(authRequest) {
    let data = await auth.signIn(authRequest).then((data) => {
      setCurrentUser(data.data);
      cookies.set("currentUser", data.data, { path: "/" });
    });
    return data;
  }

  function signOut() {
    cookies.remove("currentUser");
    setCurrentUser();
  }

  async function signUp(authRequest) {
    let data = await auth.signUp(authRequest).then((data) => {
      setCurrentUser(data.data);
    });
    return data;
  }
  useEffect(() => {
    setLoading(false);
    if (!currentUser) {
      let current = cookies.get("currentUser");
      if (current) {
        setCurrentUser(current);
      }
    }
  }, []);

  const value = {
    currentUser,
    login,
    signUp,
    signOut,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
