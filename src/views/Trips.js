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
} from "react-bootstrap";

import "./Bicycles.css";

const Trips = (props) => {
  return (
    <Container>
      <Row className="justify-content-end">
        <Col xs="12" sm="5">
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
      </Row>
      <Row>
        <Col md="12">
          <Card className="regular-table-with-color">
            <Card.Header>
              <Card.Title as="h4">Trips history</Card.Title>
              {/* <p className="card-category">Here is a subtitle for this table</p> */}
            </Card.Header>
            <Card.Body className="table-responsive p-0">
              <Table className="table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Bicycle Id</th>
                    <th>Time Start</th>
                    <th>Time End</th>
                    <th>From</th>
                    <th>To</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="success">
                    <td>1</td>
                    <td>Dakota Rice (Success)</td>
                    <td>14:25</td>
                    <td>16:20</td>
                    <td>Niger</td>
                    <td>Oud-Turnhout</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Minerva Hooper</td>
                    <td>14:25</td>
                    <td>16:20</td>
                    <td>Curaçao</td>
                    <td>Sinaai-Waas</td>
                  </tr>
                  <tr className="info">
                    <td>3</td>
                    <td>Sage Rodriguez (Info)</td>
                    <td>14:25</td>
                    <td>16:20</td>
                    <td>Netherlands</td>
                    <td>Baileux</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>Philip Chaney</td>
                    <td>14:25</td>
                    <td>16:20</td>
                    <td>Korea, South</td>
                    <td>Overland Park</td>
                  </tr>
                  <tr className="danger">
                    <td>5</td>
                    <td>Doris Greene (Danger)</td>
                    <td>14:25</td>
                    <td>16:20</td>
                    <td>Malawi</td>
                    <td>Feldkirchen in Kärnten</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>Mason Porter</td>
                    <td>14:25</td>
                    <td>16:20</td>
                    <td>Chile</td>
                    <td>Gloucester</td>
                  </tr>
                  <tr className="warning">
                    <td>7</td>
                    <td>Mike Chaney (Warning)</td>
                    <td>14:25</td>
                    <td>16:20</td>
                    <td>Romania</td>
                    <td>Bucharest</td>
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

export default Trips;
