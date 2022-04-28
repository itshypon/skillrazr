import Carousel from "react-material-ui-carousel";
import styled from "@emotion/styled";
import aka from "../assets/images/akankshya.png";
import suman from "../assets/images/suman.png";
import subhasmita from "../assets/images/subhasmita.png";

export default function Testimonials(props: any) {
  const testimonials = [
    {
      title: "Great Experience",
      icon: aka,
      description:
        "The training I received for my project work exceeded my expectations, especially in the quality of content provided and the availability of the instructor. I learned a lot in web develoment technologies.",
      author: "Akankshya",
    },
    {
      title: "Very well organized",
      icon: suman,
      description:
        "Courses are thoughtfully designed. I was able to learn and build on the concepts with greate confidence. Live classes helped me clearing my doubts, I learnt soft skills as well. Now at work, I’m applying what I've learned and I'm grateful for that.",
      author: "Suman",
    },
    {
      title: "Learnt a lot!",
      icon: subhasmita,
      description:
        "Excellent course materials and assignments that helped me immensely in my project work and helped me secure a tech job. It would've been difficult without the guidance for sure, thanks a lot!",
      author: "Subhasmita",
    },
  ];

  const ImageContainer = styled("div")`
    padding: 70px 100px 10px;
    position: relative;
    &::before {
      content: "";
      transform: rotateZ(-50deg);
      height: 160px;
      width: 160px;
      border-radius: 150px 150px 150px 150px;
      background: #ff1493;
      position: absolute;
      z-index: -1;
      left: 0px;
    }

    &.cl-2 {
      &::before {
        background: #6b4242;
      }
    }

    &.cl-1 {
      &::before {
        background: #ccd3e2;
      }
    }

    img {
      width: 160px;
      height: 160px;
      display: block;
      position: absolute;
      border: 1px solid gray;
      border-radius: 50%;
      background: white;
    }
  `;

  return (
    <div
      id="testimonials"
      className={
        " px-6 pt-20 flex flex-col items-center flex-wrap justify-between"
      }
    >
      <div className="text-6xl text-center mb-4">Success stories</div>
      <div className="flex flex-wrap flex-col md:flex-row  justify-center p-2 w-full">
        <Carousel stopAutoPlayOnHover interval={8000} className="w-full">
          {testimonials.map((course, index) => {
            return (
              <div
                key={course.title}
                className="flex flex-col sm:flex-row items-center justify-center mt-2 ml-0 px-4 py-2 mt-lg-0 font-bold box-shadow"
              >
                <div>
                  <ImageContainer
                    className={`w-24 h-48 flex items-center justify-center cl-${index}`}
                  >
                    <img src={course.icon} alt="" />
                  </ImageContainer>
                  <div style={{ marginTop: "20px" }}>{course.author}</div>
                </div>
                <div>
                  <div className="mb-4 text-2xl">{course.title}</div>
                  <div className="relative after:text-4xl after:absolute after:right-0 after:content-['”'] after:text-gray-500 before:absolute before:text-4xl before:left-0 before:-top-2 before:content-['“'] before:text-gray-500 max-w-[400px]">
                    <div className="ml-2">{course.description}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </Carousel>
        <div className="navbar-nav-scroll flex flex-row">
          {/* <img src={main} alt="genlent" style={{ width: "540px" }} /> */}
        </div>
      </div>
    </div>
  );
}
