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

import statusConst from "../assets/const/bicycleStatus";
import { storage } from "../views/Auth/Firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useHistory } from "react-router-dom";

const BicycleForm = (props) => {
  const [type, setType] = useState();
  const [status, setStatus] = useState();
  const [station, setStation] = useState();
  const [imageUrl, setImageUrl] = useState(null);
  const plateInput = useRef();
  const descriptionInput = useRef();
  const statusInput = useRef();
  const stationInput = useRef();
  const typeInput = useRef();
  const navigate = useHistory();

  const fetchTypeData = async () => {
    return await axios
      .get("http://18.189.6.9/api/v1/bicycle-type")
      .then((response) => {
        console.log(response.data[0].Id);
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
    // setStatusInput(statusConst[0].Id);
    const transferStatus = statusConst.map((data) => {
      return (
        <option key={`${data.Id}+status`} value={data.Id}>
          {data.Status}
        </option>
      );
    });
    setStatus(transferStatus);
  };

  const setStationData = async () => {
    return await axios
      .get("http://18.189.6.9/api/v1/station")
      .then((response) => {
        // setStationInput(response.data.Stations[0].Id);
        const transformedStation = response.data.Stations.map((data) => {
          return (
            <option key={`${data.Id}+station`} value={data.Id}>
              {data.Location}
            </option>
          );
        });
        setStation(transformedStation);
      });
  };

  useEffect(async () => {
    await fetchTypeData();
    setStatusData();
    await setStationData();
    console.log(
      stationInput.current.value,
      typeInput.current.value,
      statusInput.current.value
    );
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    uploadFile(e.target[5].files[0]);
  };

  const selectImage = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onload = function () {
      setImageUrl(fileReader.result);
    };
  };

  const uploadFile = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed", () => {
      return getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        const addedBicycle = {
          status: statusInput.current.value,
          description: descriptionInput.current.value,
          stationId: stationInput.current.value,
          licensePlate: plateInput.current.value,
          image: url,
          typeId: typeInput.current.value,
        };
        console.log(addedBicycle);
        axios
          .post("http://18.189.6.9/api/v1/bicycle", addedBicycle)
          .then((response) => {
            navigate.push("/admin/bicycles");
          });
      });
    });
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
                    required
                    placeholder="Plate number"
                    type="text"
                    ref={plateInput}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Status</Form.Label>
                  <Form.Control ref={statusInput} as="select">
                    {status}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <label>Description</label>
                  <Form.Control
                    placeholder="Description"
                    type="text"
                    as="textarea"
                    style={{ height: "100px" }}
                    ref={descriptionInput}
                  ></Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Station</Form.Label>
                  <Form.Control ref={stationInput} as="select">
                    {station}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Type</Form.Label>
                  <Form.Control ref={typeInput} as="select">
                    {type}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Image</Form.Label>
                  <Form.File onChange={selectImage} />
                  {/* <Button onClick={uploadFile} className="btn-fill">
                    Upload Image
                  </Button> */}
                  {imageUrl != null && (
                    <img src={imageUrl.toString()} height="200" />
                  )}
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
