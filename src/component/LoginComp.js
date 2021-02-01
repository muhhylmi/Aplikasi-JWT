import axios from "axios";
import React, { useContext, useState } from "react";
import {
  Alert,
  Button,
  CardImg,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";

const qs = require("querystring");
const api_url = "http://localhost:3001";

var Recaptcha = require("react-recaptcha");

function LoginComp(props) {
  const { dispatch } = useContext(AuthContext);

  const initialState = {
    isSubmitting: false,
    errorMessage: null,
    isVerified: null,
  };

  const stateForm = {
    email: "",
    password: "",
  };

  const [data, setData] = useState(initialState);

  const [dataForm, setDataForm] = useState(stateForm);

  // specifying your onload callback function
  var callback = function () {
    console.log("Done!!!!");
  };

  // specifying verify callback function
  var verifyCallback = function (response) {
    console.log(response);
    if (response) {
      setData({
        ...data,
        isVerified: true,
      });
    }
  };

  const handleChange = (event) => {
    setDataForm({
      ...dataForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (data.isVerified) {
      setData({
        ...data,
        isSubmitting: true,
        errorMessage: null,
      });

      const requestBody = {
        email: dataForm.email,
        password: dataForm.password,
      };

      const config = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      };

      axios
        .post(api_url + "/auth/api/v1/login", qs.stringify(requestBody), config)
        .then((res) => {
          if (res.data.success === true && res.data.isVerified === 1) {
            dispatch({
              type: "LOGIN",
              payload: res.data,
            });
            props.history.push("/dashboard");
          } else if (res.data.success === true && res.data.isVerified === 0) {
            setData({
              ...data,
              isSubmitting: false,
              errorMessage: "Email Belum Terverifikasi, Silahkan Cek Email",
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
    } else {
      alert("Masukan Verifikasi Recaptcha");
    }
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <CardImg width="100%" src="https://placeimg.com/640/380/tech" />
        </Col>
        <Col className="align-self-center">
          <h2>Login Form</h2>
          <hr />
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={dataForm.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={dataForm.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Recaptcha
              sitekey="6LeiukMaAAAAAAqHwCqBMNrXoU25ygm-uu3WM_Oz"
              render="explicit"
              verifyCallback={verifyCallback}
              onloadCallback={callback}
            />
            {data.errorMessage && (
              <Alert variant="danger" className="my-2">
                {data.errorMessage}
              </Alert>
            )}
            <Button
              variant="primary"
              type="submit"
              disabled={data.isSubmitting}
            >
              {data.isSubmitting ? "...loading" : "Login"}
            </Button>
          </Form>
          <p className="mt-3">
            Belum punya akun? <Link to="/register">Registrasi</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginComp;
