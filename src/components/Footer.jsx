import React from "react";
import '../CSS/footer.css'

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="widget company-intro-widget">
                <a href="index.html" className="site-logo">
                  <img
                    src="https://i.ibb.co/99rFx49g/logo-2.png"
                    alt="logo"
                  />
                </a>
                <p>
                Road Pets is a community-driven initiative dedicated to rescuing, reuniting, and rehoming lost and stray pets. Our mission is to ensure that every road pet finds a loving and safe home by 2030. Join us in making a difference—whether by adopting, fostering, donating, or simply spreading the word. Together, we can give them the love and care they deserve. 
                </p>
                <ul className="company-footer-contact-list">
                  <li>
                    <i className="fas fa-phone"></i>0787531115                  </li>
                  <li>
                    <i className="fas fa-clock"></i>Mon - Sat 8.00 - 20.00
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="widget course-links-widget">
                <h5 className="widget-title">Popular Topics</h5>
                <ul className="courses-link-list">
                  {[
                    "Pet Rescue",
                    "Animal Welfare",
                    "Pet Adoption",
                    "Lost & Found Pets",
                    "Stray Animal Care",
                    "Pet Shelter Management"
                  ].map((course, index) => (
                    <li key={index}>
                      <a href="#">
                        <i className="fas fa-long-arrow-alt-right"></i>
                        {course}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="widget latest-news-widget">
                <h5 className="widget-title">Latest News</h5>
                <ul className="small-post-list">
                  {[
                    { "date": "February 10, 2025", "title": "Rescued puppy finds a loving home after weeks on the streets." },
                    { "date": "February 15, 2025", "title": "Community unites to save injured stray cat and fund its treatment." }
                  ]
                    .map((news, index) => (
                    <li key={index}>
                      <div className="small-post-item">
                        <a href="#" className="post-date">{news.date}</a>
                        <h6 className="small-post-title">
                          <a href="#">{news.title}</a>
                        </h6>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="widget newsletter-widget">
                <h5 className="widget-title">Newsletter</h5>
                <div className="footer-newsletter">
                  <p>Sign Up to Our Newsletter to Get Latest Updates & Services</p>
                  <form className="news-letter-form">
                    <input
                      type="email"
                      name="news-email"
                      id="news-email"
                      placeholder="Your email address"
                    />
                    <input type="submit" value="Send" />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-6 text-sm-left text-center">
              <span className="copy-right-text">
                &copy; 2025 <a href="https://codepen.io/anupkumar92">Anup</a> All Rights Reserved.
              </span>
            </div>
            <div className="col-md-6 col-sm-6">
              <ul className="terms-privacy d-flex justify-content-sm-end justify-content-center">
                <li>
                  <a href="#">Terms & Conditions</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
