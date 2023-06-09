import LooksOneIcon from "@mui/icons-material/LooksOne";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import OpenInNewTwoToneIcon from "@mui/icons-material/OpenInNewTwoTone";
import FiberNewIcon from "@mui/icons-material/FiberNew";
import { NavLink } from "react-router-dom";

export default function Courses(props: any) {
  const availalbeCourses = [
    {
      id: "fullstack_js",
      title: "Fullstack JavaScript (Project)",
      icon: LooksOneIcon,
      description:
        "Intro to HTML, CSS and JavaScript, \n Shell scripting, SCM, UI frameworks, NPM and NodeJS, JS in depth and so on",
    },
    {
      id: "deep_js_node_js",
      title: "Deep JS and Advance NodeJS",
      description: "JavaScript in depth, NodeJS advance topics",
    },
    {
      id: "complete_software_testing",
      title: "The Complete Software Testing",
      description: "Manual and Automation Software Testing",
    },
  ];

  return (
    <div
      id="courses"
      className={
        "my-24 px-6 pt-20 flex flex-col items-center flex-wrap justify-center"
      }
    >
      <div className="text-6xl text-center mb-8">Courses</div>
      <div className="text-xl mt-2 ">Live</div>

      <div className="flex flex-wrap flex-col md:flex-row  justify-center items-center p-2 w-full">
        {availalbeCourses.map((course) => {
          return (
            <NavLink
              key={course.id}
              to={`/courses/${course.id}`}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
              className="w-9/12"
            >
              <div
                key={course.title}
                className="flex flex-col items-center justify-center mt-2 ml-0 px-4 py-4 mt-lg-0 box-shadow border border-green-500 rounded-[5px]"
              >
                {/* {<course.icon />} */}
                <EventAvailableIcon />

                <div className="ml-2 text-2xl">
                  {course.title} <OpenInNewTwoToneIcon />
                </div>
                <div className="ml-2">{course.description}</div>
              </div>
            </NavLink>
          );
        })}
        <NavLink
          className="w-9/12"
          to="/evergreen_courses"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <div className="flex flex-col items-center justify-center mt-2 ml-0 p-8 mt-lg-0  box-shadow border border-green-500 rounded-[5px]">
            <FiberNewIcon htmlColor="#ff1493" fontSize="large" />
            <span className="text-2xl">Evergreen Courses</span>
          </div>
        </NavLink>

        <NavLink
          className="w-9/12"
          to="/self_paced_courses"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        >
          <div className="flex flex-col items-center justify-center mt-2 ml-0 p-8 mt-lg-0  box-shadow border border-green-500 rounded-[5px]">
            <FiberNewIcon htmlColor="#ff1493" fontSize="large" />
            <span className="text-2xl">Self Paced Courses</span>
          </div>
        </NavLink>
      </div>
    </div>
  );
}
