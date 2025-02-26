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
            src="https://campusnow.wordpress.com/wp-content/uploads/2022/09/dog-pti-1145550-1663296973.jpg"
            alt="Description 1"
            className="img-fluid"
          />
          <h3 className="mt-2">Title 1</h3>
          <p>Short description for image 1.</p>
          <button className="btn btn-primary">Learn More</button>
        </div>
        <div className="carousel-item-wrapper">
          <img
            src="https://media.adoptapet.com/image/upload/c_auto,g_auto,w_358,ar_142:135,dpr_1.5/f_auto,q_auto/1182284751"
            alt="Description 2"
            className="img-fluid"
          />
          <h3 className="mt-2">Title 2</h3>
          <p>Short description for image 2.</p>
          <button className="btn btn-primary">Learn More</button>
        </div>
        <div className="carousel-item-wrapper">
          <img
            src="https://www.thaiunion.com/files/product/pet/petcare-large.jpg"
            alt="Description 3"
            className="img-fluid"
          />
          <h3 className="mt-2">Title 3</h3>
          <p>Short description for image 3.</p>
          <button className="btn btn-primary">Learn More</button>
        </div>
        <div className="carousel-item-wrapper">
          <img
            src="https://www.thaiunion.com/files/product/pet/petcare-large.jpg"
            alt="Description 4"
            className="img-fluid"
          />
          <h3 className="mt-2">Title 4</h3>
          <p>Short description for image 4.</p>
          <button className="btn btn-primary">Learn More</button>
        </div>
      </Carousel>

      {/* Additional carousels can be added here */}
    </div>
  );
};

export default Projects;


