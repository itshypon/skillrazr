import React from 'react';
import {Link} from 'react-router-dom';
import './css/LandingPage.css';
import pic from './landing-img.png';
import linkedIn from './linkedin.png';
import twitter from './twitter.png';

const LandingPage = () => {
    const handleLinkedInClick = () => {
        window.open('https://www.linkedin.com/company/skillrazr/', '_blank');
      };
    const handleTwitterClick = () => {
        window.open('https://twitter.com/skillrazr', '_blank');
      };
    const handleApplyClick = () => {
        window.open('https://calendly.com/skillrazr/interview?month=2023-05', '_blank');
    }

  return (
    <div className="landing-page">
      <div className="container-l">
        <div className="heading">Embark on a Transformative Internship Journey</div>
        <div className="tag">Gain valuable experience, learn new skills, and receive mentorship from senior developers</div>
        <div className="buttons">
        <button className="floating-button" onClick={handleApplyClick}>Apply Now</button>
        
        <button className="floating-button">See Dashboard</button>
        
        </div>
      </div>
      <div className="container-r">
        <img src={pic} alt="Landing-img" />
      </div>
      <div className="icons">
        <img src={linkedIn} alt="" onClick={handleLinkedInClick}/>
        <img src={twitter} alt="" onClick={handleTwitterClick}/>
      </div>
    </div>
  );
}

export default LandingPage;
