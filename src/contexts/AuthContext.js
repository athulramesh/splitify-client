import React, { useContext, useEffect, useState } from "react";
import auth from "../adapters/authenticationAdapter";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  async function login(authRequest) {
    let data = await auth.signIn(authRequest).then((data) => {
      setCurrentUser(data.data);
    });
    return data;
  }

  async function signUp(authRequest) {
    let data = await auth.signUp(authRequest).then((data) => {
      setCurrentUser(data.data);
    });
    return data;
  }
  useEffect(() => {
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    login,
    signUp,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
