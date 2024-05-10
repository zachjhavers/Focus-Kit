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
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setActiveIndex(selectedIndex);
  };

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
          onSelect={handleSelect}
        >
          <Carousel.Item>
            <BoxBreathing active={activeIndex === 0} />
          </Carousel.Item>
          <Carousel.Item>
            <EqualBreathing active={activeIndex === 1} />
          </Carousel.Item>
          <Carousel.Item>
            <FourSevenEightBreathing active={activeIndex === 2} />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default BreathingExercises;
