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
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Bicycles.css";
import "./Component.css";

import stationStatusConst from "../assets/const/stationStatus";
import HcmDistrict from "assets/const/HCMDistrict";

const StationsTable = (props) => {
  const [stationData, setStationData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [changes, setChanges] = useState();
  const [totalPage, setTotalPage] = useState({
    totalPage: 0,
    elementArray: [],
  });
  const [searchDistrict, setSearchDistrict] = useState();
  const [districtString, setDistrictString] = useState();

  const fetchData = () => {
    return axios
      .get("http://18.189.6.9/api/v1/station?page=" + pageIndex)

      .then((staData) => {
        console.log(staData);
        mapPaging(staData.data.TotalPage);
        setStationData(transformData(staData.data.Stations));
      });
  };

  const searchByDistrict = async () => {
    console.log("searchByDistrict");
    return await axios
      .get(
        "http://18.189.6.9/api/v1/station?page=" +
          pageIndex +
          "&district=" +
          districtString
      )
      .then((response) => {
        console.log(response);
        setStationData(transformData(response.data.Stations));
        mapPaging(response.data.TotalPage);
      });
  };

  const fetchDistrictData = () => {
    const transferDistrict = HcmDistrict.map((district) => {
      return (
        <Dropdown.Item
          onClick={() => setDistrictString(district.District)}
          key={`${district.Id}district`}
          value={district.District}
        >
          {district.District}
        </Dropdown.Item>
      );
    });
    setSearchDistrict(transferDistrict);
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
          <Link to={`/admin/stations/form?id=${station.Id}`}>
            <Button
              variant="warning"
              size="sm"
              className="text-warning btn-link edit"
            >
              <i className="fa fa-edit" />
            </Button>
          </Link>

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

  const setAxiosDefaultHeader = () => {
    axios.defaults.headers = {
      Authorization: "Bearer " + localStorage.getItem("user"),
    };
  };

  useEffect(() => {
    if (districtString != null) {
      searchByDistrict();
    } else {
      fetchData();
    }
    fetchDistrictData();
    setAxiosDefaultHeader();
  }, [pageIndex, changes, districtString]);

  return (
    <Container>
      <Row className="justify-content-between">
        <Col md="6">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              District
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ overflowY: "scroll", maxHeight: "200px" }}>
              {searchDistrict}
            </Dropdown.Menu>
          </Dropdown>
          {districtString && (
            <Button
              onClick={() => setDistrictString(null)}
              className="btn-round flex-align-center"
              variant="info"
            >
              <i className="nc-icon nc-simple-add" /> Show all station
            </Button>
          )}
        </Col>
        {/* <Col md="3"></Col> */}
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
