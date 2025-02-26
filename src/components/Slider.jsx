import React, { useState, useEffect } from 'react';
import "../CSS/slider.css"

// Import images directly
import img1 from '../asserts/slider/1.png';
import img2 from '../asserts/slider/2.png';
import img3 from '../asserts/slider/3.png';

const Slider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = [
    {
      img: img2, // Use imported image
      label: 'Hope for Every Stray',
      text: 'Every road pet deserves a loving home—lets make it happen by 2030!',
    },
    {
      img: img1, // Use imported image
      label: 'Rescue & Rehome',
      text: 'Lost, but not forgotten—help us find them a forever home.',
    },
    {
      img: img3, // Use imported image
      label: 'Compassion in Action',
      text: 'Saving one stray wont change the world, but for that pet, the world changes forever.',
    },
  ];

  const handlePrevious = () => {
    const newIndex = activeIndex === 0 ? slides.length - 1 : activeIndex - 1;
    setActiveIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = activeIndex === slides.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext(); // Automatically move to the next slide
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [activeIndex]); // Dependency on activeIndex

  return (
    <div id="carouselExampleCaptions" className="carousel slide custom-slider">
      <div className="carousel-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={index}
            className={activeIndex === index ? 'active' : ''}
            aria-current={activeIndex === index ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setActiveIndex(index)}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div key={index} className={`carousel-item ${activeIndex === index ? 'active' : ''}`}>
            <img src={slide.img} className="d-block w-100" alt={slide.label} />
            <div className="carousel-caption d-none d-md-block">
              <h5>{slide.label}</h5>
              <p>{slide.text}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
        onClick={handlePrevious}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
        onClick={handleNext}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Slider;
