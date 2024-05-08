import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import pomodoroLogo from "../Assets/PomodoroLogo.png";
import alert from "../Assets/AlertSound.mp3";
import alarm from "../Assets/AlarmSound.mp3";

function Timer() {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [checkInTime, setCheckInTime] = useState(5 * 60);
  const [elapsedTime, setElapsedTime] = useState(0);

  const playAlertSound = () => {
    new Audio(alert).play();
  };

  const playAlarmSound = () => {
    new Audio(alarm).play();
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
    playAlertSound();
  };

  const resetTimer = () => {
    setIsActive(false);
    setTime(25 * 60);
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
          setIsActive(!isActive);
          playAlarmSound();
          setElapsedTime(0);
        }
      }, 1000);
    } else if (time === 0) {
      setIsBreak(!isBreak);
      setTime(isBreak ? 25 * 60 : 5 * 60);
      playAlarmSound();
      setShowModal(true);
    }

    return () => clearInterval(interval);
  }, [isActive, time, isBreak, checkInTime, elapsedTime]);

  const handleCheckInInputChange = (event) => {
    const inputValue = event.target.value;
    setCheckInTime(inputValue * 60);
    setElapsedTime(0);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <img src={pomodoroLogo} alt="Timer" className="img-fluid mb-3" />
          <div className="card text-center mt-5">
            <div className="card-header">{isBreak ? "BREAK" : "WORK"}</div>
            <div className="card-body">
              <h1 className="display-4">{formatTime(time)}</h1>
              <div className="d-grid gap-2">
                <button
                  className={`btn btn-${isActive ? "danger" : "success"} mr-2`}
                  onClick={toggleTimer}
                >
                  {isActive ? (
                    <>
                      <i className="fas fa-pause"></i> Pause
                    </>
                  ) : (
                    <>
                      <i className="fas fa-play"></i> Start
                    </>
                  )}
                </button>
                <button className="btn btn-secondary" onClick={resetTimer}>
                  <i className="fa-solid fa-rotate-left"></i> Reset
                </button>
              </div>
              <div className="mt-3">
                <label htmlFor="checkInTimeInput" className="form-label">
                  Set Check-In Time (minutes):
                </label>
                <input
                  type="number"
                  id="checkInTimeInput"
                  className="form-control"
                  min="1"
                  value={checkInTime / 60}
                  onChange={handleCheckInInputChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="modalLabel"
        aria-hidden="true"
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalLabel">
                {isBreak ? "BREAK" : "CHECK-IN"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              {isBreak ? "It's time for a break!" : "How are you doing?"}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowModal(false)}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timer;
