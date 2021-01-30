import axios from "axios";
import React, { Fragment, useContext, useState } from "react";
import {
  Alert,
  Button,
  CardImg,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { AuthContext } from "../App";

const qs = require("querystring");
const api_url = "http::/localhost:3001";

function LoginComp() {
  const { dispatch } = useContext(AuthContext);

  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
  };

  const [data, setData] = useState(initialState);

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    });

    const requestBody = {
      email: data.email,
      password: data.password,
    };

    const config = {
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    axios
      .post(api_url + "/auth/api/v1/login", qs.stringify(requestBody), config)
      .then((res) => {
        if (res.data.success === true) {
          dispatch({
            type: "LOGIN",
            payload: res.data,
          });
        } else {
          setData({
            ...data,
            isSubmitting: false,
            errorMessage: res.data.message,
          });
        }
        throw res;
      });
  };

  return (
    <Fragment>
      <Container>
        <Row>
          <Col>
            <CardImg width="100%" src="https://placeimg.com/640/380/people" />
          </Col>
          <Col className="align-self-center">
            {data.errorMessage && (
              <Alert variant="danger" className="mb-4">
                gagal masuk
              </Alert>
            )}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={data.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                disabled={data.isSubmitting}
              >
                {data.isSubmitting ? "...loading" : "Login"}
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default LoginComp;
