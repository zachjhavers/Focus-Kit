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
  };

  useEffect(() => {
    let interval;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((time) => time - 1);
      }, 1000);
    } else if (time === 0) {
      setIsBreak(!isBreak);
      setTime(isBreak ? 25 * 60 : 5 * 60);
      playAlarmSound();
      setShowModal(true);
    }

    return () => clearInterval(interval);
  }, [isActive, time, isBreak]);

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
              <div class="d-grid gap-2">
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
                  <i class="fa-solid fa-rotate-left"></i> Reset
                </button>
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
                GOOD JOB
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>
            <div className="modal-body">ITS TIME FOR A BREAK</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setShowModal(false)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timer;
