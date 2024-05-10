import React from "react";
import { Helmet } from "react-helmet";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Graphic from "../Assets/Logo.png";

const Home = () => {
  return (
    <Container className="mt-5">
      <Helmet>
        <title>Welcome to Focus Kit</title>
        <meta
          name="description"
          content="Focus Kit is your ultimate tool for productivity and well-being. Explore our Pomodoro timer, breathing exercises, and stretching routines to enhance your daily productivity."
        />
      </Helmet>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} className="text-center">
            <img
              src={Graphic}
              alt="Focus Kit Logo"
              className="img-fluid mb-4"
            />
            <h1 className="mb-4">Welcome to Focus Kit</h1>
            <p className="lead">
              Focus Kit is your evolving toolkit for enhanced productivity and
              well-being. Featuring a Pomodoro timer and breathing exercises,
              our app helps you optimize work and study sessions for better
              mental clarity and focus.
            </p>
            <p className="lead">
              As we develop, we will introduce new features designed to support
              a balanced work-life rhythm, including innovative tools for
              managing time and reducing stress. Keep an eye on future updates
              as we enhance your experience with Focus Kit.
            </p>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Home;
