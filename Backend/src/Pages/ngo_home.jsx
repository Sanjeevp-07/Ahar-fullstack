import React from 'react';
import './CSS/ngo_home.css';

const NGOs = () => {
  return (
    <div>
      {/* Top Bar */}
      <div className="ngo-top-bar">
        <div>Contact: info@ngo.org</div>
        <div>Follow Us: Facebook | Twitter | Instagram</div>
      </div>

      {/* Hero Section */}
      <section className="ngo-hero">
        <div className="ngo-hero-text">
          <h1>Donate for a Better World</h1>
          <p>Join us to bring positive change in the lives of children and communities.</p>
          <div className="ngo-hero-buttons">
            <button className="ngo-btn-primary">Donate Now</button>
            <button className="ngo-btn-secondary">Read More</button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="ngo-services">
        <div className="ngo-service-card">
          <h3>Child Welfare</h3>
          <p>We ensure every child has access to education, food, and healthcare.</p>
        </div>
        <div className="ngo-service-card">
          <h3>Women Empowerment</h3>
          <p>Supporting women through skill development and employment opportunities.</p>
        </div>
        <div className="ngo-service-card">
          <h3>Community Development</h3>
          <p>Building strong and self-reliant communities through various programs.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="ngo-footer">
        &copy; 2025 NGO Care. All rights reserved.
      </footer>
    </div>
  );
}

export default NGOs;
