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
import { Link } from "react-router-dom";

import "./Bicycles.css";
import "./Component.css";

const BicycleTable = (props) => {
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
                    <th>Name</th>
                    <th>Type</th>
                    <th>License plate</th>
                    <th>Station</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="success">
                    <td>1</td>
                    <td>Dakota Rice (Success)</td>
                    <td>Bicycle</td>
                    <td>36738</td>
                    <td>Niger</td>
                    <td>Using</td>
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
                  <tr>
                    <td>2</td>
                    <td>Minerva Hooper</td>
                    <td>Bicycle</td>
                    <td>23789</td>
                    <td>Curaçao</td>
                    <td>Available</td>
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
                  <tr className="info">
                    <td>3</td>
                    <td>Sage Rodriguez (Info)</td>
                    <td>Bicycle</td>
                    <td>56142</td>
                    <td>Netherlands</td>
                    <td>Available</td>
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
                  <tr>
                    <td>4</td>
                    <td>Philip Chaney</td>
                    <td>Bicycle</td>
                    <td>38735</td>
                    <td>Korea, South</td>
                    <td>Available</td>
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
                  <tr className="danger">
                    <td>5</td>
                    <td>Doris Greene (Danger)</td>
                    <td>Bicycle</td>
                    <td>63542</td>
                    <td>Malawi</td>
                    <td>Available</td>
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
                  <tr>
                    <td>6</td>
                    <td>Mason Porter</td>
                    <td>Bicycle</td>
                    <td>78615</td>
                    <td>Chile</td>
                    <td>Available</td>
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
                  <tr className="warning">
                    <td>7</td>
                    <td>Mike Chaney (Warning)</td>
                    <td>Bicycle</td>
                    <td>38735</td>
                    <td>Romania</td>
                    <td>Available</td>
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
                </tbody>
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
