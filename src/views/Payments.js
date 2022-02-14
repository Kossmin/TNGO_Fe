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

import "./Bicycles.css";

const Payment = (props) => {
  return (
    <Container>
      <Row className="justify-content-end">
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
      </Row>
      <Row>
        <Col md="12">
          <Card className="regular-table-with-color">
            <Card.Header>
              <Card.Title as="h4">Payments</Card.Title>
              {/* <p className="card-category">Here is a subtitle for this table</p> */}
            </Card.Header>
            <Card.Body className="table-responsive p-0">
              <Table className="table-hover">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Payment code</th>
                    <th>User Id</th>
                    <th>Date</th>
                    <th>Payment type</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>M1123</td>
                    <td>1232</td>
                    <td>14/2/2022</td>
                    <td>Momo</td>
                    <td>$200</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>M1123</td>
                    <td>1232</td>
                    <td>14/2/2022</td>
                    <td>Momo</td>
                    <td>$200</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>M1123</td>
                    <td>1232</td>
                    <td>14/2/2022</td>
                    <td>Momo</td>
                    <td>$200</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>M1123</td>
                    <td>1232</td>
                    <td>14/2/2022</td>
                    <td>Momo</td>
                    <td>$200</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>M1123</td>
                    <td>1232</td>
                    <td>14/2/2022</td>
                    <td>Momo</td>
                    <td>$200</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>M1123</td>
                    <td>1232</td>
                    <td>14/2/2022</td>
                    <td>Momo</td>
                    <td>$200</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>M1123</td>
                    <td>1232</td>
                    <td>14/2/2022</td>
                    <td>Momo</td>
                    <td>$200</td>
                  </tr>
                </tbody>
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

export default Payment;
