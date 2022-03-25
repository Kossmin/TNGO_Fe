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
import { useHistory, useLocation } from "react-router-dom";

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
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const stationId = query.get("id");

  const checkAddUpdate = () => {
    if (stationId != null) {
      axios
        .get("http://18.189.6.9/api/v1/station/get/" + stationId)
        .then((response) => {
          const spittedAddress = response.data.Location.toString().split("|");
          districtInput.current.value = spittedAddress[0];
          addressInput.current.value = spittedAddress[1];
          capabilityInput.current.value = response.data.Capability;
          statusInput.current.value = response.data.Status;
        });
    }
  };

  const fetchDistrictData = () => {
    const tranformedDistrict = HcmDistrict.map((district) => {
      return (
        <option key={district.Id} value={district.District}>
          {district.District}
        </option>
      );
    });

    setDistrictData(tranformedDistrict);
  };

  const fetchStatusData = () => {
    console.log(stationStatus);
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
    if (stationId == null) {
      axios
        .post("http://18.189.6.9/api/v1/station", {
          location:
            districtInput.current.value + "|" + addressInput.current.value,
          capability: capabilityInput.current.value,
          status: statusInput.current.value,
        })
        .then((response) => {
          navigate.push("/admin/stations");
        });
    } else {
      axios
        .put("http://18.189.6.9/api/v1/station/update?id=" + stationId, {
          location:
            districtInput.current.value + "|" + addressInput.current.value,
          capability: capabilityInput.current.value,
          status: statusInput.current.value,
        })
        .then((response) => {
          navigate.push("/admin/stations");
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
    fetchDistrictData();
    fetchStatusData();
    checkAddUpdate();
  }, []);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md="6" sm="10">
          <Card className="stacked-form">
            <Card.Header>
              <Card.Title as="h4">
                {stationId != null ? "Update a station" : "Add new station"}
              </Card.Title>
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
