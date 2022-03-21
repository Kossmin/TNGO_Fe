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
import { useState, useEffect } from "react";

import axios from "axios";

import statusConst from "../assets/const/bicycleStatus";
import { storage } from "../views/Auth/Firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const BicycleForm = (props) => {
  const [type, setType] = useState();
  const [status, setStatus] = useState();
  const [station, setStation] = useState();

  const fetchTypeData = async () => {
    return await axios
      .get("http://18.189.6.9/api/v1/bicycle-type")
      .then((response) => {
        console.log(response.data);
        const tmpType = response.data.map((data) => {
          return (
            <option key={`${data.Id}+type`} value={data.Id}>
              {data.Type}
            </option>
          );
        });
        setType(tmpType);
      });
  };

  const setStatusData = () => {
    const transferStatus = statusConst.map((data) => {
      return (
        <option key={`${data.Id}+status`} value={data.Id}>
          {data.Status}
        </option>
      );
    });
    setStatus(transferStatus);
  };

  const setStationData = () => {
    return axios.get("http://18.189.6.9/api/v1/station").then((response) => {
      const transformedStation = response.data.map((data) => {
        return (
          <option key={`${data.Id}+station`} value={data.Id}>
            {data.Location}
          </option>
        );
      });
      setStation(transformedStation);
    });
  };

  useEffect(() => {
    fetchTypeData();
    setStatusData();
    setStationData();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(e.target[5].files[0]);
    uploadFile(e.target[5].files[0]);
    axios
      .post("http://18.189.6.9/api/v1/bicycle", {
        status: 0,
        description: "string",
        stationId: 0,
        licensePlate: "string",
        image: "string",
        typeId: 0,
      })
      .then((response) => console.log(response));
  };

  // const uploadFileHandler = (e) => {
  //   console.log(e);
  // };

  const uploadFile = (file) => {
    if (!file) return;
    console.log(file);
    const storageRef = ref(storage, `/files/${file.name}.png`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => console.log(url));
    });
    // const fileReader = new fileReader();
    // fileReader.readAsDataURL(file);
  };
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
                  <label>Plate Number</label>
                  <Form.Control
                    placeholder="Plate number"
                    type="text"
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Status</Form.Label>
                  <Form.Control as="select">{status}</Form.Control>
                </Form.Group>
                <Form.Group>
                  <label>Description</label>
                  <Form.Control
                    placeholder="Description"
                    type="text"
                    as="textarea"
                    style={{ height: "100px" }}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Station</Form.Label>
                  <Form.Control as="select">{station}</Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Type</Form.Label>
                  <Form.Control as="select">{type}</Form.Control>
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Image</Form.Label>
                  <Form.File />
                  <Button onClick={uploadFile} className="btn-fill">
                    Upload Image
                  </Button>
                </Form.Group>
                <Button className="btn-fill" type="submit" variant="info">
                  Submit
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer></Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BicycleForm;
