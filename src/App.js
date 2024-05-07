import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/NavBar";
import PomodoroTimer from "./Components/Timer";
import BreathingExercises from "./Components/Breathing";
import Home from "./Components/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="breathing-exercises" element={<BreathingExercises />} />
        <Route path="pomodoro-timer" element={<PomodoroTimer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
