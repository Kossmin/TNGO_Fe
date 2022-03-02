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
import BicycleForm from "./BicycleForm";

import "./Bicycles.css";
import BicycleTable from "./BicycleTable";
import "./Component.css";

const Bicycles = (props) => {
  return (
    <section>
      <Switch>
        <Route path="/admin/bicycles" exact>
          <BicycleTable />
        </Route>
        <Route path="/admin/bicycles/form">
          <BicycleForm />
        </Route>
      </Switch>
    </section>
  );
};

export default Bicycles;
