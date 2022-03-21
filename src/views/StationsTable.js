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
import { useState, useEffect } from "react";
import axios from "axios";
import "./Bicycles.css";
import "./Component.css";

const StationsTable = (props) => {
  const [stationData, setStationData] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);

  const fetchData = () => {
    return axios
      .get("http://18.189.6.9/api/v1/station?page=" + pageIndex)
      .then((data) => {
        return data.data["$values"];
      })
      .then((staData) => {
        const stations = staData.map((station) => (
          <tr className="success" key={station.id}>
            <td>{station.id.toString()}</td>
            <td>{station.status}</td>
            <td>
              {console.log(station.bicycles)}
              {station.bicycles["$values"].length}/
              {station.capability.toString()}
            </td>
            <td>{station.location}</td>
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
        ));
        setStationData(stations);
      });
  };

  useEffect(() => {
    fetchData();
  }, [pageIndex]);

  return (
    <Container>
      <Row className="justify-content-between">
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

export default StationsTable;
