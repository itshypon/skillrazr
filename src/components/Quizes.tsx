// import OpenInNewTwoToneIcon from '@mui/icons-material/OpenInNewTwoTone';
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getQuizes } from "../services";
import localQuizes from "../data/quizes";
import MoreIcon from "@mui/icons-material/More";

export default function Quizes(props: any) {
  const [quizes, setQuizes] = useState<any[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const resp = await getQuizes();
        setQuizes(
          resp.data.filter((i: any) => i.status === "published").slice(0, 5)
        );
      } catch (e) {
        setQuizes(localQuizes.filter((i: any) => i.status === "published"));
      }
    };
    getData();
  }, []);

  return (
    <div
      id="courses"
      className={
        "my-24 px-6 pt-20 flex flex-col items-center flex-wrap justify-center"
      }
    >
      <div className="text-6xl text-center mb-8"> Quizzes</div>
      <div className="text-xl mt-2">Live</div>

      <div>Test your skills with these short quizzes</div>

      <div className="flex flex-wrap sm:flex-col lg:flex-row  items-center justify-center p-2 w-full">
        {quizes.map((quiz: any) => {
          return (
            <NavLink
              key={quiz.title}
              className="mr-2 sm:w-8/12 lg:w-fit"
              to={`/quizzes/${quiz.id}`}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <div className="flex flex-col items-center justify-center mt-2 ml-0 w-full ml-2 px-4 py-4 mt-lg-0  box-shadow border border-green-500 rounded-[5px]">
                <div className="ml-2 text-2xl">{quiz.title} </div>
                <div className="ml-2">{quiz.description}</div>
              </div>
            </NavLink>
          );
        })}
      </div>

      <NavLink
        to={"/quizzes"}
        className="text-2xl mt-2 p-4  underline underline-offset-3"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        {" "}
        Explore more <MoreIcon />
      </NavLink>
    </div>
  );
}
