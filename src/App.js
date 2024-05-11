import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/NavBar";
import PomodoroTimer from "./Components/Timer";
import BreathingExercises from "./Components/Breathing";
import Workout from "./Components/Workout";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<PomodoroTimer />} />
        <Route path="breathing" element={<BreathingExercises />} />
        <Route path="pomodoro" element={<PomodoroTimer />} />
        <Route path="workout" element={<Workout />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
