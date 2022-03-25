import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import AuthContext from "../store/auth-context";
import AdminLayout from "layouts/Admin";
import AuthLayout from "layouts/Auth";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const navigate = useHistory();
  const loginHandler = (token) => {
    setIsLoggedIn(true);
    setUserToken(token);
    localStorage.setItem("user", token);
  };

  const logoutHandler = (token) => {
    setIsLoggedIn(false);
    setUserToken(null);
    localStorage.removeItem("user");
  };

  const checkLogin = () => {
    if (localStorage.getItem("user")) {
      setIsLoggedIn(true);
      navigate.push("/admin/dashboard");
    }
  };
  useEffect(() => {
    checkLogin();
  }, [userToken]);
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        user: localStorage.getItem("user"),
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {!isLoggedIn && <AuthLayout></AuthLayout>}
      {isLoggedIn && <AdminLayout></AdminLayout>}
    </AuthContext.Provider>
  );
};

export default App;
