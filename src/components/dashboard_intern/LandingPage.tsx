import { Link } from "react-router-dom";
import "./css/LandingPage.css";
import pic from "./landing-img.png";
import pic2 from "./pic-2.png";
import pic3 from "./pic-3.png";
import linkedIn from "./linkedin.png";
import twitter from "./twitter.png";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

const LandingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="flex flex-col sm:flex-row p-20 sm:p-40 landing-page">
        <div className="container-l flex flex-col items-center sm:items-start px-5 sm:px-24">
          <div className="heading">
            Embark on a Transformative Internship Journey
          </div>
          <div className="tag">
            Gain valuable experience, learn new skills, and receive mentorship
            from senior developers
          </div>
          <div className="buttons mb-10">
            <button className="floating-button">
              <a href="#application">Learn more</a>
            </button>
            <Link to="/dashboard">
              <button className="floating-button secondary">
                See Dashboard
              </button>
            </Link>
          </div>
        </div>
        <div className="container-r flex flex-col">
          <img src={pic} alt="Landing-img" />
        </div>
      </div>
      <div className="flex flex-col p-6 sm:p-20 sm:flex-row sub-section2">
        <div className="image-container flex justify-center items-center">
          <img
            src={pic2}
            alt="Landing Image1"
            className="landing-image w-[280px] sm:w-[420px]"
          />
        </div>
        <div className="info-container">
          <div className="heading">Sharpen your Skills at SkillRazr</div>
          <div className="tag">
            SkillRazr is offering an exciting internship opportunity for
            aspiring web developers. <br /> As a web developer intern at
            SkillRazr, you will have the chance to apply your HTML, CSS, and
            JavaScript skills in a real-world setting. <br />
            Work alongside experienced professionals, gain hands-on experience,
            and enhance your web development expertise.
            <br />
            <br />
            <b>Requirements:-</b>
            <ul>
              <li>Proficiency in HTML, CSS, and JavaScript</li>
              <li>Basic understanding of web development principles</li>
              <li>Strong problem-solving and analytical skills</li>
              <li>Ability to work collaboratively in a team environment</li>
              <li>Good communication and time management skills</li>
            </ul>
            <br />
            <b>Location:</b> Remote
            <br />
            <b>Duration:</b> 3 months
            <br />
            <b>Stipend:</b> Rs 5,000* per month
            <br />
            <br />
            Join us at SkillRazr and embark on a transformative journey to
            advance your web development skills and gain valuable industry
            experience. Take the first step towards a successful career in web
            development.
          </div>
        </div>
      </div>
      <div
        id="application"
        className="flex flex-col sm:flex-row  p-6 sm:p-20 sub-section w-[100%]"
      >
        <div className="image-container flex justify-center items-center">
          <img
            src={pic3}
            alt="Landing Image2"
            className="landing-image w-[280px] sm:w-[420px]"
          />
        </div>
        <div className="info-container">
          <div className="heading">Application Process</div>
          <div className="tag">
            We receive applications mostly through Linkedin. <br />
            <br />
            <div>
              You'll find all details of all upcoming internships <br />
              at our social handles{" "}
              <div className="flex mr-2 mt-2">
                <NavLink
                  className={"block mr-2"}
                  target="_blank"
                  to={"https://www.linkedin.com/company/80788727"}
                >
                  <img src={linkedIn} alt="linked-in" className="w-8" />
                </NavLink>{" "}
                &{" "}
                <NavLink
                  className={"block ml-2"}
                  target="_blank"
                  to={"https://twitter.com/skillrazr"}
                >
                  <img src={twitter} alt="twitter" className="w-8" />
                </NavLink>
              </div>
              <br />
              <br />
            </div>
            <b>Details:-</b>
            <br />
            <br />
            <ul>
              <li>We open internships throughout the year.</li>
              <br />
              <li>
                Interested and qualified candidates schedule interviews mostly
                through{" "}
                <NavLink
                  to={"https://calendly.com/skillrazr/interview"}
                  target="_blank"
                >
                  Calendy
                </NavLink>
              </li>
              <br />
              <li>
                Our 30-minute interview round primarily consists of a problem
                solving task.
              </li>
              <br />
              <li>
                Finally candidates who clear the interview, start their
                internship with us.
              </li>
              <br />
              <li>
                <b>Note :-</b> The stipend amount of Rs 5,000 is subject to
                interns perfomance and number of interns during the internship.
                SkillRazr has a fixed budget of Rs 30,000 to spend on interns
                during the 3 months internship.
              </li>
            </ul>
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
