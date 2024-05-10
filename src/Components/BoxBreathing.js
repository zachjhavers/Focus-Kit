import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import inhaleAudio from "../Assets/Breathe In.mp3";
import holdAudio from "../Assets/Hold.mp3";
import exhaleAudio from "../Assets/Breathe Out.mp3";
import Alarm from "../Assets/AlarmSound.mp3";

const BoxBreathing = ({ active }) => {
  const [duration, setDuration] = useState(60);
  const [phase, setPhase] = useState("inhale");
  const [timer, setTimer] = useState(4);
  const [isRunning, setIsRunning] = useState(false);
  const interval = useRef(null);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [totalCycles, setTotalCycles] = useState(0);

  useEffect(() => {
    if (!active) {
      stopTimer();
    }
  }, [active]);

  useEffect(() => {
    setTotalCycles(Math.floor(duration / 16));
  }, [duration]);

  useEffect(() => {
    if (timer === 0) {
      switchPhase();
    }
  }, [timer]);

  useEffect(() => {
    if (!isRunning) {
      clearInterval(interval.current);
    }
  }, [isRunning]);

  const switchPhase = () => {
    switch (phase) {
      case "inhale":
        setPhase("hold1");
        setTimer(4);
        playAudio(holdAudio);
        break;
      case "hold1":
        setPhase("exhale");
        setTimer(4);
        playAudio(exhaleAudio);
        break;
      case "exhale":
        setPhase("hold2");
        setTimer(4);
        playAudio(holdAudio);
        break;
      case "hold2":
        if (currentCycle >= totalCycles) {
          setIsRunning(false);
          setCurrentCycle(1);
          stopTimer();
          playAudio(Alarm);
        } else {
          setPhase("inhale");
          setTimer(4);
          playAudio(inhaleAudio);
          setCurrentCycle(currentCycle + 1);
        }
        break;
      default:
        setPhase("inhale");
        setTimer(4);
        playAudio(inhaleAudio);
    }
  };

  const playAudio = (audioFile) => {
    const audio = new Audio(audioFile);
    audio.play();
  };

  const startExercise = () => {
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
  };

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      setCurrentCycle(1);
      setPhase("inhale");
      playAudio(inhaleAudio);
      startExercise();
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(interval.current);
    setTimer(4);
  };

  const handleDurationChange = (event) => {
    setDuration(parseInt(event.target.value) * 60);
  };

  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="text-center">
            <Card.Header>Box Breathing Exercise</Card.Header>
            <Card.Body>
              <h1>{timer}</h1>
              <p>
                Cycle: {currentCycle}/{totalCycles}
              </p>
              <Form.Select
                value={duration}
                onChange={handleDurationChange}
                disabled={isRunning}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <option key={value} value={value * 60}>
                    {value} Minute(s)
                  </option>
                ))}
              </Form.Select>
              <div className="d-grid gap-2 mt-3">
                <Button
                  variant="success"
                  onClick={startTimer}
                  disabled={isRunning}
                  className="w-100 mb-2"
                >
                  <FontAwesomeIcon icon={faPlay} /> Start
                </Button>
                <Button
                  variant="danger"
                  onClick={stopTimer}
                  disabled={!isRunning}
                  className="w-100 mb-2"
                >
                  <FontAwesomeIcon icon={faStop} /> Stop
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BoxBreathing;
