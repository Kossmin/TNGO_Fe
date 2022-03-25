import React from "react";
import { Switch, Route } from "react-router-dom";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Container,
  Col,
} from "react-bootstrap";

// dinamically create auth routes
import routes from "routes.js";
import { signInWithGoogle } from "../views/Auth/Firebase";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Image from "../assets/img/TNGOAdminBackground.jpg";

function Auth() {
  const ctx = useContext(AuthContext);
  const navigate = useHistory();

  const sectionStyle = {
    // backgroundImage: `url(${Image})`,
    // backgroundSize: "cover",
    // backgroundPosition: "center",
    // backgroundRepeat: "no-repeat",
    width: "100%",
    position: "absolute",
  };

  const sectionStyleRow = {
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  };

  const loginHandler = () => {
    signInWithGoogle().then((data) => {
      axios
        .get(
          "http://18.189.6.9/api/v1/auth/login?token=" +
            data._tokenResponse.idToken
        )
        .then((response) => {
          console.log(response);
          ctx.onLogin(response.data.token);
          navigate.push("/admin/dashboard");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  return (
    <>
      <div style={{ height: "100vh" }}>
        <img style={sectionStyle} src={Image}></img>
        <div style={sectionStyleRow}>
          {/* Navbar */}
          <Button
            style={{ zIndex: 1 }}
            variant="secondary"
            size="lg"
            onClick={loginHandler}
          >
            Login with GG
          </Button>
          {/* End Navbar */}
        </div>
      </div>
    </>
  );
}

export default Auth;
