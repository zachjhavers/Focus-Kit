import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import inhaleAudio from "../Assets/Breathe In.mp3";
import exhaleAudio from "../Assets/Breathe Out.mp3";
import Alarm from "../Assets/AlarmSound.mp3";

const EqualBreathing = () => {
  const [duration, setDuration] = useState(60);
  const [phase, setPhase] = useState("inhale");
  const [timer, setTimer] = useState(6);
  const [isRunning, setIsRunning] = useState(false);
  const interval = useRef(null);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [totalCycles, setTotalCycles] = useState(0);

  const BREATHING_PHASE_DURATION = 6;

  useEffect(() => {
    setTotalCycles(Math.floor(duration / (BREATHING_PHASE_DURATION * 2)));
  }, [duration]);

  useEffect(() => {
    if (timer === 0) {
      switchPhase();
    }
  }, [timer]);

  useEffect(() => {
    if (isRunning) {
      startExercise();
    } else {
      clearInterval(interval.current);
    }
  }, [isRunning]);

  const switchPhase = () => {
    const nextPhase = phase === "inhale" ? "exhale" : "inhale";
    setPhase(nextPhase);
    playAudio(nextPhase === "inhale" ? inhaleAudio : exhaleAudio);
    setTimer(BREATHING_PHASE_DURATION);

    if (nextPhase === "inhale") {
      const newCycle = currentCycle + 1;
      if (newCycle > totalCycles) {
        setIsRunning(false);
        setCurrentCycle(1);
        playAudio(Alarm);
      } else {
        setCurrentCycle(newCycle);
      }
    }
  };

  const playAudio = (audioFile) => {
    new Audio(audioFile).play();
  };

  const startExercise = () => {
    clearInterval(interval.current);
    interval.current = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
  };

  const startTimer = () => {
    setIsRunning(true);
    setPhase("inhale");
    setTimer(BREATHING_PHASE_DURATION);
    playAudio(inhaleAudio);
    setCurrentCycle(1);
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(interval.current);
    setCurrentCycle(1);
    setTimer(BREATHING_PHASE_DURATION);
  };

  const handleDurationChange = (event) => {
    setDuration(parseInt(event.target.value) * 60);
  };

  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="text-center">
            <Card.Header>Equal Breathing Exercise</Card.Header>
            <Card.Body>
              <h1>{timer}</h1>
              <p>
                Cycle: {currentCycle - 1}/{totalCycles}
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

export default EqualBreathing;
