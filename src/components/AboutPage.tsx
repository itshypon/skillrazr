import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import styled from "@emotion/styled";
import tukuna from "../assets/images/tukuna.jpeg";

const ImageContainer = styled("div")`
  img {
    width: 160px;
    height: 160px;
    display: block;
    border: 1px solid gray;
    border-radius: 50%;
    background: white;
  }
`;

export default function About(props: any) {
  return (
    <div
      className={
        "mt-24 px-6 pt-20 sm:pt-[80px] flex flex-col items-center flex-wrap justify-between"
      }
    >
      <div
        className="flex flex-wrap flex-col md:flex-row  justify-between p-2 w-full"
        id="about"
      >
        <div className="mt-2 ml-0 sm:ml-12 mb-12 mt-lg-0 font-bold text-center sm:text-left">
          <div className="text-4xl pb-4">Why Genlent?</div>
          <div className="text-1xl">
            We focus on giving quality tech training to students and give them
            an exposure to software development and make them industry ready.
            Through our platform we connect tech experts to students and empower
            students with essential tech skills. Our mission is to empower
            students to prosper in life.
          </div>
        </div>
      </div>

      <div
        className="flex flex-wrap flex-col md:flex-row justify-center sm:justify-start p-2 w-full"
        id="team"
      >
        <div className="mt-2 ml-0 sm:ml-12 mb-12 mt-lg-0 font-bold text-center sm:text-left">
          <div className="text-4xl ml-0 sm:ml-1 pb-8">Team</div>
          <div className="text-1xl"></div>
          <ImageContainer className="flex justify-center sm:justify-start">
            <img src={tukuna} alt="" />
          </ImageContainer>
          <div>
            Tukuna Patro, Director
            <a
              href="https://www.linkedin.com/in/tukunapatro/"
              target="_blank"
              rel="noreferrer"
              className="ml-1"
            >
              <LinkedInIcon />
            </a>
          </div>

          <div>
            <span className="font-bold">10+</span> years in tech industry,
            mostly as a full stack JavaScript Software Engineer,{" "}
            <span className="font-bold">5+</span> years in teaching.
          </div>
        </div>
      </div>

      <div
        className="flex flex-wrap flex-col md:flex-row  justify-between p-2 w-full"
        id="contact"
      >
        <div className="mt-2 ml-0 sm:ml-12 mb-12 mt-lg-0 font-bold text-center sm:text-left">
          <div className="text-4xl ml-0 sm:ml-1 pb-4">Contact Us</div>
          <div className="text-1xl py-2">
            Plot No 1073 & 1074, Raja Rajeswara Nagar, <br />
            Serilingampally Hyderabad, 500084, India
          </div>
          <div className="text-1xl py-2">
            <EmailIcon />{" "}
            <a href="mailto:contact@genlent.in">contact@genlent.in</a>
          </div>
          <div className="text-1xl py-2">
            <PhoneIcon />
            <span className="px-2"><a href="tel:+918297074155">8297074155</a></span>
          </div>
        </div>
      </div>
    </div>
  );
}
