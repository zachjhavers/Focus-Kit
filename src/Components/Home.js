import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Logo from "../Assets/Workflow App Logo.png";

const Home = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="text-center">
          <img
            src={Logo}
            alt="Workflow App Logo"
            className="img-fluid mb-4"
            style={{ width: "100px", height: "80px" }}
          />
          <h1 className="mb-4">Welcome To Work Flow Companion</h1>
          <p className="lead">
            Work Flow Companion is your go-to tool for boosting productivity and
            well-being. Our platform integrates a Pomodoro timer, breathing
            exercises, and stretching routines for a more positive and efficient
            learning or working experience.
          </p>
          <p className="lead">
            With our Pomodoro timer, break down tasks into focused work sessions
            and rejuvenating breaks to optimize concentration and productivity.
          </p>
          <p className="lead">
            Elevate mental clarity and reduce stress with curated breathing
            exercises, designed to calm the mind and enhance focus.
          </p>
          <p className="lead">
            Incorporate rejuvenating stretching routines to combat the effects
            of prolonged sitting and promote physical vitality.
          </p>
          <p className="lead">
            Experience a holistic approach to productivity and self-care with
            Work Flow Companion. Transform your environment into a sanctuary of
            focus, relaxation, and peak performance.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
