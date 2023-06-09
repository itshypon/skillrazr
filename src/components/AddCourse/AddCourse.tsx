import React, { useState } from "react";
import styles from "./AddCourse.module.css";
import courseTitle from "./assets/courseTitle.png";
import QuillEditor from "./QuillEditor";
import {
  Edit,
  Save,
  LibraryAdd,
  ArrowBack,
  ArrowForward,
  WarningAmberOutlined,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { saveCourse } from "../../services";

export type Chapter = {
  id: number;
  title: string;
  description: string;
  content: string;
};

function AddCourse() {
  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const user = useSelector((state: any) => state.currentUserReducer);

  const [chapters, setChapters] = useState<Chapter[]>([
    {
      id: 1,
      title: "Chapter 1",
      description: "",
      content: "",
    },
  ]);
  const [selectedChapter, setSelectedChapter] = useState(chapters[0]);
  const [chaptersCount, setChaptersCount] = useState(1);
  const [chapterNewName, setChapterNewName] = useState(chapters[0].title);
  const [selectedChapterDescription, setSelectedChapterDescription] =
    useState("");

  const [courseIsValid, setCourseIsValid] = useState(true);
  const [courseDescIsValid, setCourseDescIsValid] = useState(true);
  const [chapterIsValid, setChapterIsValid] = useState(true);

  const selectedChapterHandler = (chapter: Chapter) => {
    setSelectedChapter(chapter);
    setChapterNewName(chapter.title);
    setSelectedChapterDescription(chapter.description);
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
      if (!validate()) {
        return;
      }
      const response = await saveCourse({
        title: courseName,
        description: courseDescription,
        chapters,
        userToken: user ? user.accessToken : "",
      });
      if (response.status === 1) {
        alert("course saved successfully");
      }
    } catch (e) {
      console.log("error", e);
      alert(e);
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
    setChapterNewName(e.target.value);
    return e.target.value !== "" ? setChapterIsValid(true) : "";
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
        description: "",
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

  const validate = () => {
    return validateTitle() && validateDesc() && validateAllChapters();
  };

  const validateAllChapters = () => {
    for (let i = 0; i < chapters.length; i++) {
      if (chapters[i].title === "") {
        return false;
      }
    }
    return true;
  };

  const validateTitle = () => {
    if (courseName === "") {
      setCourseIsValid(false);
      return false;
    }
    setCourseIsValid(true);
    return true;
  };

  const validateDesc = () => {
    if (courseDescription === "") {
      setCourseDescIsValid(false);
      return false;
    }
    setCourseDescIsValid(true);
    return true;
  };

  const validateChapter = () => {
    if (chapterNewName === "") {
      setChapterIsValid(false);
      return;
    }
    setChapterIsValid(true);
  };

  return (
    <div className={styles.body}>
      <div className={styles.upper_navbar}>
        <div className={`${styles.header} mt-10 md:mt-0`}>
          <div className="flex items-center">
            <img src={courseTitle} alt="Title Img" />
            <div className="ml-2 w-[400px]">
              <div className={styles.header_course_title}>
                <input
                  type="text"
                  onChange={(e) => {
                    setCourseName(e.target.value);
                    return e.target.value !== "" ? setCourseIsValid(true) : "";
                  }}
                  placeholder="Course title"
                  required
                  onBlur={validateTitle}
                />
                {!courseIsValid && (
                  <div className="flex items-center text-red-600 pt-2 pb-2">
                    <WarningAmberOutlined className="text-[0.75rem] transform scale-75" />
                    <p>Required</p>
                  </div>
                )}
              </div>
              <div className={styles.header_course_desc}>
                <input
                  type="text"
                  className="!border-t !border-gray-500"
                  onChange={(e) => {
                    setCourseDescription(e.target.value);
                    return e.target.value !== ""
                      ? setCourseDescIsValid(true)
                      : "";
                  }}
                  placeholder="Course descpription"
                  required
                  onBlur={validateDesc}
                />
                {!courseDescIsValid && (
                  <div className="flex items-center text-red-600 pt-2 pb-2 !border-t !border-gray-500">
                    <WarningAmberOutlined className="text-[0.75rem] transform scale-75" />
                    <p>Required</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.header_publish}>
            <Save />
            <button onClick={publishContentHandler} className="ml-2">
              Save Course
            </button>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className={`${styles.side_navbar} h-[100vh]`}>
          <div className={styles.add_newpage} onClick={newChapterHandler}>
            <LibraryAdd />
            <h1 className="ml-2">Add New Chapter</h1>
          </div>
          <div className={styles.chapter}>
            <ul>
              {chapters.map((val, _key) => {
                return (
                  <li
                    key={val.id}
                    className={`relative ${styles.chapter_li} ${
                      selectedChapter === val || selectedChapter.id === val.id
                        ? styles.selected
                        : ""
                    } ${val.title === "" ? styles.chapterError : ""}`}
                    onClick={() => {
                      selectedChapterHandler(val);
                    }}
                  >
                    <span className="absolute left-[-20px]">{val.id}</span>
                    <div>{val.title}</div>
                    <div className="text-xs">{val.description}</div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className={""}>
          <div className="flex items-center mb-16 mt-4">
            <Edit className="h-[32px] ml-8" />
            <div>
              <div className={styles.chapter_name}>
                <input
                  type="text"
                  value={chapterNewName}
                  placeholder="
                  Chapter name"
                  onChange={chapterRenameHandler}
                  required
                  onBlur={validateChapter}
                />
                {(selectedChapter.title === "" || chapterNewName === "") &&
                  !chapterIsValid && (
                    <div className="flex items-center text-red-600">
                      <WarningAmberOutlined className="text-[0.75rem] transform scale-75" />
                      <p>Required</p>
                    </div>
                  )}
              </div>
              <div className={`${styles.chapter_name} ${styles.chapter_desc}`}>
                <input
                  className="block"
                  type="text"
                  value={selectedChapterDescription}
                  placeholder="Chapter description"
                  onChange={chapterDespriptionHandler}
                />
              </div>
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
    </div>
  );
}

export default AddCourse;
