import React, { useEffect, useState } from "react";
import styles from "./AddCourse.module.css";
import courseTitle from "./assets/courseTitle.png";
import QuillEditor from "./QuillEditor";
import { getCourses } from "../../services";
import { ArrowBack, ArrowForward, Menu, Close } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

export type Chapter = {
  id: number;
  title: string;
  description: string;
  content: string;
};

function ReadOnlyCourse() {
  const [courseName, setCourseName] = useState("ReactJs");
  const [loading, setLoading] = useState(false);
  const user = useSelector((state: any) => state.currentUserReducer);

  const [courseDescription, setCourseDescription] = useState(
    "Complete ReactJS course"
  );

  const [chapters, setChapters] = useState<Chapter[]>([
    {
      id: 1,
      title: "Chapter 1",
      description: "Description",
      content: "",
    },
  ]);
  const [selectedChapter, setSelectedChapter] = useState(chapters[0]);
  const [selectedChapterName, setSelectedChapterName] = useState(
    chapters[0].title
  );
  const [selectedChapterDescription, setSelectedChapterDescription] = useState(
    chapters[0].description
  );

  const [showChapters, setShowChapters] = useState(false);

  useEffect(() => {
    if (user && user.accessToken) {
      setLoading(true);
      getCourses({ userToken: user.accessToken })
        .then((resp: any) => {
          console.log("courses", resp);
          const course = resp.data[0];
          setLoading(false);
          setCourseName(course.title);
          setCourseDescription(course.description);
          setChapters(course.chapters);

          setSelectedChapter(course.chapters[0]);
          setSelectedChapterName(course.chapters[0].title);
          setSelectedChapterDescription(course.chapters[0].description);
        })
        .catch((e) => {
          console.log("error fetching courses", e);
          setLoading(false);
        });
    }
  }, [user]);

  const selectedChapterHandler = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setSelectedChapterName(chapter.title);
    setSelectedChapterDescription(chapter.description);
    setShowChapters(!showChapters);
  };

  const prevNextButtonHandler = (btn: string) => {
    chapters.map((chapter, index) => {
      if (chapter.id === selectedChapter.id) {
        if (btn === "prev" && index > 0) {
          selectedChapterHandler(chapters[index - 1]);
        } else if (btn === "next" && index < chapters.length - 1) {
          selectedChapterHandler(chapters[index + 1]);
        }
      }
      return null;
    });
    setShowChapters(false);
  };

  return (
    <div className="m-0 pt-24 sm:pt-20">
      {loading ? (
        <div className="flex justify-center items-center h-[200px]">
          <CircularProgress />
        </div>
      ) : (
        <>
          {!user ? (
            <div className="text-2xl sm:text-3xl p-20 sm:p-30 wrap text-center">
              Please login to view the course
            </div>
          ) : (
            <>
              <div className={styles.upper_navbar}>
                <div className={`${styles.header} mt-10 md:mt-0`}>
                  <button
                    className={styles.hamburger}
                    onClick={() => setShowChapters(!showChapters)}
                  >
                    {showChapters ? <Close /> : <Menu />}
                  </button>
                  <div className="flex">
                    <img src={courseTitle} alt="Title Img" />
                    <div className="ml-2 w-[200px] sm:w-[400px]">
                      <div className={styles.header_course_title}>
                        <div className="text-2xl font-bold">{courseName}</div>
                      </div>
                      <div className={styles.header_course_title}>
                        <div className="font-semibold">{courseDescription}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div
                  className={`${styles.side_navbar} ${
                    !showChapters ? "" : styles.show_side_navbar
                  }`}
                >
                  <div className={styles.chapter}>
                    <ul>
                      {chapters.map((val, key) => {
                        return (
                          <li
                            key={val.id}
                            className={`relative ${styles.chapter_li} ${
                              selectedChapter === val ||
                              selectedChapter.id === val.id
                                ? styles.selected
                                : ""
                            }`}
                            onClick={() => {
                              selectedChapterHandler(val);
                            }}
                          >
                            <span className="absolute left-[-20px]">
                              {val.id}
                            </span>
                            <div>{val.title}</div>
                            <div className="text-xs">{val.description}</div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
                <div className={styles.body_content}>
                  <div className="flex flex-col pl-10 mt-4">
                    <div className="text-2xl">{selectedChapterName}</div>
                    <div className="text-xl">{selectedChapterDescription}</div>
                  </div>
                  {selectedChapter && (
                    <QuillEditor
                      readOnly={true}
                      chapter={selectedChapter}
                      chapterSaveHandler={() => {}}
                    />
                  )}
                  <div className={styles.prev_next_btns_container}>
                    {selectedChapter.id !== 1 && (
                      <button
                        className={"mr-10"}
                        onClick={() => prevNextButtonHandler("prev")}
                      >
                        <div>
                          <ArrowBack />
                        </div>
                        <div>Previous Page</div>
                      </button>
                    )}
                    {selectedChapter.id !== chapters.length && (
                      <button onClick={() => prevNextButtonHandler("next")}>
                        <div>Next Page</div>
                        <div>
                          <ArrowForward />
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ReadOnlyCourse;
