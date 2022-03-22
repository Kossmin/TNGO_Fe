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
import { useState, useRef, useEffect } from "react";
import axios from "axios";

import "./Bicycles.css";

const Trips = (props) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [trips, setTrips] = useState();

  const fetchTrip = async () => {
    return await axios
      .get("http://18.189.6.9/api/v1/trip?page=" + pageIndex)
      .then((response) => {
        const transformedTrip = response.data.map((trip) => {
          return (
            <tr className="success">
              <td>1</td>
              <td>Dakota Rice (Success)</td>
              <td>14:25</td>
              <td>16:20</td>
              <td>Niger</td>
              <td>Oud-Turnhout</td>
            </tr>
          );
        });
        setTrips(transformedTrip);
      });
  };

  useEffect(() => {
    fetchTrip();
  }, []);

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
                <tbody>{trips}</tbody>
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
