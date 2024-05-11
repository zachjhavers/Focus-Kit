import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/NavBar";
import PomodoroTimer from "./Components/Timer";
import BreathingExercises from "./Components/Breathing";
import OneMinuteWorkout from "./Components/OneMinuteWorkout";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<PomodoroTimer />} />
        <Route path="breathing-exercises" element={<BreathingExercises />} />
        <Route path="pomodoro-timer" element={<PomodoroTimer />} />
        <Route path="one-minute-workout" element={<OneMinuteWorkout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
