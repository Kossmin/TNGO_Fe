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
import axios from "axios";
import { useState, useEffect, useRef } from "react";

const Payment = (props) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [paymentData, setPaymentData] = useState();
  const paymentId = useRef();
  const [totalPage, setTotalPage] = useState({
    totalPage: 0,
    elementArray: [],
  });

  const fetchPayment = async () => {
    return await axios
      .get("http://18.189.6.9/api/v1/payment?page=" + pageIndex)
      .then((response) => {
        console.log(response);
        mapData(response.data);
      });
  };

  const mapData = (data) => {
    const transferData = data.map((data) => {
      return (
        <tr key={data.Id}>
          <td>{data.Id}</td>
          <td>{data.Trip.EndTime}</td>
          <td>{data.PaymentCode}</td>
          <td>{data.Money.toLocaleString("vi-VN")} VND</td>
        </tr>
      );
    });
    setPaymentData(transferData);
  };

  const mapPaging = (numberOfPage) => {
    let tmp = [];
    if (pageIndex == 0) {
      if (numberOfPage <= 3) {
        for (let i = 0; i < numberOfPage; i++) {
          tmp.push(i);
        }
      } else {
        for (let i = 0; i < 3; i++) {
          tmp.push(i);
        }
      }
    } else if (pageIndex == totalPage.totalPage - 1) {
      if (numberOfPage <= 3) {
        for (let i = 0; i < numberOfPage; i++) {
          tmp.push(i);
        }
      } else {
        for (let i = pageIndex - 2; i <= pageIndex; i++) {
          tmp.push(i);
        }
      }
    } else {
      for (let i = pageIndex - 1; i <= pageIndex + 1; i++) {
        tmp.push(i);
      }
    }
    setTotalPage({ totalPage: numberOfPage, elementArray: tmp });
  };

  const searchPayment = (e) => {
    e.preventDefault();
    if (paymentId.current.value != "") {
      console.log("search by id");
      return axios
        .get("http://18.189.6.9/api/v1/payment/get/" + paymentId.current.value)
        .then((response) => {
          console.log(response);
          mapData([response.data]);
        });
    } else {
      console.log("show all payment");

      fetchPayment();
    }
  };

  useEffect(() => {
    fetchPayment();
  }, []);
  return (
    <Container>
      <Row className="justify-content-end">
        <Col xs="12" sm="5">
          <Form className="d-flex" onSubmit={searchPayment}>
            <FormControl
              ref={paymentId}
              type="search"
              placeholder="Search By Id"
              className="me-2"
              aria-label="Search"
            />
            <Button type="submit" variant="outline-success">
              Search
            </Button>
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
                    <th>Date</th>
                    <th>Payment type</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>{paymentData}</tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* <Row>
        <Col sm="12">
          <Pagination className="pagination pagination-no-border justify-content">
            {pageIndex != 0 && (
              <Pagination.Item onClick={() => setPageIndex(pageIndex - 1)}>
                «
              </Pagination.Item>
            )}
            {totalPage.elementArray.map((index) => {
              if (index == pageIndex) {
                return (
                  <Pagination.Item
                    active
                    key={index}
                    onClick={() => setPageIndex(index--)}
                  >
                    {index + 1}
                  </Pagination.Item>
                );
              } else {
                return (
                  <Pagination.Item
                    key={index}
                    onClick={() => setPageIndex(index--)}
                  >
                    {index + 1}
                  </Pagination.Item>
                );
              }
            })}
            {pageIndex != totalPage.totalPage - 1 && (
              <Pagination.Item onClick={() => setPageIndex(pageIndex + 1)}>
                »
              </Pagination.Item>
            )}
          </Pagination>
        </Col>
      </Row> */}
    </Container>
  );
};

export default Payment;
