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
import { useHistory } from "react-router-dom";
import { useEffect, useRef } from "react";

const BicycleTypeForm = (props) => {
  const typeInput = useRef();
  const nevigate = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://18.189.6.9/api/v1/bicycle-type", {
        id: 0,
        type: typeInput.current.value,
      })
      .then((response) => {
        nevigate("/admin/bicycletypes");
      });
  };

  const setAxiosDefaultHeader = () => {
    axios.defaults.headers = {
      Authorization: "Bearer " + localStorage.getItem("user"),
    };
  };

  useEffect(() => {
    setAxiosDefaultHeader();
  }, []);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="6" sm="10">
          <Card className="stacked-form">
            <Card.Header>
              <Card.Title as="h4">Add new Bike</Card.Title>
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
              </Form>
              <Button className="btn-fill" type="submit" variant="info">
                Submit
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BicycleTypeForm;
