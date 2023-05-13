import React from "react";
import { Link } from "react-router-dom";
import "./css/LandingPage.css";
import pic from "./landing-img.png";
import pic2 from "./pic-2.png";
import pic3 from "./pic-3.png";
import linkedIn from "./linkedin.png";
import twitter from "./twitter.png";

const LandingPage = () => {
  const handleLinkedInClick = () => {
    window.open("https://www.linkedin.com/company/skillrazr/", "_blank");
  };
  const handleTwitterClick = () => {
    window.open("https://twitter.com/skillrazr", "_blank");
  };
  const handleApplyClick = () => {
    window.open(
      "https://calendly.com/skillrazr/interview?month=2023-05",
      "_blank"
    );
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row landing-page">
        <div className="container-l flex flex-col items-center sm:items-start px-5 sm:px-24">
          <div className="heading">
            Embark on a Transformative Internship Journey
          </div>
          <div className="tag">
            Gain valuable experience, learn new skills, and receive mentorship
            from senior developers
          </div>
          <div className="buttons">
            <button className="floating-button" onClick={handleApplyClick}>
              Apply Now
            </button>
            <Link to="/dashboard">
              <button className="floating-button">See Dashboard</button>
            </Link>
          </div>
        </div>
        <div className="container-r">
          <img src={pic} alt="Landing-img" />
          <div className="icons">
            <img src={linkedIn} alt="" onClick={handleLinkedInClick} />
            <img src={twitter} alt="" onClick={handleTwitterClick} />
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sub-section">
        <div className="image-container">
          <img src={pic2} alt="Landing Image1" className="landing-image" />
          <img src={pic3} alt="Landing Image2" className="landing-image" />
        </div>
        <div className="info-container">
          <div className="heading">Become a Web Developer at SkillRazr</div>
          <div className="tag">
            SkillRazr is offering an exciting internship opportunity for
            aspiring web developers. As a web developer intern at SkillRazr, you
            will have the chance to apply your HTML, CSS, and JavaScript skills
            in a real-world setting. Work alongside experienced professionals,
            gain hands-on experience, and enhance your web development
            expertise.<br></br>
            Requirements:
            <ul>
              <li>Proficiency in HTML, CSS, and JavaScript</li>
              <li>Basic understanding of web development principles</li>
              <li>Strong problem-solving and analytical skills</li>
              <li>Ability to work collaboratively in a team environment</li>
              <li>Good communication and time management skills</li>
            </ul>
            <br />
            Stipend: Rs.5000/month
            <br />
            <br></br>
            Join us at SkillRazr and embark on a transformative journey to
            advance your web development skills and gain valuable industry
            experience. Apply now and take the first step towards a successful
            career in web development
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
