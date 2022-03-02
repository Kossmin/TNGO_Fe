import React from "react";
import {
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Pagination,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import { Route, Switch } from "react-router-dom";

import "./Bicycles.css";
import BicycleTypeForm from "./BicycleTypeForm";
import BicycleTypeTable from "./BicycleTypeTable";
import "./Component.css";

const BicycleTypes = (props) => {
  return (
    <Switch>
      <Route path="/admin/bicycletypes/form">
        <BicycleTypeForm />
      </Route>
      <Route path="/admin/bicycletypes/">
        <BicycleTypeTable />
      </Route>
    </Switch>
  );
};

export default BicycleTypes;
