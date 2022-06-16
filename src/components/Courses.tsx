import AssessmentIcon from "@mui/icons-material/Assessment";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import StarIcon from "@mui/icons-material/Star";
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import UpcomingTwoToneIcon from '@mui/icons-material/UpcomingTwoTone';
import OpenInNewTwoToneIcon from '@mui/icons-material/OpenInNewTwoTone';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import { NavLink } from "react-router-dom";

export default function Courses(props: any) {
  const upComingCourses = [
    {
      id: 'essential_ui',
      title: "Essential UI",
      icon: StarIcon,
      description: "Intro to HTML, CSS and JavaScript",
      disabled: true,
    },
    {
      id: 'react',
      title: "ReactJS",
      icon: AssessmentIcon,
      description: "ReactJS in details",
      disabled: true,
    },
  ];

  const availalbeCourses = [
    {
      id: 'fullstack_js',
      title: "Fullstack JavaScript (Project)",
      icon: LooksOneIcon,
      description: "Intro to HTML, CSS and JavaScript, \n Shell scripting, SCM, UI frameworks, NPM and NodeJS, JS in depth and so on",

    },
    {
      id: 'deep_js_node_js',
      title: "Deep JS and Advance NodeJS",
      description: "JavaScript in depth, NodeJS advance topics"
    },
    {
      id: 'complete_software_testing',
      title: "The Complete Software Testing",
      description: "Manual and Automation Software Testing",
    }
  ]

  return (
    <div
      id="courses"
      className={
        "my-24 px-6 pt-20 flex flex-col items-center flex-wrap justify-center"
      }
    >
      <div className="text-6xl text-center mb-4">Courses</div>
      <div className='text-xl mt-2 font-bold'>Live</div>

      <div className="flex flex-wrap flex-col md:flex-row  justify-center p-2 w-full">
        {availalbeCourses.map((course) => {
          return (
            <NavLink key={course.id} to={`/courses/${course.id}`} onClick={() => {
              window.scrollTo(0, 0);
            }}>
              <div
                key={course.title}
                className="flex flex-col items-center justify-center mt-2 ml-0 sm:ml-12 px-4 py-4 mt-lg-0 font-bold box-shadow border border-green-500 rounded-[5px]"
              >
                {/* {<course.icon />} */}
                <EventAvailableIcon />

                <div className="ml-2 text-2xl">{course.title} <OpenInNewTwoToneIcon /></div>
                <div className="ml-2">{course.description}</div>
              </div>
            </NavLink>
          );
        })}
      </div>
      <NavLink to="/evergreen_courses" onClick={() => {
        window.scrollTo(0, 0);
      }}>
        <div className="flex flex-col items-center justify-center mt-2 ml-0 sm:ml-12 px-4 py-4 mt-lg-0 font-bold box-shadow border border-green-500 rounded-[5px]">
          <FiberNewIcon htmlColor="#ff1493" />
          Evergreen Courses
        </div>
      </NavLink>

      <div className='mt-10 text-xl'>Upcoming</div>
      <div className="flex flex-wrap flex-col md:flex-row  justify-center p-2 w-full">
        {upComingCourses.map((course) => {
          return (<div key={course.id} className="flex flex-col items-center justify-center mt-2 ml-0 sm:ml-12 px-4 py-2 mt-lg-0 font-bold box-shadow border rounded-[5px]">
            <UpcomingTwoToneIcon />
            <div className="ml-2 text-2xl">{course.title}</div>
            <div className="ml-2">{course.description}</div>
          </div>)
        })}
      </div>
    </div>
  );
}
