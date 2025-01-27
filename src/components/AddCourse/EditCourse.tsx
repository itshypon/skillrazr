import React, { useEffect, useState } from "react";
import styles from "./AddCourse.module.css";
import courseTitle from "./assets/courseTitle.png";
import QuillEditor from "./QuillEditor";
import {
  Edit,
  Save,
  LibraryAdd,
  ArrowBack,
  ArrowForward,
} from "@mui/icons-material";
import { saveCourse, getCourses } from "../../services";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import LockIcon from "@mui/icons-material/Lock";
import { IOSSwitch } from "../SwitchToggle";
import type { Chapter } from "../../types/types";

function EditCourse() {
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: any) => state.currentUserReducer);
  const [chapterLocked, setChapterLocked] = useState<boolean | undefined>(
    false
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
  const [chaptersCount, setChaptersCount] = useState(1);
  const [selectedChapterName, setSelectedChapterName] = useState(
    chapters[0].title
  );
  const [selectedChapterDescription, setSelectedChapterDescription] = useState(
    chapters[0].description
  );

  useEffect(() => {
    if (user && user.accessToken) {
      getCourses({ userToken: user.accessToken })
        .then((resp) => {
          console.log("courses", resp);
          const course = resp.data[0];
          setLoading(false);
          setCourseName(course.title);
          setCourseDescription(course.description);
          setChapters(course.chapters);

          setSelectedChapterName(course.chapters[0].title);
          setSelectedChapterDescription(course.chapters[0].description);
          setSelectedChapter(course.chapters[0]);
          setChaptersCount(course.chapters.length);
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
    setChapterLocked(chapter.isLocked);
  };

  const PrevNextButtonHandler = (btn: string) => {
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
  };

  const publishContentHandler = async () => {
    try {
      const response = await saveCourse({
        title: courseName,
        description: courseDescription,
        chapters,
        userToken: user ? user.accessToken : "",
      });
      if (response.status === 1) {
        alert("course saved successfully");
      }
      if (
        response.status === -1 &&
        response.error &&
        response.error.code === "auth/id-token-expired"
      ) {
        alert(
          "Course save failed! You need to login again to be able to save the course."
        );
      }
    } catch (e) {
      console.log("error", e);
    }
  };
  const chapterRenameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedChapter) {
      setChapters((prevChapters) =>
        prevChapters.map((chapter) =>
          chapter.id === selectedChapter.id
            ? { ...chapter, title: e.target.value }
            : chapter
        )
      );
    }
    setSelectedChapterName(e.target.value);
  };

  const chapterDespriptionHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (selectedChapter) {
      setChapters((prevChapters) =>
        prevChapters.map((chapter) =>
          chapter.id === selectedChapter.id
            ? { ...chapter, description: e.target.value }
            : chapter
        )
      );
    }
    setSelectedChapterDescription(e.target.value);
  };

  const newChapterHandler = () => {
    setChapters((prevChapters) => [
      ...prevChapters,
      {
        id: chaptersCount + 1,
        title: `Chapter ${chaptersCount + 1}`,
        content: "",
        description: "Descrption",
      },
    ]);
    setChaptersCount((prev) => prev + 1);
  };

  const chapterContentSaveHandler = (content: string) => {
    if (selectedChapter) {
      setChapters((prevChapters) =>
        prevChapters.map((chapter) =>
          chapter.id === selectedChapter.id ? { ...chapter, content } : chapter
        )
      );
    }
  };

  const chapterLockHandler = (value: boolean) => {
    if (selectedChapter) {
      setChapters((prevChapters) =>
        prevChapters.map((chapter) =>
          chapter.id === selectedChapter.id
            ? { ...chapter, isLocked: value }
            : chapter
        )
      );
    }
    setChapterLocked(value);
  };

  return (
    <div className="m-0 pt-24 sm:pt-20">
      {loading ? (
        <div className="flex justify-center items-center h-[200px]">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className={styles.upper_navbar}>
            <div className={`${styles.header} mt-10 md:mt-0`}>
              <div className="flex">
                <img src={courseTitle} alt="Title Img" />
                <div className="ml-2 w-[400px]">
                  <div className={styles.header_course_title}>
                    <input
                      type="text"
                      value={courseName}
                      onChange={(e) => setCourseName(e.target.value)}
                      placeholder="Course title"
                    />
                  </div>
                  <div className={styles.header_course_title}>
                    <input
                      type="text"
                      value={courseDescription}
                      className="!border-t !border-gray-500"
                      onChange={(e) => setCourseDescription(e.target.value)}
                      placeholder="Course descpription"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.header_publish}>
                <Save />
                <button onClick={publishContentHandler} className="ml-2">
                  Update Course
                </button>
              </div>
            </div>
          </div>
          <div className="flex h-[calc(100vh-175px)]">
            <div className={styles.side_navbar}>
              <div className={styles.add_newpage} onClick={newChapterHandler}>
                <LibraryAdd />
                <h1 className="ml-2">Add New Chapter</h1>
              </div>
              <div className={styles.chapter}>
                <ul>
                  {chapters.map((chapter, key) => {
                    return (
                      <li
                        key={chapter.id}
                        className={`relative ${styles.chapter_li} ${
                          selectedChapter.id === chapter.id
                            ? styles.selected
                            : ""
                        }`}
                        onClick={() => {
                          selectedChapterHandler(chapter);
                        }}
                      >
                        <span className="absolute left-[-20px]">
                          {chapter.id}
                        </span>
                        {chapter.isLocked && <LockIcon />}
                        <div>{chapter.title}</div>
                        <div className="text-xs">{chapter.description}</div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className={""}>
              <div className="flex items-center mb-8 mt-4">
                <Edit className="h-[32px] ml-8" />
                <div className="flex flex-col">
                  <div className={styles.chapter_name}>
                    <input
                      type="text"
                      value={selectedChapterName}
                      placeholder="
                  Chapter name"
                      onChange={chapterRenameHandler}
                    />
                  </div>
                  <div
                    className={`${styles.chapter_name} ${styles.chapter_desc}`}
                  >
                    <input
                      className="block min-w-[360px]"
                      type="text"
                      value={selectedChapterDescription}
                      placeholder="Chapter description"
                      onChange={chapterDespriptionHandler}
                    />
                  </div>
                </div>
                <div className="mx-4">
                  <LockIcon
                    className={`${styles.custom_lock} ${
                      chapterLocked ? `${styles.locked}` : ""
                    }`}
                  />
                  <IOSSwitch
                    checked={chapterLocked}
                    onChange={(e) => chapterLockHandler(e.target.checked)}
                  />
                </div>
              </div>
              {selectedChapter && (
                <QuillEditor
                  chapter={selectedChapter}
                  chapterSaveHandler={chapterContentSaveHandler}
                />
              )}
              <div className={styles.prev_next_btns_container}>
                {selectedChapter.id !== 1 && (
                  <button
                    className={"mr-10"}
                    onClick={() => PrevNextButtonHandler("prev")}
                  >
                    <div>
                      <ArrowBack />
                    </div>
                    <div>Previous Page</div>
                  </button>
                )}
                {selectedChapter.id !== chapters.length && (
                  <button onClick={() => PrevNextButtonHandler("next")}>
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
    </div>
  );
}

export default EditCourse;
