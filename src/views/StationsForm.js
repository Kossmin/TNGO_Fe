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
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import HcmDistrict from "../assets/const/HCMDistrict";
import stationStatus from "../assets/const/stationStatus";

const StationsForm = (props) => {
  const [districtData, setDistrictData] = useState();
  const [statusData, setStatusData] = useState();
  const capabilityInput = useRef();
  const districtInput = useRef();
  const addressInput = useRef();
  const statusInput = useRef();
  const navigate = useHistory();

  const fetchDistrictData = () => {
    const tranformedDistrict = HcmDistrict.map((district) => {
      return (
        <option key={district.Id} value={district.Id}>
          {district.District}
        </option>
      );
    });

    setDistrictData(tranformedDistrict);
  };

  const fetchStatusData = () => {
    const tranformedStatus = stationStatus.map((status) => {
      return (
        <option key={status.Id} value={status.Id}>
          {status.Status}
        </option>
      );
    });

    setStatusData(tranformedStatus);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    axios
      .post("http://18.189.6.9/api/v1/station", {
        location:
          districtInput.current.value + "|" + addressInput.current.value,
        capability: capabilityInput.current.value,
        status: statusInput.current.value,
      })
      .then((response) => {
        navigate.push("/admin/station");
      });
  };

  useEffect(() => {
    fetchDistrictData();
    fetchStatusData();
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
                  <label>Capability</label>
                  <Form.Control
                    ref={capabilityInput}
                    placeholder="Capability"
                    type="number"
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>District</Form.Label>
                  <Form.Control ref={districtInput} as="select">
                    {districtData}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <label>Address</label>
                  <Form.Control
                    ref={addressInput}
                    placeholder="Address"
                    type="text"
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Status</Form.Label>
                  <Form.Control ref={statusInput} as="select">
                    {statusData}
                  </Form.Control>
                </Form.Group>
                <Button className="btn-fill mt-3" type="submit" variant="info">
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

export default StationsForm;
