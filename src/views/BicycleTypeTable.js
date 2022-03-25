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
  const [changes, setChanges] = useState();

  const deleteType = (id) => {
    axios
      .delete("http://18.189.6.9/api/v1/bicycle-type/" + id)
      .then((response) => {
        console.log("Delete");
        setChanges(id);
      })
      .catch((error) => {
        alert("This type can not be deleted!");
      });
  };

  const fetchData = async () => {
    return await axios
      .get("http://18.189.6.9/api/v1/bicycle-type?page=" + pageIndex)
      .then((data) => {
        console.log(data);
        const types = data.data.map((typeData) => {
          return (
            <tr key={typeData.Id}>
              <td>{typeData.Id}</td>
              <td>{typeData.Type}</td>
              <td>
                <Link to={`/admin/bicycletypes/form?id=${typeData.Id}`}>
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
                    confirm("Are you sure you want to hide this type");
                    deleteType(typeData.Id);
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

  useEffect(() => fetchData(), [pageIndex, changes]);

  return (
    <Container>
      <Row>
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>{bicycleType}</tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BicycleTypeTable;
