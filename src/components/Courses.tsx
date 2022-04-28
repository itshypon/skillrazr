import LiveTvIcon from "@mui/icons-material/LiveTv";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AssessmentIcon from "@mui/icons-material/Assessment";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import StarIcon from "@mui/icons-material/Star";

export default function Courses(props: any) {
  const courses = [
    {
      title: "Essential UI",
      icon: StarIcon,
      description: "Intro to HTML, CSS and JavaScript",
    },
    {
      title: "More JavaScript",
      icon: LiveTvIcon,
      description: "JavaScript in depth",
    },
    {
      title: "Fullstack JavaScript",
      icon: LooksOneIcon,
      description: "JS in UI, JS in APIs and Database",
    },
    {
      title: "ReactJS",
      icon: AssessmentIcon,
      description: "ReactJS in details",
    },
    {
      title: "Project Work",
      icon: CurrencyRupeeIcon,
      description:
        "Intro to HTML, CSS and JavaScript, \n Shell scripting, SCM, Intro to CSS and JS UI frameworks",
    },
  ];

  return (
    <div
      id="courses"
      className={
        "my-24 px-6 pt-20 flex flex-col items-center flex-wrap justify-center"
      }
    >
      <div className="text-6xl text-center mb-4">Courses</div>
      <div className="flex flex-wrap flex-col md:flex-row  justify-center p-2 w-full">
        {courses.map((course) => {
          return (
            <div
              key={course.title}
              className="flex flex-col items-center justify-center mt-2 ml-0 sm:ml-12 px-4 py-2 mt-lg-0 font-bold box-shadow border rounded-[5px]"
            >
              {/* {<course.icon />} */}
              <div className="ml-2 text-2xl">{course.title}</div>
              <div className="ml-2">{course.description}</div>
            </div>
          );
        })}

        <div className="navbar-nav-scroll flex flex-row">
          {/* <img src={main} alt="genlent" style={{ width: "540px" }} /> */}
        </div>
      </div>
    </div>
  );
}
