import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer'>
      <footer className="footer">
      <div className="footer-container">
        {/* Logo Section */}
        <div className="footer-logo">
          <h2>Ahar</h2>
        </div>

        {/* Links Section */}
        <div className="footer-links">
          <div className="footer-column">
            <h3>Online Platform</h3>
            <a href="#">How it Works</a>
            <a href="#">FAQs</a>
            <a href="#">Documentation</a>
            <a href="#">Join Our Community! Sign up now.</a>
          </div>

          <div className="footer-column">
            <h3>Food Industry Programs</h3>
            <a href="#">Community Partnerships</a>
            <a href="#">Food Industry Donations</a>
          </div>

          <div className="footer-column">
            <h3>About Us</h3>
            <a href="#">Our Blog</a>
            <a href="#">Our Story</a>
            <a href="#">Our Team</a>
            <a href="#">Get Involved</a>
          </div>

          <div className="footer-column">
            <h3>Contact Us</h3>
            <a href="mailto:hello@ahar.org">hello@ahar.org</a>
            <p>(202) 449-1507</p>
          </div>

          <div className="footer-column">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-x-twitter"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>Ahar is a 501(c)(3) non-profit organization</p>
        <p>4410 Massachusetts Ave NW #397 Washington, DC 20016</p>
        <div className="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer
