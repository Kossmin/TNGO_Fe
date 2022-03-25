import {
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

import axios from "axios";

const BicycleTypeForm = (props) => {
  const typeInput = useRef();
  const nevigate = useHistory();
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const typeId = query.get("id");

  const submitHandler = (e) => {
    e.preventDefault();
    if (typeId == null) {
      axios
        .post("http://18.189.6.9/api/v1/bicycle-type", {
          id: 0,
          type: typeInput.current.value,
        })
        .then((response) => {
          nevigate.push("/admin/bicycletypes");
        });
    } else {
      axios
        .put("http://18.189.6.9/api/v1/bicycle-type/update?Id=" + typeId, {
          type: typeInput.current.value,
        })
        .then(() => {
          nevigate.push("/admin/bicycletypes");
        });
    }
  };

  const checkAddUpdate = () => {
    if (typeId != null) {
      axios
        .get("http://18.189.6.9/api/v1/bicycle-type/get/" + typeId)
        .then((response) => {
          typeInput.current.value = response.data.Type;
        });
    }
  };

  const setAxiosDefaultHeader = () => {
    axios.defaults.headers = {
      Authorization: "Bearer " + localStorage.getItem("user"),
    };
  };

  useEffect(() => {
    setAxiosDefaultHeader();
    checkAddUpdate();
  }, []);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="6" sm="10">
          <Card className="stacked-form">
            <Card.Header>
              <Card.Title as="h4">
                {typeId == null ? "Add new type" : "Update type"}
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={submitHandler}>
                <Form.Group>
                  <label>Bicycle Type</label>
                  <Form.Control
                    ref={typeInput}
                    placeholder="Enter type"
                    type="text"
                  ></Form.Control>
                </Form.Group>
                <Button className="btn-fill" type="submit" variant="info">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BicycleTypeForm;
