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
  Alert,
  ResponsiveEmbed,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";

import AuthContext from "../store/auth-context";
import "./Bicycles.css";
import "./Component.css";
import bicycleType from "../assets/const/bicycleType";

const BicycleTable = (props) => {
  const [bicycleData, setBicycleData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState({});
  const plate = useRef();
  const [searchType, setSearchType] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [changes, setChanges] = useState("");
  const [totalPage, setTotalPage] = useState({
    totalPage: 0,
    elementArray: [],
  });

  const ctx = useContext(AuthContext);

  const searchBicycleWithType = async () => {
    setIsLoading(true);
    return await axios
      .get(
        "http://18.189.6.9/api/v1/bicycle/search-type?type=" +
          searchType +
          "&page=" +
          pageIndex
      )
      .then((data) => {
        console.log(searchType);
        setBicycleData(mapData(data.data));
        mapPaing(data.data.TotalPage);
        setIsLoading(false);
      });
  };

  const searchBicycleWithPlate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    return await axios
      .get(
        "http://18.189.6.9/api/v1/bicycle/search-plate?plate=" +
          plate.current.value +
          "&page=" +
          pageIndex
      )
      .then((data) => {
        setBicycleData(mapData(data.data));

        mapPaing(data.data.TotalPage);
        setIsLoading(false);
      });
  };

  const fetchTypeData = async () => {
    return await axios
      .get("http://18.189.6.9/api/v1/bicycle-type")
      .then((response) => {
        const tmpType = response.data.map((data) => {
          return (
            <Dropdown.Item
              onClick={() => {
                if (data.Id != searchType) {
                  setSearchType(data.Id);
                  setPageIndex(0);
                }
              }}
              key={data.Id}
              value={data.Id}
            >
              {data.Type}
            </Dropdown.Item>
          );
        });
        setType(tmpType);
      });
  };

  const fetchBicycleData = async () => {
    setIsLoading(true);
    return await axios
      .get("http://18.189.6.9/api/v1/bicycle?page=" + pageIndex)
      .then((data) => {
        setTotalPage({ totalPage: data.data.TotalPage, elementArray: [] });
        setBicycleData(mapData(data.data));
        mapPaing(data.data.TotalPage);
        setIsLoading(false);
      });
  };

  const mapPaing = (numberOfPage) => {
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

  const mapData = (data) => {
    return data.Bicycles.map((bicData) => {
      return (
        <tr
          className={`${
            bicData.Status == 1
              ? "success"
              : bicData.Status == 2 || bicData.Status == 3
              ? "warning"
              : "danger"
          }`}
          key={bicData.Id}
        >
          <td>{bicData.Id}</td>
          <td>{bicData.Type.Type}</td>
          <td>{bicData.Description}</td>
          <td>{bicData.LicensePlate}</td>
          <td>{bicData.Station.Location}</td>
          <td>
            {bicData.Status == 1
              ? "Available"
              : bicData.Status == 2
              ? "Occupied"
              : bicData.Status == 3
              ? "Maintainance"
              : "Deleted"}
          </td>
          <td>
            <Link to={`/admin/bicycles/form?id=${bicData.Id}`}>
              <Button
                onClick={() => {}}
                variant="warning"
                size="sm"
                className="text-warning btn-link edit"
              >
                <i className="fa fa-edit" />
              </Button>
            </Link>

            <Button
              onClick={() => {
                if (confirm("Are you sure you want to hide this bicycle?")) {
                  axios
                    .delete("http://18.189.6.9/api/v1/bicycle/" + bicData.Id)
                    .then(() => setChanges(bicData.Id))
                    .catch(() => alert("You are not allow to delete this"));
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
      );
    });
  };

  const setAxiosDefaultHeader = () => {
    axios.defaults.headers = {
      Authorization: "Bearer " + localStorage.getItem("user"),
    };
  };

  useEffect(() => {
    if (searchType != "") {
      searchBicycleWithType();
    } else {
      fetchBicycleData();
    }
    setAxiosDefaultHeader();
    fetchTypeData();
    console.log(ctx.user);
  }, [pageIndex, searchType, plate, changes]);

  return (
    <Container>
      <Row>
        <Col md="2">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Bicycle types
            </Dropdown.Toggle>

            <Dropdown.Menu>{type}</Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md="5" sm="12">
          <Form className="d-flex" onSubmit={searchBicycleWithPlate}>
            <FormControl
              // onChange={(e) => {
              //   setPlate(e.target.value);
              // }}
              ref={plate}
              type="search"
              placeholder="Search by lisence plate"
              className="me-2"
              aria-label="Search"
            />
            <Button type="submit" variant="outline-success">
              Search
            </Button>
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
      {isLoading && (
        <Row>
          <Alert variant="info">Loading...</Alert>
        </Row>
      )}
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
                {!isLoading && <tbody>{bicycleData}</tbody>}
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

export default BicycleTable;
