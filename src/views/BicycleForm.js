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

const BicycleForm = (props) => {
  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="6" sm="10">
          <Card className="stacked-form">
            <Card.Header>
              <Card.Title as="h4">Add new Bike</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form action="#" method="#">
                <Form.Group>
                  <label>Plate Number</label>
                  <Form.Control
                    placeholder="Enter email"
                    type="email"
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Type</Form.Label>
                  <Form.Control as="select">
                    <option>Bike</option>
                    <option>Hybrid</option>
                    <option>Electric</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Card.Body>
            <Card.Footer>
              <Button className="btn-fill" type="submit" variant="info">
                Submit
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BicycleForm;
