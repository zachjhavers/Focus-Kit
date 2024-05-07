import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/NavBar";
import PomodoroTimer from "./Components/Timer";
import BreathingExercises from "./Components/Breathing";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<PomodoroTimer />} />
        <Route path="breathing-exercises" element={<BreathingExercises />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
