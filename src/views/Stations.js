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
} from "react-bootstrap";

import "./Bicycles.css";

const Stations = (props) => {
  return (
    <Container>
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
                    <th>Name</th>
                    <th>Status</th>
                    <th>Available bikes</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="success">
                    <td>1</td>
                    <td>Dakota Rice</td>
                    <td>Working</td>
                    <td>8/12</td>
                    <td>Oud-Turnhout</td>
                  </tr>
                  <tr className="success">
                    <td>2</td>
                    <td>Minerva Hooper</td>
                    <td>Working</td>
                    <td>9/15</td>
                    <td>Sinaai-Waas</td>
                  </tr>
                  <tr className="success">
                    <td>3</td>
                    <td>Sage Rodriguez</td>
                    <td>Working</td>
                    <td>4/10</td>
                    <td>Baileux</td>
                  </tr>
                  <tr className="success">
                    <td>4</td>
                    <td>Philip Chaney</td>
                    <td>Working</td>
                    <td>12/12</td>
                    <td>Overland Park</td>
                  </tr>
                  <tr className="danger">
                    <td>5</td>
                    <td>Doris Greene (Danger)</td>
                    <td>Not Working</td>
                    <td>0/9</td>
                    <td>Feldkirchen in Kärnten</td>
                  </tr>
                  <tr className="success">
                    <td>6</td>
                    <td>Mason Porter</td>
                    <td>Working</td>
                    <td>2/13</td>
                    <td>Gloucester</td>
                  </tr>
                  <tr className="success">
                    <td>7</td>
                    <td>Mike Chaney (Warning)</td>
                    <td>Working</td>
                    <td>3/8</td>
                    <td>Bucharest</td>
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

export default Stations;
