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

function Auth() {
  return (
    <>
      <div className="wrapper wrapper-full-page">
        {/* Navbar */}
        <button onClick={signInWithGoogle}>Login with GG</button>
        {/* End Navbar */}
      </div>
    </>
  );
}

export default Auth;
