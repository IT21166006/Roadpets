import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import '../CSS/carousel.css'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const Projects = (props) => {
  return (
    <div className="container mt-4">
      <Carousel
        swipeable={true}
        draggable={true}
        // showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={props.deviceType !== "mobile"}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        deviceType={props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        
      >
        <div className="carousel-item-wrapper">
          <img
            src="https://i.ibb.co/FkbsJnLv/77fe0096-e2c4-4b76-acca-a681c755acb2-66b356ad77c48.jpg"
            alt="Description 1"
            className="img-fluid"
          />
          <h3 className="mt-2">Street Pet Rescue & First Aid Camp</h3>
          <p>Rain volunteers to safely rescue road pets and provide basic first aid.</p>
          <button className="btn btn-primary">Learn More</button>
        </div>
        <div className="carousel-item-wrapper">
          <img
            src="https://i.ibb.co/0RGc0zXs/csm-Taipan-Pacci-Pacca-2015-06-1.png"
            alt="Description 2"
            className="img-fluid"
          />
          <h3 className="mt-2">Feeding & Rescue Patrol</h3>
          <p>Organize teams to feed and identify sick/injured strays</p>
          <button className="btn btn-primary">Learn More</button>
        </div>
        <div className="carousel-item-wrapper">
          <img
            src="https://i.ibb.co/YFCrdPQB/dogs-for-vaccination.png"
            alt="Description 3"
            className="img-fluid"
          />
          <h3 className="mt-2">Vet Check-Up & Vaccination Camp</h3>
          <p>Collaborate with veterinarians to provide free check-ups,and sterilization for street pets.</p>
          <button className="btn btn-primary">Learn More</button>
        </div>
        <div className="carousel-item-wrapper">
          <img
            src="https://i.ibb.co/SwDDyYVJ/Milchzeit-2016-02-16-2.png"
            alt="Description 4"
            className="img-fluid"
          />
          <h3 className="mt-2">"Rescue a Paw" School & College Campaign</h3>
          <p>Host awareness sessions in schools and colleges to encourage youth involvement.</p>
          <button className="btn btn-primary">Learn More</button>
        </div>
      </Carousel>

      {/* Additional carousels can be added here */}
    </div>
  );
};

export default Projects;


