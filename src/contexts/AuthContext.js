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
    console.log(authRequest.userName, authRequest.password);
    let data = await auth.signIn(authRequest).then((data) => {
      setCurrentUser(data.data);
      console.log(`The data is ${data.data}`);
    });
    return data;
  }

  useEffect(() => {
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    login,
  };
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
