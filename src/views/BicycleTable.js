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
  ResponsiveEmbed,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";

import "./Bicycles.css";
import "./Component.css";

const BicycleTable = (props) => {
  const [bicycleData, setBicycleData] = useState([]);

  const fetchData = () => {
    return axios.get("http://18.189.6.9/api/v1/bicycle").then((data) => {
      console.log(data.data);
      const bicycles = data.data.map((bicData) => {
        return (
          <tr
            className={`${
              bicData.status == 1
                ? "success"
                : bicData.status == 2 || bicData.status == 3
                ? "danger"
                : "warning"
            }`}
            key={bicData.id}
          >
            <td>{bicData.id}</td>
            <td>Bicycle</td>
            <td>{bicData.description}</td>
            <td>{bicData.licensePlate}</td>
            <td>Niger</td>
            <td>
              {bicData.status == 1
                ? "Available"
                : bicData.status == 2
                ? "Occupied"
                : bicData.status == 3
                ? "Maintainance"
                : "Deleted"}
            </td>
            <td>
              <Button
                onClick={() => {
                  let obj = data.find((o) => o.id === key);
                  alert(
                    "You've clicked EDIT button on \n{ \nName: " +
                      obj.name +
                      ", \nposition: " +
                      obj.position +
                      ", \noffice: " +
                      obj.office +
                      ", \nage: " +
                      obj.age +
                      "\n}."
                  );
                }}
                variant="warning"
                size="sm"
                className="text-warning btn-link edit"
              >
                <i className="fa fa-edit" />
              </Button>
              <Button
                onClick={() => {
                  var newData = data;
                  newData.find((o, i) => {
                    if (o.id === key) {
                      // here you should add some custom code so you can delete the data
                      // from this component and from your server as well
                      newData.splice(i, 1);
                      return true;
                    }
                    return false;
                  });
                  setData([...newData]);
                }}
                variant="danger"
                size="sm"
                className="btn-link remove text-danger"
              >
                <i className="fa fa-times" />
              </Button>
            </td>
          </tr>
        );
      });
      setBicycleData(bicycles);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <Row>
        <Col md="2">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Bicycle types
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1" active>
                Bicycles
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">Hybrid bike</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Electric bike</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md="5" sm="12">
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search By Id"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Col>
        <Col className="flex-justify-right">
          <Link to="/admin/bicycles/form">
            <Button className="btn-round flex-align-center">
              <i className="nc-icon nc-simple-add" /> Add
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card className="regular-table-with-color">
            <Card.Header>
              <Card.Title as="h4">Bicycles</Card.Title>
              {/* <p className="card-category">Here is a subtitle for this table</p> */}
            </Card.Header>
            <Card.Body className="table-responsive p-0">
              <Table className="table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>License plate</th>
                    <th>Station</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>{bicycleData}</tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <Pagination className="pagination pagination-no-border justify-content">
            <Pagination.Item>«</Pagination.Item>
            <Pagination.Item>1</Pagination.Item>
            <Pagination.Item>2</Pagination.Item>
            <Pagination.Item active>3</Pagination.Item>
            <Pagination.Item>4</Pagination.Item>
            <Pagination.Item>5</Pagination.Item>
            <Pagination.Item>»</Pagination.Item>
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default BicycleTable;
