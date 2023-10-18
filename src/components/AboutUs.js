import React from 'react';

import team from '../assets/img/team.svg';
import Navbar from './NavBar/NavBar';

function AboutUs() {
  return (
    <>
    <Navbar/>
    <div className="about-us-container">
      <div className="about-us-header">
        <h1>Welcome to Our Creative World</h1>
        <p>Helping you grow no matter how big your ambitions are.</p>
      </div>
      <div className="about-us-content">
        <div className="about-us-text">
          <h1>Our Story</h1>
          <p>
            We started this journey with a simple idea: to help businesses maximise asset and infrastructure efficiency to focus on operations. Our story is a tapestry of dreams, innovation, and a lot of hard work.
          </p>
          <p>
            Every day, we push the boundaries of imagination, delivering breathtaking projects that amaze and inspire. From increasing your sales revenue to grow your business by leveraging vendor and intermediary finance for your clients today.
          </p>
        </div>
        <div className="about-us-image">
          <img src={team} alt="Our Creative Team" />
        </div>
      </div>
      <div className="about-us-call-to-action">
        <p>Ready to embark on a creative journey with us?</p>
        <a href="/" className="cta-button">Call Us: 02 6964 8567 </a>
      </div>
    </div>
    </>
  );
}

export default AboutUs;
