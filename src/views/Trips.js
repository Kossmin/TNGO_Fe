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
  const [totalPage, setTotalPage] = useState({
    totalPage: 0,
    elementArray: [],
  });
  const [trips, setTrips] = useState();
  const startDate = useRef();
  const endDate = useRef();

  const [isFull, setIsFull] = useState(true);

  const fetchTrip = async () => {
    return await axios
      .get("http://18.189.6.9/api/v1/trip?page=" + pageIndex)
      .then((response) => {
        setIsFull(true);
        console.log(response);
        mapData(response.data.Trips);
        mapPaging(response.data.TotalPage);
      });
  };

  const mapData = (data) => {
    const transformedTrip = data.map((trip) => {
      return (
        <tr key={trip.Id} className="success">
          <td>{trip.Id}</td>
          <td>{trip.BicycleId}</td>
          <td>{trip.BeginTime}</td>
          <td>{trip.EndTime}</td>
          <td>{trip.StationStart.Location}</td>
          <td>{trip.StationEnd.Location}</td>
        </tr>
      );
    });
    setTrips(transformedTrip);
  };

  const mapPaging = (numberOfPage) => {
    let tmp = [];
    if (pageIndex == 0) {
      if (numberOfPage <= 3) {
        for (let i = 0; i < numberOfPage; i++) {
          tmp.push(i);
        }
      } else {
        for (let i = 0; i < 3; i++) {
          tmp.push(i);
        }
      }
    } else if (pageIndex == totalPage.totalPage - 1) {
      if (numberOfPage <= 3) {
        for (let i = 0; i < numberOfPage; i++) {
          tmp.push(i);
        }
      } else {
        for (let i = pageIndex - 2; i <= pageIndex; i++) {
          tmp.push(i);
        }
      }
    } else {
      for (let i = pageIndex - 1; i <= pageIndex + 1; i++) {
        tmp.push(i);
      }
    }
    setTotalPage({ totalPage: numberOfPage, elementArray: tmp });
  };

  const searchTrip = (e) => {
    e.preventDefault();
    console.log(startDate.current.value, endDate.current.value);

    return axios
      .get(
        "http://18.189.6.9/api/v1/trip/by-date?start=" +
          startDate.current.value +
          "&end=" +
          endDate.current.value +
          "&page=" +
          pageIndex
      )
      .then((response) => {
        setIsFull(false);
        console.log(startDate, endDate);
        mapData(response.data.Trips);
      });
  };

  useEffect(() => {
    fetchTrip();
  }, []);

  return (
    <Container>
      <Row className="justify-content-end">
        {!isFull && (
          <Col sm="2">
            <Button onClick={fetchTrip}>Show all trips</Button>
          </Col>
        )}
        <Col xs="12" sm="5">
          <Form className="d-flex" onSubmit={searchTrip}>
            <FormControl
              ref={startDate}
              type="date"
              placeholder="Start date"
              className="me-2"
            />
            <FormControl
              ref={endDate}
              type="date"
              placeholder="End date"
              className="me-2"
            />
            <Button type="submit" variant="outline-success">
              Search
            </Button>
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
            {pageIndex != 0 && (
              <Pagination.Item onClick={() => setPageIndex(pageIndex - 1)}>
                «
              </Pagination.Item>
            )}
            {totalPage.elementArray.map((index) => {
              if (index == pageIndex) {
                return (
                  <Pagination.Item
                    active
                    key={index}
                    onClick={() => setPageIndex(index--)}
                  >
                    {index + 1}
                  </Pagination.Item>
                );
              } else {
                return (
                  <Pagination.Item
                    key={index}
                    onClick={() => setPageIndex(index--)}
                  >
                    {index + 1}
                  </Pagination.Item>
                );
              }
            })}
            {pageIndex != totalPage.totalPage - 1 && (
              <Pagination.Item onClick={() => setPageIndex(pageIndex + 1)}>
                »
              </Pagination.Item>
            )}
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
};

export default Trips;
