import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import React from "react";
import play from "../assets/images/play.svg";
import delete1 from "../assets/images/delete.svg";
import broom from "../assets/images/broom.svg";

interface Props {
  content?: string;
  editorClass?: string;
}

export const Editor = (props: Props) => {
  const { content, editorClass = "w-[100vw]" } = props;
  const frame: any = React.useRef(null);
  const [iframeContent, setIframeContent] = React.useState(
    content || "console.log('Start coding!');"
  );
  const [error, setError] = React.useState("");
  const [testId, setTestId] = React.useState(Date.now());

  React.useEffect(() => {
    content && setIframeContent(content);
  }, [content]);

  const updateOutput = (value: string) => {
    // setting up the iframe
    if (frame.current) {
      var win = frame.current.contentWindow;
      win.location.reload(); //refresh iframe window

      var doc = win.document;
      doc.open();
      console.clear();
      doc.close(); // must open and close document object to start using it!

      var s = doc.createElement("script");
      s.type = "text/javascript";

      const consoleScript = `
            console.log = function(...params) {
                var divElement = document.createElement("div");
                params.forEach((param) => {
                    var element = document.createElement("span");
                    let textNode = document.createTextNode(param + "  ");
                    element.appendChild(textNode);
                    divElement.appendChild(element);
                    //document.body.appendChild(element);
                });
                document.body.appendChild(divElement);
            };
            console.error = console.debug = console.info = console.log;`;

      const lib = doc.createElement("script");

      try {
        //handle errors
        win.onerror = function (error: string) {
          console.log("error", error);
          setError(error);
        };

        // overide console
        lib.type = "text/javascript";
        lib.appendChild(doc.createTextNode(consoleScript));

        //run javascript
        s.appendChild(doc.createTextNode(value));
        doc.head.appendChild(lib);
        doc.body.appendChild(s);
        doc.body.style = "font-size: 20px; color: black; padding: 10px";
      } catch (e) {
        console.log("error", e);
        lib.text = consoleScript;
        // s.text = code;
        doc.head.appendChild(lib);
        doc.body.appendChild(s);
      }
      // doc.body.appendChild('<script>' + value + '</script>');
    }
  };
  return (
    <div>
      <div className="py-2 text-4xl text-center">JavaScript Editor</div>
      <div
        style={{ padding: "20px" }}
        className={`flex align-center flex-col sm:flex-row ${editorClass}`}
      >
        <div className="editor p-2 w-full sm:w-6/12">
          <h2 className="py-2 text-2xl">Write JS here</h2>
          <CodeMirror
            autoFocus
            value={iframeContent}
            height="520px"
            extensions={[javascript({ jsx: true })]}
            onChange={(value, viewUpdate) => {
              console.log("value:", value, viewUpdate);
              //updateOutput(value);
              setIframeContent(value);
            }}
          />
        </div>

        <div className="output p-2 w-full sm:w-6/12">
          <button
            className="px-2 py-1 mx-0 my-10 btn border-[1px] border-black rounded bg-white text-black"
            onClick={() => {
              setTestId(Date.now());
              setError("");
              setTimeout(() => {
                //setTestId(Date.now());
                updateOutput(iframeContent);
              }, 500);
            }}
          >
            <img src={play} alt="play" width="32px" className="inline"></img>
            <span className="ml-1 mt-2">Run code</span>
          </button>
          {error && (
            <div>
              <span style={{ color: "red", fontSize: "20px" }}>{error}</span>
              <button
                className="btn py-1 px-2 mx-2 my-2 btn border-[1px] border-black rounded bg-white text-black"
                onClick={() => {
                  setError("");
                  // setTestId(Date.now());
                }}
              >
                <img
                  src={delete1}
                  alt="delete"
                  width="20px"
                  className="inline"
                ></img>
                <span className="ml-2">Delete</span>
              </button>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span className="text-xl">Output</span>
            <button
              className="btn py-1 px-2 my-2 btn border-[1px] border-black rounded bg-white text-black"
              onClick={() => {
                setTestId(Date.now());
              }}
            >
              <img
                src={broom}
                alt="clear"
                width="24px"
                className="inline"
              ></img>
              <span>Clear</span>
            </button>
          </div>
          <iframe
            title="runner"
            key={testId}
            className="editor-iframe"
            ref={frame}
          />
        </div>
      </div>
    </div>
  );
};
