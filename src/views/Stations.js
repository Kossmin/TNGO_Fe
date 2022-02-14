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
import "./Component.css";

const Stations = (props) => {
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
          <Button className="btn-round flex-align-center" variant="success">
            <i className="nc-icon nc-simple-add" /> <span>&nbsp;</span>Add
          </Button>
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
                    <th>Name</th>
                    <th>Status</th>
                    <th>Available bikes</th>
                    <th>Location</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="success">
                    <td>1</td>
                    <td>Dakota Rice</td>
                    <td>Working</td>
                    <td>8/12</td>
                    <td>Oud-Turnhout</td>
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
                  <tr className="success">
                    <td>2</td>
                    <td>Minerva Hooper</td>
                    <td>Working</td>
                    <td>9/15</td>
                    <td>Sinaai-Waas</td>
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
                  <tr className="success">
                    <td>3</td>
                    <td>Sage Rodriguez</td>
                    <td>Working</td>
                    <td>4/10</td>
                    <td>Baileux</td>
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
                  <tr className="success">
                    <td>4</td>
                    <td>Philip Chaney</td>
                    <td>Working</td>
                    <td>12/12</td>
                    <td>Overland Park</td>
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
                  <tr className="danger">
                    <td>5</td>
                    <td>Doris Greene (Danger)</td>
                    <td>Not Working</td>
                    <td>0/9</td>
                    <td>Feldkirchen in Kärnten</td>
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
                  <tr className="success">
                    <td>6</td>
                    <td>Mason Porter</td>
                    <td>Working</td>
                    <td>2/13</td>
                    <td>Gloucester</td>
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
                  <tr className="success">
                    <td>7</td>
                    <td>Mike Chaney (Warning)</td>
                    <td>Working</td>
                    <td>3/8</td>
                    <td>Bucharest</td>
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
