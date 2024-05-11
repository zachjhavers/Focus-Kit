import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Button, Card, Container, Row, Col, Image } from "react-bootstrap";
import PushUps from "../Assets/Pushups.png";
import Plank from "../Assets/Plank.png";
import Squats from "../Assets/Squats.png";
import JumpingJacks from "../Assets/Jumping Jacks.png";
import Burpees from "../Assets/Burpees.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faSync } from "@fortawesome/free-solid-svg-icons";
import alertSound from "../Assets/AlertSound.mp3";
import alarmSound from "../Assets/AlarmSound.mp3";
import Graphic from "../Assets/WorkoutGraphic.png";

const exercises = [
  { name: "Push-ups", duration: 12, src: PushUps },
  { name: "Plank", duration: 12, src: Plank },
  { name: "Squats", duration: 12, src: Squats },
  { name: "Jumping Jacks", duration: 12, src: JumpingJacks },
  { name: "Burpees", duration: 12, src: Burpees },
];

function WorkoutGenerator() {
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(exercises[0].duration);
  const [timerActive, setTimerActive] = useState(false);
  const playAlertSound = () => new Audio(alertSound).play();
  const playAlarmSound = () => new Audio(alarmSound).play();

  useEffect(() => {
    let interval = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && activeExerciseIndex < exercises.length - 1) {
      playAlertSound();
      setActiveExerciseIndex(activeExerciseIndex + 1);
      setTimeLeft(exercises[activeExerciseIndex + 1].duration);
    } else if (timeLeft === 0 && activeExerciseIndex === exercises.length - 1) {
      playAlarmSound();
      setTimerActive(false);
      resetWorkout();
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft, activeExerciseIndex]);

  const toggleTimer = () => {
    setTimerActive(!timerActive);
    if (!timerActive) playAlertSound();
  };

  const resetWorkout = () => {
    setActiveExerciseIndex(0);
    setTimeLeft(exercises[0].duration);
    setTimerActive(false);
    playAlertSound();
  };

  return (
    <Container className="mt-5">
      <Helmet>
        <title>One-Minute Workout - Focus Kit</title>
        <meta
          name="description"
          content="Get a quick and effective workout with our One-Minute Workout. Ideal for busy schedules or a fast fitness boost."
        />
        <meta property="og:title" content="One-Minute Workout - Focus Kit" />
        <meta
          property="og:description"
          content="Stay fit with our One-Minute Workout. Perfect for a quick exercise break to refresh your mind and body."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={Graphic} />
        <meta
          property="og:url"
          content="https://www.focuskit.ca/one-minute-workout"
        />
      </Helmet>
      <Row className="justify-content-center">
        <Col md={6}>
          <Image
            src={Graphic}
            alt="Workout Graphic"
            className="img-fluid mb-3"
          />
          <Card
            className="text-center"
            style={{ width: "100%", aspectRatio: "1" }}
          >
            <Card.Header as="h4">One Minute Workout Timer</Card.Header>
            <Card.Body>
              <img
                src={exercises[activeExerciseIndex].src}
                alt={exercises[activeExerciseIndex].name}
                className="img-fluid mb-4"
                style={{ maxHeight: "250px" }}
                onError={(e) => {
                  e.target.src = Burpees;
                }}
              />
              <h5>{exercises[activeExerciseIndex].name}</h5>
              <p className="lead">{`${timeLeft} seconds remaining`}</p>
              <div className="d-grid gap-2">
                <Button
                  onClick={toggleTimer}
                  variant="success"
                  size="lg"
                  className="mb-2"
                >
                  {timerActive ? (
                    <>
                      <FontAwesomeIcon icon={faPause} /> Pause
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPlay} /> Start
                    </>
                  )}
                </Button>
                <Button onClick={resetWorkout} variant="danger" size="lg">
                  <FontAwesomeIcon icon={faSync} /> Reset
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default WorkoutGenerator;
