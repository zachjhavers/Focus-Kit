import { React, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/NavBar";
import PomodoroTimer from "./Components/Timer";
import BreathingExercises from "./Components/Breathing";
import Home from "./Components/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactGA from "react-ga";

const App = () => {
  useEffect(() => {
    ReactGA.initialize("G-65FMRK23PY");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

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
