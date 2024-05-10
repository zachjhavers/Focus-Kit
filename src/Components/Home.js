import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Graphic from "../Assets/Logo.png";

const Home = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="text-center">
          <img src={Graphic} alt="App Logo" className="img-fluid mb-4" />
          <h1 className="mb-4">Welcome to Focus Kit</h1>
          <p className="lead">
            Focus Kit is your ultimate tool for enhancing productivity and
            well-being. Seamlessly integrating a Pomodoro timer, breathing
            exercises, and stretching routines, our platform is designed to
            improve your work and learning experiences. Optimize your tasks with
            focused sessions and enjoy breaks that refresh and rejuvenate.
          </p>
          <p className="lead">
            Dive into breathing exercises that elevate mental clarity and
            stretching routines that fight the fatigue of prolonged sitting.
            With Focus Kit, transform your daily grind into a balanced rhythm of
            productivity and self-care.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
