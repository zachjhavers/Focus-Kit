import React, { useState, useEffect, useRef } from "react";
import inhaleAudio from "../Assets/Breathe In.mp3";
import holdAudio from "../Assets/Hold.mp3";
import exhaleAudio from "../Assets/Breathe Out.mp3";
import Alarm from "../Assets/AlarmSound.mp3";
import Graphic from "../Assets/BreathingExerciseGraphic.png";

const BreathingExercise = () => {
  const [duration, setDuration] = useState(60);
  const [phase, setPhase] = useState("inhale");
  const [timer, setTimer] = useState(4);
  const [isRunning, setIsRunning] = useState(false);
  const interval = useRef(null);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [totalCycles, setTotalCycles] = useState(0);

  useEffect(() => {
    setTotalCycles(Math.floor(duration / 16));
  }, [duration]);

  useEffect(() => {
    if (timer === 0) {
      switchPhase();
    }
  }, [timer]);

  useEffect(() => {
    if (isRunning) {
      startExercise();
    }
  }, [isRunning, phase]);

  useEffect(() => {
    if (currentCycle === totalCycles + 1) {
      setIsRunning(false);
      setCurrentCycle(1);
      stopTimer();
    }
  }, [currentCycle, totalCycles]);

  const switchPhase = () => {
    if (phase === "inhale") {
      setPhase("hold");
      playAudio(holdAudio);
      setTimer(4);
    } else if (phase === "hold") {
      setPhase("exhale");
      playAudio(exhaleAudio);
      setTimer(4);
    } else if (phase === "exhale") {
      setPhase("hold2");
      playAudio(holdAudio);
      setTimer(4);
    } else if (phase === "hold2") {
      if (currentCycle === totalCycles) {
        setIsRunning(false);
        setCurrentCycle(1);
        stopTimer();
        playAudio(Alarm);
      } else {
        setPhase("inhale");
        playAudio(inhaleAudio);
        setTimer(4);
        setCurrentCycle((prevCycle) => prevCycle + 1);
      }
    }
  };

  const playAudio = (audioFile) => {
    new Audio(audioFile).play();
  };

  const startExercise = () => {
    interval.current = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 1) {
          clearInterval(interval.current);
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  const startTimer = () => {
    setIsRunning(true);
    setPhase("inhale");
    playAudio(inhaleAudio);
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(interval.current);
    setCurrentCycle(1);
    setTimer(4);
  };

  const handleDurationChange = (event) => {
    setDuration(parseInt(event.target.value));
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <img src={Graphic} alt="Graphic" className="img-fluid mb-3" />
          <div className="card text-center mt-5">
            <div className="card-header">Box Breathing Exercise</div>
            <div className="card-body">
              <div className="mt-3">
                <h1>{timer}</h1>
                <p>
                  Cycle: {currentCycle}/{totalCycles}
                </p>
              </div>
              <div className="mb-3">
                <select
                  className="form-select"
                  value={duration}
                  onChange={handleDurationChange}
                  disabled={isRunning}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                    <option key={value} value={value * 60}>
                      {value} Minute
                    </option>
                  ))}
                </select>
              </div>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-success"
                  onClick={startTimer}
                  disabled={isRunning}
                >
                  <i className="fas fa-play"></i> Start
                </button>
                <button
                  className="btn btn-danger"
                  onClick={stopTimer}
                  disabled={!isRunning}
                >
                  <i className="fas fa-pause"></i> Stop
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreathingExercise;
