import React, { useState } from "react";
import { getIntern } from "../../services";
import { GitHub, LinkedIn } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

interface Intern {
  name: string;
  email: string;
  github: string;
  linkedin: string;
  profilePublic: boolean;
  profilePublicUpdatedOn: string;
  skills: Array<string>;
  tasks: string;
  learnings: string;
  otherInformation: string;
  internshipSummary: {
    [monthYear: string]: unknown;
  };
  monthlyPerformanceData: {
    [monthYear: string]: {
      scores: {
        code_reviews: number;
        development: number;
        learning: number;
        testing: number;
      };
      notes: [
        {
          date: string;
          type: string;
          message: string;
        }
      ];
    };
  };
  // Add other properties if applicable
}

const PublicInternDetails = () => {
  const [intern, setIntern] = useState<Intern>({
    name: "",
    email: "",
    github: "",
    linkedin: "",
    profilePublic: false,
    profilePublicUpdatedOn: "",
    skills: ["coding"],
    tasks: "",
    learnings: "",
    otherInformation: "",
    internshipSummary: {
      summaryNote: "",
    },
    monthlyPerformanceData: {
      key: {
        scores: {
          code_reviews: 0,
          development: 0,
          learning: 0,
          testing: 0,
        },
        notes: [
          {
            date: "",
            type: "",
            message: "",
          },
        ],
      },
    },
  });
  const { email } = useParams();
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    const fetchIntern = async () => {
      try {
        if (email) {
          setLoading(true);
          try {
            const result = await getIntern(email);
            if (result.status === 1) {
              setIntern({
                ...result.data,
                monthlyPerformanceData: result.data.performanceData || {},
              });
            }
          } catch (error) {
            console.log(error.message);
          }
        }
      } catch (error) {
        // Handle the error
        console.log(error.message);
      }
      setLoading(false);
    };

    fetchIntern();
  }, [email]);

  const keys = Object.entries(intern.monthlyPerformanceData);
  const values = Object.values(intern.monthlyPerformanceData);
  const internshipDuration = "Apr'23 - Jun'23 (3 Months)";

  let notes: string[] = [];
  values.forEach((value) => {
    if (value.notes) {
      value.notes.forEach((i) => {
        if (i.type === "info") {
          notes.push(i.message);
        }
      });
    }
  });

  const scoresList: { [key: string]: number }[] = [
    {
      code_reviews: 8,
      development: 9,
      learning: 7,
      testing: 6,
    },
    {
      code_reviews: 7,
      development: 9,
      learning: 8,
      testing: 5,
    },
  ];

  keys.forEach(([key, value], index) => {
    const scores = value.scores;
    scoresList[index] = scores;
    // console.log(value.scores);
  });

  const averageScores: { [key: string]: number } = {};

  // Iterate over the keys of scoresList[0] (assuming scoresList[0] and scoresList[1] have the same keys)
  for (let key in scoresList[0]) {
    let sum = 0;
    let count = 0;

    for (let i = 0; i < scoresList.length; i++) {
      sum += scoresList[i][key];
      count++;
    }

    const average = sum / count;
    averageScores[key] = average;
  }

  // console.log(averageScores);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <CircularProgress />
      </div>
    );
  }
  return (
    <div className="flex flex-col sm:flex-row bg-gray-400/25 grow">
      {intern.profilePublic ? (
        <>
          {/* left side */}
          <div className="w-full sm:w-[360px] p-10 bg-black/90 text-white h-full  flex flex-col items-center pt-[60px] space-y-6 shadow-2xl">
            <div className="rounded-full border-4 border-[#ff1694] p-5">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt="profile"
                className="public-intern-image rounded-full w-36 h-36"
              />
            </div>
            <div>
              <p>{intern.name}</p>
            </div>
            <div>
              <p>{internshipDuration}</p>
            </div>
            {/* icons */}
            <div className="flex space-x-8">
              <a href={intern.linkedin}>
                <LinkedIn />
              </a>
              <a href={intern.github}>
                <GitHub />
              </a>
            </div>
            {/* skills */}
            <div className="flex flex-col space-y-6 items-center">
              <p className="font-bold text-[22px] bg-[#ff1694] px-5 py-1 rounded">
                Skills
              </p>
              <div>
                <li>Code Review - {averageScores.code_reviews}</li>
                <li>Development - {averageScores.development}</li>
                <li>Learning- {averageScores.learning}</li>
                <li>Testing - {averageScores.testing}</li>
              </div>
            </div>
          </div>
          {/* right side */}
          <div className="w-full relative pl-10 pt-20">
            {/* border */}
            <div className="absolute w-4 h-full border-l-4 left-[66px] top-[-1px] border-[#ff1694]"></div>
            <div className="px-1 py-2">
              {/* tasks */}
              <div className="py-2">
                <div className="flex items-center space-x-3">
                  <p className="bg-[#ff1694] z-10 text-white font-bold text-[22px] rounded-full px-5 py-2">
                    1
                  </p>
                  <p className="font-bold text-xl bg-[#ff1694] px-5 py-1 rounded text-white">
                    Summary
                  </p>
                </div>
                {intern.internshipSummary ? (
                  <p className="pl-16 pr-1">{intern.internshipSummary.note}</p>
                ) : (
                  <p className="pl-16 pr-1">
                    {intern.name} did well in his/her internship
                  </p>
                )}
              </div>
              {/* achievements */}
              <div className="py-2">
                <div className="flex items-center space-x-3">
                  <p className="w-12 bg-[#ff1694] z-10 text-white font-bold text-[22px] rounded-full px-5 py-2">
                    2
                  </p>
                  <p className="font-bold text-xl bg-[#ff1694] px-5 py-1 rounded text-white">
                    Achievements
                  </p>
                </div>
                <p className="pl-16 pr-1">
                  {notes.map((note) => (
                    <li>{note}</li>
                  ))}
                </p>
              </div>
              {/* Learnings */}
              <div className="py-2">
                <div className="flex items-center space-x-3">
                  <p className="w-12 bg-[#ff1694] z-10 text-white font-bold text-[22px] rounded-full px-5 py-2">
                    3
                  </p>
                  <p className="font-bold text-xl bg-[#ff1694] px-5 py-1 rounded text-white">
                    Learnings
                  </p>
                </div>
                {intern.internshipSummary ? (
                  <p className="pl-16 pr-1">
                    {intern.internshipSummary.learnings}
                  </p>
                ) : (
                  <p className="pl-16 pr-1">
                    His/her learning involved web development skills using
                    JavaScript, CSS and ReactJS along with writing APIs and
                    storing data in database.
                  </p>
                )}
              </div>
              {/* Other Informations */}
              <div className="py-2">
                <div className="flex items-center space-x-3">
                  <p className="w-12 bg-[#ff1694] z-10 text-white font-bold text-[22px] rounded-full px-5 py-2">
                    4
                  </p>
                  <p className="font-bold text-xl bg-[#ff1694] px-5 py-1 rounded text-white">
                    Other Information
                  </p>
                </div>
                <p className="pl-16 pr-1">
                  {intern.otherInformation ||
                    "We found his/her performance satisfactory and we wish him/her best of luck in upcoming job search"}
                </p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full grid place-content-center h-[88vh] text-center">
          <p className="text-3xl font-bold p-4 hover:text-[#ff1694] transistion duration-1000">
            &lt;&gt; 404 Public Profile Not Found! &lt;/&gt;
          </p>
          <p className="text-xl font-bold px-2">
            This can happen when the intern has not published their profile or
            you've entered a wrong email in the address bar
          </p>
        </div>
      )}
    </div>
  );
};

export default PublicInternDetails;
