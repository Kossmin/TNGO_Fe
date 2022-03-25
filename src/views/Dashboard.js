import React from "react";
// react component used to create charts
import ChartistGraph from "react-chartist";
// react components used to create a SVG / Vector map
import { VectorMap } from "react-jvectormap";

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Form,
  InputGroup,
  Navbar,
  Nav,
  OverlayTrigger,
  Table,
  Tooltip,
  Container,
  Row,
  Col,
} from "react-bootstrap";

import { useState, useEffect } from "react";
import axios from "axios";

function Dashboard() {
  const [linechartData, setLinechartData] = useState();
  const [lineChart, setLineChart] = useState();
  const [pieChart, setPieChart] = useState();
  const [revenue, setRevenue] = useState();
  const [activatedStation, setActivatedStation] = useState();

  const setAxiosDefaultHeader = () => {
    axios.defaults.headers = {
      Authorization: "Bearer " + localStorage.getItem("user"),
    };
  };

  const fetchLineChart = async () => {
    return await axios
      .get("http://18.189.6.9/api/v1/chart/trip-per-month")
      .then((response) => {
        const label = response.data.map((lineChartData) => {
          return lineChartData.Month.toString();
        });
        const total = response.data.map((lineChartData) => {
          return lineChartData.TotalTrip.toString();
        });
        const lineChartTransfer = (
          <ChartistGraph
            type="Line"
            data={{
              labels: [...label].reverse(),
              series: [total.reverse()],
            }}
            options={{
              low: 0,
              high: 10,
              showArea: false,
              height: "245px",
              axisX: {
                showGrid: true,
              },
              lineSmooth: false,
              showLine: true,
              showPoint: true,
              chartPadding: {
                right: -25,
              },
            }}
            responsiveOptions={[
              [
                "screen and (max-width: 640px)",
                {
                  axisX: {
                    labelInterpolationFnc: function (value) {
                      return value[0];
                    },
                  },
                },
              ],
            ]}
          />
        );
        setLineChart(lineChartTransfer);
      });
  };

  const fetchPieChart = async () => {
    return await axios
      .get("http://18.189.6.9/api/v1/chart/bicycle-per-type")
      .then((response) => {
        console.log(response.data);
        const total =
          response.data.HybridBike +
          response.data.RoadBike +
          response.data.SportBike;
        const hybridBikeValue = Math.floor(
          (response.data.HybridBike * 100) / total
        );
        const roadBikeValue = Math.floor(
          (response.data.RoadBike * 100) / total
        );
        const sportBikeValue = 100 - hybridBikeValue - roadBikeValue;
        const pieChartTransform = (
          <ChartistGraph
            type="Pie"
            data={{
              labels: [
                hybridBikeValue + "%",
                roadBikeValue + "%",
                sportBikeValue + "%",
              ],
              series: [hybridBikeValue, roadBikeValue, sportBikeValue],
            }}
          />
        );
        setPieChart(pieChartTransform);
      });
  };

  const fetchRevenue = () => {
    return axios
      .get("http://18.189.6.9/api/v1/chart/revenue")
      .then((response) => {
        setRevenue(response.data.toLocaleString("vi-VN"));
      });
  };

  const fetchActiveStation = () => {
    return axios
      .get("http://18.189.6.9/api/v1/station/available")
      .then((response) => {
        setActivatedStation(response.data);
      });
  };

  useEffect(() => {
    setAxiosDefaultHeader();
    fetchLineChart();
    fetchPieChart();
    fetchRevenue();
    fetchActiveStation();
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="6" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Actived Stations</p>
                      <Card.Title as="h4">{activatedStation}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="6" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Revenue</p>
                      <Card.Title as="h4">{revenue} VND</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Trips data</Card.Title>
                <p className="card-category">Trip through pass 12 months</p>
              </Card.Header>
              <Card.Body>{lineChart}</Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Type of bikes</Card.Title>
              </Card.Header>
              <Card.Body>{pieChart}</Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  Hybrid Bike <i className="fas fa-circle text-danger"></i>
                  Road Bike <i className="fas fa-circle text-warning"></i>
                  Sport Bike
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock-o"></i>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
