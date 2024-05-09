import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import BoxBreathing from "./BoxBreathing";
import EqualBreathing from "./EqualBreathing";
import FourSevenEightBreathing from "./FourSevenEightBreathing";
import Graphic from "../Assets/BreathingExerciseGraphic.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const BreathingExercises = () => {
  const [duration] = useState(60);
  const [isRunning, setIsRunning] = useState(false);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <img src={Graphic} alt="Graphic" className="img-fluid mb-3" />
        </div>
        <Carousel
          interval={null}
          nextIcon={<FontAwesomeIcon icon={faChevronRight} />}
          prevIcon={<FontAwesomeIcon icon={faChevronLeft} />}
        >
          <Carousel.Item>
            <BoxBreathing
              duration={duration}
              isRunning={isRunning}
              onExerciseEnd={() => setIsRunning(false)}
            />
          </Carousel.Item>
          <Carousel.Item>
            <EqualBreathing
              duration={duration}
              isRunning={isRunning}
              onExerciseEnd={() => setIsRunning(false)}
            />
          </Carousel.Item>
          <Carousel.Item>
            <FourSevenEightBreathing
              duration={duration}
              isRunning={isRunning}
              onExerciseEnd={() => setIsRunning(false)}
            />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default BreathingExercises;
