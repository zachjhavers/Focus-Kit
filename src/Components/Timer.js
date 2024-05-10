import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  Form,
  Card,
  Image,
} from "react-bootstrap";
import Graphic from "../Assets/PomodoroTimerGraphic.png";
import alertSound from "../Assets/AlertSound.mp3";
import alarmSound from "../Assets/AlarmSound.mp3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faSync,
  faCog,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Helmet } from "react-helmet";

function Timer() {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [settingsModal, setSettingsModal] = useState(false);
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [checkInTime, setCheckInTime] = useState(5 * 60);
  const [elapsedTime, setElapsedTime] = useState(0);
  const navigate = useNavigate();
  const playAlertSound = () => new Audio(alertSound).play();
  const playAlarmSound = () => new Audio(alarmSound).play();

  const navigateToBreathingExercises = () => {
    navigate("/breathing-exercises");
    setShowModal(false);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
    playAlertSound();
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(workTime * 60);
    setIsBreak(false);
    setElapsedTime(0);
  };

  useEffect(() => {
    let interval;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
        setElapsedTime((elapsedTime) => elapsedTime + 1);
        if (elapsedTime >= checkInTime) {
          setShowModal(true);
          setIsActive(false);
          playAlarmSound();
          setElapsedTime(0);
        }
      }, 1000);
    } else if (time === 0) {
      setIsBreak(!isBreak);
      setTime(isBreak ? breakTime * 60 : workTime * 60);
      playAlarmSound();
      setShowModal(true);
    }
    return () => clearInterval(interval);
  }, [isActive, time, isBreak, workTime, breakTime, checkInTime, elapsedTime]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleSettingsChange = (event) => {
    event.preventDefault();
    const newWorkTime = parseInt(event.target.workTime.value);
    const newBreakTime = parseInt(event.target.breakTime.value);
    const newCheckInTime = parseInt(event.target.checkInTime.value);
    setWorkTime(newWorkTime);
    setBreakTime(newBreakTime);
    setCheckInTime(newCheckInTime * 60);
    if (!isBreak) {
      setTime(newWorkTime * 60);
    } else {
      setTime(newBreakTime * 60);
    }
    setSettingsModal(false);
  };

  return (
    <Container className="mt-5">
      <Helmet>
        <title>Pomodoro Timer - Focus Kit</title>
        <meta
          name="description"
          content="Enhance your productivity with our Pomodoro Timer. Customize your work and break periods to optimize focus and efficiency."
        />
        <meta property="og:title" content="Pomodoro Timer - Focus Kit" />
        <meta
          property="og:description"
          content="Use our Pomodoro Timer to manage your work sessions effectively and increase your productivity."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={Graphic} />
        <meta
          property="og:url"
          content="https://www.focuskit.ca/pomodoro-timer"
        />
      </Helmet>
      <Row className="justify-content-center">
        <Col md={6}>
          <Image
            src={Graphic}
            alt="Pomodoro Timer"
            className="img-fluid mb-3"
          />
          <Card className="text-center">
            <Card.Header>{isBreak ? "BREAK" : "WORK"}</Card.Header>
            <Card.Body>
              <h1 className="display-4">{formatTime(time)}</h1>
              <Button
                variant={isActive ? "danger" : "success"}
                onClick={toggleTimer}
                className="w-100 mb-2"
              >
                <FontAwesomeIcon icon={isActive ? faPause : faPlay} />{" "}
                {isActive ? " Pause" : " Start"}
              </Button>
              <Button
                variant="secondary"
                onClick={resetTimer}
                className="w-100 mb-2"
              >
                <FontAwesomeIcon icon={faSync} /> Reset
              </Button>
              <Button
                variant="info"
                onClick={() => setSettingsModal(true)}
                className="w-100 mb-2"
              >
                <FontAwesomeIcon icon={faCog} /> Settings
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={settingsModal} onHide={() => setSettingsModal(false)}>
        <Form onSubmit={handleSettingsChange}>
          <Modal.Header closeButton>
            <Modal.Title>Timer Settings</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="workTime" className="mb-3">
              <Form.Label>Work Time (minutes)</Form.Label>
              <Form.Control type="number" defaultValue={workTime} />
            </Form.Group>
            <Form.Group controlId="breakTime" className="mb-3">
              <Form.Label>Break Time (minutes)</Form.Label>
              <Form.Control type="number" defaultValue={breakTime} />
            </Form.Group>
            <Form.Group controlId="checkInTime" className="mb-3">
              <Form.Label>Check-In Time (minutes)</Form.Label>
              <Form.Control type="number" defaultValue={checkInTime / 60} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setSettingsModal(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{isBreak ? "BREAK" : "CHECK-IN"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isBreak ? "It's time for a break!" : "How are you doing?"}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowModal(false)}>
            Continue
          </Button>
          <Button variant="info" onClick={navigateToBreathingExercises}>
            <FontAwesomeIcon icon={faCheck} /> Go to Breathing Exercises
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Timer;
