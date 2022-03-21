import { Link } from "react-router-dom";
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
import { useState, useEffect } from "react";
import color from "../assets/const/color";
import axios from "axios";

const BicycleTypeTable = (props) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [bicycleType, setBicycleType] = useState([]);
  const fetchData = async () => {
    return await axios
      .get("http://18.189.6.9/api/v1/bicycle-type?page=" + pageIndex)
      .then((data) => {
        console.log(color[1]);
        const types = data.data["$values"].map((typeData) => {
          return (
            <tr key={typeData.id}>
              <td>{typeData.id}</td>
              <td>{typeData.type}</td>
              <td>{color[typeData.color]}</td>
              <td>{typeData.dateAdded}</td>
              <td>100</td>
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
        setBicycleType(types);
      });
  };

  useEffect(() => fetchData(), [pageIndex]);

  return (
    <Container>
      <Row>
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
          <Link to="/admin/bicycletypes/form">
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
              <Table className="table-hover" striped>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name type</th>
                    <th>Color</th>
                    <th>Date Added</th>
                    <th>Total bikes</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>{bicycleType}</tbody>
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

export default BicycleTypeTable;
