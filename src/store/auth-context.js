import React from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  user: null,
  onLogin: null,
  onLogout: null,
});

export default AuthContext;
