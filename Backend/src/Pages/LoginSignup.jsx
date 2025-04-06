import React from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Sign up for <span className="highlight">Ahar</span></h2>
        <p className="signup-subtitle">
          It's free to sign up. Whether you have extra food or need it, we're here to help.
        </p>

        <form className="signup-form">
          {/* Organization Type */}
          <div className="form-section">
            <label className="section-title">What’s your Organization</label>
            <div className="radio-group">
              <label>
                <input type="radio" name="organizationType" value="foodBusiness" required /> 
                Food Business <span className="small-text">My business follows local and state health department regulations</span>
              </label>
              <label>
                <input type="radio" name="organizationType" value="nonprofit" required /> 
                Nonprofit or Mutual Aid organization <span className="small-text">I can provide a Tax ID number or other verification if requested</span>
              </label>
            </div>
          </div>

          {/* Organization Details */}
          <div className="form-section">
            <label htmlFor="organizationName">Organization Name <span className="required">*</span></label>
            <input type="text" id="organizationName" name="organizationName" required />

            <label htmlFor="streetAddress">Street Address <span className="required">*</span></label>
            <input type="text" id="streetAddress" name="streetAddress" placeholder="Enter a location" required />

            <label htmlFor="apt">Apt, Suite, etc.</label>
            <input type="text" id="apt" name="apt" />

            <div className="inline-fields">
              <div>
                <label htmlFor="city">City <span className="required">*</span></label>
                <input type="text" id="city" name="city" required />
              </div>
              <div>
                <label htmlFor="state">State <span className="required">*</span></label>
                <select id="state" name="state" required>
                  <option value="">Please select</option>
                  {/* Add state options here */}
                </select>
              </div>
              <div>
                <label htmlFor="postalCode">Postal Code <span className="required">*</span></label>
                <input type="text" id="postalCode" name="postalCode" required />
              </div>
            </div>

            <label htmlFor="phone">Phone Number <span className="required">*</span></label>
            <input type="text" id="phone" name="phone" required />
            
            <label className="checkbox-label">
              <input type="checkbox" name="textNotifications" />
              Receive text notifications for nearby donations
            </label>
          </div>

          {/* Account Creation */}
          <div className="form-section">
            <label className="section-title">Create an Organization Account</label>
            <div className="account-links">
              Already have an account? <a href="#">Log in</a>
            </div>

            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="password">New Password</label>
            <input type="password" id="password" name="password" required />

            <label htmlFor="confirmPassword">Confirm New Password</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required />

            <p className="terms">
              Signing up for an <span className="highlight">Ahar</span> account means that you agree to the 
              <a href="#"> Terms and Conditions</a>.
            </p>

            <div className="recaptcha">
              <input type="checkbox" required /> I'm not a robot
            </div>

            <button type="submit" className="signup-btn">Sign Up</button>
          </div>
        </form>

        <p className="login-info">
          Not ready for an account? <a href="#">Learn how Ahar works</a>
        </p>
      </div>
    </div>
  )
}

export default LoginSignup
