import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/NavBar";
import PomodoroTimer from "./Components/Timer";
import BreathingExercises from "./Components/Breathing";
import FiveMinuteWorkout from "./Components/FiveMinuteWorkout";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<PomodoroTimer />} />
        <Route path="breathing-exercises" element={<BreathingExercises />} />
        <Route path="pomodoro-timer" element={<PomodoroTimer />} />
        <Route path="five-minute-workout" element={<FiveMinuteWorkout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
