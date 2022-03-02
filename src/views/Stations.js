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
} from "react-bootstrap";
import { Switch, Route } from "react-router-dom";

import "./Bicycles.css";
import "./Component.css";
import StationsForm from "./StationsForm";
import StationsTable from "./StationsTable";

const Stations = (props) => {
  return (
    <Switch>
      <Route path="/admin/stations/form">
        <StationsForm />
      </Route>
      <Route path="/admin/stations">
        <StationsTable />
      </Route>
    </Switch>
  );
};

export default Stations;
