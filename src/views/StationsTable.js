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
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Bicycles.css";
import "./Component.css";

import stationStatusConst from "../assets/const/stationStatus";

const StationsTable = (props) => {
  const [stationData, setStationData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [changes, setChanges] = useState();
  const [totalPage, setTotalPage] = useState({
    totalPage: 0,
    elementArray: [],
  });
  const searchLocationString = useRef();

  const fetchData = () => {
    return axios
      .get("http://18.189.6.9/api/v1/station?page=" + pageIndex)

      .then((staData) => {
        console.log(staData);
        mapPaging(staData.data.TotalPage);
        setStationData(transformData(staData.data.Stations));
      });
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

  const transformData = (data) => {
    return data.map((station) => (
      <tr className="success" key={station.Id}>
        <td>{station.Id.toString()}</td>
        <td>{stationStatusConst[station.Status].Status}</td>
        <td>{station.Capability.toString()}</td>
        <td>{station.Location}</td>
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
              if (confirm("Are you sure you want to hide this station?")) {
                axios
                  .delete("http://18.189.6.9/api/v1/station/" + station.Id)
                  .then(() => setChanges(station.Id));
              }
            }}
            variant="danger"
            size="sm"
            className="btn-link remove text-danger"
          >
            <i className="fa fa-times" />
          </Button>
        </td>
      </tr>
    ));
  };

  const searchByLocation = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    fetchData();
  }, [pageIndex, changes]);

  return (
    <Container>
      <Row className="justify-content-between">
        <Col xs="12" sm="5">
          <Form className="d-flex" onSubmit={searchByLocation}>
            <FormControl
              ref={searchLocationString}
              type="search"
              placeholder="Search By Location"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Col>
        <Col md="2" className="flex-justify-right">
          <Link to="/admin/stations/form">
            <Button className="btn-round flex-align-center" variant="success">
              <i className="nc-icon nc-simple-add" /> <span>&nbsp;</span>Add
            </Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <Card className="regular-table-with-color">
            <Card.Header>
              <Card.Title as="h4">Stations</Card.Title>
              {/* <p className="card-category">Here is a subtitle for this table</p> */}
            </Card.Header>
            <Card.Body className="table-responsive p-0">
              <Table className="table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Status</th>
                    <th>Available bikes</th>
                    <th>Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>{stationData}</tbody>
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

export default StationsTable;
