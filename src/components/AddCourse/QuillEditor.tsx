import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "quill/dist/quill.snow.css";
import styles from "./QuillEditor.module.css";
import { IOSSwitch } from "../SwitchToggle";

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
      [{ "size": ["small", false, "large", "huge"] }],
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
    "size",
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
    "color",
    "background",
  ];

  const [editorContent, setEditorContent] = useState(chapter.content);
  const [showEditor, setShowEditor] = useState(!readOnly);

  const chapterContentChangeHandler = (content: string) => {
    setEditorContent(content);
    chapterSaveHandler(content);
  };

  useEffect(() => {
    setEditorContent(chapter.content);
  }, [chapter]);

  return (
    <div className={`${styles.container} min-w-[360px] md:min-w-[600px]`}>
      {!readOnly && (
        <div className="flex p-2 mb-4">
          <div>
            <IOSSwitch
              checked={!showEditor}
              onChange={() => setShowEditor(!showEditor)}
              label={"Preview"}
            />
          </div>
        </div>
      )}

      {(!showEditor || readOnly) && (
        <div id="toolbar" className="!border-0 absolute" />
      )}

      {readOnly || !showEditor ? (
        <ReactQuill
          key={chapter.id}
          className="quill-preview"
          theme="snow"
          readOnly={true}
          value={editorContent}
          modules={{ toolbar: "#toolbar" }}
          formats={formats}
        />
      ) : (
        <div data-testid="quill-edit-mode">
          <ReactQuill
            key={chapter.id}
            theme="snow"
            readOnly={false}
            value={editorContent}
            onChange={chapterContentChangeHandler}
            modules={modules}
            formats={formats}
          />
        </div>
      )}
    </div>
  );
};

export default QuillEditor;
