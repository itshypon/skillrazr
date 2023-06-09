import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import styles from "./QuillEditor.module.css";

type QuillEditorProps = {
  chapter: {
    id: number;
    title: string;
    content: string;
  };
  readOnly?: boolean;
  chapterSaveHandler: (content: string) => void;
};

const QuillEditor: React.FC<QuillEditorProps> = ({
  chapter,
  readOnly = false,
  chapterSaveHandler,
}) => {
  const modules = {
    toolbar: [
      [{ "header": [1, 2, 3, 4, 5, 6, false] }],
      [
        {
          font: [
            "Arial",
            "Verdana",
            "Helvetica",
            "Times New Roman",
            "Courier New",
          ],
        },
      ],
      [
        {
          color: [
            "#ff0000",
            "#00ff00",
            "#0000ff",
            "#ffff00",
            "#ff00ff",
            "#00ffff",
            "black",
          ],
        },
        {
          background: [
            "#ff0000",
            "#00ff00",
            "#0000ff",
            "#ffff00",
            "#ff00ff",
            "#00ffff",
          ],
        },
      ],
      [{ script: "sub" }, { script: "super" }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { "list": "ordered" },
        { "list": "bullet" },
        { "indent": "-1" },
        { "indent": "+1" },
      ],
      ["link", "image", "video"],
      ["code-block"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "code-block",
    "font",
    "color",
    "background",
  ];

  const [editorContent, setEditorContent] = useState(chapter.content);
  const [showEditor, setShowEditor] = useState(true);

  const handleToggleView = () => {
    setShowEditor((prevValue) => !prevValue);
  };

  const chapterContentChangeHandler = (content: string) => {
    setEditorContent(content);
    chapterSaveHandler(content);
  };

  useEffect(() => {
    setEditorContent(chapter.content);
  }, [chapter]);

  return (
    <div className={styles.container}>
      {readOnly ? null : (
        <div className={styles.button__container}>
          <button
            onClick={handleToggleView}
            className={`${showEditor ? styles.active : ""}`}
            disabled={showEditor}
          >
            Editor
          </button>
          <button
            onClick={handleToggleView}
            className={`${!showEditor ? styles.active : ""}`}
            disabled={!showEditor}
          >
            Preview
          </button>
        </div>
      )}
      <div id="toolbar" className="!border-0"></div>
      <div className={styles.editor__preview}>
        {showEditor ? (
          <>
            <div>
              <ReactQuill
                theme="snow"
                readOnly={readOnly}
                value={editorContent}
                onChange={chapterContentChangeHandler}
                modules={readOnly ? { toolbar: "#toolbar" } : modules}
                formats={formats}
              />
            </div>
          </>
        ) : (
          <ReactQuill
            theme="snow"
            readOnly={true}
            value={editorContent}
            onChange={chapterContentChangeHandler}
            modules={{ toolbar: "#toolbar" }}
            formats={formats}
          />
        )}
      </div>
    </div>
  );
};

export default QuillEditor;
